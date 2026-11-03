# Vibecoding basis — inhoud en uitvoering

Doelgroep: tweede en derde graad, alle finaliteiten; geen programmeerkennis.
Duur: ongeveer 70 minuten, buiten nulmeting en Smartschoolbevraging.

## Didactische afspraken

Eerst de behoefte (wat heb ik nodig om te leren?), daarna onderzoeken of en
hoe een digitaal hulpmiddel helpt. Bestaande hulpmiddelen kort onderzoeken;
zelf bouwen is niet altijd de beste oplossing. Bij een ongeschikte behoefte
keert de leerling terug om een andere te kiezen.

Bij de behoefte tonen we herkenbare leersituaties, nog geen soorten tools.
Bij de oplossing kiezen leerlingen een quiz, oefenhulp, planner, interactieve
tijdlijn, stappenhulp of eigen idee. Per type zien ze een concreet voorbeeld en
welke inhoud en afspraken nodig zijn. Eigen materiaal of passend startpakket,
zonder persoonsgegevens. AI kan tijdens het bouwen inhoud voorstellen die de
leerling nakijkt. Tijdens het gebruik bedenkt de lokale leerhulp geen nieuwe inhoud.

Kennismaking via Noor en haar woordenquiz. Het stappenoverzicht onderscheidt
behoefte, oplossing bedenken, bouwen en testen/verbeteren. Het aanklikbare spectrum
breidt dezelfde quiz uit: lokaal bestand, online delen, externe diensten,
en een databank. De pijl loopt van klein beginnen naar meer mogelijkheden,
zonder een vaste moeilijkheidsladder te suggereren. De basis blijft één lokaal HTML-bestand, ook voor een planner of tijdlijn.

De cyclus wordt benoemd als itereren en geoefend met Noor: beschrijven,
bouwen, testen, bijsturen en opnieuw testen. Slepen heeft een alternatief
met pijltjesknoppen voor het toetsenbord.

Een kort gesprek met AI gaat vóór het bouwen. Leerlingen controleren en
bewaren de samenvatting van hun bouwplan voor Smartschool. Vervolgens één
zelfstandig HTML-bestand downloaden en lokaal openen. De download- en
verbeterroute werd uitgeprobeerd met een Copilot-schoolaccount. Dezelfde
mogelijkheden zijn niet gegarandeerd voor alle leerlingen/accounts.

De testkaart bevat vier concrete onderdelen: basiswerking, leerinhoud,
onverwachte invoer en nut voor het leren. Daarna twee verbeterlussen: een
fout herstellen of leerondersteuning verbeteren, met tips per richting.
Geen fout vinden is geen reden om klaar te zijn. Elke wijziging opnieuw testen.

## Techniek

Eén MDX-module met 30 stappen in de bestaande stappenspeler. De modulegebonden
Vibe-islands delen alleen browsertoestand (`ai-leerlijn:vibecoding:werk`).
Geen backend of nieuwe externe diensten. Keuzes en tekst worden direct bewaard;
een volledige herstart gebruikt de bestaande bevestigingsdialoog en opslagwisser.
De nieuwe component is uitsluitend toegevoegd aan de MDX-componentenlijst;
bestaande modules en algemene samenvatting behouden hun werking.

De laatste stap genereert een downloadbaar A4-PDF-verslag lokaal met letterlijke
antwoorden en keuzes. Lege antwoorden worden gemeld met teruglinks; export blijft
mogelijk bij blokkades. PDF-pagina's zijn gerenderde afbeeldingen om Unicode te
behouden; de tekst is daardoor niet selecteerbaar. Een volledige tekstversie is
ook beschikbaar om te kopiëren (toegankelijk alternatief). HTML is een apart bestand.

## Nog niet in deze scope

Gevorderd: publiceren, databanken/accounts, diepere kwaliteitscontrole,
beveiliging, technische schuld. De Claude-instructies zijn niet geconverteerd.
Geen pull request of merge naar de gezamenlijke website zonder opdracht.


## Herwerking na leerlinggerichte review

De praktische start toont alle kaarten direct. De eerste uitleg gebruikt één
voorbeeld: Noor leert Engelse woorden en wil zichzelf overhoren zonder de
vertaling al te zien. Stap 6 biedt alleen inspiratie. In stap 7 beschrijft de leerling de eigen behoefte,
met optionele uitleg over het verschil tussen behoefte en oplossing.
Het spectrum legt uit dat meer functies ook meer werk en controle vragen.
Geen extra fasetiteltjes. Voorbeelden bij tests en verbetertips staan achter
een herkenbare knop, met een groen voorbeeldkader na openen. De tipkeuze staat
boven de tips en verandert de gekozen leerroute niet. Alleen de HTML-route blijft.
Eigen lesbestanden gaan rechtstreeks naar AI, niet naar het leerpad.
In leerlingteksten worden geen puntkomma's als leesteken gebruikt.

## Wegwijzer en volgorde

Stap 8 bedenkt een mogelijke oplossing. Stap 9 onderzoekt bestaand aanbod.
De vaste compacte wegwijzer markeert behoefte, oplossing, bouwen of testen en
verbeteren. De eerste vijf stappen tonen kennismaking. Teruglinks vanuit het
verslag volgen de gewijzigde stapvolgorde. Bestaande antwoorden blijven bewaard.

Stap 7 en 8 laten leerlingen vrij formuleren. Optionele schrijfhulp toont
aanvulzinnen en Noor als voorbeeld, zonder antwoorden automatisch in te vullen.
Stap 8 heeft twee keuzes. Wie nog geen mogelijkheid ziet, krijgt een duidelijke
route via inspiratie of een andere leerbehoefte. De keuze Misschien vervalt.

Stap 9 is een korte informatieve tip: kijk voortaan eerst naar bestaande
hulpmiddelen. In deze opdracht gaat de leerling verder met het eigen idee.
Geen verplichte zoekopdracht of antwoordveld, ook niet in het eindverslag.

Bij oplossing bedenken wordt vooraf uitgelegd dat de basisleerhulp werkt met
meegegeven inhoud en geen ingebouwde generatieve AI heeft. Bij het vrije
antwoord staat een check of de beschikbare leerstof ook de nodige antwoorden,
oplossingen of controlepunten bevat. Geen extra invulveld of bestandsvereiste.

Stap 16 vraagt geen toolkeuze meer. Vóór de prompt staan kopiëren naar de
gekozen AI-chat, vijf minuten overleggen en zelf stoppen om verder te gaan,
ook als AI blijft doorvragen. Het verslag bevat geen ontbrekende toolkeuze.

Eigen materiaal vereist geen extra bevestigingsknop en geen bestandsbeschrijving.
Stap 13 is voor eigen materiaal alleen een korte klaarlegcheck, voor startpakketten
blijft de inhoud bewerkbaar. De bouwprompt vraagt het materiaal rechtstreeks.
De verwijderde bestandsbeschrijving telt niet mee als ontbrekend antwoord in het verslag.

Drie interacties verrijken bestaande stappen zonder nieuwe schermen: Noors
leerbehoefte herkennen met feedback (2), werkende woordenquiz in het eerste
spectrumonderdeel (5), en drie ideeën beoordelen op basisscope (10).
Oefenfeedback blijft lokaal en telt niet mee als verplicht verslagantwoord.
De bewust foutieve testquiz in stap 21 blijft apart behouden.

De losse stap 10 is geschrapt. Het leerpad telt nu 29 stappen. Stap 8 biedt
vier concrete hulpmiddeltypes en een eigen idee, gevolgd door één beschrijving.
Alleen het eigen idee vraagt de twee haalbaarheidschecks. Voor iedereen blijft
een korte materiaalreminder staan. Het AI-overleg gebruikt direct de oplossing
uit stap 8. Teruglinks en verslagvelden zijn aangepast aan de nieuwe nummering.

Stap 8 vereist een hulpmiddelkeuze en een niet-lege oplossingsbeschrijving.
Bij een eigen idee zijn ook beide checks vereist. Een aparte hulpknop
Ik heb nog geen idee biedt inspiratie en een terugweg naar de leerbehoefte.
De twee materiaalstappen zijn samengevoegd op stap 11, met bewerkbaar startpakket.
Er zijn nu 28 stappen. Rapportteruglinks volgen de nieuwe nummering.

Ook de aparte inleiding over leerstof is samengevoegd met materiaal klaarleggen.
Stap 10 bevat nu eigen materiaal én startpakket kiezen, lezen en aanpassen.
Het leerpad telt 27 stappen. Teruglinks naar materiaal en latere antwoorden
zijn opnieuw aangepast.

De hulpmiddelcategorie uit stap 8 bepaalt testvoorbeelden en verbetertips.
Startpakketten hebben een aparte inhoudskeuze en overschrijven die categorie
niet. Voorgestelde hulpmiddelen krijgen hun bijpassende pakket. Een eigen idee
kan inhoud kiezen en behoudt algemene testtips. Bij wijziging van hulpmiddel
wordt een eerder gekozen startpakket opnieuw gekozen om verwarring te voorkomen.

Er zijn drie startpakketten per hulpmiddeltype, twaalf in totaal, inclusief
controlepunten. Eerst een pakket openen en nalezen, daarna expliciet bevestigen.
Een ander pakket openen vraagt opnieuw bevestiging. Pakketkeuze is apart van
hulpmiddelcategorie. Eigen ideeën kunnen eerst een inhoudscategorie kiezen.

## Rustigere presentatie

De goedgekeurde indeling van stap 2 en 8 is doorgetrokken: uitleg links,
handelingen en antwoorden rechts, met een gestapelde weergave op smallere
vensters. Demo en spectrum houden hun eigen passende indeling. De 27 stappen,
antwoordvelden, verplichte checks, routeafhankelijke voorbeelden, prompts en
PDF-flow zijn behouden. Extra toelichting staat bij de uitleg. De inhoudscategorie
bij eigen ideeën gebruikt dezelfde keuzes in een benoemde select. Startpakketten
blijven afzonderlijk te openen en expliciet te bevestigen. Visuele en functionele
controle is vastgelegd in `design-qa.md`.


## Feedbackronde: behoefte, afbakening en zelfstandig verder kunnen

De actuele versie telt 29 stappen. Stap 6 verkent behoeften zonder een tool te
kiezen. Stap 8 toont vijf soorten leerhulpen plus een eigen idee. Bij elk type
staan een voorbeeld en het benodigde materiaal. De uitleg maakt onderscheid
tussen AI tijdens het bouwen en AI tijdens het gebruik. Via ‘Kan mijn idee ook?’
kan een leerling een groter idee terugbrengen tot een haalbare eerste versie.
Stap 10 bevat drie passende pakketten per nieuw type, vijftien in totaal.
Eerdere mondelingroutes blijven leesbaar voor al opgeslagen voortgang.

Nieuw vóór de eerste prompt: een geel aandachtsscherm op stap 13. Leerlingen
houden leerpad en AI-chat in aparte tabbladen open. Op de prompt- en
verbeterschermen staat wanneer ze naar AI gaan en terugkomen. Iedere hoofd- en
verbeterprompt krijgt uitklapbare uitleg over wat de leerling ervan kan leren.
Stap 28 bevat een terugblik en acht gouden prompttips, inclusief de vraag om
één downloadbaar, zelfstandig HTML-bestand en een volledige bijgewerkte versie.

Het eindverslag bevat de letterlijke antwoorden, de geheugensteun, de prompttips
en een tijdlijn. Bezoekmomenten worden alleen vastgelegd voor zichtbare stappen.
Eerste antwoordmomenten gebruiken de bestaande `writeAnswer`/`readAnswer`
registratie. Oude antwoorden worden niet voorzien van verzonnen historische
momenten. De bestaande module-startregistratie wordt hergebruikt. Deze gegevens
staan alleen in de browser en de eigen PDF, en meten geen actieve werktijd.

De PDF-knop blijft geblokkeerd totdat verplichte tekstvelden, hulpmiddelkeuze,
materiaalkeuze en de twee gesloten oefeningen compleet zijn. Alleen een gekozen
startpakket vereist het inhoudsveld. Ontbrekende onderdelen linken naar de
juiste stap via een centrale stapmapping. Het HTML-bestand wordt apart met de PDF
ingediend. Er is geen upload, ZIP of HTML-codebijlage aan het leerpad toegevoegd.

## Optioneel brainstormen vóór de oplossing

Het aandachtsscherm over twee tabbladen staat nu op stap 8, direct na de
leerbehoefte. De oplossingskeuze is stap 9, materiaal is stap 11 en de
volgorde-oefening is stap 13. Vanaf het overleg op stap 14 blijft de nummering
hetzelfde. De centrale stapmapping volgt de nieuwe volgorde.

Op de oplossingsstap opent ‘Laat AI meedenken’ een optioneel dialoogvenster.
Zonder ingevulde behoefte verwijst dit terug. De prompt bevat het schoolwerk,
wat lastig is, de behoefte en een eventueel voorlopig idee. AI mag maximaal
drie haalbare ideeën voorstellen, met benodigde inhoud en afspraken, en nog
geen code schrijven. De grenzen blijven één lokaal HTML-bestand, zonder
internet, online diensten, accounts of ingebouwde AI. De leerling keert na
ongeveer drie minuten terug en maakt zelf een keuze. Dit is geen extra
verplicht antwoord. Bij het latere overleg kan de leerling in hetzelfde gesprek
verderwerken of alsnog een nieuw gesprek beginnen.

Bij Verder ontdekken staat Lovable als optioneel voorbeeld van een bouwtool.
De verplichte opdracht blijft de bestaande lokale HTML-route met een toegelaten
AI-chattool. De link naar Vibe Coden voor docenten benoemt de oorspronkelijke
doelgroep en is bedoeld als verdere inspiratie.

## Vereenvoudiging na nieuwe leerlingfeedback

De actuele route telt 32 stappen. Het spectrum op stap 5 gebruikt benoemde
voorbeelden, zonder extra invuloefening. Stap 6 gebruikt nu ‘Structuur
aanbrengen’ en het planningsprobleem is niet langer aan geschiedenis gekoppeld.

Stap 8 legt met drie aanklikbare voorbeelden uit wat tijdens het gebruik wel en
niet bij de basisversie hoort: samenvattingen, hints en quizvragen. Steeds staat
erbij hoe vooraf meegegeven inhoud dezelfde behoefte kan ondersteunen. Stap 9
richt zich daarna op de eigen oplossing. De optionele AI-brainstorm blijft achter
een knop beschikbaar. De ingewikkelde ‘Kan mijn idee ook?’-uitleg is verwijderd.

Het gele scherm staat op stap 14, vlak vóór het overleg op stap 15. De eenvoudige
kopieerinstructie van het overleg is hersteld. De eerdere optionele brainstorm
heeft zijn eigen korte wisselinstructie. De testintroductie op stap 20 benoemt de
testfase expliciet.

Vóór het verslag staan twee aparte informatieve stappen: verder experimenteren
op stap 30 en speciale bouwtools op stap 31. De eerste benadrukt dat uitbreiden
niet nodig is voor deze opdracht, maar moedigt verder leren volgens dezelfde
cyclus aan. De tweede licht Lovable en Bolt kort toe als mogelijkheden voor
later. Het verslag is stap 32. Stapmapping, teruglinks en tijdlijntitels volgen
de nieuwe volgorde. Er zijn geen nieuwe verplichte antwoorden toegevoegd.

## Ontdekken, kiezen en beschrijven apart

Het leerpad telt nu 34 stappen. De voormalige drukke oplossingsstap is verdeeld
in stap 9 (voorbeelden ontdekken en optioneel met AI brainstormen), stap 10
(hulpmiddel kiezen en eigen-ideechecks) en stap 11 (de oplossing beschrijven).
De uitleg over de basisversie blijft op stap 8. De goedgekeurde brainstormprompt
blijft behouden en is ook zonder ingevulde behoefte zichtbaar met invulplekken.

Een voorbeeld op stap 9 aanklikken verandert de bewaarde hulpmiddelkeuze niet.
Stap 10 vereist een keuze, plus beide checks bij een eigen idee. Stap 11 vereist
een geldige keuze en een niet-lege beschrijving. Bestaande antwoorden blijven
bewaard. De hulpmiddelcategorie blijft de pakketten en testtips bepalen.

Materiaal staat op stap 13 en verwijst naar de keuze op stap 10. Teruglinks vanuit
het verslag verwijzen voor de keuze naar stap 10 en voor de beschrijving naar
stap 11. De centrale mapping en tijdlijn volgen alle 34 stappen.

### Optionele brainstorm apart
Stap 9 blijft inspiratie. Stap 10 toont een optionele AI-brainstorm met zichtbare prompt en een overslaanknop naar stap 11. Bij de hulpmiddelkeuze verschijnt het voorbeeld direct onder de keuzes rechts. Stap 12 blijft de eigen beschrijving. De 35 stappen delen dezelfde nummering voor voortgang en verslag.

### Geen vooraf klaargezet materiaal
Planners en eigen ideeën kunnen expliciet kiezen dat vooraf geen materiaal nodig is. Die keuze telt mee voor voortgang en eindverslag. De overleg-, samenvattings- en bouwprompts ondersteunen latere invoer en vragen dan geen leerstof op. Bij eigen ideeën blijft alleen de check op een basisversie zonder ingebouwde AI of diensten verplicht. Elk kopieerbaar promptvak heeft een zichtbaar label.
