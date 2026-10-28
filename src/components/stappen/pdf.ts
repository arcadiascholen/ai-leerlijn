// The PDF of the summary at the end of a module (docs/BRIEFING.md § 6 and
// § 12, "De samenvatting"). The student downloads it and uploads it to the
// final form in Smartschool; the site itself sends nothing anywhere. The PDF
// holds no name or other personal data: the site does not know the student,
// Smartschool links the file to them.
//
// jsPDF is loaded only when the student clicks "Download als pdf"
// (`import('jspdf')` in `downloadPdf`), so the module page pays nothing for it
// before that. Only its text API is used: `.html()` would drag in
// html2canvas and DOMPurify.
//
// The input is plain data, collected by Samenvatting.tsx: the module, the
// choices and one item per question. An item has a `kind`: `answer` for a
// question with one answer, `fields` for a prompt with fields, and room for
// another kind of block without touching the rest.

import type { jsPDF } from 'jspdf';

export const SITE_NAME = 'AI-leerpad Arcadia Scholen';

export interface PdfChoice {
  // The `naam` of the <Keuze> with a capital: "Doel".
  readonly title: string;
  // The text of the chosen option; '' while nothing is chosen.
  readonly label: string;
}

// A question with what the student wrote under it.
export interface PdfAnswer {
  readonly kind: 'answer';
  readonly question: string;
  // '' when the student wrote nothing.
  readonly answer: string;
}

// One field of a prompt with fields: its label, and what the student wrote.
export interface PdfField {
  readonly label: string;
  // '' when the student wrote nothing.
  readonly value: string;
}

// A prompt with fields: the title of its step as the question, and one line
// per field under it.
export interface PdfFields {
  readonly kind: 'fields';
  readonly question: string;
  readonly fields: readonly PdfField[];
}

export type PdfItem = PdfAnswer | PdfFields;

export interface PdfSummary {
  readonly moduleId: string;
  readonly moduleTitle: string;
  readonly choices: readonly PdfChoice[];
  readonly items: readonly PdfItem[];
  // When the student downloads it.
  readonly date: Date;
}

// "10 november 2026".
export function formatDate(date: Date): string {
  return date.toLocaleDateString('nl-BE', { day: 'numeric', month: 'long', year: 'numeric' });
}

// "Doel: Een schriftelijke toets", or "Doel: (niet gekozen)".
export function choiceLine(choice: PdfChoice): string {
  return `${choice.title}: ${choice.label === '' ? '(niet gekozen)' : choice.label}`;
}

export const NOT_ANSWERED = '(niet ingevuld)';

// "Mijn uitleg: …", or "Mijn uitleg: (niet ingevuld)".
export function fieldLine(field: PdfField): string {
  return `${field.label}: ${field.value === '' ? NOT_ANSWERED : field.value}`;
}

// Builds the PDF and hands it to the browser as a download. Rejects when
// jsPDF cannot be loaded (a flaky connection) or the PDF cannot be made; the
// summary then offers to print instead.
export async function downloadPdf(summary: PdfSummary): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  render(doc, summary);
  doc.save(`ai-leerpad-${summary.moduleId}.pdf`);
}

// --- Characters ------------------------------------------------------------
//
// Helvetica is one of the standard PDF fonts: it needs no font file, but it
// only has the characters of WinAnsi (Windows-1252). jsPDF writes any other
// character as the wrong ones without an error ("→" comes out as "!’"). So
// every text goes through `forPdf` first: a few common characters get a
// visible stand-in, emoji are dropped, an accented letter outside WinAnsi
// loses its accent, and anything else becomes "?". Embedding Figtree would
// not avoid this: it has no arrows and no emoji either.

// WinAnsi beyond Latin-1 (0x80–0x9F in Windows-1252).
const WIN_ANSI_EXTRA = new Set('€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ');

const STAND_INS: Readonly<Record<string, string>> = {
  '→': '->',
  '←': '<-',
  '↔': '<->',
  '⇒': '=>',
  '⇐': '<=',
  '⇔': '<=>',
  '−': '-',
  '‐': '-',
  '‑': '-',
  '‒': '-',
  '―': '—',
  '≤': '<=',
  '≥': '>=',
  '≠': '=/=',
  '≈': '~',
  '′': "'",
  '″': '"',
  // Letters that do not lose their stroke or dot by normalising.
  'Ł': 'L',
  'ł': 'l',
  'Đ': 'D',
  'đ': 'd',
  'ı': 'i',
  '\t': ' ',
};

// Emoji and what glues them together: joiners, variation selectors, skin
// tones, flags and keycaps.
const EMOJI = /\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Regional_Indicator}|[\u200d\u20e3\ufe0e\ufe0f]|[\u{e0020}-\u{e007f}]/u;
// Spaces of another width, and characters that take no room at all.
const SPACE = /[\u2000-\u200a\u202f\u205f\u3000]/u;
const INVISIBLE = /[\u200b\u200c\u2060\ufeff]/u;

function inWinAnsi(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  return char === '\n' || (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) || WIN_ANSI_EXTRA.has(char);
}

function standIn(char: string): string {
  if (inWinAnsi(char)) return char;
  const replacement = STAND_INS[char];
  if (replacement !== undefined) return replacement;
  if (EMOJI.test(char) || INVISIBLE.test(char)) return '';
  if (SPACE.test(char)) return ' ';
  // "ş" becomes "s", "ﬁ" becomes "fi", "⅓" becomes "1/3".
  const plain = char.normalize('NFKD').replace(/\p{M}/gu, '').replace(/\u2044/g, '/');
  if (plain !== '' && Array.from(plain).every(inWinAnsi)) return plain;
  // A control character is dropped; any other character stays visible.
  return /\p{Cc}/u.test(char) ? '' : '?';
}

export function forPdf(text: string): string {
  return Array.from(text.normalize('NFC'), standIn)
    .join('')
    .replace(/ {2,}/g, ' ');
}

// --- Layout ----------------------------------------------------------------
//
// A4 portrait in millimetres. Text sizes are in points; a line is 1.4 times
// the size, as on the site.

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const TEXT_WIDTH = PAGE_WIDTH - 2 * MARGIN;
// Below this, the page is full: room for the page number under it.
const BOTTOM = PAGE_HEIGHT - 25;
const PAGE_NUMBER_Y = PAGE_HEIGHT - 15;
const MM_PER_PT = 25.4 / 72;
const LINE_FACTOR = 1.4;

// The colours of the design-system tokens (src/styles/tokens.css), so that
// the PDF matches the site: a hex string, or 0 (black, as a grey level) when
// a token cannot be read.
type Colour = string | 0;

function token(name: string): Colour {
  if (typeof document === 'undefined') return 0;
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  return /^#[0-9a-f]{6}$/i.test(value) ? value : 0;
}

function setTextColour(doc: jsPDF, colour: Colour): void {
  if (colour === 0) doc.setTextColor(0);
  else doc.setTextColor(colour);
}

function setDrawColour(doc: jsPDF, colour: Colour): void {
  if (colour === 0) doc.setDrawColor(0);
  else doc.setDrawColor(colour);
}

interface Style {
  readonly size: number;
  readonly bold?: boolean;
  readonly colour: Colour;
}

function render(doc: jsPDF, summary: PdfSummary): void {
  const ink = token('ink');
  const muted = token('ink-muted');
  const forest = token('forest');
  const line = token('line');

  const site: Style = { size: 10, bold: true, colour: forest };
  const title: Style = { size: 18, bold: true, colour: forest };
  const meta: Style = { size: 10, colour: muted };
  const body: Style = { size: 11, colour: ink };
  const question: Style = { size: 11, bold: true, colour: forest };
  const empty: Style = { size: 11, colour: muted };

  let y = MARGIN;

  function lineHeight(style: Style): number {
    return style.size * LINE_FACTOR * MM_PER_PT;
  }

  // Sets the font and splits `text` into lines that fit the width. jsPDF
  // also breaks a word that is longer than a line.
  function split(text: string, style: Style): string[] {
    doc.setFont('helvetica', style.bold === true ? 'bold' : 'normal');
    doc.setFontSize(style.size);
    return doc.splitTextToSize(forPdf(text), TEXT_WIDTH) as string[];
  }

  function newPage(): void {
    doc.addPage();
    y = MARGIN;
  }

  // Writes `text` from the current position down, on a new page whenever
  // this one is full: a long answer runs on over the next page.
  function write(text: string, style: Style): void {
    const lines = split(text, style);
    const height = lineHeight(style);
    setTextColour(doc, style.colour);
    for (const row of lines) {
      if (y + height > BOTTOM) newPage();
      doc.text(row, MARGIN, y, { baseline: 'top' });
      y += height;
    }
  }

  function rule(): void {
    y += 3;
    setDrawColour(doc, line);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 5;
  }

  doc.setProperties({ title: `${forPdf(summary.moduleTitle)} · ${SITE_NAME}` });
  doc.setLanguage('nl-BE');

  write(SITE_NAME, site);
  y += 1;
  write(summary.moduleTitle, title);
  y += 1;
  write(`gedownload op ${formatDate(summary.date)}`, meta);
  rule();

  if (summary.choices.length > 0) {
    for (const choice of summary.choices) write(choiceLine(choice), body);
    rule();
  }

  // Keep a question with the first line under it.
  function writeQuestion(text: string): void {
    const needed = split(text, question).length * lineHeight(question) + lineHeight(body);
    if (y + needed > BOTTOM && y > MARGIN) newPage();
    write(text, question);
    y += 1;
  }

  summary.items.forEach((item, index) => {
    if (index > 0) y += 5;
    switch (item.kind) {
      case 'answer': {
        writeQuestion(item.question);
        if (item.answer === '') write(NOT_ANSWERED, empty);
        else write(item.answer, body);
        break;
      }
      case 'fields': {
        writeQuestion(item.question);
        for (const field of item.fields) write(fieldLine(field), field.value === '' ? empty : body);
        break;
      }
    }
  });

  // "Pagina 1 van 2" under every page.
  const pages = doc.getNumberOfPages();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(meta.size);
  setTextColour(doc, meta.colour);
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.text(`Pagina ${page} van ${pages}`, PAGE_WIDTH / 2, PAGE_NUMBER_Y, { align: 'center', baseline: 'top' });
  }
}
