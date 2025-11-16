export type SliceType<
  S = Record<string, any>,
  A = Record<string, (...args: any[]) => any>
> = {
  states: S;
  actions: A;
};
