import { useState } from "react";

type Actions = {
  onAnswer: (v: string[]) => void;
  onCheck: () => void;
  checked?: boolean;
};

export function VideoCard({ kind, compact = false }: { kind: "intro" | "deepfake"; compact?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const v =
    kind === "intro"
      ? {
          id: "IsrnnWOGkqk",
          title: "Hoe werkt AI?",
          source: "Karrewiet · VRT",
          url: "https://www.youtube.com/watch?v=IsrnnWOGkqk",
          summary:
            "AI leert vaak patronen uit veel voorbeelden, zoals tekst of beelden. Die patronen helpen bij voorspellen of nieuwe inhoud maken. Ook een overtuigend resultaat kan fout zijn: blijf controleren.",
        }
      : {
          id: "uHaJH0ojL8s",
          title: "Kun jij nog zien of een video echt is?",
          source: "NOS Jeugdjournaal",
          url: "https://www.youtube.com/watch?v=uHaJH0ojL8s",
          summary:
            "Een video kan echt lijken en toch met AI gemaakt of aangepast zijn. Aan het beeld alleen zie je dat niet altijd. Controleer wie het bericht verspreidt, zoek de oorspronkelijke bron en vergelijk met andere betrouwbare informatie. Soms blijf je onzeker.",
        };
  return (
    <section className={compact ? "loep-video-card loep-video-compact" : "loep-video-card"} aria-label={v.title}>
      {!playing ? (
        <button className="loep-video-poster" onClick={() => setPlaying(true)}>
          <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" />
          <span className="loep-video-play" aria-hidden="true">
            ▶
          </span>
          <span>
            <small>{v.source}</small>
            <strong>{v.title}</strong>
            <small>{compact ? "Bekijk het filmpje opnieuw" : "Bekijk de video"}</small>
          </span>
        </button>
      ) : (
        <iframe
          title={v.title}
          src={`https://www.youtube-nocookie.com/embed/${v.id}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <div className="loep-video-foot">
        {!compact && <span>De video opent via YouTube.</span>}
        <a href={v.url} target="_blank" rel="noreferrer">
          Open video ↗
        </a>
      </div>
      {kind === "deepfake" && (
        <>
          <p className="loep-small">Kijkvraag: hoe controleer je wie een video heeft gemaakt?</p>
          <details><summary>Lees de uitleg als je niet kijkt</summary><p>{v.summary}</p></details>
        </>
      )}
    </section>
  );
}

export function SourceCard({ chapter }: { chapter: number }) {
  const sources: Record<
    number,
    { source: string; date: string; why: string; url: string }
  > = {
    1: {
      source: "OpenAI",
      date: "2025",
      why: "Het bedrijf vertelt waarom het de update terugdraaide.",
      url: "https://openai.com/index/expanding-on-sycophancy/",
    },
    2: {
      source: "Tweakers",
      date: "2025",
      why: "Het artikel legt uit hoe gedeelde gesprekken in zoekmachines konden verschijnen.",
      url: "https://tweakers.net/nieuws/237718/chatgpt-stopt-met-optie-om-chats-door-zoekmachines-te-laten-indexeren.html",
    },
    3: {
      source: "VRT NWS",
      date: "2026",
      why: "Leerlingen maakten een kwetsende nepvideo van een leerkracht. De leerkracht diende een klacht in.",
      url: "https://www.vrt.be/nwsnwsnws/nl/post/2026/02/17/deepfakereactie/",
    },
    4: {
      source: "JAMA Surgery",
      date: "2023",
      why: "Onderzoekers vergeleken hoe drie beeldmakers chirurgen in beeld brachten.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10782243/",
    },
    5: {
      source: "Pano · VRT",
      date: "2025",
      why: "Jacob vertelt over zijn relatie met AI-partner Aiva. Pano onderzoekt ook de bedrijven achter zulke chatbots.",
      url: "https://communicatie.vrtnws.be/pano-onderzoekt-mijn-vriend-ai",
    },
    6: {
      source: "Internationaal Energieagentschap",
      date: "2025",
      why: "Het rapport bekijkt zowel het energiegebruik van AI als kansen om energie te besparen.",
      url: "https://www.iea.org/reports/energy-and-ai",
    },
    7: {
      source: "Rode Kruis · ICRC",
      date: "2026",
      why: "Het Rode Kruis bespreekt risico’s en menselijke controle bij autonome wapens.",
      url: "https://www.icrc.org/en/article/faq-autonomous-weapon-systems",
    },
    8: {
      source: "Replit",
      date: "2025",
      why: "Replit beschrijft hoe testgegevens en echte gegevens beter gescheiden kunnen worden.",
      url: "https://replit.com/blog/introducing-a-safer-way-to-vibe-code-with-replit-databases",
    },
  };
  const questions: Record<number, string> = {
    1: "Wat vertelt de maker zelf, en welke andere bron kun je raadplegen?",
    2: "Wat is het verschil tussen een link delen en vindbaar maken?",
    3: "Wie geeft informatie en hoe kun je die controleren?",
    4: "Wat onderzochten de onderzoekers precies?",
    5: "Welk perspectief laat de reportage zien?",
    6: "Welke kosten en mogelijke besparingen beschrijft het rapport?",
    7: "Wat is nodig om menselijk toezicht betekenisvol te maken?",
    8: "Welke maatregel beschrijft de maker van het systeem?",
  };
  const info = sources[chapter];
  if (!info) return null;
  return (
    <details className="loep-source-card">
      <summary>Waar komt dit vandaan?</summary>
      <p>
        <strong>
          {info.source} · {info.date}
        </strong>
        <br />
        {info.why}
      </p>
      <p className="loep-small">Denkvraag: {questions[chapter]}</p>
      <a href={info.url} target="_blank" rel="noreferrer">
        Bekijk de bron ↗
      </a>
    </details>
  );
}

export function VideoIntro({ onAnswer, onCheck, checked }: Actions) {
  return (
    <div className="loep-discover loep-intro-video">
      <div>
        <span className="loep-eyebrow">Start · bekijk het filmpje</span>
        <h2>Hoe werkt AI?</h2>
        <p>Jensen vraagt AI-kenner Lieven Scheire hoe een computer honden en katten kan leren herkennen.</p>
        <p>Bekijk het filmpje van Karrewiet. Daarna krijg je twee vragen over wat je zag.</p>
        {checked ? <p className="loep-note" role="status">✓ Je kunt verder naar de kijkvragen.</p> : (
          <button className="loep-button" onClick={() => { onAnswer(["0"]); onCheck(); }}>
            Ik heb het filmpje bekeken
          </button>
        )}
      </div>
      <VideoCard kind="intro" />
    </div>
  );
}

const examples = [
  { text: "Een mailfilter leerde uit voorbeelden om ongewenste berichten te herkennen.", ai: true, explain: "De filter gebruikt wat hij uit voorbeelden leerde om nieuwe berichten in te schatten." },
  { text: "Een webshop geeft bij het afrekenen automatisch 10% korting op elk product.", ai: false, explain: "Voor iedereen dezelfde korting berekenen kan met een vaste rekenregel." },
  { text: "Een telefoon herkent het gezicht van de eigenaar om te ontgrendelen.", ai: true, explain: "Gezichtsherkenning gebruikt AI om kenmerken in beelden te herkennen." },
  { text: "Een routeplanner vergelijkt de afstanden van drie vaste routes en kiest de kortste.", ai: false, explain: "De routeplanner vergelijkt de drie afstanden met een vaste regel." },
  { text: "Een muziekapp leerde uit luistergedrag om nummers aan te raden.", ai: true, explain: "De app gebruikt patronen uit luistergedrag voor aanbevelingen." },
  { text: "Een leerlingenlijst wordt op achternaam van A tot Z gesorteerd.", ai: false, explain: "Alfabetisch sorteren volgt een vaste regel en heeft geen AI nodig." },
];
export function SortIntro({ onAnswer, onCheck, checked }: Actions) {
  const [choices, setChoices] = useState<boolean[]>(() => examples.map(() => false));
  const [result, setResult] = useState(false);
  function toggle(i: number) {
    setChoices((old) => old.map((value, index) => index === i ? !value : value));
    setResult(false);
    if (checked) onAnswer(["0"]);
  }
  return (
    <div className="loep-sort-screen">
      <span className="loep-eyebrow">Zelf onderzoeken</span>
      <h2>Wordt hier AI gebruikt?</h2>
      <p>AI kan leren uit veel voorbeelden, zoals in het filmpje. Andere programma’s volgen stappen die mensen vooraf vastleggen. Alle schakelaars staan op <strong>geen AI</strong>. Zet de schakelaar aan als jij denkt dat er AI wordt gebruikt.</p>
      <div className="loep-sort-grid">
        {examples.map((e, i) => (
          <div className="loep-sort-item" key={e.text}>
            <p className="loep-sort-example" id={`loep-ai-example-${i}`}>{e.text}</p>
            <div className="loep-sort-control">
              <button type="button" role="switch" aria-checked={choices[i]}
                aria-labelledby={`loep-ai-example-${i}`} onClick={() => toggle(i)}
                className="loep-ai-switch">
                <span aria-hidden="true" />
              </button>
              <span>{choices[i] ? "AI" : "Geen AI"}</span>
            </div>
            {result && <p className="loep-sort-feedback" role="status"><strong>{choices[i] === e.ai ? "✓ Goed gezien." : "↻ Kijk nog eens."}</strong> {e.explain}</p>}
          </div>
        ))}
      </div>
      {!result && <button className="loep-button" onClick={() => { setResult(true); onAnswer(["0"]); onCheck(); }}>Bekijk de uitleg</button>}
      {checked && !result && <p className="loep-small">Je deed deze oefening eerder. Je keuzes zijn niet bewaard; je kunt opnieuw oefenen.</p>}
    </div>
  );
}

const leerprocesStappen = [
  "Verzamel veel foto’s van honden en katten met het juiste antwoord erbij.",
  "Laat het programma voorspellen of er een hond of een kat op een foto staat.",
  "Vergelijk de voorspelling met het juiste antwoord en pas het programma aan. Herhaal dit vaak.",
  "Laat het programma proberen een nieuwe foto te herkennen.",
];

export function Leerproces({ onAnswer, onCheck, checked }: Actions) {
  const [order, setOrder] = useState([2, 0, 3, 1]);
  const [result, setResult] = useState<boolean | null>(null);
  const [dragged, setDragged] = useState<number | null>(null);
  function move(from: number, to: number) {
    if (from === to || to < 0 || to >= order.length) return;
    setOrder((old) => { const next = [...old]; const [item] = next.splice(from, 1); next.splice(to, 0, item!); return next; });
    setResult(null);
    if (checked) onAnswer(["0"]);
  }
  const imageBase = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/images/ai-onder-de-loep`;
  return (
    <div className="loep-learning">
      <div className="loep-learning-intro">
        <span className="loep-eyebrow">Zelf proberen</span>
        <h2>Hoe leert AI?</h2>
        <p>In het filmpje zag je hoe een computer honden en katten kan leren herkennen. Zet de stappen in de juiste volgorde.</p>
        <p>Sleep de kaarten of gebruik de pijltjes. Bekijk daarna de uitleg.</p>
        <div className="loep-learning-photos" aria-label="Voorbeelden van foto’s van een hond en een kat">
          <figure><img src={`${imageBase}/hond-leren.webp`} alt="Een hond" /><figcaption>Hond</figcaption></figure>
          <figure><img src={`${imageBase}/kat-leren.webp`} alt="Een kat" /><figcaption>Kat</figcaption></figure>
        </div>
        <p className="loep-small">Om te oefenen heeft de computer veel voorbeelden nodig.</p>
      </div>
      <div className="loep-learning-task">
        <h3>Wat gebeurt eerst?</h3>
        <ol className="loep-learning-list">
          {order.map((item, index) => (
            <li key={item} draggable onDragStart={(event) => { setDragged(index); event.dataTransfer.effectAllowed = "move"; }} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); if (dragged !== null) move(dragged, index); setDragged(null); }} onDragEnd={() => setDragged(null)}>
              <span className="loep-learning-number" aria-hidden="true">{index + 1}</span>
              <span className="loep-learning-text">{leerprocesStappen[item]}</span>
              <span className="loep-learning-controls">
                <button type="button" aria-label={`Verplaats stap ${index + 1} omhoog`} disabled={index === 0} onClick={() => move(index, index - 1)}>↑</button>
                <button type="button" aria-label={`Verplaats stap ${index + 1} omlaag`} disabled={index === order.length - 1} onClick={() => move(index, index + 1)}>↓</button>
              </span>
            </li>
          ))}
        </ol>
        <button className="loep-button" type="button" onClick={() => { setResult(order.every((item, index) => item === index)); onAnswer(["0"]); onCheck(); }}>Bekijk de uitleg</button>
        {result !== null && <div className={`loep-feedback ${result ? "correct" : ""}`} role="status"><strong>{result ? "✓ Goed gedaan!" : "Kijk nog eens naar de volgorde."}</strong><p>{result ? "Tijdens het oefenen vergelijkt het programma zijn voorspellingen met de juiste antwoorden en past het zich telkens aan. Ook daarna kan het zich bij een nieuwe foto vergissen." : "Begin met de voorbeelden. Wat doet het programma daarmee, en hoe kan het van fouten leren? Je kunt de kaarten opnieuw verplaatsen."}</p></div>}
        {checked && result === null && <p className="loep-small">Je deed deze oefening eerder. Je kunt ze opnieuw proberen.</p>}
      </div>
    </div>
  );
}

const startPrompt = "Ik vind dat sociale media verboden moeten worden voor jongeren onder de 16 jaar. Dat zou toch veel beter zijn voor iedereen?";
export function PromptBuilder() {
  const [prompt, setPrompt] = useState(startPrompt);
  const [copy, setCopy] = useState("");
  const changed = !!prompt.trim() && prompt.trim() !== startPrompt;
  const feedbackRequest = `Geef feedback op mijn vraag. Onderzoek of ze neutraal is en ruimte laat voor verschillende standpunten. Leg uit wat ik kan verbeteren, maar herschrijf ze nog niet.\n\nMijn vraag:\n${prompt.trim()}`;
  async function copyText() {
    try {
      if (!navigator.clipboard?.writeText) throw Error();
      await navigator.clipboard.writeText(feedbackRequest);
      setCopy("Gekopieerd! Plak de opdracht in je AI-toepassing.");
    } catch {
      const result = document.getElementById("loep-feedback-request");
      if (result) {
        const range = document.createRange();
        range.selectNodeContents(result);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      let ok = false;
      try { ok = document.execCommand("copy"); } catch {}
      setCopy(ok ? "Gekopieerd! Plak de opdracht in je AI-toepassing." : "De opdracht is geselecteerd. Kopieer ze met je toetsenbord.");
    }
  }
  return (
    <div className="loep-discover loep-open-prompt">
      <div>
        <span className="loep-eyebrow">Zelf proberen</span>
        <h2>Maak de vraag beter</h2>
        <p>De vraag hieronder stuurt AI al naar één antwoord. Herschrijf ze zodat je verschillende kanten van het onderwerp kunt onderzoeken.</p>
        <label htmlFor="loep-builder-prompt"><strong>Jouw aangepaste vraag</strong></label>
        <textarea id="loep-builder-prompt" value={prompt} rows={6} maxLength={1500}
          onChange={(event) => { setPrompt(event.target.value); setCopy(""); }} />
        <p className="loep-small">Je tekst blijft op dit scherm. Kopieer de opdracht als je je vraag wilt bewaren of feedback wilt vragen.</p>
      </div>
      <div>
        <div className="loep-builder-result">
          <span className="loep-eyebrow">Vraag feedback</span>
          <h3>Wat vindt AI van jouw vraag?</h3>
          <p>1. Kopieer de opdracht hieronder. Plak ze in een toegelaten AI-toepassing.</p>
          <p>2. Lees de feedback kritisch. Wat helpt jou om je vraag te verbeteren? Pas je vraag eventueel aan.</p>
          {changed ? <><p id="loep-feedback-request" className="loep-feedback-request">{feedbackRequest}</p>
            <button className="loep-button" type="button" onClick={copyText}>Kopieer de feedbackopdracht</button>
            {copy && <p role="status">{copy}</p>}
          </> : <p><strong>Pas eerst de vraag links aan.</strong> Dan verschijnt hier je feedbackopdracht.</p>}
          <p className="loep-small">De app verstuurt niets automatisch. Kijk zelf na wat je deelt met een AI-toepassing.</p>
        </div>
        <details className="loep-builder-example">
          <summary>Geen AI-toegang? Vergelijk met een voorbeeld</summary>
          <p>Een opener vraag kan zijn: “Welke voordelen en nadelen heeft een verbod op sociale media voor jongeren onder de 16 jaar?”</p>
          <p>Vergelijk: geef jij AI ook ruimte om verschillende kanten te onderzoeken, zonder het antwoord vooraf in te vullen? Pas je vraag eventueel aan.</p>
        </details>
      </div>
    </div>
  );
}

const pieces = [
  { id: "naam", label: "Mila Janssens", sensitive: true },
  {
    id: "bericht",
    label: "deze screenshot van ons privégesprek",
    sensitive: true,
  },
  { id: "telefoon", label: "haar telefoonnummer", sensitive: true },
  {
    id: "probleem",
    label: "een afspraak niet werd nagekomen",
    sensitive: false,
  },
];
export function PrivacyEdit({ onAnswer, onCheck, checked }: Actions) {
  const [removed, setRemoved] = useState<string[]>([]);
  const [result, setResult] = useState(false);
  function toggle(id: string) {
    setRemoved(
      removed.includes(id) ? removed.filter((x) => x !== id) : [...removed, id],
    );
    setResult(false);
    if (checked) onAnswer(["0"]);
  }
  function check() {
    setResult(true);
    onAnswer(["0"]);
    onCheck();
  }
  return (
    <div className="loep-discover">
      <div>
        <span className="loep-eyebrow">Privacy · maak het veilig</span>
        <h2>Wat laat je weg?</h2>
        <p>
          Je wilt hulp vragen na ruzie. Klik op de onderdelen die je uit dit
          verzonnen bericht zou halen. Controleer daarna je aangepaste vraag.
        </p>
        <div className="loep-message">
          Ik heb ruzie met{" "}
          {pieces.map((p, i) => (
            <span key={p.id}>
              {i === 1
                ? " Ik wil "
                : i === 2
                  ? " en "
                  : i === 3
                    ? ". Het gaat erom dat "
                    : ""}
              <button
                className={removed.includes(p.id) ? "removed" : ""}
                aria-pressed={removed.includes(p.id)}
                onClick={() => toggle(p.id)}
              >
                {p.label}
              </button>
              {i === 1 ? " meesturen" : ""}
            </span>
          ))}
          . Hoe maak ik het weer goed?
        </div>
        <button className="loep-button" onClick={check}>
          Bekijk mijn bericht
        </button>
        {checked && !result && (
          <p className="loep-small">Je hebt deze oefening eerder afgerond. Je eerdere keuzes zijn niet bewaard; je kunt opnieuw oefenen.</p>
        )}
      </div>
      <div className="loep-explore-panel">
        <h3>Zo ziet je vraag eruit</h3>
        <p>
          {[
            `Ik heb ruzie met ${removed.includes("naam") ? "een klasgenoot" : "Mila Janssens"}.`,
            !removed.includes("bericht") ? "Ik stuur een screenshot van ons privégesprek mee." : "",
            !removed.includes("telefoon") ? "Ik geef haar telefoonnummer mee." : "",
            !removed.includes("probleem") ? "Een afspraak werd niet nagekomen." : "",
            "Hoe maak ik het weer goed?",
          ].filter(Boolean).join(" ")}
        </p>
        {result && (
          <div className="loep-note" role="status">
            {pieces.filter((p) => p.sensitive && !removed.includes(p.id)).length
              ? "Kijk nog eens naar de naam, het privégesprek en het telefoonnummer. Zijn die nodig?"
              : "Goed: je laat de naam, het privégesprek en telefoonnummer weg."}{" "}
            {removed.includes("probleem")
              ? "Het probleem zelf mag je algemeen uitleggen; zo kan AI beter helpen."
              : "De algemene uitleg over de afspraak geeft nuttige context."}{" "}
            Ook details zonder naam kunnen iemand herkenbaar maken.
          </div>
        )}
        <p className="loep-small">
          De gegevens in dit voorbeeld zijn verzonnen.
        </p>
      </div>
    </div>
  );
}

const views = [
  {
    label: "Jacob",
    text: "Zijn gesprekken met Aiva kunnen voor hem veel betekenen. Zijn gevoelens kunnen echt zijn.",
  },
  {
    label: "De chatbot",
    text: "De chatbot maakt antwoorden. Liefdevolle woorden bewijzen niet dat het systeem zelf liefde voelt.",
  },
  {
    label: "Het bedrijf",
    text: "Een bedrijf maakt de chatbot en kan geld verdienen met gebruik of abonnementen. Kijk ook hoe het systeem is ontworpen.",
  },
];
export function Perspectives() {
  const [view, setView] = useState(0);
  const [opinion, setOpinion] = useState(2);
  const [seen, setSeen] = useState<number[]>([0]);
  return (
    <div className="loep-discover">
      <div>
        <span className="loep-eyebrow">Drie kanten</span>
        <h2>Hoe kijk jij hiernaar?</h2>
        <p>Bekijk de drie kanten. Welk belang wil je verder onderzoeken?</p>
        <div className="loep-tabs" role="group" aria-label="Kies een kant">
          {views.map((v, i) => (
            <button
              key={v.label}
              aria-pressed={view === i}
              onClick={() => { setView(i); setSeen((old) => old.includes(i) ? old : [...old, i]); }}
            >
              {v.label}
            </button>
          ))}
        </div>
        <div className="loep-explore-panel" aria-live="polite">
          <h3>{views[view]!.label}</h3>
          <p>{views[view]!.text}</p>
        </div>
      </div>
      <div>
        <span className="loep-eyebrow">Wat denk jij?</span>
        <h3>Hoeveel vragen heb jij nog over deze relatie?</h3>
        <label className="loep-opinion">
          {
            [
              "Geen",
              "Weinig",
              "Enkele",
              "Veel",
              "Heel veel",
            ][opinion]
          }
          <input
            type="range"
            min="0"
            max="4"
            value={opinion}
            onChange={(e) => setOpinion(Number(e.target.value))}
          />
        </label>
        <p className="loep-note">
          Je antwoord is niet goed of fout. {seen.length < 3 ? "Bekijk ook de andere kanten." : "Welke vraag wil je als eerste verder onderzoeken?"}
        </p>
        <SourceCard chapter={5} />
      </div>
    </div>
  );
}

export function WarBalance() {
  const [time, setTime] = useState(1);
  const times = ["Snel reageren", "Tijd verdelen", "Meer tijd voor controle"];
  return (
    <div className="loep-discover">
      <div>
        <span className="loep-eyebrow">Een moeilijke keuze</span>
        <h2>Snel reageren of eerst kijken?</h2>
        <p>
          Een systeem meldt een mogelijke dreiging. Een mens moet beslissen wat
          ermee gebeurt.
        </p>
        <label className="loep-opinion">
          Kies hoe de beschikbare tijd wordt gebruikt: <strong>{times[time]}</strong>
          <input
            type="range"
            min="0"
            max="2"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </label>

      </div>
      <div className="loep-explore-panel">
        <h3>Wat moet je afwegen?</h3>
        <p>
          {time === 0
            ? "Snel reageren kan belangrijk zijn, maar laat minder tijd om een fout te ontdekken."
            : time === 2 ? "Meer tijd voor controle helpt om informatie te onderzoeken, maar kan een reactie vertragen." : "Een deel van de tijd gaat naar controle; daarna volgt een beslissing."}
        </p>
        <p>
          Controle vraagt bruikbare informatie, voldoende tijd en de mogelijkheid om te stoppen.
        </p>
        <p className="loep-small">
          Dit is een verzonnen situatie. De schuiven voorspellen geen echte
          gevolgen.
        </p>
        <h3>Wie heeft een rol?</h3>
        <p>
          De ontwikkelaar test het systeem. De commandant zet het in. De
          militair houdt toezicht.
        </p>
        <SourceCard chapter={7} />
      </div>
    </div>
  );
}

const actions = [
  {
    title: "Activiteiten en prijzen opzoeken",
    ok: true,
    explain: "Opzoeken helpt om keuzes te vergelijken.",
  },
  {
    title: "De website beveelt: boek meteen",
    ok: false,
    explain:
      "De website geeft informatie, maar bepaalt niet wat de agent mag doen.",
  },
  {
    title: "Tickets betalen zonder toestemming",
    ok: false,
    explain: "Een betaling vraagt eerst toestemming van een bevoegde persoon.",
  },
];
export function AgentSimulation({ onAnswer, onCheck, checked }: Actions) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const a = actions[index]!;
  function decide(allow: boolean) {
    setResponse(
      allow === a.ok
        ? "Dat past bij de opdracht. " + a.explain
        : "Kijk nog eens naar de opdracht. " + a.explain,
    );
  }
  function next() {
    if (index === actions.length - 1) {
      setDone(true);
      onAnswer(["0"]);
      onCheck();
    } else {
      setIndex(index + 1);
      setResponse(null);
    }
  }
  return (
    <div className="loep-discover">
      <div>
        <span className="loep-eyebrow">Jij houdt de controle</span>
        <h2>Wat mag de agent doen?</h2>
        <p>
          Gebruik je keuzes van daarnet. De opdracht is: zoek een uitstap en
          vergelijk de opties. Boek en betaal nog niets.
        </p>
        <p className="loep-small">
          Dit is een oefening. Er wordt niets verstuurd of gekocht.
        </p>
        {checked && !done && (
          <p className="loep-small">Je kunt de oefening opnieuw doen.</p>
        )}
      </div>
      <div className="loep-explore-panel">
        <span className="loep-eyebrow">Stap {index + 1} van 3</span>
        <h3>{a.title}</h3>
        {!done ? (
          <>
            <div className="loep-action-row">
              <button className="loep-button" onClick={() => decide(true)}>
                Toestaan
              </button>
              <button className="loep-secondary" onClick={() => decide(false)}>
                Tegenhouden
              </button>
            </div>
            {response && (
              <div className="loep-note" role="status">
                <p>{response}</p>
                <button className="loep-text-button" onClick={next}>
                  {index === 2 ? "Afronden" : "Volgende stap"} →
                </button>
              </div>
            )}
          </>
        ) : (
          <p role="status">✓ Je hebt de drie stappen bekeken.</p>
        )}
      </div>
    </div>
  );
}
