<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/deebee-tech/string-builder/main/assets/string-builder-lockup-dark.svg">
    <img alt="String Builder" src="https://raw.githubusercontent.com/deebee-tech/string-builder/main/assets/string-builder-lockup-light.svg" width="415">
  </picture>
</p>

A lightweight, chainable string builder for TypeScript and JavaScript.

Inspired by builders in C#, Java, and Go. Meant for small collections of strings — not extremely large buffers.

Part of the [DeeBee](https://github.com/deebee-tech) ecosystem.

## Install

```bash
npm install @deebeetech/string-builder
```

```bash
deno add jsr:@deebeetech/string-builder
# or: npx jsr add @deebeetech/string-builder
```

## Usage

```typescript
import StringBuilder from '@deebeetech/string-builder';

const sb = new StringBuilder().appendLine('Hello').append('World').toString();
// "Hello\nWorld"
```

```javascript
// CommonJS
const StringBuilder = require('@deebeetech/string-builder');
```

### API

| Method / Property                     | Description                                                                                    |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `new StringBuilder(value?, newline?)` | Create an instance with an optional initial value and line ending (default `\n`)               |
| `.append(value?)`                     | Append a string (`''` / `undefined` / omitted are ignored)                                     |
| `.appendLine(value?)`                 | Append a string followed by a newline (`''`, `undefined`, or no argument appends a blank line) |
| `.clear()`                            | Remove all accumulated content (keeps the configured line ending)                              |
| `.toString()`                         | Return the built string                                                                        |
| `.length`                             | Total character count                                                                          |
| `.isEmpty`                            | `true` when the builder has no content                                                         |

All mutating methods return `this` for chaining.

## License

MIT
