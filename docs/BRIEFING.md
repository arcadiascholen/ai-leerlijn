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
   gekozen module als eerste vraag. Het bevat een korte reflectie en
   optioneel een bestand (screenshot, chatverslag, eigen werk). De resultaten
   komen in het LVS, zodat klastitularissen zien wie heeft ingediend. De
   startpagina (stap 3) en de samenvatting aan het einde van een module
   linken ernaar.

De vier scholen werken op **één Smartschool-platform**: er is geen
schoolkeuze, en elke link is voor iedereen dezelfde. De links naar de
nulmeting en het eindformulier, en het uur waarop het eindformulier
ingediend moet zijn, staan op één plek: `src/config/smartschool.ts` (zie
§ 12, *Links naar Smartschool*).

De site zelf verwerkt **geen persoonsgegevens**. Alles wat ingediend wordt,
gaat via Smartschool. De site heeft geen backend, geen login, geen analytics
en geen cookies.

## 5. Modules

### Aanbod (stand 28 oktober 2026)

| Module | Graad | Status | Bestand(en) |
|---|---|---|---|
| Wat is AI? AI herkennen en begrijpen | 2e, met differentiatie | wordt aangeleverd | `wat-is-ai` |
| AI als hulpmiddel bij het leren: AI als coach | 2e en 3e, basis tot moeilijk | 3e graad beschikbaar met de takken schriftelijke toets, mondeling examen, debat of presentatie en examenplanning; de 2e graad in opbouw in deze repo | `ai-als-coach-2e-graad`, `ai-als-coach-3e-graad` |
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
De testmodule `voorbeeld` toont elk component en blijft beschikbaar tot de
laatste technische controle op maandag 9 november (§ 10); dan verdwijnt ze
uit het aanbod.

### Aanleveren zonder sjabloon

Collega's leveren hun inhoud aan **in de vorm die hun past**: Word,
PowerPoint, een Bookwidgets-link, een tekst in Teams. Er is bewust geen
sjabloon. Het integreren gebeurt achteraf in deze repo: de inhoud wordt
omgezet naar korte stappen, krijgt de juiste metadata en gebruikt de
componenten van de site. Bij dat omzetten blijft de didactische bedoeling van
de auteur leidend; vragen en oefeningen die de auteur voorzag, vallen niet
stilzwijgend weg.

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
| `status` | `binnenkort` of `beschikbaar` | Een module die nog niet klaar is, staat zichtbaar maar niet klikbaar in het overzicht en krijgt geen eigen pagina |
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
- Met de zeven kaarten van nu past het overzicht op 1366 × 640. Houd `kort`
  op ongeveer 60 tekens (twee regels op een kaart) en de titel op hoogstens
  twee regels; wat langer is of meer kaarten vraagt, laat deze pagina
  scrollen. Dat mag hier: het is geen stap.

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
- **Samenvatting aan het einde.** De laatste stap toont wat de leerling
  onderweg schreef, met een knop *kopieer*. Die tekst plakt de leerling in
  het eindformulier. Zo levert de site het bewijsstuk aan zonder zelf
  gegevens te verwerken.

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
  tweede tabblad. De werkvormen zijn voor elke tool dezelfde; alleen de
  handelingen verschillen, in `<Tool>`-blokken. Die volgen de stand van de
  tools (§ 7). Waar de bron onzeker is over een knop of menu, staat er *kan
  bij jou anders heten*.
- **Per werkvorm één prompt.** De leerling kopieert een `<Prompt>` met
  invulplaatsen (`[vak]`, `[datum]`) en vult die aan in de tool. Een prompt
  geeft context (wie ben je, wat is je bron, wat wil je), geen rolprompt.
- **Wat de leerling schrijft, staat in de module.** Een score, een
  voorspelling of een reflectie gaat in een `<Reflectie>` of `<DenkEerst>`,
  zodat het in de samenvatting komt. Wat de leerling in de chat doet, komt er
  niet in; daarvoor is er het bewijsstuk (een link of een stuk van het
  gesprek, per tool).
- **Hoogte per combinatie** (gemeten op 1366 × 640): een `<Reflectie>` met
  hoogstens één regel tekst erboven; een `<Prompt>` van drie regels met twee
  regels tekst en één `<Tool>`-blok; een `<DenkEerst>` zonder inleiding; een
  `<Chat naast>` met een `<Meerkeuze>` van vier opties van twee à drie
  woorden, een vraag van één regel en feedback van hoogstens ± 70 tekens. Een
  prompt die de leerling laat antwoorden en een reflectie op dat antwoord
  staan op twee stappen.
- **Controle.** Meet elke stap van elke route, met elke tool, met de vragen
  in hun hoogste toestand (voorbeeldantwoord getoond, alle opties
  aangeklikt): de inhoud van de kaart mag niet scrollen.

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
persoonlijk account heeft of er geen mag gebruiken, gebruikt Copilot Chat met
het schoolaccount. Claude komt in de modules niet voor: de
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
| Cursus opladen | 3 uploads per dag; leest maar een deel van een lange cursus (± 12 pagina's, geen officiële bron) ([bron][chatgpt-opladen], [prijzen][chatgpt-prijzen]) | ± 32k tokens context ([bron][gemini-context]) | 50 bronnen, hele cursus, antwoorden met bronvermelding ([bron][notebook-bronnen]) | 50 MB, 20 bestanden per gesprek ([bron][copilot-opladen]) |
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
  `stap`. Een vraag bewaart haar antwoord onder `vraag:<id>`, met de `id`
  die de auteur schrijft (zie *Antwoorden bewaren* hieronder). Een
  `<Keuze>` bewaart de gekozen optie onder `keuze:<naam>` (zie *Keuzes en
  takken*).
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
  (`src/components/vragen/authoring.ts`).
- Een vergissing van de auteur laat de build falen met een duidelijke
  melding, in plaats van een kapotte vraag bij de leerling te zetten: een
  ontbrekende of dubbele `id`, een `<Meerkeuze>` zonder juiste optie, een
  optie zonder feedback, tekst tussen de tags van `<Reflectie>` of
  `<Samenvatting />`, een `<Samenvatting />` buiten de laatste stap of meer
  dan één, een link in `src/config/smartschool.ts` die geen geldig
  `https://`-adres is, een fout in een `<Keuze>`, in de takken (zie
  *Keuzes en takken*), in een `<Tool>` (zie *Instructies per tool*) of in
  een `<Prompt>` of `<Chat>` (zie *Prompts en gesprekken*).

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
- Een nieuw vraagtype krijgt een eigen `kind`. Het komt bij `StoredAnswer`
  in `answers.ts`, met een eigen controle in `isStoredAnswer`, zodat
  `readAnswer` een onvolledige waarde weigert.
- In de statische HTML draagt het buitenste element van elke vraag
  `data-question="<kind>"` (`multiple-choice`, `think-first` of
  `reflection`) en `data-question-id="<id>"`. Een vraag die in de
  samenvatting komt, draagt ook `data-question-text` met de vraag zoals ze
  nu in de module staat. Dat geldt ook voor vragen in verborgen stappen die
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

<Stap titel="Klaar! Kopieer wat je schreef">
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

De componenten staan in `src/components/inhoud/`. Geen van beide bewaart
iets.

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
- Een `<Prompt>` van drie regels met daaronder een `<Meerkeuze>` van vier
  korte opties past zolang de feedback dicht is (379 px), maar niet meer
  als alle vier de opties aangeklikt zijn (453 px): dan scrolt de kaart.

**Buildchecks**, elk met een duidelijke melding:

- een lege `<Prompt>`, en een `<Prompt>` met iets anders dan alinea's
  (een lijst, een kop, een beeld, een component);
- een lege `<Chat>`, een `<Chat>` zonder beurten, en iets anders dan
  `<Jij>` en `<AI>` in een `<Chat>`, zoals tekst buiten een beurt;
  `<Chat>` rendert zijn kinderen en leest ze terug, zoals `<Meerkeuze>`
  met zijn opties doet;
- een lege `<Jij>` of `<AI>`;
- een `<Jij>` of `<AI>` buiten een `<Chat>`: die zou stil verdwijnen, dus
  controleert `checks.ts` dat in de bron, met de titel van de stap in de
  melding;
- `naast` met een waarde.

### De samenvatting

```mdx
<Stap titel="Klaar! Kopieer wat je schreef">
<Samenvatting />
</Stap>
```

- `<Samenvatting />` staat in de **laatste stap**, en hoogstens één keer per
  module; de build controleert beide. Ze heeft geen attributen: de naam van
  de module geeft de route mee via `Astro.locals`, de link naar het
  eindformulier komt uit `src/config/smartschool.ts`. Het component staat in
  `src/components/stappen/`.
- Ze toont de naam van de module en, in de volgorde van de module, elke
  `<DenkEerst>` en `<Reflectie>` met de vraag en het antwoord. **Meerkeuze
  komt er niet in**: alleen wat de leerling zelf schreef. Een vraag zonder
  antwoord toont *(nog niet ingevuld)* met een link naar haar stap
  (`#stap-n`). Staan er lege vragen in, dan zegt de inleiding hoeveel.
- Bovenaan staan de keuzes, één per regel en in de volgorde van de module:
  *Doel: Een schriftelijke toets*, met de `naam` van de keuze met een
  hoofdletter vooraan. Een keuze die nog open is, toont *(nog niet gekozen)*
  met een link naar haar stap.
- In een module met takken neemt de samenvatting alleen vragen en keuzes mee
  uit de route van de leerling (`routeOf`), en de links gebruiken de
  stapnummers van die route. Een vraag uit een tak die de leerling niet
  koos, staat er dus niet in, ook niet als *(nog niet ingevuld)*.
- De samenvatting leest de antwoorden telkens opnieuw wanneer haar stap
  zichtbaar wordt (een `IntersectionObserver`: de speler verbergt de andere
  stappen met `hidden`), terwijl de leerling typt in een vraag op dezelfde
  stap, en na elke keuze. Een leerling die terugkeert en een antwoord
  aanpast, ziet dus altijd de actuele tekst. Ze wacht niet op `hashchange`:
  de speler wisselt van stap met `replaceState`, en dat stuurt geen
  `hashchange`.
- *Kopieer alles* zet platte tekst op het klembord met
  `navigator.clipboard.writeText`: bovenaan `Module: <naam>`, meteen
  daaronder per keuze een regel (`Doel: Een schriftelijke toets`, of
  `Doel: (niet gekozen)`), daarna per vraag de vraag op één regel en het
  antwoord eronder, gescheiden door een lege regel. Een lege vraag krijgt `(niet ingevuld)`. Lege regels binnen
  een antwoord vallen weg, zodat een lege regel altijd een nieuwe vraag
  betekent. Zo past de tekst netjes in een tekstveld van Smartschool.
- Na het kopiëren verschijnt een bevestiging (`role="status"`, dus
  voorgelezen) en de knop *Open het eindformulier*, die Smartschool in een
  nieuw tabblad opent. Verandert een antwoord daarna, dan verdwijnen de
  bevestiging en de knop, en kopieert de leerling opnieuw.
- **Als het kopiëren mislukt** (geen veilige context, of de browser
  weigert), verschijnt zonder foutmelding de terugvaloptie: de tekst staat
  geselecteerd in een tekstveld op de plaats van de lijst, met de vraag om
  Ctrl+C te gebruiken. Kopieert de leerling uit dat veld, dan volgt dezelfde
  bevestiging.
- **Hoogte.** De lijst scrolt binnen haar eigen kader (hoogstens 13.5rem),
  zodat de knoppen altijd zichtbaar blijven, ook bij veel of lange
  antwoorden. Het terugvalveld heeft dezelfde hoogte.
- Zonder JavaScript wordt niets bewaard; de samenvatting zegt dan dat ze
  JavaScript nodig heeft.

### Links naar Smartschool

- De vier scholen werken op één Smartschool-platform, dus elke link is voor
  iedereen dezelfde. De links staan op één plek, in
  `src/config/smartschool.ts`: `nulmeting` (de vragenlijst vóór de module,
  stap 1 op de startpagina) en `eindformulier` (één formulier voor alle
  modules, stap 3 op de startpagina en de samenvatting). Daar staat ook
  `eindformulierUur`, het uur waarop het eindformulier binnen moet zijn,
  geschreven zoals de leerling het leest (`'16 uur'`).
- `null` betekent dat de waarde nog niet bekend is. De startpagina en de
  samenvatting tonen dan een duidelijke, niet-klikbare melding, zoals *De
  link naar het eindformulier volgt nog.* Wie de link invult, vult het
  volledige `https://`-adres in; daarna verschijnt de knop vanzelf. Een
  adres dat geen geldige `https://`-URL is, laat de build falen: de
  startpagina controleert beide links, de samenvatting het eindformulier.
