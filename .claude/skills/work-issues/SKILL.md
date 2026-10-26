---
name: work-issues
description: Werk GitHub issues van het AI-leerpad één voor één af — issue → branch → werk met checkpoints → build-gate → PR → merge → live op de site. Roep aan als /work-issues met issuenummers ("/work-issues 12 13"), met een labelfilter ("/work-issues --label module"), of leeg (dan toont de skill de open issues). Gebruik dit ook wanneer de gebruiker nieuw werk voorstelt zonder issue ("de module over vibecoding is binnen", "de voortgangsbalk is te klein") — dan maakt de skill eerst het issue. Wordt in dit project /work-batch aangeroepen, gebruik dan deze skill — die aanroep is hier altijd een vergissing.
---

# Issues afwerken in het AI-leerpad

Al het werk, ook het werk dat geen code is, begint bij een issue, landt als
bestanden in de repo, en staat na de merge op de live site.

Verwant: [[create-issues]] (levert de wachtrij), [[start-work]] (interactieve
issue→PR-flow), [[work-batch]] (batch voor code-issues).

## Wat hier anders is dan work-batch

| | work-batch | work-issues |
|---|---|---|
| PR's | gechunkt, 4–7 issues per PR | **één issue per PR** |
| Gate | testsuite | `astro check` + `npm run build` + render-check |
| Reviewmoment | de PR | **de checkpoints tijdens het werk** |
| Werkers | altijd een subagent per issue | subagent zodra de keuzes gemaakt zijn |

Waarom geen chunks: bij inhoudelijk werk is de diff niet los te lezen van de
keuzes die eraan voorafgingen, en één slechte module zou drie goede gijzelen.
Een check duurt hier hooguit een paar minuten, dus bundelen levert niets op.

## Delegeren: pas als er niets meer te kiezen valt

Een subagent per issue houdt de hoofdsessie licht, maar werkt alleen als er
niets subjectiefs meer te kiezen valt. Dat is de voorwaarde, niet de omvang
van het issue:

1. **Eerst de keuzes.** Lees het issue, bepaal welke beslissingen erin zitten,
   en leg ze in één blok voor aan de gebruiker. Pas als het antwoord binnen
   is, delegeer je.
2. **Dan één `general-purpose` subagent per issue**, met de beslissing
   expliciet in de opdracht ("de eigenaar heeft gekozen voor X, niet Y — hier
   is waarom"). Laat de worker committen op de branch die jij al aanmaakte;
   geen push, geen PR, geen merge. Die doe jij.
3. **Checkpoint middenin?** Gebruik `SendMessage` naar dezelfde worker in
   plaats van een nieuwe te starten.

**Uitzondering: label `module` blijft in de hoofdsessie.** Daar is het
didactische oordeel het eigenlijke werk, en het stappenplan en het concept
moeten toch langs de eigenaar. Breed zoekwerk binnen een module (bronnen
zoeken, feiten controleren) mag wel naar een subagent.

## Autonomiecontract

- Branch, push, PR en merge zijn **vooraf goedgekeurd**. Vraag daar niet om.
- Mergen zodra de PR-check groen is. **Nooit een rode PR mergen.**
- De merge deployt naar de live site. Er is daarna geen tweede poort.
- **Daarom is een checkpoint niet optioneel.** Het reviewmoment ligt vóór de
  PR, niet erna. Twijfel je of iets een keuze van de eigenaar is: stop bij het
  checkpoint.
- Bij rood: maximaal 2 fixpogingen, daarna stoppen. Issue blijft open, branch
  blijft staan, meld wat er stuk is.
- **Bevriezing: geen merges naar `main` van 9 november 2026 18 uur tot het
  einde van 10 november.** Werk in die periode mag tot en met de PR; de merge
  wacht.

## Stap 0 — Voorwaarden

```
gh auth status
git status --porcelain      # moet leeg zijn
git checkout main && git pull --ff-only
```

Vuile working tree: **stop en vraag**. Uitzondering: horen de gewijzigde
bestanden precies bij het issue dat je gaat doen, vraag dan of ze mee mogen in
deze branch.

Integratiebranch is `main`; er is geen `develop`.

## Stap 1 — Wachtrij bouwen

- Expliciete nummers → in die volgorde.
- `--label X` → `gh issue list --label X --state open --json number,title,labels`.
- Geen argument → `gh issue list --state open` tonen en vragen welke.

**Issues met het label `wacht` sla je over**, tenzij de gebruiker ze
uitdrukkelijk noemt. Meld ze in één regel met waarop ze wachten.

Haal per issue de volledige inhoud op:

```
gh issue view N --json number,title,state,body,labels,comments
```

Gebruik de `--json`-vorm, niet `gh issue view N --comments`: die laatste print
lege output bij een issue zonder comments, wat op een mislukte call lijkt.

Echo daarna het plan, één regel per issue, met werktype en checkpoints:

```
#12 site       Astro-skelet en deploy     → geen stops
#13 component  Stappenspeler              → 1 stop (interactie-ontwerp)
#14 module     ai-als-coach-2e-graad      → 2 stops (stappenplan / concept)
```

Volgorde: afhankelijkheden eerst. Een component die een module nodig heeft,
gaat vóór die module. Is de volgorde onduidelijk, vraag het.

### Nieuw werk zonder issue

Stelt de gebruiker werk voor zonder issuenummer, maak dan eerst het issue.
Kies het juiste template, toon titel, body en label, en maak het aan na
akkoord. Is het meer dan één klein, duidelijk issue, gebruik dan
`create-issues` en ga daarna verder bij stap 1.

## Stap 2 — Werktype bepaalt checkpoints en verificatie

Het label bepaalt het werktype. Staat er geen werklabel, leid het af uit de
issuetekst en zet het label alsnog (`gh issue edit N --add-label ...`).

| label | harde stops | extra verificatie |
|---|---|---|
| `module` | **2**: stappenplan (lijst van stappen met per stap het idee en het vraagtype) → concept in het MDX-bestand | frontmatter valt binnen het schema; elke stap past op een viewport van 1366 × 640 zonder scroll; taalniveau past bij de graad; `aiGebruik` klopt met wat de module vraagt; geen vraag of oefening van de auteur stilzwijgend weggelaten |
| `component` | **1**: interactie-ontwerp vóór de bouw | werkt met muis en toetsenbord; toestand overleeft herladen waar dat de bedoeling is; geen hardcoded kleuren of fonts |
| `design` | **1**: tokens of ontwerp vóór het doorvoeren | contrast tekst minstens 4.5:1; barometerkleuren alleen voor de barometer; screenshots voor en na |
| `site` | geen, tenzij het zichtbare vormgeving verandert — dan 1 | build + pagina bekeken op 1366 × 640 |
| `redactie` | geen | build + toon de diff in het rapport |

De eerste issue van een nieuw soort (de eerste component, de eerste module) is
de **pilot**: leg het patroon dat daar ontstaat vast in `docs/BRIEFING.md` in
dezelfde PR, zodat de volgende issues het kunnen volgen.

## Stap 3 — Per issue

### 3a. Intake

Vat het issue in een paar zinnen terug: wat je gaat doen, welk werktype, en
vooral **wat er in het issue ambigu is**. Is de opdracht echt onduidelijk,
vraag het nu, niet halverwege.

### 3b. Branch

```
git checkout -b <label>/issue-<N>-<slug>     # bv. module/issue-14-ai-als-coach
```

`<slug>` is 2–4 woorden kebab-case uit de titel. Meld de branchnaam in één
regel.

### 3c. Werken

- **Blijf binnen het issue.** Kom je iets anders tegen dat stuk of beter kan:
  maak een nieuw issue, meld het in één regel, en werk verder.
- **Schrijf naar de bestanden, niet naar het gesprek.** Concepttekst gaat
  direct naar `src/content/modules/<id>.mdx`. Bij een checkpoint toon je de
  relevante passages of de diff.
- **Publieke repo.** Geen namen van collega's of leerlingen, geen interne
  informatie in code, commits of PR-teksten.
- **Beslis zelf waar de keuze geen smaak is** (zie onderaan).

### 3d. Verificatie — de gates

Draai ze in deze volgorde en ga niet naar de PR tot ze groen zijn.

1. **`npx astro check`** — 0 errors, 0 warnings. Vangt frontmatter die niet
   aan `src/content.config.ts` voldoet en TypeScript in componenten.
2. **`npm run build`** — de volledige statische site.
3. **Render-check** — voor alles wat de leerling ziet. Start `npm run dev`
   en open de gewijzigde pagina onder `http://localhost:4321/ai-leerlijn/`
   in een viewport van **1366 × 640** (een laptop van 1366 × 768 min de
   browserbalken). Kijk of elke stap past zonder te
   scrollen, of de interactie reageert, of beelden laden, en of er geen ruwe
   MDX-syntaxis in de tekst staat. `astro check` bewijst dat het bouwt, niet
   dat het klopt. Sla dit alleen over als de wijziging niets rendert, en zeg
   dat dan expliciet in de PR.

Faalt er iets, repareer het vóór de PR. Een fout die je niet zelf
veroorzaakte, is geen "bestaand probleem": zoek de commit die hem
introduceerde en maak er een issue van als de fix elders hoort.

#### Bewijslast: vraag om een bewijs, niet om een oordeel

"Controleer of het nog werkt" levert een geruststelling op. Benoem in plaats
daarvan wat er stuk zou kunnen zijn gegaan en eis het bewijs dat het dat niet
is. Voorbeelden voor dit project:

- Iets aan de routes of het base-pad → *vergelijk de gebouwde routes onder
  `dist/` vóór en na; de lijsten moeten identiek zijn, op de bedoelde
  wijziging na.*
- Voortgang in `localStorage` → *toon dat een herladen op stap 5 weer op
  stap 5 uitkomt, en dat twee modules elkaars voortgang niet overschrijven.*
- Een nieuwe island → *toon dat de component zonder JavaScript-fout laadt in
  de console, en dat de pagina zonder de island nog leesbaar is.*
- Beelden of embeds → *toon de overdracht van de volledige module in de
  netwerkweergave; het budget is 3 MB.*

Het patroon: benoem de faalmodus die geen foutmelding geeft, en vraag het
waarneembare bewijs dat hij zich niet voordoet.

### 3e. Commit, PR, merge

```
git add <paden>                      # expliciete paden, nooit `git add -A`
git commit -m "module: ai als coach, 2e graad (#14)"
git push -u origin <branch>
gh pr create --base main --title "..." --body "..."
```

**Controleer eerst zelf de vorm van de diff, zeker na een subagent:**

```
git log --oneline main..HEAD
git diff main..HEAD --stat
git status --porcelain          # moet leeg zijn
```

Wijkt het aantal of het soort gewijzigde bestanden af van wat het issue
vroeg, zoek uit waarom vóór je pusht.

De PR-body volgt `.github/pull_request_template.md`: wat er verandert en
waarom, `Closes #N`, en een controlelijst met de **echte** uitkomsten van 3d.

Wacht dan op de check en merge (niet tijdens de bevriezing):

```
gh pr checks <pr> --watch --interval 20 --fail-fast
gh pr merge <pr> --squash --delete-branch
```

Rood → korte foutregel ophalen (`gh run view <id> --log-failed`), fixen,
pushen, opnieuw wachten. Na 2 mislukte pogingen: stoppen en melden.

### 3f. Naar de site

De merge naar `main` triggert de deploy naar GitHub Pages. Volg hem tot het
einde:

```
gh run list --branch main --limit 1
gh run watch <id> --exit-status
```

Groen → meld de URL onder `https://arcadiascholen.github.io/ai-leerlijn/`.
Rood → dat is een gebroken live site en heeft voorrang op het volgende issue.

Ruim daarna lokaal op:

```
git checkout main && git pull --prune
git branch -d <branch>
```

Weigert `-d`, controleer eerst met `git branch --merged origin/main` dat het
werk echt geland is (bij een squash-merge ziet git de commits niet terug).
Pas daarna `-D`.

## Wanneer stoppen, wanneer zelf beslissen

De vuistregel: **stop voor keuzes die de eigenaar later zou willen
terugdraaien, beslis zelf over alles wat je toch nog kan aanpassen.**

**Stop en vraag** (ook buiten de vaste checkpoints):

- een vraag, oefening of voorbeeld uit aangeleverd materiaal schrappen of
  ingrijpend veranderen;
- de didactische opbouw van een module anders leggen dan de auteur of het
  issue zegt;
- iets dat `docs/BRIEFING.md` tegenspreekt — vraag, en als de afspraak echt
  verandert, werk de briefing bij in dezelfde PR;
- een tool of toepassing aanraden die niet in de briefing als toegelaten
  staat;
- een claim over AI die je niet geverifieerd krijgt en die dragend is voor een
  stap;
- werk dat structureel groter blijkt dan het issue beschrijft.

**Beslis zelf, meld het hooguit in één regel** in het eindrapport:

- bestandsnamen, mapindeling, namen van props en frontmattervelden binnen het
  schema;
- hoe je een lange passage over meerdere stappen verdeelt, zolang de opbouw
  van de auteur blijft;
- zinsbouw en vereenvoudiging naar het taalniveau van de graad;
- CSS-details die binnen de tokens blijven;
- commit- en PR-teksten.

Verzamel kleine vragen tot het eerstvolgende checkpoint in plaats van ze los
te stellen.

## Eindrapport

Na het laatste issue één compact overzicht:

```
3 issues af, 1 open
  #12 ✓ Astro-skelet en deploy          → PR #20 gemerged, live
  #13 ✓ stappenspeler                   → PR #21 gemerged, live
  #14 ⚠ ai-als-coach-2e-graad — gestopt bij het concept: wacht op keuze tool
Overgeslagen (wacht): #18 vibecoding (aanlevering), #19 toegelaten tools (beslissing team)
Nu op main, working tree schoon.
```

Meld eerlijk wat er niet af is en wat de gebruiker moet bekijken. Een issue
dat is blijven liggen, staat vooraan.
