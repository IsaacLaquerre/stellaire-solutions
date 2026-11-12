// Release: pushes dev, adds a commit named after the version (for example
// v2.0.1) on stable with dev's files, then builds and publishes to GitHub
// Releases. Usage: npm run release
// Add -- --dry-run to run the checks and print the steps only.
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { parseEnv } from 'node:util';

const require = createRequire(import.meta.url);
const DRY = process.argv.includes('--dry-run');

// A non-empty GH_TOKEN in the git-ignored .env wins over the environment.
const ENV_FILE = new URL('../.env', import.meta.url);
if (fs.existsSync(ENV_FILE)) {
    const { GH_TOKEN } = parseEnv(fs.readFileSync(ENV_FILE, 'utf8'));
    if (GH_TOKEN) process.env.GH_TOKEN = GH_TOKEN;
}
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const step = (...args) => {
    console.log(`${DRY ? '[dry run] ' : '> '}git ${args.join(' ')}`);
    if (!DRY) execFileSync('git', args, { stdio: 'inherit' });
};
const fail = (message) => {
    console.error(`Release stopped: ${message}`);
    process.exit(1);
};

// Runs from dev with a clean working tree.
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
if (branch !== 'dev') fail(`releases run from dev, current branch is ${branch}.`);
if (git('status', '--porcelain')) fail('there are uncommitted changes. Commit or stash them first.');
if (!DRY && !process.env.GH_TOKEN) fail('GH_TOKEN is not set.');

// dev must include origin/dev. A branch missing on origin (first release)
// is created by the pushes below.
const onOrigin = (name) => git('ls-remote', '--heads', 'origin', name) !== '';
const remote = { dev: onOrigin('dev'), stable: onOrigin('stable') };
const fetched = Object.keys(remote).filter((name) => remote[name]);
if (fetched.length) git('fetch', '--quiet', 'origin', ...fetched);
if (remote.dev) {
    const behind = git('rev-list', '--count', 'dev..origin/dev');
    if (behind !== '0') fail(`dev is ${behind} commit(s) behind origin/dev. Pull first.`);
}

const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const tag = `v${version}`;
const devTree = git('rev-parse', 'dev^{tree}');

// stable must hold files from a dev commit, so it never gets direct changes.
// If it already holds this version with dev's files, a failed run is resumed.
let release = null;
if (remote.stable) {
    const stableTree = git('rev-parse', 'origin/stable^{tree}');
    if (!git('log', '--format=%T', 'dev').split('\n').includes(stableTree)) {
        fail('origin/stable has changes that are not on dev. Move them to dev first.');
    }
    if (git('log', '-1', '--format=%s', 'origin/stable') === tag) {
        if (stableTree !== devTree) fail(`stable already holds ${tag}. Bump the version in package.json first.`);
        release = git('rev-parse', 'origin/stable');
    }
}

console.log(`Releasing ${tag} from dev ${git('rev-parse', '--short', 'dev')}`);
step('push', 'origin', 'dev');

// New commit on stable: dev's files, the previous release as parent, the version as message.
if (!release) {
    const parent = remote.stable ? 'origin/stable' : 'dev';
    console.log(`${DRY ? '[dry run] ' : '> '}git commit-tree dev^{tree} -p ${parent} -m ${tag}`);
    release = DRY ? '<new commit>' : git('commit-tree', devTree, '-p', parent, '-m', tag);
}
step('push', 'origin', `${release}:refs/heads/stable`);
step('branch', '-f', 'stable', release);

// The CLI is run with node directly: Node 22 won't spawn .cmd files without a shell.
const builderPkg = require.resolve('electron-builder/package.json');
const cli = path.join(path.dirname(builderPkg), require(builderPkg).bin['electron-builder']);
console.log(`${DRY ? '[dry run] ' : '> '}electron-builder --win --publish always`);
if (DRY) process.exit(0);
const run = spawnSync(process.execPath, [cli, '--win', '--publish', 'always'], { stdio: 'inherit' });
process.exit(run.status === null ? 1 : run.status);
