# Vormgeving — tokens en visuele regels

De huisstijl van de site komt uit het design system **Arcadia AI-modules**.
Dit document vat samen wat de site daaruit overneemt: de tokens, de
lettertypes, het logo en de visuele regels. In de code staan de tokens in
`src/styles/tokens.css`; componenten gebruiken uitsluitend `var(--…)`.

## Herkomst

| | |
|---|---|
| Design system | *Arcadia AI-modules*, <https://claude.ai/artifact/5FkFKzAp7bfBCU1wXJ8kFv> |
| Versie | `1793042465-7f89` |
| Datum | 26 oktober 2026 |

De site neemt **alleen de looks** over. Het design system bevat ook
componenten, voorbeeldmarkup, een `bundle.js` en regels over hoe een module
werkt; die gelden hier niet. De werking van de site en de beslissingen in
`docs/BRIEFING.md` blijven van de site zelf.

**Alleen het lichte thema.** Het design system heeft ook een donker thema
(met een afgeleide versie van het logo die nog bevestigd moet worden). Dat is
iets voor later; er is nu geen themawissel.

## Kleur

- Pagina `bg`, kaarten `surface`, verzonken vlakken `surface-sunken`
  (hetzelfde lichtgroen als het afsprakenkader op de affiche).
- Lopende tekst `ink`, koppen `forest`, hulptekst `ink-muted`. Alle drie
  halen minstens 4.5:1 op de drie vlakken.
- **Groen is de leerling en de school, teal is AI.** Alles wat van of over AI
  komt, gebruikt `ai`, `ai-soft` en `ai-text`. De leerling, de voortgang en
  Arcadia gebruiken `brand` en `forest`.
- `brand` (Arcadia-groen) is **nooit tekst op licht** (2.4:1). Het is voor
  vlakken, lijnen, voortgang en knopen. Groene tekst is `brand-text`.
- Primaire knop: `primary` met `on-primary`.
- AI: `ai` voor tekst, iconen en vulling; `ai-soft` als achtergrond met
  `ai-text` erop.
- Juist en fout: `success` op `success-soft`, `danger` op `danger-soft`,
  altijd met icoon (✓ of ✕) én woord, nooit alleen kleur. `warning` op
  `warning-soft` voor *Let op*.
- **De vier barometerkleuren `level-0` tot `level-3` betekenen alleen het
  AI-niveau.** Ze komen exact van de affiche en verschijnen nergens anders.
- Focus: 2px solid `focus`, 2px offset, op elk interactief element.

| Token | Waarde | Gebruik |
|---|---|---|
| `bg` | `#fcfcf8` | Paginagrond. Zelfde gebroken wit als de affiche van de AI-barometer. |
| `surface` | `#ffffff` | Kaarten, stapkaarten, vraagblokken, header. |
| `surface-sunken` | `#f0f6e8` | Verzonken vlakken: achtergrond van antwoordvelden, footer, kaders zoals *Andere afspraken* op de affiche. |
| `line` | `#d6dfcc` | Hairlines en scheidingen tussen blokken. Niet voor randen van invoervelden (te zwak). |
| `line-strong` | `#7a8c70` | Rand van invoervelden, antwoordopties en secundaire knoppen; haalt 3:1 op `surface` en `bg`. |
| `ink` | `#19271c` | Lopende tekst op `bg`, `surface`, `surface-sunken` (≥ 14:1). |
| `ink-muted` | `#55625a` | Hulptekst, meta (duur, stapnummer), placeholders op de drie vlakken (≥ 4.5:1). |
| `forest` | `#103e18` | Koppen en het groen van het AI-icoon op de barometer. Tekstkleur op `bg` en `surface`. |
| `brand` | `#76b82a` | Arcadia-groen uit het logo. Alleen vlakken, lijnen, voortgang en knopen, nooit tekst op licht. Tekst erop: `on-brand`. |
| `on-brand` | `#103e18` | Tekst en iconen op een `brand`-vlak (5:1). |
| `brand-text` | `#3d7a14` | Groene tekst: links, labels van de leerling, voltooide stappen. Op `bg` en `surface` (≥ 4.7:1). |
| `primary` | `#103e18` | Vulling van de primaire knop. |
| `primary-hover` | `#1e5a28` | Hover- en actieve staat van de primaire knop. |
| `on-primary` | `#ffffff` | Tekst op `primary` en `primary-hover`. |
| `ai` | `#0e6f78` | De AI-stem: alles wat van of over AI komt (chatbubbels van AI, promptblokken). Tekst op `bg` en `surface` (5.7:1). |
| `ai-soft` | `#e2f3f3` | Achtergrond van AI-bubbels en promptblokken. |
| `ai-text` | `#0b5c63` | Tekst op `ai-soft` (≥ 6.7:1). |
| `on-ai` | `#ffffff` | Tekst op een volle `ai`-vulling (AI-label, AI-knop). |
| `focus` | `#0e6f78` | Focusring (2px solid, 2px offset) op elk interactief element; ≥ 3:1 op `bg` en `surface`. |
| `success` | `#2f6a12` | Feedback bij een juist antwoord: tekst en icoon op `success-soft`. Altijd met ✓ én woord. |
| `success-soft` | `#e6f2d9` | Achtergrond van juiste feedback en van het gekozen juiste antwoord. |
| `danger` | `#a8241b` | Feedback bij een fout antwoord: tekst en icoon op `danger-soft`. Altijd met ✕ én woord, nooit alleen kleur. |
| `danger-soft` | `#fce6e3` | Achtergrond van foute feedback. |
| `warning` | `#7a4a06` | Tekst van *Let op*-kaders op `warning-soft`. |
| `warning-soft` | `#fdf1dc` | Achtergrond van *Let op*-kaders (waarschuwing over AI-fouten, privacy). |
| `level-0` | `#f03a32` | AI-niveau 0 · Geen AI. Exacte affichekleur. Alleen vlakken; cijfer erop in `on-level-0`. |
| `level-1` | `#f47c1b` | AI-niveau 1 · Voorbereiding. Exacte affichekleur. Cijfer erop in `on-level-1`. |
| `level-2` | `#f8b21a` | AI-niveau 2 · Ondersteuning. Exacte affichekleur. Cijfer erop in `on-level-2`. |
| `level-3` | `#6b9136` | AI-niveau 3 · Uitvoering. Exacte affichekleur. Cijfer erop in `on-level-3`. |
| `on-level-0` … `on-level-3` | `#071209` | Cijfer op een `level`-vlak (4.9 tot 10.4:1). Bijna-zwart groen in plaats van het wit van de affiche, dat te weinig contrast heeft. |

## Typografie

- **Figtree** voor alles: koppen in 800, tekst in 400 en 500, labels in 700.
  **JetBrains Mono** alleen voor prompts en AI-uitvoer (stijl `prompt`).
- Beide lettertypes worden **zelf gehost** via fontsource
  (`@fontsource-variable/figtree`, `@fontsource-variable/jetbrains-mono`) en
  geladen in `src/layouts/Base.astro`. Er gaat geen verzoek naar Google. De
  familienamen zijn `"Figtree Variable"` en `"JetBrains Mono Variable"`; de
  fallbacks komen uit het design system.
- Lopende tekst hoogstens ± 65 tekens per regel. Koppen met
  `text-wrap: balance`.
- `body` is 17px, iets groter dan gebruikelijk, voor de leesbaarheid.
- `label` staat altijd in hoofdletters (`text-transform: uppercase`).
- De lettertypes zijn een keuze van het design system; het font van de
  affiche is niet bevestigd. Levert de communicatiedienst een huisfont aan,
  dan verandert alleen `--font-sans`.

**Naamgeving.** Elke tekststijl is vier custom properties:
`--text-<stijl>-size`, `--text-<stijl>-line` (regelhoogte),
`--text-<stijl>-weight` en `--text-<stijl>-tracking` (letterspatiëring;
`normal` als de stijl er geen heeft). Bijvoorbeeld:

```css
font-size: var(--text-h2-size);
line-height: var(--text-h2-line);
font-weight: var(--text-h2-weight);
letter-spacing: var(--text-h2-tracking);
```

| Stijl | Grootte / regel | Gewicht | Spatiëring | Gebruik |
|---|---|---|---|---|
| `display` | 56 / 58px | 800 | −0.02em | Moduletitel in de hero. Eén per pagina. |
| `h1` | 40 / 44px | 800 | −0.015em | Paginatitel op overzichtspagina's. |
| `h2` | 28 / 34px | 800 | −0.01em | Sectiekop, vraag op een stapkaart. |
| `h3` | 21 / 28px | 700 | — | Kaarttitel, niveaunaam. |
| `lead` | 19 / 28px | 500 | — | Intro onder een titel. Hoogstens twee zinnen. |
| `body` | 17 / 26px | 400 | — | Lopende tekst, antwoordopties. |
| `small` | 15 / 22px | 400 | — | Meta, hulptekst, toelichting bij feedback. |
| `label` | 13 / 16px | 700 | 0.08em | Eyebrows en labels, altijd hoofdletters. |
| `prompt` | 15 / 24px | 400 | — | Prompts en AI-uitvoer, in `--font-mono`. |

Alle stijlen gebruiken `--font-sans`, behalve `prompt` (`--font-mono`).
`body` staat op `<body>`; `h1` tot `h3` staan op de koppen in
`src/styles/global.css`.

## Ruimte, vorm, diepte

- Kaarten krijgen `space-5` binnenmarge; tussen blokken `space-6`; tussen
  secties `space-7`.
- Radius: `radius-sm` voor tags en kleine knoppen, `radius-md` voor knoppen,
  velden, opties en kaders, `radius-lg` voor kaarten en bubbels,
  `radius-full` voor knopen, niveau-schijfjes en pills.
- **Randen boven schaduwen.** `shadow-card` alleen op de actieve stapkaart en
  zwevende elementen; andere kaarten krijgen een rand in `line`.
- Breedte: `content-max`. Balken bovenaan: `shell-bar` hoog.

| Token | Waarde | Gebruik |
|---|---|---|
| `space-1` | 4px | Icoon ↔ tekst. |
| `space-2` | 8px | Binnen chips en badges; tussen label en veld. |
| `space-3` | 12px | Tussen antwoordopties. |
| `space-4` | 16px | Binnenmarge van knoppen (horizontaal 20px = `space-4` + `space-1`). |
| `space-5` | 24px | Binnenmarge van kaarten en stapkaarten. |
| `space-6` | 32px | Tussen blokken binnen een sectie. |
| `space-7` | 48px | Tussen secties. |
| `space-8` | 72px | Boven en onder een hero. |
| `radius-sm` | 6px | Chips, kleine knoppen, tags. |
| `radius-md` | 12px | Knoppen, invoervelden, antwoordopties, kaders (zoals het afsprakenkader op de affiche). |
| `radius-lg` | 20px | Kaarten, stapkaarten, chatbubbels. |
| `radius-full` | 999px | Niveau-schijfjes, knopen in een voortgangsbalk, pill-badges. |
| `shadow-card` | twee zachte groene schaduwen | Alleen de actieve stapkaart en zwevende elementen. Andere kaarten: rand `line`. |
| `content-max` | 1120px | Maximale inhoudsbreedte van header, hero en module. |
| `shell-bar` | 56px | Hoogte van een balk bovenaan (header, modulebalk). |
| `step-max-h` | 520px | Maximale hoogte van een stapkaart: 640 − balk 56 − voortgang 40 − marges 24. Wat er niet in past, wordt een extra stap. |

Het ontwerpdoel is een laptop van 1366 × 768; na de browserbalken blijft
± 1366 × 640 over.

## Beweging

Wat op het scherm verandert, beweegt, zodat de leerling ziet wat er
veranderde, zonder erop te wachten. Twee bewegingen zijn duidelijk
zichtbaar: de stapwissel is een **flip**, en een nieuwe stap **bouwt zich
op** zoals je van een robot verwacht, mechanisch en precies. Al het andere
is kort en subtiel. Het design system heeft geen bewegingstokens; deze zijn
van de site zelf. Krijgt een nieuwe versie van het design system er wel,
dan nemen die hun plaats in.

| Token | Waarde | Gebruik |
|---|---|---|
| `motion-fast` | 120ms | Hover, en een kleur of rand die verandert: knoppen, links, kaarten, een gekozen `<Keuze>`-kaart of `<Meerkeuze>`-optie, de gekozen graad in het moduleoverzicht. |
| `motion-base` | 200ms | Iets wat binnen een stap verschijnt: de feedback van `<Meerkeuze>`, het voorbeeldantwoord van `<DenkEerst>`, ✓ *Gekopieerd* en *Nog leeg* bij een `<Prompt>`, de bevestiging en de knoppen die na een download in de samenvatting verschijnen, kaarten die het filter op graad terugbrengt. Ook de voortgangsbalk. |
| `motion-flip` | 400ms | De stapwissel: de helft om de oude stap weg te draaien, de helft om de nieuwe in te draaien. |
| `motion-build` | 1000ms | De opbouw van een stap: van de klik tot het laatste onderdeel er volledig staat, de flip inbegrepen. |
| `motion-part` | 240ms | Eén onderdeel dat verschijnt: een kop die zich typt, een blok dat gescand wordt. Daarna blijft de cursor van de kop nog 1,5 × zo lang staan en knippert hij één keer. |
| `motion-stagger` | 120ms | Hoogstens zoveel tussen het begin van twee onderdelen. |
| `motion-perspective` | 2000px | De diepte van de flip: hoe ver de kijker van de kaart staat. |
| `ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Snel vertrekken, rustig aankomen: elke overgang, en de nieuwe stap die indraait. |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Rustig vertrekken, snel weg: de oude stap die wegdraait. |

**De regels.**

- **Alleen `opacity`, `transform`, `clip-path` en kleuren** (achtergrond,
  rand, tekst; een schaduw alleen als enkel haar kleur verandert). Nooit
  hoogte of breedte: de layout verschuift niet, en de 390 px van een stap
  blijven kloppen. Ook de voortgangsbalk schuift met `transform`.
- **Niets duurt langer dan 250 ms.** Twee uitzonderingen: de flip
  (`motion-flip`) en de opbouw (`motion-build`), die samen binnen 1 s na de
  klik klaar zijn; en `<Confetti />` (zie onder).
- **Niets laat de leerling wachten.** De focus, `aria-live`, de URL en de
  opslag gaan bij de klik meteen naar de nieuwe stap, niet pas na de flip.
  Klikken en typen werken meteen, ook in een onderdeel dat nog niet
  verschenen is. Wat binnen een stap verdwijnt, verdwijnt meteen; de oude
  stap vangt tijdens het wegdraaien geen klikken meer op.
- **Alles staat binnen `@media (prefers-reduced-motion: no-preference)`.**
  Wie minder beweging vraagt, ziet geen enkele overgang: geen flip, geen
  opbouw.
- **Alleen na een handeling van de leerling.** Eén uitzondering: bij het
  laden bouwt de eerste stap zich op, zonder flip. Een island die bij het
  hydrateren een bewaarde toestand toont (een beantwoorde `<Meerkeuze>`,
  een `<DenkEerst>` met voorbeeldantwoord, een gekozen `<Keuze>`), beweegt
  daarbinnen niet: ze verschijnt als één blok.
- **Ritme.** De opbouw gaat in stappen (`steps()`), niet in een vloeiende
  curve. Geen veren, geen stuiteren. De barometerkleuren komen er niet in
  voor: de cursor en de scanlijn zijn `brand`.

**De flip.** De stappenkaart (`.player-steps`) draait rond haar verticale
as; de kop, de voortgang en de navigatie staan stil, zodat de knoppen onder
de muis blijven. De oude stap draait weg tot hij op zijn kant staat
(200 ms, `ease-in`), de nieuwe draait van de andere kant in (200 ms,
`ease-out`). Met *Volgende* of → draait de kaart naar links, zoals een
bladzijde; met *Vorige* of ← naar rechts. Een sprong (`#stap-n`, *Ga naar
stap n*, een keuze die de stap verplaatst) draait volgens de richting van
de sprong. `perspective` staat op `.player-card`, die alles buiten de kaart
afsnijdt; de navigatie ligt erboven. Er is geen wachtrij: een klik of
pijltoets tijdens een flip zet de kaart meteen op de stap waar die flip
heen ging, volledig opgebouwd, en start de volgende flip.

**De opbouw.** Elk rechtstreeks kind van een stap is een onderdeel: de kop,
een alinea, een lijst, een `<Prompt>`, een vraag, een `<Chat>`, het
zichtbare `<Tool>`-blok. Wat verborgen is (`display: none`, zoals de
`<Tool>`-blokken van een andere tool), telt niet mee; een island telt als
één onderdeel. De onderdelen verschijnen in de volgorde van het document:
na een flip begint het eerste halverwege de flip, als de nieuwe stap
indraait, bij het laden meteen. Daarna begint er elke `motion-stagger` een,
of sneller als dat nodig is om het laatste binnen `motion-build` te laten
staan.

- **De kop typt zich**, letter per letter van links naar rechts, met een
  blokcursor in `brand` die daarna één keer knippert en verdwijnt.
- **Een blok wordt gescand**, van boven naar onder in zes stappen, met een
  dunne lijn in `brand` aan de rand die vordert.

De onderdelen zelf bewegen niet. Over de stap ligt een laag met per
onderdeel een paneel in de kleur van de kaart, dat in stappen wegschuift.
De laag vangt geen klikken op, en de tekst staat vanaf het begin volledig in
de DOM, zodat een schermlezer niets merkt. Een paneel bedekt alleen zolang
zijn animatie loopt: start die niet of wordt ze afgebroken, dan staat het
onderdeel er gewoon.

**Uitzondering: `<Confetti />`** (`docs/BRIEFING.md` § 12). Eén keer per
module valt er 1,5 s confetti over de stapkaart, getekend door een script
op een `<canvas>`, niet met CSS. De grens van 250 ms geldt er niet; de rest
wel: de leerling wacht niet (geen klikken, geen focus, de layout verschuift
niet), en wie minder beweging vraagt, ziet niets.

**In de code.** De overgangen en animaties staan in de CSS van elk
component, met de tokens: de flip in `StepPlayer.astro`, de opbouw
(`.build-*`) in `src/styles/global.css`. `src/lib/motion.ts` beslist
*wanneer* iets beweegt:

- `appear(element)` zet `data-appear` (de fade in `src/styles/global.css`)
  en haalt het weg zodra de fade klaar of afgebroken is, zodat een element
  dat later terugkomt niet opnieuw fadet. `appearOnMount` doet hetzelfde als
  `ref` van een React-element dat pas na een handeling verschijnt.
- `settle(element)` zet `data-motion` zodra een element zijn eerste
  toestand toont, ook een bewaarde. Overgangen die ook bij het herstellen
  zouden lopen, gelden pas onder `[data-motion]`.
- `buildUp(step, afterFlip)` zoekt de onderdelen van een stap, legt de laag
  met de panelen erover en ruimt die op zodra alles staat; `stopBuild(step)`
  zet alles meteen neer. De speler roept ze aan bij elke stapwissel en bij
  het laden. Verandert er tijdens de opbouw iets van grootte, zoals een
  lettertype dat laadt of een island die hydrateert, dan schuiven de
  panelen mee.
- `mayMove()` zegt of iets mag bewegen: onwaar bij
  `prefers-reduced-motion: reduce`. Voor beweging die een script zelf
  tekent of start, zoals de confetti en de opbouw.

**Een nieuw component** doet vanzelf mee aan de opbouw: als rechtstreeks
kind van een stap is het één onderdeel, en het hoeft daarvoor niets te
doen. Het zet zelf geen animatie op zijn eerste weergave, en een island
houdt zijn binnenkant stil met `settle`. Verder hetzelfde als hierboven:
hover en kleur in CSS met `motion-fast`; iets wat na een handeling
verschijnt met `appear`.

## Iconografie

- Lijniconen: 24 × 24 viewBox, stroke 2, ronde uiteinden, kleur via
  `currentColor`.
- Wie een volledige set nodig heeft: Material Symbols Rounded, in dezelfde
  maat en lijnstijl.
- De barometerbeelden staan in `src/assets/barometer/`
  (`ai-barometer.png`, `ai-niveau-0.png` tot `ai-niveau-3.png`). Ze zijn
  leerinhoud: gebruik ze in uitleg, niet als knop of versiering.

## Logo

- `src/assets/logo/arcadia-logo.svg`: het origineel, voor lichte grond.
- In een balk 24 tot 30px hoog; in de header 28px, als `<img>` met
  `alt="Arcadia scholen"`, gevolgd door de tekst *AI-leerpad*.
- Nooit hertekenen of herkleuren.
- Het logo heeft geen onderschrift *SCHOLEN*. De affiche wel; vraag die
  versie op als je ze nodig hebt.

## Een nieuwe versie overnemen

1. Lees het design system met de Artifact-tool (`action: "read"`, de `url`
   hierboven), met `path` of `paths`:
   - `project/tokens.json`: de tokens, met een `usage` per token. Dit is de
     bron van waarheid.
   - `project/README.md`: alleen de secties *Kleur*, *Typografie*, *Ruimte,
     vorm, diepte*, *Iconografie* en *Logo*.
   - De beelden zijn geüploade assets: zoek hun id met `action: "list"`,
     `scope: "assets"`, en lees ze met dat id als `path`.
2. Neem alleen de looks over: de `light`-waarden naar
   `src/styles/tokens.css` (namen ongewijzigd), de beelden naar
   `src/assets/`, en de visuele regels en de tabellen naar dit document.
   Componenten, markup uit de previews, `bundle.js` en regels over de werking
   van de site neem je niet over.
3. Werk de versie en de datum bij, bovenaan `tokens.css` en hierboven.
4. Controleer het contrast van `ink`, `ink-muted`, `forest`, `brand-text` en
   `ai-text` op `bg`, `surface` en `surface-sunken`: minstens 4.5:1.
