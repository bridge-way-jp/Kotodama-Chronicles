import { useEffect, useRef, useState } from 'react';
import type { Step } from '../core/script';
import { check, type Mood } from '../core/script';
import { store } from '../core/store';
import { runAction, type ActionHooks } from '../core/game';
import { encounter, recordAnswer, recordComprehension, type Exercise } from '../core/learning';
import { toast } from '../core/events';
import { sfx, speak, stopSpeech, ttsAvailable } from '../core/audio';
import { NPCS } from '../content/npcs';
import { ITEMS } from '../content/creatures';
import { Jp, plainText, withName } from './Jp';
import { QuestionBlock } from './Question';
import { ReadingChallenge, ListeningChallenge } from './Challenges';
import { TeachCard } from './Cards';
import { Battle, type BattleResult } from './Battle';
import { MasteryCheck, checkKeys } from './Mastery';
import { giftPhrase, profileOf, smallTalk } from '../core/social';

/** Session-only dialogue backlog (not saved). */
export const backlog: { who: string; text: string; en?: string }[] = [];

interface Frame {
  steps: Step[];
  i: number;
}

export function ScriptRunner({ steps, onEnd, hooks }: { steps: Step[]; onEnd: () => void; hooks: ActionHooks }) {
  const [stack, setStack] = useState<Frame[]>([{ steps, i: 0 }]);
  const top = stack[stack.length - 1];
  const step: Step | undefined = top?.steps[top.i];

  const advance = (push?: Step[]) => {
    setStack((st) => {
      const next = st.map((f) => ({ ...f }));
      next[next.length - 1].i++;
      if (push && push.length) next.push({ steps: push, i: 0 });
      // pop finished frames
      while (next.length && next[next.length - 1].i >= next[next.length - 1].steps.length) {
        next.pop();
        if (next.length) {
          /* parent already advanced */
        }
      }
      return next;
    });
  };

  // automatic (non-interactive) steps
  useEffect(() => {
    if (!top) {
      onEnd();
      return;
    }
    if (!step) return;
    if ('do' in step) {
      store.update((s) => step.do.forEach((a) => runAction(s, a, hooks)), 'script');
      advance();
    } else if ('if' in step) {
      advance(check(store.s, step.if) ? step.then : step.else);
    } else if ('toast' in step) {
      toast(step.toast);
      advance();
    } else if ('talk' in step) {
      advance(smallTalk(store.s, step.talk));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stack]);

  if (!step) return null;

  if ('cg' in step) return <CgScene key={stackKey(stack)} step={step} onNext={() => advance()} />;

  if ('say' in step) return <SayBox key={stackKey(stack)} step={step} onNext={() => advance()} />;

  if ('choice' in step)
    return (
      <div className="dialogue-wrap">
        <div className="panel choice-box">
          {step.choice.map((c, i) => (
            <button key={i} className="btn choice" autoFocus={i === 0} onClick={() => (sfx('blip'), advance(c.then))}>
              <Jp text={c.text} />
              {c.en && <small>{withName(c.en)}</small>}
            </button>
          ))}
        </div>
      </div>
    );

  if ('reading' in step)
    return (
      <div className="overlay-panel">
        <ReadingChallenge id={step.reading} onDone={() => advance(step.then)} />
      </div>
    );

  if ('listening' in step)
    return (
      <div className="overlay-panel">
        <ListeningChallenge id={step.listening} onDone={() => advance(step.then)} />
      </div>
    );

  if ('quiz' in step) return <QuizStep key={stackKey(stack)} step={step} onDone={() => advance()} />;

  if ('teach' in step) return <TeachStep key={stackKey(stack)} k={step.teach} onDone={() => advance()} />;

  if ('check' in step) return <TicketCheck key={stackKey(stack)} onDone={() => advance()} />;

  if ('hear' in step) return <HearStep key={stackKey(stack)} h={step.hear} onDone={() => advance()} />;

  if ('build' in step) return <BuildStep key={stackKey(stack)} b={step.build} onDone={() => advance()} />;

  if ('gift' in step) return <GiftStep key={stackKey(stack)} who={step.gift} onDone={(steps) => advance(steps)} />;

  if ('battle' in step)
    return (
      <div className="overlay-full">
        <Battle setup={step.battle} onEnd={(r: BattleResult) => advance(r === 'win' || r === 'recruit' ? step.win : step.lose)} />
      </div>
    );

  if ('shop' in step) return <Shop items={step.shop} onDone={() => advance()} />;

  return null;
}

/** a story question; a wrong first answer brings the same item back in another form until it is right */
function QuizStep({ step, onDone }: { step: Extract<Step, { quiz: unknown }>; onDone: () => void }) {
  const [again, setAgain] = useState<string | null>(null);
  if (again)
    return (
      <div className="dialogue-wrap">
        <div className="panel quiz-box">
          <MasteryCheck keys={[again]} title="もう一度 — once more" sub="That one did not sit yet. Here it is again in another form." onDone={onDone} />
        </div>
      </div>
    );
  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box">
        <QuestionBlock
          q={step.quiz}
          retry={step.retry}
          onDone={(ok, ms) => {
            const [first, ...rest] = step.keys ?? [];
            store.update((s) => {
              if (first) {
                const ex: Exercise = { id: 'quiz', key: first, area: step.area, mode: 'story-quiz', context: true, instruction: '', prompt: step.quiz.q, explanation: '' };
                recordAnswer(s, ex, ok, ms);
              } else recordComprehension(s, step.area, ok, ms);
              encounter(s, rest);
            }, 'learn');
            if (!ok && first) setAgain(first);
            else onDone();
          }}
        />
      </div>
    </div>
  );
}

/** a new expression: the card, then straight away one question on it that has to be answered right */
function TeachStep({ k, onDone }: { k: string; onDone: () => void }) {
  const [checking, setChecking] = useState(false);
  return (
    <div className="dialogue-wrap">
      <div className="panel">
        {checking ? (
          <MasteryCheck keys={[k]} title="確認 — quick check" sub="Use what you just read." onDone={onDone} />
        ) : (
          <TeachCard
            k={k}
            onDone={() => {
              store.update((s) => encounter(s, [k]), 'learn');
              setChecking(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

/** the ticket check at the gates: three studied items (due ones first); skipped while nothing has been studied yet */
function TicketCheck({ onDone }: { onDone: () => void }) {
  const [keys] = useState(() => checkKeys(store.s, 3));
  useEffect(() => {
    if (!keys.length) onDone();
  }, []);
  if (!keys.length) return null;
  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box">
        <MasteryCheck keys={keys} title="🎫 改札チェック — ticket check" sub="Three words you have learned. Answer them to pass the gate." onDone={onDone} />
      </div>
    </div>
  );
}

/** listening first: the line is only spoken; pick what it meant, then the text appears */
function HearStep({ h, onDone }: { h: Extract<Step, { hear: unknown }>['hear']; onDone: () => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  const npc = h.who ? NPCS[h.who] : undefined;
  const play = () => void speak([{ text: plainText(h.text), voice: h.voice }], store.s.settings.ttsRate ?? 1);
  useEffect(() => {
    play();
    return () => stopSpeech();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const ok = picked === h.answer;
  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box hear">
        <div className="hear-head">
          <b>{npc?.name ?? ''}</b> <span className="note">🎧 聞き取り — listen first</span>
          <button className="btn small" onClick={play}>🔊 もう一度</button>
        </div>
        {picked === null ? (
          <div className="hear-hidden">……</div>
        ) : (
          <div className="hear-text">
            <Jp text={h.text} />
          </div>
        )}
        <div className="options">
          {h.options.map((o, i) => (
            <button
              key={i}
              className={`opt ${picked !== null && i === h.answer ? 'correct' : ''} ${picked === i && !ok ? 'wrong' : ''}`}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                sfx(i === h.answer ? 'ok' : 'bad');
                store.update((s) => recordComprehension(s, 'listening', i === h.answer, 3000), 'learn');
              }}
            >
              {withName(o)}
            </button>
          ))}
        </div>
        {picked !== null && (
          <button className="btn primary" autoFocus onClick={onDone}>
            次へ ▶
          </button>
        )}
      </div>
    </div>
  );
}

/** put a sentence together from blocks */
function BuildStep({ b, onDone }: { b: Extract<Step, { build: unknown }>['build']; onDone: () => void }) {
  const [order] = useState(() => {
    const idx = b.chunks.map((_, i) => i);
    for (let n = 0; n < 6 && idx.every((v, i) => v === i); n++) idx.sort(() => Math.random() - 0.5);
    return idx;
  });
  const [used, setUsed] = useState<number[]>([]);
  const [wrong, setWrong] = useState(false);
  const done = used.length === b.chunks.length;
  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box build">
        <div className="note">✎ 文を作ろう — build your answer: {b.en}</div>
        <div className="build-line" lang="ja">
          {used.map((i) => (
            <span key={i} className="build-chip on">
              {b.chunks[i]}
            </span>
          ))}
          {!done && <span className="build-cursor">＿</span>}
        </div>
        <div className="build-pool" lang="ja">
          {order.map((i) =>
            used.includes(i) ? null : (
              <button
                key={i}
                className={`build-chip ${wrong ? 'shake' : ''}`}
                onClick={() => {
                  // blocks only go in the right order: a wrong one shakes and teaches the order
                  if (i === used.length) {
                    setUsed([...used, i]);
                    setWrong(false);
                    sfx('blip');
                  } else {
                    setWrong(true);
                    sfx('bad');
                    setTimeout(() => setWrong(false), 400);
                  }
                }}
              >
                {b.chunks[i]}
              </button>
            ),
          )}
        </div>
        {done && (
          <button
            className="btn primary"
            autoFocus
            onClick={() => {
              if (ttsAvailable()) void speak([{ text: b.chunks.join('') }]);
              onDone();
            }}
          >
            言う ▶
          </button>
        )}
      </div>
    </div>
  );
}

/** choose something from the bag to give */
function GiftStep({ who, onDone }: { who: string; onDone: (steps: Step[]) => void }) {
  const items = Object.entries(store.s.inventory).filter(([k, n]) => n > 0 && ITEMS[k]?.kind === 'heal');
  const npc = NPCS[who];
  return (
    <div className="dialogue-wrap">
      <div className="panel quiz-box gift">
        <div className="note">🎁 {npc?.name}さんに何をあげる？ — what will you give?</div>
        <div className="gift-grid">
          {items.map(([k, n]) => (
            <button key={k} className="gift-item" onClick={() => onDone(giftPhrase(store.s, who, k))}>
              <img className="px" src={`assets/${ITEMS[k].icon}.png`} alt="" />
              <span lang="ja">{ITEMS[k].name}</span>
              <small>×{n}</small>
            </button>
          ))}
        </div>
        <button className="btn" onClick={() => onDone([])}>
          やめる
        </button>
      </div>
    </div>
  );
}

function stackKey(stack: Frame[]) {
  return stack.map((f) => f.i).join('.') + ':' + stack.length;
}

/** Picks a portrait expression from the line when the script does not specify one. */
export function inferMood(text: string): Mood {
  if (/まさか|えっ|！？|あれ[、…？]|なんで|本当[？！]/.test(text)) return 'surprised';
  if (/困って|すみません|申し訳|忘れて|気をつけ|危な|おかしい|ぼんやり|寂し|……。$/.test(text)) return 'worried';
  if (/ありがとう|助かり|よかった|さすが|完璧|うれし|ようこそ|いらっしゃ|！$|ね。$|よ。$/.test(text)) return 'happy';
  return 'neutral';
}

/** Full-screen story illustration with an optional caption. */
function CgScene({ step, onNext }: { step: Extract<Step, { cg: string }>; onNext: () => void }) {
  const [showEn, setShowEn] = useState(store.state?.settings.translation === 'always');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step.say) backlog.push({ who: '', text: step.say, en: step.en });
    const onKey = (e: KeyboardEvent) => {
      if (!['Enter', 'Space', 'KeyZ'].includes(e.code)) return;
      if (!ref.current || ref.current.getClientRects().length === 0) return;
      if (document.querySelector('.gloss-backdrop')) return;
      e.preventDefault();
      onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="cg-scene" ref={ref} onClick={() => (sfx('blip'), onNext())}>
      <CgImage name={step.cg} />
      {step.say && (
        <div className="cg-caption" onClick={(e) => e.stopPropagation()}>
          <div className="dlg-text" onClick={() => onNext()}>
            <Jp text={step.say} auto />
          </div>
          {showEn && step.en && <div className="dlg-en">{withName(step.en)}</div>}
          <div className="dlg-tools">
            {step.en && store.state?.settings.translation !== 'never' && (
              <button className="en-btn" onClick={() => setShowEn(!showEn)}>EN</button>
            )}
            <span className="next-arrow petal" onClick={() => onNext()} />
          </div>
        </div>
      )}
    </div>
  );
}

/** story pictures that also exist as portrait versions (assets/<name>_p.webp) for phones held upright */
const PORTRAIT_CG = new Set<string>([]);

/**
 * Wide story pictures on a portrait phone: show the portrait version if there is one,
 * otherwise slowly pan across the full picture instead of cutting its sides off.
 */
function CgImage({ name }: { name: string }) {
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)');
    const on = () => setPortrait(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  if (portrait && PORTRAIT_CG.has(name)) return <img className="cg-img cg-portrait" src={`assets/${name}_p.webp`} alt="" />;
  if (portrait) return <div className="cg-pan" style={{ backgroundImage: `url(assets/${name}.webp)` }} role="img" />;
  return <img className="cg-img" src={`assets/${name}.webp`} alt="" />;
}

function SayBox({ step, onNext }: { step: Extract<Step, { say: string }>; onNext: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const npc = step.who ? NPCS[step.who] : undefined;
  const [showEn, setShowEn] = useState(store.state?.settings.translation === 'always');
  const [showLog, setShowLog] = useState(false);

  // read the line aloud when the player switched this on in Settings
  useEffect(() => {
    if (!store.state?.settings.readAloud || !ttsAvailable()) return;
    void speak([{ text: plainText(step.say), voice: step.who ? profileOf(step.who)?.voice : undefined }], store.state.settings.ttsRate ?? 1);
    return () => stopSpeech();
  }, [step]);

  useEffect(() => {
    backlog.push({ who: npc?.name ?? '', text: step.say, en: step.en });
    if (backlog.length > 80) backlog.shift();
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'Space' || e.code === 'KeyZ') {
        if (document.querySelector('.gloss-backdrop, .backlog')) return;
        // ignore while this dialogue is hidden under another overlay
        if (!wrapRef.current || wrapRef.current.getClientRects().length === 0) return;
        const t = e.target as HTMLElement;
        if (t?.tagName === 'BUTTON' && t.classList.contains('en-btn')) return;
        e.preventDefault();
        sfx('blip');
        onNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const base = npc ? npc.portrait ?? npc.sprite : null;
  const mood = step.mood ?? inferMood(step.say);
  const portrait = base?.startsWith('portrait_') ? `${base}_${mood}` : base;

  return (
    <div className="dialogue-wrap" ref={wrapRef} onClick={() => (sfx('blip'), onNext())}>
      {showLog && (
        <div className="panel backlog" onClick={(e) => e.stopPropagation()}>
          <div className="panel-title">会話ログ Dialogue log</div>
          {backlog.slice(-30).map((b, i) => (
            <div key={i} className="log-line">
              {b.who && <b>{b.who}：</b>}
              <Jp text={b.text} />
              {b.en && <div className="q-en">{withName(b.en)}</div>}
            </div>
          ))}
          <button className="btn" onClick={() => setShowLog(false)}>閉じる</button>
        </div>
      )}
      <div className={`dialogue ${npc ? '' : 'narration'}`}>
        {portrait && (
          <div className="portrait" style={{ borderColor: npc?.color }}>
            <img className="px" src={`assets/${portrait}.png`} alt="" style={npc?.portraitFilter ? { filter: npc.portraitFilter } : undefined} />
            {mood !== 'neutral' && mood !== 'happy' && <img className="px portrait-emote" src={`assets/${mood === 'surprised' ? 'em_alert' : 'em_sweat'}.png`} alt="" />}
          </div>
        )}
        <div className="dlg-body">
          {npc && (
            <div className="speaker" style={{ background: npc.color }}>
              {npc.name}
            </div>
          )}
          <div className="dlg-text">
            <Jp text={step.say} auto />
          </div>
          {showEn && step.en && <div className="dlg-en">{withName(step.en)}</div>}
          <div className="dlg-tools" onClick={(e) => e.stopPropagation()}>
            {step.en && store.state?.settings.translation !== 'never' && (
              <button className="en-btn" onClick={() => setShowEn(!showEn)}>
                EN
              </button>
            )}
            <button className="en-btn" onClick={() => setShowLog(true)}>
              LOG
            </button>
            <span className="next-arrow petal" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Shop({ items, onDone }: { items: string[]; onDone: () => void }) {
  const [, setV] = useState(0);
  const s = store.s;
  return (
    <div className="dialogue-wrap">
      <div className="panel shop">
        <div className="panel-title">
          お店 Shop <span className="money">¥{s.money}</span>
        </div>
        {items.map((id) => {
          const it = ITEMS[id];
          return (
            <div key={id} className="shop-row">
              <img className="px icon" src={`assets/${it.icon}.png`} alt="" />
              <div className="shop-info">
                <b>{it.name}</b> <small>{it.nameEn}</small>
                <div className="note">{it.desc}</div>
              </div>
              <button
                className="btn small"
                disabled={s.money < (it.price ?? 0) || (it.kind === 'deco' && !!s.inventory[id])}
                onClick={() => {
                  store.update((st) => {
                    st.money -= it.price ?? 0;
                    st.inventory[id] = (st.inventory[id] ?? 0) + 1;
                  }, 'shop');
                  sfx('ok');
                  setV((v) => v + 1);
                }}
              >
                {it.kind === 'deco' && s.inventory[id] ? '購入済み' : `¥${it.price} で買う`}
              </button>
            </div>
          );
        })}
        <button className="btn primary" autoFocus onClick={onDone}>
          ありがとう ▶
        </button>
      </div>
    </div>
  );
}
