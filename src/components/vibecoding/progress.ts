import { isTime, readAnswer } from '../vragen/answers';
import { readStored, START_KEY, writeStored } from '../stappen/storage';

export const moduleId = 'vibecoding';
export const steps = [
  ['intro', 'Bouw je eigen leerhulp'], ['situatie', 'Noor wil zichzelf beter overhoren'],
  ['definitie', 'Noor bouwt met AI: dat is vibe coden'], ['herkennen', 'Dit gaan we samen doen'],
  ['spectrum', 'Hoe ver kun je gaan?'], ['inspiratie', 'Denk aan je eigen schoolwerk'],
  ['behoefte', 'Eerst: wat heb jij nodig?'], ['mogelijk', 'Welke tool kunnen we vandaag bouwen?'],
  ['helpen', 'Ontdek een mogelijke oplossing'], ['brainstorm', 'Nog geen passend idee?'], ['kiezen', 'Kies jouw hulpmiddel'],
  ['oplossing', 'Beschrijf jouw oplossing'],
  ['bestaat', 'Bestaat dit misschien al?'], ['pakket', 'Leg je materiaal klaar'],
  ['cyclus', 'Bouwen, testen, verbeteren… en opnieuw!'], ['volgorde', 'Help Noor: wat komt eerst?'],
  ['wisselen', 'Vanaf nu werk je met twee tabbladen'], ['overleg', 'Overleg eerst met AI'],
  ['plan', 'Laat je bouwplan samenvatten'], ['bewaarplan', 'Bewaar jouw bouwplan'],
  ['bouwen', 'Laat een eerste versie bouwen'], ['openen', 'Open je leerhulp om te testen'],
  ['voorbeeld', 'Speel tester: vind de fout'], ['testbasis', 'Testkaart 1: werkt de basis?'],
  ['testinhoud', 'Testkaart 2: klopt de inhoud?'], ['testonverwacht', 'Testkaart 3: wat gebeurt er als…?'],
  ['testleren', 'Testkaart 4: helpt dit mij leren?'], ['verbeteren', 'Een fout oplossen of iets beter maken'],
  ['ronde1', 'Verbeteren en opnieuw testen: ronde 1'], ['ronde2', 'Nog een keer itereren: ronde 2'],
  ['terugblik', 'Terug naar jouw leerbehoefte'], ['onthouden', 'Dit neem je mee voor een volgende keer'],
  ['verder', 'Zin om je leerhulp verder uit te bouwen?'], ['bouwtools', 'Tools die gemaakt zijn om te vibe coden'],
  ['verslag', 'Bewaar je verslag voor Smartschool'],
] as const;
export const fieldPanes: Record<string, string> = {
  subject: 'behoefte', difficult: 'behoefte', need: 'behoefte', help: 'oplossing', material: 'pakket',
  plan: 'bewaarplan', basic: 'testbasis', content: 'testinhoud', unexpected: 'testonverwacht',
  learning: 'testleren', change1: 'ronde1', change2: 'ronde2', reflection: 'terugblik', remember: 'onthouden',
};
export function stepNumber(pane: string) { return steps.findIndex(([key]) => key === pane) + 1; }
export function recordVisit(pane: string) {
  const key = `bezocht:${pane}`;
  if (!isTime(readStored(moduleId, key))) writeStored(moduleId, key, new Date().toISOString());
}
export function timelineEntries(): [string, string][] {
  const format = (value: string) => new Intl.DateTimeFormat('nl-BE', { timeZone: 'Europe/Brussels', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(value));
  const moments: { at: string; label: string }[] = [];
  const started = readStored(moduleId, START_KEY);
  if (isTime(started)) moments.push({ at: started, label: 'Leerpad gestart' });
  for (const [pane, title] of steps) {
    const visit = readStored(moduleId, `bezocht:${pane}`);
    if (isTime(visit)) moments.push({ at: visit, label: `${stepNumber(pane)}. ${title} — voor het eerst geopend` });
    const answers = Object.entries(fieldPanes).filter(([, p]) => p === pane).map(([id]) => readAnswer(moduleId, `vibe-${id}`)?.firstAt).filter(isTime).sort();
    if (answers[0]) moments.push({ at: answers[0], label: `${stepNumber(pane)}. ${title} — eerste antwoord opgeslagen` });
  }
  moments.sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
  return [['Tijdlijn', moments.map(moment => `${format(moment.at)} — ${moment.label}`).join('\n') || 'Geen tijdstippen beschikbaar.'], ['Over deze tijdstippen', 'Dit zijn eerste bezoek- en antwoordmomenten uit deze browser. Ze meten geen actieve werktijd. Eerdere momenten van vóór deze versie kunnen ontbreken.']];
}
