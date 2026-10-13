"""
Builds the N2 study curriculum from the community JLPT lists in data/jlpt/ (see SOURCES.md).

- N2 words get a topic from their English meaning and are placed in the region (chapter) whose
  learning focus matches (docs/CURRICULUM.md); words without a topic are spread evenly.
- N3 words are included as review material (chapter 0: never introduced on their own).
- N2 kanji follow the earliest chapter of the words they appear in.
- Words the game already teaches by hand (src/content/vocab*.ts) are skipped.

Output: public/data/jlpt.json (loaded at start by src/core/curriculum.ts)

Run: python3 tools/import_jlpt.py
"""
import csv
import json
import os
import re
import sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'data', 'jlpt')
OUT = os.path.join(ROOT, 'public', 'data', 'jlpt.json')

# chapter: topic keywords (matched as word starts in the English meaning)
TOPICS = {
    1: ('home', ['house', 'home', 'room', 'kitchen', 'furniture', 'clothes', 'wear', 'shirt', 'shoe', 'wash', 'clean',
                 'neighbo', 'rent', 'apartment', 'garbage', 'rubbish', 'bath', 'bed', 'sleep', 'breakfast', 'meal', 'shop',
                 'store', 'buy', 'purchase', 'goods', 'price', 'cheap', 'expensive', 'bag', 'umbrella', 'key', 'door']),
    2: ('work', ['work', 'job', 'employ', 'salary', 'wage', 'office', 'boss', 'colleague', 'staff', 'labo', 'occupation',
                 'farm', 'crop', 'harvest', 'fruit', 'vegetable', 'rice', 'field', 'season', 'spring', 'summer', 'autumn',
                 'winter', 'cook', 'food', 'taste', 'dish', 'drink', 'restaurant', 'customer', 'serv', 'busy', 'holiday']),
    3: ('nature', ['mountain', 'river', 'snow', 'weather', 'rain', 'wind', 'cloud', 'storm', 'temperature', 'cold', 'heat',
                   'tree', 'flower', 'forest', 'leaf', 'grass', 'animal', 'insect', 'bird', 'stone', 'rock', 'earth',
                   'ill', 'sick', 'disease', 'medic', 'doctor', 'hospital', 'health', 'injur', 'wound', 'pain', 'body',
                   'blood', 'bone', 'skin', 'cough', 'fever', 'tired', 'breath', 'nerve', 'muscle', 'tooth', 'eye']),
    4: ('travel', ['sea', 'ocean', 'island', 'coast', 'shore', 'beach', 'wave', 'ship', 'boat', 'port', 'harbo', 'fish',
                   'travel', 'trip', 'tour', 'journey', 'transport', 'train', 'car', 'vehicle', 'traffic', 'road', 'bridge',
                   'station', 'passeng', 'luggage', 'export', 'import', 'trade', 'pollut', 'environment', 'energy', 'fuel',
                   'electric', 'gas', 'oil', 'map', 'direction', 'distance', 'abroad', 'foreign']),
    5: ('culture', ['history', 'histor', 'ancient', 'tradition', 'culture', 'temple', 'shrine', 'art', 'music', 'song',
                    'religio', 'god', 'buddh', 'festival', 'custom', 'polite', 'manner', 'respect', 'honor', 'courtesy',
                    'greet', 'family', 'marriage', 'wedding', 'funeral', 'ancestor', 'parent', 'child', 'era', 'century',
                    'castle', 'sword', 'craft', 'paint', 'poem', 'novel', 'story', 'drama', 'play', 'tea']),
    6: ('study', ['study', 'school', 'university', 'student', 'teach', 'lesson', 'class', 'exam', 'test', 'research',
                  'science', 'experiment', 'theory', 'mathemat', 'calculat', 'number', 'chemi', 'physic', 'biolog',
                  'logic', 'opinion', 'argu', 'reason', 'conclu', 'examin', 'analy', 'compar', 'evidence', 'prove',
                  'define', 'concept', 'knowledge', 'learn', 'grammar', 'language', 'word', 'sentence', 'book', 'write',
                  'read', 'essay', 'thesis', 'subject', 'degree', 'measure', 'percent', 'ratio', 'average']),
    7: ('society', ['econom', 'market', 'industr', 'business', 'company', 'corporat', 'finance', 'bank', 'tax', 'cost',
                    'profit', 'loss', 'budget', 'politic', 'government', 'minister', 'law', 'legal', 'court', 'election',
                    'vote', 'nation', 'state', 'public', 'society', 'social', 'citizen', 'media', 'news', 'newspaper',
                    'broadcast', 'television', 'computer', 'technolog', 'machine', 'system', 'product', 'manufactur',
                    'crime', 'police', 'polic', 'war', 'army', 'military', 'international', 'organiz', 'committee',
                    'policy', 'welfare', 'insurance', 'contract', 'advertis', 'population', 'city', 'urban']),
}
CHAPTERS = sorted(TOPICS)

# fallback when the meaning has no keyword: kanji that strongly suggest a topic
KANJI_HINTS = {
    1: '家宅室屋服衣靴洗掃店買売品値払借貸住隣',
    2: '職勤給働務雇農畑実果季春夏秋冬料理味飲酒菓客営',
    3: '山川谷雪雨風雲晴天気温寒暑木林森花草葉虫鳥獣石岩土病医薬患痛傷症療健康体骨血肌歯眼息疲',
    4: '海港船島浜岸波漁魚旅航路駅車輸運交通橋渡港貿環境燃電油',
    5: '史古昔伝統寺神仏祭礼儀敬婚葬祖親孫歌曲絵画詩芸茶城武',
    6: '学校教授講研究試験論理証測数計算化物科実験説述観察例比較読書筆語文',
    7: '経済財金融銀税費損益政府党法律裁判選挙票国民市都公社会報道放送機械技術製産業企契約警犯罪軍',
}


def affix_kind(expr):
    """'～館' is a suffix, 'お～' a prefix; a ～ inside a usage note like (かさを～) does not count."""
    core = re.sub(r'[（(][^)）]*[)）]', '', expr).replace(' ', '').strip()
    if re.match(r'^[～〜]', core):
        return 'suffix'
    if re.search(r'[～〜]$', core):
        return 'prefix'
    return None


def clean_word(expr):
    """'～位' -> '位', '(かさを～) さす' -> 'さす', '〜 (まる) ごと' -> 'ごと', 'はい (かん)' -> 'はい', '下品(な)' -> '下品'.
    Brackets are always notes (usage, an example word, (かん) = interjection, (な) = na-adjective)."""
    w = re.sub(r'[（(][^)）]*[)）]', '', expr).strip()
    if not affix_kind(expr):
        w = w.split(' ')[0]  # 'こうよう もみじ', 'しかく しかくい': alternatives, keep the first
    w = w.replace('～', '').replace('〜', '').replace(' ', '').strip()
    return w.split('・')[0].split('/')[0].split(';')[0].strip()


def clean_reading(r, affix=None):
    r = re.sub(r'[（(][^)）]*[)）]', '', r).strip()
    if not affix:
        r = r.split(' ')[0]
    return r.replace('～', '').replace('〜', '').replace(' ', '').split('・')[0].split('/')[0].split(';')[0].strip()


def clean_meaning(m):
    m = re.sub(r'\s+', ' ', m).strip().rstrip(',;').strip()
    parts = [p.strip() for p in re.split(r'[;,]', m) if p.strip()]
    out, n = [], 0
    for p in parts:  # keep the meaning short enough for an answer button
        if n + len(p) > 48 and out:
            break
        out.append(p)
        n += len(p) + 2
    return ', '.join(out)


def guess_pos(word, reading, en):
    e = en.lower()
    if e.startswith('to ') or ', to ' in e:
        return 'verb'
    if re.search(r'\bly\b|ly(,|$)', e) and not e.startswith('the '):
        return 'adverb'
    if reading.endswith('い') and not re.search(r'[一-鿿]$', word) and word.endswith('い'):
        return 'i-adj'
    return 'noun'


def topic_of(en):
    e = ' ' + re.sub(r'[^a-z ]', ' ', en.lower()) + ' '
    best = None
    for ch in CHAPTERS:
        for kw in TOPICS[ch][1]:
            if ' ' + kw in e:
                hit = (ch, TOPICS[ch][0])
                if best is None:
                    best = hit
                break
    return best


def topic_from_kanji(word):
    for ch in CHAPTERS:
        if any(c in KANJI_HINTS[ch] for c in word):
            return ch, TOPICS[ch][0]
    return None


def existing_words():
    words = set()
    for f in ('vocab.ts', 'vocab_core.ts'):
        txt = open(os.path.join(ROOT, 'src', 'content', f), encoding='utf-8').read()
        words |= set(re.findall(r"word: '([^']+)'", txt))
        words |= set(re.findall(r"\['[^']*', '([^']+)', '", txt))
    return words


def romaji_id(level, i):
    return f'{level.lower()}_{i:04d}'


def main():
    have = existing_words()
    vocab, seen = [], set()
    per_ch = Counter()
    untagged = []
    for level in ('N2', 'N3'):
        rows = list(csv.DictReader(open(os.path.join(SRC, f'{level.lower()}.csv'), encoding='utf-8')))
        for i, r in enumerate(rows):
            affix = affix_kind(r['expression'])
            word = clean_word(r['expression'])
            reading = clean_reading(r['reading'], affix)
            en = clean_meaning(r['meaning'])
            # an affix (～位, い) and the word with the same characters (位, くらい) are different items
            form = {'suffix': '～' + word, 'prefix': word + '～'}.get(affix, word)
            if not word or not reading or not en or form in have or form in seen:
                continue
            seen.add(form)
            e = {'id': romaji_id(level, i), 'word': word, 'reading': reading, 'en': en,
                 'pos': 'na-adj' if re.search(r'[（(]な[)）]', r['expression']) else guess_pos(word, reading, en), 'level': level}
            if affix:
                e['affix'] = affix
            if level == 'N2':
                t = topic_of(r['meaning']) or topic_from_kanji(word)
                if t:
                    e['chapter'], e['topic'] = t
                    per_ch[t[0]] += 1
                else:
                    untagged.append(e)
            else:
                e['chapter'] = 0
            vocab.append(e)
    # spread untagged N2 words so every region gets a similar share
    target = (sum(per_ch.values()) + len(untagged)) / len(CHAPTERS)
    for e in untagged:
        ch = min(CHAPTERS, key=lambda c: (per_ch[c] >= target, per_ch[c]))
        e['chapter'], e['topic'] = ch, 'general'
        per_ch[ch] += 1

    # kanji: N2 kanji, linked to the curriculum words that contain them
    kd = json.load(open(os.path.join(SRC, 'kanji.json'), encoding='utf-8'))
    by_char = defaultdict(list)
    for e in vocab:
        for c in e['word']:
            if c in kd:
                by_char[c].append(e)
    kanji = []
    for c, info in kd.items():
        if info['jlpt'] != 2:
            continue
        words = sorted(by_char.get(c, []), key=lambda e: (e['level'] != 'N2', e['chapter'] or 99, len(e['word'])))
        if not words:
            continue
        n2 = [w for w in words if w['level'] == 'N2']
        kanji.append({
            'id': 'k2_' + format(ord(c), 'x'), 'char': c,
            'on': [x for x in info['on']][:3], 'kun': [x for x in info['kun']][:3],
            'meaning': ', '.join(m.lower() for m in info['meanings'][:3]),
            'words': [w['id'] for w in words[:6]], 'strokes': info['strokes'],
            'chapter': min((w['chapter'] for w in n2), default=1),
        })

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    data = {'version': 1, 'source': 'JLPT community lists (tanos.co.uk, CC BY) and KANJIDIC2 (EDRDG, CC BY-SA 4.0); see data/jlpt/SOURCES.md',
            'vocab': vocab, 'kanji': kanji}
    json.dump(data, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    n2 = [e for e in vocab if e['level'] == 'N2']
    print(f"vocab: {len(n2)} N2 + {len(vocab) - len(n2)} N3 review, kanji: {len(kanji)} N2; "
          f"{os.path.getsize(OUT) // 1024} KB")
    print('N2 per chapter:', dict(sorted(Counter(e['chapter'] for e in n2).items())))
    print('tagged by topic:', len(n2) - len(untagged), 'spread:', len(untagged))
    if '--sample' in sys.argv:
        import random
        random.seed(2)
        for e in random.sample(n2, 30):
            print(e['chapter'], e.get('topic'), e['word'], e['reading'], e['pos'], '|', e['en'])


if __name__ == '__main__':
    main()
