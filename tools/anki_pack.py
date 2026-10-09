"""
Turn an anki_dump.py JSON into a game content pack (vocabulary + grammar + learning progress).

  python3 tools/anki_pack.py dump.json pack.json

The pack is imported in the game (Settings › Lernpaket) and synced through the player's
own cloud save — deck contents are third-party material and are NOT committed to this repo.

Understood decks:
  * "Ankidrone Essentials … JLPT Tango N2" (positional fields f0..f16)
  * "JLPT N2 文法 …" (basic note: f0 pattern, f1 romaji, f2 meaning, f3 example, f4 example DE, f5 context;
    cloze note: Text with {{c1::…}}, Grammatik, Bedeutung, Beispiel_DE, Kontext)
"""
import html
import json
import re
import sys


def reading_of_word(furi: str) -> str:
    # kanji block followed by [reading]; keep kana outside brackets
    out = ''
    for part in re.finditer(r'([^\[\]]+?)\[([^\]]+)\]|([^\[\]]+)', furi.replace(' ', '')):
        if part.group(2):
            # drop the kanji run that the bracket annotates, keep leading kana
            base = part.group(1)
            kana = re.match(r'^[぀-ヿ]*', base).group(0)
            out += kana + part.group(2)
        else:
            out += part.group(3)
    return out


KANA = re.compile(r'^[぀-ゟー]+$')
HAS_KANJI = re.compile(r'[一-鿿々]')


def guess_pos(word: str, en: str) -> str:
    e = en.lower().strip()
    w = re.sub(r'（.*?）|\(.*?\)', '', word)
    if e.startswith('to ') or (HAS_KANJI.search(w) and w[-1] in 'うくぐすつぬぶむる' and not HAS_KANJI.search(w[-1])):
        return 'verb'
    if w.endswith('い') and HAS_KANJI.search(w) and not e.startswith('to '):
        return 'i-adj'
    if KANA.match(w) and (len(w) == 4 and w[:2] == w[2:] or w.endswith('り') or w.endswith('と')):
        return 'adverb'  # さらさら, ぼんやり, そっと
    return 'noun'


KATA = re.compile(r'^[\u30a0-\u30ff]+$')


def kata_to_hira(s: str) -> str:
    return ''.join(chr(ord(c) - 0x60) if 'ァ' <= c <= 'ヶ' else c for c in s)


def reading_from(word: str, furi: str, kata: str) -> str:
    if KATA.match(word):
        return word
    # katakana field is reliable except for ー (long vowels are ambiguous: こー = こう or こお)
    k = re.sub(r'[^\u30a0-\u30ff]', '', kata.replace('ꜜ', ''))
    if k and 'ー' not in k:
        return kata_to_hira(k)
    return reading_of_word(furi) or word


def clean_word(w: str) -> str:
    return re.sub(r'\[\d+\]$', '', w).strip()


def main(src, out):
    d = json.load(open(src))
    vocab, progress = [], {}
    seen_words = set()
    for n in d['notes']:
        deck = n['decks'][0] if n['decks'] else ''
        if 'Tango N2' not in deck:
            continue
        f = n['fields']
        word = clean_word(f.get('f5', ''))
        if not word or word in seen_words:
            continue
        seen_words.add(word)
        has_de = bool(f.get('f10'))
        en = (f.get('f10') if has_de else f.get('f9')) or ''
        de = f.get('f9') if has_de else ''
        reading = reading_from(word, f.get('f6', ''), f.get('f7', ''))
        vid = 'a' + str(n['id'])[-9:]
        ex = f.get('f0', '').strip()
        vocab.append({
            'id': vid, 'word': word, 'reading': reading,
            'en': en.strip().rstrip('.'), 'de': (de or en).strip().rstrip('.'),
            'pos': guess_pos(word, en), 'level': 'N2', 'chapter': 1, 'tags': ['anki'],
            'example': ex, 'exampleEn': (f.get('f3') if has_de else f.get('f2')) or '',
            **({'exampleDe': f.get('f2')} if has_de and f.get('f2') else {}),
        })
        if n['reps'] > 0:
            progress['v:' + vid] = {'ivl': n['ivl'], 'lapses': n['lapses'], 'reps': n['reps']}

    grammar = {}
    for n in d['notes']:
        deck = n['decks'][0] if n['decks'] else ''
        if '文法' not in deck:
            continue
        f = n['fields']
        if 'Grammatik' in f:  # cloze
            pat, meaning, ex_de, ctx = f['Grammatik'], f['Bedeutung'], f['Beispiel_DE'], f['Kontext']
            m = re.search(r'\{\{c1::(.+?)(::.*?)?\}\}', f['Text'])
            ex = re.sub(r'\{\{c\d::(.+?)(::.*?)?\}\}', r'\1', f['Text'])
            blank = m.group(1) if m else None
        else:
            pat, meaning, ex, ex_de, ctx = f['f0'], f['f2'], f['f3'], f['f4'], f['f5']
            blank = None
        if blank and (blank == ex or len(blank) > 12):
            core = re.sub(r'（.*?）', '', pat).replace('～', '').split('／')[0].strip()
            blank = core if core and core in ex else None
        key = pat.strip()
        g = grammar.setdefault(key, {'pattern': key, 'meaning': meaning, 'context': ctx, 'ex': ex, 'exDe': ex_de, 'blank': None, 'ids': [], 'prog': None})
        if blank:
            g['blank'] = blank
            g['ex'] = ex
        g['ids'].append(n['id'])
        if n['reps'] > 0:
            p = g['prog'] or {'ivl': 0, 'lapses': 0, 'reps': 0}
            g['prog'] = {'ivl': max(p['ivl'], n['ivl']), 'lapses': p['lapses'] + n['lapses'], 'reps': p['reps'] + n['reps']}

    gram_out = []
    for i, g in enumerate(grammar.values()):
        gid = 'ag' + str(min(g['ids']))[-9:]
        gram_out.append({'id': gid, 'pattern': g['pattern'], 'meaning': g['meaning'], 'context': g['context'],
                         'example': g['ex'], 'exampleDe': g['exDe'], 'blank': g['blank']})
        if g['prog']:
            progress['g:' + gid] = g['prog']

    pack = {'id': 'anki', 'title': 'Anki: JLPT Tango N2 + N2 文法', 'version': 1, 'vocab': vocab, 'grammar': gram_out, 'progress': progress}
    json.dump(pack, open(out, 'w'), ensure_ascii=False, separators=(',', ':'))
    print(f'{len(vocab)} words, {len(gram_out)} grammar points, {len(progress)} with progress')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
