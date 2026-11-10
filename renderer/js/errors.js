// Maps a failed response { error, detail } to an i18n key and variables.
// Generator details are in French; they are shown as is in both languages.

const KEYS = {
    'empty-file': 'errEmpty',
    'too-large': 'errTooLarge',
    'bad-type': 'errType',
    'hash-mismatch': 'errHash',
    unreadable: 'errUnreadable',
    'invalid-input': 'errInvalid',
    'file-locked': 'errLocked',
    busy: 'errBusy',
    'editor-missing': 'errEditor',
    timeout: 'errTimeout',
    user: 'errGeneration',
    internal: 'errGeneration'
};

export function errorMessage(result) {
    const key = KEYS[result && result.error] || 'errUnknown';
    return { key, vars: { detail: (result && result.detail) || '' } };
}
