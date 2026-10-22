import { store } from '../core/store';
import { confusionPairs, describeKey } from '../core/learning';
import { Jp } from './Jp';

function Side({ k }: { k: string }) {
  const d = describeKey(k, store.s.settings.meaningLang);
  return (
    <div className="mix-side">
      <b lang="ja">{d.label}</b>
      {d.reading && <small lang="ja"> {d.reading}</small>}
      <div>{d.meaning}</div>
      {d.example && (
        <div className="mix-ex" lang="ja">
          <Jp text={d.example} />
        </div>
      )}
    </div>
  );
}

/** a mixed-up pair shown side by side */
export function MixPair({ a, b }: { a: string; b: string }) {
  return (
    <div className="mix-pair">
      <Side k={a} />
      <span className="mix-vs">⇄</span>
      <Side k={b} />
    </div>
  );
}

/** the words and patterns the player mixed up, with a drill between each pair */
export function MixupsSection({ onPractice }: { onPractice: () => void }) {
  const pairs = confusionPairs(store.s);
  return (
    <>
      <h3>間違えやすい Mix-ups</h3>
      {!pairs.length ? (
        <p className="note">When you pick one word or pattern instead of another, the pair shows up here so you can train the difference.</p>
      ) : (
        <>
          <p className="note">Pairs you have confused, most often first. Mixed up twice or more, they also come back as drills in reviews and battles.</p>
          {pairs.slice(0, 6).map((p) => (
            <div key={p.a + p.b} className="mix-row">
              <MixPair a={p.a} b={p.b} />
              <small className="note">×{p.n}</small>
            </div>
          ))}
          <button className="btn primary" onClick={onPractice}>
            違いを練習 Practise the differences
          </button>
        </>
      )}
    </>
  );
}
