// Checks a file sent by the interface before it reaches a generator.
import crypto from 'node:crypto';
import { RequestError } from './errors.js';

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

// Zip container (.xlsx) or OLE container (password-encrypted .xlsx).
const SIGNATURES = [
    [0x50, 0x4b, 0x03, 0x04],
    [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]
];
const startsWith = (bytes, sig) => sig.every((b, i) => bytes[i] === b);

export const sha256Hex = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

// `file`: { bytes: Uint8Array, name: string, sha256: string }.
export function validateUpload(file, { extensions, maxBytes = MAX_UPLOAD_BYTES }) {
    if (!file || typeof file !== 'object') throw new RequestError('empty-file');
    const { bytes, name, sha256 } = file;
    if (!(bytes instanceof Uint8Array) || bytes.byteLength === 0) throw new RequestError('empty-file');
    if (bytes.byteLength > maxBytes) throw new RequestError('too-large');
    const lower = typeof name === 'string' ? name.toLowerCase() : '';
    if (!extensions.some((ext) => lower.endsWith(ext))) throw new RequestError('bad-type');
    if (!SIGNATURES.some((sig) => startsWith(bytes, sig))) throw new RequestError('bad-type');
    if (typeof sha256 !== 'string' || sha256Hex(bytes) !== sha256.toLowerCase()) throw new RequestError('hash-mismatch');
    return { bytes, name };
}
