---
name: create-issues
description: Maak van een observatie, een wens of een lijst voorstellen GitHub-issues voor het AI-leerpad, geschreven zodat /work-issues ze zonder de gespreksgeschiedenis kan afwerken. Roep aan als /create-issues met een omschrijving ("de stappenspeler onthoudt de stap niet", "de module van de eerste graad is binnen", "we hebben een pagina over toegelaten tools nodig") of leeg, dan vraagt de skill eerst de observatie. Gebruik dit ook zonder expliciete aanroep zodra de gebruiker zegt "maak er issues van", "zet dit op de lijst", "wat moet hier gebeuren", een probleem beschrijft en om voorstellen vraagt, of meerdere stukken werk tegelijk noemt, ook als het woord issue niet valt. Dit is de tegenhanger van work-issues: deze skill levert de wachtrij, die skill werkt ze af. Deze skill voert zelf niets uit, geen code, geen tekst, geen sessies. Alleen issues.
---

# Issues maken voor het AI-leerpad

Al het werk in dit project begint bij een issue en eindigt in een PR
(`work-issues`). Deze skill is de stap ervoor: van "ik zie dit" naar een
wachtrij van issues die `work-issues` kan afwerken zonder dat iemand toekijkt.

De uitvoer is daarom precies de invoer van die skill: nummers in
afhankelijkheidsvolgorde, als één runbaar commando.

```
/work-issues 12 13 14
```

Verwant: [[work-issues]] (werkt de wachtrij af).

## De toets: een verse subagent, alleen de tekst

`work-issues` delegeert issues aan een verse `general-purpose` subagent zodra
de keuzes gemaakt zijn. Die subagent heeft dit gesprek niet gezien. Alles wat
je nu weet en niet opschrijft, moet hij koud opnieuw afleiden, of hij raadt
ernaar.

Stel bij elk issue dus één vraag: **kan een subagent dit uitvoeren met alleen
de issue-tekst en de repo?** Dat betekent concreet:

- de oorzaak is geverifieerd en staat erin, met het bewijs;
- de bestanden staan erin, met pad;
- de beslissingen die de eigenaar nog moet nemen staan genummerd klaar;
- het bewijs dat het werk klaar is, staat benoemd, niet als oordeel maar als
  waarneming;
- de afhankelijkheid van andere issues staat bovenaan.

Een issue dat de discussie van deze sessie nodig heeft om begrepen te worden,
is mislukt, hoe goed de lijst er ook uitziet.

## Stap 0 — Lezen en verifiëren vóór je schrijft

Lees `CLAUDE.md`, `docs/BRIEFING.md` en de templates onder
`.github/ISSUE_TEMPLATE/`. Haal de open issues op, zodat je niets dubbel maakt
en naar bestaande issues kunt verwijzen:

```
gh issue list --state open --limit 100 --json number,title,labels
```

**Verifieer de observatie.** De gebruiker beschrijft wat hij ziet; dat is
zelden de oorzaak. Kijk zelf voor je schrijft:

- Wat rendert: `npm run dev` en de pagina openen op 1366 × 768, of de live
  site met `curl`.
- Wat "verdwenen" is: `git log -S"<term>" -- <pad>` en `git log -p`.
  "Verdwenen" betekent zelden verwijderd; vaak is iets onzichtbaar door een
  andere oorzaak (cascade, base-pad, schema dat een veld weigert).
- Wat een eerder issue of PR al zei: `gh issue view N --json title,body` en
  `gh pr view N --json body`. Een regressie heeft een commit; noem hem.

**Botst de wens met de briefing,** noem dat in het checkpoint. Is de
afspraak echt veranderd, dan werkt het issue `docs/BRIEFING.md` mee bij.

## Stap 1 — Snijden

**Eén issue is één PR.** Dat is de maat. Snij een observatie in stukken langs
deze lijnen:

- **Werktype.** Het label bepaalt de checkpoints en de gate in
  `work-issues`. Een module en een nieuw vraagtype dat ze nodig heeft, zijn
  twee issues; de component gaat voorop.
- **Oorzaak.** Wat dezelfde oorzaak deelt, hoort bij elkaar.
- **Blokkade.** Wat de andere issues nodig hebben, komt eerst en krijgt dat
  als eerste zin: "Dit issue blokkeert #…".
- **Pilot.** Als meerdere issues hetzelfde nieuwe terrein betreden (de eerste
  module, het eerste vraagtype), wijs er één aan als pilot en zeg in de
  andere dat ze erna komen. Zo wordt het terrein één keer verkend.
- **Beslissing.** Een stuk dat op een andere keuze van de eigenaar wacht dan
  de rest, is een eigen issue.
- **Aanlevering.** Een module die wacht op inhoud van een collega, of werk
  dat wacht op een beslissing van het team, krijgt naast het werklabel het
  statuslabel `wacht`.

Niet te fijn snijden: een regel CSS die bij een groter issue hoort, krijgt
geen eigen nummer. Niet te grof: een issue dat twee werklabels nodig heeft,
is bijna altijd twee issues.

De labels en wat ze voor `work-issues` betekenen:

| label | stops daar | wat het issue dus moet bevatten |
|---|---|---|
| `module` | 2 | module-id, doel, graad/niveau/AI-gebruik, bronmateriaal, vaste keuzes |
| `component` | 1 | didactisch doel, interactie, waar ze gebruikt wordt, MDX-vorm |
| `design` | 1 | welke tokens of componenten, bron, contrastvereisten |
| `site` | 1 als het zichtbaar is | wat, waar in de code, zichtbaarheid, bewijs |
| `redactie` | 0 | waar, wat er mis is, gewenste richting |
| `wacht` | niet gewerkt | waarop het wacht, en wie dat levert (rol, geen naam) |

De volgorde van de lijst is de volgorde waarin `work-issues` ze krijgt.
Afhankelijkheden eerst, pilots vóór de reeks, daarna de rest.

## Stap 2 — Eén checkpoint: de lijst

Toon de lijst vóór je iets aanmaakt: per issue de titel, het label, één regel
over de inhoud, en de afhankelijkheid. De lijst ís het voorstel, met de
redenering erbij. Noem daar ook de beslissingen die je in de bodies gaat
zetten, zodat de eigenaar ze nu al kan beantwoorden of bewust kan laten staan.

Eén stop, niet één per issue. Zegt de eigenaar "maak ze allemaal", dan maak
je ze allemaal, in de getoonde volgorde. Wijzigt hij de lijst, dan toon je de
nieuwe lijst niet opnieuw; je maakt ze.

## Stap 3 — De body

De vorm volgt de template van het label (`.github/ISSUE_TEMPLATE/<label>.yml`
levert de koppen). Daarbovenop krijgt elk issue, welk label ook, deze
blokken:

- **Module-id en afhankelijkheid** als eerste regel bij alles wat aan een
  module hangt: `**Module-id:** \`ai-als-coach-2e-graad\`. Na #12.`
- **Nu.** De huidige toestand zoals je hem geverifieerd hebt, met wat er al is
  en wat er ontbreekt.
- **Voorstel.** Concreet genoeg om te bouwen: welke elementen, welke waarden,
  welke bestanden. Waarden die een keuze zijn, markeer je als *indicatief* en
  zet je in de beslissingen.
- **Beslissingen vóór de bouw.** Genummerd. Dit is wat `work-issues` aan de
  eigenaar voorlegt vóór het werk begint; wat hier niet staat, beslist de
  uitvoerder zelf. Alleen echte keuzes: smaak, scope, didactiek, wat de
  leerling ziet. Geen "mag ik beginnen".
- **Waar in de code.** Paden, ook van bestanden die nog niet bestaan.
- **Bewijs.** Wat de PR moet laten zien, als waarneming: een screenshot op
  1366 × 768 van benoemde toestanden, de uitvoer van een commando, een tabel
  met waarden. Benoem de faalmodus die geen foutmelding geeft en vraag het
  bewijs dat hij zich niet voordoet (zie `work-issues` § Bewijslast). Sluit
  af met de gates: `npx astro check` en `npm run build`.
- **Zichtbaarheid** (bij `site`): ja of nee, en of er een ontwerp-checkpoint
  komt.

Titels: `<module-id>: <wat>` voor alles wat aan één module hangt,
`site: <wat>`, `component: <wat>`, `design: <wat>`. Kort, concreet, zonder
punt.

**Publieke repo.** Geen namen van collega's of leerlingen in titels of
bodies. Schrijf "de auteur van de module", "het nulmetingteam", "de
eigenaar".

Register: courant Nederlands, concrete bestandsnamen en waarden, geen opsmuk.
Een body van 20 tot 60 regels is normaal. Wordt hij langer, dan zijn het twee
issues of is het een plan en geen issue.

Schrijf de bodies als bestanden in de scratchpad, één per issue, met de
Write-tool. Lange heredocs breken de Bash-tool af.

## Stap 4 — Aanmaken in volgorde, kruisverwijzingen daarna

Vooruitverwijzingen bestaan nog niet op het moment dat je het eerste issue
maakt. Schrijf ze daarom als plaatshouder (`{{SKELET}}`, `{{SCHEMA}}`), maak
alles aan, verzamel de nummers, vul in en werk de bodies bij:

```
for f in $(ls "$D"/[0-9][0-9]-*.md | sort); do
  key=$(basename "$f" .md | cut -d- -f2)
  url=$(gh issue create --title "$title" --label "$label" --body-file "$f")
  echo "$key=${url##*/}" >> "$D/numbers.txt"
done
for f in "$D"/[0-9][0-9]-*.md; do
  while IFS='=' read -r key num; do sed -i "s/{{$key}}/#$num/g" "$f"; done < "$D/numbers.txt"
done
# daarna per issue: gh issue edit "$num" --body-file "$f"
```

Controleer na afloop dat geen enkele live body nog `{{` bevat en dat elk issue
zijn labels heeft. Dat is één `gh issue view` per nummer; sla het niet over.

## Stap 5 — Overdracht

Sluit af met drie dingen en niets anders:

1. De lijst met nummers en titels, in de volgorde waarin ze gewerkt moeten
   worden, met de afhankelijkheden in één woord erbij. Issues met `wacht`
   apart, met waarop ze wachten.
2. De open beslissingen, verzameld uit de bodies.
3. Het commando:

   ```
   /work-issues 12 13 14
   ```

**Geen sessiekaart, geen voorstel om te beginnen, geen eerste issue alvast
oppakken.** De eigenaar start `/work-issues` zelf.

## Wat deze skill niet doet

- **Geen werk uitvoeren.** Ook geen "kleine fix alvast".
- **Geen werk verzinnen** buiten de observatie. Zie je onderweg iets anders
  dat stuk is, noem het in één regel bij het checkpoint.
- **Geen plannen.** Samenhang die uitleg nodig heeft, hoort in
  `docs/BRIEFING.md` of in een eerste issue dat het mechanisme bouwt.
- **Geen duplicaten.** Bestaat er al een open issue voor, verwijs ernaar of
  stel voor het te verrijken met `gh issue edit`.
