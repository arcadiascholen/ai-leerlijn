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
| Eerste | Geen generatieve AI: een keuze van de school, in lijn met de grens van 13 jaar in de voorwaarden van de tools (§ 7). Ze herkennen AI in hun dagelijks leven (algoritmes, AI-overzicht in Google, spraakassistenten), bekijken voorbeeldgesprekken en vooraf gemaakte antwoorden, en werken eventueel met een niet-generatieve tool zonder account, zoals Teachable Machine. |
| Tweede | Proberen zelf AI uit op een herkenbare taak die ze toch al moeten maken. Ze leren vragen bijsturen en beweringen controleren met betrouwbare, onafhankelijke bronnen. |
| Derde | Moeilijkere studie- of beroepstaken. Ze zoeken ook minder opvallende fouten en verantwoorden hun keuzes. Wie wil, kan zich technisch verdiepen. |

Taal en ondersteuning passen zich aan voor de B-stroom en de finaliteiten:
korte zinnen, één idee per scherm, geen vakjargon zonder uitleg.

## 4. De weg van een leerling

```
start ─▶ nulmeting ─▶ modulekeuze ─▶ module (± 70 min) ─▶ eindformulier
         Smartschool                   deze site            Smartschool
```

1. **Start.** De leerling opent de site via een link in Smartschool. De
   startpagina (`/ai-leerlijn/`) toont een korte welkomsttekst en de weg in
   drie genummerde stappen: *1. Nulmeting invullen*, *2. Kies je module*,
   *3. Eindformulier invullen*. Ze past op 1366 × 640 zonder te scrollen.
   Naast *Zo ga je te werk* staat een link naar de pagina over de
   toegelaten tools (§ 7).
2. **Nulmeting.** Een korte Smartschool-bevraging (± 10 minuten, maximaal 15
   vragen, vertakt per graad). Die vult de leerling in vóór de module, zodat de
   beginsituatie zuiver gemeten wordt. De nulmeting wordt **niet** aan het LVS
   gekoppeld. Ze dient als basislijn om later de impact van het AI-onderwijs te
   meten. Een ander team stelt ze op; **de site linkt ernaar** vanuit stap 1
   van de startpagina, zodat de volgorde nulmeting → module bewaakt blijft.
3. **Modulekeuze.** De leerling kiest **één module** uit het aanbod
   (`/ai-leerlijn/modules/`), op basis van interesse, graad en niveau. Zelf
   kiezen verhoogt de motivatie en voorkomt frustratie bij gevorderde
   leerlingen. De eerste graad gebruikt **dezelfde pagina** met het filter op
   graad; een link met `?graad=1` opent ze meteen gefilterd.
4. **Module.** Ongeveer 70 minuten, in korte stappen (§ 6).
5. **Eindformulier.** **Eén Smartschool-formulier voor alle modules**, met de
   gekozen module als eerste vraag. Het bevat een korte reflectie en een
   bestand: de pdf met de samenvatting die de leerling aan het einde van de
   module downloadt (§ 6). Die pdf bevat ook tijdstippen: wanneer de
   leerling aan de module en aan elke vraag begon (§ 12, *De samenvatting*).
   Zo kan het team achteraf zien waar leerlingen veel tijd voor nodig
   hadden. De site zelf verwerkt die tijden niet en stuurt ze nergens heen:
   ze staan in de browser van de leerling en in de pdf die de leerling zelf
   oplaadt. Dat het formulier een bestand aanvaardt, wordt in Smartschool
   geregeld, buiten deze repo. De resultaten komen in het LVS,
   zodat klastitularissen zien wie heeft ingediend. De startpagina (stap 3)
   en de samenvatting aan het einde van een module linken ernaar. Wie een
   module op Bookwidgets volgt, levert daar het werk in en heeft geen pdf, maar
   vult het eindformulier wel in; het formulier in Smartschool houdt daar
   rekening mee (§ 5, *Een module op een ander platform*).

Elk van de vier scholen heeft een **eigen Smartschool-platform**: SMA
(`sanctamaria-aarschot`), DIA (`dia`), SJIB (`sjib`) en SJCA (`sjca`). Een link
naar Smartschool, of naar Bookwidgets via Smartschool, bestaat dus vier keer.
De knop vraagt de leerling de eerste keer van welke school die is en onthoudt
die keuze in de browser; de leerling kan ze wijzigen. De links en het uur
waarop het eindformulier ingediend moet zijn, staan op één plek:
`src/config/smartschool.ts` (zie § 12, *Links naar Smartschool*).

De site zelf verwerkt **geen persoonsgegevens**. Alles wat ingediend wordt,
gaat via Smartschool. De site heeft geen backend, geen login, geen analytics
en geen cookies.

## 5. Modules

### Aanbod (stand 28 oktober 2026)

| Module | Graad | Status | Bestand(en) |
|---|---|---|---|
| Wat is AI? AI herkennen en begrijpen | 1e en 2e | beschikbaar, op Bookwidgets | `wat-is-ai` |
| AI als hulpmiddel bij het leren: AI als coach | 2e en 3e, basis tot moeilijk | 3e graad beschikbaar met de takken schriftelijke toets, mondeling examen, debat en presentatie; 2e graad beschikbaar met de routes hoofdstuk, oefeningen of een taak en iets van buiten kennen, de route presentatie volgt | `ai-als-coach-2e-graad`, `ai-als-coach-3e-graad` |
| Vibecoding | 2e en 3e | wordt aangeleverd | `vibecoding` |
| Ethiek, AI-beleid en verantwoord gebruik | 2e en 3e | wordt aangeleverd | `verantwoord-gebruik` |
| AI herkennen, kritisch omgaan, tools en promptvoorbeelden | 1e, ook B-stroom | wordt aangeleverd | `ai-herkennen-1e-graad` |

Elke module staat al als **plaatshouder** in `src/content/modules/`, met
`status: binnenkort`, een werktitel en een indicatieve `niveau`,
`aiGebruik` en `doelen`. Zo is het overzicht van bij de start volledig. Het
issue dat een module levert, vult de stappen in, past de metadata aan en zet
de status op `beschikbaar`. De controles op de inhoud (minstens één
`<Stap>`, de plaats van de samenvatting; § 12) gelden alleen voor
beschikbare modules: een plaatshouder heeft nog geen stappen en geen pagina.
De testmodule `voorbeeld` toont elk component. Ze heeft `status: verborgen`:
leerlingen zien ze niet, en ze staat niet op de site. In `npm run dev` blijft
ze bereikbaar via `/ai-leerlijn/modules/voorbeeld/`, om componenten te testen.

### Aanleveren zonder sjabloon

Collega's leveren hun inhoud aan **in de vorm die hun past**: Word,
PowerPoint, een Bookwidgets-link, een tekst in Teams. Er is bewust geen
sjabloon. Het integreren gebeurt achteraf in deze repo: de inhoud wordt
omgezet naar korte stappen, krijgt de juiste metadata en gebruikt de
componenten van de site. Bij dat omzetten blijft de didactische bedoeling van
de auteur leidend; vragen en oefeningen die de auteur voorzag, vallen niet
stilzwijgend weg.

### Een module op een ander platform

Een module die al klaar op Bookwidgets of Smartschool staat, wordt niet omgezet
naar stappen. Ze is een module met **één `<Stap>`**: een korte uitleg en een
`<SchoolLink>` (§ 12, *Een link per school*), zonder `<Samenvatting />`. Zo
gelden de kaart, de filters en de zin over AI-gebruik zoals bij elke module, en
brengt *Naar de startpagina* de leerling terug. Het werk wordt ingediend op het
andere platform, dus er is geen pdf. De leerling vult daarna wel het
eindformulier in, en de stap zegt dat. `wat-is-ai` is het eerste voorbeeld.

### Metadata per module

Elke module is een MDX-bestand in de contentcollectie `modules`
(`src/content/modules/<id>.mdx`). Het overzicht en de filters op de site
worden uit de frontmatter opgebouwd.

| Veld | Waarde | Betekenis |
|---|---|---|
| `title` | tekst | Titel zoals de leerling hem ziet |
| `kort` | tekst | Eén zin over wat je in de module doet |
| `graden` | lijst uit `1`, `2`, `3`, minstens één | Voor welke graden de module bedoeld is |
| `niveau` | geheel getal van `1` tot `4` | Moeilijkheid in sterren |
| `duur` | geheel getal in minuten, standaard `70` | Hoe lang de module ongeveer duurt |
| `aiGebruik` | `zelf`, `voorbeelden` of `geen` | `zelf`: de leerling gebruikt zelf AI; `voorbeelden`: de leerling bekijkt vooraf gemaakte gesprekken; `geen`: geen AI |
| `doelen` | lijst uit `1` tot `4`, minstens één | Welke van de vier doelen (§ 1) de module dekt |
| `status` | `binnenkort`, `beschikbaar` of `verborgen` | Een module die nog niet klaar is (`binnenkort`), staat zichtbaar maar niet klikbaar in het overzicht en krijgt geen eigen pagina. Een module met `verborgen` staat niet in het overzicht en heeft alleen in `npm run dev` een pagina |
| `volgorde` | geheel getal | Plaats in het overzicht, oplopend |

Alle velden behalve `duur` zijn verplicht. Het schema staat in
`src/content.config.ts` en is strikt (`.strict()`): een onbekend veld, zoals
de tikfout `nivau`, laat de build falen in plaats van stil te verdwijnen.
Elke module met `status: beschikbaar` krijgt een pagina op
`/ai-leerlijn/modules/<id>/`, waarbij `<id>` de bestandsnaam zonder `.mdx` is.

**Eén bestand per versie.** Bestaat een module in meer dan één versie,
bijvoorbeeld voor verschillende graden of niveaus, dan is elke versie een
eigen bestand met eigen `graden` en `niveau` (bijvoorbeeld
`ai-als-coach-2e-graad.mdx` en `ai-als-coach-3e-graad.mdx`). De leerling ziet
in het overzicht één kaart per versie.

### Het overzicht

- `/ai-leerlijn/modules/` toont één kaart per module, gesorteerd op
  `volgorde`. Een kaart toont de titel, `kort`, de graden, het niveau als
  sterren (met een tekstalternatief: *Niveau 2 van 4*), de duur en de zin
  over AI-gebruik (§ 7).
- Een beschikbare module is een link naar haar pagina. Een module met
  `status: binnenkort` staat erbij, gedimd, zonder link en met het label
  *Binnenkort*.
- Een **filter op graad** (alle, 1e, 2e, 3e) werkt met muis en toetsenbord
  (keuzerondjes: Tab en de pijltjestoetsen). De keuze staat in de URL
  (`?graad=1`), niet in `localStorage`: een link met het filter kan gedeeld
  worden, de terugknop van de browser brengt de leerling terug naar de
  gefilterde lijst, en niemand vindt een lijst die gefilterd is door een
  keuze die hij vergeten is. Zonder JavaScript is het filter verborgen en
  staan alle modules er.
- Het overzicht telt nu zes kaarten, in twee rijen. Houd `kort` op ongeveer 60
  tekens (twee regels op een kaart) en de titel op hoogstens twee regels; wat
  langer is of meer kaarten vraagt, laat deze pagina scrollen. Dat mag hier: het
  is geen stap. Nu scrolt ze een klein beetje op 1366 × 640 (663 px hoog), door
  de langere `kort` van `verantwoord-gebruik`.

## 6. Vorm: korte stappen, vragen centraal

De modules zijn **geen cursusteksten**. Een module is een reeks korte
stappen, vergelijkbaar met slides, waarin de leerling veel doorklikt en
voortdurend zelf iets moet doen. Vragen staan centraal: ze activeren, en ze
houden een leerling die alleen thuis zit bij de les.

- **Eén stap per scherm.** Een stap past volledig op een laptopscherm van
  1366 × 768 zonder te scrollen. Na de browserbalken blijft daarvan ongeveer
  **1366 × 640** zichtbaar; daarop wordt ontworpen en getest. Er staat één
  idee of één vraag op.
- **Navigatie.** Vorige en volgende, de pijltjestoetsen, en een
  voortgangsbalk die toont hoe ver de leerling is. De leerling klikt vrij
  vooruit; een vraag die verplicht beantwoord moet worden, regelt dat zelf.
  Op een stap met een keuze gaat *Volgende* pas als de leerling gekozen
  heeft. Een module kan zich één keer vertakken: de leerling kiest
  bijvoorbeeld een doel en ziet daarna alleen de stappen van dat doel, met
  daarna een gedeeld slot. De voortgang telt de stappen van die route. Wie
  wil wisselen, gaat terug naar de keuzestap; wat de leerling in de andere
  tak schreef, blijft bewaard.
- **Voortgang bewaren.** De huidige stap en de antwoorden worden lokaal in de
  browser bewaard (`localStorage`, plus de stap in de URL). Wie herlaadt of
  de laptop dichtklapt, gaat verder waar die gebleven was. Er gaat niets naar een
  server. Een knop *Opnieuw beginnen* wist de stap en alle antwoorden van die
  module.
- **Vraagtypes** (*indicatief*, groeit met de modules):
  - meerkeuze met directe feedback;
  - eerst zelf denken, dan het antwoord tonen;
  - twee prompts of twee AI-antwoorden vergelijken;
  - sorteren of indelen (bijvoorbeeld: is dit AI of niet?);
  - een korte reflectie typen.
- **Samenvatting aan het einde.** De laatste stap zegt hoeveel vragen de
  leerling invulde en welke nog leeg zijn, en maakt van alles wat de leerling
  onderweg schreef een pdf om te downloaden. Die pdf laadt de leerling op in
  het eindformulier. Zo levert de site het bewijsstuk aan zonder zelf
  gegevens te verwerken: de pdf ontstaat in de browser van de leerling. Een
  module op een ander platform (§ 5) heeft geen samenvatting en geen pdf.

Auteurs schrijven een module als **één MDX-bestand** waarin de stappen
`<Stap>`-blokken zijn. Eén bestand per module houdt het integreren
overzichtelijk; een presentatie van een collega wordt zo een reeks stappen.
Hoe dat precies gaat, en hoe componenten binnen een stap werken, staat in
§ 12.

### Een module opbouwen

Dit patroon ontstond met `ai-als-coach-3e-graad`. Volgende modules volgen
het, tenzij de auteur een andere opbouw voorziet.

- **Opbouw.** Een gedeelde start (het idee, de taak, de keuzes), daarna
  eventueel een vertakkende keuze op het doel met één tak per doel, en een
  gedeeld slot: reflectie, verantwoording, het bewijsstuk en de
  samenvatting. De keuzestap staat in de start; de samenvatting is altijd de
  laatste, gedeelde stap.
- **Eén tool, één chat.** In een module waarin de leerling zelf AI gebruikt,
  kiest die in de start een tool (`<Keuze naam="tool">`), zet die de tool
  klaar (training, denkmodus, opladen) en werkt die daarna in één chat in een
  tweede tabblad. Die chat begint waar de leerling de cursus voor het eerst
  oplaadt, zodat die maar één keer opgeladen wordt; in
  `ai-als-coach-3e-graad` is dat chat 3 van het contextexperiment, waarin de
  takken toets en mondeling verder werken. Copilot start daar toch een nieuwe
  chat (in tak toets in *Studeren en leren*); opladen heeft er geen
  daglimiet. De werkvormen zijn voor elke tool dezelfde; alleen de
  handelingen verschillen, in `<Tool>`-blokken. Die volgen de stand van de
  tools (§ 7). Waar de bron onzeker is over een knop of menu, staat er *kan
  bij jou anders heten*.
- **Per werkvorm één prompt.** De leerling kopieert een `<Prompt>` met
  invulplaatsen (`[vak]`, `[datum]`) en vult die aan in de tool. Een prompt
  geeft context (wie ben je, wat is je bron, wat wil je), geen rolprompt.
- **De eigen inbreng staat in de prompt.** Moet de leerling naast de prompt
  iets in de chat zetten (een eigen tekst, een antwoord, verwachte vragen),
  dan staat dat als invulplaats in de prompt zelf, bijvoorbeeld
  `[schrijf hier je antwoord]`: zo gaat het mee op het klembord en ziet de
  leerling in de chat wat nog ontbreekt. De tekst boven de prompt zegt het
  als handelingen in volgorde. Moet het in de samenvatting komen, dan wordt
  het een veld van de prompt (`velden`, § 12), zoals in *Uitleg op twee
  niveaus* en *Voorspel je toets* in `ai-als-coach-3e-graad`. Wat de leerling
  al in een `<Reflectie>` op een eerdere stap schreef, komt in de prompt met
  `overnemen` (§ 12), zoals in *De tegenstander* in `ai-als-coach-3e-graad`.
- **Wat de leerling schrijft, staat in de module.** Een score, een
  voorspelling of een reflectie gaat in een `<Reflectie>` of `<DenkEerst>`,
  of in een veld van een prompt, zodat het in de samenvatting komt. Wat de leerling in de chat doet, komt er
  niet in; daarvoor is er het bewijsstuk (een link of een stuk van het
  gesprek, per tool).
- **Een nieuw component is een gewone stap.** Vraagt een stap om iets wat geen
  bestaand component kan, dan komt er een nieuw component, in plaats van de
  stap te plooien naar wat er al is. De voorwaarde: het lokt een andere
  denkhandeling uit, en is geen versiering. Een nieuw component is generiek
  (`src/components/vragen/` of `src/components/inhoud/`), met een eigen `kind`
  in `answers.ts` als het iets bewaart, en wat de leerling schrijft of haalt
  komt in de samenvatting (§ 12).
- **Hoogte per combinatie** (gemeten op 1366 × 640): een `<Reflectie>` met
  hoogstens één regel tekst erboven; een `<Prompt>` van drie regels met twee
  regels tekst en één `<Tool>`-blok; een `<DenkEerst>` zonder inleiding; een
  `<Chat naast>` met een `<Meerkeuze>` van vier opties van twee à drie
  woorden, een vraag van één regel en feedback van hoogstens ± 70 tekens; een
  `<Meting>` met één regel tekst, ook met de vergelijking; een `<Keuzechat>`
  met berichten van hoogstens ± 60 tekens en feedback van hoogstens ± 240
  tekens; `<Flashcards>` met één regel tekst en een vraag van hoogstens twee
  regels; een `<Meeneemkaart>` met vijf rijen, zonder tekst erboven. Een
  prompt die de leerling laat antwoorden en een reflectie op dat antwoord
  staan op twee stappen.
- **Controle.** Meet elke stap van elke route, met elke tool, met de vragen
  in hun hoogste toestand (voorbeeldantwoord getoond, alle opties
  aangeklikt): de inhoud van de kaart mag niet scrollen.
- **Routes in de 2e graad.** `ai-als-coach-2e-graad` volgt dit patroon, in
  eenvoudigere taal, met wat de 3e graad nog niet heeft. Het contextexperiment
  heeft twee chats, en de sessie werkt verder in chat 2. De module sluit af met
  een `<Meeneemkaart>` in plaats van een eigen coachprompt, en `<Keuzechat>`,
  `<Meting>` en `<Flashcards>` komen in de plaats van vrije reflecties. Wie
  niets concreets heeft, kopieert een startpakket uit een `<Hulp>`. Een route
  telt **hoogstens 27 stappen**, gedeeld plus route: het gedeelde deel telt er
  19, dus een route hoogstens 8. Dat is ongeveer 2,5 minuut per stap voor 70
  minuten; die schatting is nog niet gemeten bij leerlingen.

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

De barometer gaat over wat de leerling indient. De eigen oplossing laten
nakijken is leren: de leerling mag een oefening of taak met de eigen oplossing
in een chat zetten en vragen waar het fout gaat en waarom. Wat de leerling
indient, schrijft die zelf. Een huistaak op punten staat niet op niveau 0:
thuis valt niet af te dwingen dat er geen AI aan te pas komt. Tijdens een toets
gebruikt de leerling geen AI, tenzij de leerkracht er een niveau bij vermeldt.

| `aiGebruik` | Zin |
|---|---|
| `zelf` | *Je gebruikt zelf AI.* |
| `voorbeelden` | *Je gebruikt zelf geen AI.* (met een oog als icoon: de leerling bekijkt voorbeelden) |
| `geen` | *Je gebruikt geen AI.* |

De zin staat op de kaart in het overzicht en op de modulepagina naast de
titel, boven de stappen, op elke stap. Hij kost de stap geen hoogte. De
zinnen staan op één plek, in `src/components/modules/labels.ts`. Bij `zelf`
volgt op de modulepagina een link *Welke tool?* naar de pagina over de
toegelaten tools (zie *Toepassingen*), in een nieuw tabblad, zodat de module
open blijft. Op de kaart niet: daar is de hele kaart al een link.

De barometer zelf is **leerinhoud**: in de module over verantwoord gebruik, en
als aanknopingspunt in *AI als coach* (AI als coach past bij niveau 1 en 2).
De barometerkleuren (rood, oranje, geel, groen) zijn gereserveerd voor die
betekenis en worden nergens anders in de vormgeving gebruikt.

**Toepassingen.** Voor de tweede en derde graad zijn ChatGPT en Gemini, met
Gemini Notebook (tot juli 2026 NotebookLM), de gangbare tools. Wie geen
persoonlijk account heeft, of van de ouders geen ChatGPT of Gemini mag
gebruiken, gebruikt Copilot Chat met het schoolaccount. Copilot is geen
uitzondering op de regel van de affiche: wat hierboven over de barometer staat,
geldt ook voor Copilot. Claude komt in de modules niet voor: de
consumentenvoorwaarden vragen 18 jaar. De school vroeg bij de start van het
schooljaar aan de ouders toestemming voor het gebruik van AI-tools, waaronder
ChatGPT. Dat dekt de toestemming van de ouders die ChatGPT vraagt voor wie
jonger is dan 18.

De eerste graad gebruikt geen generatieve AI (§ 3). Dat is een keuze van de
school, geen wettelijk verbod. De Belgische digitale toestemmingsleeftijd is
13 jaar (art. 7, wet van 30 juli 2018; [Kenniscentrum Digisprong][digisprong]),
en ChatGPT, Gemini en Copilot leggen hun grens ook op 13 jaar (zie de tabel
hieronder).

**Opladen.** De modules laten leerlingen zoveel mogelijk context geven: de
cursus van hun leerkracht, hun eigen notities, een foto of screenshot van de
oefening. Voor ze iets opladen, zorgen ze dat het niet voor training gebruikt
wordt (zie de rij *Training* van de tabel), en ze klikken geen duim omhoog of
omlaag. Ze laden geen persoonsgegevens van anderen op.

**Voor de leerling.** De pagina *Welke AI-tool mag ik gebruiken?*
(`/ai-leerlijn/tools/`, `src/pages/tools.astro`) zegt het voor leerlingen: per
tool welk account, waarvoor ze goed is en wat je voor je privacy doet; wat je
nooit in een chat zet; en wat je doet zonder account. De startpagina en elke
module met `aiGebruik: zelf` linken ernaar. De tabel hieronder blijft de bron:
wie ze aanpast, past ook die pagina aan.

### Stand van de tools (oktober 2026)

Wie een module schrijft, vindt hier wat elke tool kan, zonder zelf onderzoek
te doen. De tools veranderen snel: dit is de stand op 28 oktober 2026, de
datum waarop de bronnen geraadpleegd zijn.

| | ChatGPT (gratis) | Gemini (gratis) | Gemini Notebook | Copilot (schoolaccount) |
|---|---|---|---|---|
| Toegang | 13+, onder 18 toestemming ouders ([voorwaarden][chatgpt-voorwaarden]) | 13+; werkt niet met Family Link-toezicht in de EER ([bron][gemini-toezicht]) | 13+, persoonlijk Google-account dat je zelf beheert, dus wellicht niet met Family Link; `notebook.google.com` ([bron][notebook-toegang]) | als ICT de leeftijdsgroep instelde; groen schild en label *Werk* ([bron][copilot-beheer], [leeftijdsgroep][copilot-faq]) |
| Cursus opladen | 3 uploads per dag; of elke foto apart telt, is niet bevestigd in een officiële bron die we konden lezen, dus de modules zeggen *reken erop*; leest maar een deel van een lange cursus (± 12 pagina's, geen officiële bron) ([bron][chatgpt-opladen], [prijzen][chatgpt-prijzen]) | ± 32k tokens context ([bron][gemini-context]) | 50 bronnen, hele cursus, antwoorden met bronvermelding ([bron][notebook-bronnen]) | 50 MB, 20 bestanden per gesprek ([bron][copilot-opladen]) |
| Leermodus | Leermodus (`@study`), niet in Projecten ([bron][chatgpt-leermodus]) | Begeleid leren ([bron][gemini-leren]) | chatstijl *Leergids*; flashcards en toetsen ([bron][notebook-leren], [chat][notebook-chat]) | agent *Studeren en leren*, met de cursus; in het secundair standaard voorgeselecteerd ([bron][copilot-leren], [gebruik][copilot-leren-gebruik]) |
| Eigen coach | Project: instructies en 5 bestanden; GPT's verdwijnen op 11 december 2026 ([bron][chatgpt-gpts]) | Gems verdwijnen op persoonlijke accounts in november 2026 ([bron][gemini-gems]) | — | Agent Builder: instructies en 4 publieke URL's ([bron][copilot-agent]), geen bestanden zonder licentie ([bron][copilot-vereisten]); voor leerlingenaccounts niet bevestigd |
| Denken | *Nadenken*; het label kan verschillen, en gratis op het web wordt het nog uitgerold ([bron][chatgpt-gratis]) | sinds 9 oktober 2026 *Auto*; of je gratis zelf een denkniveau kiest, is niet zeker ([bron][gemini-denken], [modellen][gemini-modellen]) | — | *Think deeper*; op een schoolaccount per chat opnieuw te kiezen (eigen waarneming); vast in een agent ([bron][copilot-overzicht]) |
| Spraak | beperkt, in de browser ([bron][chatgpt-spraak]) | Gemini Live alleen in de app op gsm of tablet ([bron][gemini-live]) | — | alleen dicteren en voorlezen ([bron][copilot-faq]) |
| Chat delen | publieke link, kan opgeladen bestanden tonen ([bron][chatgpt-delen]) | link werkt zolang de chat in de activiteit staat ([bron][gemini-delen]) | deelt het hele notitieboek met de bronnen, nooit het gesprek ([bron][notebook-delen]) | link alleen binnen de eigen organisatie |
| Training | standaard aan; uit via *Gegevensbeheer*; een duim stuurt het gesprek toch door ([bron][chatgpt-training]) | met *Activiteit bewaren* aan, de enige schakelaar ([bron][gemini-training], [activiteit][gemini-activiteit]) | niet rechtstreeks; een duim stuurt ook je bronnen door ([bron][notebook-training], [privacy][notebook-privacy]) | nee ([bron][copilot-training]) |

Alleen ChatGPT heeft een aparte schakelaar voor training. Bij Gemini betekent
training uit: *Activiteit bewaren* uit. Dan is er geen geschiedenis en werkt
een deellink niet; het bewijsstuk is dan gekopieerde tekst, en de leerling
houdt het tabblad open tot het einde van de module. Gemini Notebook en Copilot
trainen standaard niet: daar valt niets uit te zetten. In ChatGPT, Gemini en
Gemini Notebook stuurt een duim omhoog of omlaag het gesprek toch door.

[digisprong]: https://www.vlaanderen.be/kenniscentrum-digisprong/themas/innovatie/artificiele-intelligentie/vanaf-welke-leeftijd-kunnen-of-mogen-je-leerlingen-generatieve-ai-gebruiken
[chatgpt-voorwaarden]: https://openai.com/nl-NL/policies/eu-terms-of-use/
[chatgpt-opladen]: https://help.openai.com/en/articles/8555545-uploading-files-and-audio-to-chatgpt
[chatgpt-prijzen]: https://chatgpt.com/nl-NL/pricing/
[chatgpt-leermodus]: https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt
[chatgpt-gpts]: https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq
[chatgpt-spraak]: https://help.openai.com/en/articles/20001274-chatgpt-voice
[chatgpt-delen]: https://help.openai.com/en/articles/7925741-sharing-conversations-and-scheduled-tasks-in-chatgpt
[chatgpt-training]: https://help.openai.com/nl-nl/articles/7730893-data-controls-in-chatgpt
[chatgpt-gratis]: https://help.openai.com/nl-nl/articles/9275245-chatgpt-free-tier-faq
[gemini-toezicht]: https://support.google.com/gemini/answer/16109150?hl=en
[gemini-context]: https://support.google.com/gemini/answer/16275805?hl=en
[gemini-leren]: https://support.google.com/gemini/answer/16448384?hl=en
[gemini-gems]: https://support.google.com/gemini/answer/15146780?hl=en
[gemini-denken]: https://support.google.com/gemini/answer/17004136?hl=en
[gemini-live]: https://support.google.com/gemini/answer/15274899?hl=en
[gemini-delen]: https://support.google.com/gemini/answer/13743730?hl=en
[gemini-training]: https://support.google.com/gemini/answer/13594961?hl=en
[gemini-activiteit]: https://support.google.com/gemini/answer/13278892?hl=nl
[gemini-modellen]: https://support.google.com/gemini/answer/18648722?hl=nl
[notebook-bronnen]: https://support.google.com/gemininotebook/answer/16215270?hl=en
[notebook-leren]: https://support.google.com/gemininotebook/answer/16958963?hl=en
[notebook-training]: https://support.google.com/notebooklm/answer/16164461?hl=en
[notebook-toegang]: https://support.google.com/gemininotebook/answer/16164461?hl=en
[notebook-privacy]: https://support.google.com/gemininotebook/answer/17004255?hl=nl
[notebook-chat]: https://support.google.com/gemininotebook/answer/16179559?hl=nl
[notebook-delen]: https://support.google.com/gemininotebook/answer/16206563?hl=nl
[copilot-beheer]: https://learn.microsoft.com/en-us/copilot/manage
[copilot-opladen]: https://support.microsoft.com/en-us/microsoft-365-copilot/file-upload-in-microsoft-copilot
[copilot-leren]: https://support.microsoft.com/en-us/education/copilot/study-learn-agent
[copilot-leren-gebruik]: https://support.microsoft.com/nl-nl/education/copilot/using-study-learn-agent
[copilot-overzicht]: https://learn.microsoft.com/en-us/copilot/overview
[copilot-agent]: https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/agent-builder-add-knowledge
[copilot-vereisten]: https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/prerequisites
[copilot-faq]: https://learn.microsoft.com/en-us/copilot/faq
[copilot-training]: https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection

## 8. Techniek

| Onderdeel | Keuze |
|---|---|
| Framework | Astro 6, statische output |
| Inhoud | MDX in de contentcollectie `modules`, schema met zod en `.strict()` |
| Interactie | Een Astro-clientscript voor de stappenspeler, React-islands voor de vraagtypes (§ 12) |
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
  components/inhoud/         prompts en gesprekken
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
AI-barometer: het Arcadia-logo, donkergroen op gebroken wit, het
Arcadia-groen als accent. De tokens, de lettertypes, het logo en de visuele
regels komen uit het design system *Arcadia AI-modules*
(<https://claude.ai/artifact/5FkFKzAp7bfBCU1wXJ8kFv>). De site neemt daaruit
alleen de looks over; de werking van de site en de beslissingen in deze
briefing blijven gelden.

- **Tokens** in `src/styles/tokens.css`, met de namen van het design system.
  Componenten gebruiken uitsluitend `var(--…)`.
- **Lettertypes:** Figtree voor alles, JetBrains Mono voor prompts en
  AI-uitvoer. Beide zelf gehost via fontsource, zodat er bij het laden geen
  verzoek naar Google gaat.
- **Alleen het lichte thema.** Het design system heeft ook een donker thema;
  dat is iets voor later.
- De visuele regels, de tokens met hun gebruik en hoe je een nieuwe versie
  van het design system overneemt, staan in `docs/DESIGN.md`.

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

- **Deadline.** Tegen welk uur dient de leerling het eindformulier in?
  Zodra het bekend is, komt het in `src/config/smartschool.ts`
  (`eindformulierUur`); tot dan zegt de startpagina dat het uur nog volgt.
- **Referentiekader.** De vier doelen of de zes doelstellingen van
  Kenniscentrum Digisprong?

## 12. Componenten

Dit patroon ontstond met de stappenspeler. De vraagtypes en de samenvatting
volgen het.

### Stappen schrijven

```mdx
<Stap titel="Wat is een prompt?">
Tekst, een beeld of een vraagcomponent.
</Stap>
```

- Een module bestaat volledig uit `<Stap>`-blokken; tekst buiten een stap
  hoort er niet. Een beschikbare module zonder `<Stap>` laat de build falen.
- De auteur schrijft **geen import-regel**. De route
  `src/pages/modules/[id].astro` geeft de componenten mee via
  `<Content components={…} />`; een nieuw component komt in die lijst.
- `titel` is verplicht en wordt de kop van de stap. Binnen een stap werkt
  Markdown zoals overal: alinea's, lijsten, vet. Een gewoon `<textarea>`
  krijgt een eenvoudige standaardopmaak.
- Een link naar een andere site opent vanzelf in een nieuw tabblad, met een
  icoon achter de linktekst: de auteur schrijft gewone Markdown, zoals
  `[chatgpt.com](https://chatgpt.com)`.

### De speler

- De stappen staan statisch in de HTML als `<section>`. Een klein clientscript
  in `src/components/stappen/StepPlayer.astro` toont er één tegelijk en regelt
  de navigatie, de voortgang en het bewaren.
- Navigatie met *Vorige* en *Volgende*, of met de pijltjestoetsen links en
  rechts. De pijltjestoetsen doen niets terwijl de focus in een `input`,
  `textarea`, `select` of bewerkbaar veld staat, als er een modifiertoets
  ingedrukt is, of als een component de toets zelf afhandelt.
- De stap staat in de URL als `#stap-n` en in `localStorage`. In een module
  met takken is `n` de positie in de route van de leerling (zie *Keuzes en
  takken* hieronder). Bij het laden geldt eerst een geldige `#stap-n` in de
  URL, dan `localStorage`, anders stap 1. Een te hoge of te lage stap valt
  terug op de dichtstbijzijnde geldige. De URL wordt bijgewerkt zonder
  nieuwe stap in de geschiedenis: de terugknop van de browser verlaat de
  module, *Vorige* gaat een stap terug.
- Op een stap met een `<Keuze>` die nog open is, zijn *Volgende* en de
  pijltjestoets naar rechts uitgeschakeld. Een korte zin naast de knop zegt
  waarom (*Kies eerst een antwoord om verder te gaan.*), in een
  `aria-live`-gebied.
- Op de laatste stap van de route staat in plaats van *Volgende* een link
  *Naar de startpagina*, naar `/ai-leerlijn/` in hetzelfde tabblad: een
  primaire knop met een huisje, op dezelfde plek. De startpagina toont stap
  3, het eindformulier (§ 4). Zolang de vertakkende keuze open is, is de
  route niet volledig en verschijnt de link niet. De pijltjestoets naar
  rechts doet op de laatste stap niets: een toets verlaat de module niet.
- Bij het wisselen gaat de focus naar de kop van de nieuwe stap. "Stap n van
  m" staat als tekst in een `aria-live`-gebied, zodat een schermlezer de
  voortgang voorleest.
- *Opnieuw beginnen* vraagt eerst een bevestiging. Daarna wist het alle
  sleutels van de module en herlaadt het de pagina op stap 1.
- Zonder JavaScript staan alle stappen als kaarten onder elkaar.

### Hoogte: 1366 × 640

- Het kleinste doel is een laptop van 1366 × 768. Na de browserbalken blijft
  ongeveer **1366 × 640** zichtbaar; daarop wordt ontworpen en getest.
- Met JavaScript vult de speler de ruimte onder de header: de voortgang, en
  daaronder de stapkaart met de navigatie onderaan. De kaart is hoogstens
  `--step-max-h` (520 px) hoog. Op 1366 × 640 is ze 509 px hoog, en heeft de
  inhoud van een stap, kop inbegrepen, **390 px** hoogte op ruim 1000 px
  breedte.
- Op een lager scherm krimpt de kaart en blijft de navigatie zichtbaar; wat
  dan niet past, scrolt binnen de kaart. Dat is een vangnet: wat op
  1366 × 640 niet in de kaart past, wordt een extra stap.

### Lokaal bewaren

- Elke sleutel in `localStorage` heeft de vorm
  `ai-leerlijn:<module-id>:<sleutel>`. De speler bewaart de stap onder
  `stap`, en onder `start` het moment waarop hij de eerste stap van de
  module toonde (ISO 8601). `start` wordt één keer gezet, als de sleutel er
  nog niet is: herladen of later terugkomen verandert het niet. Het is de
  eerste regel van de tijdlijn in de pdf (zie *De samenvatting*). Een vraag,
  en een `<Prompt>` met invulvelden, bewaart haar antwoord onder
  `vraag:<id>`, met de `id` die de auteur schrijft (zie
  *Antwoorden bewaren* hieronder). Een `<Keuze>` bewaart de gekozen optie
  onder `keuze:<naam>` (zie *Keuzes en takken*). `<Confetti />` bewaart
  onder `confetti` dat ze speelde (zie *Confetti*).
- Eén sleutel hoort bij de hele site: `ai-leerlijn:school`, het platform van
  de school van de leerling (zie *Een link per school*). Ze gaat via
  `readSchool` en `writeSchool` in `storage.ts`. Een waarde die geen school
  is, telt als geen keuze. *Opnieuw beginnen* wist ze niet.
- Alle toegang gaat via `src/components/stappen/storage.ts` (`readStored`,
  `writeStored`, `clearModule`, `moduleIdOf`). Elke toegang zit in een
  try/catch, zodat de site ook werkt als opslag geblokkeerd is, zoals in een
  privévenster. De voortgang wordt dan gewoon niet bewaard. Eén uitzondering:
  het inline script dat vóór de eerste weergave de gekozen tool leest (zie
  *Instructies per tool*). Het kan `storage.ts` niet importeren; de sleutel
  berekent de build wel met `storageKey`.
- *Opnieuw beginnen* wist alle sleutels met het prefix van die module, en
  alleen die.
- Waarden zijn tekst. Een component dat meer bewaart, gebruikt
  `JSON.stringify`.

### Een component binnen een stap

- Een vraagtype is een React-island binnen een `<Stap>`, volgens het patroon
  van `cursus-esthetica` (`src/components/interactive/`): een
  React-component met een CSS-module die alleen tokens gebruikt, en een
  Astro-omhulsel dat de `client:`-directive zet. Het omhulsel komt in de
  componentenlijst van de route; de auteur schrijft dus geen import en geen
  directive.
- Gebruik `client:visible`: een island in een verborgen stap hydrateert pas
  als die stap getoond wordt, en leest dan zijn antwoord uit `localStorage`.
- Invoer van vóór de hydratatie gaat niet verloren. Is er nog niets bewaard,
  dan neemt een component na de hydratatie over wat al in het veld staat: een
  aangevinkt keuzerondje of getypte tekst, en bewaart het meteen. Die velden
  hebben `autocomplete="off"`, zodat de browser bij *Terug* of herladen geen
  oude waarde terugzet die het component dan als nieuwe invoer zou bewaren.
- Een component vindt de id van zijn module met `moduleIdOf(element)`.
- Een component dat zelf de pijltjestoetsen gebruikt, roept
  `event.preventDefault()` aan; dan wisselt de speler niet van stap.
- Een component past, samen met de rest van de stap, in de kaart op
  1366 × 640.
- Een React-island krijgt zijn MDX-kinderen als afgewerkte HTML, niet als
  elementen. Gewone opgemaakte tekst, zoals het voorbeeldantwoord van
  `<DenkEerst>`, gaat zo als kinderen naar de island. Moet een component zijn
  kinderen als gegevens lezen, zoals de opties van `<Meerkeuze>`, dan rendert
  het Astro-omhulsel ze met `Astro.slots.render` en leest het ze terug
  (`src/components/vragen/authoring.ts`). Eén uitzondering: de voorbeeldstapel
  van `<Flashcards>` leest de build uit de bron (`checks.ts`). Markdown zou van
  `2*3 | 3*2` cursief maken en de sterretjes opeten.
- Een vergissing van de auteur laat de build falen met een duidelijke
  melding, in plaats van een kapotte vraag bij de leerling te zetten: een
  ontbrekende of dubbele `id`, een `<Meerkeuze>` zonder juiste optie, een
  optie zonder feedback, tekst tussen de tags van `<Reflectie>`,
  `<Samenvatting />` of `<Confetti />`, een `<Samenvatting />` buiten de
  laatste stap, meer dan één `<Samenvatting />` of `<Confetti />` in een
  module, een link in `src/config/smartschool.ts` die geen geldig
  `https://`-adres is, een fout in het sjabloon van een `<SchoolLink>`, een
  fout in een `<Keuze>`, in de takken (zie
  *Keuzes en takken*), in een `<Tool>` (zie *Instructies per tool*), in
  een `<Prompt>`, `<Chat>` of `<Keuzechat>` (zie *Prompts en gesprekken*), in een `<Hulp>`
  (zie *Hulp in een stap*) of in een `<Meting>`, `<Flashcards>` of
  `<Meeneemkaart>` (zie *Vraagtypes*).

### Vraagtypes

De vraagtypes staan in `src/components/vragen/`. Elke vraag heeft een
verplichte `id`: kleine letters, cijfers en koppeltekens, uniek binnen de
module, bijvoorbeeld `id="prompt-leren"`. Onder die `id` wordt het antwoord
bewaard. Een volgnummer zou verschuiven als er een vraag bijkomt; een `id`
niet. Wijzig de `id` van een gepubliceerde vraag dus niet: wie al antwoordde,
verliest dan dat antwoord.

**Meerkeuze met directe feedback**

```mdx
<Meerkeuze id="ai-herkennen" vraag="Welke van deze toepassingen gebruiken AI?">
  <Optie juist feedback="Spotify leert uit wat jij beluistert.">De aanbevelingen in Spotify</Optie>
  <Optie feedback="Een rekenmachine volgt vaste regels.">Een rekenmachine</Optie>
</Meerkeuze>
```

- `vraag` is gewone tekst. Elke `<Optie>` heeft haar tekst tussen de tags
  (kort, op één regel; **vet** en *cursief* mogen) en een verplichte
  `feedback`: ook een fout antwoord legt uit waarom. `juist` markeert een
  juist antwoord. Minstens twee opties en minstens één juiste; meer juiste
  opties mag.
- Een optie aanklikken toont meteen ✓ *Juist* of ✕ *Niet juist*, met de
  feedback van die optie erbij. Die feedback blijft staan. Na een fout
  antwoord kiest de leerling opnieuw. Zijn er meer juiste opties, dan zegt de
  vraag hoeveel, en telt ze mee tot de leerling ze allemaal vond.
- Een schermlezer leest het oordeel en de feedback voor (`role="status"`).
- De opties staan in twee kolommen. Zo passen vier opties met hun feedback,
  ook als de leerling ze alle vier aanklikte, samen met de kop van de stap op
  1366 × 640. Houd een optie op één regel en de feedback op één of twee
  zinnen.
- Zonder JavaScript staan de vraag en de opties er, zonder feedback.

**Eerst denken, dan tonen**

```mdx
<DenkEerst id="prompt-leren" vraag="Schrijf een prompt waarmee een chatbot je helpt leren voor een toets.">
Het voorbeeldantwoord, in gewone Markdown: **vet**, *cursief*, alinea's en
lijsten.
</DenkEerst>
```

- Links schrijft de leerling in een tekstveld, rechts verschijnt het
  voorbeeldantwoord. De knop *Toon voorbeeldantwoord* werkt pas na
  **3 woorden**; de tekst naast de knop zegt hoeveel woorden er nog nodig
  zijn. Een woord telt als het minstens één letter of cijfer bevat.
- Na *Toon* gaat de focus naar het voorbeeldantwoord, zodat een schermlezer
  het voorleest. De leerling kan het eigen antwoord daarna nog aanpassen.
- Het voorbeeldantwoord staat op de halve breedte van de stap. Bij een vraag
  van één regel passen er ongeveer acht regels tekst; bij een vraag van twee
  regels zeven. Wat langer is, scrolt binnen de kaart.
- Zonder JavaScript staat het voorbeeldantwoord meteen naast het tekstveld.

**Een korte reflectie**

```mdx
<Reflectie id="wat-geleerd" vraag="Wat weet je nu over chatbots dat je eerst nog niet wist?" />
```

- Een vraag en een tekstveld, met een echt `<label>`. Er is geen
  voorbeeldantwoord en geen minimum: wat de leerling schrijft, wordt bij elke
  wijziging bewaard en komt terug in de samenvatting.
- `vraag` is gewone tekst. De tag sluit zichzelf (`/>`); tekst tussen de
  tags laat de build falen, want die zou stil verdwijnen.
- Het tekstveld is zes regels hoog en zo breed als een regel lopende tekst.
  Een korte inleidende zin erboven past op 1366 × 640; wat de leerling
  langer schrijft, scrolt binnen het veld.

**Score en zekerheid**

```mdx
<Meting id="quiz-start" vraag="Hoeveel van de vijf had je juist?" />
<Meting id="quiz-einde" vraag="Hoeveel van de vijf had je nu juist?" vergelijk="quiz-start" />
```

Na een quiz in de chat vult de leerling zijn score in, en hoe zeker die is dat
die het zonder hulp kan. Een vlotte uitleg van AI voelt als begrijpen; zekerheid
naast score maakt dat verschil zichtbaar.

- `vraag` is gewone tekst, de vraag boven de score. `max` is de hoogste score,
  standaard 5, in de vorm `max={10}`. De tag sluit zichzelf (`/>`). Wijzig de
  `max` van een gepubliceerde meting niet: een score die op een andere schaal
  bewaard is, telt als niet ingevuld.
- **Vorm.** Twee rijen knoppen: de score van 0 tot `max`, en *Hoe zeker ben je
  dat je dit zonder hulp kunt?* van 1 tot 5, met aan de uiteinden *Helemaal niet
  zeker* en *Heel zeker*. Een rij knoppen en geen schuifregelaar: een schuif
  heeft altijd een waarde, dus dan is niet te zien of de leerling al antwoordde.
  De knoppen zijn echte `<input type="radio">` van 44 × 44 px, rand
  `line-strong`, `radius-md`; gekozen is `primary` met `on-primary`. Er is geen
  oordeel en er zijn geen barometerkleuren: de site zegt niet of een score goed
  is.
- **Toetsenbord.** Elke rij is een radiogroep in een `<fieldset>`: Tab gaat naar
  de groep, de pijltjestoetsen kiezen. Ze wisselen niet van stap, want de speler
  laat de pijltjestoetsen met rust in een `input`. Een schermlezer hoort bij 1 en
  5 ook de betekenis van dat uiteinde.
- **De vergelijking.** Met `vergelijk` staat er, zodra beide rijen ingevuld zijn,
  een zin onder (`role="status"`, dus voorgelezen): *Bij de start: 2 van 5,
  zekerheid 4 van 5. Nu: 4 van 5, zekerheid 3 van 5.* Is de andere meting leeg
  of half ingevuld, dan staat daar: *Vul ook je meting in „Hoe ging de
  startquiz?" in, dan zie je hier de vergelijking. Ga naar stap 23*, met een
  echte link (`#stap-n`, de positie in de route, met `routeOf`). De meting leest
  die andere meting telkens opnieuw wanneer haar stap zichtbaar wordt (een
  `IntersectionObserver`, zoals de samenvatting), na elke keuze en na een klik in
  een meting op dezelfde stap. Zo kloppen de waarden en het stapnummer ook na een
  wijziging op een andere stap of een andere tak.
- Half ingevuld wordt ook bewaard (zie *Antwoorden bewaren*). Een klik vóór de
  hydratatie gaat niet verloren en is nieuwer dan wat bewaard is, dus ze wint van
  een bewaarde waarde in dezelfde rij; de andere rij blijft.
- Zonder JavaScript staan de vraag en de knoppen er, zonder vergelijking en
  zonder bewaren.

**Hoogte op 1366 × 640** (gemeten in `voorbeeld`, `scrollHeight` van de stap,
van de 390 px): kop, één regel tekst en een meting 268 px, ingevuld of niet. Met
de vergelijking of de link eronder 322 px. Met een vraag van twee regels en
`max={10}` 296 px, met de vergelijking 350 px, en met een stap met een lange titel
in de link, zodat de zin twee regels neemt, 372 px. De knoppen staan op één regel
tot `max={18}`; meer breekt af op een volgende regel, en dat past niet altijd meer.

**Buildchecks**, elk met een duidelijke melding. `checks.ts` weigert een
`vergelijk` die niet bestaat of geen `<Meting>` is, die later in de module staat,
die de meting zelf is, die in een andere tak staat dan de meting, of die geen
tekst is. `<Meting>` zelf weigert een ontbrekende, ongeldige of dubbele `id`, een
lege `vraag`, een `max` die geen geheel getal van 1 of meer is, en tekst tussen de
tags. Ze vallen pas als de pagina gebouwd wordt: test ze in een module met `status:
beschikbaar`.

**Oefenen met kaarten**

```mdx
<Flashcards id="kaarten" vraag="Oefen met je eigen kaarten">
Wat is de oppervlakte van een cirkel? | pi × r²
Wat betekent 'nevertheless'? | toch, niettemin
</Flashcards>
```

De leerling laat een AI kaarten maken, plakt ze, kijkt ze na en oefent: eerst zelf
antwoorden, dan omdraaien, dan eerlijk scoren. Zo traint die het ophalen uit het
geheugen, met elke tool, en dwingt de site af wat geen enkele tool afdwingt: eerst
jij, dan het antwoord. De prompt staat in de module, in een `<Prompt>`, bijvoorbeeld:
`Maak 10 flashcards over [onderwerp]. Eén kaart per regel: vraag | antwoord. Gewone
tekst, geen tabel en geen LaTeX. Schrijf formules zo: wortel(x), x^2.`

- `vraag` is gewone tekst. De regels tussen de tags zijn optioneel: een
  voorbeeldstapel, voor wie geen AI-toegang heeft. Zonder voorbeeldstapel mag de tag
  zichzelf sluiten (`/>`). De voorbeeldstapel gaat door MDX: `<` en `{` mogen er niet
  in staan.
- **Plakken.** Een tekstveld, met ernaast het aantal kaarten, de zin *Kijk je kaarten
  na in je bron voor je begint.*, en de regels die niet gelezen konden worden. Enter
  maakt er gewoon een nieuwe regel. Is het veld leeg en is er een voorbeeldstapel, dan
  staat er ook *Oefen met de voorbeeldstapel*: die knop vult het veld, en daarna loopt
  alles gewoon verder. Hij verdwijnt zodra er iets in het veld staat, zodat hij geen
  eigen stapel overschrijft.
- **De parser** (`parseDeck` in `src/components/vragen/flashcards.ts`) leest
  `voorkant | achterkant` en ruimt op wat een AI er vaak van maakt:
  - opsommingstekens (`-`, `*`, `•`) en nummering (`1.`, `1)`) aan het begin, `**` en
    `` ` ``. Een `-`, `*` of nummer vraagt een spatie erachter, dus `-5 + 3` en
    `1.5 + 2` blijven heel, en `2*3` ook. `**` tussen twee waarden is een macht:
    `2**3` blijft heel;
  - hij slaat zonder melding over: de scheidingsregel van een Markdown-tabel, de rij
    vlak boven een scheidingsregel, een regel die letterlijk `vraag | antwoord` of
    `voorkant | achterkant` is (hoofdletterongevoelig), codeomheiningen en lege regels;
  - een Markdown-tabelrij `| a | b |` wordt `a` / `b`;
  - een regel met drie kolommen, met een lege kant of zonder `|` komt onder *2 regels
    begreep ik niet*, met de regels erbij en de zin dat een inleidende zin van de AI
    genegeerd mag worden. Ook een voorkant als `|-3|`: de streep is de scheiding.
  - Meer dan 30 kaarten (`MAX_CARDS`): de eerste 30 blijven, en een melding zegt
    hoeveel er wegvallen.
- **Oefenen.** Drie kolommen die blijven staan als de kaart omdraait: de voorkant, het
  eigen antwoord, en de achterkant. *Wist ik* en *Nog niet* zijn even zwaar: de site
  duwt niet naar een van beide. *Nog niet* zet de kaart achteraan. Elke ronde staat in
  een andere volgorde, ook bij *Opnieuw oefenen*; de wachtrij wordt bewaard, dus na
  herladen is de volgorde dezelfde.
- **Het antwoordveld** is een `<textarea>` van twee regels. Enter draait om,
  Shift+Enter is een nieuwe regel, een ingehouden Enter (`event.repeat`) telt niet.
  Eén niet-witruimte-teken volstaat. *Draai om* doet hetzelfde en werkt pas als er iets
  getypt is.
- **De focus** beweegt alleen na een handeling: na het omdraaien naar het antwoordvlak
  (`tabindex="-1"`; zijn naam is het eigen antwoord en de achterkant, dus die worden
  voorgelezen), niet naar *Wist ik*, zodat een tweede Enter niet per ongeluk scoort. Na
  scoren naar het antwoordveld van de volgende kaart, op het einde naar de kop van het
  overzicht. Terugkomen op de stap en herladen verplaatsen de focus niet. Met alleen
  het toetsenbord: typen, Enter, Tab naar *Wist ik* (nog een keer Tab voor *Nog
  niet*), Enter. De pijltjestoetsen wisselen niet van stap in een veld.
- **Einde.** Als elke kaart op *Wist ik* staat: hoeveel meteen goed waren, de
  moeilijkste kaarten (hoogstens 3, die met het vaakst *Nog niet*, minstens één keer;
  geen enkele: *geen*), *Opnieuw oefenen*, *Stapel aanpassen*, en een kleine zin dat de
  stapel in deze browser blijft en *Opnieuw beginnen* ze ook wist.
- *Opnieuw oefenen* en *Stapel aanpassen* staan ook onder elke kaart. *Stapel
  aanpassen* gaat terug naar het plakscherm met de huidige tekst. Zonder wijziging
  gaat *Verder oefenen* door waar de leerling was. Een stapel met andere kaarten
  begint de oefening opnieuw, en de oude score telt dan niet meer: die gaat over een
  andere stapel. Dat geldt vanaf de wijziging, maar overschreven wordt ze pas bij het
  beginnen: wie de wijziging ongedaan maakt, is niets kwijt.
- **Herladen.** Het getypte antwoord en de omgedraaide stand worden bewaard, maar komen
  niet in de pdf. Tekst die vóór de hydratatie getypt is, gaat niet verloren, ook niet
  bij een bewaarde stapel: ze is nieuwer, en de leerling staat dan op het plakscherm,
  waar de oude oefening nog terugkomt zodra de tekst weer dezelfde is. Een klik op de
  voorbeeldknop vóór de hydratatie onthoudt een klein inline script in
  `Flashcards.astro`, want een knop bewaart niets in de pagina, zoals een keuzerondje
  dat wel doet; ze vult alleen een leeg veld.
- **Vorm.** Geen barometerkleuren, alleen tokens. De kolommen zijn kaders op
  `surface-sunken`; zolang er niet omgedraaid is, is de derde een gestippeld kader, zoals
  bij `<DenkEerst>`. Geen kaartflip: wat na een handeling verschijnt, fadet (`appear`,
  `motion-base`).
- Zonder JavaScript staan alleen de vraag en een zin dat dit JavaScript nodig heeft.

**Hoogte op 1366 × 640** (gemeten in `voorbeeld`, `scrollHeight` van de stap, van de
390 px). De drie schermen zijn even hoog, want de kolommen hebben een vaste hoogte
(11rem, dus 176 px): met één regel tekst erboven **360 px**, in elke toestand: plakken,
ook met 40 onleesbare regels; voorkant en omgedraaid, ook met een kaart van 600 tekens
aan beide kanten; einde, ook met drie lange kaarten. Zonder tekst erboven 318 px. Met
een vraag van twee regels en één regel tekst 388 px: meer past er niet boven. In een kolom
passen vijf regels van ± 38 tekens; wat langer is, scrolt binnen die kolom. De lijst
*begreep ik niet* en de moeilijkste kaarten scrollen binnen hun eigen kader. De kaart
scrolt nooit.

**Buildchecks**, elk met een duidelijke melding. `checks.ts` weigert in de
voorbeeldstapel een regel die de parser niet begrijpt (zonder `|`, met drie kolommen,
met een lege kant), meer dan 30 kaarten, tekst zonder één kaart, en een `id` die geen
tekst is. `<Flashcards>` zelf weigert een ontbrekende, ongeldige of dubbele `id` en een
lege `vraag`. Ze vallen pas als de pagina gebouwd wordt: test ze in een module met
`status: beschikbaar`.

**Een kaart om mee te nemen**

```mdx
<Stap titel="Jouw kaart: als je vastloopt">
<Meeneemkaart id="mijn-kaart" vraag="Mijn kaart: als ik vastloop">
  <Rij situatie="Ik snap het niet">Leg [begrip] eenvoudiger uit, met een voorbeeld uit het dagelijks leven.</Rij>
  <Rij situatie="Ik zit vast">Geef me één hint, niet de oplossing.</Rij>
  <Rij situatie="Ik kom fout uit">Dit is mijn oplossing: […] Waar gaat het fout, en waarom?</Rij>
  <Rij situatie="Ik wil meer oefenen">Maak drie nieuwe oefeningen. Geef de oplossingen pas als ik erom vraag.</Rij>
  <Rij situatie="Ik moet het onthouden">Overhoor me over [onderwerp], één vraag per keer.</Rij>
</Meeneemkaart>
</Stap>
```

De leerling neemt het belangrijkste van de module mee: zinnen die meteen bruikbaar zijn
als die vastloopt. Blanco een prompt schrijven is voor de tweede graad te veel gevraagd,
en een `<Prompt>` met `velden` kan geen vooraf ingevulde velden tonen. De kaart groeit
niet tijdens de module: het is één slotstap.

- `vraag` is gewone tekst. De tekst tussen de tags van een `<Rij>` is de zin waarmee de
  leerling begint, in gewone tekst: hij komt in een tekstveld. `[begrip]` en `[…]` blijven
  staan zoals ze er staan, zonder eigen opmaak, ook in de pdf en op het klembord. Zoals
  overal in Markdown wordt `...` een `…`, en worden rechte aanhalingstekens gekruld.
- **Vorm.** Per rij links de situatie, een echt `<label>` in `brand-text` (groen is de
  leerling), en rechts een tekstveld in de stijl `small`, op `surface-sunken`, samen
  52rem breed. Een veld is één regel die meegroeit tot drie regels en daarna scrolt, zoals
  bij een `<Prompt>` met `velden`. Enter maakt een nieuwe regel, zoals in elk tekstveld;
  ze blijft staan op het klembord en in de pdf. De velden hebben `autocomplete="off"`,
  zodat de browser na *Opnieuw beginnen* geen oude tekst terugzet. Een schermlezer leest de
  situatie als naam van het veld en `vraag` als naam van de groep. De pijltjestoetsen
  wisselen niet van stap in een veld.
- **Bewaren.** De kaart bewaart zichzelf, met de zinnen van de auteur, zodra haar stap
  getoond wordt. Daarna bewaart elke toets haar rij. `firstAt` is dus het moment waarop de
  stap getoond werd. Tot het script van de speler gelopen heeft, staan alle stappen op het
  scherm: het script in `Meeneemkaart.astro` begint pas te kijken na `DOMContentLoaded`,
  zoals de confetti. Een stap buiten de route van de leerling wordt nooit getoond, en
  bewaart dus niets.
- **Vóór de hydratatie.** React zet bij het hydrateren de tekst van de server terug in een
  vooraf ingevuld veld. Daarom bewaart dat script, en niet de island, wat de leerling typt:
  alleen de rij waarin getypt wordt, want de andere velden tonen dan nog de zinnen van de
  auteur. De island leest het daarna terug.
- **Kopiëren.** *Kopieer mijn kaart* zet op het klembord: `vraag`, een lege regel, en dan
  per rij `situatie: zin`. Een lege rij valt weg. Daarna staat naast de knop ✓ *Gekopieerd*
  (`role="status"`), vier seconden, of tot de leerling verder typt. **Als het kopiëren
  mislukt**, ligt de kaart als één geselecteerde tekst over de rijen, met de vraag om
  Ctrl+C te gebruiken: losse tekstvelden kan je niet samen selecteren. Ctrl+C kopieert de
  hele kaart en geeft dezelfde bevestiging. Wie weggaat met Tab, klikt of Escape drukt,
  krijgt de rijen terug. De terugval neemt geen plaats in.
- **Een kaart die veranderde na publicatie.** Bewaarde rijen worden op hun situatie aan
  de kaart gekoppeld. Een nieuwe situatie krijgt de zin van de auteur, een verdwenen
  situatie valt weg, en een hernoemde situatie telt als verdwenen en nieuw. De volgende
  toets bewaart de rijen van nu. Een waarde die geen geldig antwoord is, telt als niet
  bewaard.
- Zonder JavaScript staan de situaties met de zinnen van de auteur als gewone tekst, zonder
  velden en zonder knop.

**Hoogte op 1366 × 640** (gemeten in `voorbeeld`, `scrollHeight` van de stap, van de
390 px). Een rij van één regel is 32 px, van twee regels 54 px, van drie 76 px. De knop staat
onderaan. Vers, met vijf rijen van één regel: **322 px**. Met twee rijen van twee regels:
**366 px**. Met drie rijen van twee regels: 388 px, en daar houdt het op. Een veld neemt
± 90 tekens per regel. Twee rijen van drie regels zijn 410 px: dan scrolt de kaart, als
vangnet, en met alle vijf de rijen op drie regels is dat 542 px. Met één regel tekst boven
de kaart: 364 px, dus ruimte voor één rij van twee regels.

**Buildchecks**, elk met een duidelijke melding. `<Meeneemkaart>` weigert een ontbrekende,
ongeldige of dubbele `id`, een lege `vraag`, geen enkele `<Rij>`, andere inhoud dan `<Rij>`,
en twee rijen met dezelfde `situatie`. `<Rij>` weigert een ontbrekende of lege `situatie`,
geen tekst tussen de tags, en tekst waar Markdown opmaak van maakte (`**`, `2*3*4`, een
link): die zou in een tekstveld stil haar sterretjes of adres verliezen. Een `<Rij>` buiten
een `<Meeneemkaart>` weigert `checks.ts`. Ze vallen pas als de pagina gebouwd wordt: test ze
in een module met `status: beschikbaar`.

### Antwoorden bewaren

Dit is de afspraak waarop de samenvatting aan het einde van een module
steunt.

- Elk antwoord staat als JSON onder `ai-leerlijn:<module-id>:vraag:<id>`.
  Lees en schrijf het alleen met `readAnswer` en `writeAnswer` uit
  `src/components/vragen/answers.ts`. `readAnswer` geeft `null` als er
  niets bewaard is, of als de waarde geen geldig antwoord is.
- `<Meerkeuze>` bewaart
  `{ "kind": "multiple-choice", "question": "…", "chosen": [2, 0] }`: de
  gekozen opties als volgnummer in de volgorde van de auteur, in de volgorde
  waarin de leerling ze koos.
- `<DenkEerst>` bewaart
  `{ "kind": "think-first", "question": "…", "answer": "…", "shown": true }`:
  de vraag zoals de leerling ze zag, het eigen antwoord, en of het
  voorbeeldantwoord getoond werd.
- `<Reflectie>` bewaart
  `{ "kind": "reflection", "question": "…", "answer": "…" }`: de vraag zoals
  de leerling ze zag en het antwoord.
- `<Prompt>` met `velden` bewaart
  `{ "kind": "prompt-fields", "question": "…", "fields": { "begrip": "…", "mijn uitleg": "…" } }`:
  de titel van de stap zoals de leerling ze zag, en per veld, onder de naam
  van zijn invulplaats, wat de leerling schreef, zoals getypt (zie *Prompts
  en gesprekken*).
- `<Meting>` bewaart
  `{ "kind": "measure", "question": "…", "score": 3, "max": 5, "confidence": 4 }`,
  vanaf de eerste klik: `score` en `confidence` zijn `null` zolang die rij open
  is. `readAnswer` weigert een `score` of `confidence` die geen geheel getal
  binnen het bereik is (0 tot `max`, 1 tot 5) en niet `null`, en een `max` die
  geen geheel getal van 1 of meer is. Een score van 0 is een antwoord.
- `<Keuzechat>` bewaart
  `{ "kind": "choice-chat", "question": "…", "chosen": [[1, 0], [0]] }`: de
  titel van de stap zoals de leerling ze zag, en per ronde de gekozen berichten
  als volgnummer in de volgorde van de auteur, in de volgorde waarin de leerling
  ze koos. `readAnswer` weigert een `chosen` die geen lijst van lijsten van
  gehele getallen is. Of de nummers nog bij de rondes passen, kijkt het component
  zelf na (zie *Prompts en gesprekken*).
- `<Flashcards>` bewaart
  `{ "kind": "flashcards", "question": "…", "text": "…", "screen": "practice", "practised": "…", "round": { "order": [2, 0, 1], "queue": [0, 1], "misses": [1, 0, 0], "typed": "…", "flipped": false }, "last": null, "scored": true }`:
  de tekst in het veld, het scherm (`paste`, `practice` of `done`), en de tekst waarmee
  geoefend is. `round` is de lopende ronde: de volgorde waarin ze begon, de kaarten die
  nog moeten (de eerste staat op het scherm), per kaart hoe vaak *Nog niet*, het getypte
  antwoord en of de kaart omgedraaid is. `last` is `misses` van de laatste afgewerkte
  ronde, `scored` of er al een kaart gescoord is. De kaarten zelf staan er niet in: ze
  volgen uit `text`. `readAnswer` weigert een andere vorm. Of een ronde nog bij de kaarten
  past, kijkt `viewOf` in `flashcards.ts` na: wat niet past, telt als niet bewaard, en
  crasht niet.
- `<Meeneemkaart>` bewaart
  `{ "kind": "takeaway-card", "question": "…", "rows": [{ "situation": "Ik zit vast", "text": "…" }] }`,
  zodra haar stap getoond wordt: per rij de situatie en de zin zoals ze nu staat, die van
  de auteur of die van de leerling. `""` is een rij die de leerling leegmaakte.
  `readAnswer` weigert een andere vorm. Of de rijen nog bij de kaart passen, regelt
  `readTakeawayRows` in `answers.ts` (zie *Vraagtypes*).
- Elk antwoord, van elk `kind`, heeft ook twee tijden:
  `"firstAt": "2026-11-10T12:05:41.000Z"` en `"lastAt": "…"` (ISO 8601,
  `toISOString`): wanneer de leerling het antwoord voor het eerst en voor
  het laatst bewaarde. `writeAnswer` zet ze, niet de componenten: het leest
  het bewaarde antwoord, neemt `firstAt` daarvan over, of zet het op nu als
  er nog geen is, en zet `lastAt` op nu. Zo blijft `firstAt` het moment
  waarop de leerling aan de vraag begon, ook al bewaart `<Reflectie>` bij
  elke toets. Een component geeft `writeAnswer` dus alleen de inhoud.
- Een antwoord zonder tijden (bewaard vóór de site ze bijhield) is geldig.
  Een tijd die geen geldige ISO 8601-tijd is (`"firstAt": "gisteren"`)
  telt als geen tijd: `readAnswer` laat ze weg, het antwoord blijft.
- Een nieuw vraagtype krijgt een eigen `kind`. Het komt bij `AnswerContent`
  in `answers.ts`, met een eigen controle in `isStoredAnswer`, zodat
  `readAnswer` een onvolledige waarde weigert. De tijden krijgt het vanzelf.
- In de statische HTML draagt het buitenste element van elke vraag
  `data-question="<kind>"` (`multiple-choice`, `think-first`, `reflection`,
  `prompt-fields`, `measure`, `choice-chat`, `flashcards` of `takeaway-card`) en
  `data-question-id="<id>"`. Een
  vraag die in de samenvatting komt, draagt ook `data-question-text` met de vraag
  zoals ze nu in de module staat; een `choice-chat` draagt daar de titel van haar
  stap, die de build leest (`checks.ts`, via `Astro.locals`). Bij een prompt met velden is dat element het kader
  met de velden, en draagt het ook `data-prompt-fields`: per veld de naam
  en het label, in de volgorde van `velden`, als JSON
  (`[["begrip", "Begrip"], …]`). Een meting draagt ook `data-measure-max`, de
  hoogste score, en een meeneemkaart `data-takeaway-rows`, de rijen zoals de auteur
  ze schreef, als JSON. Dat geldt ook voor vragen in verborgen stappen die
  nog niet gehydrateerd zijn. De samenvatting overloopt die elementen in de
  volgorde van het document, dus van de module, en leest per `id` het
  antwoord met `readAnswer`. Ze heeft de vraag-islands zelf niet nodig.
- De samenvatting neemt de vraag uit `data-question-text`, niet uit de
  opslag. Past een auteur een vraag aan, dan ziet de leerling de nieuwe
  tekst, ook bij een antwoord dat al bewaard was. De `id` blijft dezelfde.

### Keuzes en takken

```mdx
<Stap titel="Kies je doel">
<Keuze naam="doel" vertakt vraag="Waaraan wil je vandaag werken?"
  opties={{ toets: 'Een schriftelijke toets', mondeling: 'Een mondeling examen' }} />
</Stap>

<Stap titel="Een toets voorbereiden" tak="toets">
…
</Stap>

<Stap titel="Een mondeling examen voorbereiden" tak="mondeling">
…
</Stap>

<Stap titel="Klaar! Download je samenvatting">
<Samenvatting />
</Stap>
```

- `<Keuze>` is een vraag met één kaart per optie: een radiogroep, dus Tab
  gaat naar de groep en de pijltjestoetsen kiezen. `naam` volgt de regels
  van een `id`: kleine letters, cijfers en koppeltekens, uniek onder de
  keuzes van de module, en niet meer te wijzigen na publicatie. `vraag` is
  gewone tekst. `opties` koppelt een sleutel, in dezelfde vorm als een `id`,
  aan de tekst die de leerling ziet. Eén optie mag: een module kan met één
  tak beginnen en er later takken bij krijgen. De tag sluit zichzelf (`/>`).
- Op **elke** stap met een `<Keuze>`, vertakkend of niet, wacht *Volgende*
  tot de leerling gekozen heeft (zie *De speler*).
- **Takken.** Met `vertakt` bepaalt de keuze welke stappen volgen. Een module
  heeft hoogstens één vertakkende keuze. Een stap met `tak="toets"` hoort bij
  de tak `toets`; een stap zonder `tak` is gedeeld. De stap met de
  vertakkende keuze is zelf gedeeld en staat vóór elke takstap. Gedeelde
  stappen mogen tussen de takstappen staan. De laatste stap, met de
  samenvatting, is gedeeld.
- **De route.** De speler toont de gedeelde stappen plus de stappen van de
  gekozen tak. Zolang er niet gekozen is, zijn alle takstappen verborgen en
  komt de leerling niet voorbij de keuzestap, ook niet met `#stap-n` of een
  bewaarde stap: die vallen terug op de keuzestap. Anders kon een leerling de
  keuze overslaan via het gedeelde slot, en verschoof de nummering zodra die
  alsnog koos. "Stap n van m", de voortgangsbalk, de pijltjestoetsen,
  `#stap-n` en de bewaarde stap gebruiken de positie in de route. Een te
  hoge `#stap-n` valt terug op de laatste stap van de route.
- **Wisselen.** Terug naar de keuzestap en een andere optie kiezen. De
  antwoorden uit de vorige tak blijven bewaard en staan er weer wie
  terugwisselt; in de samenvatting staan alleen die van de gekozen tak.
- Welke stappen bij de route horen, beslist één functie: `routeOf` in
  `src/components/stappen/choices.ts`. De speler en de samenvatting
  gebruiken ze allebei. Leid het nooit af uit `hidden`: de speler verbergt
  elke stap behalve de huidige.
- **Bewaren.** De sleutel van de gekozen optie staat als tekst onder
  `ai-leerlijn:<module-id>:keuze:<naam>`. Lees en schrijf ze alleen met
  `readChoice` en `writeChoice` uit `choices.ts`; `chosenOption` geeft `null`
  voor een bewaarde sleutel die geen optie meer is. *Opnieuw beginnen* wist
  de keuzes met de rest van de module. Is `localStorage` geblokkeerd, dan
  geldt een keuze tot de leerling de pagina verlaat, zodat die niet vastzit
  op de keuzestap.
- **Het event.** `writeChoice` stuurt een `CustomEvent` met de naam
  `ai-leerlijn:keuze` (`CHOICE_EVENT`) op `document`, met als `detail`
  `{ moduleId, name, value }`: de module, de `naam` van de keuze en de
  sleutel van de optie. `onChoice(listener)` luistert ernaar. Zo reageren de
  speler, de samenvatting en latere componenten meteen. Alles in
  `choices.ts` werkt synchroon, zodat een script een bewaarde keuze kan lezen
  voor de stap getoond wordt.
- **In de statische HTML**, ook in verborgen stappen die nog niet
  gehydrateerd zijn, draagt het buitenste element van elke `<Keuze>`
  `data-choice="<naam>"` en `data-choice-options` (JSON:
  `{"<sleutel>": "<tekst>", …}`); de vertakkende keuze draagt ook
  `data-branching`. De `<section>` van een takstap draagt
  `data-tak="<sleutel>"`.
- **Zonder JavaScript** staan alle stappen onder elkaar, en een takstap
  krijgt boven haar titel een klein label: *Voor: Een schriftelijke toets*.
  Met JavaScript is dat label verborgen. De tekst ervan komt uit de MDX-bron,
  niet uit de gerenderde `<Keuze>`, want een stap kan er niet op rekenen dat
  die eerder rendert: `checks.ts` leest de vertakkende keuze uit de bron, en
  de route geeft ze via `Astro.locals` aan `<Stap>`. `<Keuze>` controleert dat
  wat de build las, exact zijn props zijn. Schrijf `opties` van de
  vertakkende keuze dus als een object van gewone teksten, tussen `'…'` of
  `"…"`, zonder variabelen of berekende tekst.
- **Buildchecks**, elk met een duidelijke melding: een `tak` zonder
  vertakkende `<Keuze>` ervoor, een `tak` op de keuzestap zelf, een onbekende
  takwaarde, een optie van de vertakkende keuze zonder stappen, meer dan één
  vertakkende keuze, `opties` die de build niet uit de bron kan lezen, en een
  `tak` op de laatste stap met de samenvatting. `<Keuze>` zelf laat de build
  falen bij een ontbrekende, ongeldige of dubbele `naam`, een lege `vraag`,
  lege of ongeldige `opties`, `vertakt` met een waarde, of tekst tussen de
  tags.

### Instructies per tool

```mdx
<Stap titel="Kies je tool">
<Keuze naam="tool" vraag="Met welke tool werk je vandaag?"
  opties={{ chatgpt: 'ChatGPT', gemini: 'Gemini', notebook: 'Gemini Notebook', copilot: 'Copilot (schoolaccount)' }} />
</Stap>

<Stap titel="Zet de leermodus aan">
Wat voor elke tool geldt, staat gewoon in de stap.

<Tool naam="chatgpt">Zet de **Leermodus** aan …</Tool>

<Tool naam="copilot">Open **Studeren en leren** in de linkerkolom …</Tool>
</Stap>
```

- Een module vraagt **één keer** met welke tool de leerling werkt, met een
  gewone, niet-vertakkende `<Keuze naam="tool">`. De opties en hun teksten
  kiest de module; de site kent geen vaste lijst van tools. Zoals elke keuze
  wordt ze per module bewaard, onder `keuze:tool`: *Opnieuw beginnen* wist
  ze, en een andere module vraagt ze opnieuw. In de samenvatting staat ze
  zoals elke keuze: *Tool: ChatGPT*.
- `<Tool naam="chatgpt">…</Tool>` staat binnen een `<Stap>`, na de keuze, en
  bevat de handelingen voor één tool in gewone Markdown: alinea's, **vet**,
  links, `code`. `naam` is een sleutel uit de `opties` van
  `<Keuze naam="tool">`. `code` krijgt de stijl van een prompt: iets wat de
  leerling in de tool typt. Wat voor elke tool hetzelfde is, staat buiten de
  blokken.
- **Met een gekozen tool** staan alleen de blokken van die tool er, zonder
  label: het blok leest als een deel van de stap. Een tool zonder blok in een
  stap toont daar niets. **Zonder keuze, of zonder JavaScript,** staan alle
  blokken er, elk met een label: *In ChatGPT*, *In Copilot (schoolaccount)*.
  Met JavaScript komt dat alleen voor als de leerling de keuzestap oversloeg,
  bijvoorbeeld met `#stap-n`, of als `localStorage` geblokkeerd is en de
  pagina herlaadt. De tekst van het label komt uit de MDX-bron, zoals bij
  takken: de `<Keuze>` rendert in een andere stap.
- **Wisselen.** Terug naar de keuzestap en een andere tool kiezen. De blokken
  wisselen meteen, zonder herladen.
- **Vóór de eerste weergave.** Het script van de speler is een uitgesteld
  modulescript en kan na de eerste weergave lopen. Las de site de keuze pas
  dan, dan stonden na herladen alle blokken even open. Daarom zet
  `src/components/stappen/ChosenTool.astro` twee dingen in de `<head>` van de
  modulepagina (de slot `head` van `src/layouts/Base.astro`), alleen in een
  module met `<Keuze naam="tool">`:
  - een `<style>` met één regel per optie, gemaakt bij de build (`toolRules`
    in `src/components/stappen/tools.ts`): met
    `<html data-chosen-tool="chatgpt">` zijn alle blokken `[data-tool]`
    behalve `[data-tool="chatgpt"]` verborgen. CSS kan twee attributen niet
    vergelijken, vandaar een regel per optie;
  - een klein inline script dat de keuze uit `localStorage` leest, in een
    try/catch, en `data-chosen-tool` op `<html>` zet, maar alleen op een van
    de opties. De sleutel `ai-leerlijn:<module-id>:keuze:tool` en de opties
    zet de build erin.

  Beide staan in de `<head>`, dus vóór elke stap in de HTML: geen blok wordt
  getoond voor het attribuut er is. Een gebundeld script in hetzelfde
  component houdt het attribuut daarna bij: bij het laden met `chosenOption`,
  en na elke keuze met `onChoice`. Zo werkt wisselen ook als `localStorage`
  geblokkeerd is. Het label verbergt `Tool.astro` met dezelfde
  `data-chosen-tool`; een blok zelf heeft geen script.
- **Vorm.** Een blok heeft links een lijn in `--ai`, zonder achtergrond, en
  het label in de stijl `label` in `--ai-text`. Inleidende tekst, een prompt
  en één blok passen samen in een stap op 1366 × 640. Zonder keuze staan de
  blokken dichter op elkaar; vier blokken van één of twee zinnen passen dan
  met een inleidende zin. Houd een blok dus kort.
- **Buildchecks**, elk met een duidelijke melding, in `checks.ts`: een
  `<Tool>` in een module zonder `<Keuze naam="tool">`, een `<Tool>` vóór die
  keuze, een `naam` die geen optie ervan is, een `naam` die geen tekst is, en
  meer dan één `<Keuze naam="tool">`. De build leest de opties dus uit de
  bron: schrijf `opties` als een object van gewone teksten, zoals bij de
  vertakkende keuze. `<Keuze naam="tool">` controleert dat wat de build las,
  exact zijn props zijn. `<Tool>` zelf laat de build falen bij een
  ontbrekende of ongeldige `naam` en bij een leeg blok.

### Prompts en gesprekken

```mdx
<Stap titel="Kopieer je eerste prompt">
Klik op **Kopieer** en plak de prompt in je tool.

<Prompt>
Ik zit in het [jaar en richting]. Op [datum] heb ik een schriftelijke toets
[vak] over [onderwerp].

Stel me vijf vragen, één per keer.
</Prompt>
</Stap>

<Stap titel="Wat ging hier mis?">
<Chat naast>
<Jij>Leg fotosynthese uit.</Jij>
<AI>Fotosynthese is het proces waarbij planten …</AI>
</Chat>

<Meerkeuze id="chat-context" vraag="Wat had de leerling beter gedaan?">
  …
</Meerkeuze>
</Stap>
```

De componenten staan in `src/components/inhoud/`. `<Chat>` bewaart niets,
`<Prompt>` alleen met invulvelden, `<Keuzechat>` de gekozen berichten.

**Een prompt om te kopiëren**

- `<Prompt>` toont een voorbeeldprompt die de leerling kopieert, in de tool
  plakt en daar aanvult. Tussen de tags staat de prompt in gewone alinea's:
  een lege regel begint een nieuwe alinea, een regeleinde binnen een alinea
  is een spatie, zoals overal in Markdown. **Vet**, *cursief* en `code`
  mogen; een lijst, een kop, een beeld of een component niet, want die
  overleven het klembord niet.
- Tekst tussen `[` en `]` is een invulplaats en krijgt een rustige eigen
  opmaak: een wit vlakje. De haken blijven staan, ook in de gekopieerde
  tekst, zodat de leerling ze in de tool terugvindt. Een invulplaats loopt
  niet over opmaak heen: in `[**vak**]` wordt niets gemarkeerd.
- **Vorm.** De stijl `prompt` op `ai-soft` met `ai-text`, `radius-md`, zo
  breed als een regel lopende tekst. Links bovenaan het label *Prompt*,
  rechts de knop *Kopieer*.
- **Kopiëren.** *Kopieer* zet de prompt als platte tekst op het klembord
  met `navigator.clipboard.writeText`, met een lege regel tussen de
  alinea's. Die tekst maakt de build uit de alinea's (`readPrompt` in
  `src/components/inhoud/authoring.ts`) en zet ze in het attribuut
  `data-prompt-text`. Het script kopieert alleen dat attribuut, nooit de
  tekst van het blok: het label, de knop en de bevestiging kunnen dus niet
  mee op het klembord. Na het kopiëren staat links van de knop ✓
  *Gekopieerd* (`role="status"`, dus voorgelezen). Na vier seconden, of
  zodra de leerling een andere prompt kopieert, verdwijnt dat weer.
- **Als het kopiëren mislukt** (geen klembord-API, of de browser weigert),
  staat de tekst van het blok geselecteerd, met de vraag om Ctrl+C te
  gebruiken. Kopieert de leerling een volledig geselecteerde prompt met
  Ctrl+C, dan zet het script dezelfde platte tekst op het klembord als de
  knop, en volgt dezelfde bevestiging. Wie maar een deel selecteert, kopieert
  zoals de browser dat doet. Selecteert de leerling iets anders, dan
  verdwijnt de vraag. De knop verspringt in geen van die gevallen.
- Eén script in `Prompt.astro` doet dat voor alle prompts op de pagina; het
  luistert op het document.
- Zonder JavaScript staat het blok er, zonder knop.

**Een prompt met invulvelden**

```mdx
<Stap titel="Leg eerst zelf een begrip uit je cursus uit">
<Prompt id="uitleg-begrip" velden={{ begrip: 'Begrip', 'mijn uitleg': 'Mijn uitleg' }}>
Mijn uitleg van [begrip]: [mijn uitleg]

Klopt mijn uitleg? Zeg wat ontbreekt, en leg [begrip] daarna eenvoudig uit
voor het [jaar en richting].
</Prompt>
</Stap>
```

- Soms schrijft de leerling eerst zelf iets, zoals een eigen uitleg of
  verwachte toetsvragen. Met `velden` doet die dat op de stap, en gaat het
  mee in de gekopieerde prompt: *eerst jij, dan AI* staat zo in de prompt
  zelf.
- `velden` koppelt de naam van een invulplaats, de tekst tussen `[` en `]`,
  aan het label van haar veld. Een label is een zelfstandig naamwoord: het
  staat ook in de samenvatting. Andere invulplaatsen blijven invulplaatsen
  voor in de tool, zoals `[jaar en richting]` hierboven. Staat dezelfde naam
  twee keer in de prompt, dan vult één veld beide plaatsen in.
- Een prompt met `velden` heeft een verplichte `id`, met de regels van een
  vraag-`id` (zie *Vraagtypes*): uniek onder de vragen van de module, en
  niet meer te wijzigen na publicatie.
- **Vorm.** De velden staan boven het promptblok, naast elkaar, samen zo
  breed als het blok; wat niet past, schuift naar een volgende regel. Elk
  veld heeft een echt `<label>` erboven, in `brand-text`: groen is de
  leerling. Een veld is een tekstveld van één regel dat meegroeit tot drie
  regels en daarna scrolt.
- **Live.** Bij elke toets vult de prompt zich aan. Een ingevulde
  invulplaats toont de tekst van de leerling zonder haken, in `brand-text`
  op `surface-sunken` (4.8:1), met een lijn in `brand` eronder; een lege
  blijft `[begrip]` op wit. Een regeleinde in een veld blijft een regeleinde,
  in het blok en op het klembord.
- **Kopiëren.** *Kopieer* kopieert de ingevulde prompt, met dezelfde regels
  voor alinea's als elke prompt. Naast `data-prompt-text` zet de build
  `data-prompt-template`: dezelfde tekst, gesneden bij de invulplaatsen van
  de velden. Het script vult die in; een leeg veld blijft `[begrip]`. Met
  alle velden leeg is dat exact `data-prompt-text`, en dat controleert de
  build. De knop werkt ook met lege velden.
- Zolang er een veld leeg is, staat links van de knop *Nog leeg: Mijn
  uitleg*, met de labels van de lege velden, zoals de lijst *Nog leeg* van
  de samenvatting. Een schermlezer leest die zin bij de knop
  (`aria-describedby`). Na het kopiëren maakt ze plaats voor ✓
  *Gekopieerd*; wie daarna verder typt, ziet de bevestiging verdwijnen, want
  het klembord klopt dan niet meer. De knop verspringt in geen van die
  gevallen.
- **Bewaren.** Wat de leerling in de velden schrijft, wordt bij elke toets
  bewaard onder `vraag:<id>` (zie *Antwoorden bewaren*). Het staat er weer
  na herladen en komt in de samenvatting; *Opnieuw beginnen* wist het mee.
  Het kader met de velden is in de statische HTML de vraag voor de
  samenvatting (`data-question="prompt-fields"`); `data-question-text` is
  de titel van de stap. Die titel leest de build uit de bron (`checks.ts`,
  via `Astro.locals`), zoals bij de takken: een component kan de titel van
  zijn stap niet lezen.
- De pijltjestoetsen wisselen niet van stap terwijl de focus in een veld
  staat (zie *De speler*). Tab gaat van veld naar veld, en dan naar
  *Kopieer*.
- Geen island: hetzelfde script in `Prompt.astro` doet ook dit. De velden
  staan in de statische HTML, net vóór hun blok, en het script werkt ook in
  een verborgen stap: de samenvatting en het kopiëren wachten op niets.
- Zonder JavaScript zijn de velden verborgen en staat de prompt er met haar
  invulplaatsen, zoals een prompt zonder velden.
- Een prompt zonder `velden` en `overnemen` verandert niet, ook niet in de
  HTML.

**Een prompt die een antwoord overneemt**

```mdx
<Stap titel="Eerst jij: je argumenten" tak="debat">
<Reflectie id="debat-argumenten" vraag="Wat zijn je drie sterkste argumenten?" />
</Stap>

<Stap titel="De tegenstander" tak="debat">
<Prompt overnemen={{ 'mijn argumenten': 'debat-argumenten' }}>
Mijn argumenten: [mijn argumenten]

Val mijn standpunt aan met het sterkste tegenargument dat je kent.
</Prompt>
</Stap>
```

- Wat de leerling op een eerdere stap in een `<Reflectie>` schreef, komt zo
  in de chat zonder knippen en plakken: *eerst jij, dan AI*, ook over de
  stappen heen. `overnemen` koppelt de naam van een invulplaats aan de `id`
  van die `<Reflectie>`. Andere invulplaatsen blijven invulplaatsen. Alleen
  een `<Reflectie>` kan bron zijn; een ander vraagtype komt erbij als een
  module het vraagt.
- **Vast.** De overgenomen tekst staat vast in de prompt, zonder eigen veld.
  Wie iets wil wijzigen, gaat met *Vorige* terug naar de reflectie: zo blijft
  één plek de bron, en klopt de samenvatting.
- **Vorm.** Hetzelfde als een ingevuld veld: zonder haken, in `brand-text` op
  `surface-sunken`, met een lijn in `brand` eronder. Een regeleinde blijft
  een regeleinde, in het blok en op het klembord. Alleen witruimte telt als
  leeg, zoals bij velden.
- **Altijd de huidige tekst.** Het script leest het bewaarde antwoord met
  `readAnswer` telkens als de stap getoond wordt (een
  `IntersectionObserver`, zoals bij de samenvatting: de speler wisselt met
  `hidden`, dus er komt geen `hashchange`), opnieuw bij het kopiëren, en bij
  elke toets op de stap zelf, voor een bron eerder op dezelfde stap. Het
  invullen bij het tonen van een stap is geen handeling van de leerling, dus
  daar beweegt niets. Verandert de tekst terwijl ✓ *Gekopieerd* staat, dan
  verdwijnt die, zoals bij velden.
- **Kopiëren.** Als bij velden: de build zet `data-prompt-template`, en het
  script vult dat in. De bronnen staan in `data-prompt-sources`: per
  invulplaats de naam, de `id` van de reflectie en de titel van haar stap,
  als JSON. Die titel leest de build uit de bron (`checks.ts`, via
  `Astro.locals`). Ook Ctrl+C op een volledig geselecteerde prompt geeft de
  ingevulde tekst.
- **Bron leeg.** De invulplaats blijft `[mijn argumenten]`, op het scherm en
  op het klembord, en de knop blijft werken: de leerling kan het dan in de
  tool invullen. Links van de knop staat *Nog leeg: ga terug naar „Eerst
  jij: je argumenten"*. De melding noemt de stap bij naam en niet *de vorige
  stap*, want de bron staat niet altijd net ervoor. Twee lege bronnen in
  verschillende stappen: *ga terug naar „A" en „B"*. Samen met velden staan
  de labels van de lege velden eerst, in één zin: *Nog leeg: Mijn standpunt;
  ga terug naar „Eerst jij: je argumenten"*. Is de opslag geblokkeerd, dan is
  de bewaarde reflectie er niet, en dat telt als leeg.
- **Bewaren.** `overnemen` bewaart niets: de bron is de reflectie. Een `id`
  is dus niet nodig (zonder `velden` is ze zelfs een fout), het blok draagt
  geen `data-question`, en de prompt komt niet apart in de samenvatting. *Opnieuw
  beginnen* wist de reflectie, en de prompt is daarna weer leeg.
- `overnemen` en `velden` werken samen in één prompt; dan gelden ook de regels
  van `velden`, met een verplichte `id`, en komen de velden in de samenvatting.
- Zonder JavaScript blijft de invulplaats staan, zoals bij `velden`.

**Een gesprek**

- `<Chat>` toont een vooraf geschreven gesprek, statisch, zonder
  JavaScript. Elke beurt is een `<Jij>` (wat de leerling vroeg) of een
  `<AI>` (wat de AI antwoordde), met gewone Markdown ertussen; een lijst in
  een antwoord van de AI mag.
- *Jij* staat rechts, in `surface-sunken` met een rand `line-strong`; *AI*
  links, op `ai-soft` met `ai-text`; beide in de stijl `prompt`. Elke beurt
  draagt een zichtbaar label, *Jij* of *AI*, dat een schermlezer ook
  voorleest. Het gesprek is een lijst met het label *Gesprek*.
- **Naast de vraag.** `<Chat naast>` zet het gesprek in een linkerkolom van
  ongeveer 40 %, en alles wat erna in de stap staat in een rechterkolom. De
  titel van de stap, en wat vóór de `<Chat>` staat, lopen over beide
  kolommen. Zet `<Chat naast>` dus meteen onder de titel, of na één
  inleidende zin over de volle breedte. Het is CSS op de stap (`:has()` en
  een raster), dus het werkt ook zonder JavaScript, en de auteur schrijft
  geen omhulsel. Is het gesprek hoger dan de rechterkolom, dan blijven de
  blokken rechts gewoon onder elkaar staan. Een browser zonder `:has()`
  toont het gesprek boven de rest.
- Zonder `naast` staat de `<Chat>` in de stroom van de stap, zo breed als
  een regel lopende tekst.

**Zelf het volgende bericht kiezen**

```mdx
<Stap titel="Stuur de AI bij">
<Keuzechat id="bijsturen">
<Jij>Leg breuken vereenvoudigen uit.</Jij>
<AI>Je deelt teller en noemer door hun grootste gemene deler …</AI>

<Ronde vraag="Dit is te moeilijk. Wat typ je nu?">
  <Bericht goed reactie="Stel: je hebt 4/8 van een pizza …" feedback="Je zegt wat er misloopt. Daar kan de AI iets mee.">Leg het eenvoudiger uit, met een voorbeeld.</Bericht>
  <Bericht reactie="Het antwoord is 1/2." feedback="Nu heb je een antwoord, maar je snapt het nog niet.">Geef me gewoon het antwoord.</Bericht>
</Ronde>
</Keuzechat>
</Stap>
```

De leerling oefent bijsturen en om hints vragen vóór die het in de echte chat
doet, zonder account of daglimiet en met een zekere uitkomst.

- `id` is verplicht, zoals bij een vraag. Eerst komen de beurten `<Jij>` en
  `<AI>`, het begin van het gesprek, dan een of meer `<Ronde vraag="…">`, elk met
  minstens twee `<Bericht>`, indicatief hoogstens drie rondes van drie berichten.
  Tussen de tags van `<Bericht>` staat wat de leerling zou typen (**vet** en
  *cursief* mogen). `reactie` en `feedback` zijn verplicht en gewone tekst. `goed`
  markeert een bericht dat de volgende ronde opent; een ronde heeft er minstens
  één.
- **Vorm.** Een raster binnen het component, ± 40/60: links het gesprek, met
  dezelfde bubbels als `<Chat>`, rechts de vraag van de ronde (`h3`), de berichten
  onder elkaar en de feedback eronder. Het is geen `<Chat naast>`: er is geen CSS
  op de stap, en wat vóór het component staat, loopt over de volle breedte.
- **Kiezen.** Het bericht en de reactie komen in het gesprek, in de volgorde van
  kiezen. Het gekozen bericht blijft staan met het woord *Gekozen* en werkt niet
  meer, zoals bij `<Meerkeuze>`. De feedback staat onder de berichten en wordt
  vervangen bij een nieuwe keuze: ✓ *Dit helpt* op `success-soft` (woord en icoon
  in `success`), of ✕ *Dit helpt minder* op `danger-soft` (in `danger`). Altijd
  icoon én woord, geen barometerkleuren.
- **Een bericht met `goed`.** De berichten van die ronde verdwijnen, de focus gaat
  naar de vraag van de volgende ronde, en de feedback blijft eronder staan tot de
  volgende keuze. **Een ander bericht:** de reactie en de feedback blijven staan
  en de leerling kiest opnieuw. Na de laatste ronde staat er één zin: *Het gesprek
  is klaar, je kunt verder met de volgende stap.* De focus gaat daarheen, want de
  knop waarop de leerling stond is weg.
- *Volgende* blokkeert niet, zoals bij `<Meerkeuze>`.
- **Scrollen.** Het gesprek scrolt binnen zijn kolom (`tabindex="0"`, met de naam
  *Gesprek*), en springt zelf naar het laatste bericht als het groeit, ook bij
  herstellen en telkens als de stap weer zichtbaar wordt. Dat doet een
  `ResizeObserver`: `scrollTop` zetten in een verborgen stap werkt niet, want de
  speler wisselt met `hidden`. Pijl omhoog en omlaag scrollen het gesprek; de
  speler reageert alleen op links en rechts, en die wisselen ook hier van stap. Een
  reactie die hoger is dan de kolom, blijft leesbaar vanaf haar eerste regel.
- **Toetsenbord.** Tab gaat naar het gesprek, dan naar de berichten; Enter of
  spatie kiest. Een gekozen bericht heeft `aria-disabled` en niet `disabled`, zodat
  de focus er blijft staan.
- **Schermlezer.** Eén `role="status"` per component leest na een keuze de reactie,
  het oordeel en de feedback voor, en is leeg na herstellen. Het gesprek en de
  zichtbare feedback zijn zelf geen live regio, dus niets klinkt dubbel.
- **Herstellen.** Bij het laden staat het gesprek er zonder beweging; `appear`
  alleen na een keuze, `settle` voor de kleuren. Past een bewaard antwoord niet
  meer bij de rondes (een auteur paste ze aan na publicatie), dan neemt het
  component het langste stuk dat de leerling zo kan bereikt hebben: een onbestaand
  of dubbel volgnummer valt weg, net als wat na een `goed` bericht staat en een
  ronde na een onvolledige ronde. Het antwoord wordt pas herschreven bij de
  volgende keuze.
- Zonder JavaScript staan het begin van het gesprek, alle vragen en hun berichten
  op de pagina, zonder reacties en zonder feedback. De latere rondes staan daarvoor
  in een `<noscript>`, zodat de eerste client-render gelijk blijft aan de
  serverrender. Een klik vóór de hydratatie telt niet, zoals bij `<Meerkeuze>`: een
  knop houdt geen toestand bij in de DOM.
- **Samenvatting.** Zoals `<Meerkeuze>`: de inhoud staat niet in de pdf, want de
  leerling schreef niets zelf, en het component telt niet mee in *vulde je … vragen
  in* en staat niet onder *Nog leeg*. Wel een regel in de tijdlijn, met de titel
  van de stap (zie *De samenvatting*).

**Hoogte op 1366 × 640** (gemeten in `voorbeeld`)

- Een `<Prompt>` is 32 px plus 24 px per regel tekst, plus 12 px tussen twee
  alinea's, plus 24 px binnenmarge: drie regels in één alinea is 128 px,
  twee alinea's van twee regels 164 px. Een regel is ongeveer 65 tekens.
- Twee korte beurten zijn naast de vraag 195 px hoog, in de stroom 147 px.
- `<Chat naast>` met twee korte beurten en een `<Meerkeuze>` van vier korte
  opties met elk één zin feedback, alle vier aangeklikt: 331 van de 390 px.
  Onder elkaar zou dat 472 px zijn; daarom bestaat `naast`. Rechts is een
  optie ongeveer 290 px breed: houd ze op twee à drie woorden en de
  feedback op één zin.
- Een `<Keuzechat>` meet in `voorbeeld` (drie rondes van drie berichten, reacties
  tot ± 150 tekens): bij het begin 270 van de 390 px; zodra het gesprek zijn kolom
  vult, in elke toestand 390 px: titel 50 px plus de kolom van 340 px, die de
  bovengrens van het gesprek is. Het gesprek zelf is dan tot 1936 px lang en scrolt
  binnen die kolom. De rechterkolom heeft dus 340 px en is ± 600 px breed, met een
  regel van ± 70 tekens: een vraag van één regel 40 px, een bericht 44 px plus 8 px
  tussen twee berichten, feedback 50 px plus 22 px per regel na de eerste. Een
  regel feedback is ± 70 tekens.
- **Wat rechts past**, met drie berichten en de feedback van de hoogste toestand:
  berichten van hoogstens ± 60 tekens, zodat *Gekozen* er nog op één regel bij
  past, met feedback tot ± 300 tekens (326 px), of tot ± 240 tekens bij een vraag
  van twee regels (332 px). Berichten van twee regels (80 tot 120 tekens) passen
  alleen met feedback tot ± 120 tekens en een vraag van één regel (338 px).
  Berichten van drie regels passen niet. Houd een bericht dus op ± 60 tekens en
  de feedback op ± 240.
- Met één regel tekst boven een `<Keuzechat>` zakt de kolom van het gesprek
  vanzelf naar 298 px (CSS op een `p`, `ul` of `ol` vóór het component), en heeft
  rechts ook 298 px: feedback tot ± 180 tekens. Twee regels tekst passen niet als
  het gesprek vol staat, en onder het component past niets meer, ook geen dichte
  `<Hulp>`. Zet de uitleg dus in de `vraag` van de ronde.
- Een `<Prompt>` van drie regels met daaronder een `<Meerkeuze>` van vier
  korte opties past zolang de feedback dicht is (379 px), maar niet meer
  als alle vier de opties aangeklikt zijn (453 px): dan scrolt de kaart.
- De velden van een `<Prompt>` met `velden` zijn 70 px hoog (label 22 px,
  veld 44 px), plus 12 px tot het blok. Een veld van drie regels maakt ze
  122 px; langer scrolt binnen het veld. Twee velden staan naast elkaar,
  elk ± 350 px breed: een uitleg van twee zinnen is er al drie regels.
- Wat de leerling schrijft, laat het blok groeien met 24 px per regel; daar
  is geen bovengrens. In `voorbeeld` is de stap met titel, twee velden en
  een prompt van twee alinea's (één en twee regels) leeg 272 px, ook met
  het eerste veld ingevuld, en met een uitleg van drie regels in het tweede
  veld 371 px van de 390 px. Een eerste versie van die stap, met twee regels
  tekst boven de velden en een tweede alinea van drie regels, was ingevuld
  463 px: dan scrolt de kaart. Zet dus geen tekst boven een prompt met
  velden (de titel en de labels zeggen wat de leerling doet), en houd de
  prompt zelf op drie regels.
- Een overgenomen antwoord groeit net zo. In `voorbeeld` is de stap met
  titel, twee regels tekst en een prompt van twee alinea's (één en twee
  regels) leeg 258 px, en past die tot een antwoord van zes regels (378 px);
  bij zeven scrolt de kaart. Met daarboven één veld, zonder tekst, en een
  derde alinea is dat leeg 308 px en past het tot vier regels. Reken op
  argumenten van meer dan één regel: houd de rest van zo'n stap kort.

**Buildchecks**, elk met een duidelijke melding:

- een lege `<Prompt>`, en een `<Prompt>` met iets anders dan alinea's
  (een lijst, een kop, een beeld, een component);
- bij een `<Prompt>` met `velden`: geen `id` (`checks.ts` leest dat uit de
  bron, met de titel van de stap in de melding), een `id` in een verkeerde
  vorm of die al bij een andere vraag van de module hoort, `velden` die geen
  object van gewone teksten is, een leeg label, een naam in `velden` die
  niet als invulplaats in de prompt staat (de melding noemt de
  invulplaatsen die er wel staan), en een `<Stap>` waarvan de `titel` geen
  gewone tekst is; en een `id` op een `<Prompt>` zonder `velden`;
- bij een `<Prompt>` met `overnemen`: een `id` die niet bestaat in de module
  of die geen `<Reflectie>` is, een bron later in de module dan de prompt, een
  bron in een andere tak dan de prompt (een bron in een gedeelde stap mag;
  een bron in een tak bij een prompt in een gedeelde stap niet), een
  `overnemen` die geen object van gewone teksten is, een naam twee keer, een
  naam die niet als invulplaats in de prompt staat of die ook in `velden`
  staat, en een bron in een `<Stap>` waarvan de `titel` geen gewone tekst is.
  De controles op de bron doet `checks.ts` in de bron van de module, met de
  titel van de stap in de melding, de andere `Prompt.astro`;
- een lege `<Chat>`, een `<Chat>` zonder beurten, en iets anders dan
  `<Jij>` en `<AI>` in een `<Chat>`, zoals tekst buiten een beurt;
  `<Chat>` rendert zijn kinderen en leest ze terug, zoals `<Meerkeuze>`
  met zijn opties doet;
- een lege `<Jij>` of `<AI>`;
- een `<Jij>` of `<AI>` buiten een `<Chat>`: die zou stil verdwijnen, dus
  controleert `checks.ts` dat in de bron, met de titel van de stap in de
  melding;
- `naast` met een waarde;
- bij een `<Keuzechat>`: een ontbrekende, ongeldige of dubbele `id`, geen `<Ronde>`,
  geen beurten vóór de eerste `<Ronde>`, een beurt na een `<Ronde>`, en iets anders
  dan beurten en rondes tussen de tags;
- bij een `<Ronde>`: een lege `vraag`, minder dan twee `<Bericht>`, geen `<Bericht
  goed>`, en iets anders dan berichten tussen de tags;
- bij een `<Bericht>`: geen tekst, een lege of ontbrekende `reactie` of `feedback`,
  en `goed` met een waarde;
- een `<Ronde>` buiten een `<Keuzechat>`, een `<Bericht>` buiten een `<Ronde>`, en
  een `<Keuzechat>` in een `<Stap>` waarvan de `titel` geen gewone tekst is:
  `checks.ts` leest dat in de bron, met de titel van de stap in de melding. Zoals
  bij `<Meting>` vallen ze pas als de pagina gebouwd wordt: test ze in een module
  met `status: beschikbaar`.

### Hulp in een stap

```mdx
<Stap titel="Wat maakte het verschil?">
<Reflectie id="verschil" vraag="Welk antwoord kun jij het best gebruiken, en waarom?" />

<Hulp label="Hulp nodig bij het schrijven?">
Vul aan: *Antwoord … helpt mij het meest, omdat …*
</Hulp>
</Stap>
```

`<Hulp>` zet steun achter een knop: aanvulzinnen, een voorbeeld, of de uitweg
*Geen AI-toegang? Bekijk het voorbeeld*. Wie ze nodig heeft, klikt ze open; wie
ze niet nodig heeft, ziet ze niet. Zo bedient één versie van een module alle
leerlingen (§ 3). Het component staat in `src/components/inhoud/`.

- `label` is verplicht: de tekst op de knop. De auteur kiest hem, want de knop
  dekt meer dan hulp. Houd hem op één regel.
- Tussen de tags staat gewone Markdown: alinea's, lijsten, **vet**, links.
- Het is een `<details>` met een `<summary>`, in Astro: geen island en geen
  script. Toetsenbord en schermlezer werken zoals bij elke `<details>`: Tab
  gaat naar de knop, Enter of spatie klapt ze open of dicht. De
  pijltjestoetsen blijven van stap wisselen, ook met de focus op de knop. Het
  werkt ook zonder JavaScript.
- Dicht bij het laden. Open of dicht wordt niet bewaard: wie binnen de module
  van stap wisselt, vindt de hulp terug zoals die stond; na herladen is ze
  dicht.
- Als rechtstreeks kind van een stap is `<Hulp>` één onderdeel van de opbouw
  (`docs/DESIGN.md`, *De opbouw*), en naast een `<Chat naast>` staat ze in de
  rechterkolom.
- **Vorm.** Dicht: een knopje van 36 px hoog, rand `line-strong`, `radius-md`,
  met een pijltje en het label in `small` en `brand-text`. Open: de inhoud
  eronder op `surface-sunken`, in `small`, hoogstens 65ch breed. Geen
  barometerkleuren.
- **Beweging.** De inhoud verschijnt met een fade van `motion-base`, puur in CSS
  (een overgang op `::details-content`), en verdwijnt meteen. Hulp die open
  bleef, fadet niet opnieuw als de leerling terugkeert naar de stap. Een
  browser zonder `::details-content` toont de inhoud zonder fade.

**Hoogte op 1366 × 640** (gemeten in `voorbeeld`)

- Dicht is `<Hulp>` 36 px hoog, plus 16 px marge als er nog iets onder staat.
  Open komt er 12 px bij, plus 22 px per regel, plus 8 px tussen twee blokken.
  Een regel is ongeveer 75 tekens; rechts van een `<Chat naast>` iets minder.
- Een `<Reflectie>` met een `<Hulp>`: dicht 354 van de 390 px, open met één
  regel hulp 388 px. **Twee regels hulp passen daar niet**: 410 px, dan scrolt
  de kaart. Houd de hulp onder een `<Reflectie>` dus op één regel, of zet het
  voorbeeld op een eigen stap.
- Boven zo'n `<Reflectie>` met `<Hulp>` past geen tekst: met één regel is het
  dicht al 396 px, en de `<Reflectie>` alleen laat die regel wel toe.
- `<Chat naast>` met twee korte beurten, een `<Meerkeuze>` van vier korte opties
  en een `<Hulp>` van één regel: dicht 288 px, open 322 px. Met alle vier de
  opties aangeklikt dicht 384 px, en open 418 px: dan scrolt de kaart.
- Twee regels tekst met daaronder een `<Hulp>` met een zin, een lijst van drie
  punten en nog een zin: open 300 px.

**Buildchecks**, elk met een duidelijke melding: een ontbrekende of lege
`label`, en een leeg blok (ook `<Hulp label="…" />` of alleen een commentaar
tussen de tags). Ze vallen pas als de pagina gerenderd wordt: een module met
`status: verborgen` zit niet in de build, dus daar verschijnt de fout alleen in
`npm run dev`.

### De samenvatting

```mdx
<Stap titel="Klaar! Download je samenvatting">
<Samenvatting />
</Stap>
```

- `<Samenvatting />` staat in de **laatste stap**, en hoogstens één keer per
  module; de build controleert beide. Ze heeft geen attributen: de naam van
  de module geeft de route mee via `Astro.locals`, de link naar het
  eindformulier komt uit `src/config/smartschool.ts`. Het component staat in
  `src/components/stappen/`, de pdf ernaast in `pdf.ts`.
- Ze neemt, in de volgorde van de module, elke `<DenkEerst>`, `<Reflectie>`,
  `<Prompt>` met `velden`, `<Meting>`, `<Flashcards>` en `<Meeneemkaart>` mee. **Meerkeuze en `<Keuzechat>` komen er
  niet in**: alleen wat de leerling zelf schreef of over zichzelf invulde. Op de stap staat één zin over hoeveel vragen ingevuld zijn:
  *In de module **AI als leercoach** vulde je 12 van de 14 vragen in.*, of
  als alles ingevuld is *… vulde je alle 14 vragen in.* De keuzes tellen
  niet mee. Met één vraag wordt dat *vulde je de vraag (nog niet) in*, met
  twee *beide vragen*, zonder antwoord *nog geen van de 14 vragen*, en
  zonder vragen *zijn er geen vragen waarop je zelf iets schrijft*. Heeft
  de route minstens één vraag (meerkeuze en `<Keuzechat>` tellen mee), dan volgt in dezelfde
  alinea *In je pdf staat ook wanneer je aan elke vraag begon.*
- Is er iets leeg, dan staat eronder *Nog leeg:* met elke lege vraag en
  elke keuze die nog open is (*Tool: (nog niet gekozen)*), elk met *Ga naar
  stap n* (`#stap-n`). Is alles ingevuld, dan staat er geen lijst. De
  antwoorden zelf staan niet op de stap, wel in de pdf.
- **Een prompt met velden** is één vraag. De vraag is de titel van haar
  stap (`data-question-text`), met eronder één regel per veld, in de
  volgorde van `velden`: *Mijn uitleg: …*, of *Mijn uitleg: (niet
  ingevuld)*. Ze telt als ingevuld als alle velden ingevuld zijn; anders
  staat de titel van de stap onder *Nog leeg*, met *Ga naar stap n*.
- **Een meting** is één vraag, met `vraag` als vraag en eronder één regel per
  waarde: *Score: 3 van 5* en *Zekerheid: 4 van 5*, of *Zekerheid: (niet
  ingevuld)*. Ze telt als ingevuld als beide rijen gekozen zijn; anders staat de
  vraag onder *Nog leeg*, met *Ga naar stap n*. In de pdf en op papier is ze een
  blok `fields`, zoals een prompt met velden, en in de tijdlijn staat de titel
  van haar stap, met de eerste klik.
- **Een stapel kaarten** is één vraag, met `vraag` als vraag en eronder het aantal
  kaarten, de score en de moeilijkste kaarten, niet de hele stapel. Ze telt als
  ingevuld zodra er een kaart in staat; een lege stapel staat onder *Nog leeg*. De score
  is die van de laatste afgewerkte ronde: een nieuwe ronde die nog loopt, wist ze niet.

  ```
  Kaarten: 12
  Meteen goed: 9 van 12
  Moeilijkste kaarten: Wat is wortel16? (3 keer nog niet)
  Hoe groot is pi? (1 keer nog niet)
  ```

  Nog geen afgewerkte ronde: *Stand: nog bezig, 5 van 12 kaarten op Wist ik* in plaats
  van *Meteen goed*, met de moeilijkste kaarten van de lopende ronde, of *Moeilijkste
  kaarten: geen*. Nog helemaal niet geoefend: *Kaarten: 12* en *Stand: nog niet
  geoefend*. Een
  moeilijkste kaart staat met haar voorkant, op een eigen regel. In de pdf en op papier
  is het een blok `fields`, en in de tijdlijn staat de titel van haar stap.
- **Een meeneemkaart** is één vraag, met `vraag` als vraag en eronder één regel per rij:
  *Ik zit vast: Geef me één hint, niet de oplossing.*, ook als de leerling de zin niet
  aanpaste, of *Ik zit vast: (niet ingevuld)* voor een rij die de leerling leegmaakte. Ze
  bewaart zichzelf als haar stap getoond wordt, en telt dus als ingevuld voor wie de stap
  zag. Ook met een lege rij: wie een rij schrapt, heeft nog een kaart. Wie de stap niet zag
  of alle rijen leegmaakte, ziet ze onder *Nog leeg*, met *Ga naar stap n*; niet gezien
  staat in de pdf elke rij op *(niet ingevuld)*, nooit de zinnen van de auteur, en is er
  geen regel in de tijdlijn. In de pdf en op papier is ze een blok `fields`, en in de
  tijdlijn staat de titel van haar stap, met het moment waarop die getoond werd.
- In een module met takken neemt de samenvatting alleen vragen en keuzes mee
  uit de route van de leerling (`routeOf`), en de links gebruiken de
  stapnummers van die route. Een vraag uit een tak die de leerling niet
  koos, telt dus niet mee en staat niet in de pdf.
- De samenvatting leest de antwoorden telkens opnieuw wanneer haar stap
  zichtbaar wordt (een `IntersectionObserver`: de speler verbergt de andere
  stappen met `hidden`), terwijl de leerling typt in een vraag op dezelfde
  stap, en na elke keuze. Een leerling die terugkeert en een antwoord
  aanpast, ziet dus altijd de actuele stand. Ze wacht niet op `hashchange`:
  de speler wisselt van stap met `replaceState`, en dat stuurt geen
  `hashchange`.
- **De pdf.** *Download als pdf* (de primaire knop) maakt in de browser een
  pdf met jsPDF (MIT), A4 staand, en biedt die aan als download:
  `ai-leerpad-<module-id>.pdf`. jsPDF (± 125 kB gzip) wordt pas bij de klik
  geladen, met een dynamische `import('jspdf')`: de modulepagina betaalt er
  niets voor tot dan. Alleen de tekst-API (`text`, `splitTextToSize`,
  `addPage`), nooit `.html()`: dat sleept html2canvas en DOMPurify mee.
- In de pdf staat, in deze volgorde: *AI-leerpad Arcadia Scholen*, de naam
  van de module, *gedownload op 10 november 2026 om 14:38*, de keuzes, één
  per regel (*Doel: Een schriftelijke toets*, of *Doel: (niet gekozen)*, met
  de `naam` van de keuze met een hoofdletter vooraan), dan per vraag de
  vraag in het vet met het antwoord eronder, of *(niet ingevuld)*; bij een
  prompt met velden staat er één regel per veld, bij een meting één regel per
  waarde. Als laatste de *Tijdlijn*
  (zie hieronder). Onderaan elke pagina staat *Pagina 1 van 2*. Een lang antwoord loopt door op de
  volgende pagina; een vraag staat nooit alleen onderaan een pagina. Lege
  regels binnen een antwoord vallen weg. Er staat geen naam of ander
  persoonsgegeven in: de site kent de leerling niet, Smartschool koppelt het
  bestand aan de leerling.
- **De tijdlijn.** Achteraan de pdf staat het blok *Tijdlijn*: één regel
  per moment, in de volgorde van de module, in een vast formaat:

  ```
  13:05  Begonnen
  13:12  Noteer je taak
  13:41  Hoe ging de startquiz?
  14:38  Pdf gemaakt
  ```

  Eerst *Begonnen* (`start`, zie *Lokaal bewaren*), dan elke vraag van de
  route van de leerling, ook `<Meerkeuze>` en `<Keuzechat>`, die verder niet
  in de pdf staan, met de titel van de stap waarin ze staat, en als laatste *Pdf
  gemaakt*, het moment van de download. Per vraag staat `firstAt`, het
  moment waarop de leerling eraan begon. Een vraag zonder geldige tijd
  (nooit beantwoord, of bewaard vóór de site tijden bijhield) heeft geen
  regel; een antwoord zonder tijd staat wel gewoon in de pdf. De tijd staat als
  `HH:MM` in de tijdzone van de laptop, met twee spaties voor de tekst;
  op een andere dag dan de download staat de datum ervoor (`9/11 20:14`).
  Een tekstextractie zoals `pdftotext` geeft die twee spaties als één
  terug; een script herkent de regel aan de vorm van de tijd vooraan.
- `pdf.ts` krijgt gewone gegevens: de module, de keuzes, per vraag een
  blok met een `kind` (`answer`, of `fields` voor een prompt met velden, een
  meting, een stapel kaarten en een meeneemkaart) en
  de momenten van de tijdlijn. Een nieuw soort blok komt daar bij.
- **Tekens.** De pdf gebruikt Helvetica, een standaardlettertype van pdf:
  er gaat geen lettertypebestand mee, maar het kent alleen de tekens van
  WinAnsi (Windows-1252). Voor een teken daarbuiten schrijft jsPDF zonder
  foutmelding verkeerde tekens (→ wordt `!’`). Daarom gaat alle tekst eerst
  door `forPdf`: → wordt `->`, − wordt `-`, ≤ wordt `<=`, een letter
  buiten WinAnsi verliest haar accent (ş wordt s), emoji vallen weg, en wat
  dan nog overblijft wordt `?`. Formules, vooral voor `<Flashcards>`: √ wordt
  `wortel`, π `pi`, ∞ `oneindig`, Σ en ∑ `Sigma`, Δ en ∆ `Delta`, α β γ θ λ `alfa`
  `beta` `gamma` `theta` `lambda`, ⁰ en ⁴ tot ⁹ `^0` en `^4` tot `^9`, ⁿ `^n`, en ₀ tot
  ₉ `0` tot `9`. Op papier blijven die tekens gewoon staan. De accenten van het
  Nederlands en het Frans, ’ “ ” – — € ½ × ÷ ± ¹ ² ³ staan er gewoon. Figtree insluiten lost dat niet op: het
  heeft geen pijlen en geen emoji, en het weegt meer. Een woord dat langer
  is dan een regel, wordt afgebroken.
- Na de download verschijnt een bevestiging (`role="status"`, dus
  voorgelezen): ✓ *Gedownload. Laad de pdf op in het eindformulier.* Daarna
  staat de knop *Open het eindformulier* er, die Smartschool in een nieuw
  tabblad opent. Verandert een antwoord daarna, dan verdwijnen de
  bevestiging en de knop, en downloadt de leerling opnieuw.
- **Als de pdf mislukt** (jsPDF laadt niet, bijvoorbeeld op een haperende
  verbinding, of het maken gooit een fout), verschijnt zonder foutmelding:
  *Downloaden lukte niet. Klik op **Afdrukken** en kies bij Bestemming
  **Opslaan als PDF**.*, met de knop *Afdrukken* (`window.print()`). Na het
  afdrukvenster (`afterprint`) verschijnt *Open het eindformulier*. Of de
  leerling opsloeg of annuleerde, zegt de browser niet.
- **Op papier.** De volledige samenvatting, met dezelfde inhoud als de pdf
  (*afgedrukt op* in plaats van *gedownload op*, en *Afgedrukt* in plaats
  van *Pdf gemaakt* als laatste regel van de tijdlijn), staat ook in de
  pagina, op het scherm verborgen. De printstijl (`@media print`) toont op papier
  alleen die: de header, de voortgang, de navigatie, de andere stappen, de
  titel van de stap en de knoppen zijn verborgen. Dat geldt zolang de stap
  met de samenvatting getoond wordt; een andere stap wordt afgedrukt zoals
  de browser hem toont. De regels hangen niet af van de klassen van de
  speler of de layout: met `:has()` verliest elke voorouder van de
  samenvatting zijn vaste hoogte en scrollvak, en verdwijnt alles wat ernaast
  staat.
- **Hoogte.** De lijst *Nog leeg* scrolt binnen haar eigen kader (hoogstens
  13.5rem), zodat de knoppen altijd zichtbaar blijven, ook bij veel of lange
  vragen.
- Zonder JavaScript wordt niets bewaard; de samenvatting zegt dan dat ze
  JavaScript nodig heeft.

### Confetti

```mdx
<Stap titel="Wat werkte?">
<Confetti />

Denk terug aan je sessie. Er is geen fout antwoord.
…
</Stap>
```

- Een korte mentale pauze op een scharniermoment van een module. Er valt
  niets te leren. In *AI als coach* (3e graad) staat ze in *Wat werkte?*,
  na de vier vragen *Wat ging hier mis?* en vóór de reflectie.
- `<Confetti />` heeft geen attributen en geen inhoud: tekst tussen de tags
  laat de build falen. Hoogstens één per module; ook dat controleert de
  build. Het component zelf is onzichtbaar en neemt geen plaats in; zet het
  bovenaan de stap. Het staat in `src/components/stappen/`, het script
  ernaast in `confetti.ts`.
- De eerste keer dat de stap verschijnt, valt er 1,5 seconde confetti over
  de stapkaart: 80 stukjes die op het einde vervagen. Daarna verdwijnt het
  canvas uit de pagina. Verlaat de leerling de stap eerder, dan stopt de
  confetti meteen; ook dan telt ze als gespeeld.
- **Eén keer per module.** Na het afspelen staat er een sleutel
  `ai-leerlijn:<module-id>:confetti`. Wie terugkeert naar de stap of de
  pagina herlaadt, ziet niets meer. *Opnieuw beginnen* wist de sleutel mee.
  Is opslag geblokkeerd, dan speelt ze hoogstens één keer per keer dat de
  pagina geladen wordt.
- **Kleuren:** alleen merkkleuren, gelezen uit de tokens bij het afspelen:
  `brand`, `brand-text`, `forest` en `ai`. `ai-soft` valt weg op de witte
  kaart. Nooit rood, oranje of geel: die horen bij de AI-barometer
  (`docs/DESIGN.md`, *Kleur*).
- **Nooit in de weg.** Het canvas ligt vast over de kaart, buiten de
  layout: de stap blijft even hoog en er scrolt niets. Het is
  `aria-hidden`, vangt geen klikken op en krijgt geen focus. De leerling
  typt en klikt meteen verder. Geen geluid.
- Bij `prefers-reduced-motion: reduce` is er geen confetti, en wordt er ook
  niets bewaard.
- Zelf gemaakt, zonder bibliotheek: ± 2 kB script dat op een `<canvas>`
  tekent. Het start, zoals de samenvatting, met een `IntersectionObserver`
  op de stap. Het begint pas te kijken na `DOMContentLoaded`: tot het script
  van de speler gelopen heeft, staan alle stappen op het scherm.
- Zonder JavaScript is er geen confetti.

### Links naar Smartschool

- De links staan op één plek, in `src/config/smartschool.ts`: `nulmeting` (de
  vragenlijst vóór de module, stap 1 op de startpagina) en `eindformulier`
  (één formulier voor alle modules, stap 3 op de startpagina en de
  samenvatting). Daar staat ook `eindformulierUur`, het uur waarop het
  eindformulier binnen moet zijn, geschreven zoals de leerling het leest
  (`'16 uur'`), en `schools`, de vier scholen met hun platform.
- `null` betekent dat de waarde nog niet bekend is. De startpagina en de
  samenvatting tonen dan een duidelijke, niet-klikbare melding, zoals *De
  link naar het eindformulier volgt nog.* Wie de link invult, vult het
  volledige `https://`-adres in; daarna verschijnt de knop vanzelf. Een
  adres dat geen geldige `https://`-URL is, laat de build falen: de
  startpagina controleert beide links, de samenvatting het eindformulier.

### Een link per school

```mdx
<SchoolLink href="https://{school}.smartschool.be/forms/…">Open de module</SchoolLink>
```

- Elke school heeft een eigen platform (§ 4), dus een link is een sjabloon met
  `{school}` op de plaats van het platform: het subdomein op Smartschool, de
  waarde van `smartschool_platform` op Bookwidgets. `<SchoolLink>` staat in
  `src/components/stappen/SchoolLink.astro`. Op de startpagina importeert de
  pagina het; in een module schrijft de auteur geen import.
- Een sjabloon zonder `{school}`, met een andere plaatshouder, of dat geen
  geldig `https://`-adres oplevert, laat de build falen (`schoolLinks` in
  `src/config/smartschool.ts`). `new URL` alleen vangt dat niet op: het aanvaardt
  `{school}`, ook in de hostnaam.
- **School nog niet gekend:** de knop opent een dialoog met de afkortingen SMA,
  DIA, SJIB en SJCA. De vier adressen staan al bij de build in de HTML, als
  gewone links: een keuze is een klik op een link, dus een popupblokker grijpt
  niet in. De keuze wordt bewaard, het doel opent in een nieuw tabblad en de
  dialoog sluit. Escape of *Annuleren* sluit zonder iets te bewaren.
- **School gekend:** de knop is meteen de link van die school. Erboven staat
  *School: SJCA · wijzigen*. Wijzigen gebruikt dezelfde dialoog, maar bewaart
  alleen de keuze en opent niets: zonder die weg zou een leerling die zich
  misklikt telkens op de verkeerde aanmelding terechtkomen.
- Zonder JavaScript staan de vier links op de pagina. Is de opslag geblokkeerd,
  dan werkt de link gewoon en komt de dialoog bij elke klik terug.


### Aanvulling vibecoding — eigen lesbestanden

De basismodule gebruikt één HTML-downloadroute, met bijvoorbeeld Copilot.

Eigen leerstof heeft voorrang: PDF-cursus, PowerPoint-presentatie, Excel-woordenlijst
of notities. De leerling beschrijft hier alleen het bestand en het afgebakende
stuk; het bestand gaat rechtstreeks naar de gekozen AI-tool als die het kan lezen.
De leerling controleert dat het juiste stuk werd gelezen. De modulewebsite verwerkt
geen uploads. Een startpakket is de terugvaloptie, niet de verplichte route.

### Aanvulling vibecoding — keuzes en succesmomenten

De module gebruikt bij hulpmiddel- en materiaalkeuze de bestaande kaartvormgeving
met radioknoppen, met inhoudelijke titels. Vier expliciet gevraagde succesmomenten
hebben eigen, eenmaal bewaarde confetti: juiste leerbehoefte, juiste bouwvolgorde,
bevestigen dat de eerste versie geopend is, en aankomen op de laatste stap.
Dit is een uitzondering voor deze module op de ene algemene Confetti-marker.
De animatie zelf en respect voor verminderde beweging blijven gedeeld.
