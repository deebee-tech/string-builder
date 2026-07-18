import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { toPublishPackage } from '../scripts/prepare-dist.mjs';

/**
 * 2.0.2 and 2.0.3 both shipped as a bare header with no body -- 2.0.2 was the exports-map fix that
 * repaired every CJS consumer, and nobody could read that it happened. Nothing failed:
 * semantic-release computed the right version, tagged, and published; only the notes were empty,
 * which no gate looked at.
 *
 * The cause was version skew. `preset: 'conventionalcommits'` resolves the top-level
 * conventional-changelog-conventionalcommits, which moved to a new
 * `{commits, parser, writer, whatBump}` export shape in v10, while this plugin's bundled
 * conventional-changelog-writer@8 still expects the old one. It does not throw on the mismatch --
 * it emits the header and silently drops every commit.
 *
 * So this runs the REAL plugins with the REAL config from release.config.mjs.
 */
type PluginEntry = string | [string, Record<string, unknown>];

type ReleaseConfig = {
  plugins: PluginEntry[];
};

type GenerateNotes = (
  pluginConfig: Record<string, unknown>,
  context: Record<string, unknown>,
) => Promise<string>;

type AnalyzeCommits = (
  pluginConfig: Record<string, unknown>,
  context: Record<string, unknown>,
) => Promise<string | null>;

const RNG = '@semantic-release/release-notes-generator';
const ANALYZER = '@semantic-release/commit-analyzer';

const loadReleaseConfig = async (): Promise<ReleaseConfig> => {
  const configPath = '../release.config.mjs';
  const { default: releaseConfig } = (await import(configPath)) as {
    default: ReleaseConfig;
  };
  return releaseConfig;
};

const pluginEntry = async (name: string): Promise<PluginEntry> => {
  const releaseConfig = await loadReleaseConfig();
  const entry = releaseConfig.plugins.find((p) => (Array.isArray(p) ? p[0] === name : p === name));
  if (entry === undefined) throw new Error(`${name} is not configured`);
  return entry;
};

const pluginConfig = async (name: string): Promise<Record<string, unknown>> => {
  const entry = await pluginEntry(name);
  return Array.isArray(entry) ? entry[1] : {};
};

const commit = (hash: string, message: string) => ({
  hash,
  message,
  subject: message.split('\n')[0],
  body: message.split('\n').slice(1).join('\n'),
  commit: { long: hash, short: hash.slice(0, 7) },
  tree: { long: '', short: '' },
  author: { name: 'a', email: 'a@example.com', date: '2026-07-16T00:00:00Z' },
  committer: { name: 'a', email: 'a@example.com', date: '2026-07-16T00:00:00Z' },
  committerDate: '2026-07-16T00:00:00Z',
  gitTags: '',
});

const baseContext = {
  cwd: process.cwd(),
  env: process.env,
  options: { repositoryUrl: 'https://github.com/deebee-tech/string-builder' },
  logger: { log: () => {}, error: () => {}, warn: () => {} },
};

const notesFor = async (type: string, commits: ReturnType<typeof commit>[]) => {
  const rngPath = RNG;
  const { generateNotes } = (await import(rngPath)) as { generateNotes: GenerateNotes };
  return generateNotes(await pluginConfig(RNG), {
    ...baseContext,
    lastRelease: { gitTag: 'v1.0.0', version: '1.0.0' },
    nextRelease: { gitTag: 'v2.0.0', version: '2.0.0', type },
    commits,
  });
};

const analyze = async (commits: ReturnType<typeof commit>[]) => {
  const analyzerPath = ANALYZER;
  const { analyzeCommits } = (await import(analyzerPath)) as { analyzeCommits: AnalyzeCommits };
  return analyzeCommits(await pluginConfig(ANALYZER), {
    ...baseContext,
    commits,
  });
};

describe('release notes generation', () => {
  it('keeps the release-notes-generator entry bare (no preset)', async () => {
    const entry = await pluginEntry(RNG);
    expect(entry).toBe(RNG);
  });

  it('renders a body for a minor, not just the version header', async () => {
    const notes = await notesFor('minor', [
      commit('a'.repeat(40), 'feat: add a thing consumers can see'),
    ]);

    expect(notes).toContain('add a thing consumers can see');
    expect(notes).toMatch(/### Features/);
  });

  it('renders a body for a major, including the breaking change', async () => {
    const notes = await notesFor('major', [
      commit(
        'b'.repeat(40),
        'refactor!: drop the legacy export\n\nBREAKING CHANGE: `Legacy` is no longer exported.',
      ),
      commit('c'.repeat(40), 'fix: correct the thing'),
    ]);

    expect(notes).toContain('drop the legacy export');
    expect(notes).toContain('`Legacy` is no longer exported.');
    expect(notes).toMatch(/BREAKING CHANGE/i);
    expect(notes).toContain('correct the thing');
  });

  it('renders more than a header, which is the exact failure that shipped four times', async () => {
    const header = await notesFor('major', []);
    const withCommits = await notesFor('major', [
      commit('d'.repeat(40), 'feat: a real feature'),
      commit('e'.repeat(40), 'fix: a real fix'),
    ]);

    // The bug produced output byte-identical to the no-commits case.
    expect(withCommits).not.toBe(header);
    expect(withCommits.length).toBeGreaterThan(header.length + 50);
  });
});

describe('commit analyzer', () => {
  it('treats bare feat!: as a major bump (angular preset would return null)', async () => {
    const type = await analyze([commit('f'.repeat(40), 'feat!: break the thing')]);
    expect(type).toBe('major');
  });

  it('still treats a BREAKING CHANGE footer as major', async () => {
    const type = await analyze([
      commit('g'.repeat(40), 'fix: nudge\n\nBREAKING CHANGE: behavior changed'),
    ]);
    expect(type).toBe('major');
  });
});

describe('publish package shape', () => {
  it('rewrites root dist/ paths into a publish-ready manifest without tooling fields', () => {
    const rootPkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8')) as Record<
      string,
      unknown
    >;
    const published = toPublishPackage(rootPkg);

    expect(published.main).toBe('index.cjs');
    expect(published.types).toBe('index.d.cts');
    expect(JSON.stringify(published)).not.toContain('dist/index');
    expect(published).not.toHaveProperty('scripts');
    expect(published).not.toHaveProperty('devDependencies');
    expect(published).not.toHaveProperty('packageManager');
    expect(published.engines).toEqual({ node: '>=18' });
  });

  it('keeps registries before git and GitHub in release plugin order', async () => {
    const { plugins } = await loadReleaseConfig();
    const names = plugins.map((p) => (Array.isArray(p) ? p[0] : p));
    const npmDist = names.indexOf('@semantic-release/npm');
    const jsr = names.indexOf('@sebbo2002/semantic-release-jsr');
    const git = names.indexOf('@semantic-release/git');
    const github = names.indexOf('@semantic-release/github');

    expect(npmDist).toBeGreaterThan(-1);
    expect(jsr).toBeGreaterThan(npmDist);
    expect(git).toBeGreaterThan(jsr);
    expect(github).toBeGreaterThan(git);
  });
});
