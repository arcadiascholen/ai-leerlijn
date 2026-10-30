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
(repo/'src/components/loep/questions.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n')
print(len(qs), 'actieve meerkeuzevragen bijgewerkt; vraag 36 staat in model.ts')
