# Vibecoding basis — inhoud en uitvoering

Doelgroep: tweede en derde graad, alle finaliteiten; geen programmeerkennis.
Duur: ongeveer 70 minuten, buiten nulmeting en Smartschoolbevraging.

## Didactische afspraken

Eerst de behoefte (wat heb ik nodig om te leren?), daarna onderzoeken of en
hoe een digitaal hulpmiddel helpt. Bestaande hulpmiddelen kort onderzoeken;
zelf bouwen is niet altijd de beste oplossing. Bij een ongeschikte behoefte
keert de leerling terug om een andere te kiezen.

Vier inspiratiekeuzes: woorden/begrippen, oefeningen, mondeling, werkwijze.
Eigen gecontroleerde leerinhoud of passend startpakket, zonder persoonsgegevens.
AI mag inhoud voorstellen als de leerling die met bronnen kan controleren.
Een mondeling heeft controlepunten, geen automatisch oordeel over spraak.

Kennismaking via Noor en haar woordenquiz. Het stappenoverzicht onderscheidt
behoefte, oplossing bedenken, bouwen en testen/verbeteren. Het aanklikbare spectrum
breidt dezelfde quiz uit: lokaal bestand, online delen, externe diensten,
en een databank. De pijl loopt van klein beginnen naar meer mogelijkheden,
zonder een vaste moeilijkheidsladder te suggereren. Basis blijft een lokale quiz.

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
