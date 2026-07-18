/**
 * Post-build gate: dist/ must be directly publishable as pkgRoot (no release-time path rewrite).
 */
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const pkgPath = join(dist, 'package.json');

function fail(message) {
  console.error(`verify-dist: ${message}`);
  process.exit(1);
}

if (!existsSync(pkgPath)) fail('dist/package.json missing — run pnpm build first');

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const serialized = JSON.stringify(pkg);

if (serialized.includes('dist/index')) {
  fail('dist/package.json still contains dist/index paths (not publish-ready)');
}

for (const [field, expected] of [
  ['main', 'index.cjs'],
  ['types', 'index.d.cts'],
]) {
  if (pkg[field] !== expected)
    fail(`expected ${field} "${expected}", got ${JSON.stringify(pkg[field])}`);
}

if (pkg.scripts || pkg.devDependencies || pkg.packageManager) {
  fail('publish manifest must not ship scripts, devDependencies, or packageManager');
}

const requiredFiles = [
  'index.mjs',
  'index.cjs',
  'index.d.mts',
  'index.d.cts',
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
];
for (const file of requiredFiles) {
  if (!existsSync(join(dist, file))) fail(`missing ${file}`);
}

const require = createRequire(import.meta.url);
const StringBuilder = require(join(dist, 'index.cjs'));
const built = new StringBuilder('cjs').append('!').toString();
if (built !== 'cjs!') fail(`CJS require interop failed, got ${JSON.stringify(built)}`);

const { default: EsmBuilder } = await import(pathToFileURL(join(dist, 'index.mjs')).href);
const esm = new EsmBuilder('esm').toString();
if (esm !== 'esm') fail(`ESM import interop failed, got ${JSON.stringify(esm)}`);

// npm pack resolves package exports against the packed root — catch missing files early.
execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: dist,
  stdio: ['ignore', 'pipe', 'pipe'],
  encoding: 'utf8',
});

console.log('verify-dist: ok');
