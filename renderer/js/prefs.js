// Theme and language, kept in localStorage (falls back to defaults if
// storage is unavailable).

const DEFAULTS = { theme: 'dark', lang: 'fr' };
const ALLOWED = { theme: ['dark', 'light'], lang: ['fr', 'en'] };

function read(key) {
    try {
        const value = localStorage.getItem(key);
        return ALLOWED[key].includes(value) ? value : DEFAULTS[key];
    } catch {
        return DEFAULTS[key];
    }
}

function write(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Preference simply not remembered.
    }
}

export const prefs = {
    get theme() { return read('theme'); },
    set theme(value) { write('theme', value); },
    get lang() { return read('lang'); },
    set lang(value) { write('lang', value); }
};
