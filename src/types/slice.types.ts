import { Slice } from "fluxless";

/**
 * Base Slice Type to use in further that requires states and actions object
 */
export type SliceType<
  S = Record<string, any>,
  A = Record<string, (...args: any[]) => any>
> = {
  states: S;
  actions: A;
};

/**
 * Slice Map type to describe object with many slices, that will be stored
 */
export type SliceMap<T extends Record<keyof T, SliceType>> = {
  [K in keyof T]: Slice<SliceType<T[K]["states"], T[K]["actions"]>>;
};
