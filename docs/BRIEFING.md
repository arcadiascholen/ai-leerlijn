# Briefing — AI-leerpad Arcadia Scholen

Dit document is de specificatie van de site: wat ze moet doen, voor wie, en
hoe ze gebouwd wordt. Het is het startpunt voor elke sessie en elk issue.
Waarden die als *indicatief* gemarkeerd zijn, zijn een vertrekpunt en geen
beslissing; ze worden vastgelegd in het issue dat ze bouwt.

## 1. Doel

Op **dinsdag 10 november 2026** volgen de leerkrachten van de vier scholen van
Arcadia Scholen een gezamenlijke professionalisering. De leerlingen werken die
namiddag thuis, op hun laptop, aan een digitaal leerpad over artificiële
intelligentie. Deze site is dat leerpad.

- Alle leerlingen nemen deel. Het is verplicht, maar het is geen toets: er
  worden geen punten gegeven. Er wordt alleen opgevolgd wie het eindformulier
  heeft ingediend.
- Het leerpad is de eerste stap naar een doorlopende AI-leerlijn voor de
  scholengroep. Na 10 november wordt de site verder uitgebouwd.

De leerlijn vertrekt van vier doelen:

1. **AI herkennen en begrijpen** — wat is AI, wanneer heb ik ermee te maken?
2. **AI aansturen en gebruiken** — duidelijke vragen stellen, een passende
   toepassing kiezen.
3. **Output kritisch bekijken** — fouten, eenzijdigheid en vooroordelen,
   controle met bronnen.
4. **Verantwoord en ethisch omgaan met AI** — schoolafspraken, transparantie,
   privacy, auteursrecht, eerlijk schoolwerk.

Of de zes doelstellingen van Kenniscentrum Digisprong het referentiekader
worden in plaats van deze vier, ligt nog open (§ 11).

## 2. Bronnen en voorrang

De afspraken komen uit drie documenten van de werkgroep. Ze staan in het
Teams-kanaal *AI-leerlijn* van ARC ICT WG, **niet in deze repo**.

| Document | Datum | Gewicht |
|---|---|---|
| Verslag van de samenkomst | 23 oktober 2026 | **gaat voor** |
| Voorbereidingsnota voor die samenkomst | 23 oktober 2026 | aanvullend |
| Conceptnota gezamenlijke AI-leeractiviteit | 6 oktober 2026 | achtergrond |

Spreken ze elkaar tegen, dan geldt het verslag. Latere beslissingen van de
eigenaar staan in deze briefing en gaan op hun beurt voor.

**Deze repo is publiek.** Zet er geen verslagen, namen van collega's of
leerlingen, sanctieafspraken of andere interne informatie in. Beslissingen
horen hier wel, in neutrale bewoording.

## 3. Doelgroep

Leerlingen van de eerste, tweede en derde graad secundair onderwijs, A- en
B-stroom en alle finaliteiten. Ze werken alleen, thuis, zonder leerkracht in
de buurt, op een laptop.

| Graad | Wat ze doen |
|---|---|
| Eerste | Geen generatieve AI: dat mag wettelijk niet. Ze herkennen AI in hun dagelijks leven (algoritmes, AI-overzicht in Google, spraakassistenten), bekijken voorbeeldgesprekken en vooraf gemaakte antwoorden, en werken eventueel met een niet-generatieve tool zonder account, zoals Teachable Machine. |
| Tweede | Proberen zelf AI uit op een herkenbare taak die ze toch al moeten maken. Ze leren vragen bijsturen en beweringen controleren met betrouwbare, onafhankelijke bronnen. |
| Derde | Moeilijkere studie- of beroepstaken. Ze zoeken ook minder opvallende fouten en verantwoorden hun keuzes. Wie wil, kan zich technisch verdiepen. |

Taal en ondersteuning passen zich aan voor de B-stroom en de finaliteiten:
korte zinnen, één idee per scherm, geen vakjargon zonder uitleg.

## 4. De weg van een leerling

```
start ─▶ nulmeting ─▶ modulekeuze ─▶ module (± 70 min) ─▶ eindformulier
         Smartschool                   deze site            Smartschool
```

1. **Start.** De leerling opent de site via een link in Smartschool.
2. **Nulmeting.** Een korte Smartschool-bevraging (± 10 minuten, maximaal 15
   vragen, vertakt per graad). Die vult de leerling in vóór de module, zodat de
   beginsituatie zuiver gemeten wordt. De nulmeting wordt **niet** aan het LVS
   gekoppeld. Ze dient als basislijn om later de impact van het AI-onderwijs te
   meten. Een ander team stelt ze op; de site linkt er alleen naar.
3. **Modulekeuze.** De leerling kiest **één module** uit het aanbod, op basis
   van interesse, graad en niveau. Zelf kiezen verhoogt de motivatie en
   voorkomt frustratie bij gevorderde leerlingen.
4. **Module.** Ongeveer 70 minuten, in korte stappen (§ 6).
5. **Eindformulier.** **Eén Smartschool-formulier voor alle modules**, met de
   gekozen module als eerste vraag. Het bevat een korte reflectie en
   optioneel een bestand (screenshot, chatverslag, eigen werk). De resultaten
   komen in het LVS, zodat klastitularissen zien wie heeft ingediend.

De site zelf verwerkt **geen persoonsgegevens**. Alles wat ingediend wordt,
gaat via Smartschool. De site heeft geen backend, geen login, geen analytics
en geen cookies.

## 5. Modules

### Aanbod (stand 26 oktober 2026)

| Module | Graad | Status |
|---|---|---|
| Wat is AI? AI herkennen en begrijpen | 2e, met differentiatie | wordt aangeleverd |
| AI als hulpmiddel bij het leren: AI als coach | 2e en 3e, basis tot moeilijk | in opbouw in deze repo |
| Vibecoding | 2e en 3e | wordt aangeleverd |
| Ethiek, AI-beleid en verantwoord gebruik | 2e en 3e | wordt aangeleverd |
| AI herkennen, kritisch omgaan, tools en promptvoorbeelden | 1e, ook B-stroom | wordt aangeleverd |

### Aanleveren zonder sjabloon

Collega's leveren hun inhoud aan **in de vorm die hun past**: Word,
PowerPoint, een Bookwidgets-link, een tekst in Teams. Er is bewust geen
sjabloon. Het integreren gebeurt achteraf in deze repo: de inhoud wordt
omgezet naar korte stappen, krijgt de juiste metadata en gebruikt de
componenten van de site. Bij dat omzetten blijft de didactische bedoeling van
de auteur leidend; vragen en oefeningen die de auteur voorzag, vallen niet
stilzwijgend weg.

### Metadata per module (*indicatief*)

Elke module is een bestand in de contentcollectie `modules`, met een strikt
schema. Het overzicht en de filters op de site worden daaruit opgebouwd.

| Veld | Betekenis |
|---|---|
| `title` | Titel zoals de leerling hem ziet |
| `kort` | Eén zin over wat je in de module doet |
| `graden` | Lijst uit `1`, `2`, `3` |
| `niveau` | 1 tot 4 sterren |
| `duur` | Minuten, standaard 70 |
| `aiGebruik` | `zelf` (de leerling gebruikt zelf AI), `voorbeelden` (bekijkt vooraf gemaakte gesprekken) of `geen` |
| `doelen` | Welke van de vier doelen (§ 1) de module dekt |
| `status` | `binnenkort` of `beschikbaar`; een module die nog niet klaar is, staat zichtbaar maar niet klikbaar in het overzicht |

Open: is een basis- en een gevorderde versie van dezelfde module één bestand
of twee? Dat wordt beslist in het schema-issue.

## 6. Vorm: korte stappen, vragen centraal

De modules zijn **geen cursusteksten**. Een module is een reeks korte
stappen, vergelijkbaar met slides, waarin de leerling veel doorklikt en
voortdurend zelf iets moet doen. Vragen staan centraal: ze activeren, en ze
houden een leerling die alleen thuis zit bij de les.

- **Eén stap per scherm.** Een stap past volledig op een laptopscherm van
  **1366 × 768** zonder te scrollen. Er staat één idee of één vraag op.
- **Navigatie.** Vorige en volgende, de pijltjestoetsen, en een
  voortgangsbalk die toont hoe ver de leerling is.
- **Voortgang bewaren.** De huidige stap en de antwoorden worden lokaal in de
  browser bewaard (`localStorage`, plus de stap in de URL). Wie herlaadt of
  de laptop dichtklapt, gaat verder waar die gebleven was. Er gaat niets naar een
  server.
- **Vraagtypes** (*indicatief*, groeit met de modules):
  - meerkeuze met directe feedback;
  - eerst zelf denken, dan het antwoord tonen;
  - twee prompts of twee AI-antwoorden vergelijken;
  - sorteren of indelen (bijvoorbeeld: is dit AI of niet?);
  - een korte reflectie typen.
- **Samenvatting aan het einde.** De laatste stap toont wat de leerling
  onderweg schreef, met een knop *kopieer*. Die tekst plakt de leerling in
  het eindformulier. Zo levert de site het bewijsstuk aan zonder zelf
  gegevens te verwerken.

Auteurs schrijven een module als **één MDX-bestand** waarin de stappen
`<Stap>`-blokken zijn. Eén bestand per module houdt het integreren
overzichtelijk; een presentatie van een collega wordt zo een reeks stappen.

## 7. AI-gebruik en de AI-barometer

De **AI-barometer** van Arcadia Scholen heeft vier niveaus voor afspraken
over AI-gebruik **bij evaluaties**: 0 Geen AI, 1 Voorbereiding,
2 Ondersteuning, 3 Uitvoering. Het leerpad is geen evaluatie, dus de site
zet **geen barometerniveau per opdracht**. Alleen de conceptnota vroeg
daarom; het verslag van 23 oktober niet.

Op de affiche staat wel: *als er geen AI-niveau vermeld staat, mag je geen
AI gebruiken.* Een leerling die die regel kent, mag niet twijfelen of AI hier
toegelaten is. Daarom toont **elke module bij de start in één duidelijke zin
of de leerling zelf AI gebruikt** (het veld `aiGebruik`). Of daar een
barometericoon bij hoort, beslist het team later.

De barometer zelf is **leerinhoud**: in de module over verantwoord gebruik, en
als aanknopingspunt in *AI als coach* (AI als coach past bij niveau 1 en 2).
De barometerkleuren (rood, oranje, geel, groen) zijn gereserveerd voor die
betekenis en worden nergens anders in de vormgeving gebruikt.

**Toepassingen.** Uitgangspunt zijn gangbare tools: ChatGPT, Gemini, Copilot
en eventueel Claude. De leeftijdsvoorwaarden van die tools verschillen en
zijn nog niet afgetoetst (§ 11). Waar een leerling geen geschikte toegang
heeft, is er een alternatief zonder persoonlijk account.

## 8. Techniek

| Onderdeel | Keuze |
|---|---|
| Framework | Astro 6, statische output |
| Inhoud | MDX in de contentcollectie `modules`, schema met zod en `.strict()` |
| Interactie | React-islands voor de stappenspeler en de vraagtypes |
| Opmaak | Pure CSS met custom properties in `src/styles/tokens.css`, geen CSS-framework |
| Hosting | GitHub Pages via GitHub Actions |
| Adres | `https://arcadiascholen.github.io/ai-leerlijn/` (Astro `base: '/ai-leerlijn'`) |
| Node | 22 |

Het patroon volgt de site `cursus-esthetica` van dezelfde auteur: dezelfde
opbouw van de contentcollecties, de tokens en de workflows `build.yml` en
`pr-check.yml`.

### Mappen (*indicatief*, ontstaat met het skelet)

```
src/
  content.config.ts          schema van de collectie modules
  content/modules/<id>.mdx   één bestand per module
  components/stappen/        stappenspeler en <Stap>
  components/vragen/         vraagtypes
  layouts/
  pages/                     start, modulekeuze, één route per module
  styles/tokens.css
public/images/<module-id>/
docs/BRIEFING.md
```

### Belasting en prestatiebudget

Op 10 november bezoeken ongeveer **4000 leerlingen** de site in één
namiddag. GitHub Pages serveert statische bestanden via een CDN; dat aantal is
geen probleem, binnen een zachte limiet van **100 GB bandbreedte per maand**
en **1 GB** sitegrootte.

- **Geen video's in de repo.** Video's staan op YouTube of Microsoft Stream en
  worden ingesloten. Eén video van 50 MB voor 4000 leerlingen is al 200 GB.
- Beelden gecomprimeerd, in de maat waarin ze getoond worden.
- Richtwaarde: minder dan **3 MB** overdracht voor een volledige module.

## 9. Vormgeving

De huisstijl is die van **Arcadia Scholen**, zoals op de affiche van de
AI-barometer: logo *ARCADIA SCHOLEN*, donkergroen op gebroken wit, een
lichtgroen accent, een stevige schreefloze letter. Een design system uit
Claude Design levert later de definitieve tokens en componenten; tot dan
gebruikt de site voorlopige tokens. Omdat componenten uitsluitend
`var(--…)` gebruiken, is het inbouwen van het definitieve ontwerp één
wijziging in `tokens.css` en de basiscomponenten.

Ontwerp voor een laptop (1366 × 768 als kleinste doel), niet voor een gsm.
Toegankelijkheid telt wel: voldoende contrast (minstens 4.5:1 voor tekst),
bediening met het toetsenbord, en tekst die met voorleessoftware werkt.

## 10. Planning en bevriezing

| Wanneer | Wat |
|---|---|
| Week van 26 oktober | Skelet, stappenspeler, eerste modules; eerste versies worden meteen gepubliceerd en daarna stap voor stap uitgebreid |
| Tot 8 november | Aangeleverde modules integreren, testen met collega's |
| Maandag 9 november | Laatste technische controle, reservekopie klaarzetten, herinnering aan leerlingen en titularissen |
| **Dinsdag 10 november** | **Bevriezing: geen merges naar `main` van 9 november 18 uur tot het einde van 10 november** |
| Na 10 november | Deelname, technische knelpunten en nulmeting bespreken; de leerlijn verder uitbouwen |

## 11. Open beslissingen

- **Toepassingen en leeftijd.** Welke tools zijn toegelaten per graad, gezien
  hun leeftijdsvoorwaarden? Volgens de voorwaarden zoals ze bij de start
  bekend waren, vraagt Claude 18 jaar en ChatGPT 13 jaar met toestemming van
  de ouders onder 18. Dit moet nog nagekeken worden en is een beslissing van
  het team.
- **Smartschool-platformen.** Werken de vier scholen op één
  Smartschool-platform of op vier? Bij vier heeft de site een schoolkeuze
  nodig, met per school een eigen link naar de nulmeting en het
  eindformulier.
- **Deadline.** Tegen welk uur dient de leerling het eindformulier in?
- **Varianten van een module.** Eén bestand per niveau of één bestand met
  varianten (§ 5)?
- **Referentiekader.** De vier doelen of de zes doelstellingen van
  Kenniscentrum Digisprong?
- **Eerste graad.** Krijgt de eerste graad een eigen startpagina, of dezelfde
  met een gefilterd aanbod?
