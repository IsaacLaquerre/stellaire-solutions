// Styled file pickers: shows the chosen file name on the drop zone.
import { isXlsxName } from './validation.js';

export function setupFileDrops(root = document) {
    root.querySelectorAll('.file-drop input[type="file"]').forEach((input) => {
        input.addEventListener('change', () => {
            const drop = input.closest('.file-drop');
            const file = input.files[0];
            drop.querySelector('.file-drop-name').textContent = file ? file.name : '';
            drop.classList.toggle('has-file', Boolean(file));
        });
    });
}

// The chosen .xlsx file of an input, or null.
export function chosenXlsx(input) {
    const file = input.files[0];
    return file && isXlsxName(file.name) ? file : null;
}
