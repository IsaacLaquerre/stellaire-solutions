// Input check for the DPM generator (kept free of heavy imports so the
// main process can use it before starting a worker).
import { UserError } from '../shared/errors.js';

export const MAX_DP = 100;

export function validateDpCount(value) {
    const count = Number(value);
    if (!Number.isInteger(count) || count < 1 || count > MAX_DP) {
        throw new UserError(`La quantité de DP doit être un nombre entier entre 1 et ${MAX_DP}.`, 'invalid-input');
    }
    return count;
}
