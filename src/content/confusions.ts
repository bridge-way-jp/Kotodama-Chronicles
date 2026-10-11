/**
 * Confusion groups — grammar patterns that are easy to mix up, with contrast exercises.
 * In every exercise the first option is the answer; the wrong options were chosen so that
 * they are grammatically or semantically excluded.
 */
export interface ConfusionExercise {
  s: string; // sentence with ＿＿
  opts: string[]; // opts[0] is correct
  en: string;
  why: string;
}

export interface ConfusionGroup {
  id: string;
  forms: string[];
  note: string; // explanation of the difference
  ex: ConfusionExercise[];
}

export const CONFUSIONS: ConfusionGroup[] = [
  {
    id: 'reason', forms: ['だけに', 'からこそ', 'ばかりに', 'せいか'],
    note: 'だけに: precisely because (the result fits the reason). からこそ: stresses that this is THE reason. ばかりに: only because of this one thing, with a regrettable result. せいか: perhaps because — the reason is uncertain.',
    ex: [
      { s: '私が道を間違えた＿＿、みんなを一時間も待たせてしまった。', opts: ['ばかりに', 'からこそ', 'だけに', 'せいか'], en: 'Just because I took the wrong road, I kept everyone waiting for an hour.',
        why: 'ばかりに: one single cause led to a regrettable result (～てしまった). The speaker is sure about their own mistake, so not せいか.' },
      { s: '寝不足の＿＿、今日は朝から頭が痛い。', opts: ['せいか', 'ばかりに', 'からこそ', 'だけに'], en: "Maybe because I didn't sleep enough, I've had a headache since morning.",
        why: 'せいか: a guessed reason. After noun + の only せいか fits (ばかりに/だけに would need である, からこそ needs だ).' },
      { s: 'あなたを信頼している＿＿、厳しいことを言うのです。', opts: ['からこそ', 'ばかりに', 'せいか', 'ものの'], en: "It's precisely because I trust you that I say harsh things.",
        why: 'からこそ ～のです: stresses exactly this reason. ばかりに would bring a negative result, せいか is uncertain.' },
    ],
  },
  {
    id: 'despite', forms: ['ものの', 'にもかかわらず', 'くせして', 'つつ'],
    note: 'ものの: A is true, but the expected B does not follow. にもかかわらず: formal "despite". くせして: reproachful. つつ: written; doing something while knowing the opposite.',
    ex: [
      { s: '大雨＿＿、試合は予定通り行われた。', opts: ['にもかかわらず', 'ものの', 'くせして', 'つつ'], en: 'Despite the heavy rain, the match took place as planned.',
        why: 'Only にもかかわらず follows a noun directly. ものの would need である, くせして needs の, つつ the ます stem.' },
      { s: '体に悪いと知り＿＿、ついお菓子を食べてしまう。', opts: ['つつ', 'ものの', 'くせして', 'にもかかわらず'], en: "Even though I know it's bad for me, I end up eating sweets.",
        why: 'つつ attaches to the ます stem (知り). The others need the plain form (知っている…).' },
      { s: '子供の＿＿、生意気なことを言うな。', opts: ['くせして', 'ものの', 'つつ', 'にもかかわらず'], en: "You're just a kid — don't talk so cheeky.",
        why: 'くせして: reproach ("even though you are only …"). Noun + の only fits くせして.' },
      { s: '免許は取った＿＿、まだ一度も運転したことがない。', opts: ['ものの', 'くせして', 'つつ', 'だけに'], en: "I did get my licence, but I've never actually driven.",
        why: 'ものの: "A, but the expected B did not follow". くせして would reproach someone else.' },
    ],
  },
  {
    id: 'occasion', forms: ['にあたって', 'に際して', 'に先立ち'],
    note: 'にあたって: when taking an important step. に際して: formal, at the very moment of the occasion. に先立ち: before the occasion.',
    ex: [
      { s: '映画の公開＿＿、監督の記者会見が開かれた。', opts: ['に先立ち', 'に沿って', 'をもとに', 'に基づいて'], en: "Ahead of the film's release, the director held a press conference.",
        why: 'に先立ち: BEFORE the event. The other forms express a basis or a direction.' },
      { s: '新しい生活を始める＿＿、部屋を全部片付けた。', opts: ['にあたって', 'をもとに', 'に沿って', 'からして'], en: 'On starting my new life, I tidied up the whole room.',
        why: 'にあたって: at an important new start (に際して would also work, but it is not an option).' },
    ],
  },
  {
    id: 'basis', forms: ['に基づいて', 'をもとに', 'に沿って'],
    note: 'に基づいて: based on facts or rules. をもとに: source material for something new. に沿って: along a line or a guideline.',
    ex: [
      { s: '川＿＿、桜の並木が続いている。', opts: ['に沿って', 'に基づいて', 'をもとに', 'に先立ち'], en: 'A row of cherry trees runs along the river.',
        why: 'に沿って: physically along something (a river, a road).' },
      { s: '実際にあった事件＿＿、この小説は書かれた。', opts: ['をもとに', 'に沿って', 'に先立ち', 'に際して'], en: 'This novel was written based on a real incident.',
        why: 'をもとに: source material from which something new (a novel) is made.' },
      { s: '調査の結果＿＿、新しい計画を立てた。', opts: ['に基づいて', 'に沿って', 'に先立ち', 'に際して'], en: 'We drew up a new plan based on the survey results.',
        why: 'に基づいて: on the basis of facts or data.' },
    ],
  },
  {
    id: 'kaneru', forms: ['かねる', 'かねない'],
    note: 'かねる: cannot (a polite refusal). かねない: could easily happen, usually something bad. They are not simple opposites!',
    ex: [
      { s: '申し訳ありませんが、そのご要望にはお応えし＿＿。', opts: ['かねます', 'かねません', 'がちです', 'っぽいです'], en: "I'm sorry, but we are unable to meet that request.",
        why: 'かねる: a polite refusal ("I am afraid we cannot").' },
      { s: 'そんな運転をしていたら、事故を起こし＿＿よ。', opts: ['かねない', 'かねる', 'つつある', 'ずにすむ'], en: 'If you drive like that, you could easily cause an accident.',
        why: 'かねない: a negative possibility ("could easily …").' },
    ],
  },
  {
    id: 'must', forms: ['ざるを得ない', 'ないではいられない', 'よりほかない'],
    note: 'ざるを得ない: forced by circumstances. ないではいられない: an inner urge you cannot resist. よりほかない: the only option left.',
    ex: [
      { s: '上司の命令なので、行か＿＿。', opts: ['ざるを得ない', 'ないではいられない', 'てたまらない', 'かねない'], en: "It's my boss's order, so I have no choice but to go.",
        why: 'ざるを得ない: pressure from outside (an order). ないではいられない would be an inner urge.' },
      { s: 'あの映画を見ると、泣か＿＿。', opts: ['ないではいられない', 'ざるを得ない', 'かねる', 'ずに済む'], en: "Whenever I watch that film, I can't help crying.",
        why: 'ないではいられない: a feeling or urge you cannot hold back.' },
    ],
  },
  {
    id: 'feeling', forms: ['てならない', 'てたまらない'],
    note: 'てならない: a feeling forces itself on you (気がしてならない). てたまらない: a feeling or sensation is unbearably strong (痛くてたまらない).',
    ex: [
      { s: '誰かに見られているような気がして＿＿。', opts: ['ならない', 'たまらない', 'かねない', 'いられない'], en: "I can't shake the feeling that someone is watching me.",
        why: '気がしてならない is the fixed combination: a thought keeps coming back on its own.' },
      { s: '歯が痛くて＿＿。', opts: ['たまらない', 'ならない', 'かねる', 'すむ'], en: 'My tooth hurts unbearably.',
        why: 'てたまらない: a physical sensation is unbearably strong.' },
    ],
  },
  {
    id: 'shidai', forms: ['次第', '次第で', '次第に'],
    note: '次第: as soon as. 次第で: depending on. 次第に: gradually.',
    ex: [
      { s: '準備ができ＿＿、出発します。', opts: ['次第', '次第で', '次第に', 'につれて'], en: "We'll leave as soon as we're ready.",
        why: 'ます stem + 次第: as soon as.' },
      { s: '結果は努力＿＿変わる。', opts: ['次第で', '次第', '次第に', 'ばかりに'], en: 'The result changes depending on your effort.',
        why: 'Noun + 次第で: depending on.' },
      { s: '空が＿＿明るくなってきた。', opts: ['次第に', '次第で', '次第', 'せいか'], en: 'The sky gradually grew lighter.',
        why: '次第に: the adverb "gradually".' },
    ],
  },
  {
    id: 'kara_view', forms: ['からして', 'からすると', 'から言うと', 'から見ると'],
    note: 'からして: one single clue ("just from … you can tell"). からすると: a conclusion. から言うと / から見ると: a point of view.',
    ex: [
      { s: 'この店は、店員の態度＿＿よくない。', opts: ['からして', 'から言うと', 'に沿って', 'に際して'], en: "This shop is bad — just look at the staff's attitude, for a start.",
        why: 'からして: you can tell from this one example alone.' },
      { s: '子供＿＿、大人の世界は分かりにくいものだ。', opts: ['から見ると', 'からして', 'をもとに', 'に先立ち'], en: "From a child's point of view, the adult world is hard to understand.",
        why: 'から見ると: from the point of view of ….' },
    ],
  },
  {
    id: 'karaniwa', forms: ['からには', '以上は', '上は'],
    note: 'All mean "now that …", followed by a duty or a decision. からには is the most general, 以上は slightly more formal, 上は written.',
    ex: [
      { s: '引き受けた＿＿、最後まで責任を持ってやります。', opts: ['からには', 'ものの', 'せいか', 'くせして'], en: "Now that I've taken it on, I'll see it through responsibly.",
        why: 'からには: "since I have …" → a decision or duty. ものの would introduce a contrast.' },
    ],
  },
  {
    id: 'dokoroka', forms: ['どころか', 'どころではない'],
    note: 'どころか: far from it, the opposite is true. どころではない: there is no time or room for it.',
    ex: [
      { s: '雨がやむ＿＿、ますます強くなってきた。', opts: ['どころか', 'どころではない', 'からには', '次第'], en: 'Far from stopping, the rain got even stronger.',
        why: 'どころか: the opposite of what was expected happens.' },
      { s: '試験の前日で、遊ぶ＿＿。', opts: ['どころではない', 'どころか', 'からこそ', 'かねる'], en: "It's the day before the exam — no time for fun.",
        why: 'どころではない: the situation does not allow it right now.' },
    ],
  },
  {
    id: 'zunisumu', forms: ['ずに済む', 'なくて済む'],
    note: 'Same meaning, different form: ずに attaches to the ない stem (せずに済む), なくて to the full ない form.',
    ex: [
      { s: '友達が車で送ってくれたので、タクシーを使わ＿＿。', opts: ['ずに済んだ', 'なくて済んだ', 'ずにはいられなかった', 'ざるを得なかった'], en: "My friend drove me, so I didn't have to take a taxi.",
        why: '使わ (ない stem) + ずに済む. なくて済む would need 使わなくて.' },
      { s: '早めに予約したので、並ばなく＿＿。', opts: ['て済んだ', 'ずに済んだ', 'てたまらない', 'てならない'], en: "I booked early, so I didn't have to queue.",
        why: '並ばなく → て済んだ (なくて済む).' },
    ],
  },
  {
    id: 'even_if', forms: ['としても', 'にしても', 'にせよ', 'にしろ'],
    note: 'としても: even if (supposing). にしても / にせよ / にしろ: even in the case of …; にしろ is more casual than にせよ.',
    ex: [
      { s: '行く＿＿行かない＿＿、早めに連絡してください。', opts: ['にせよ', 'としても', 'どころか', 'からには'], en: 'Whether you go or not, please let us know early.',
        why: 'A にせよ B にせよ: "whether A or B". としても is not used in such pairs.' },
      { s: 'たとえ反対された＿＿、私はこの道を選ぶ。', opts: ['としても', 'にせよ', 'からには', 'ばかりに'], en: 'Even if people oppose me, I will choose this path.',
        why: 'たとえ ～としても: "even if (we suppose)".' },
    ],
  },
  {
    id: 'not_only', forms: ['ばかりか', 'のみならず', 'はもとより', 'に限らず'],
    note: 'All mean "not only …". ばかりか: something stronger follows. のみならず: written. はもとより: "not to mention" — the obvious item first. に限らず: not limited to.',
    ex: [
      { s: 'この祭りには、地元の人＿＿、海外からの観光客も大勢来る。', opts: ['はもとより', 'どころではない', 'ものの', 'からして'], en: 'Not to mention the locals, many tourists from abroad come to this festival.',
        why: 'はもとより: the obvious group (locals) first, then the extension.' },
      { s: 'この映画は子供＿＿、大人にも人気がある。', opts: ['に限らず', 'につれて', '次第で', 'に先立ち'], en: 'This film is popular not just with children but with adults too.',
        why: 'に限らず: not limited to ….' },
    ],
  },
];
