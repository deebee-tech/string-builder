/** A simple port of a string builder like those found in C#, Java, and
 * Go.  This is useful where string concatenation would be very cumbersome
 * to manage.  This is NOT meant to be used for extremely large strings, as it is
 * not optimized for that.  It is meant to be used for small collections of strings that
 * need to be built up over time.
 */
declare class StringBuilder {
    /** The array of values to hold on to */
    values: string[];
    /** Creates an instance of the string builder with optional initial input */
    constructor(value?: string);
    /** Appends a value to the string builder */
    append(value?: string): void;
    /** Appends a value and a new line to the string builder */
    appendLine(value?: string): void;
    /** Clears the string builder */
    clear(): void;
    /** Returns the string representation of the string builder */
    toString(): string;
}

export { StringBuilder as default };
