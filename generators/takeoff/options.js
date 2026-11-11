// Input check for the TakeOff generator (kept free of heavy imports so the
// main process can use it before starting a worker).
import { UserError } from '../shared/errors.js';

// Labour unit cost written in the "Take Off" header (cell X1).
export const DEFAULT_LABOUR_COST = 87;

// Empty or missing means the default.
export function validateLabourCost(value) {
    if (value === undefined || value === null || String(value).trim() === '') return DEFAULT_LABOUR_COST;
    const cost = Number(value);
    if (!Number.isFinite(cost) || cost < 0) {
        throw new UserError("Le coût main d'oeuvre doit être un nombre positif.", 'invalid-input');
    }
    return cost;
}
