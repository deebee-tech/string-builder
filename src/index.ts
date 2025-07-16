/** A simple port of a string builder like those found in C#, Java, and
 * Go.  This is useful where string concatenation would be very cumbersome
 * to manage.  This is NOT meant to be used for extremely large strings, as it is
 * not optimized for that.  It is meant to be used for small collections of strings that
 * need to be built up over time.
 */
export default class StringBuilder {
  /** The array of values to hold on to */
  public values: string[] = [];

  /** Creates an instance of the string builder with optional initial input */
  public constructor(value = "") {
    if (value !== null && value !== undefined && value.length > 0) {
      this.values = new Array(value);
    }
  }

  /** Appends a value to the string builder */
  public append(value = ""): void {
    if (value !== null && value !== undefined && value.length > 0) {
      this.values.push(value);
    }
  }

  /** Appends a value and a new line to the string builder */
  public appendLine(value = ""): void {
    if (value !== null && value !== undefined && value.length > 0) {
      this.values.push(value + "\r\n");
    }
  }

  /** Clears the string builder */
  public clear(): void {
    this.values = new Array<string>();
  }

  /** Returns the string representation of the string builder */
  public toString(): string {
    return this.values.join("");
  }
}
