//#region src/index.d.ts
/**
 * A simple string builder inspired by those found in C#, Java, and Go.
 * Useful where incremental string construction would be cumbersome to
 * manage with plain concatenation.
 */
declare class StringBuilder {
  #private;
  /** Creates an instance of the string builder with an optional initial value and configurable line ending. */
  constructor(value?: string, newline?: string);
  /** The total character length of the accumulated string. */
  get length(): number;
  /** Whether the builder contains no content. */
  get isEmpty(): boolean;
  /** Appends a value to the string builder. */
  append(value?: string): this;
  /** Appends a value followed by a newline. Called with no argument, appends a blank line. */
  appendLine(value?: string): this;
  /** Clears all accumulated content. */
  clear(): this;
  /** Returns the accumulated string. */
  toString(): string;
}
//#endregion
export { StringBuilder as default };
//# sourceMappingURL=index.d.mts.map