import { Slice } from "../common/Slice";
import { Store } from "../common/Store";

describe("Store", () => {
  it("Init with slices", () => {
    const counterSlice = new Slice(
      "counterSlice",
      { count: 0 },
      { increment: (state: number, n: number) => state + n }
    );

    const todosSlice = new Slice(
      "todosSlice",
      { list: [] as string[] },
      { add: (item: string) => item }
    );

    const store = new Store({
      counter: counterSlice,
      todos: todosSlice,
    });

    expect(store.getSlice("counter")).toBe(counterSlice);
    expect(store.getSlice("todos")).toBe(todosSlice);
  });

  it("Can call actions by the slice in the store", () => {
    const counterSlice = new Slice(
      "counterSlice",
      { count: 0 },
      { increment: (state: number, n: number) => state + n }
    );

    const store = new Store({ counter: counterSlice });

    const slice = store.getSlice("counter");
    const current = slice.getState("count").get();
    slice.useAction("count", "increment", current, 5);

    expect(slice.getState("count").get()).toBe(5);
  });

  it("Observers inside slices call subscribers on update", () => {
    const counterSlice = new Slice(
      "counterSlice",
      { count: 0 },
      { increment: (state: number, n: number) => state + n }
    );

    const store = new Store({ counter: counterSlice });

    const slice = store.getSlice("counter");
    const observer = slice.getState("count");

    const fn = jest.fn();
    observer.subscribe(fn);
    const current = observer.get();

    slice.useAction("count", "increment", current, 10);

    expect(observer.get()).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(10);
  });
});
