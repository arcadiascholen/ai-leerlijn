import { useState } from "react";

type Actions = {
  onAnswer: (v: string[]) => void;
  onCheck: () => void;
  checked?: boolean;
};

export function VideoCard({ kind }: { kind: "intro" | "deepfake" }) {
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
    <section className="loep-video-card" aria-label={v.title}>
      {!playing ? (
        <button className="loep-video-poster" onClick={() => setPlaying(true)}>
          <span className="loep-video-play" aria-hidden="true">
            ▶
          </span>
          <span>
            <small>{v.source}</small>
            <strong>{v.title}</strong>
            <small>Bekijk de video</small>
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
        <span>Optioneel · de video opent via YouTube.</span>
        <a href={v.url} target="_blank" rel="noreferrer">
          Open video ↗
        </a>
      </div>
      <p className="loep-small">{kind === "intro" ? "Kijkvraag: wat leert een AI-systeem uit voorbeelden?" : "Kijkvraag: hoe controleer je wie een video heeft gemaakt?"}</p>
      <details>
        <summary>Lees de uitleg als je niet kijkt</summary>
        <p>{v.summary}</p>
      </details>
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

const examples = [
  {
    text: "Een AI-assistent schrijft een verhaal.",
    correct: "ai",
  },
  {
    text: "Een wekker gaat elke dag om zeven uur af.",
    correct: "regels",
  },
  { text: "Een telefoon zet gesproken woorden om in tekst.", correct: "ai" },
  { text: "Een rekenmachine telt twee getallen bij elkaar op.", correct: "regels" },
];
export function SortIntro({ onAnswer, onCheck, checked }: Actions) {
  const [choices, setChoices] = useState<Record<number, string>>({});
  const [result, setResult] = useState(false);
  function set(i: number, v: string) {
    setChoices({ ...choices, [i]: v });
    setResult(false);
    if (checked) onAnswer(["0"]);
  }
  const all = examples.every((_, i) => choices[i]);
  function check() {
    setResult(true);
    onAnswer(["0"]);
    onCheck();
  }
  return (
    <div className="loep-discover">
      <div>
        <span className="loep-eyebrow">Start · ontdek AI</span>
        <h2>Waar zit AI in?</h2>
        <p>
          Sommige systemen leren patronen uit voorbeelden. Andere volgen vaste regels. Kies bij elk voorbeeld wat het best past.
        </p>
        <div className="loep-sort">
          {examples.map((e, i) => (
            <div key={e.text}>
              <span>{e.text}</span>
              <div>
                {[
                  ["ai", "AI"],
                  ["regels", "Vaste regels"],
                ].map(([v, t]) => (
                  <button
                    key={v}
                    className={choices[i] === v ? "active" : ""}
                    aria-pressed={choices[i] === v}
                    onClick={() => set(i, v)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {result && (
                <small>
                  {choices[i] === e.correct ? "✓" : "↻"}{" "}
                  {e.correct === "ai"
                    ? "Kan AI gebruiken om patronen te herkennen."
                    : "Kan met vaste regels, zonder AI."}
                </small>
              )}
            </div>
          ))}
        </div>
        <button className="loep-button" disabled={!all} onClick={check}>
          Bekijk de uitleg
        </button>
        {checked && !result && (
          <p className="loep-small">
            Je hebt deze oefening eerder afgerond. Je eerdere keuzes zijn niet bewaard; je kunt opnieuw oefenen.
          </p>
        )}
      </div>
      <div>
        <VideoCard kind="intro" />
        <p className="loep-small">
          Bekijk ook de filmpjes van{" "}
          <a
            href="https://www.imec.be/nl/vlaamse-innovatiemotor/kennisuitwisseling/wetenschap-in-de-klas/educatief-aanbod/klaar-ai"
            target="_blank"
            rel="noreferrer"
          >
            KLAAR over AI ↗
          </a>
        </p>
      </div>
    </div>
  );
}

const builderParts = [
  {
    label: "Vraag naar voor- én nadelen",
    text: "Geef sterke argumenten voor en tegen.",
  },
  {
    label: "Vraag wat nog ontbreekt",
    text: "Welke informatie ontbreekt om een goed oordeel te vormen?",
  },
  {
    label: "Vraag wat onzeker is",
    text: "Geef aan waar je onzeker over bent.",
  },
];
export function PromptBuilder() {
  const [picked, setPicked] = useState<number[]>([0]);
  const [copy, setCopy] = useState("");
  const [show, setShow] = useState<number | null>(null);
  const prompt =
    "Wat zijn de gevolgen van een verbod op sociale media voor jongeren onder de 16 jaar? " +
    picked.map((i) => builderParts[i]!.text).join(" ");
  async function copyText() {
    try {
      if (!navigator.clipboard?.writeText) throw Error();
      await navigator.clipboard.writeText(prompt);
      setCopy("Gekopieerd");
    } catch {
      const t = document.createElement("textarea");
      t.value = prompt;
      t.style.position = "fixed";
      t.style.left = "-9999px";
      document.body.appendChild(t);
      t.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {}
      t.remove();
      if (!ok) {
        const result = document.getElementById("loep-builder-prompt");
        if (result) {
          const range = document.createRange();
          range.selectNodeContents(result);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
      setCopy(ok ? "Gekopieerd" : "Tekst geselecteerd");
    }
  }
  return (
    <div className="loep-discover">
      <div>
        <span className="loep-eyebrow">Zelf proberen</span>
        <h2>Bouw een betere vraag</h2>
        <p>Vink twee onderdelen aan en vergelijk je vraag met de sturende vraag van daarnet. Je kunt daarna je vraag kopiëren.</p>
        <div className="loep-build-options">
          {builderParts.map((part, i) => (
            <label key={part.label}>
              <input
                type="checkbox"
                checked={picked.includes(i)}
                onChange={() =>
                  setPicked(
                    picked.includes(i)
                      ? picked.filter((x) => x !== i)
                      : [...picked, i].sort(),
                  )
                }
              />
              <span>{part.label}</span>
            </label>
          ))}
        </div>
        <p className="loep-small">
          Ook een zorgvuldige vraag kan een fout antwoord opleveren. Blijf
          controleren.
        </p>
      </div>
      <div>
        <section className="loep-builder-result">
          <span className="loep-eyebrow">Jouw vraag</span>
          <p id="loep-builder-prompt">{prompt}</p>
          <button className="loep-text-button" onClick={copyText}>
            {copy || "Kopieer mijn vraag"}
          </button>
        </section>
        <p className="loep-small">Klik op een voorbeeldzin.</p>
        <div className="loep-example-lines">
          {[
            "Een verbod kan jongeren beschermen tegen risico’s.",
            "Er zijn ook nadelen, zoals minder contact met vrienden.",
          ].map((line, i) => (
            <button
              key={line}
              aria-pressed={show === i}
              onClick={() => setShow(show === i ? null : i)}
            >
              {line}
            </button>
          ))}
        </div>
        {show !== null && (
          <p className="loep-note" role="status">
            {show === 0
              ? "Dit noemt een mogelijk voordeel."
              : "Dit voegt een andere kant toe."}{" "}
            Dit zijn verzonnen voorbeelden; een echt antwoord kan anders zijn.
          </p>
        )}
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
