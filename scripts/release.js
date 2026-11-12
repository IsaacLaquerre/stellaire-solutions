// Release: rebases dev onto stable when needed, adds a commit named after
// the version (for example v2.0.1) on top of dev, moves stable to it, then
// builds and publishes to GitHub Releases. When stable already holds this
// version, nothing is committed or pushed and the release is published again.
// Usage: npm run release. Add -- --dry-run to run the checks and print the steps only.
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
const say = (text) => console.log(`${DRY ? '[dry run] ' : '> '}${text}`);
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const step = (...args) => {
    say(`git ${args.join(' ')}`);
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

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const { version } = pkg;
const tag = `v${version}`;
const subject = (ref) => git('log', '-1', '--format=%s', ref);
const isAncestor = (a, b) => {
    try {
        git('merge-base', '--is-ancestor', a, b);
        return true;
    } catch {
        return false;
    }
};

// stable and dev are the same commit, and it is this version: nothing to push.
const upToDate = remote.stable && git('rev-parse', 'origin/stable') === git('rev-parse', 'dev') && subject('dev') === tag;

if (upToDate) {
    console.log(`stable already holds ${tag} (${git('rev-parse', '--short', 'dev')}). Publishing the release again.`);
} else {
    // dev's commits are replayed on top of stable when stable is not in dev's
    // history (first release, or a commit made on stable directly).
    const rebase = remote.stable && !isAncestor('origin/stable', 'dev');
    // The version commit already on top of dev: a failed run is resumed.
    const resume = subject('dev') === tag;
    if (!resume && git('log', '--format=%s', 'dev').split('\n').includes(tag)) {
        fail(`${tag} was already released. Bump the version in package.json first.`);
    }

    console.log(`Releasing ${tag} from dev ${git('rev-parse', '--short', 'dev')}`);
    if (rebase) {
        say('git rebase origin/stable');
        if (!DRY) {
            try {
                execFileSync('git', ['rebase', 'origin/stable'], { stdio: 'inherit' });
            } catch {
                execFileSync('git', ['rebase', '--abort'], { stdio: 'ignore' });
                fail('rebasing dev onto stable hit conflicts. Nothing was pushed.');
            }
        }
    }
    if (!resume) step('commit', '--allow-empty', '--quiet', '-m', tag);

    // A rebased dev replaces its history on origin, refused if origin/dev moved since the fetch.
    if (rebase && remote.dev) step('push', `--force-with-lease=refs/heads/dev:${git('rev-parse', 'origin/dev')}`, 'origin', 'dev');
    else step('push', 'origin', 'dev');
    step('push', 'origin', 'dev:stable');
    step('branch', '-f', 'stable', 'dev');
}

// ------------------------------------------------------ GitHub release ----

// RELEASE_API_URL points the script at a fake API in tests.
const API = process.env.RELEASE_API_URL || 'https://api.github.com';
const { owner, repo } = pkg.build.publish;
// build.publish.releaseType: "release" (default), "prerelease", or "draft" (left unpublished).
const releaseType = pkg.build.publish.releaseType || 'release';
const prerelease = releaseType === 'prerelease';
const repoApi = `${API}/repos/${owner}/${repo}`;
const commit = DRY ? git('rev-parse', 'dev') : git('rev-parse', 'stable');

// Notes compare with the previous version commit in stable's history, or
// list all commits for the first release.
const isVersion = (message) => /^v\d+\.\d+\.\d+\S*$/.test(message);
const previous = git('log', '--format=%s', commit).split('\n').find((message) => isVersion(message) && message !== tag);
const changelog = (from) => `**Full Changelog**: https://github.com/${owner}/${repo}/${from ? `compare/${from}...${tag}` : `commits/${tag}`}`;
let notes = changelog(previous);

// Retries network errors: GitHub closes connections left idle during the
// build, and a retry opens a new one.
async function send(method, url, options, attempts = 4) {
    for (let attempt = 1; ; attempt++) {
        try {
            return await fetch(url, { method, ...options });
        } catch (err) {
            if (attempt >= attempts) fail(`GitHub ${method} ${url.slice(API.length)} failed: ${(err.cause && err.cause.message) || err.message}`);
            console.log(`  GitHub ${method} failed (${(err.cause && err.cause.code) || err.message}), retrying`);
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
    }
}

async function github(method, url, body) {
    const res = await send(method, url, {
        headers: {
            Authorization: `Bearer ${process.env.GH_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': `${repo}-release`,
            ...(body ? { 'Content-Type': 'application/json' } : {})
        },
        body: body ? JSON.stringify(body) : undefined
    });
    if (res.status === 404 && method === 'GET') return null;
    if (!res.ok) fail(`GitHub ${method} ${url.slice(API.length)} answered ${res.status}: ${await res.text()}`);
    return res.status === 204 ? null : res.json();
}

// Any release with this tag (drafts included) is replaced, and a tag on
// another commit is removed so GitHub recreates it on this one.
say(`delete GitHub releases tagged ${tag}, if any`);
say(`delete tag ${tag} if it is not on ${commit.slice(0, 7)}`);
say('publish leftover drafts of earlier versions that have their latest.yml');
say(`create draft release ${tag} on ${commit.slice(0, 7)}`);
if (DRY) say(`release notes: ${notes}`);
let draft = null;
if (!DRY) {
    const releases = (await github('GET', `${repoApi}/releases?per_page=100`)) || [];
    for (const release of releases.filter((r) => r.tag_name === tag)) {
        console.log(`  deleting ${release.draft ? 'draft ' : ''}release ${release.id}`);
        await github('DELETE', `${repoApi}/releases/${release.id}`);
    }
    const ref = await github('GET', `${repoApi}/git/ref/tags/${encodeURIComponent(tag)}`);
    if (ref && ref.object && ref.object.sha !== commit) {
        console.log(`  deleting tag ${tag} (was on ${ref.object.sha.slice(0, 7)})`);
        await github('DELETE', `${repoApi}/git/refs/tags/${encodeURIComponent(tag)}`);
    }
    // Drafts of earlier versions left by a run that failed at the end are
    // published, once their upload is complete (latest.yml is there).
    const released = new Set(git('log', '--format=%s', commit).split('\n').filter(isVersion));
    for (const release of releases.filter((r) => r.draft && r.tag_name !== tag && released.has(r.tag_name))) {
        if (!(release.assets || []).some((asset) => asset.name === 'latest.yml')) {
            console.log(`  draft ${release.tag_name} has no latest.yml, left as a draft`);
            continue;
        }
        console.log(`  publishing leftover draft ${release.tag_name}`);
        await github('PATCH', `${repoApi}/releases/${release.id}`, { draft: false, make_latest: 'false' });
    }
    // A compare link needs the previous tag on GitHub.
    if (previous && !(await github('GET', `${repoApi}/git/ref/tags/${encodeURIComponent(previous)}`))) {
        console.log(`  tag ${previous} is not on GitHub, the notes list all commits instead`);
        notes = changelog(null);
    }
    console.log(`  release notes: ${notes}`);
    // Created here so electron-builder's parallel uploads find one release
    // instead of each trying to create it.
    draft = await github('POST', `${repoApi}/releases`, { tag_name: tag, target_commitish: commit, name: version, body: notes, draft: true, prerelease });
}

// The CLI is run with node directly: Node 22 won't spawn .cmd files without a shell.
const builderPkg = require.resolve('electron-builder/package.json');
const cli = path.join(path.dirname(builderPkg), require(builderPkg).bin['electron-builder']);
say('electron-builder --win --publish always (into the draft)');
say(releaseType === 'draft' ? `leave ${tag} as a draft (releaseType is "draft")` : `publish draft release ${tag}${prerelease ? ' as a pre-release' : ''}`);
if (DRY) process.exit(0);
const run = spawnSync(process.execPath, [cli, '--win', '--publish', 'always', '-c.publish.releaseType=draft'], { stdio: 'inherit' });
if (run.status !== 0) fail(`electron-builder failed. The draft ${tag} stays hidden; run npm run release again to replace it.`);

// Notes set again in case electron-builder replaced them while uploading.
// GitHub never marks a pre-release as the latest release.
if (releaseType === 'draft') {
    await github('PATCH', `${repoApi}/releases/${draft.id}`, { body: notes });
    console.log(`Uploaded ${tag} as a draft (releaseType is "draft"); publish it on GitHub.`);
    process.exit(0);
}
await github('PATCH', `${repoApi}/releases/${draft.id}`, { body: notes, draft: false, prerelease, make_latest: prerelease ? 'false' : 'true' });
console.log(`Published ${tag}${prerelease ? ' as a pre-release' : ''}: https://github.com/${owner}/${repo}/releases/tag/${tag}`);