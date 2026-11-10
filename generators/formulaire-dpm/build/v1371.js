import { V1371, entry, footer, header, v1371SheetName } from '../templates/v1371.js';
import { toNumber } from '../utils.js';

// One measurement sheet per article.
export function buildV1371(articleRows) {
    return articleRows.map(({ slip, article, rapportRow }) => {
        const data = [
            ...header({
                rapportRow,
                articleNumber: toNumber(article.number, `bordereau ${slip.number}`),
                slipIndex: slip.index
            }),
            ...Array.from({ length: V1371.entryRows }, entry),
            ...footer()
        ];
        return { name: v1371SheetName(slip, article), data };
    });
}
