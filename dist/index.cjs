'use strict';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class StringBuilder {
  /** Creates an instance of the string builder with optional initial input */
  constructor(value = "") {
    /** The array of values to hold on to */
    __publicField(this, "values", []);
    if (value !== null && value !== void 0 && value.length > 0) {
      this.values = new Array(value);
    }
  }
  /** Appends a value to the string builder */
  append(value = "") {
    if (value !== null && value !== void 0 && value.length > 0) {
      this.values.push(value);
    }
  }
  /** Appends a value and a new line to the string builder */
  appendLine(value = "") {
    if (value !== null && value !== void 0 && value.length > 0) {
      this.values.push(value + "\r\n");
    }
  }
  /** Clears the string builder */
  clear() {
    this.values = new Array();
  }
  /** Returns the string representation of the string builder */
  toString() {
    return this.values.join("");
  }
}

module.exports = StringBuilder;
//# sourceMappingURL=index.cjs.map
