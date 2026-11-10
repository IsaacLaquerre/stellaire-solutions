// Fills one copy of the V-3224 A form with pdf-lib.
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { UserError } from '../shared/errors.js';
import { FIRST_PAGE, FONT_SIZE, PAGE_BASELINE, SECOND_PAGE } from './layout.js';

const BLACK = rgb(0, 0, 0);

// Returns the bytes of the filled PDF.
export async function fillReport(templateBytes, values, { dateText, time }) {
    let doc;
    try {
        doc = await PDFDocument.load(templateBytes);
    } catch {
        throw new UserError('Le gabarit PDF est illisible.', 'unreadable');
    }
    const pages = doc.getPages();
    if (pages.length < 2) throw new UserError('Le gabarit PDF doit contenir deux pages.', 'unreadable');
    const font = await doc.embedFont(StandardFonts.Helvetica);

    const at = (page, text, { x, y }, baseline, size) => {
        try {
            page.drawText(text, { x, y: baseline - y, size, font, color: BLACK });
        } catch (err) {
            // Helvetica only covers Latin-1 (WinAnsi) characters.
            throw new UserError(`Caractère non pris en charge dans « ${text} ».`, 'invalid-input');
        }
    };
    const centered = (page, text, pos) =>
        at(page, text, { x: pos.x - font.widthOfTextAtSize(text, FONT_SIZE.second) / 2, y: pos.y }, PAGE_BASELINE.second, FONT_SIZE.second);

    const [first, second] = pages;
    const line = (text, pos) => at(first, text, pos, PAGE_BASELINE.first, FONT_SIZE.first);
    line(values.fileNum, FIRST_PAGE.projectNumber);
    line(values.projectName, FIRST_PAGE.projectName);
    line(values.location, FIRST_PAGE.location);
    line(values.supervisor, FIRST_PAGE.supervisor);
    line(values.signalManager, FIRST_PAGE.signalManager);
    line(dateText, FIRST_PAGE.date);
    line(time, FIRST_PAGE.time);
    centered(second, values.signatory, SECOND_PAGE.signatory);
    centered(second, dateText, SECOND_PAGE.date);

    return doc.save();
}
