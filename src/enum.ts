class Enum<T extends Record<string, unknown>, V extends keyof T = keyof T> {
  variant: V;
  value: T[V];
  constructor(variant: V, value: T[V]) {
    this.variant = variant;
    this.value = value;
  }
  matches<K extends V>(key: K): this is Enum<{ [_ in K]: T[K] }> {
    return this.variant == key;
  }
}

export default Enum;
