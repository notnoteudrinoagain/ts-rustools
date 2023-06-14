import Enum from "./enum";
import { None, Some } from "./optional";
/**
 * Result is a utility class that represents either success ([`Ok`]) or failure ([`Err`])
 */
class Result extends Enum {
    constructor(value) {
        super(value);
    }
    /**
     * Transforms the `Result<T, E>` into an `Optional<T>`.
     *
     * mapping `Ok(v)` to `Some(v)`, and `Err` to `None`.
     */
    ok() {
        return this.value[0] == "Ok" ? Some(this.value[1]) : None();
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
 * count.match("Ok", v => console.log(v)); // 2
 * ```
 *
 */
export function Ok(value) {
    return new Result(["Ok", value]);
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
 * count.match("Err", err => console.log(v)); // APIError
 * ```
 *
 */
export function Err(err) {
    return new Result(["Err", err]);
}
export default Result;
