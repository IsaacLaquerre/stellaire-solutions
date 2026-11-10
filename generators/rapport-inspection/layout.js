// Where each value is printed on the V-3224 A form (assets/source.pdf).
// y positions are measured down from a calibrated baseline per page; these
// numbers come from the original tool and were placed by hand.

export const TEMPLATE_FILE = new URL('./assets/source.pdf', import.meta.url);

export const PAGE_BASELINE = { first: 937.5, second: 355.6 };

export const FONT_SIZE = { first: 7, second: 9 };

// First page: text starts at x.
export const FIRST_PAGE = {
    projectNumber: { x: 98, y: 38.5 },
    projectName: { x: 261, y: 38.5 },
    location: { x: 105.5, y: 52 },
    supervisor: { x: 469.25, y: 52 },
    signalManager: { x: 434, y: 94 },
    date: { x: 149, y: 86 },
    time: { x: 133, y: 94 }
};

// Second page: text is centered on x.
export const SECOND_PAGE = {
    signatory: { x: 102.5, y: 205 },
    date: { x: 247.5, y: 205 }
};

export const folderName = (values) => `${values.fileNum} - ${values.projectName}`;
export const reportName = (values, dateText) => `${dateText} - ${values.fileNum} inspection quotidienne V-3224 A.pdf`;
