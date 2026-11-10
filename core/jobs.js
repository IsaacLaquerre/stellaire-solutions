// Runs a generator in a worker thread and resolves with its reply.
import { Worker } from 'node:worker_threads';

export const WORKER_URL = new URL('../generators/worker.js', import.meta.url);

// Resolves { ok: true, result } or { ok: false, error: { code, message } }.
// Never rejects. `timeoutMs` of 0 means no limit.
export function runJob(generator, input, options, { workerUrl = WORKER_URL, timeoutMs = 0 } = {}) {
    return new Promise((resolve) => {
        const transfer = input.bytes ? [input.bytes.buffer] : [];
        const worker = new Worker(workerUrl, { workerData: { generator, input, options }, transferList: transfer });
        let timer = null;
        let settled = false;
        const finish = (reply) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            worker.terminate();
            resolve(reply);
        };
        if (timeoutMs > 0) {
            timer = setTimeout(() => finish({ ok: false, error: { code: 'timeout', message: '' } }), timeoutMs);
        }
        worker.once('message', finish);
        worker.once('error', (err) => finish({ ok: false, error: { code: 'internal', message: err.message } }));
        worker.once('exit', (code) => finish({ ok: false, error: { code: 'internal', message: `Worker arrêté (code ${code})` } }));
    });
}
