// Release: fast-forwards stable to dev, pushes both, then builds and
// publishes to GitHub Releases. Usage: npm run release
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
const isAncestor = (a, b) => {
    try {
        git('merge-base', '--is-ancestor', a, b);
        return true;
    } catch {
        return false;
    }
};

// Runs from dev with a clean working tree.
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
if (branch !== 'dev') fail(`releases run from dev, current branch is ${branch}.`);
if (git('status', '--porcelain')) fail('there are uncommitted changes. Commit or stash them first.');
if (!DRY && !process.env.GH_TOKEN) fail('GH_TOKEN is not set.');

// dev must include origin/dev, and stable may only move forward. A branch
// missing on origin (first release) is created by the pushes below.
const onOrigin = (name) => git('ls-remote', '--heads', 'origin', name) !== '';
const remote = { dev: onOrigin('dev'), stable: onOrigin('stable') };
const fetched = Object.keys(remote).filter((name) => remote[name]);
if (fetched.length) git('fetch', '--quiet', 'origin', ...fetched);
if (remote.dev) {
    const behind = git('rev-list', '--count', 'dev..origin/dev');
    if (behind !== '0') fail(`dev is ${behind} commit(s) behind origin/dev. Pull first.`);
}
if (remote.stable && !isAncestor('origin/stable', 'dev')) fail('origin/stable has commits that dev does not. Merge them into dev first.');

const { version } = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
console.log(`Releasing ${version} from dev ${git('rev-parse', '--short', 'dev')}`);

step('push', 'origin', 'dev');
step('push', 'origin', 'dev:stable');
step('branch', '-f', 'stable', 'dev');

// The CLI is run with node directly: Node 22 won't spawn .cmd files without a shell.
const builderPkg = require.resolve('electron-builder/package.json');
const cli = path.join(path.dirname(builderPkg), require(builderPkg).bin['electron-builder']);
console.log(`${DRY ? '[dry run] ' : '> '}electron-builder --win --publish always`);
if (DRY) process.exit(0);
const run = spawnSync(process.execPath, [cli, '--win', '--publish', 'always'], { stdio: 'inherit' });
process.exit(run.status === null ? 1 : run.status);
