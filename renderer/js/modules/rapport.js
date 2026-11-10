// Rapport Inspection: form fields only. Empty date/hours use the defaults
// (today, 8, 17), applied by the generator.
import { isValidRapport } from '../validation.js';

export const FIELDS = ['fileNum', 'projectName', 'location', 'supervisor', 'signalManager', 'signatory', 'startDate', 'minHour', 'maxHour', 'days'];
const REQUIRED = ['fileNum', 'projectName', 'location', 'supervisor', 'signalManager', 'signatory', 'days'];

export function rapport(form) {
    const values = () => Object.fromEntries(FIELDS.map((key) => [key, form.querySelector(`[name="${key}"]`).value.trim()]));
    return {
        module: 'rapport',
        runningKey: 'runningRapport',
        isValid: () => isValidRapport(values(), REQUIRED),
        buildPayload: async () => ({ module: 'rapport', fields: values() })
    };
}
