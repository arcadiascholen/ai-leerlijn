import {
  chapters,
  completed,
  isCorrect,
  permissions,
  permissionLabels,
  questions,
  routeFor,
  type Progress,
} from "./model";
// Called only by an explicit download. The name never enters stored progress.
export async function createEvidence(name: string, progress: Progress) {
  if (!name.trim() || !completed(progress))
    throw new Error("Rond eerst de volledige route af en vul je naam in.");
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
  text("AI onder de loep", 25, true);
  text("Persoonlijk leerbewijs en AI-kompas", 13);
  text(name.trim(), 15, true);
  text("Gemaakt: " + now.toLocaleString("nl-BE"));
  text(
    "Een leerbewijs van deelname; geen schoolcijfer of garantie van beheersing. De antwoorden en tijdstippen zijn lokaal op dit toestel vastgelegd.",
  );
  const ids = [1, 2, ...progress.choices];
  text("Jouw vier uitdagingen", 17, true);
  for (const id of ids) {
    const c = chapters.find((c) => c.id === id)!;
    text(c.title, 13, true);
    text(c.compass);
  }
  pdf.addPage();
  y = 26;
  text("Jouw antwoorden", 17, true);
  text("Hieronder staan je laatste antwoorden en observaties. Je persoonlijke score staat niet in dit leerbewijs.");
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
    pdf.setFontSize(9);
    pdf.text(`AI onder de loep | ${i} / ${pages}`, 20, 287);
  }
  return pdf;
}
