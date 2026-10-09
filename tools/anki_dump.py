"""
Dump an Anki collection (.colpkg / .apkg, or an exported notes .txt) to JSON so its decks
can be mapped onto the game's vocabulary/grammar data.

  python3 tools/anki_dump.py Sammlung.colpkg out.json

Handles collection.anki21b (zstd, newer Anki), collection.anki21 and collection.anki2.
Output: decks, note types with field names, and every note with its deck(s), fields and
learning state (interval in days, lapses) — media is ignored.
Requires: pip install zstandard (only for .anki21b)
"""
import json
import os
import re
import sqlite3
import sys
import tempfile
import zipfile


def open_collection(path: str) -> sqlite3.Connection:
    tmp = tempfile.mkdtemp()
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        for cand in ('collection.anki21b', 'collection.anki21', 'collection.anki2'):
            if cand in names:
                data = z.read(cand)
                if cand.endswith('b'):
                    import zstandard
                    data = zstandard.ZstdDecompressor().stream_reader(data).read()
                db = os.path.join(tmp, 'col.sqlite')
                open(db, 'wb').write(data)
                return sqlite3.connect(db)
    raise SystemExit(f'no collection in {path}: {names[:10]}')


def strip_html(s: str) -> str:
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'\[sound:[^\]]*\]', '', s)
    s = re.sub(r'<[^>]+>', '', s)
    return s.replace('&nbsp;', ' ').replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').strip()


def main(src: str, out: str):
    con = open_collection(src)
    cur = con.cursor()
    tables = {r[0] for r in cur.execute("select name from sqlite_master where type='table'")}
    if 'decks' in tables:  # schema 18 (Anki >= 2.1.28)
        decks = {r[0]: r[1].replace('\x1f', '::') for r in cur.execute('select id, name from decks')}
        models = {}
        for mid, name in cur.execute('select id, name from notetypes'):
            fields = [f for (f,) in cur.execute('select name from fields where ntid=? order by ord', (mid,))]
            models[mid] = {'name': name, 'fields': fields}
    else:  # legacy JSON columns
        row = cur.execute('select decks, models from col').fetchone()
        decks = {int(k): v['name'] for k, v in json.loads(row[0]).items()}
        models = {int(k): {'name': v['name'], 'fields': [f['name'] for f in v['flds']]} for k, v in json.loads(row[1]).items()}

    cards = {}
    for nid, did, ivl, lapses, reps, queue in cur.execute('select nid, did, ivl, lapses, reps, queue from cards'):
        c = cards.setdefault(nid, {'decks': set(), 'ivl': 0, 'lapses': 0, 'reps': 0, 'suspended': False})
        c['decks'].add(decks.get(did, str(did)))
        c['ivl'] = max(c['ivl'], ivl)
        c['lapses'] += lapses
        c['reps'] += reps
        c['suspended'] |= queue == -1

    notes = []
    for nid, mid, flds, tags in cur.execute('select id, mid, flds, tags from notes'):
        m = models.get(mid, {'name': str(mid), 'fields': []})
        vals = [strip_html(v) for v in flds.split('\x1f')]
        c = cards.get(nid, {})
        notes.append({
            'id': nid, 'model': m['name'],
            'fields': dict(zip(m['fields'] or [f'f{i}' for i in range(len(vals))], vals)),
            'tags': tags.split(), 'decks': sorted(c.get('decks', [])),
            'ivl': c.get('ivl', 0), 'lapses': c.get('lapses', 0), 'reps': c.get('reps', 0),
        })
    summary = {}
    for n in notes:
        for d in n['decks'] or ['?']:
            summary[d] = summary.get(d, 0) + 1
    json.dump({'decks': summary, 'models': list(models.values()), 'notes': notes}, open(out, 'w'), ensure_ascii=False, indent=1)
    print(f'{len(notes)} notes')
    for d, k in sorted(summary.items()):
        print(f'  {k:6d}  {d}')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
