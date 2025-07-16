# String Builder

A simple port of a string builder like those found in C#, Java, and
Go. This is useful where string concatenation would be very cumbersome
to manage. This is NOT meant to be used for extremely large strings, as it is
not optimized for that. It is meant to be used for small collections of strings that
need to be built up over time.

```typescript
import StringBuilder from "@deebeetech/string-builder";

const builder = new StringBuilder();
builder.appendLine("Hello");
builder.append("World");

const output = builder.toString();
// Hello World
```

For a full list of functions, see the [jsr.io documentation](https://jsr.io/@deebeetech/string-builder/doc/~/StringBuilder)
