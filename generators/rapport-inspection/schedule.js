// Dates and inspection times of the generated reports.
import { isoDate } from '../shared/files.js';
import { parseLocalDate } from './fields.js';

// Consecutive calendar days starting at `startDate` (yyyy-mm-dd).
export function reportDates(startDate, days) {
    const start = parseLocalDate(startDate);
    return Array.from({ length: days }, (_, i) => {
        const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        return isoDate(d);
    });
}

// Random quarter-hour between minHour:00 and maxHour:00 inclusive, as "9h15".
// `random` returns a number in [0, 1), like Math.random.
export function randomTime(minHour, maxHour, random = Math.random) {
    const slots = (maxHour - minHour) * 4 + 1;
    const minutes = minHour * 60 + Math.floor(random() * slots) * 15;
    return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}`;
}
