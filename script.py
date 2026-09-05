import sys, re

files_to_update = ['src/data/cardsData.ts', 'src/data/full80DeckData.ts']

for filepath in files_to_update:
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Remove (Cópia 2)
    text = text.replace(' (Cópia 2)', '')
    text = text.replace(' (Cópia 3)', '')

    # Fix bounty ranges in cardsData.ts
    if 'cardsData.ts' in filepath:
        text = re.sub(r'bountyRange:\s*[\'\"].*?100.*?500.*?[\'\"]', 'bountyRange: \'+$0 Bônus Fixos\'', text)
        text = re.sub(r'bountyRange:\s*[\'\"].*?500.*?2\.500.*?[\'\"]', 'bountyRange: \'+$1.0k Bônus Fixos\'', text)
        text = re.sub(r'bountyRange:\s*[\'\"].*?2\.500.*?15\.000.*?[\'\"]', 'bountyRange: \'+$2.5k Bônus Fixos\'', text)
        text = re.sub(r'bountyRange:\s*[\'\"].*?15\.000.*?50\.000.*?[\'\"]', 'bountyRange: \'+$4.0k Bônus Fixos\'', text)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(text)

print('Updated files.')
