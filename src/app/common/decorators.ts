export function Mutate(transformer: (val: any) => any) {
  return (model, key, value ?) =>
    Object.defineProperty(model, key, {
      get: () => value,
      set: (val) => value = transformer(val)
    });
}

export function Cached(model, key) {
  let fun = model[key];
  let cache = [];
  let lastValue;
  function cached(...args) {
    if (args.some((arg, i) => arg !== cache[ i ])) {
      cache = args;
      lastValue = fun.apply(this, args);
    }
    return lastValue;
  }
  return model[key] = cached;
}
