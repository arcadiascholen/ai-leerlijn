import {
  chapters,
  completed,
  formatPoints,
  isCorrect,
  permissions,
  permissionLabels,
  questions,
  routeFor,
  scoreFor,
  type Progress,
} from "./model";
// Called only by an explicit download. The name never enters stored progress.
export async function createEvidence(name: string, school: string, klas: string, progress: Progress) {
  if (!name.trim() || !school.trim() || !klas.trim() || !completed(progress))
    throw new Error("Rond eerst de volledige route af en vul je naam, school en klas in.");
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF();
  let y = 26;
  const clean = (s: string) =>
    s
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/[^\x20-\x7E\u00A0-\u00FF\n]/g, "");
  function text(s: string, size = 11, bold = false) {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    for (const line of pdf.splitTextToSize(clean(s), 170) as string[]) {
      if (y > 271) {
        pdf.addPage();
        y = 25;
      }
      pdf.text(line, 20, y);
      y += size * 0.48 + 1;
    }
    y += 3;
  }
  function keep(height: number) {
    if (y + height > 271) {
      pdf.addPage();
      y = 26;
    }
  }
  const now = new Date();
  // De eerste pagina is een compact, persoonlijk AI-kompas.
  const score = scoreFor(progress);
  const ids = [1, 2, ...progress.choices];
  pdf.setFillColor(248, 250, 245);
  pdf.rect(0, 0, 210, 297, "F");
  pdf.setFillColor(18, 62, 28);
  pdf.roundedRect(15, 17, 180, 55, 5, 5, "F");
  pdf.setTextColor(210, 233, 199);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text("KRITISCH EN ETHISCH MET AI OMGAAN", 23, 28);
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(27);
  pdf.text("AI onder de loep", 23, 42);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text("Jouw persoonlijke AI-kompas", 23, 52);
  pdf.setFillColor(113, 184, 44);
  pdf.roundedRect(23, 58, 29, 6, 3, 3, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(7);
  pdf.text("LEERBEWIJS", 27, 62.3);

  pdf.setTextColor(18, 62, 28);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  const nameLines = pdf.splitTextToSize(clean(name.trim()), 165) as string[];
  pdf.text(nameLines.slice(0, 2), 18, 82);
  let coverY = 82 + nameLines.slice(0, 2).length * 5;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  const details = pdf.splitTextToSize(clean(school + "  |  " + klas.trim() + "  |  " + now.toLocaleDateString("nl-BE")), 170) as string[];
  pdf.text(details.slice(0, 2), 18, coverY);
  coverY += details.slice(0, 2).length * 4.5 + 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text("Dit neem ik mee", 18, coverY);
  coverY += 5;
  for (const id of ids) {
    const c = chapters.find((chapter) => chapter.id === id)!;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    const lines = pdf.splitTextToSize(clean(c.compass), 157) as string[];
    const height = 12 + lines.length * 4.2;
    pdf.setFillColor(235, 243, 227);
    pdf.roundedRect(15, coverY, 180, height, 3, 3, "F");
    pdf.setFillColor(15, 111, 121);
    pdf.roundedRect(20, coverY + 5, 2, height - 10, 1, 1, "F");
    pdf.setTextColor(18, 62, 28);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(clean(c.title), 26, coverY + 7);
    pdf.setTextColor(31, 48, 39);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(lines, 26, coverY + 12);
    coverY += height + 3;
  }
  pdf.setFillColor(223, 241, 239);
  pdf.roundedRect(15, coverY + 2, 180, 20, 3, 3, "F");
  pdf.setTextColor(4, 91, 102);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(clean(score.scored ? `Jouw score: ${formatPoints(score.points)} / ${score.scored}` : "Jouw score is niet beschikbaar"), 21, coverY + 10);
  pdf.setTextColor(31, 48, 39);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text("1e poging: 1 punt  |  2e poging: 0,5 punt  |  daarna: 0 punten", 21, coverY + 16);
  pdf.setTextColor(25, 40, 30);
  pdf.addPage();
  y = 26;
  text("Jouw antwoorden", 17, true);
  text("Hieronder staan je laatste antwoorden en observaties.");
  if (score.unknown > 0) text(`Van ${score.unknown} eerder beantwoorde ${score.unknown === 1 ? "vraag is" : "vragen is"} het aantal pogingen niet bekend. ${score.unknown === 1 ? "Die telt" : "Die tellen"} niet mee in je score.`);
  const route = routeFor(progress.choices);
  for (const step of route) {
    const a = progress.answers[step.id];
    if (!a) continue;
    if (step.question) {
      const q = questions[step.question]!;
      pdf.setFontSize(11);
      const chosen = a.values
        .map((v) => q.options.find((o) => o.id === v)?.text ?? v)
        .join(" | ");
      const blockLines = pdf.splitTextToSize(
        clean(q.title + chosen),
        170,
      ).length;
      keep(30 + blockLines * 6.3);
      text((q.id.startsWith("video") ? "Kijkvraag " + q.id.slice(5) : "Vraag " + q.id) + ": " + q.title, 11, true);
      text(
        "Laatste keuze: " +
          a.values
            .map((v) => q.options.find((o) => o.id === v)?.text ?? v)
            .join(" | "),
      );
      if (q.correct.length && !isCorrect(q, a.values))
        text(
          "De laatste keuze wijkt nog af van de sleutel. De uitleg is getoond.",
        );
    } else if (step.kind === "energy-reflect") {
      const opinions = ["Veel minder dan ik dacht", "Iets minder dan ik dacht", "Ongeveer zoals ik dacht", "Iets meer dan ik dacht", "Veel meer dan ik dacht"];
      keep(45);
      text("Wat verraste je aan AI?", 11, true);
      text("Mijn inschatting: " + (opinions[Number(a.values[0])] ?? "niet ingevuld"));
      if (a.values[1]?.trim()) text("Mijn toelichting: " + a.values[1].trim());
    } else if (step.kind === "permissions") {
      keep(85);
      text("Vraag 36: agentinstellingen", 11, true);
      for (const [i, p] of permissions.entries()) {
        text(
          p.label +
            ": " +
            permissionLabels[a.values[i]!] +
            " (advies: " +
            permissionLabels[p.recommended] +
            ").",
        );
      }
    } else {
      text(
        step.title +
          (step.kind === "experiment" || step.kind === "gallery"
            ? ": observatie ingevuld, zonder score."
            : ": oefening bekeken."),
      );
    }
  }
  pdf.addPage();
  y = 26;
  text("Tijdlijn", 17, true);
  text("Begonnen: " + new Date(progress.started).toLocaleString("nl-BE"));
  for (const step of route) {
    const a = progress.answers[step.id];
    if (a)
      text(
        (step.question ? "Vraag " + step.question : step.title) +
          " - " +
          new Date(a.firstAt).toLocaleString("nl-BE") +
          "; laatste bewerking " +
          new Date(a.lastAt).toLocaleString("nl-BE"),
        9,
      );
  }
  text("PDF gemaakt: " + now.toLocaleString("nl-BE"));
  text(
    "Vul vervolgens het aparte reflectieformulier in en laad dit leerbewijs daar op.",
  );
  const pages = pdf.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(16, 62, 24);
    pdf.setLineWidth(0.5);
    pdf.line(20, 15, 190, 15);
    pdf.setTextColor(70, 88, 75);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(`AI onder de loep | ${i} / ${pages}`, 20, 287);
  }
  return pdf;
}
