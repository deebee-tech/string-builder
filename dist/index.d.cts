//#region src/index.d.ts
/**
 * A lightweight string builder inspired by those found in C#, Java, and Go.
 * Useful where incremental string construction would be cumbersome to
 * manage with plain concatenation. Intended for small collections of strings,
 * not extremely large buffers.
 */
declare class StringBuilder {
  #private;
  /** Creates an instance of the string builder with an optional initial value and configurable line ending. */
  constructor(value?: string, newline?: string);
  /** The total character length of the accumulated string. */
  get length(): number;
  /** Whether the builder contains no content. */
  get isEmpty(): boolean;
  /** Appends a value to the string builder. Empty string and undefined are ignored. */
  append(value?: string): this;
  /**
   * Appends a value followed by a newline. Called with no argument, `undefined`,
   * or an empty string, appends a blank line.
   */
  appendLine(value?: string): this;
  /** Clears all accumulated content. Does not reset the configured line ending. */
  clear(): this;
  /** Returns the accumulated string. */
  toString(): string;
}
export = StringBuilder;
//# sourceMappingURL=index.d.cts.map