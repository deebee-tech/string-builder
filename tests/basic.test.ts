import { describe, expect, it } from "vitest";
import StringBuilder from "../src";

describe("Basic tests", () => {
   it("should create a StringBuilder instance", () => {
      const sb = new StringBuilder();
      expect(sb).toBeDefined();
   });

   it("should create a StringBuilder instance with an initial value", () => {
      const sb = new StringBuilder("Hello, World!");
      expect(sb).toBeDefined();
      expect(sb.toString()).toBe("Hello, World!");
   });

   it("should append a string", () => {
      const sb = new StringBuilder();
      sb.append("Hello, ");
      expect(sb.toString()).toBe("Hello, ");
   });

   it("should append a string with a newline", () => {
      const sb = new StringBuilder();
      sb.appendLine("Hello, World!");
      expect(sb.toString()).toBe("Hello, World!\r\n");
   });

   it("should clear the string builder", () => {
      const sb = new StringBuilder();
      sb.append("Hello, World!");
      expect(sb.toString()).toBe("Hello, World!");
      sb.clear();
      expect(sb.toString()).toBe("");
   });
});
