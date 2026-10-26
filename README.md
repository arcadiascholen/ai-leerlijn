# AI-leerpad Arcadia Scholen

Een digitaal leerpad over artificiële intelligentie voor de leerlingen van de
vier scholen van Arcadia Scholen. De leerlingen doorlopen het thuis, op hun
laptop, op **dinsdag 10 november 2026**. Daarna groeit het uit tot een
doorlopende AI-leerlijn.

**Site:** <https://arcadiascholen.github.io/ai-leerlijn/> (online vanaf de
eerste publicatie)

## Hoe het werkt voor een leerling

1. Een korte nulmeting in Smartschool.
2. Op deze site een module kiezen en doorlopen: ongeveer 70 minuten, in korte
   stappen met veel vragen.
3. Het eindformulier in Smartschool invullen. Dat is één formulier voor alle
   modules; de klastitularis ziet in het LVS wie heeft ingediend.

De site zelf vraagt geen login en bewaart geen gegevens van leerlingen.

## Inhoud aanleveren

Werk je een module uit? Lever ze aan **in de vorm die jou het best past**:
een Word-document, een PowerPoint, een Bookwidgets-link of gewoon tekst. Er is
geen sjabloon. Je inhoud wordt hier omgezet naar korte stappen in de stijl van
de site. Wat jij als vraag of oefening voorzag, blijft erin.

Bezorg je materiaal via het Teams-kanaal **AI-leerlijn** van ARC ICT WG.

Dit helpt bij het omzetten:

- **Voor wie:** welke graad, en hoe moeilijk (1 tot 4 sterren).
- **AI-gebruik:** gebruikt de leerling zelf AI, bekijkt de leerling alleen
  voorbeelden, of komt er geen AI aan te pas?
- **Kort en actief:** denk in korte stappen. Eén idee of één vraag per scherm
  werkt beter dan een lange tekst.
- **Beelden:** vermeld waar ze vandaan komen en of we ze mogen gebruiken.
- **Video's:** geef een link naar YouTube of Stream, geen videobestand.
- **Geen persoonsgegevens:** geen namen of foto's van leerlingen of collega's.

## Voor wie aan de site bouwt

De specificatie staat in [`docs/BRIEFING.md`](docs/BRIEFING.md). Het werk loopt
via GitHub-issues en pull requests; een merge naar `main` zet de site meteen
online.

```bash
npm install
npm run dev      # http://localhost:4321/ai-leerlijn/
npm run build
```
