import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        ...configDefaults.exclude,
        'tests/*',
        'dist/*',
        'coverage/*',
        'scripts/*',
        'tmp/*',
        '.prettierrc.mjs',
        'eslint.config.mjs',
        'release.config.mjs',
        'tsdown.config.ts',
        'vitest.config.mjs',
      ],
    },
    exclude: [
      ...configDefaults.exclude,
      'dist/*',
      'coverage/*',
      'scripts/*',
      'tmp/*',
      '.prettierrc.mjs',
      'eslint.config.mjs',
      'release.config.mjs',
      'tsdown.config.ts',
      'vitest.config.mjs',
    ],
  },
});
