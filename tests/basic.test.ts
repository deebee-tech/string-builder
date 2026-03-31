import { describe, expect, it } from "vitest";
import StringBuilder from "../src";

describe("StringBuilder", () => {
   it("should create an empty instance", () => {
      const sb = new StringBuilder();
      expect(sb.toString()).toBe("");
      expect(sb.isEmpty).toBe(true);
      expect(sb.length).toBe(0);
   });

   it("should create an instance with an initial value", () => {
      const sb = new StringBuilder("Hello, World!");
      expect(sb.toString()).toBe("Hello, World!");
      expect(sb.isEmpty).toBe(false);
      expect(sb.length).toBe(13);
   });

   it("should append a string", () => {
      const sb = new StringBuilder();
      sb.append("Hello, ");
      sb.append("World!");
      expect(sb.toString()).toBe("Hello, World!");
   });

   it("should ignore empty or undefined appends", () => {
      const sb = new StringBuilder("ok");
      sb.append("");
      sb.append(undefined);
      sb.append();
      expect(sb.toString()).toBe("ok");
   });

   it("should append a string with a newline", () => {
      const sb = new StringBuilder();
      sb.appendLine("Hello, World!");
      expect(sb.toString()).toBe("Hello, World!\n");
   });

   it("should append a blank line when appendLine is called with no argument", () => {
      const sb = new StringBuilder();
      sb.append("first");
      sb.appendLine();
      sb.append("second");
      expect(sb.toString()).toBe("first\nsecond");
   });

   it("should support a custom line ending", () => {
      const sb = new StringBuilder(undefined, "\r\n");
      sb.appendLine("line");
      expect(sb.toString()).toBe("line\r\n");
   });

   it("should clear the string builder", () => {
      const sb = new StringBuilder();
      sb.append("Hello, World!");
      expect(sb.toString()).toBe("Hello, World!");
      sb.clear();
      expect(sb.toString()).toBe("");
      expect(sb.isEmpty).toBe(true);
      expect(sb.length).toBe(0);
   });

   it("should report length accurately", () => {
      const sb = new StringBuilder();
      sb.append("abc");
      sb.append("de");
      expect(sb.length).toBe(5);
   });

   it("should support method chaining", () => {
      const result = new StringBuilder()
         .append("Hello")
         .append(", ")
         .appendLine("World!")
         .append("Done")
         .toString();

      expect(result).toBe("Hello, World!\nDone");
   });

   it("should support chaining through clear", () => {
      const result = new StringBuilder("stale")
         .clear()
         .append("fresh")
         .toString();

      expect(result).toBe("fresh");
   });
});
