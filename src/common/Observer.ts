export class Observer<T> {
  private value: T;
  private subscribers: ((val: T) => void)[] = [];

  constructor(value: T) {
    this.value = value;
  }

  set(value: T) {
    this.value = value;
    this.subscribers.forEach((fn) => fn(value));
  }

  get() {
    return this.value;
  }

  subscribe(fn: (val: T) => void) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((f) => f !== fn);
    };
  }
}
