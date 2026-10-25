import { useEffect, useMemo, useState } from 'react';
import { tr } from '../core/i18n';
import { BOARD_ROWS, BOARD_TRACKS, FORM_CASES, FORM_FIELDS, KUSHI_READINGS, SHOPS, makeAnnouncement, makeDepartures, type Box, type Departure } from '../content/everyday';
import { shuffle } from '../core/learning';
import { grantXp } from '../core/game';
import { speak, stopSpeech, ttsAvailable } from '../core/audio';
import { store } from '../core/store';
import { Jp, plainText } from './Jp';

/**
 * "Japan im Alltag": everyday scenes on a painted backdrop, the Japanese written onto its empty labels
 * (content/everyday.ts). Three rounds a visit; XP (and pay at the café) once a day.
 */

const ROUNDS = 3;
/** the picture as large as fits: the whole width, or less on a short screen so the buttons stay in view */
const pic = (w: number, h: number) => ({ aspectRatio: `${w} / ${h}`, width: `min(100%, calc(56vh * ${w / h}))` });
const at = ([x, y, w, h]: Box) => ({ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` });
const say = (markup: string) => speak([{ text: plainText(markup) }]);

function reward(scene: string, ok: number, pay = 0) {
  const flag = `alltag_${scene}`;
  const first = store.s.flags[flag] !== store.s.day;
  if (first)
    store.update((s) => {
      s.flags[flag] = s.day;
      s.flags.alltag_total = (Number(s.flags.alltag_total) || 0) + 1;
      s.money += ok * pay;
      grantXp(s, 5 + ok * 5);
    }, 'learn');
  return first;
}

const Close = ({ onClose }: { onClose: () => void }) => (
  <button className="everyday-close" onClick={onClose} aria-label="閉じる">×</button>
);

function Done({ title, ok, scene, pay, onClose, extra }: { title: string; ok: number; scene: string; pay?: number; onClose: () => void; extra?: React.ReactNode }) {
  const [first] = useState(() => reward(scene, ok, pay));
  return (
    <div className="panel study everyday">
      <div className="panel-title"><Jp text={title} /></div>
      <p className="big-score">{ok} / {ROUNDS}</p>
      {extra}
      <p>{first ? <>+{5 + ok * 5} XP{pay ? <> · +¥{ok * pay}</> : null}</> : <span className="note">Today’s reward is already yours — practice as much as you like.</span>}</p>
      <button className="btn primary" autoFocus onClick={onClose}>閉じる</button>
    </div>
  );
}

// ---------------------------------------------------------------- ticket machine, café board, kushikatsu plates

function ShopScene({ id, onClose }: { id: string; onClose: () => void }) {
  const shop = SHOPS[id];
  const [orders] = useState(() => shuffle(shop.orders.slice()).slice(0, ROUNDS));
  const [i, setI] = useState(-1);
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<null | boolean>(null);
  const [shown, setShown] = useState(shop.mode === 'read' || !ttsAvailable());
  const [ok, setOk] = useState(0);
  const order = orders[i];
  const items = Object.fromEntries(shop.items.map((x) => [x.id, x]));

  useEffect(() => {
    if (order && shop.mode === 'listen') void say(order.say);
    return () => stopSpeech();
  }, [i]);

  if (i >= orders.length) return <Done title={shop.title} ok={ok} scene={id} pay={id === 'cafe' ? 100 : 0} onClose={onClose} />;
  if (i < 0)
    return (
      <div className="panel study everyday">
        <div className="panel-title"><Jp text={shop.title} /> <span className="note">{tr(shop.titleEn)}</span></div>
        <img className="everyday-preview" src={`assets/${shop.image}.jpg`} alt="" />
        <p lang="ja"><Jp text={shop.intro} /></p>
        <p className="note">{tr(shop.introEn)}</p>
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setI(0)}>始める Start</button>
          <button className="btn" onClick={onClose}>やめる</button>
        </div>
      </div>
    );

  const toggle = (x: string) => result === null && setPicked((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]));
  const total = picked.reduce((a, x) => a + items[x].price, 0);
  const submit = () => {
    const good = picked.length === order.want.length && order.want.every((x) => picked.includes(x));
    setResult(good);
    setShown(true);
    if (good) setOk(ok + 1);
  };
  const next = () => {
    setPicked([]);
    setResult(null);
    setShown(shop.mode === 'read' || !ttsAvailable());
    setI(i + 1);
  };
  const [up, down] = shop.grow ?? [0, 0];

  return (
    <div className="panel study everyday">
      <div className="panel-title"><Jp text={shop.title} /> <span className="note">· {i + 1} / {orders.length}</span><Close onClose={onClose} /></div>
      <p className="note" lang="ja"><Jp text={shop.task} /> <span>· {tr(shop.taskEn)}</span></p>
      <div className="everyday-say">
        {shown ? <p lang="ja">「<Jp text={order.say} />」</p> : <p className="note">🔊 {tr('Listen to the order…')}</p>}
        {shop.mode === 'listen' && <button className="btn small" onClick={() => void say(order.say)}>🔊 もう一度</button>}
        {shop.mode === 'listen' && !shown && <button className="btn small" onClick={() => setShown(true)}>文字を見る</button>}
      </div>
      <div className="everyday-pic" style={shop.image === 'ui_ticket_machine' ? pic(1, 1) : pic(4, 3)}>
        <img src={`assets/${shop.image}.jpg`} alt="" />
        {shop.items.map((x) => {
          const [bx, by, bw, bh] = x.box;
          const on = picked.includes(x.id);
          const mark = result !== null && (order.want.includes(x.id) ? 'want' : on ? 'wrong' : '');
          return (
            <button
              key={x.id}
              className={`everyday-slot${on ? ' on' : ''}${mark ? ' ' + mark : ''}`}
              style={at([bx, by - up, bw, bh + up + down])}
              onClick={() => toggle(x.id)}
              aria-label={plainText(x.ja)}
            >
              <span className={`everyday-label${shop.vertical ? ' vertical' : ''} ${id}`} style={{ top: `${(up / (bh + up + down)) * 100}%`, height: `${(bh / (bh + up + down)) * 100}%` }}>
                {shop.vertical ? [...x.ja].map((ch, k) => <span key={k}>{ch}</span>) : shop.plain ? x.ja : <Jp text={x.ja} />}
                {!shop.vertical && <small>¥{x.price}</small>}
              </span>
            </button>
          );
        })}
      </div>
      {result === null ? (
        <div className="row">
          <span className="note">合計 ¥{total}</span>
          <button className="btn primary" disabled={!picked.length} onClick={submit}>{id === 'ticket' ? '購入' : id === 'cafe' ? '注文を通す' : '注文する'}</button>
        </div>
      ) : (
        <div className="everyday-result">
          <p className={result ? 'good' : 'bad'}>{result ? '◎ ばっちり！' : '× ちょっと違う…'}</p>
          <p className="note">{tr(order.en)}</p>
          <p lang="ja">
            {order.want.map((x) => (
              <span key={x} className="everyday-chip">
                {items[x].ja.includes('{') ? <Jp text={items[x].ja} /> : <ruby>{items[x].ja}<rt>{KUSHI_READINGS[x] ?? ''}</rt></ruby>} <small>{tr(items[x].en)}</small>
              </span>
            ))}
          </p>
          <button className="btn primary" autoFocus onClick={next}>次へ</button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- departure board and announcements

const TRACK_COLORS = ['#d33', '#36c', '#2a2', '#e9b100'];

function DepartureScene({ onClose }: { onClose: () => void }) {
  const [round, setRound] = useState(-1);
  const [ok, setOk] = useState(0);
  const [board, setBoard] = useState<Departure[]>(() => makeDepartures());
  const ann = useMemo(() => makeAnnouncement(board), [round]);
  const [answer, setAnswer] = useState<number | null>(null);
  const [shown, setShown] = useState(!ttsAvailable());

  useEffect(() => {
    if (round >= 0 && round < ROUNDS) void speak([{ text: ann.say, voice: 'f' }], 0.95);
    return () => stopSpeech();
  }, [round]);

  if (round >= ROUNDS) return <Done title="{発車標|はっしゃひょう}" ok={ok} scene="departure" onClose={onClose} />;
  if (round < 0)
    return (
      <div className="panel study everyday">
        <div className="panel-title">{'駅のアナウンス'} <span className="note">Station announcements</span></div>
        <img className="everyday-preview" src="assets/ui_departure_board.jpg" alt="" />
        <p lang="ja"><Jp text="ホームに{放送|ほうそう}が{流|なが}れる。{遅|おく}れ、{番線|ばんせん}の{変更|へんこう}、{最終電車|さいしゅうでんしゃ}……。{聞|き}き{取|と}って、{発車標|はっしゃひょう}のどの{電車|でんしゃ}のことか、{選|えら}ぼう。" /></p>
        <p className="note">{tr('Announcements on the platform: delays, platform changes, the last train… Listen and pick which train on the board they mean.')}</p>
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setRound(0)}>始める Start</button>
          <button className="btn" onClick={onClose}>やめる</button>
        </div>
      </div>
    );

  const view = board.map((d, k) => (answer !== null && ann.change?.row === k ? { ...d, time: ann.change.time ?? d.time, track: ann.change.track ?? d.track } : d));
  const pick = (k: number) => {
    if (answer !== null) return;
    setAnswer(k);
    setShown(true);
    if (k === ann.answer) setOk(ok + 1);
  };
  const next = () => {
    setAnswer(null);
    setShown(!ttsAvailable());
    setBoard(makeDepartures());
    setRound(round + 1);
  };

  return (
    <div className="panel study everyday">
      <div className="panel-title">駅のアナウンス <span className="note">· {round + 1} / {ROUNDS}</span><Close onClose={onClose} /></div>
      <p lang="ja" className="everyday-ask">{ann.ask} <span className="note">{tr(ann.askEn)}</span></p>
      <div className="everyday-say">
        {shown ? <p lang="ja" className="everyday-ann">{ann.say}</p> : <p className="note">🔊 …</p>}
        <button className="btn small" onClick={() => void speak([{ text: ann.say, voice: 'f' }], 0.95)}>🔊 もう一度</button>
        {!shown && <button className="btn small" onClick={() => setShown(true)}>文字を見る</button>}
      </div>
      <div className="everyday-pic" style={pic(16, 9)}>
        <img src="assets/ui_departure_board.jpg" alt="" />
        {view.map((d, k) => (
          <button key={k} className={`everyday-led${answer !== null ? (k === ann.answer ? ' want' : k === answer ? ' wrong' : '') : ''}`} style={at(BOARD_ROWS[k])} onClick={() => pick(k)}>
            <span>{d.time}</span>
            <span>{d.type}</span>
            <span>{d.dest}</span>
          </button>
        ))}
        {view.map((d, k) => (
          <span key={'t' + k} className="everyday-track" style={{ ...at(BOARD_TRACKS[k]), color: '#fff', textShadow: `0 0 2px ${TRACK_COLORS[k]}` }}>{d.track}</span>
        ))}
      </div>
      {answer !== null && (
        <div className="everyday-result">
          <p className={answer === ann.answer ? 'good' : 'bad'}>{answer === ann.answer ? '◎ 正解！' : '× 違う電車だった…'}</p>
          <button className="btn primary" autoFocus onClick={next}>次へ</button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- lost-property form at the police box

function FormScene({ onClose }: { onClose: () => void }) {
  const [c] = useState(() => FORM_CASES[Math.floor(Math.random() * FORM_CASES.length)]);
  const name = store.s.playerName || '私';
  const right: Record<string, string> = useMemo(() => ({ name, ...c.right }), [c]);
  const [cards] = useState(() => shuffle([...Object.values(right), ...c.wrong]));
  const [filled, setFilled] = useState<Record<string, string>>({});
  const [hold, setHold] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [tries, setTries] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const wrongFields = FORM_FIELDS.filter((f) => (filled[f.id] ?? '') !== (right[f.id] ?? ''));
  const done = checked && !wrongFields.length;
  // three points for a form right the first time, one less for each try more
  if (finished) return <Done title="{遺失届|いしつとどけ}" ok={Math.max(1, ROUNDS + 1 - tries)} scene="form" onClose={onClose} />;

  if (!started)
    return (
      <div className="panel study everyday">
        <div className="panel-title"><Jp text="{交番|こうばん}　{遺失届|いしつとどけ}" /> <span className="note">Lost-property report</span></div>
        <img className="everyday-preview" src="assets/ui_form.jpg" alt="" />
        <p lang="ja"><Jp text="「どうしましたか。{落|お}とし{物|もの}ですね。では、こちらの{用紙|ようし}に{記入|きにゅう}してください。」" /></p>
        <p className="note">{tr('Read what you told the officer, then put the right card into each box of the form. Careful: some cards are almost the same.')}</p>
        <div className="row">
          <button className="btn primary" autoFocus onClick={() => setStarted(true)}>始める Start</button>
          <button className="btn" onClick={onClose}>やめる</button>
        </div>
      </div>
    );

  const used = new Set(Object.values(filled));
  const put = (field: string) => {
    if (done) return;
    setChecked(false);
    setFilled((f) => {
      const n = { ...f };
      if (hold) {
        for (const k of Object.keys(n)) if (n[k] === hold) delete n[k];
        n[field] = hold;
      } else delete n[field];
      return n;
    });
    setHold(null);
  };

  return (
    <div className="panel study everyday">
      <div className="panel-title"><Jp text="{遺失届|いしつとどけ}" /> <span className="note">{tries ? `· ${tries}回目` : ''}</span><Close onClose={onClose} /></div>
      <div className="everyday-say"><p lang="ja">「<Jp text={c.story} />」</p></div>
      <div className="everyday-cards">
        {cards.map((x) => (
          <button key={x} className={`everyday-card${hold === x ? ' on' : ''}${used.has(x) ? ' used' : ''}`} onClick={() => !done && setHold(hold === x ? null : x)} lang="ja">{x}</button>
        ))}
      </div>
      <div className="everyday-pic form" style={pic(4, 5)}>
        <img src="assets/ui_form.jpg" alt="" />
        {FORM_FIELDS.map((f) => (
          <button key={f.id} className={`everyday-field${checked && wrongFields.includes(f) ? ' wrong' : ''}${done ? ' want' : ''}`} style={at(f.box)} onClick={() => put(f.id)}>
            <small><Jp text={f.label} /></small>
            <span lang="ja">{filled[f.id] ?? ''}</span>
          </button>
        ))}
        {done && <span className="everyday-stamp">受理</span>}
      </div>
      {done ? (
        <div className="everyday-result">
          <p className="good">◎ 「はい、{'受け付けました'}。{'見つかったら、ご連絡します'}ね。」</p>
          <p className="note">{tr(c.en)}</p>
          <button className="btn primary" autoFocus onClick={() => setFinished(true)}>次へ</button>
        </div>
      ) : (
        <div className="row">
          <span className="note">{tr(hold ? 'Tap a box for this card.' : 'Tap a card, then a box. (Leave a box empty if you were not told.)')}</span>
          <button
            className="btn primary"
            onClick={() => {
              setChecked(true);
              setTries(tries + 1);
            }}
          >
            {'提出する'}
          </button>
        </div>
      )}
    </div>
  );
}

export function Everyday({ scene, onClose }: { scene: string; onClose: () => void }) {
  if (scene === 'departure') return <DepartureScene onClose={onClose} />;
  if (scene === 'form') return <FormScene onClose={onClose} />;
  if (SHOPS[scene]) return <ShopScene id={scene} onClose={onClose} />;
  return null;
}
