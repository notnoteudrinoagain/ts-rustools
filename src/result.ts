import Enum from "./enum";
import Optional, { None, Some } from "./optional";

/**
 * Result is a utility class that represents either success ([`Ok`]) or failure ([`Err`])
 */
class Result<T, E> extends Enum<{ Ok: T; Err: E }> {
  constructor(value: ["Ok", T] | ["Err", E]) {
    super(value);
  }
  /**
   * Transforms the `Result<T, E>` into an `Optional<T>`.
   *
   * mapping `Ok(v)` to `Some(v)`, and `Err` to `None`.
   */
  ok(): Optional<T, null> {
    return this.value[0] == "Ok" ? Some(this.value[1] as T) : None();
  }
}
/**
 * Instantiates a `Result` with the `Ok` variant.
 * @returns `Result<T, E>`
 * @example
 * ```ts
 * function readFromDB(): Result<number, APIError> {
 *   if (successFullRead) return Ok(data);
 *   else return Err(new APIError("Bad Request"));
 * }
 * let count = readFromDB();
 * count.match_on("Ok", v => console.log(v)); // 2
 * ```
 *
 */
export function Ok<T, E>(value: T): Result<T, E> {
  return new Result<T, E>(["Ok", value]);
}

/**
 * Instantiates a `Result` with the `Err` variant.
 * @returns `Result<T, E>`
 * @example
 * ```ts
 * function readFromDB(): Result<number, APIError> {
 *   if (successFullRead) return Ok(data);
 *   else return Err(new APIError("Bad Request"));
 * }
 * let count = readFromDB();
 * count.match_on("Err", err => console.log(v)); // APIError
 * ```
 *
 */
export function Err<T, E>(err: E): Result<T, E> {
  return new Result<T, E>(["Err", err]);
}

/**
 * A helper function that turns a fallible function's into a Result safe version.
 */
export function intoResult<T>(f: () => T): Result<T, string> {
  try {
    return Ok(f());
  } catch (e) {
    return Err(String(e));
  }
}

export default Result;
