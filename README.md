# String Builder

A lightweight, chainable string builder for TypeScript and JavaScript.

## Install

```bash
npm install @deebeetech/string-builder
```

## Usage

```typescript
import StringBuilder from "@deebeetech/string-builder";

const sb = new StringBuilder().appendLine("Hello").append("World").toString();
// "Hello\nWorld"
```

### API

| Method / Property                     | Description                                                                      |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `new StringBuilder(value?, newline?)` | Create an instance with an optional initial value and line ending (default `\n`) |
| `.append(value?)`                     | Append a string                                                                  |
| `.appendLine(value?)`                 | Append a string followed by a newline (no argument appends a blank line)         |
| `.clear()`                            | Remove all accumulated content                                                   |
| `.toString()`                         | Return the built string                                                          |
| `.length`                             | Total character count                                                            |
| `.isEmpty`                            | `true` when the builder has no content                                           |

All mutating methods return `this` for chaining.

## License

MIT
