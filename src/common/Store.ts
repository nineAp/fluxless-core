import { SliceType } from "../types/slice.types";
import { Slice } from "./Slice";

export class Store<T extends Record<string, Slice<SliceType>>> {
  private slices: T;

  constructor(slices: T) {
    this.slices = slices;
  }

  getSlice<K extends keyof T>(key: K): T[K] {
    return this.slices[key];
  }
}
