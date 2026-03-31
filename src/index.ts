/**
 * A simple string builder inspired by those found in C#, Java, and Go.
 * Useful where incremental string construction would be cumbersome to
 * manage with plain concatenation.
 */
export default class StringBuilder {
   #values: string[] = [];
   #newline: string;

   /** Creates an instance of the string builder with an optional initial value and configurable line ending. */
   public constructor(value?: string, newline = "\n") {
      this.#newline = newline;
      if (value) {
         this.#values.push(value);
      }
   }

   /** The total character length of the accumulated string. */
   public get length(): number {
      return this.#values.reduce((sum, s) => sum + s.length, 0);
   }

   /** Whether the builder contains no content. */
   public get isEmpty(): boolean {
      return this.#values.length === 0;
   }

   /** Appends a value to the string builder. */
   public append(value?: string): this {
      if (value) {
         this.#values.push(value);
      }
      return this;
   }

   /** Appends a value followed by a newline. Called with no argument, appends a blank line. */
   public appendLine(value?: string): this {
      this.#values.push((value ?? "") + this.#newline);
      return this;
   }

   /** Clears all accumulated content. */
   public clear(): this {
      this.#values.length = 0;
      return this;
   }

   /** Returns the accumulated string. */
   public toString(): string {
      return this.#values.join("");
   }
}
