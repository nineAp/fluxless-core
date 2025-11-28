export class Observer<T> {
  /**
   * Value to serve to
   */
  private value: T;
  /**
   * All subscribers that watch value change
   */
  private subscribers: ((val: T) => void)[] = [];

  /**
   * Creates Observer
   * @param value Initial value
   */
  constructor(value: T) {
    this.value = value;
  }

  /**
   * This method allows to set new value
   * @param value New value to set to
   */
  set(value: T) {
    this.value = value;
    this.subscribers.forEach((fn) => fn(value));
  }

  /**
   * This methods allows to get Observer value
   * @returns Current value
   */
  get() {
    return this.value;
  }

  /**
   * Add new subscriber to Observer
   * @param fn Callback function that accepts value to set
   * @returns Unsubcribe method that you need to call, if subscriber do not need anymore
   */
  subscribe(fn: (val: T) => void) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((f) => f !== fn);
    };
  }
}
