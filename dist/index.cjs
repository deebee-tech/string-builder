//#region src/index.ts
/**
* A lightweight string builder inspired by those found in C#, Java, and Go.
* Useful where incremental string construction would be cumbersome to
* manage with plain concatenation. Intended for small collections of strings,
* not extremely large buffers.
*/
var StringBuilder = class {
	#values = [];
	#newline;
	/** Creates an instance of the string builder with an optional initial value and configurable line ending. */
	constructor(value, newline = "\n") {
		this.#newline = newline;
		if (value) this.#values.push(value);
	}
	/** The total character length of the accumulated string. */
	get length() {
		return this.#values.reduce((sum, s) => sum + s.length, 0);
	}
	/** Whether the builder contains no content. */
	get isEmpty() {
		return this.#values.length === 0;
	}
	/** Appends a value to the string builder. Empty string and undefined are ignored. */
	append(value) {
		if (value) this.#values.push(value);
		return this;
	}
	/**
	* Appends a value followed by a newline. Called with no argument, `undefined`,
	* or an empty string, appends a blank line.
	*/
	appendLine(value) {
		this.#values.push((value ?? "") + this.#newline);
		return this;
	}
	/** Clears all accumulated content. Does not reset the configured line ending. */
	clear() {
		this.#values.length = 0;
		return this;
	}
	/** Returns the accumulated string. */
	toString() {
		return this.#values.join("");
	}
};
//#endregion
module.exports = StringBuilder;

//# sourceMappingURL=index.cjs.map