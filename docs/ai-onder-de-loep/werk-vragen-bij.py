# Regenerate the active questions from the archived Markdown. No dependencies.
import re,json
from pathlib import Path
repo=Path(__file__).resolve().parents[2]
md=(Path(__file__).parent/'01_basisleerpad.md').read_text()
qs={}
for m in re.finditer(r'^### Vraag (\d+b?)[.:] (.*?)\n(.*?)(?=^### |^## |\Z)',md,re.M|re.S):
 n,title,block=m.groups()
 if n in ('9','36'):continue
 opts=re.findall(r'^- \*\*([A-F])\.\*\* (.*)',block,re.M)
 if not opts:continue
 prompt=block.split('**Interactie:**',1)[1].split('\n',1)[1].split('- **A.**')[0].strip()
 key=re.search(r'\*\*Antwoordsleutel:\*\* ([A-F, ]+)\.',block)
 feedback=re.search(r'\*\*Feedback \[[^\]]+\]:\*\*\s*\n(.*?)(?=\n\*\*|\Z)',block,re.S)
 branches=re.findall(r'^- \*\*Bij ([A-F])[^:]*:\*\* (.*)',block,re.M)
 qs[n]={'id':n,'title':title,'body':prompt,'options':[{'id':a,'text':t}for a,t in opts],'correct':key[1].replace(' ','').split(',') if key else [],'feedback':feedback[1].strip() if feedback else '', 'branches':dict(branches),'count':3 if n=='28' else 2 if n=='1' else 1}
# Bewaar de verduidelijkingen voor leerlingen bij het opnieuw genereren.
qs['7']['body'] = 'AI kan je helpen om een onderwerp vanuit verschillende kanten te bekijken. Maar daarvoor moet je soms bewust anders vragen stellen.\n\nJe wilt verder nadenken over een verbod op sociale media voor jongeren onder de 16 jaar.\n\nWelke vraag stel je het best aan AI om een antwoord te krijgen dat verschillende kanten bekijkt?'
qs['18']['body'] = 'Stel: in een reeks afbeeldingen lijken vooral vrouwen als verpleegkundige en mannen als chirurg afgebeeld.\n\nWat zou je daaruit kunnen besluiten?'
qs['18']['feedback'] = 'Dat kan wijzen op een vast beeld van deze beroepen. Een paar afbeeldingen zijn niet genoeg om te weten of er echt een patroon is. Onderzoek meer beelden met dezelfde opdracht en hetzelfde systeem.'
qs['18']['options'][0]['text'] = 'Dat kan wijzen op een vast beeld van deze beroepen. We moeten meer afbeeldingen onderzoeken om te weten of er een patroon is.'
qs['20']['feedback'] = 'Door duidelijk aan te geven welke variatie je wilt zien, kun je vaste ideeën over mensen helpen vermijden. Je moet de resultaten wel blijven controleren. Ook een duidelijke opdracht garandeert geen goed resultaat.'
qs['24']['options'][0]['text'] = 'Een betaald abonnement is op zichzelf voldoende bewijs dat het bedrijf mensen bewust probeert te beïnvloeden.'
qs['24']['options'][3]['text'] = 'Het bedrijf mag geld verdienen, maar moet opletten dat het geen mensen aanmoedigt om steeds meer op de chatbot te steunen om meer te verdienen.'
# Aanpassingen na de inhoudelijke controle van de interactieve versie.
qs['1']['title'] = 'Waarom veranderen aanbevelingen?'
qs['1']['body'] = 'Spotify kan andere muziek voorstellen als je luistergedrag verandert. Welke twee uitspraken helpen dat te verklaren?'
qs['1']['options'][0]['text'] = 'Het systeem kan patronen in luistergedrag gebruiken om muziek voor te stellen.'
qs['1']['options'][1]['text'] = 'De aanbevelingen liggen voor altijd vast, ongeacht wat je beluistert.'
qs['1']['options'][2]['text'] = 'Nieuwe luisterkeuzes kunnen mee bepalen welke voorstellen je later ziet.'
qs['1']['options'][3]['text'] = 'Een aanbeveling bewijst dat iedereen dezelfde muziek mooi vindt.'
qs['1']['feedback'] = 'Aanbevelingen kunnen rekening houden met patronen en nieuw luistergedrag. Hoe een aanbeveling precies tot stand komt, verschilt per systeem.'
qs['12']['feedback'] = 'Meld het meteen aan je stagebegeleider of de afgesproken contactpersoon en volg de afspraken van je school of stageplaats. Samen kunnen jullie onderzoeken welke maatregelen nodig zijn. Het gesprek verwijderen lost niet altijd alles op.'
qs['24']['branches']['A'] = 'Een betaald abonnement op zichzelf bewijst nog niet dat iemand wordt beïnvloed. Onderzoek ook hoe de berichten en de app ontworpen zijn.'
qs['24']['branches']['B'] = 'Gebruikers maken keuzes, maar ook een bedrijf heeft verantwoordelijkheid voor hoe de chatbot is ontworpen en welke gevolgen dat kan hebben.'
qs['24']['branches']['C'] = 'Een prettig gevoel is belangrijk, maar kijk ook of de chatbot druk uitoefent om vaker te praten of meer te betalen.'
qs['26b']['body'] = 'De voorbeelden tonen 77 Wh voor een uur streamen en 0,24 Wh voor een eenvoudige tekstvraag. Hoe vaak past 0,24 ongeveer in 77? Kijk daarna waarom de cijfers niet zomaar een eerlijke vergelijking zijn.'
qs['26b']['feedback'] = '77 gedeeld door 0,24 is ongeveer 321, dus ongeveer 300. Maar de twee cijfers komen uit verschillende jaren en meten niet dezelfde onderdelen. Hieruit kun je niet besluiten welke activiteit milieuvriendelijker is.'
qs['27']['body'] = 'Welk datacenter zou jij voorlopig kiezen? We weten nog niet alles over stroom, water en materialen. Je mag ook aangeven dat je meer informatie nodig hebt.'
qs['31']['body'] = 'Stel: het systeem duidt een gewone drone verkeerd aan als dreiging en er wordt ingegrepen. Je onderzoekt hoe deze verzonnen fout kon gebeuren. Bij wie zou jij als eerste informatie zoeken?'
qs['33']['body'] = 'Stel dat jij een AI-agent gebruikt om een app te bouwen. Je wilt dat de AI kan experimenteren, maar geen toegang krijgt tot echte klantgegevens. Welke maatregel beschermt die gegevens het best?'
qs['33']['options'][0]['text'] = 'Ik gebruik verzonnen testgegevens in een aparte testomgeving. De AI heeft geen toegang tot de echte klantgegevens.'
qs['33']['feedback'] = 'Met verzonnen testgegevens in een aparte omgeving beperk je wat de AI kan doen. Zonder toegang tot echte klantgegevens kan de agent die niet rechtstreeks wijzigen of verwijderen.'
# Twee kijkvragen bij Karrewiet, Hoe werkt AI? (14 oktober 2025).
qs['video1'] = {'id':'video1','title':'Denkt AI zoals een mens?','body':'Wat zegt Lieven Scheire daarover in het filmpje?','options':[{'id':'A','text':'AI denkt precies zoals een mens.'},{'id':'B','text':'AI lijkt op sommige manieren op de werking van hersenen, maar er zijn grote verschillen.'},{'id':'C','text':'AI kan alleen rekenen en geen beelden herkennen.'},{'id':'D','text':'AI begrijpt altijd wat een mens bedoelt.'}],'correct':['B'],'feedback':'Volgens Lieven Scheire lijkt AI op sommige manieren op de werking van hersenen, maar zijn er ook grote verschillen. AI denkt niet gewoon zoals een mens.','branches':{},'count':1}
qs['video2'] = {'id':'video2','title':'Hoe leert AI honden en katten herkennen?','body':'Welk voorbeeld gebruikt Lieven Scheire in het filmpje?','options':[{'id':'A','text':'De computer krijgt duizenden voorbeelden en past zich aan wanneer hij fouten maakt.'},{'id':'B','text':'De computer bekijkt één foto en kent meteen alle dieren.'},{'id':'C','text':'De computer kiest willekeurig een antwoord zonder voorbeelden.'},{'id':'D','text':'Iemand schrijft voor elke mogelijke foto apart het antwoord op.'}],'correct':['A'],'feedback':'In het filmpje krijgt het programma veel voorbeelden van honden en katten. Het past zich aan om de dieren beter te herkennen. Ook na het leren kan een AI-systeem fouten maken.','branches':{},'count':1}
(repo/'src/components/loep/questions.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n')
print(len(qs), 'actieve meerkeuzevragen bijgewerkt; vraag 36 staat in model.ts')
