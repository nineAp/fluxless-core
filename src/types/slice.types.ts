import { Slice } from "fluxless";

export type SliceType<
  S = Record<string, any>,
  A = Record<string, (...args: any[]) => any>
> = {
  states: S;
  actions: A;
};

export type SliceMap<T> = {
  [K in keyof T]: Slice<SliceType>;
};
