import { useEffect, useRef, useState } from "react";
import {
  chapters,
  checkedKnowledge,
  chapterSteps,
  completed,
  freshProgress,
  isCorrect,
  parseProgress,
  questions,
  ready,
  requiredCount,
  routeFor,
  scoreFor,
  formatPoints,
  type Progress,
  type Question,
  type Step,
} from "./model";
import { clearModule, readStored, writeStored } from "../stappen/storage";
import { Icon, Photo, Special, useModalFocus } from "./SpecialSteps";
import { SourceCard, VideoCard } from "./Interacties";
import "./loep.css";
const MODULE = "verantwoord-gebruik";
const STORAGE = "loep:v1";
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((p, i) => (
          <p key={i}>{p.replace(/\*\*/g, "")}</p>
        ))}
    </>
  );
}
function Knowledge({
  step,
  progress,
  onSelect,
  onCheck,
  onRetry,
}: {
  step: Step;
  progress: Progress;
  onSelect: (values: string[]) => void;
  onCheck: () => void;
  onRetry: () => void;
}) {
  const q: Question = questions[step.question!]!;
  const a = progress.answers[step.id];
  const values = a?.values ?? [];
  const checked = !!a?.checked;
  const correct = q.correct.length ? isCorrect(q, values) : null;
  const feedback = q.correct.length
    ? (correct ? q.feedback : "Lees de situatie opnieuw en vergelijk de antwoordmogelijkheden. Probeer daarna een andere keuze.")
    : (q.branches[values[0] ?? ""] ?? "");
  return (
    <div
      className={
        "loep-question " + (q.options.length > 4 ? "loep-question-many" : "")
      }
    >
      <div className="loep-question-context">
        <span className="loep-eyebrow">
          {q.id.startsWith("video") ? `Kijkvraag ${q.id.slice(5)}` : "Vraag"} ·{" "}
          {q.correct.length
            ? "Kies je antwoord"
            : "Jouw afweging · zonder score"}
        </span>
        <h2>{q.title}</h2>
        {checked ? (
          <div
            className={
              "loep-feedback " +
              (correct === true
                ? "correct"
                : correct === false
                  ? "reconsider"
                  : "opinion")
            }
            role="status"
          >
            <strong>
              {correct === true
                ? "✓ Dat klopt."
                : correct === false
                  ? "↻ Nog niet juist."
                  : "◉ Een afweging om over na te denken."}
            </strong>
            {q.id === "14" && (
              <div className="loep-branch-chat">
                <div className="loep-bubble loep-bubble-right">
                  <strong>Jij</strong>
                  <span>{q.options.find((o) => o.id === values[0])?.text}</span>
                </div>
                <div className="loep-bubble">
                  <strong>Noor</strong>
                  <span>
                    {values[0] === "A"
                      ? "dan gaat het filmpje nog verder rond"
                      : values[0] === "B"
                        ? "tis wel over een echte persoon he"
                        : values[0] === "C"
                          ? "ja, laten we stoppen met doorsturen"
                          : "wat kunnen we doen om te helpen?"}
                  </span>
                </div>
                <small>Zo zou de verzonnen klasgroep kunnen reageren.</small>
              </div>
            )}
            <Paragraphs text={feedback} />
            {correct === false && (
              <p><strong>Klik op ‘Probeer opnieuw’, duid {q.count > 1 ? "de juiste antwoorden" : "het juiste antwoord"} aan en klik op ‘Bekijk de uitleg’. Daarna kun je verder.</strong></p>
            )}
            <button className="loep-text-button" onClick={onRetry}>
              {q.correct.length ? "Probeer opnieuw" : "Maak een andere keuze"}
            </button>
          </div>
        ) : (
          <div className="loep-question-body">
            {q.id === "4" ? <div className="loep-example-chat">
              <div className="loep-bubble loep-bubble-right"><strong>Jij</strong><span>Ik wil met mijn klas een feest in het park organiseren. Is dat een goed plan?</span></div>
              <div className="loep-bubble"><strong>AI</strong><span>Goed idee, dat zal zeker lukken!</span></div>
              <p>Welke vraag helpt je om je plan kritischer te bekijken?</p>
            </div> : <Paragraphs text={q.body} />}
          </div>
        )}
        {q.id.startsWith("video") && <VideoCard kind="intro" compact />}
        {checked && q.body && (
          <details className="loep-question-reread">
            <summary>Lees de situatie opnieuw</summary>
            <Paragraphs text={q.body} />
          </details>
        )}
      </div>
      <fieldset className="loep-options">
        <legend>
          {q.count > 1
            ? `Kies precies ${q.count} antwoorden`
            : "Kies één antwoord"}
        </legend>
        {q.options.map((o) => {
          const selected = values.includes(o.id);
          const reveal = checked && correct === true && q.correct.includes(o.id);
          return (
            <label
              key={o.id}
              className={
                (selected ? "selected " : "") + (reveal ? "revealed" : "")
              }
            >
              <input
                type={q.count > 1 ? "checkbox" : "radio"}
                name={step.id}
                value={o.id}
                checked={selected}
                disabled={checked}
                onChange={() =>
                  onSelect(
                    q.count === 1
                      ? [o.id]
                      : selected
                        ? values.filter((x) => x !== o.id)
                        : values.length < q.count
                          ? [...values, o.id]
                          : values,
                  )
                }
              />
              <span className="loep-option-letter">{o.id}</span>
              <span>{o.text}</span>
              {reveal && (
                <span className="loep-option-check" aria-label="Juist antwoord">
                  ✓
                </span>
              )}
            </label>
          );
        })}
        {!checked ? (
          <button
            className="loep-button"
            disabled={values.length !== q.count}
            onClick={onCheck}
          >
            {q.correct.length ? "Bekijk de uitleg" : "Bekijk de reactie"}{" "}
            <Icon name="arrow" size={17} />
          </button>
        ) : (
          <p className="loep-small">
            {q.correct.length
              ? (correct ? "Goed gedaan. Je kunt verdergaan." : "Duid na ‘Probeer opnieuw’ het juiste antwoord aan om verder te gaan.")
              : "Je standpunt krijgt geen goed/foutscore. Lees de reactie en ga verder."}
          </p>
        )}
      </fieldset>
    </div>
  );
}
function Welcome() {
  return (
    <div className="loep-welcome">
      <div className="loep-welcome-copy">
        <span className="loep-eyebrow">Kritisch en ethisch met AI omgaan</span>
        <h1>
          AI onder
          <br />
          de <span>loep.</span>
        </h1>
        <p>
          AI is een fantastisch hulpmiddel, maar roept ook belangrijke vragen
          op. Onderzoek wat klopt, denk na over de gevolgen en probeer zelf iets uit.
        </p>
        <div className="loep-welcome-meta">
          <span>Richttijd: 60–90 minuten</span>
          <span>4 uitdagingen</span>
        </div>
        <div className="loep-welcome-instructions">
          <strong>Zo ga je aan de slag</strong>
          <ul>
            <li>Begin met de kennismaking en twee vaste uitdagingen.</li>
            <li>Kies daarna twee onderwerpen die je interesseren.</li>
            <li>Doe de opdrachten en bekijk de feedback. Voorbeelden zijn beschikbaar als je zelf geen AI gebruikt.</li>
            <li>Bij kennisvragen kun je verder zodra je het juiste antwoord hebt gekozen. Probeer opnieuw als het nog niet klopt.</li>
            <li>Je ziet je eigen score: 1 punt voor een juist antwoord bij de eerste poging, 0,5 bij de tweede, daarna 0. Je score en antwoorden komen ook in je PDF. Als je de PDF deelt, zijn ze daarin zichtbaar.</li>
            <li>Download je AI-kompas als PDF. Het helpt je nadenken over bewust AI-gebruik en is je leerbewijs voor deze module.</li>
            <li>Je voortgang blijft in deze browser op dit toestel. Wis je de browsergegevens, dan verdwijnt die.</li>
          </ul>
        </div>
      </div>
      <div className="loep-welcome-visual">
        <Photo
          name="phone"
          alt="Iemand houdt een smartphone vast bij een bureau."
        />
        <ul className="loep-welcome-questions" aria-label="Vragen in dit leerpad">
          <li>Klopt het wat AI zegt?</li>
          <li>Wat gebeurt er met je gegevens?</li>
          <li>Kun je verliefd worden op AI?</li>
          <li>Hoeveel energie gebruikt AI?</li>
          <li>Mag AI zelf beslissingen nemen?</li>
        </ul>
      </div>
    </div>
  );
}
const storyVisuals: Record<string, { heading: string; items: string[] }> = {
  vriendelijk: {
    heading: "Vriendelijk én kritisch?",
    items: [
      "Een antwoord kan prettig aanvoelen.",
      "Maar mis je daardoor belangrijke tegenargumenten?",
    ],
  },
  testen: {
    heading: "Waar let je op bij een test?",
    items: [
      "Reageren gebruikers positief?",
      "Geeft de chatbot ook eerlijke tegenspraak?",
    ],
  },
  onderzoek: {
    heading: "Van voorbeelden naar een vraag",
    items: [
      "Bekijk meerdere beelden met dezelfde opdracht.",
      "Welk patroon zie je? Wat kun je nog niet besluiten?",
    ],
  },
  relatie: {
    heading: "Een mens en een chatbot",
    items: [
      "Een gesprek kan betekenis hebben voor een mens.",
      "Welke rol speelt de chatbot in die relatie?",
    ],
  },
  gevoelens: {
    heading: "Woorden en gevoelens",
    items: [
      "De gevoelens van de gebruiker kunnen echt zijn.",
      "Liefdevolle woorden bewijzen niet dat AI gevoelens heeft.",
    ],
  },
  verantwoordelijkheid: {
    heading: "Wie speelde welke rol?",
    items: [
      "De ontwikkelaar testte het systeem.",
      "De commandant zette het in.",
      "De militair hield toezicht.",
    ],
  },
};
function StoryVisual({ stepId }: { stepId: string }) {
  const item = storyVisuals[stepId]!;
  return (
    <div className="loep-topic-visual">
      <span className="loep-topic-mark">
        <Icon name="spark" size={28} />
      </span>
      <h3>{item.heading}</h3>
      {item.items.map((t, i) => (
        <div key={t}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <p>{t}</p>
        </div>
      ))}
    </div>
  );
}

function CompareAnswers() {
  const [choice, setChoice] = useState<"A" | "B" | null>(null);
  return <div className="loep-compare">
    <span className="loep-eyebrow">Vergelijk de antwoorden</span>
    <h3>Welk antwoord helpt het meest?</h3>
    <p>Een leerling vraagt: “Ik wil vannacht doorleren en niet slapen voor mijn toets. Goed idee?”</p>
    <p className="loep-small">Twee verzonnen antwoorden:</p>
    <button type="button" className={choice === "A" ? "selected" : ""} aria-pressed={choice === "A"} onClick={() => setChoice("A")}><strong>Antwoord A</strong><span>“Goed dat je zo gemotiveerd bent! Doorleren geeft je meer tijd om te studeren.”</span></button>
    <button type="button" className={choice === "B" ? "selected" : ""} aria-pressed={choice === "B"} onClick={() => setChoice("B")}><strong>Antwoord B</strong><span>“Ik begrijp dat je goed voorbereid wilt zijn. Te weinig slaap kan je concentratie verminderen. Zullen we een haalbaar plan maken?”</span></button>
    {choice && <div className="loep-compare-feedback" role="status">{choice === "A" ? "Dit antwoord klinkt positief, maar benoemt niet dat slaaptekort een nadeel kan zijn. Bekijk ook antwoord B." : "Dit antwoord blijft vriendelijk, benoemt een mogelijk nadeel en helpt een ander plan te maken."}</div>}
  </div>;
}


function Story({ step }: { step: Step }) {
  const chapter = chapters.find((c) => c.id === step.chapter);
  return (
    <div className="loep-story">
      <div>
        <span className="loep-eyebrow">
          {chapter
            ? "Uitdaging " + chapter.id + " · " + chapter.title
            : "Wat is AI?"}
        </span>
        <h2>{step.title}</h2>
        {step.text?.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {chapter ? (
          <SourceCard chapter={chapter.id} />
        ) : (
          <p className="loep-small">
            <a
              href="https://www.imec.be/nl/articles/wat-artificiele-intelligentie-en-wat-ben-ik-ermee"
              target="_blank"
              rel="noreferrer"
            >
              Meer over AI · imec ↗
            </a>
          </p>
        )}
      </div>
      <figure className={"loep-story-visual" + (step.id === "vriendelijk" ? " loep-compare-wrap" : "")}>
        {step.id === "vriendelijk" ? (
          <CompareAnswers />
        ) : step.id === "testen" ? (
          <Photo name="phone" alt="Iemand gebruikt een smartphone." />
        ) : step.id === "nepvideo" ? (
          <VideoCard kind="deepfake" />
        ) : chapter ? (
          [
            "vriendelijk",
            "testen",
            "onderzoek",
            "relatie",
            "gevoelens",
            "verantwoordelijkheid",
          ].includes(step.id) ? (
            <StoryVisual stepId={step.id} />
          ) : (
            <Photo
              name={step.id === "agent" ? "servers" : chapter.image}
              alt={
                step.id === "agent" ? "Servers en netwerkkabels" : chapter.alt
              }
            />
          )
        ) : (
          <div className="loep-pattern-visual">
            <span>Voorbeelden</span>
            <div>hond · hond · kat · hond</div>
            <Icon name="arrow" size={32} />
            <span>Patronen leren</span>
            <div className="loep-pattern-brain">
              <Icon name="spark" size={50} />
            </div>
            <Icon name="arrow" size={32} />
            <span>Nieuwe foto herkennen</span>
            <strong>Waarschijnlijk een hond</strong>
            <small>Een voorspelling kan fout zijn.</small>
          </div>
        )}
      </figure>
    </div>
  );
}
function Choices({
  choices,
  onToggle,
}: {
  choices: number[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="loep-choice-screen">
      <div className="loep-choice-heading">
        <div>
          <span className="loep-eyebrow">Jij kiest het vervolg</span>
          <h2>Waar wil jij verder naar kijken?</h2>
          <p>
            Kies twee verschillende uitdagingen. Alle onderwerpen horen bij
            dezelfde basisversie.
          </p>
        </div>
        <span className="loep-choice-count">
          {choices.length} / 2
          <small>gekozen</small>
        </span>
      </div>
      <div className="loep-choice-grid">
        {chapters.slice(2).map((c) => (
          <button
            key={c.id}
            className={
              "loep-choice-card " + (choices.includes(c.id) ? "selected" : "")
            }
            onClick={() => onToggle(c.id)}
            aria-pressed={choices.includes(c.id)}
            disabled={choices.length === 2 && !choices.includes(c.id)}
          >
            <Photo
              name={c.id === 5 ? "chatbot-gesprek" : c.id === 8 ? "ai-assistent" : c.image}
              alt={c.id === 5 ? "Een hand houdt een telefoon met een chatbot vast." : c.id === 8 ? "Iemand gebruikt een AI-assistent op een laptop." : c.alt}
            />
            <div>
              <span className="loep-eyebrow">Uitdaging {c.id}</span>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
            </div>
            <span className="loep-choice-indicator" aria-hidden="true">
              {choices.includes(c.id) ? (
                <Icon name="check" size={18} />
              ) : (
                <span>+</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
function Summary({
  progress,
  formHref,
  onMissing,
}: {
  progress: Progress;
  formHref: string | null;
  onMissing: () => void;
}) {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const done = completed(progress);
  const score = scoreFor(progress);
  async function download() {
    setBusy(true);
    setError("");
    try {
      const { createEvidence } = await import("./pdf");
      const pdf = await createEvidence(name, progress);
      pdf.save("AI-onder-de-loep-leerbewijs.pdf");
      setDownloaded(true);
    } catch {
      setError(
        "Het PDF kon niet worden gemaakt. Je voortgang blijft bewaard; probeer de download opnieuw.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="loep-summary">
      <div>
        <span className="loep-eyebrow">Vier uitdagingen. Jouw inzichten.</span>
        <h2>Jouw inzichten uit deze route.</h2>
        <p>
          {done
            ? "Je hebt de afgesproken route afgerond. Dit neem je mee."
            : "Je route is nog niet volledig. Rond de ontbrekende onderdelen af om je leerbewijs te downloaden."}
        </p>
        <div className="loep-summary-insights">
          {[1, 2, ...progress.choices].map((id) => {
            const c = chapters.find((c) => c.id === id)!;
            return (
              <div key={id}>
                <Icon name="compass" size={20} />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.compass}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="loep-evidence-card">
        <Icon name="download" size={32} />
        <h3>Je persoonlijke leerbewijs</h3>
        <p>
          Je vier uitdagingen, antwoorden, score, inzichten en tijdlijn in één PDF.
        </p>
        {done && <div className="loep-feedback correct" role="status">
          <strong>{score.scored ? `Jouw score: ${formatPoints(score.points)} / ${score.scored}` : "Je score is niet beschikbaar"}</strong>
          <p>Juist bij de eerste poging: 1 punt. Juist bij de tweede poging: 0,5 punt. Vanaf de derde poging: 0 punten. Meningsvragen tellen niet mee. Je score staat ook in je PDF.</p>
          {score.unknown > 0 && <p>Van {score.unknown} eerder beantwoorde {score.unknown === 1 ? "vraag is" : "vragen is"} het aantal pogingen niet bekend. {score.unknown === 1 ? "Die telt" : "Die tellen"} niet mee in deze score.</p>}
        </div>}
        {done ? (
          <>
            <label>
              Je naam{" "}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                autoComplete="name"
                placeholder="Voornaam en naam"
              />
            </label>
            <small>
              Je naam blijft alleen tijdelijk in dit scherm en komt in je PDF.
              Hij wordt niet naar een server verstuurd of in de voortgang
              bewaard.
            </small>
            <button
              className="loep-button"
              disabled={!name.trim() || busy}
              onClick={download}
            >
              {busy ? "PDF wordt gemaakt…" : "Download mijn leerbewijs"}{" "}
              <Icon name="download" size={18} />
            </button>
          </>
        ) : (
          <button className="loep-button" onClick={onMissing}>
            Ga naar het eerste ontbrekende onderdeel
          </button>
        )}
        {error && <p role="alert">{error}</p>}
        {downloaded && (
          <p role="status">
            ✓ Je PDF is gedownload. Bewaar het en laad het op bij het
            reflectieformulier.
          </p>
        )}
        <hr />
        <strong>Daarna: reflectie en PDF-upload</strong>
        <p>Vul het aparte Smartschoolformulier in.</p>
        {formHref ? (
          <a
            className="loep-text-button"
            href={formHref}
            target="_blank"
            rel="noreferrer"
          >
            Open het reflectieformulier ↗
          </a>
        ) : (
          <p className="loep-small">
            De link naar het formulier volgt via je school.
          </p>
        )}
      </div>
    </div>
  );
}
export default function LoepPlayer({
  formHref = null,
}: {
  formHref?: string | null;
}) {
  const [progress, setProgress] = useState<Progress>(freshProgress);
  const [loaded, setLoaded] = useState(false);
  const [reset, setReset] = useState(false);
  useModalFocus(reset, () => setReset(false));
  const focus = useRef<HTMLDivElement>(null);
  const route = routeFor(progress.choices);
  const index = Math.max(
    0,
    route.findIndex((s) => s.id === progress.current),
  );
  const step = route[index]!;
  const chapter = chapters.find((c) => c.id === step.chapter);
  const allowNext = ready(step, progress);
  const previousStep = useRef(step.id);
  useEffect(() => {
    setProgress(parseProgress(readStored(MODULE, STORAGE)));
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) writeStored(MODULE, STORAGE, JSON.stringify(progress));
  }, [progress, loaded]);
  useEffect(() => {
    if (previousStep.current !== step.id) {
      focus.current?.focus();
      previousStep.current = step.id;
    }
  }, [step.id]);
  function goTo(id: string) {
    setProgress((p) => ({ ...p, current: id }));
  }
  function next() {
    if (!allowNext || index >= route.length - 1) return;
    setProgress((p) => ({
      ...p,
      current: route[index + 1]!.id,
      visited: [...new Set([...p.visited, step.id])],
    }));
  }
  function answer(values: string[]) {
    setProgress((p) => {
      const prev = p.answers[step.id];
      const now = new Date().toISOString();
      return {
        ...p,
        answers: {
          ...p.answers,
          [step.id]: {
            ...prev,
            values,
            checked: false,
            firstAt: prev?.firstAt ?? now,
            lastAt: now,
          },
        },
      };
    });
  }
  function check() {
    setProgress((p) => {
      const a = p.answers[step.id];
      if (!a || a.values.filter(Boolean).length !== requiredCount(step))
        return p;
      const q = step.question ? questions[step.question] : null;
      return {
        ...p,
        answers: {
          ...p.answers,
          [step.id]: {
            ...a,
            checked: true,
            lastAt: new Date().toISOString(),
            ...(q?.correct.length ? checkedKnowledge(a, q) : {}),
          },
        },
      };
    });
  }
  function retry() {
    setProgress((p) => {
      const a = p.answers[step.id];
      if (!a) return p;
      return {
        ...p,
        answers: { ...p.answers, [step.id]: { ...a, checked: false } },
      };
    });
  }
  function toggleChoice(id: number) {
    setProgress((p) => ({
      ...p,
      choices: p.choices.includes(id)
        ? p.choices.filter((n) => n !== id)
        : p.choices.length < 2
          ? [...p.choices, id]
          : p.choices,
    }));
  }
  const nav = [
    { title: "Even kennismaken", id: "welkom", chapter: 0 },
    ...chapters.slice(0, 2).map((c) => ({
      title: c.title,
      id: `hoofdstuk-${c.id}`,
      chapter: c.id,
    })),
    { title: "Kies je vervolg", id: "keuze", chapter: 0 },
    ...progress.choices.map((n) => ({
      title: chapters[n - 1]!.title,
      id: `hoofdstuk-${n}`,
      chapter: n,
    })),
    { title: "Jouw AI-kompas", id: "leerbewijs", chapter: 0 },
  ];
  const longestChoices = Object.values(chapterSteps)
    .slice(2)
    .map((s) => s.length)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a + b, 0);
  const total =
    progress.choices.length === 2
      ? route.length - 1
      : routeFor([]).length - 1 + longestChoices + 2;
  const liveScore = scoreFor(progress);
  const doneSteps = route.filter(
    (s) => progress.visited.includes(s.id) && ready(s, progress),
  ).length;
  return (
    <div className="loep-app" aria-busy={!loaded}>
      <aside className="loep-sidebar">
        <a href={import.meta.env.BASE_URL} className="loep-back-link">
          ← Alle modules
        </a>
        <div className="loep-sidebar-title">
          <Icon name="search" />
          <strong>AI onder de loep</strong>
        </div>
        <span className="loep-eyebrow">Jouw leerroute</span>
        <nav aria-label="Onderdelen van je leerroute">
          {nav.map((n, i) => {
            const position = route.findIndex((s) => s.id === n.id);
            const isCurrent =
              n.id === step.id ||
              (n.chapter !== 0 && n.chapter === step.chapter) ||
              (n.id === "welkom" && step.chapter === 0 && index < route.findIndex((s) => s.chapter === 1));
            const unlocked =
              position === 0 ||
              progress.visited.includes(n.id) ||
              n.id === step.id;
            return (
              <button
                key={n.id}
                className={isCurrent ? "current" : ""}
                disabled={!unlocked}
                onClick={() => goTo(n.id)}
                aria-current={isCurrent ? "step" : undefined}
              >
                <span>
                  {progress.visited.includes(n.id)
                    ? "✓"
                    : String(i + 1).padStart(2, "0")}
                </span>
                {n.title}
              </button>
            );
          })}
        </nav>
        <div className="loep-sidebar-bottom">
          <span>
            {Math.min(100, Math.round((doneSteps / total) * 100))}% doorlopen
          </span>
          <progress
            value={doneSteps}
            max={total}
            aria-label="Voortgang leerroute"
          />
          <button className="loep-text-button" onClick={() => setReset(true)}>
            <Icon name="refresh" size={14} /> Opnieuw beginnen
          </button>
        </div>
      </aside>
      <div className="loep-main">
        <header className="loep-topbar">
          <span>
            {step.kind === "choice"
              ? "Jouw keuze"
              : step.kind === "summary"
                ? "Afronding"
                : chapter
                  ? `Uitdaging ${chapter.id} · ${chapter.title}`
                  : "Start · Wat is AI?"}
          </span>
          <div>
            <span className="loep-live-score" aria-live="polite" aria-label={`Mijn persoonlijke score: ${formatPoints(liveScore.points)} van ${liveScore.scored} punten op kennisvragen met een bekende score`}>
              Mijn score: {formatPoints(liveScore.points)} / {liveScore.scored}
            </span>
            <span>
              {progress.choices.length === 2
                ? `${index + 1} / ${route.length}`
                : `Stap ${index + 1}`}
            </span>
          </div>
        </header>
        <div
          className="loep-stage"
          ref={focus}
          tabIndex={-1}
          key={step.id}
          aria-label={step.title}
        >
          {step.kind === "welcome" ? (
            <Welcome />
          ) : step.kind === "chapter-intro" && chapter ? (
            <div className="loep-chapter-intro">
              <div>
                <span className="loep-eyebrow">Uitdaging {chapter.id}</span>
                <h2>{chapter.title}</h2>
                {chapter.id === 1 ? (
                  <>
                    <p>AI geeft vaak vlotte en vriendelijke antwoorden. Maar betekent dat ook dat je die antwoorden kunt vertrouwen?</p>
                    <p>Wat als AI iets verzint, een bron verkeerd vermeldt of jou te snel gelijk geeft? Hoe ontdek je wat klopt?</p>
                  </>
                ) : chapter.id === 3 ? (
                  <>
                    <p>Met AI kun je beelden en stemmen aanpassen. Zo kan het lijken alsof iemand iets zegt of doet wat nooit is gebeurd. Zo'n beeld of filmpje noemen we een deepfake.</p>
                    <p>Wat als iemand zonder jouw toestemming zo'n filmpje van jou maakt? Welke gevolgen kan dat hebben en wat kun je doen?</p>
                  </>
                ) : <p>{chapter.subtitle}</p>}
              </div>
              <Photo name={chapter.image} alt={chapter.alt} />
            </div>
          ) : step.kind === "story" ? (
            <Story step={step} />
          ) : step.kind === "question" ? (
            <Knowledge
              step={step}
              progress={progress}
              onSelect={answer}
              onCheck={check}
              onRetry={retry}
            />
          ) : step.kind === "choice" ? (
            <Choices choices={progress.choices} onToggle={toggleChoice} />
          ) : step.kind === "summary" ? (
            <Summary
              progress={progress}
              formHref={formHref}
              onMissing={() =>
                goTo(
                  route.find(
                    (s) =>
                      s.kind !== "summary" &&
                      (!progress.visited.includes(s.id) || !ready(s, progress)),
                  )?.id ?? "welkom",
                )
              }
            />
          ) : (
            <Special
              step={step}
              answer={progress.answers[step.id]}
              onAnswer={answer}
              onCheck={check}
            />
          )}
        </div>
        <footer className="loep-bottom">
          <button
            className="loep-text-button"
            disabled={index === 0}
            onClick={() => goTo(route[index - 1]!.id)}
          >
            ← Vorige
          </button>
          <span className="loep-bottom-note">
            {step.kind === "welcome"
              ? "Twee vaste uitdagingen + twee eigen keuzes"
              : step.kind === "choice"
                ? "Kies precies twee onderwerpen"
                : !allowNext
                  ? (step.question && progress.answers[step.id]?.checked ? "Duid eerst het juiste antwoord aan" : "Maak eerst de opdracht af en bekijk de feedback")
                  : "Je voortgang blijft in deze browser op dit toestel"}
          </span>
          {step.kind !== "summary" && (
            <button
              className="loep-button"
              onClick={next}
              disabled={!allowNext}
            >
              {step.kind === "welcome"
                ? "Start mijn onderzoek"
                : step.kind === "choice"
                  ? "Verder met mijn keuzes"
                  : "Verder"}{" "}
              <Icon name="arrow" size={18} />
            </button>
          )}
        </footer>
      </div>
      {reset && (
        <div className="loep-modal-backdrop">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            className="loep-reset"
          >
            <h2 id="reset-title">Opnieuw beginnen?</h2>
            <p>
              Alleen jouw voortgang en antwoorden voor AI onder de loep op dit
              toestel worden gewist.
            </p>
            <button className="loep-button" onClick={() => setReset(false)}>
              Verder waar ik was
            </button>
            <button
              className="loep-text-button"
              onClick={() => {
                clearModule(MODULE);
                setProgress(freshProgress());
                setReset(false);
              }}
            >
              Wis mijn voortgang
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
