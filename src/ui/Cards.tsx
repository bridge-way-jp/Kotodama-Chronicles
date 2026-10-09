import { useEffect, useState } from 'react';
import { VOCAB_BY_ID } from '../content/vocab';
import { GRAMMAR_BY_ID } from '../content/grammar';
import { KANJI_BY_ID } from '../content/kanji';
import { bus } from '../core/events';
import { store } from '../core/store';
import { encounter } from '../core/learning';
import { mastery } from '../core/srs';
import { AudioButton } from './Question';

export const MASTERY_LABEL: Record<string, string> = {
  unseen: '未出会い not met',
  seen: '出会った seen',
  learning: '学習中 learning',
  young: '定着中 consolidating',
  mature: '習得 mastered',
  struggling: '要復習 needs work',
};

export function MasteryBadge({ k }: { k: string }) {
  const c = store.state?.cards[k];
  const m = c ? mastery(c) : 'unseen';
  return <span className={`badge m-${m}`}>{MASTERY_LABEL[m]}</span>;
}

export function ItemDetail({ k }: { k: string }) {
  const [t, id] = k.split(':');
  const lang = store.state?.settings.meaningLang ?? 'en';
  if (t === 'v') {
    const v = VOCAB_BY_ID[id];
    if (!v) return null;
    return (
      <div className="item-detail">
        <div className="big-word" lang="ja">
          <ruby>
            {v.word}
            <rt>{v.reading}</rt>
          </ruby>
        </div>
        <div className="meaning">{lang === 'de' ? v.de : v.en}</div>
        <div className="meta">
          {v.pos} · {v.level === 'story' ? 'story word' : `≈${v.level}`} <MasteryBadge k={k} />
        </div>
        <div className="example" lang="ja">{v.example}</div>
        <div className="q-en">{(lang === 'de' && v.exampleDe) || v.exampleEn}</div>
        <AudioButton lines={[{ text: v.word }, { text: v.example }]} label="▶ 発音" />
        {v.collocations && <div className="meta">Collocations: {v.collocations.join('・')}</div>}
        {v.related && <div className="meta">Related: {v.related.map((r) => VOCAB_BY_ID[r]?.word).join('・')}</div>}
      </div>
    );
  }
  if (t === 'g') {
    const g = GRAMMAR_BY_ID[id];
    if (!g) return null;
    return (
      <div className="item-detail">
        <div className="big-word" lang="ja">{g.pattern}</div>
        <div className="meaning">{g.meaning}</div>
        <div className="meta">
          {g.formation && <>Form: {g.formation} </>}<MasteryBadge k={k} />
        </div>
        <p>{g.explanation}</p>
        {g.nuance && <p className="meta">Nuance: {g.nuance}</p>}
        {g.mistakes && <p className="meta warn">⚠ {g.mistakes}</p>}
        {g.examples.map((e, i) => (
          <div key={i}>
            <div className="example" lang="ja">{e.jp}</div>
            <div className="q-en">{e.en}</div>
          </div>
        ))}
        {g.similar.length > 0 && <div className="meta">Compare: {g.similar.map((s) => GRAMMAR_BY_ID[s]?.pattern).join('・')}</div>}
      </div>
    );
  }
  if (t === 'k') {
    const kj = KANJI_BY_ID[id];
    if (!kj) return null;
    return (
      <div className="item-detail">
        <div className="big-word kanji" lang="ja">{kj.char}</div>
        <div className="meaning">{kj.meaning}</div>
        <div className="meta">
          音 {kj.on.join('、') || '—'} ・ 訓 {kj.kun.join('、') || '—'} ・ {kj.strokes} strokes <MasteryBadge k={k} />
        </div>
        {kj.words.map((w) => (
          <div key={w} className="example" lang="ja">
            {VOCAB_BY_ID[w]?.word}（{VOCAB_BY_ID[w]?.reading}）— {VOCAB_BY_ID[w]?.en}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

/** Popup shown when tapping a linked word in any Japanese text. */
export function GlossPopup() {
  const [key, setKey] = useState<string | null>(null);
  useEffect(
    () =>
      bus.on('gloss', ({ key }) => {
        setKey(key);
        store.update((s) => encounter(s, [key]), 'gloss');
      }),
    [],
  );
  if (!key) return null;
  return (
    <div className="gloss-backdrop" onClick={() => setKey(null)}>
      <div className="panel gloss" onClick={(e) => e.stopPropagation()}>
        <ItemDetail k={key} />
        <button className="btn primary" autoFocus onClick={() => setKey(null)}>
          閉じる
        </button>
      </div>
    </div>
  );
}

/** Short teaching card used inside dialogue (story-first, explanation second). */
export function TeachCard({ k, onDone }: { k: string; onDone: () => void }) {
  return (
    <div className="teach">
      <div className="ch-kind">✎ 新しい表現 New expression</div>
      <ItemDetail k={k} />
      <button className="btn primary" autoFocus onClick={onDone}>
        わかった ▶
      </button>
    </div>
  );
}
