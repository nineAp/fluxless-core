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

export class Slice<
  S extends Record<string, any>,
  A extends Record<string, (...args: any[]) => any>
> {
  private states: WrapObservers<S>;
  private actions: A;
  readonly name: string;

  constructor(name: string, states: S, actions: A) {
    this.name = name;
    this.states = wrapWithObservers(states);
    this.actions = actions;
  }

  getState<K extends keyof S>(key: K) {
    return this.states[key];
  }

  useAction<K extends keyof S, FN extends keyof A>(
    key: K,
    fn: FN,
    ...args: Parameters<A[FN]>
  ) {
    const result = this.actions[fn](...args);
    this.states[key].set(result);
  }
}
