// Client-side checks that enable the submit buttons. The main process runs
// its own checks again; these only spare the user a round trip.

export const isXlsxName = (name) => typeof name === 'string' && /\.xlsx$/i.test(name);

export const MAX_DP = 100;
export const MAX_DAYS = 366;

const isIntIn = (text, min, max) => /^\d+$/.test(text) && Number(text) >= min && Number(text) <= max;

export function isValidDpCount(text) {
    return isIntIn(String(text).trim(), 1, MAX_DP);
}

// yyyy-mm-dd that is a real calendar date.
export function isValidDate(text) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
    if (!match) return false;
    const [y, m, d] = match.slice(1).map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

// `values`: trimmed strings of the inspection report form.
export function isValidRapport(values, requiredKeys) {
    if (!requiredKeys.every((key) => values[key])) return false;
    if (!isIntIn(values.days, 1, MAX_DAYS)) return false;
    if (values.startDate && !isValidDate(values.startDate)) return false;
    const min = values.minHour === '' ? 8 : values.minHour;
    const max = values.maxHour === '' ? 17 : values.maxHour;
    if (!isIntIn(String(min), 0, 23) || !isIntIn(String(max), 0, 23)) return false;
    return Number(min) <= Number(max);
}
