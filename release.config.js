module.exports = {
  branches: ['main'],
  preset: 'conventionalcommits',
  presetConfig: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', section: 'Chores' },
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', section: 'Refactoring' },
      { type: 'perf', hidden: true },
      { type: 'test', hidden: true },
    ],
  },
  releaseRules: [
		{ type: 'refactor', release: 'prerelease' },
		{ type: 'feat', release: 'prerelease' },
		{ type: 'fix', release: 'prerelease' },
		{ type: 'chore', release: 'prerelease' },
		{ type: 'docs', release: 'prerelease' },
		{ type: 'style', release: 'prerelease' },
		{ type: 'perf', release: 'prerelease' },
		{ type: 'test', erelease: 'prerelease' },
	],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `./CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/exec',
      {
       prepareCmd: `./release-script.sh \${nextRelease.version}`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [`libs/**/package.json`, `package.json`, `CHANGELOG.md`],
        message: 'chore(release): -v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
