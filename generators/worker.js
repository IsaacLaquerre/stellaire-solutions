// Worker thread entry: runs one generator so the window stays responsive.
// workerData: { generator, input, options }. Replies once with
// { ok: true, result } or { ok: false, error: { code, message } }.
import { parentPort, workerData } from 'node:worker_threads';
import { serializeError } from './shared/errors.js';
import { loadGenerator } from './registry.js';

try {
    const { generate } = await loadGenerator(workerData.generator);
    const input = { ...workerData.input };
    // Transferred bytes arrive as a Uint8Array.
    if (input.bytes) input.buffer = Buffer.from(input.bytes.buffer, input.bytes.byteOffset, input.bytes.byteLength);
    const result = await generate(input, workerData.options);
    parentPort.postMessage({ ok: true, result });
} catch (err) {
    parentPort.postMessage({ ok: false, error: serializeError(err) });
}
