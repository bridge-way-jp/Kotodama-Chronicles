import type { Cond } from '../core/script';

/**
 * Part-time jobs (the Stardew part): a short themed practice round once per game day.
 * Each job trains one exam area and pays per correct answer.
 */
export interface JobDef {
  id: string;
  title: string;
  titleEn: string;
  npc: string; // who gives the job (portrait, colour)
  /** what is trained; "listening" uses vocab cards in listening mode */
  area: 'vocab' | 'kanji' | 'grammar' | 'listening';
  /** words of this tag are mixed in so the job always practises its own theme */
  theme: string[];
  rounds: number;
  payPer: number;
  /** extra item for a perfect round */
  bonus: string;
  intro: string;
  introEn: string;
  /** shown above every question (the job's framing) */
  task: string;
  taskEn: string;
  thanks: string;
  thanksEn: string;
  when?: Cond;
}

export const JOBS: Record<string, JobDef> = {
  orchard: {
    id: 'orchard', title: '桃の選別', titleEn: 'Peach sorting (vocabulary)', npc: 'hayashi', area: 'vocab',
    theme: ['v:kajuen', 'v:shuukaku', 'v:minoru', 'v:jukusu', 'v:saibai', 'v:hinshu', 'v:shukka', 'v:hiryou', 'v:teire', 'v:hitodebusoku', 'v:kurou', 'v:tanbo'],
    rounds: 8, payPer: 150, bonus: 'peach',
    intro: '箱ごとに、ラベルの言葉と合う桃を入れてくれ。まちがえると、お客さんが困るからな。',
    introEn: 'Put the right peaches in each box to match the word on the label. Mistakes cause trouble for the customers.',
    task: '箱のラベル', taskEn: 'Box label',
    thanks: 'ご苦労さん！ 助かったよ。これ、今日のバイト代だ。', thanksEn: 'Good work! That was a big help. Here’s today’s pay.',
  },
  onsen: {
    id: 'onsen', title: '旅館のフロント', titleEn: 'Inn front desk (listening)', npc: 'okami', area: 'listening',
    theme: ['v:ryokan', 'v:yuge', 'v:yukagen', 'v:motenashi', 'v:tsukaru', 'v:okami'],
    rounds: 6, payPer: 200, bonus: 'onsen_tamago',
    intro: 'お客様のお話を、よく聞いてくださいね。聞き取れたら、心をこめてご案内しましょう。',
    introEn: 'Listen carefully to what the guests say. Once you catch it, guide them with care.',
    task: 'お客様の声', taskEn: 'A guest says',
    thanks: 'お疲れさまでした。お客様、とても喜んでいらっしゃいましたよ。', thanksEn: 'Thank you for your hard work. The guests were delighted.',
  },
  winery: {
    id: 'winery', title: 'ワインのラベル読み', titleEn: 'Reading wine labels (kanji)', npc: 'kenji', area: 'kanji',
    theme: [],
    rounds: 6, payPer: 180, bonus: 'grape_juice',
    intro: '出荷の前に、ラベルの漢字をチェックしてほしいんだ。読み方がひとつでも違うと、全部やり直しだから。',
    introEn: 'Before shipping, please check the kanji on the labels. If even one reading is wrong, we have to redo them all.',
    task: 'ラベルの漢字', taskEn: 'Label kanji',
    thanks: 'ありがとう！ 完璧なラベルだ。バイト代と、うちのジュースをどうぞ。', thanksEn: 'Thanks! Perfect labels. Here’s your pay.',
  },
  clinic: {
    id: 'clinic', title: '診療所の受付', titleEn: 'Clinic reception (kanji & health words)', npc: 'fujii', area: 'kanji',
    theme: ['v:shinryoujo', 'v:shoujou', 'v:shohou', 'v:taichou', 'v:kaifuku', 'v:hieru', 'v:kogoeru'],
    rounds: 8, payPer: 220, bonus: 'oyaki',
    intro: '薬の袋やカルテの字が、また消えかけているの。読み方を確かめながら、受付を手伝ってくれる？',
    introEn: 'The kanji on the medicine bags and charts are fading again. Could you help at reception and check the readings?',
    task: 'カルテ・薬の袋', taskEn: 'Chart / medicine bag',
    thanks: 'ありがとう、助かったわ。あなたがいると、村のみんなも安心ね。', thanksEn: 'Thank you, that was a great help. With you here, the whole village feels safer.',
  },
  diner: {
    id: 'diner', title: '港食堂の注文', titleEn: 'Harbour diner orders (grammar)', npc: 'hamada', area: 'grammar',
    theme: ['g:monono', 'g:nimokakawarazu', 'g:nishitewa', 'g:warini', 'g:toittemo', 'g:dokoroka', 'g:zaruoenai', 'g:shikanai'],
    rounds: 6, payPer: 220, bonus: 'ikayaki',
    when: { obj: 'mq15.hamada' },
    intro: 'お客さんの注文は、最後までちゃんと聞いてね。「〜ものの」と「〜のに」じゃ、意味がぜんぜん違うんだから！',
    introEn: 'Listen to the customers’ orders to the very end. “〜ものの” and “〜のに” mean completely different things!',
    task: 'お客さんの注文', taskEn: 'A customer says',
    thanks: 'お疲れさま！ あんたがいると、店が明るくなるねえ。いか焼き、持っていきな。', thanksEn: 'Good work! The place feels brighter with you around. Take some grilled squid.',
  },
};

/** the game day on which the job was last done (flags store numbers) */
export const jobFlag = (id: string) => `job_${id}_day`;
