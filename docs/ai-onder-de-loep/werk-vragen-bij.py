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
(repo/'src/components/loep/questions.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n')
print(len(qs), 'actieve meerkeuzevragen bijgewerkt; vraag 36 staat in model.ts')
