import { SliceType } from "../types/slice.types";
import { Observer } from "./Observer";

/**
 * Wrap all values in object in Observer
 * @param obj Values that requires to be wrapped to
 * @returns Same object that wrapped in Observer, every single value
 */
function wrapWithObservers<T extends Record<string, any>>(obj: T) {
  const result: any = {};

  for (const key in obj) {
    result[key] = new Observer(obj[key]);
  }

  return result as { [K in keyof T]: Observer<T[K]> };
}

type WrapObservers<T> = {
  [K in keyof T]: Observer<T[K]>;
};

export class Slice<T extends SliceType> {
  private states: WrapObservers<T["states"]>;
  private actions: T["actions"];
  readonly name: string;

  /**
   *
   * @param name is a name of slice to identify it in the further
   * @param states is a states that will be stored in slice
   * @param actions is a actions that will be used to change states in slice
   */
  constructor(name: string, states: T["states"], actions: T["actions"]) {
    this.name = name;
    this.states = wrapWithObservers(states);
    this.actions = actions;
  }

  /**
   * This method allows to get state value wrapped in Observer
   * @param key is a key of state to return
   * @returns State wrapped in Observer
   */

  getState<K extends keyof T["states"]>(key: K) {
    return this.states[key];
  }

  /**
   * This method allows to get function that was put in actions object
   * @param key is a key of action to return
   * @returns Original function that was put in actions object
   */

  getAction<A extends keyof T["actions"]>(key: A) {
    return this.actions[key];
  }

  /**
   * This method allows to change state
   * @param key key of the state to change
   * @param fn function that used to change state
   * @param args args that function are accepts
   */
  useAction<K extends keyof T["states"], A extends keyof T["actions"]>(
    key: K,
    fn: A,
    ...args: Parameters<T["actions"][A]>
  ) {
    const result = this.actions[fn](...args);
    this.states[key].set(result);
  }
}
