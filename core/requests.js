// Handles a "generate" request from the interface: checks it, runs the
// generator in a worker, and returns a plain response object. No Electron
// import here, so it is tested directly.
import path from 'node:path';
import { GENERATORS, isGenerator } from '../generators/registry.js';
import { validateDpCount } from '../generators/dpm/options.js';
import { validateLabourCost } from '../generators/takeoff/options.js';
import { normalizeFields } from '../generators/rapport-inspection/fields.js';
import { RequestError, failure } from './errors.js';
import { runJob as defaultRunJob } from './jobs.js';
import { validateUpload } from './upload.js';

// Spreadsheet jobs finish in seconds; the report waits for the PDF editor.
const TIMEOUT_MS = { file: 2 * 60 * 1000, fields: 0 };

// Checks the module-specific part of the request and returns the worker input.
function workerInput(id, payload) {
    const spec = GENERATORS[id];
    if (spec.input === 'file') {
        const { bytes } = validateUpload(payload.file, { extensions: spec.extensions });
        const input = { bytes };
        try {
            if (id === 'dpm') input.dpCount = validateDpCount(payload.dpCount);
            if (id === 'takeoff') input.labourCost = validateLabourCost(payload.labourCost);
        } catch (err) {
            throw new RequestError('invalid-input', err.message);
        }
        return input;
    }
    try {
        return { fields: normalizeFields(payload.fields) };
    } catch (err) {
        throw new RequestError('invalid-input', err.message);
    }
}

// `generatorOptions[id]` is merged into that generator's options (tests).
export function createRequestHandler({ outputDir, runJob = defaultRunJob, log = () => {}, generatorOptions = {} }) {
    const running = new Set();
    // Paths this session created; only these can be shown in the explorer.
    const outputs = new Set();

    async function generate(payload) {
        const id = payload && payload.module;
        if (!isGenerator(id)) return failure('unknown-module');
        if (running.has(id)) return failure('busy');

        let input;
        try {
            input = workerInput(id, payload);
        } catch (err) {
            if (err instanceof RequestError) return failure(err.code, err.detail);
            throw err;
        }

        running.add(id);
        try {
            log(`[${id}] démarrage`);
            const options = { ...generatorOptions[id], outputDir: outputDir() };
            const reply = await runJob(id, input, options, { timeoutMs: TIMEOUT_MS[GENERATORS[id].input] });
            if (!reply.ok) {
                log(`[${id}] échec: ${reply.error.code} ${reply.error.message}`);
                return failure(reply.error.code, reply.error.message);
            }
            outputs.add(path.resolve(reply.result.path));
            log(`[${id}] créé: ${reply.result.path}`);
            return { ok: true, path: reply.result.path, isFolder: Boolean(reply.result.isFolder) };
        } finally {
            running.delete(id);
        }
    }

    const isKnownOutput = (p) => typeof p === 'string' && outputs.has(path.resolve(p));

    return { generate, isKnownOutput };
}
