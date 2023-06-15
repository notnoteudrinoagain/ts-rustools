import Enum from "./enum";
import Optional, { None, Some } from "./optional";

class Result<T, E> extends Enum<{ Ok: T; Err: E }> {
  is_ok(): this is Enum<{ Ok: T }> {
    return this.matches("Ok");
  }
  is_err(): this is Enum<{ Err: E }> {
    return this.matches("Err");
  }
  match<R>(f: { Ok: (v: T) => R; Err: (e: E) => R }): R {
    return f[this.variant](this.value as T & E);
  }
  ok(): Optional<T> {
    return this.match({
      Ok: (v) => Some(v),
      Err: () => None(),
    });
  }
}

export function Ok<T, E>(value: T) {
  return new Result<T, E>("Ok", value);
}

export function Err<T, E>(err: E) {
  return new Result<T, E>("Err", err);
}

export function catchInto<T>(fn: () => T): Result<T, string> {
  try {
    return Ok(fn());
  } catch (e) {
    return Err(String(e));
  }
}

export default Result;
