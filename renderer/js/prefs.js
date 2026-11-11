// Theme, language and the last TakeOff labour cost, kept in localStorage
// (falls back to defaults if storage is unavailable).

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

// Same default as generators/takeoff/options.js.
const DEFAULT_LABOUR_COST = 87;
const isCost = (value) => value !== null && value.trim() !== '' && Number.isFinite(Number(value)) && Number(value) >= 0;

function readCost() {
    try {
        const value = localStorage.getItem('labourCost');
        return isCost(value) ? Number(value) : DEFAULT_LABOUR_COST;
    } catch {
        return DEFAULT_LABOUR_COST;
    }
}

export const prefs = {
    get labourCost() { return readCost(); },
    set labourCost(value) { if (isCost(String(value))) write('labourCost', String(Number(value))); },
    get theme() { return read('theme'); },
    set theme(value) { write('theme', value); },
    get lang() { return read('lang'); },
    set lang(value) { write('lang', value); }
};
