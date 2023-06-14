/**
 * Enums give you a way of saying a value is one of a possible set of values.
 * ```ts
 * const IpAddr = new Enum<{ V4: string; V6: string }>(["V4", "127.0.0.1"]);
 * ```
 */
class Enum {
    value;
    constructor([variant, value]) {
        this.value = [variant, value];
    }
    /**
     *
     * @param on The key you want to match on.
     * @param matcher The match body
     */
    match_on(on, matcher) {
        if (this.value[0] == on)
            matcher(this.value[1]);
    }
}
export default Enum;
