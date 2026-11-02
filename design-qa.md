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
