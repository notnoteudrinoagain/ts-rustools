import Enum from "./enum";
import Optional from "./optional";
/**
 * Result is a utility class that represents either success ([`Ok`]) or failure ([`Err`])
 */
declare class Result<T, E> extends Enum<{
    Ok: T;
    Err: E;
}> {
    constructor(value: ["Ok", T] | ["Err", E]);
    /**
     * Transforms the `Result<T, E>` into an `Optional<T>`.
     *
     * mapping `Ok(v)` to `Some(v)`, and `Err` to `None`.
     */
    ok(): Optional<T, null>;
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
export declare function Ok<T, E>(value: T): Result<T, E>;
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
export declare function Err<T, E>(err: E): Result<T, E>;
/**
 * A helper function that turns a fallible function's into a Result safe version.
 */
export declare function intoResult<T>(f: () => T): Result<T, string>;
export default Result;
