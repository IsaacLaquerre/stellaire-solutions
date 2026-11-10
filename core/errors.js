// A request the main process refuses before running anything. `code` is
// mapped to a translated message by the interface.
export class RequestError extends Error {
    constructor(code, detail = '') {
        super(detail || code);
        this.name = 'RequestError';
        this.code = code;
        this.detail = detail;
    }
}

export const failure = (code, detail = '') => ({ ok: false, error: code, detail });
