import { Slice } from "../common/Slice";
import { Observer } from "../common/Observer";

describe("Slice with Observer", () => {
  it("Initializes state wrapped in Observer", () => {
    const slice = new Slice<{
      states: { count: number };
      actions: { increment: (n: number) => number };
    }>("test", { count: 0 }, { increment: (n: number) => n });

    const state = slice.getState("count");

    expect(state).toBeInstanceOf(Observer);
    expect(state.get()).toBe(0);
  });

  it("Updates state through Observer when using actions", () => {
    const slice = new Slice(
      "test",
      { count: 0 },
      { increment: (n: number) => n }
    );

    slice.useAction("count", "increment", 5);

    expect(slice.getState("count").get()).toBe(5);
  });

  it("Handles multiple actions correctly", () => {
    const slice = new Slice(
      "test",
      { count: 0 },
      {
        increment: (n: number) => n,
        decrement: (n: number) => -n,
      }
    );

    slice.useAction("count", "increment", 10);
    expect(slice.getState("count").get()).toBe(10);

    slice.useAction("count", "decrement", 3);
    expect(slice.getState("count").get()).toBe(-3);
  });

  it("Observer reacts to set()", () => {
    const slice = new Slice("test", { count: 1 }, { inc: (n: number) => n });

    const state = slice.getState("count");

    let changes = 0;
    state.subscribe(() => changes++);

    slice.useAction("count", "inc", 5);

    expect(changes).toBe(1);
    expect(state.get()).toBe(5);
  });
});
