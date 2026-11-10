// Validation of the inspection report form. Used by the main process before
// starting a job, and again by the generator itself.
import { UserError } from '../shared/errors.js';
import { isoDate } from '../shared/files.js';

export const TEXT_FIELDS = ['fileNum', 'projectName', 'location', 'supervisor', 'signalManager', 'signatory'];
export const DEFAULTS = { minHour: 8, maxHour: 17 };
export const MAX_DAYS = 366;
const MAX_TEXT = 200;

const invalid = (message) => new UserError(message, 'invalid-input');

// "2026-11-10" -> local Date at midnight, or null if not a real date.
export function parseLocalDate(text) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
    if (!match) return null;
    const [year, month, day] = match.slice(1).map(Number);
    const date = new Date(year, month - 1, day);
    const valid = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    return valid ? date : null;
}

function integer(value, fallback, label, min, max) {
    const text = String(value ?? '').trim();
    if (text === '') return fallback;
    const n = Number(text);
    if (!Number.isInteger(n) || n < min || n > max) throw invalid(`${label} doit être un nombre entier entre ${min} et ${max}.`);
    return n;
}

// Returns clean values or throws a UserError naming the first bad field.
export function normalizeFields(raw, now = new Date()) {
    if (!raw || typeof raw !== 'object') throw invalid('Formulaire incomplet.');
    const out = {};
    for (const key of TEXT_FIELDS) {
        const value = typeof raw[key] === 'string' ? raw[key].trim() : '';
        if (!value) throw invalid('Tous les champs texte sont obligatoires.');
        if (value.length > MAX_TEXT) throw invalid(`Un champ dépasse ${MAX_TEXT} caractères.`);
        out[key] = value;
    }

    const dateText = typeof raw.startDate === 'string' ? raw.startDate.trim() : '';
    const startDate = dateText ? parseLocalDate(dateText) : parseLocalDate(isoDate(now));
    if (!startDate) throw invalid('Date de début invalide. Format attendu : AAAA-MM-JJ.');
    out.startDate = isoDate(startDate);

    out.minHour = integer(raw.minHour, DEFAULTS.minHour, "L'heure minimum", 0, 23);
    out.maxHour = integer(raw.maxHour, DEFAULTS.maxHour, "L'heure maximum", 0, 23);
    if (out.minHour > out.maxHour) throw invalid("L'heure minimum doit être inférieure ou égale à l'heure maximum.");

    out.days = integer(raw.days, undefined, 'Le nombre de jours', 1, MAX_DAYS);
    if (out.days === undefined) throw invalid('Le nombre de jours est obligatoire.');
    return out;
}
