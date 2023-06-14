/**
 * Enums give you a way of saying a value is one of a possible set of values.
 * ```ts
 * const IpAddr = new Enum<{ V4: string; V6: string }>(["V4", "127.0.0.1"]);
 * ```
 */
declare class Enum<VS extends Record<string, unknown>> {
    value: [keyof VS, VS[keyof VS]];
    constructor([variant, value]: [keyof VS, VS[keyof VS]]);
    /**
     *
     * @param on The key you want to match on.
     * @param matcher The match body
     */
    match<I extends keyof VS, V extends VS[I]>(on: I, matcher: (arg0: V) => void): void;
}
export default Enum;
