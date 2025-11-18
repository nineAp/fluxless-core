export function asyncify<T extends (...args: any[]) => any>(fn: T) {
  return async (...args: Parameters<T>) =>
    await new Promise<ReturnType<T>>((resolve, reject) => {
      setImmediate(() => {
        try {
          resolve(fn(...args));
        } catch (err) {
          reject(err);
        }
      });
    });
}
