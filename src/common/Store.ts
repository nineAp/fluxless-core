import { SliceType } from "../types/slice.types";
import { Slice } from "./Slice";

export class Store<T extends { [K in keyof T]: Slice<SliceType> }> {
  /**
   * Stored slices
   */
  private slices: T;

  /**
   * Creates the store that will server slices
   * @param slices is a slices to stored to
   */
  constructor(slices: T) {
    this.slices = slices;
  }

  /**
   * This method allows to get slice from the store
   * @param key is a key of slice to get to
   * @returns Slice
   */
  getSlice<K extends keyof T>(key: K): T[K] {
    return this.slices[key];
  }
}
