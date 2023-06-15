import Enum from "./enum";

class Optional<T> extends Enum<{ Some: T; None: null }> {
  isNone(): this is Enum<{ None: null }> {
    return this.matches("None");
  }
  isSome(): this is Enum<{ Some: T }> {
    return this.matches("Some");
  }
  match<R>(f: { Some: (v: T) => R; None: () => R }): R {
    return this.isSome() ? f.Some(this.value) : f.None();
  }
  unwrap() {
    if (this.isNone()) throw new Error("Called `unwrap` on a `None` value");
    return this.value as T;
  }
  unwrap_or(value: T) {
    return this.isSome() ? this.value : value;
  }
}

export function Some<T>(value: T) {
  return new Optional<T>("Some", value);
}

export function None<T>() {
  return new Optional<T>("None", null);
}

export default Optional;
