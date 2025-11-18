export function asyncify(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  if (typeof original !== "function") return;

  descriptor.value = async function (...args: any[]) {
    return await new Promise((resolve, reject) => {
      setImmediate(() => {
        try {
          resolve(original.apply(this, args));
        } catch (err) {
          reject(err);
        }
      });
    });
  };
}
