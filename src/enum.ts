/**
 * Enums give you a way of saying a value is one of a possible set of values.
 * ```ts
 * const IpAddr = new Enum<{ V4: string; V6: string }>(["V4", "127.0.0.1"]);
 * ```
 */
class Enum<VS extends Record<string, unknown>> {
  value: [keyof VS, VS[keyof VS]];
  constructor([variant, value]: [keyof VS, VS[keyof VS]]) {
    this.value = [variant, value];
  }
  /**
   *
   * @param on The key you want to match on.
   * @param matcher The match body
   */
  match_on<I extends keyof VS, V extends VS[I]>(
    on: I,
    matcher: (arg0: V) => void
  ) {
    if (this.value[0] == on) matcher(this.value[1] as unknown as V);
  }
}

export default Enum;
