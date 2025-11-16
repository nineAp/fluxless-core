import { Observer } from "../common/Observer";

describe("Observer", () => {
  it("Init with given value", () => {
    const obs = new Observer(10);
    expect(obs.get()).toBe(10);
  });

  it("Set is change value", () => {
    const obs = new Observer(0);
    obs.set(42);
    expect(obs.get()).toBe(42);
  });

  it("Subscribers calls by a set", () => {
    const obs = new Observer(0);
    const mockFn = jest.fn();

    obs.subscribe(mockFn);
    obs.set(5);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(5);
  });

  it("Unsubscribe work test", () => {
    const obs = new Observer(0);
    const mockFn = jest.fn();

    const unsubscribe = obs.subscribe(mockFn);
    obs.set(1);
    unsubscribe();
    obs.set(2);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith(1);
  });
});
