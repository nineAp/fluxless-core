import { Slice } from "./Slice";

export class Store<T extends Record<string, Slice<any, any>>> {
  private slices: T;

  constructor(slices: T) {
    this.slices = slices;
  }

  getSlice<K extends keyof T>(key: K): T[K] {
    return this.slices[key];
  }
}
