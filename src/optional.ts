import Enum from "./enum";
import Result, { Err, Ok } from "./result";

/**
 * `Optional` is a utlity class that represents an optional value

 * every `Optional` is either `Some` and contains a value

 * or `None`, and does not.
 @example a divide function that could fail.
 * ```ts
 * function divide(numerator: number, denominator: number): Optional<number> {
 *   if (denominator == 0) return None();
 *   else return Some(numerator / denominator);
 * }
 * ```
 */

class Optional<T, N extends null = null> extends Enum<{ Some: T; None: N }> {
  constructor(value: ["Some", T] | ["None", N]) {
    super(value);
  }
  /**
   * @readonly whether if the option is the `Some` variant.
   */
  get isSome() {
    return this.value[0] == "Some";
  }
  /**
   *
   * @returns `true` if the option is the `Some` variant and the value inside of it matches a predicate.
   */
  isSomeAnd(f: (arg0: T) => boolean) {
    if (this.isNone) return false;
    return f(this.value[1] as T);
  }
  /**
   * @readonly whether if the option is the `None` variant.
   */
  get isNone() {
    return this.value[0] == "None";
  }

  /**
   * @returns The contained `Some` value.
   * @throws The unwrap method can fail and throw, use `match` or `unwrap_or` to handle the `None` case.
   */
  unwrap() {
    if (this.isNone) throw new Error("Panic: Unwrapped Optional.None variant.");
    return this.value[1] as T;
  }
  /**
   * @returns The contained `Some` value or a provided default.
   */
  unwrap_or(fallback: T) {
    return this.isSome ? (this.value[1] as T) : fallback;
  }
  /**
   * @returns The contained `Some` value or computes it from a closure.
   */
  unwrap_or_else(f: () => T) {
    return this.isSome ? (this.value[1] as T) : f();
  }
  /**
   * Maps an `Optional<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`).
   */
  map<F>(f: (arg0: T) => F) {
    if (this.isNone) return None<F>();
    else return Some(f(this.value[1] as T));
  }
  /**
   * Calls the provided closure with the contained value (if `Some`).
   */
  inspect(f: (arg0: T) => void) {
    if (this.isSome) f(this.value[1] as T);
    return this;
  }
  /**
   * @returns the contained `Some` value.
   * @throws Throws if the value is the `None` value with a custom message provided by `msg`.
   */
  expect(msg: string) {
    if (this.isNone) throw new Error(msg);
    return this.value[1] as T;
  }
  /**
   *
   * @param def A default value
   * @param f A map function
   * @returns The provided default result (if `None`), or applies a function to the contained value (if any).
   */
  map_or<F>(def: T, f: (arg0: T) => F) {
    return this.isSome ? this.map(f) : Some(f(def));
  }
  /**
   * 
   * Computes a default function result (if `None`), or applies a different function to the contained value (if any).
   * @param def A default function
   * @param f A map function

   */
  map_or_else<F>(def: () => T, f: (arg0: T) => F) {
    return this.isSome ? this.map(f) : Some(f(def()));
  }
  /**
   * Transforms the `Option<T>` into a `Result<T, E>`.
   *
   * mapping `Some(v)` to `Ok(v)`, and `None` to `Err(err)`.
   */
  ok_or<E>(err: E): Result<T, E> {
    if (this.isSome) return Err(err);
    else return Ok(this.value[1] as T);
  }
  /**
   * Transforms the `Option<T>` into a `Result<T, E>`.
   *
   * mapping `Some(v)` to `Ok(v)`, and `None` to `Err(err())`.
   */
  ok_or_else<E>(err: () => E): Result<T, E> {
    if (this.isSome) return Err(err());
    else return Ok(this.value[1] as T);
  }
  /**
   *
   * @returns `None` if the option is `None`, otherwise returns `optb`.
   */
  and<U>(optb: Optional<U, null>) {
    if (this.isSome) return optb;
    else return this;
  }
  /**
   *
   * @returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
   */
  and_then<U>(f: (arg0: T) => Optional<U, null>) {
    if (this.isSome) return f(this.value[1] as T);
    else return None<U>();
  }
  /**
   * @returns the option if it contains a value, otherwise returns optb.
   */
  or(optb: Optional<T, null>) {
    return this.isSome ? this : optb;
  }
  /**
   * @returns the option if it contains a value, otherwise calls `f` and returns the result.
   */
  or_else(f: () => Optional<T, null>) {
    return this.isSome ? this : f();
  }
  /**
   * Inserts a value into the option.
   */
  insert(value: T) {
    this.value = ["Some", value];
    return this;
  }
  /**
   * Takes the value out of the option, leaving `None` in its place.
   */
  take() {
    if (this.isSome) {
      let value = this.value[1] as T;
      this.value = ["None", null as N];
      return Some<T>(value);
    } else return None();
  }
  /**
   * Replaces the actual value in the option by the value given in parameter, returning the old value if present, leaving a `Some` in its place.
   */
  replace(value: T) {
    if (this.isSome) {
      let old = this.value[1] as T;
      this.value[1] = value;
      return Some(old);
    } else return None<T>();
  }
  /**
   * Zips `this` with another `Optional`.
   *
   * @returns If `this` is `Some(s)` and `optb` is `Some(o)`, returns `Some((s, o))`.
   *
   * Otherwise, `None` is returned.
   */
  zip<U>(optb: Optional<U, null>) {
    if (this.isSome && optb.isSome)
      return Some<[T, U]>([this.value[1] as T, optb.value[1] as U]);
    else return None<[T, U]>();
  }
  /**
   * Unzips an option containing a tuple of two Optionals.
   * @returns
   * If `this` is `Some([a, b])`, returns `[Some(a), Some(b)]`.
   *
   * Otherwise, `[None, None]` is returned.
   */
  unzip<U>(): [Optional<T, null>, Optional<U, null>] {
    if (Array.isArray(this.value[1]) && this.value[1].length == 2) {
      return [Some(this.value[1][0] as T), Some(this.value[1][1] as U)];
    }
    return [None(), None()];
  }
}
/**
 * Instantiates an `Optional` with the `Some` variant.
 * @param value The contained value for the `Optional`.
 * @returns `Optional<T>`
 * @example
 * ```ts
 * let count = Some(1);
 * count = count.map((c) => c + 1);
 * count.match("Some", v => console.log(v)); // 2
 * ```
 *
 */

export function Some<T>(value: T) {
  return new Optional(["Some", value]);
}
/**
 * Instantiates an `Optional` with the `None` variant.
 * @returns `Optional<T>`
 * @example
 * ```ts
 * let count = None();
 * count.match("None", () => console.log("Its a none!")); // Its a none
 * count.insert(2);
 * count.match("Some", v => console.log(v)); // 2
 * ```
 *
 */
export function None<T>() {
  return new Optional<T, null>(["None", null]);
}

export default Optional;
