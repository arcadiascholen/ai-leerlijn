// Render locally with browser fonts so student answers, including Unicode,
// remain unchanged. Each A4 page becomes a high-resolution image in the PDF.
export async function downloadReport(entries: [string, string][]) {
  await document.fonts.ready;
  const width = 1240, height = 1754, margin = 90;
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('PDF-weergave niet beschikbaar.');
  const tokens = getComputedStyle(document.documentElement);
  const color = (name: string) => tokens.getPropertyValue('--' + name).trim();
  const pages: Uint8Array[] = []; let y = margin, page = 0;
  const begin = () => { page++; ctx.fillStyle = color('surface'); ctx.fillRect(0, 0, width, height); ctx.fillStyle = color('forest'); ctx.font = 'bold 32px sans-serif'; ctx.fillText('Mijn leerhulp — bouwen met AI', margin, y = margin); y += 55; };
  const finish = () => { ctx.fillStyle = color('ink-muted'); ctx.font = '20px sans-serif'; ctx.fillText(`Vibecoding basis · pagina ${page}`, margin, height - 45); const binary = atob(canvas.toDataURL('image/jpeg', .92).split(',')[1]); pages.push(Uint8Array.from(binary, ch => ch.charCodeAt(0))); };
  const line = (text: string, bold: boolean) => { if (y > height - 110) { finish(); begin(); } ctx.fillStyle = color('ink'); ctx.font = `${bold ? 'bold ' : ''}24px sans-serif`; ctx.fillText(text, margin, y); y += 36; };
  begin();
  for (const [label, answer] of entries) {
    if (y > height - 210) { finish(); begin(); }
    for (const [text, bold] of [[label, true], [answer || '(nog niet ingevuld)', false]] as const) {
      ctx.font = `${bold ? 'bold ' : ''}24px sans-serif`;
      for (const paragraph of text.split('\n')) {
        let row = '';
        // Wrap at word boundaries. Split only a word that cannot fit on a full line.
        for (const token of paragraph.match(/\S+\s*|\s+/gu) || []) {
          if (row && ctx.measureText(row + token).width > width - 2 * margin) { line(row.trimEnd(), bold); row = ''; }
          if (ctx.measureText(token).width > width - 2 * margin) {
            for (const character of Array.from(token)) {
              if (ctx.measureText(row + character).width > width - 2 * margin) { line(row, bold); row = ''; }
              row += character;
            }
          } else row += token;
        }
        line(row.trimEnd(), bold);
      }
    }
    y += 22;
  }
  finish();
  const encode = (s: string) => new TextEncoder().encode(s);
  const chunks: Uint8Array[] = [encode('%PDF-1.4\n')]; const offsets = [0]; let size = chunks[0].length;
  const append = (b: Uint8Array) => { chunks.push(b); size += b.length; };
  const object = (id: number, parts: (string | Uint8Array)[]) => { offsets[id] = size; append(encode(`${id} 0 obj\n`)); parts.forEach(p => append(typeof p === 'string' ? encode(p) : p)); append(encode('\nendobj\n')); };
  object(1, ['<< /Type /Catalog /Pages 2 0 R >>']);
  object(2, [`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${3 + i * 3} 0 R`).join(' ')}] >>`]);
  pages.forEach((jpg, i) => { const id = 3 + i * 3; const content = 'q 595.28 0 0 841.89 0 0 cm /Im0 Do Q'; object(id, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 ${id + 1} 0 R >> >> /Contents ${id + 2} 0 R >>`]); object(id + 1, [`<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`, jpg, '\nendstream']); object(id + 2, [`<< /Length ${content.length} >>\nstream\n${content}\nendstream`]); });
  const start = size; append(encode(`xref\n0 ${offsets.length}\n0000000000 65535 f \n${offsets.slice(1).map(o => `${o.toString().padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`));
  const blob = new Blob(chunks.map(c => c.slice().buffer as ArrayBuffer), { type: 'application/pdf' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'mijn-leerhulp-verslag.pdf'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 10000);
}
