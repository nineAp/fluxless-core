import { SliceType } from "../types/slice.types";
import { Observer } from "./Observer";

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

  constructor(name: string, states: T["states"], actions: T["actions"]) {
    this.name = name;
    this.states = wrapWithObservers(states);
    this.actions = actions;
  }

  getState<K extends keyof T["states"]>(key: K) {
    return this.states[key];
  }

  useAction<K extends keyof T["states"], A extends keyof T["actions"]>(
    key: K,
    fn: A,
    ...args: Parameters<T["actions"][A]>
  ) {
    const result = this.actions[fn](...args);
    this.states[key].set(result);
  }
}
