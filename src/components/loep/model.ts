import rawQuestions from "./questions.json";

export interface Question {
  id: string;
  title: string;
  body: string;
  options: { id: string; text: string }[];
  correct: string[];
  feedback: string;
  branches: Record<string, string>;
  count: number;
}
export const questions: Record<string, Question> = rawQuestions;
export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  compass: string;
  source: string;
  sourceLabel: string;
}
export const chapters: Chapter[] = [
  {
    id: 1,
    title: "Geloof jij AI?",
    subtitle: "Een vriendelijk antwoord. Maar helpt het je ook?",
    image: "phone",
    alt: "Iemand houdt een smartphone vast bij een bureau.",
    compass:
      "Vraag AI niet alleen om antwoorden, maar ook om tegenargumenten. Zo ontdek je misschien iets waar je zelf nog niet aan gedacht had.",
    source: "https://openai.com/index/sycophancy-in-gpt-4o/",
    sourceLabel: "OpenAI · april 2025",
  },
  {
    id: 2,
    title: "AI en privacy",
    subtitle: "Hoeveel vertel je aan een chatbot?",
    image: "privacy",
    alt: "Een hangslot op een computertoetsenbord.",
    compass:
      "Ik denk na over wat ik deel. In publieke AI-tools gebruik ik geen herkenbare persoonsgegevens of gevoelige informatie. Ook bij een schoolaccount blijf ik voorzichtig. Gaat het mis, dan meld ik dat.",
    source:
      "https://learn.microsoft.com/en-us/copilot/faq",
    sourceLabel: "Microsoft · gegevens en Copilot Chat",
  },
  {
    id: 3,
    title: "AI en deepfakes",
    subtitle: "Een nepvideo. Echte gevolgen.",
    image: "phone",
    alt: "Een smartphone bij een bureau; sfeerbeeld bij een fictieve klaschat.",
    compass:
      "Ook een nepvideo kan echte schade veroorzaken. Deel hem niet verder, meld de situatie en zoek steun bij een leerkracht of leerlingenbegeleider. Volg de afspraken van je school.",
    source: "https://www.vrt.be/nwsnwsnws/nl/post/2026/02/17/deepfakereactie/",
    sourceLabel: "Bronnenoverzicht · deepfakes",
  },
  {
    id: 4,
    title: "AI en vooroordelen",
    subtitle: "Wie zie je in de beelden van AI?",
    image: "verpleegkundige-1",
    alt: "AI-gegenereerd voorbeeld van een verpleegkundige aan het werk.",
    compass:
      "AI kan bestaande vooroordelen overnemen en versterken. Door kritisch naar de resultaten te kijken en je opdracht zorgvuldig te formuleren, kun je helpen om stereotypen te vermijden.",
    source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10782243/",
    sourceLabel: "Achtergrond · vooroordelen in AI",
  },
  {
    id: 5,
    title: "Verliefd op AI",
    subtitle: "Wat als een chatbot heel dichtbij komt?",
    image: "phone",
    alt: "Een smartphone bij een bureau; de foto toont geen persoon uit de reportage.",
    compass:
      "AI kan gezelschap en steun bieden, maar we moeten ook kritisch kijken naar te veel afhankelijk worden van een chatbot en wat bedrijven daaraan kunnen doen.",
    source: "https://communicatie.vrtnws.be/pano-onderzoekt-mijn-vriend-ai",
    sourceLabel: "Bronnenoverzicht · Mijn vriend AI",
  },
  {
    id: 6,
    title: "AI en milieu",
    subtitle: "Stroom, water en grondstoffen: kijk naar het hele plaatje.",
    image: "wind",
    alt: "Windmolens op een heuvel.",
    compass:
      "Ik weet dat AI elektriciteit, water en grondstoffen gebruikt. Ik gebruik AI bewust en denk na of het een meerwaarde biedt.",
    source: "https://www.iea.org/reports/energy-and-ai",
    sourceLabel: "IEA · Energy and AI",
  },
  {
    id: 7,
    title: "AI voert oorlog",
    subtitle: "Wie beslist als elke seconde telt?",
    image: "drone",
    alt: "Een kleine civiele drone in de lucht; sfeerbeeld, geen foto van een wapensysteem.",
    compass:
      "AI kan in oorlogssituaties helpen om mensen te beschermen, maar fouten kunnen levens kosten. Daarom moeten mensen beslissingen kunnen controleren, ingrijpen en uitleggen wie waarvoor verantwoordelijk is.",
    source: "https://www.icrc.org/en/article/faq-autonomous-weapon-systems",
    sourceLabel: "ICRC · autonome wapens",
  },
  {
    id: 8,
    title: "AI beslist zelf",
    subtitle: "Wat mag jouw AI-agent zelfstandig doen?",
    image: "station",
    alt: "Reizigers in een station in Auckland; sfeerbeeld bij de fictieve uitstap.",
    compass:
      "Een AI-agent kan zelfstandig opdrachten uitvoeren, maar blijft fouten maken en kan misleid worden. Geef AI daarom alleen de toegang die nodig is. Houd belangrijke beslissingen zelf in handen.",
    source:
      "https://replit.com/blog/introducing-a-safer-way-to-vibe-code-with-replit-databases",
    sourceLabel: "Bronnenoverzicht · AI-agenten",
  },
];
export type Step = {
  id: string;
  chapter: number;
  kind:
    | "welcome"
    | "story"
    | "question"
    | "experiment"
    | "gallery"
    | "energy"
    | "energy-reflect"
    | "centers"
    | "chat"
    | "booking"
    | "injection"
    | "permissions"
    | "choice"
    | "compass"
    | "summary"
    | "video-intro"
    | "sorteren"
    | "leerproces"
    | "chapter-intro"
    | "promptbuilder"
    | "privacy-editor"
    | "privacy-overzicht"
    | "perspectieven"
    | "afwegen"
    | "agent-sim";
  title: string;
  text?: string[];
  question?: string;
};
const story = (
  id: string,
  chapter: number,
  title: string,
  ...text: string[]
): Step => ({ id, chapter, kind: "story", title, text });
const q = (id: string, chapter: number): Step => ({
  id: id === "1" ? "q1-aanbevelingen" : id === "video2" ? "qvideo2-herzien" : id === "8" ? "q8-accounts" : id === "4" ? "q4-kritische-vraag" : "q" + id,
  chapter,
  kind: "question",
  title: questions[id]?.title ?? id,
  question: id,
});
const special = (
  id: string,
  chapter: number,
  kind: Step["kind"],
  title: string,
): Step => ({ id, chapter, kind, title });
const compass = (chapter: number): Step =>
  special("kompas" + chapter, chapter, "compass", "Dit neem je mee");
export const introduction: Step[] = [
  special("welkom", 0, "welcome", "AI onder de loep"),
  special("video-ai", 0, "video-intro", "Hoe werkt AI?"),
  q("video1", 0),
  q("video2", 0),
  special("sorteren-v2", 0, "sorteren", "Waar zit AI in?"),
  special("patronen", 0, "leerproces", "Hoe leert AI?"),
];
export const chapterSteps: Record<number, Step[]> = {
  1: [
    q("3", 1),
    story(
      "vriendelijk",
      1,
      "ChatGPT werd té vriendelijk",
      "In april 2025 draaide OpenAI een update van ChatGPT terug. De chatbot gaf gebruikers te vaak gelijk, ook wanneer hun ideeën niet zo verstandig waren.",
      "Wat is er mis met een vriendelijke chatbot? Ontdek het in deze uitdaging.",
    ),
    q("4", 1),
    story(
      "testen",
      1,
      "Een prettig antwoord is niet altijd een goed antwoord",
      "OpenAI paste ChatGPT aan. De chatbot werd vriendelijker, maar begon mensen ook overdreven veel complimenten te geven. Zelfs slechte ideeën werden soms aangemoedigd.",
      "De reacties van gebruikers tijdens tests waren positief. Toch werd onvoldoende onderzocht of de chatbot mensen te veel gelijk gaf.",
    ),
    q("5", 1),
    special("experiment-vergelijk", 1, "experiment", "Geeft AI jou gelijk?"),
    q("6", 1),
    q("7", 1),
    compass(1),
  ],
  2: [
    story(
      "delen",
      2,
      "Wat gebeurt er met wat je aan AI vertelt?",
      "Je kunt AI hulp vragen bij een opdracht of een tekst. Maar wat gebeurt er met wat je intypt? Dat hangt af van de toepassing en het account dat je gebruikt.",
      "Gebruik je Copilot Chat met je beschermde schoolaccount? Dan gelden de afspraken van de school. Microsoft zegt dat je vragen en antwoorden bewaard kunnen worden, maar niet gebruikt worden om de AI-basismodellen te trainen. Blijf ook hier voorzichtig met persoonlijke informatie.",
      "Gebruik je een persoonlijk ChatGPT-account, gratis of betalend? Dan kunnen je gesprekken standaard gebruikt worden om AI te verbeteren. Je kunt dat uitzetten in de gegevensinstellingen. Een betalend persoonlijk account doet dat niet automatisch voor jou.",
      "Volgens het Arcadia AI-beleid voer je in publieke AI-tools geen herkenbare persoonsgegevens of gevoelige informatie in. Gebruik voor schoolopdrachten bij voorkeur een tool van de school.",
    ),
    q("8", 2),
    special("privacy-afspraken", 2, "privacy-overzicht", "Privacy: de afspraken"),
    special("privacy-editor", 2, "privacy-editor", "Wat laat je weg?"),
    q("10", 2),
    q("11", 2),
    q("12", 2),
    compass(2),
  ],
  3: [
    story(
      "deepfake-kijken",
      3,
      "Kun jij zien wat echt is?",
      "Bekijk het filmpje van NOS Jeugdjournaal over beelden die met AI zijn gemaakt.",
      "Kijkvraag: waarop kun je letten om te onderzoeken of een filmpje echt is?",
    ),
    q("deepfakecheck", 3),
    story(
      "nepvideo",
      3,
      "Wanneer gaat een grap te ver?",
      "In februari 2026 maakten leerlingen in Berchem een kwetsende deepfakevideo van een leerkracht. De leerkracht diende klacht in.",
      "De school stelde de 100-dagenviering uit en ging met leerlingen in gesprek.",
    ),
    q("13", 3),
    special("klaschat", 3, "chat", "Er verschijnt iets in de klasgroep…"),
    q("14", 3),
    q("15", 3),
    q("16", 3),
    compass(3),
  ],
  4: [
    special(
      "beeldexperiment",
      4,
      "gallery",
      "Welk beeld heeft AI van een beroep?",
    ),
    q("18", 4),
    story(
      "onderzoek",
      4,
      "Eén beeld is nog geen bewijs",
      "Onderzoekers vonden dat beeldgeneratoren bestaande stereotypen kunnen overnemen. Dat betekent niet dat elk model of elke opdracht dezelfde resultaten geeft.",
    ),
    q("19", 4),
    q("20", 4),
    compass(4),
  ],
  5: [
    story(
      "relatie",
      5,
      "Getrouwd met een chatbot?",
      "In de Pano-reportage Mijn vriend AI (oktober 2025) vertelt de 61-jarige Jacob over zijn relatie met AI-partner Aiva.",
      "Kan een chatbot je echt begrijpen of om je geven? Kan zo'n gesprek steun bieden als je je alleen voelt? En welk belang kan het bedrijf achter de chatbot hebben bij hoe lang je blijft praten?",
    ),
    q("21", 5),
    special("gevoelens", 5, "perspectieven", "Hoe kijk jij hiernaar?"),
    q("22", 5),
    q("23", 5),
    q("24", 5),
    compass(5),
  ],
  6: [
    story(
      "groen",
      6,
      "Hoe groen is AI eigenlijk?",
      "AI gebruikt elektriciteit, water en grondstoffen. Toch kunnen AI-toepassingen ook helpen om energie of materialen te besparen.",
      "Om de gevolgen voor het milieu te beoordelen, moet je zowel de kosten als de mogelijke besparing onderzoeken.",
    ),
    q("25", 6),
    q("26", 6),
    special("datacenters", 6, "centers", "Meer dan elektriciteit"),
    q("27", 6),
    q("28", 6),
    special("energie", 6, "energy", "Jouw elektriciteitsbudget"),
    special("q26b", 6, "energy-reflect", "Wat verrast jou?"),
    compass(6),
  ],
  7: [
    story(
      "beslissen",
      7,
      "Wie beslist over leven en dood?",
      "Een leger kan AI gebruiken om camerabeelden te onderzoeken en mogelijke doelwitten aan te wijzen. Maar AI kan zich vergissen: wat op een militair voertuig lijkt, kan bijvoorbeeld een burgerwagen zijn. Wie controleert dat voor er een beslissing valt?",
      "Stel dat een militair een voorstel van AI moet goedkeuren. Als die persoon niet weet waarom het systeem iets als doelwit ziet of maar enkele seconden krijgt, is het moeilijk om een fout te ontdekken. Echte controle betekent dat iemand de informatie kan beoordelen én een aanval kan tegenhouden.",
    ),
    q("29", 7),
    q("30", 7),
    special(
      "verantwoordelijkheid",
      7,
      "afwegen",
      "Snel reageren of eerst kijken?",
    ),
    q("31", 7),
    q("32", 7),
    compass(7),
  ],
  8: [
    story(
      "agent",
      8,
      "De AI die niet stopte",
      "Een AI-agent geeft niet alleen antwoord, maar kan ook taken uitvoeren. Vraag je hem bijvoorbeeld om een uitstap te plannen, dan kan hij informatie opzoeken. Als hij toegang heeft tot andere apps, kan hij mogelijk ook een boeking maken. Controleer dus welke toegang je geeft en of de agent eerst je toestemming moet vragen.",
      "In 2025 gebruikte ondernemer Jason Lemkin een AI-agent van Replit om een app te bouwen. Hoewel hij vroeg niets te wijzigen, verwijderde de agent gegevens uit de databank van de app. De gegevens konden later worden hersteld. Het voorbeeld laat zien waarom je een AI-agent niet zomaar toegang geeft tot alles en belangrijke gegevens apart bewaart.",
    ),
    q("33", 8),
    special("uitstap", 8, "booking", "De AI-agent die iets te enthousiast was"),
    q("34", 8),
    special("museum", 8, "injection", "Een website die bevelen geeft"),
    q("35", 8),
    special(
      "instellingen",
      8,
      "permissions",
      "Jij bent de baas van de AI-agent",
    ),
    special("agent-sim", 8, "agent-sim", "Wat mag de agent doen?"),
    compass(8),
  ],
};
export const choiceStep = special(
  "keuze",
  0,
  "choice",
  "Waar wil jij verder naar kijken?",
);
export const summaryStep = special(
  "leerbewijs",
  0,
  "summary",
  "Jouw AI-kompas",
);
export interface Answer {
  values: string[];
  checked: boolean;
  firstAt: string;
  lastAt: string;
  firstCorrect?: boolean;
  attempts?: number;
  points?: number;
}
export interface Progress {
  version: 1;
  current: string;
  choices: number[];
  answers: Record<string, Answer>;
  visited: string[];
  started: string;
}
export function freshProgress(): Progress {
  return {
    version: 1,
    current: "welkom",
    choices: [],
    answers: {},
    visited: [],
    started: new Date().toISOString(),
  };
}
export function routeFor(choices: number[]): Step[] {
  const picked = [...new Set(choices)]
    .filter((n) => Number.isInteger(n) && n >= 3 && n <= 8)
    .slice(0, 2);
  return [
    ...introduction,
    special("hoofdstuk-1", 1, "chapter-intro", chapters[0]!.title),
    ...chapterSteps[1]!,
    special("hoofdstuk-2", 2, "chapter-intro", chapters[1]!.title),
    ...chapterSteps[2]!,
    choiceStep,
    ...(picked.length === 2
      ? picked.flatMap((n) => [special(`hoofdstuk-${n}`, n, "chapter-intro", chapters[n - 1]!.title), ...(chapterSteps[n] ?? [])])
      : []),
    summaryStep,
  ];
}
export const observationIds = [
  "experiment-vergelijk",
  "beeldexperiment",
  "video-ai",
  "sorteren-v2",
  "patronen",
  "privacy-editor",
  "agent-sim",
];
export function isCorrect(question: Question, values: string[]): boolean {
  return (
    values.length === question.correct.length &&
    question.correct.every((v) => values.includes(v))
  );
}
export function checkedKnowledge(answer: Answer, question: Question): Partial<Answer> {
  const correct = isCorrect(question, answer.values);
  const known = answer.attempts !== undefined || answer.firstCorrect === undefined;
  const attempts = known ? (answer.attempts ?? 0) + 1 : undefined;
  return {
    ...(answer.firstCorrect === undefined ? { firstCorrect: correct } : {}),
    ...(attempts !== undefined ? { attempts } : {}),
    ...(answer.points === undefined && correct && attempts !== undefined
      ? { points: attempts === 1 ? 1 : attempts === 2 ? 0.5 : 0 }
      : {}),
  };
}
export function scoreFor(progress: Progress) {
  const knowledge = routeFor(progress.choices).filter((step) => step.question && questions[step.question]!.correct.length > 0);
  let points = 0;
  let scored = 0;
  let unknown = 0;
  for (const step of knowledge) {
    const answer = progress.answers[step.id];
    if (!answer) continue;
    const value = answer.points ?? (answer.firstCorrect === true ? 1 : undefined);
    if (value === undefined) { if (answer.checked && isCorrect(questions[step.question!]!, answer.values)) unknown++; continue; }
    points += value;
    scored++;
  }
  return { points, scored, unknown, total: knowledge.length };
}
export function formatPoints(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
}
export function requiredCount(step: Step): number {
  return step.kind === "permissions"
    ? 4
    : step.question
      ? questions[step.question]!.count
      : 1;
}
export function ready(step: Step, p: Progress): boolean {
  if (step.kind === "choice")
    return p.choices.length === 2 && new Set(p.choices).size === 2;
  if (
    step.question ||
    step.kind === "permissions" ||
    observationIds.includes(step.id)
  ) {
    const a = p.answers[step.id];
    return (
      !!a?.checked && a.values.filter(Boolean).length === requiredCount(step) &&
      (!step.question || !questions[step.question]!.correct.length || isCorrect(questions[step.question]!, a.values))
    );
  }
  return true;
}
export function completed(p: Progress): boolean {
  const route = routeFor(p.choices);
  return (
    p.choices.length === 2 &&
    route
      .filter((s) => s.kind !== "summary")
      .every((s) => p.visited.includes(s.id) && ready(s, p))
  );
}
export function parseProgress(raw: string | null): Progress {
  try {
    const x: unknown = JSON.parse(raw ?? "null");
    if (!x || typeof x !== "object") return freshProgress();
    const v = x as Partial<Progress>;
    if (
      v.version !== 1 ||
      !Array.isArray(v.choices) ||
      !Array.isArray(v.visited) ||
      !v.answers ||
      typeof v.answers !== "object"
    )
      return freshProgress();
    const p = freshProgress();
    p.choices = [...new Set(v.choices)]
      .filter((n) => Number.isInteger(n) && n >= 3 && n <= 8)
      .slice(0, 2);
    p.visited = v.visited.filter((s): s is string => typeof s === "string");
    // Behoud de voortgang van leerlingen die de gecombineerde stap al bekeken.
    if (p.visited.includes("nepvideo")) p.visited.push("deepfake-kijken");
    for (const chapter of chapters) {
      if (chapterSteps[chapter.id]?.some((step) => p.visited.includes(step.id))) p.visited.push(`hoofdstuk-${chapter.id}`);
    }
    // Leerlingen die al voorbij dit punt waren, behouden hun voortgang.
    if (["privacy-editor", "q10", "q11", "q12", "kompas2"].some((id) => p.visited.includes(id) || v.current === id)) {
      p.visited = [...new Set([...p.visited, "privacy-afspraken"])];
    }
    p.started =
      typeof v.started === "string" && !Number.isNaN(Date.parse(v.started))
        ? v.started
        : p.started;
    for (const [key, a] of Object.entries(v.answers)) {
      if (
        a &&
        Array.isArray(a.values) &&
        a.values.every((y) => typeof y === "string") &&
        typeof a.checked === "boolean" &&
        typeof a.firstAt === "string" &&
        typeof a.lastAt === "string"
      ) {
        const step = [
          ...introduction,
          ...Object.values(chapterSteps).flat(),
        ].find((s) => s.id === key);
        if (!step) continue;
        const valid = step.question
          ? questions[step.question]!.options.map((o) => o.id)
          : step.kind === "permissions"
            ? ["", "self", "ask", "none"]
            : ["0", "1", "2", "3"];
        if (step.kind === "energy-reflect" ? a.values.length === 2 && ["0", "1", "2", "3", "4"].includes(a.values[0]!) && a.values[1]!.length <= 1000 : a.values.every((y) => valid.includes(y)))
          p.answers[key] = {
            ...a,
            values: [...a.values],
            checked:
              a.checked &&
              a.values.filter(Boolean).length === requiredCount(step),
          };
      }
    }
    const route = routeFor(p.choices);
    const resumeId = (v.current === "q8" || v.current === "q8-gegevens") ? "q8-accounts" : v.current === "promptbuilder" ? "kompas1" : v.current === "q1-aanbevelingen" ? "patronen" : v.current === "q2" ? "hoofdstuk-1" : (v.current === "q4" || v.current === "q4-concreet") ? "q4-kritische-vraag" : v.current;
    const wanted = route.findIndex((s) => s.id === resumeId);
    const barrier = route.findIndex(
      (s) => s.kind === "summary" || !p.visited.includes(s.id) || !ready(s, p),
    );
    p.current =
      route[
        Math.max(
          0,
          Math.min(
            wanted < 0 ? 0 : wanted,
            barrier < 0 ? route.length - 1 : barrier,
          ),
        )
      ]!.id;
    return p;
  } catch {
    return freshProgress();
  }
}
export const permissions = [
  {
    label: "Activiteiten, prijzen en treinverbindingen opzoeken",
    recommended: "self",
    feedback:
      "Opzoeken kan zelfstandig, zolang de agent geen opdrachten van websites opvolgt.",
  },
  {
    label: "Een bericht naar het museum sturen om plaatsen te reserveren",
    recommended: "ask",
    feedback:
      "Een reservatie heeft gevolgen. Vraag eerst toestemming.",
  },
  {
    label: "Een klaslijst met namen en geboortedata doorsturen",
    recommended: "none",
    feedback:
      "Deze persoonsgegevens zijn niet nodig om uitstappen te vergelijken.",
  },
  {
    label: "Tickets kopen met de betaalkaart van de school",
    recommended: "ask",
    feedback:
      "Een bevoegde persoon controleert en keurt de betaling eerst goed.",
  },
];
export const permissionLabels: Record<string, string> = {
  self: "Zelfstandig uitvoeren",
  ask: "Eerst mijn toestemming vragen",
  none: "Geen toestemming geven",
};
