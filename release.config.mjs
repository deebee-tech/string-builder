export default {
  branches: [
    'main',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
    {
      name: 'next',
      prerelease: true,
    },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        // Default Angular parser rejects `feat!:`; conventionalcommits supports it.
        // Pinned by tests/release.test.ts (analyzeCommits).
        preset: 'conventionalcommits',
      },
    ],
    // NO `preset` here, deliberately. Pointing this at 'conventionalcommits' resolves the
    // top-level conventional-changelog-conventionalcommits (v10), whose new
    // `{commits, parser, writer, whatBump}` export shape this plugin's bundled
    // conventional-changelog-writer@8 cannot read -- it silently rendered 2.0.2 and 2.0.3 as
    // bare headers with no body, hiding the exports-map fix that 2.0.2 shipped.
    // Omitting it uses the writer's own version-locked angular preset.
    // tests/release.test.ts pins: bare plugin entry (no preset) + note bodies.
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: './dist/CHANGELOG.md',
      },
    ],
    [
      'semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['jsr.json'],
            from: '"version": ".*"',
            to: '"version": "${nextRelease.version}"',
            results: [
              {
                file: 'jsr.json',
                hasChanged: true,
                numMatches: 1,
                numReplacements: 1,
              },
            ],
            countMatches: true,
          },
        ],
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: 'dist',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    // Registries before git + GitHub: npm and JSR are the product. Git commit of version
    // bumps / changelog must not run before JSR, or a JSR failure leaves registries diverged
    // while git already moved. GitHub release asset upload has also crashed (SQLEasy 2.0.0);
    // keep it last so it cannot strand a registry publish.
    '@sebbo2002/semantic-release-jsr',
    [
      '@semantic-release/git',
      {
        // coverage/ is generated noise — do not commit it.
        assets: ['CHANGELOG.md', 'package.json', 'jsr.json', 'dist/**/*'],
      },
    ],
    // No `assets` here: that upload is exactly what crashed on SQLEasy, and the built files
    // already ship via npm and JSR. The GitHub release still gets its generated notes.
    '@semantic-release/github',
  ],
};
