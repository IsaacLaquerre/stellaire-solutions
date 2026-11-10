// DPM, Formulaire DPM and TakeOff: a bordereau upload (+ DP count for DPM).
import { chosenXlsx } from '../files.js';
import { readUpload } from '../upload.js';
import { isValidDpCount } from '../validation.js';

export function dpm(form) {
    const file = form.querySelector('input[type="file"]');
    const qty = form.querySelector('#dpm-qty');
    return {
        module: 'dpm',
        isValid: () => Boolean(chosenXlsx(file)) && isValidDpCount(qty.value),
        buildPayload: async () => ({ module: 'dpm', file: await readUpload(chosenXlsx(file)), dpCount: Number(qty.value) })
    };
}

const uploadOnly = (module) => (form) => {
    const file = form.querySelector('input[type="file"]');
    return {
        module,
        isValid: () => Boolean(chosenXlsx(file)),
        buildPayload: async () => ({ module, file: await readUpload(chosenXlsx(file)) })
    };
};

export const formulaire = uploadOnly('formulaire');
export const takeoff = uploadOnly('takeoff');
