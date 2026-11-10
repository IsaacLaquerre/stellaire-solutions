// Errors a generator can raise on purpose. Their message is French and safe
// to show to the user as is. Anything else is treated as an internal error.

export class UserError extends Error {
    constructor(message, code = 'user') {
        super(message);
        this.name = 'UserError';
        this.code = code;
    }
}

// The output file is open in another program (usually Excel).
export class FileLockedError extends UserError {
    constructor(filePath) {
        super(`Le fichier « ${filePath} » est ouvert dans une autre application. Fermez-le puis réessayez.`, 'file-locked');
        this.name = 'FileLockedError';
        this.filePath = filePath;
    }
}

// Turns any thrown value into the plain object a worker sends back.
// `code` drives the message the interface shows; `message` is the detail.
export function serializeError(err) {
    if (err instanceof UserError) return { code: err.code, message: err.message };
    // A TypeError while reading means the file lacks the expected structure.
    if (err instanceof TypeError) return { code: 'unreadable', message: err.message };
    return { code: 'internal', message: err && err.message ? err.message : String(err) };
}
