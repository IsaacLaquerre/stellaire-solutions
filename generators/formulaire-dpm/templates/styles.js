// Building blocks for cell templates. Each template is a function so every
// call returns fresh objects that builders can modify safely.

export const BLACK = '#000000';

// borders({ top: 'thin', left: 'medium' }) -> black borders on those sides.
export function borders(sides) {
    const out = {};
    for (const [side, style] of Object.entries(sides)) {
        out[`${side}BorderColor`] = BLACK;
        out[`${side}BorderStyle`] = style;
    }
    return out;
}

export const box = (style) => borders({ top: style, left: style, right: style, bottom: style });

export const font = (fontFamily, fontSize) => ({ fontFamily, fontSize });
export const align = (horizontal, vertical) => ({ align: horizontal, alignVertical: vertical });

export const BOLD = { fontWeight: 'bold' };
export const WRAP = { wrap: true };
export const LINK = { textColor: '#005eaa', textDecoration: { underline: true } };
export const MONEY = { format: '#,##0.00 $;(#,##0.00) $' };

export const bg = (backgroundColor) => ({ backgroundColor });
export const height = (h) => ({ height: h });
export const span = (columnSpan) => ({ columnSpan });
export const rowSpan = (n) => ({ rowSpan: n });

const make = (type) => (value, ...styles) => Object.assign({ type, value }, ...styles);
export const str = make(String);
export const num = make(Number);
export const formula = make('Formula');

// Empty cells that keep their style. An empty Formula cell would be dropped
// by write-excel-file along with its borders, so use these instead.
export const blank = (...styles) => num(null, ...styles);

export const nulls = (n) => Array(n).fill(null);

// A row holding only a height.
export const spacer = (h) => [str('', height(h))];
