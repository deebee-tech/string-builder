//#region src/index.ts
/** A simple port of a string builder like those found in C#, Java, and
* Go.  This is useful where string concatenation would be very cumbersome
* to manage.  This is NOT meant to be used for extremely large strings, as it is
* not optimized for that.  It is meant to be used for small collections of strings that
* need to be built up over time.
*/
var StringBuilder = class {
	/** The array of values to hold on to */
	values = [];
	/** Creates an instance of the string builder with optional initial input */
	constructor(value = "") {
		if (value !== null && value !== void 0 && value.length > 0) this.values = new Array(value);
	}
	/** Appends a value to the string builder */
	append(value = "") {
		if (value !== null && value !== void 0 && value.length > 0) this.values.push(value);
	}
	/** Appends a value and a new line to the string builder */
	appendLine(value = "") {
		if (value !== null && value !== void 0 && value.length > 0) this.values.push(value + "\r\n");
	}
	/** Clears the string builder */
	clear() {
		this.values = new Array();
	}
	/** Returns the string representation of the string builder */
	toString() {
		return this.values.join("");
	}
};
//#endregion
export { StringBuilder as default };

//# sourceMappingURL=index.mjs.map