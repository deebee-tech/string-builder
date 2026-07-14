import { defineConfig } from "tsdown";

export default defineConfig({
   entry: ["./src/index.ts"],
   format: ["esm", "cjs"],
   // `dts: true` emits a //# sourceMappingURL comment in the .d.ts files but no .d.ts.map to go
   // with it, so every consumer's editor 404s on go-to-definition. Emit the maps.
   dts: { sourcemap: true },
   sourcemap: true,
   outDir: "dist",
});
