# UX-controle vibecoding

## Visueel uitgangspunt en bewijs

- Bron: `../output/vibecoding-stap2-rustig.png` en `../output/vibecoding-stap8-twee-kolommen.png`, de goedgekeurde indeling.
- Referentie en implementatie naast elkaar: `../output/ux-review/reference-comparison.png`.
- Volledige schermen: `../output/ux-review/step-1.png` t/m `step-27.png`.
- Aanvullende toestanden: `own-idea.png` en `own-package.png` in dezelfde map.
- Viewport: 1366 × 640 CSS-pixels. Bron en implementatie zijn 1366 × 640 pixels, zonder bijsnijden. Vergelijking normaliseert beide naar dezelfde schaal. De contactbladen zijn alleen een overzicht.
- Toestand bij de bronvergelijking: stap 2, nog geen antwoord gekozen. De tijdelijke cursor/opbouwanimatie in de oudere bron is geen onderdeel van het eindontwerp.
- De andere schermen volgen de goedgekeurde compositie, geen letterlijke kopie van de inhoud van stap 2.

## Bevindingen en herstelgeschiedenis

1. [P2, opgelost] De eerste tweekolomsversie had te veel hoogte op stappen 6, 7, 10, 12 en 16. Voorbeelden en aanwijzingen zijn bij de uitleg gegroepeerd. Afstanden, kolombreedten en veldhoogten zijn aangepast zonder gewone instructietekst kleiner te maken. De materiaalpreview heeft een eigen scrollvlak. Nieuwe volledige screenshots tonen bereikbare acties.
2. [P2, opgelost] Bij een eigen idee namen de uitgebreide checktoelichtingen ruimte in vóór het antwoordveld. Checkboxvoorwaarden zijn behouden, de extra toelichting staat in de bestaande hulp. Beide vinkjes blijven verplicht.
3. [P2, opgelost] Materiaalkeuze, typekeuze en pakketpreview liepen in elkaar over. De bronkeuze staat links. Rechts zijn type en pakket duidelijk benoemd en gescheiden. De typekeuze voor eigen ideeën is een benoemde select met dezelfde opties en updates. Bevestiging van het concrete pakket blijft verplicht.
4. [P2, opgelost] Een ontbrekend bouwplan samen met eigen-materiaalinstructies veroorzaakte extra hoogte. Alleen de waarschuwing is hulptekst. De uploadinstructies houden bodygrootte. De bestaande terugval bij onleesbare bestanden staat in uitklapbare hulp.

## Visuele controle

- Typografie: bestaande Figtree, body 17/26, hulptekst 15/22. Prompts blijven in het bestaande monospacefont. Labels zijn aan invoervelden gekoppeld.
- Layout: consistent uitleg links en handeling rechts. Afstanden, randen en radii volgen tokens. Demo en spectrum behouden passende volle breedte. Op smallere vensters staan de kolommen onder elkaar.
- Kleuren: uitsluitend bestaande tokens, bestaande rode/groene antwoordfeedback behouden. Geen nieuwe palette of afbeeldingstijl.
- Assets: bestaand logo en fonts behouden, geen vervangende of nieuwe beeldassets.
- Inhoud: alle oorspronkelijke antwoordvelden, opties, startpakketten en promptinhoud blijven beschikbaar. Alleen visuele groepering en plaatsing van hulp is gewijzigd. Een dubbele uitleg over de inhoudscategorie is samengenomen.
- De 27 normale schermtoestanden passen binnen de kaart op laptopformaat. Langere pakketinhoud en lange hulp zijn leesbaar via de bestaande uitklap-/scrollmogelijkheden.

## Functionele controle in aparte testweergave

- Onjuist/juist antwoord over Noor: feedback en blokkering van Volgende.
- Eigen idee: verplichte checks en oplossingsbeschrijving, inclusief opnieuw blokkeren bij uitvinken.
- Antwoorden blijven bewaard en worden meegenomen naar de kopieerbare AI-prompt.
- Pakkettype, preview, bevestigen en wisselen: Volgende komt pas vrij na bevestiging.
- Sorteeroefening: foutieve volgorde blokkeert, juiste volgorde geeft vrij.
- PDF-download voltooid en succesmelding getoond.
- Browserconsole: geen fouten in de gecontroleerde interacties.
- Astro build geslaagd, Astro check zonder fouten of waarschuwingen.

## Resterend

Geen open P0/P1/P2 in de gecontroleerde laptoptoestanden. Dit is een desktopleerpad. Langere zelfgeschreven antwoorden blijven binnen resizable/scrollbare velden leesbaar.

final result: passed

## Feedbackronde 2 november 2026

- Nieuwe behoeftevoorbeelden op stap 6 kiezen geen hulpmiddelcategorie.
- Stap 8 bevat vijf soorten leerhulpen en een eigen idee, met concrete voorbeelden en benodigd materiaal. Eigen checks blijven verplicht.
- Alle vijf types tonen drie passende startpakketten. Preview bevestigt de keuze niet. Een wijziging van hulpmiddel vraagt opnieuw materiaalbevestiging.
- Eigen idee met tijdlijnmateriaal behoudt algemene testtips. De materiaalcategorie overschrijft het eigen idee niet.
- De overgang met twee tabbladen, prompttoelichtingen en afsluitende spiekbrief zijn op laptopformaat gecontroleerd.
- De module telt 29 stappen. De centrale stapmapping is vergeleken met alle MDX-panes. Teruglinks en tijdlijntitels volgen die volgorde.
- Noor: onjuist antwoord blokkeert, juist antwoord opent Volgende. Het antwoord blijft nu ook na herladen bewaard.
- Sorteeroefening: foutieve volgorde blokkeert, juiste volgorde opent Volgende.
- De PDF blijft geblokkeerd tot het laatste verplichte antwoord. Aanvullen linkt naar de juiste stap. Een antwoord weer leegmaken blokkeert opnieuw.
- Eigen materiaal vereist geen ongebruikt startpakketveld. Een bevestigd startpakket vereist wel de inhoud.
- PDF daadwerkelijk gedownload en de pagina-afbeeldingen geïnspecteerd: antwoorden, prompttips en chronologische bezoek-/antwoordmomenten staan erin. Woorden worden niet meer middenin afgebroken, tenzij één woord breder is dan de hele regel.
- Bewijsbestanden voor deze controle staan lokaal in `../output/feedback-flow/`. De test gebruikt een apart lokaal adres en wijzigt de gewone leerlingantwoorden niet.
- Geen browserconsolefouten in de gecontroleerde interacties. Build en Astro check geslaagd.

### Optionele brainstorm en verplaatste introductie

- Het aandachtsscherm staat vóór de eerste mogelijke AI-prompt. MDX en centrale stapmapping komen overeen voor alle 29 stappen.
- Nieuw dialoogvenster op stap 9: open/sluiten, Escape, terugkeer naar de oplossing en ontbrekende-behoefteroute getest.
- Kopieeractie geeft de volledige nieuwe prompt met eigen behoefte, maximaal drie voorstellen, materiaalvereisten, offlinegrenzen en verbod op alvast bouwen.
- De brainstorm is optioneel en voegt geen verplicht verslagveld toe. Bestaande eigen-ideechecks en materiaalkeuzes blijven werken.
- De vervolgtekst op stap 14 benoemt zowel doorgaan in hetzelfde gesprek als een nieuw gesprek beginnen.
- Materiaalverwijzing noemt nu correct stap 9. Lovable staat bij de optionele verdere inspiratie.
- De oplossingsstap en het brainstormvenster passen op 1366 × 640. Screenshot: `../output/feedback-flow/optioneel-brainstormen.png`.
- Astro check: 48 bestanden, geen fouten, waarschuwingen of hints. Build geslaagd. Geen browserconsolefouten tijdens de controles.

### Vereenvoudiging van uitleg en aparte afsluiters

- Alle 32 MDX-panes vergeleken met de centrale stapmapping.
- Stap 5: vier niveaus blijven klikbaar, eerste niveau is nu een toegelicht voorbeeld zonder invuloefening.
- Nieuwe stap 8: alle drie voorbeelden (samenvatting, hint, quizvragen) aangeklikt en beide uitkomsten gecontroleerd.
- Stap 9: eenvoudiger context, korte afbakening en bestaande optionele brainstorm. De ingewikkelde extra uitleg is verwijderd.
- Het gele scherm staat direct vóór de herstelde overleginstructie. De testintro noemt nu de testfase.
- De twee nieuwe afsluiters staan direct vóór het verslag. De verplichte velden en downloadvoorwaarden zijn behouden.
- Alle gewijzigde schermen gecontroleerd op 1366 × 640 zonder scrollen van de stapkaart. Geen browserconsolefouten. Astro check en build geslaagd.
- Screenshots: `../output/feedback-flow/clarified-step-5.png`, `clarified-step-9.png`, `clarified-step-30.png`, `clarified-step-31.png`.

### Brainstormprompt zichtbaar zonder ingevulde behoefte

De prompt werd eerder vervangen door een terugverwijzing als de behoefte leeg
was. Dat is hersteld: de prompt blijft altijd zichtbaar en kopieerbaar, met
invulplekken voor ontbrekende informatie. Met een lege behoefte in het gewone
testvenster gecontroleerd dat de tekst expliciet vibe coden, een eenvoudige
interactieve tool, geen integraties en nog niet bouwen bevat. Astro check en
build geslaagd. Screenshot: `../output/feedback-flow/brainstormprompt-altijd-zichtbaar.png`.

### Drie korte schermen voor de oplossingsfase

- Stap 9: voorbeelden aanklikken is vrijblijvend en verandert de bewaarde keuze niet. Brainstormprompt blijft bereikbaar.
- Stap 10: eigen idee blokkeert tot beide checks aanstaan. Reguliere hulpmiddelkeuze kan door zonder al een beschrijving te schrijven.
- Stap 11: lege beschrijving blokkeert Volgende, ingevulde beschrijving geeft vrij. Het verslag verwijst correct terug naar stap 11.
- De nieuwe MDX-volgorde is vergeleken met alle 34 stappen in de centrale mapping. Pakketten verwijzen naar de keuze op stap 10.
- Astro check zonder fouten, waarschuwingen of hints. Build geslaagd. Geen browserconsolefouten.
- Screenshots: `../output/feedback-flow/oplossing-ontdekken.png`, `oplossing-kiezen.png`, `oplossing-beschrijven.png`.
