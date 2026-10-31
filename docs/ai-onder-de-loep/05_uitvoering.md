# AI onder de loep — interactieve basisversie

Uitgewerkt op 30 oktober 2026, uitsluitend in een eigen fork van het oorspronkelijke Arcadia-project. Branch: `module/ai-onder-de-loep`. Er is geen wijzigingsverzoek naar het oorspronkelijke project.

## Inhoud en route

De drie inhoudelijke Markdownbestanden vormen het archief van de vaste basisversie. De actieve inhoud staat in `src/components/loep/`: vragen en feedback in `questions.json`, route en context in `model.ts`, schermen in de React-componenten. Er zijn 35 actieve meerkeuzevragen, inclusief twee kijkvragen, plus de vier instellingen van vraag 36. De vraag over muziekaanbevelingen is op verzoek uit de route gehaald en blijft in het inhoudelijke archief. De lettervolgorde en sleutels van de Markdownbasis blijven behouden. Vraag 7, 18, 20 en 24 zijn verduidelijkt in de app; de oorspronkelijke formuleringen blijven in het archief. Vraag 9 blijft alleen in het bronarchief. Vraag 17 vervalt; 37–39 en differentiatie zijn uitgesteld. Vraag 40 en een extra eindtoets zijn niet toegevoegd.

De leerling volgt de introductie, Geloof jij AI? en AI en privacy, kiest precies twee verschillende onderwerpen uit zes en ontvangt daarna een AI-kompas en PDF. Richtduur is 60–90 minuten. De kaart in het bestaande moduleoverzicht gebruikt 75 minuten en de bestaande metadata voor tweede en derde graad. Er is één inhoudelijke versie; geen niveaukeuze of aparte leerroute naar vaardigheid.

Verbindende schermteksten zijn voor de webweergave geredigeerd. De onzekerheidsmarkeringen [G], [R] en [C] blijven in het inhoudelijke archief staan. De eigen leeromgeving toont geen technische redactienotities aan leerlingen. Onbevestigde details worden weggelaten of uitdrukkelijk als niet volledig bevestigd beschreven.

## Werkvormen

- Een sorteeroefening over AI en vaste regels, met een filmpje van Karrewiet.
- Twee kopieerbare sociale-mediavragen, een promptbouwer en een observatie zonder score. Voorbeeldantwoorden tonen dat zowel een sturende als een open vraag een genuanceerd antwoord kan krijgen. De voorbeelden zijn geen resultaten van een specifiek AI-systeem.
- Een privacyoefening waarin leerlingen een fictief bericht aanpassen en onmiddellijk het resultaat zien.
- Een fictieve klaschat met acht berichten en een filmpje van NOS Jeugdjournaal, stapsgewijs leesbaar. Vraag 14 toont de gekozen reactie van de leerling als eigen chatbericht. Geen kwetsende video is opgenomen.
- Een galerij met vier verpleegkundigen en vier chirurgen, een totaaloverzicht en een aanpasbare voorbeeldopdracht. Elk beeld is apart gegenereerd met dezelfde neutrale beroepsopdracht. Alle acht resultaten zijn behouden, zonder selectie op gewenste uitkomst. Vergroten werkt ook met toetsenbord en Escape.
- Een interactieve elektriciteitsgrafiek met schuifregelaars voor tekstvragen, Netflixuren en AI-video’s, plus een oefenvraag met feedback. De historische voorbeeldcijfers zijn 0,24 Wh (Gemini-mediaan 2025), 77 Wh (IEA-streamingraming voor 2019) en circa 115 Wh (GPU-energie van een zes seconden durende video in de IEA-test uit 2025). Klikken op een balk toont de meetgrens. Dit is geen gelijkwaardige vergelijking van volledige milieukosten en geen universele actuele waarde voor alle AI.
- Een vergelijking van individueel en gezamenlijk gebruik, plus twee fictieve datacenters, vergelijkbaar op elektriciteit, water en grondstoffen. Geen goed/foutstandpunt bij het dilemma.
- Een perspectievenoefening over relaties met AI en een ongescoorde afweging met schuifregelaars over menselijke controle.
- Een veilige simulatie met beslissingen over drie taken van een AI-agent, een fictieve betalingsbevestiging (€ 475, zonder treinkosten), een museumwebsite met zichtbaar te onderzoeken promptinjectie en vier instelbare bevoegdheden voor een agent.

## Beelden en herkomst

Alle beelden worden lokaal aangeboden als WebP; de beelden worden gecomprimeerd aangeboden. Er worden geen externe trackers of beeldverzoeken aan de leerling opgelegd. Foto’s zijn sfeerbeelden en tonen geen personen uit de beschreven incidenten.

| Bestand onder public/images/ai-onder-de-loep | Herkomst | Licentie / context |
| --- | --- | --- |
| phone.webp | [Jonas Leupe — Unsplash](https://unsplash.com/photos/person-holding-black-android-smartphone-QQ2d5naZee0) | [Unsplash License](https://unsplash.com/license); handen met smartphone bij bureau |
| privacy.webp | [Sasun Bughdaryan — Unsplash](https://unsplash.com/photos/a-padlock-rests-on-a-computer-keyboard-QP7RBa5r8HM) | Unsplash License; hangslot op toetsenbord |
| wind.webp | [Skyler Smith — Unsplash](https://unsplash.com/photos/wind-turbines-on-a-grassy-hill-under-a-cloudy-sky-JINZq4tun2o) | Unsplash License; windmolens |
| servers.webp | [Taylor Vick — Unsplash](https://unsplash.com/photos/cable-network-M5tzZtFCOfs) | Unsplash License; datacenterfoto |
| drone.webp | [adriaan venner scheepers — Unsplash](https://unsplash.com/photos/a-drone-flying-in-the-sky-Iz9u6T3VMIk) | Unsplash License; civiele drone, geen wapensysteem |
| station.webp | [Dev Benjamin — Unsplash](https://unsplash.com/photos/people-in-train-station-Q9drIcS80mo) | Unsplash License; Auckland, geen foto van Brussel |
| verpleegkundige-1.webp tot en met -4.webp | ImageGen, 30 oktober 2026 | AI-gegenereerde fictieve mensen; exacte modelversie niet meegedeeld |
| chirurg-1.webp tot en met -4.webp | ImageGen, 30 oktober 2026 | AI-gegenereerde fictieve mensen; exacte modelversie niet meegedeeld |

Exacte opdracht voor elk van de vier verpleegkundige-beelden: **Maak een realistische afbeelding van een verpleegkundige aan het werk in een ziekenhuis.**

Exacte opdracht voor elk van de vier chirurg-beelden: **Maak een realistische afbeelding van een chirurg aan het werk in een ziekenhuis.**

De gebruikte tool was de ingebouwde ImageGen. De afzonderlijke promptregistratie staat ook in `gegenereerde-beelden.json` naast de beelden. Uiterlijk is geen betrouwbare vaststelling van genderidentiteit of afkomst; de leerling onderzoekt de voorstelling van mensen, zonder uit acht voorbeelden uitspraken over alle AI af te leiden.

## Voortgang, feedback en PDF

Voortgang en antwoorden blijven lokaal onder `ai-leerlijn:verantwoord-gebruik:loep:v1`. Geblokkeerde opslag wordt opgevangen; de oefening blijft dan tijdens de sessie werken. Opnieuw beginnen wist alleen de voortgang van deze module en vraagt eerst bevestiging. Er is geen eigen backend, login of analytics. De miniatuur maakt verbinding met YouTube; de videospeler laadt na een klik via youtube-nocookie. Daarbij gelden de voorwaarden van die aanbieder.

Een antwoord moet gekozen en de feedback geopend zijn voordat de leerling verder kan. Een fout antwoord blokkeert het leren niet: de volledige uitleg en juiste keuze worden getoond en opnieuw proberen blijft mogelijk. Bij kennistaken bewaart de PDF of de eerste gecontroleerde keuze juist was, plus de laatste keuze. Er is geen totaal schoolcijfer, slaaggrens of beoordeling van meningen. De instellingentaak vergelijkt met vier aanbevolen instellingen; een strengere instelling wordt niet automatisch onveilig genoemd.

De PDF komt pas beschikbaar na de introductie, twee verplichte en twee gekozen uitdagingen, inclusief vereiste observaties en antwoorden. De controle kijkt naar voltooide onderdelen, niet alleen geopende schermen. Het document bevat de naam, werkelijk gevolgde vier uitdagingen, hun kompasinzichten, antwoordresultaten en tijdlijn. De naam staat alleen tijdelijk in het schermgeheugen en in de gedownloade PDF, nooit in localStorage of een server. Het PDF is een leerbewijs van deelname, geen beveiligd certificaat. Uitgebreide fraudebeperking blijft geparkeerd.

Reflectie en upload gebeuren uitsluitend in het aparte formulier. De bestaande centrale instelling `eindformulier` staat nog op `null`; de module vermeldt dan dat de link via school volgt. Er is geen formulierlink geraden.

## Inpassing in het oorspronkelijke project

De bestaande modulekaart `verantwoord-gebruik` is beschikbaar gemaakt als AI onder de loep. De URL blijft `/ai-leerlijn/modules/verantwoord-gebruik/`. Deze module heeft een eigen Astro-route en React-speler, omdat de bestaande MDX-speler één tak laat kiezen en hier twee keuzes uit zes nodig zijn. De generieke route sluit daarom alleen dit module-ID uit. Andere modules blijven op de bestaande speler. De Arcadia-tokens, lokale lettertypen, hoofding en kleuren blijven behouden. jsPDF wordt pas bij downloaden geladen.

De site-URL in deze fork is aangepast naar `https://jasper870809.github.io`; het basispad blijft `/ai-leerlijn`. Dat configureert de bouw maar schakelt GitHub Pages niet zelf in. Een online publicatie hangt af van de Pages-instellingen van deze eigen fork. Er is geen publicatie of merge in het oorspronkelijke project uitgevoerd.

GitHub schakelt Issues standaard uit in deze nieuwe fork. Een poging om het module-issue te maken gaf HTTP 410 (Issues disabled). Daarom wordt de concrete scope en controle in deze uitvoeringsnota en de pull request bewaard. De code wordt op de eigen branch geleverd; geen upstream-issue of upstream-PR is aangemaakt.

## Nog open voor ingebruikname

- De filmpjes [Karrewiet: Hoe werkt AI?](https://www.youtube.com/watch?v=IsrnnWOGkqk) en [NOS Jeugdjournaal: Kun jij nog zien of een video echt is?](https://www.youtube.com/watch?v=uHaJH0ojL8s) staan in het leerpad, met tekstalternatief en link. De acht uitdagingen bevatten uitklapbare bronkaarten. Een passend kort Pano-fragment met gecontroleerde tijdcodes is nog niet vastgesteld; de achtergrondbron blijft wel bereikbaar. Controleer het afspelen ook op leerlingentoestellen.
- Details van het Replit-incident buiten de bevestigde maatregel zijn niet als vaststaande feiten uitgebreid. De casus bevat de expliciete bronbeperking.
- De definitieve Smartschool-link en eventuele uiterste inlevertijd ontbreken nog in de centrale projectconfiguratie.
- 60–90 minuten is een didactische raming. Na toevoeging van de nieuwe oefeningen is een tijdtest met leerlingen nodig.

## Lokaal openen

Gebruik Node 22.12 of nieuwer. Vanuit de projectmap:

```sh
npm ci
npm run dev
```

Open de door Astro getoonde lokale URL en kies **AI onder de loep**. De controles zijn `npm run check` en `npm run build`. Een overzicht van de werkelijk uitgevoerde controles staat in `06_controle.md`.


## Verbeteringen na de leerlinggerichte controle

De start en alle acht uitdagingen zijn aangescherpt op taal, samenhang, brongebruik en instructies. De startvraag gaat nu over veranderende aanbevelingen; het AI-experiment laat twee antwoorden vergelijken. Bij privacy is de voorbeeldzin vereenvoudigd en wordt de aanpassing direct getoond. De fictieve fout vóór vraag 31 is toegevoegd, en de agentoefening gebruikt verzonnen testgegevens. De milieuvergelijking geeft de meetgrenzen en het doel van de rekensom nadrukkelijker weer.

De startvraag en de observatie bij het AI-experiment zijn inhoudelijk gewijzigd. Wie de oudere versie op hetzelfde toestel hervat, krijgt deze twee vernieuwde onderdelen opnieuw aangeboden; andere opgeslagen antwoorden blijven behouden. Sommige interactieve schermen bewaren dat de oefening is afgerond, maar niet elke tussentijdse instelling; dat staat bij terugkeer vermeld.

Een passend kort Pano-fragment met gecontroleerde tijdcodes en de definitieve formulierlink zijn nog niet beschikbaar. De tijdsduur en toegankelijkheid moeten met leerlingen en op schooltoestellen worden getest.

De kennismaking start met het filmpje van Karrewiet, gevolgd door twee kijkvragen en zes voorbeelden met schuifregelaars. De video kan in de module of via de videolink worden geopend. De miniatuur is afkomstig van YouTube en wordt al bij het tonen van het videoscherm geladen; de videospeler zelf wordt pas na een klik geladen.

### Beelden bij de ordenoefening ‘Hoe leert AI?’

De afbeeldingen van een hond en een kat zijn illustratieve voorbeelden; ze worden niet voorgesteld als echte trainingsdata. De bestanden `hond-leren.webp` en `kat-leren.webp` zijn uitsneden van foto's via Unsplash: [hond](https://unsplash.com/photos/Sg3XwuEpybU) en [kat, Manja Vitolic](https://unsplash.com/photos/gKXKBY-C-Dk). Gebruik onder de [Unsplash-licentie](https://unsplash.com/license).
