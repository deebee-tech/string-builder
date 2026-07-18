/**
 * Builds the npm-publishable package.json inside dist/.
 *
 * Root package.json points at dist/index.* for local/dev resolution. Publishing uses
 * pkgRoot: 'dist', so those paths must become index.* — previously only semantic-release
 * rewrote them, leaving a broken committed dist/package.json after every plain build.
 */
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const root = join(dirname(__filename), '..');
const dist = join(root, 'dist');

/** @param {Record<string, unknown>} pkg */
export function toPublishPackage(pkg) {
  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    homepage: pkg.homepage,
    license: pkg.license,
    author: pkg.author,
    repository: pkg.repository,
    type: pkg.type,
    main: 'index.cjs',
    // Pair legacy `types` with `main` (CJS). Dual conditions below cover ESM.
    types: 'index.d.cts',
    exports: {
      '.': {
        import: {
          types: './index.d.mts',
          default: './index.mjs',
        },
        require: {
          types: './index.d.cts',
          default: './index.cjs',
        },
      },
    },
    sideEffects: false,
    publishConfig: pkg.publishConfig,
    keywords: pkg.keywords,
    engines: pkg.engines,
  };
}

export function prepareDist() {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  writeFileSync(join(dist, 'package.json'), `${JSON.stringify(toPublishPackage(pkg), null, 2)}\n`);

  for (const file of ['README.md', 'CHANGELOG.md', 'LICENSE']) {
    copyFileSync(join(root, file), join(dist, file));
  }
}

if (resolve(process.argv[1] ?? '') === __filename) {
  prepareDist();
}
