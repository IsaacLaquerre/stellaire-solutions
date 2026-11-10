// Reads a chosen file into memory with its SHA-256, the form the main
// process expects ({ bytes, name, sha256 }).

async function sha256Hex(buffer) {
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function readUpload(file) {
    const buffer = await file.arrayBuffer();
    return { bytes: new Uint8Array(buffer), name: file.name, sha256: await sha256Hex(buffer) };
}
