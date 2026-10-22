"""
Data for looking up words in the game (ui/Lookup.tsx): readings and meanings of all common kanji (school-grade and
JLPT kanji from kanji-data / KANJIDIC2, see data/jlpt/SOURCES.md) and the reading of every word the game's own texts
write with furigana ({漢字|かんじ}).

Run: python3 tools/build_lookup.py <kanji-data.json from https://github.com/davidluzgouveia/kanji-data>
Writes public/data/lookup.json, fetched the first time a word is looked up.
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HAS_KANJI = re.compile(r'[一-鿿々]')

src = json.load(open(sys.argv[1]))
kanji = {}
for c, v in src.items():
    if not (v.get('grade') or v.get('jlpt_new') or v.get('jlpt_old')):
        continue
    on = v.get('readings_on') or []
    kun = [k for k in (v.get('readings_kun') or []) if not k.startswith('-')]
    kanji[c] = [on[:3], kun[:3], ', '.join((v.get('meanings') or [])[:3])]

words = {}
for f in glob.glob(os.path.join(ROOT, 'src', 'content', '*.ts')):
    for base, reading in re.findall(r'\{([^|{}]+)\|([^|{}]+)(?:\|[^{}]+)?\}', open(f, encoding='utf-8').read()):
        if HAS_KANJI.search(base) and reading != base and base not in words:
            words[base] = reading

json.dump({'kanji': kanji, 'words': words}, open(os.path.join(ROOT, 'public', 'data', 'lookup.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
print('kanji', len(kanji), 'words', len(words), round(os.path.getsize(os.path.join(ROOT, 'public', 'data', 'lookup.json')) / 1024), 'KB')
