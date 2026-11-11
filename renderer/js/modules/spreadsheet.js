// DPM, Formulaire DPM and TakeOff: a bordereau upload (+ DP count for DPM,
// labour cost for TakeOff).
import { chosenXlsx } from '../files.js';
import { prefs } from '../prefs.js';
import { readUpload } from '../upload.js';
import { isValidDpCount, isValidLabourCost } from '../validation.js';

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
export function takeoff(form) {
    const file = form.querySelector('input[type="file"]');
    const cost = form.querySelector('#takeoff-labour');
    // The last cost used becomes the default and placeholder.
    const remember = () => {
        const value = cost.value.trim();
        if (value === '' || !isValidLabourCost(value)) return;
        prefs.labourCost = value;
        cost.placeholder = String(prefs.labourCost);
    };
    cost.value = cost.placeholder = String(prefs.labourCost);
    cost.addEventListener('change', remember);
    return {
        module: 'takeoff',
        isValid: () => Boolean(chosenXlsx(file)) && isValidLabourCost(cost.value),
        buildPayload: async () => {
            remember();
            // Empty field: the placeholder (last remembered cost).
            return { module: 'takeoff', file: await readUpload(chosenXlsx(file)), labourCost: cost.value.trim() || cost.placeholder };
        }
    };
}
