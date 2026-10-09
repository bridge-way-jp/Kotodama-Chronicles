import { useEffect, useRef, useState } from 'react';
import type { Step } from '../core/script';
import { check, type Mood } from '../core/script';
import { store } from '../core/store';
import { runAction, type ActionHooks } from '../core/game';
import { encounter, recordAnswer, recordComprehension, type Exercise } from '../core/learning';
import { toast } from '../core/events';
import { sfx } from '../core/audio';
import { NPCS } from '../content/npcs';
import { ITEMS } from '../content/creatures';
import { Jp, withName } from './Jp';
import { QuestionBlock } from './Question';
import { ReadingChallenge, ListeningChallenge } from './Challenges';
import { TeachCard } from './Cards';
import { Battle, type BattleResult } from './Battle';

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
              {c.en && <small>{c.en}</small>}
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

  if ('quiz' in step)
    return (
      <div className="dialogue-wrap">
        <div className="panel quiz-box">
          <QuestionBlock
            key={stackKey(stack)}
            q={step.quiz}
            retry={step.retry}
            onDone={(ok, ms) => {
              store.update((s) => {
                const [first, ...rest] = step.keys ?? [];
                if (first) {
                  const ex: Exercise = { id: 'quiz', key: first, area: step.area, mode: 'story-quiz', context: true, instruction: '', prompt: step.quiz.q, explanation: '' };
                  recordAnswer(s, ex, ok, ms);
                } else recordComprehension(s, step.area, ok, ms);
                encounter(s, rest);
              }, 'learn');
              advance();
            }}
          />
        </div>
      </div>
    );

  if ('teach' in step)
    return (
      <div className="dialogue-wrap">
        <div className="panel">
          <TeachCard
            k={step.teach}
            onDone={() => {
              store.update((s) => encounter(s, [step.teach]), 'learn');
              advance();
            }}
          />
        </div>
      </div>
    );

  if ('battle' in step)
    return (
      <div className="overlay-full">
        <Battle setup={step.battle} onEnd={(r: BattleResult) => advance(r === 'win' || r === 'recruit' ? step.win : step.lose)} />
      </div>
    );

  if ('shop' in step) return <Shop items={step.shop} onDone={() => advance()} />;

  return null;
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
      <img className="cg-img" src={`assets/${step.cg}.webp`} alt="" />
      {step.say && (
        <div className="cg-caption" onClick={(e) => e.stopPropagation()}>
          <div className="dlg-text" onClick={() => onNext()}>
            <Jp text={step.say} />
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

function SayBox({ step, onNext }: { step: Extract<Step, { say: string }>; onNext: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const npc = step.who ? NPCS[step.who] : undefined;
  const [showEn, setShowEn] = useState(store.state?.settings.translation === 'always');
  const [showLog, setShowLog] = useState(false);

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
            <Jp text={step.say} />
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
                disabled={s.money < (it.price ?? 0)}
                onClick={() => {
                  store.update((st) => {
                    st.money -= it.price ?? 0;
                    st.inventory[id] = (st.inventory[id] ?? 0) + 1;
                  }, 'shop');
                  sfx('ok');
                  setV((v) => v + 1);
                }}
              >
                ¥{it.price} で買う
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
