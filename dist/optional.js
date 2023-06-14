import Enum from "./enum";
import { Err, Ok } from "./result";
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
class Optional extends Enum {
    constructor(value) {
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
    isSomeAnd(f) {
        if (this.isNone)
            return false;
        return f(this.value[1]);
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
        if (this.isNone)
            throw new Error("Panic: Unwrapped Optional.None variant.");
        return this.value[1];
    }
    /**
     * @returns The contained `Some` value or a provided default.
     */
    unwrap_or(fallback) {
        return this.isSome ? this.value[1] : fallback;
    }
    /**
     * @returns The contained `Some` value or computes it from a closure.
     */
    unwrap_or_else(f) {
        return this.isSome ? this.value[1] : f();
    }
    /**
     * Maps an `Optional<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`).
     */
    map(f) {
        if (this.isNone)
            return None();
        else
            return Some(f(this.value[1]));
    }
    /**
     * Calls the provided closure with the contained value (if `Some`).
     */
    inspect(f) {
        if (this.isSome)
            f(this.value[1]);
        return this;
    }
    /**
     * @returns the contained `Some` value.
     * @throws Throws if the value is the `None` value with a custom message provided by `msg`.
     */
    expect(msg) {
        if (this.isNone)
            throw new Error(msg);
        return this.value[1];
    }
    /**
     *
     * @param def A default value
     * @param f A map function
     * @returns The provided default result (if `None`), or applies a function to the contained value (if any).
     */
    map_or(def, f) {
        return this.isSome ? this.map(f) : Some(f(def));
    }
    /**
     *
     * Computes a default function result (if `None`), or applies a different function to the contained value (if any).
     * @param def A default function
     * @param f A map function
  
     */
    map_or_else(def, f) {
        return this.isSome ? this.map(f) : Some(f(def()));
    }
    /**
     * Transforms the `Option<T>` into a `Result<T, E>`.
     *
     * mapping `Some(v)` to `Ok(v)`, and `None` to `Err(err)`.
     */
    ok_or(err) {
        if (this.isSome)
            return Err(err);
        else
            return Ok(this.value[1]);
    }
    /**
     * Transforms the `Option<T>` into a `Result<T, E>`.
     *
     * mapping `Some(v)` to `Ok(v)`, and `None` to `Err(err())`.
     */
    ok_or_else(err) {
        if (this.isSome)
            return Err(err());
        else
            return Ok(this.value[1]);
    }
    /**
     *
     * @returns `None` if the option is `None`, otherwise returns `optb`.
     */
    and(optb) {
        if (this.isSome)
            return optb;
        else
            return this;
    }
    /**
     *
     * @returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
     */
    and_then(f) {
        if (this.isSome)
            return f(this.value[1]);
        else
            return None();
    }
    /**
     * @returns the option if it contains a value, otherwise returns optb.
     */
    or(optb) {
        return this.isSome ? this : optb;
    }
    /**
     * @returns the option if it contains a value, otherwise calls `f` and returns the result.
     */
    or_else(f) {
        return this.isSome ? this : f();
    }
    /**
     * Inserts a value into the option.
     */
    insert(value) {
        this.value = ["Some", value];
        return this;
    }
    /**
     * Takes the value out of the option, leaving `None` in its place.
     */
    take() {
        if (this.isSome) {
            let value = this.value[1];
            this.value = ["None", null];
            return Some(value);
        }
        else
            return None();
    }
    /**
     * Replaces the actual value in the option by the value given in parameter, returning the old value if present, leaving a `Some` in its place.
     */
    replace(value) {
        if (this.isSome) {
            let old = this.value[1];
            this.value[1] = value;
            return Some(old);
        }
        else
            return None();
    }
    /**
     * Zips `this` with another `Optional`.
     *
     * @returns If `this` is `Some(s)` and `optb` is `Some(o)`, returns `Some((s, o))`.
     *
     * Otherwise, `None` is returned.
     */
    zip(optb) {
        if (this.isSome && optb.isSome)
            return Some([this.value[1], optb.value[1]]);
        else
            return None();
    }
    /**
     * Unzips an option containing a tuple of two Optionals.
     * @returns
     * If `this` is `Some([a, b])`, returns `[Some(a), Some(b)]`.
     *
     * Otherwise, `[None, None]` is returned.
     */
    unzip() {
        if (Array.isArray(this.value[1]) && this.value[1].length == 2) {
            return [Some(this.value[1][0]), Some(this.value[1][1])];
        }
        return [None(), None()];
    }
    match(matcher) {
        if (this.value[0] == "Some")
            return matcher.Some(this.value[1]);
        else
            return matcher.None();
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
 * count.match_on("Some", v => console.log(v)); // 2
 * ```
 *
 */
export function Some(value) {
    return new Optional(["Some", value]);
}
/**
 * Instantiates an `Optional` with the `None` variant.
 * @returns `Optional<T>`
 * @example
 * ```ts
 * let count = None();
 * count.match_on("None", () => console.log("Its a none!")); // Its a none
 * count.insert(2);
 * count.match_on("Some", v => console.log(v)); // 2
 * ```
 *
 */
export function None() {
    return new Optional(["None", null]);
}
export default Optional;
