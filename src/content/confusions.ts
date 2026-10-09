/**
 * Verwechslungsgruppen — grammar patterns that are easy to mix up (from Maria's list),
 * with contrast exercises. In every exercise the first option is the answer; the wrong
 * options were chosen so that they are grammatically or semantically excluded.
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
  note: string; // German explanation
  ex: ConfusionExercise[];
}

export const CONFUSIONS: ConfusionGroup[] = [
  {
    id: 'reason', forms: ['だけに', 'からこそ', 'ばかりに', 'せいか'],
    note: 'だけに: gerade deshalb, passend zum Grund. からこそ: betont genau diesen einen Grund. ばかりに: nur deshalb, mit bedauerlicher Folge. せいか: vielleicht deshalb, Grund unsicher.',
    ex: [
      { s: '私が道を間違えた＿＿、みんなを一時間も待たせてしまった。', opts: ['ばかりに', 'からこそ', 'だけに', 'せいか'], en: 'Just because I took the wrong road, I kept everyone waiting for an hour.',
        why: 'ばかりに: nur wegen dieser einen Sache kam es zu einer bedauerlichen Folge (～てしまった). Über den eigenen Fehler ist man sich sicher, also nicht せいか.' },
      { s: '寝不足の＿＿、今日は朝から頭が痛い。', opts: ['せいか', 'ばかりに', 'からこそ', 'だけに'], en: "Maybe because I didn't sleep enough, I've had a headache since morning.",
        why: 'せいか: vermuteter Grund. Nach Nomen + の passt nur せいか (ばかりに/だけに bräuchten である, からこそ だ).' },
      { s: 'あなたを信頼している＿＿、厳しいことを言うのです。', opts: ['からこそ', 'ばかりに', 'せいか', 'ものの'], en: "It's precisely because I trust you that I say harsh things.",
        why: 'からこそ ～のです: betont genau diesen Grund. ばかりに hätte eine negative Folge, せいか ist unsicher.' },
    ],
  },
  {
    id: 'despite', forms: ['ものの', 'にもかかわらず', 'くせして', 'つつ'],
    note: 'ものの: zwar …, aber (Gegenteil folgt nicht). にもかかわらず: förmliches „trotz“. くせして: vorwurfsvoll. つつ: schriftlich, Handlung und Gegensatz gleichzeitig.',
    ex: [
      { s: '大雨＿＿、試合は予定通り行われた。', opts: ['にもかかわらず', 'ものの', 'くせして', 'つつ'], en: 'Despite the heavy rain, the match took place as planned.',
        why: 'Direkt nach einem Nomen steht nur にもかかわらず. ものの bräuchte である, くせして の, つつ den ます-Stamm.' },
      { s: '体に悪いと知り＿＿、ついお菓子を食べてしまう。', opts: ['つつ', 'ものの', 'くせして', 'にもかかわらず'], en: "Even though I know it's bad for me, I end up eating sweets.",
        why: 'つつ hängt am ます-Stamm (知り). Die anderen brauchen die einfache Form (知っている…).' },
      { s: '子供の＿＿、生意気なことを言うな。', opts: ['くせして', 'ものの', 'つつ', 'にもかかわらず'], en: "You're just a kid — don't talk so cheeky.",
        why: 'くせして: Vorwurf („obwohl du nur … bist“). Nomen + の passt nur zu くせして.' },
      { s: '免許は取った＿＿、まだ一度も運転したことがない。', opts: ['ものの', 'くせして', 'つつ', 'だけに'], en: "I did get my licence, but I've never actually driven.",
        why: 'ものの: „zwar …, aber“ — das Erwartete folgt nicht. くせして wäre ein Vorwurf an jemand anderen.' },
    ],
  },
  {
    id: 'occasion', forms: ['にあたって', 'に際して', 'に先立ち'],
    note: 'にあたって: bei einem wichtigen Schritt. に際して: genau im Moment des Anlasses, förmlich. に先立ち: vor dem Anlass.',
    ex: [
      { s: '映画の公開＿＿、監督の記者会見が開かれた。', opts: ['に先立ち', 'に沿って', 'をもとに', 'に基づいて'], en: "Ahead of the film's release, the director held a press conference.",
        why: 'に先立ち: zeitlich VOR dem Ereignis. Die anderen Formen drücken Grundlage oder Richtung aus.' },
      { s: '新しい生活を始める＿＿、部屋を全部片付けた。', opts: ['にあたって', 'をもとに', 'に沿って', 'からして'], en: 'On starting my new life, I tidied up the whole room.',
        why: 'にあたって: bei einem wichtigen Neuanfang (hier ginge auch に際して, steht aber nicht zur Wahl).' },
    ],
  },
  {
    id: 'basis', forms: ['に基づいて', 'をもとに', 'に沿って'],
    note: 'に基づいて: auf Grundlage von Fakten oder Regeln. をもとに: Ausgangsmaterial für etwas Neues. に沿って: entlang einer Linie oder Richtlinie.',
    ex: [
      { s: '川＿＿、桜の並木が続いている。', opts: ['に沿って', 'に基づいて', 'をもとに', 'に先立ち'], en: 'A row of cherry trees runs along the river.',
        why: 'に沿って: räumlich entlang (Fluss, Straße).' },
      { s: '実際にあった事件＿＿、この小説は書かれた。', opts: ['をもとに', 'に沿って', 'に先立ち', 'に際して'], en: 'This novel was written based on a real incident.',
        why: 'をもとに: Ausgangsmaterial, aus dem etwas Neues (ein Roman) entsteht.' },
      { s: '調査の結果＿＿、新しい計画を立てた。', opts: ['に基づいて', 'に沿って', 'に先立ち', 'に際して'], en: 'We drew up a new plan based on the survey results.',
        why: 'に基づいて: auf Grundlage von Fakten/Daten.' },
    ],
  },
  {
    id: 'kaneru', forms: ['かねる', 'かねない'],
    note: 'かねる: kann nicht (höflich ablehnend). かねない: könnte leicht passieren, meist negativ. Nicht als Gegensatz verwechseln!',
    ex: [
      { s: '申し訳ありませんが、そのご要望にはお応えし＿＿。', opts: ['かねます', 'かねません', 'がちです', 'っぽいです'], en: "I'm sorry, but we are unable to meet that request.",
        why: 'かねる: höfliche Ablehnung („kann leider nicht“).' },
      { s: 'そんな運転をしていたら、事故を起こし＿＿よ。', opts: ['かねない', 'かねる', 'つつある', 'ずにすむ'], en: 'If you drive like that, you could easily cause an accident.',
        why: 'かねない: eine negative Möglichkeit („könnte leicht …“).' },
    ],
  },
  {
    id: 'must', forms: ['ざるを得ない', 'ないではいられない', 'よりほかない'],
    note: 'ざるを得ない: Zwang von außen. ないではいられない: innerer Drang. よりほかない: einzige verbleibende Möglichkeit.',
    ex: [
      { s: '上司の命令なので、行か＿＿。', opts: ['ざるを得ない', 'ないではいられない', 'てたまらない', 'かねない'], en: "It's my boss's order, so I have no choice but to go.",
        why: 'ざるを得ない: Zwang von außen (Befehl). ないではいられない wäre ein innerer Drang.' },
      { s: 'あの映画を見ると、泣か＿＿。', opts: ['ないではいられない', 'ざるを得ない', 'かねる', 'ずに済む'], en: "Whenever I watch that film, I can't help crying.",
        why: 'ないではいられない: ein Gefühl/Drang, den man nicht unterdrücken kann.' },
    ],
  },
  {
    id: 'feeling', forms: ['てならない', 'てたまらない'],
    note: 'てならない: Gefühl drängt sich auf (気がしてならない). てたまらない: Gefühl oder Empfinden ist unerträglich stark (痛くてたまらない).',
    ex: [
      { s: '誰かに見られているような気がして＿＿。', opts: ['ならない', 'たまらない', 'かねない', 'いられない'], en: "I can't shake the feeling that someone is watching me.",
        why: '気がしてならない ist die feste Verbindung: ein Gedanke drängt sich unwillkürlich auf.' },
      { s: '歯が痛くて＿＿。', opts: ['たまらない', 'ならない', 'かねる', 'すむ'], en: 'My tooth hurts unbearably.',
        why: 'てたまらない: körperliches Empfinden ist unerträglich stark.' },
    ],
  },
  {
    id: 'shidai', forms: ['次第', '次第で', '次第に'],
    note: '次第: sobald. 次第で: je nach, abhängig von. 次第に: allmählich.',
    ex: [
      { s: '準備ができ＿＿、出発します。', opts: ['次第', '次第で', '次第に', 'につれて'], en: "We'll leave as soon as we're ready.",
        why: 'ます-Stamm + 次第: sobald.' },
      { s: '結果は努力＿＿変わる。', opts: ['次第で', '次第', '次第に', 'ばかりに'], en: 'The result changes depending on your effort.',
        why: 'Nomen + 次第で: je nach / abhängig von.' },
      { s: '空が＿＿明るくなってきた。', opts: ['次第に', '次第で', '次第', 'せいか'], en: 'The sky gradually grew lighter.',
        why: '次第に: Adverb „allmählich“.' },
    ],
  },
  {
    id: 'kara_view', forms: ['からして', 'からすると', 'から言うと', 'から見ると'],
    note: 'からして: ein einzelnes Indiz („schon an … sieht man“). からすると: Schlussfolgerung. から言うと / から見ると: Perspektive, Sicht von ….',
    ex: [
      { s: 'この店は、店員の態度＿＿よくない。', opts: ['からして', 'から言うと', 'に沿って', 'に際して'], en: "This shop is bad — just look at the staff's attitude, for a start.",
        why: 'からして: schon an diesem einen Beispiel sieht man es.' },
      { s: '子供＿＿、大人の世界は分かりにくいものだ。', opts: ['から見ると', 'からして', 'をもとに', 'に先立ち'], en: 'From a child\'s point of view, the adult world is hard to understand.',
        why: 'から見ると: aus der Perspektive von ….' },
    ],
  },
  {
    id: 'karaniwa', forms: ['からには', '以上は', '上は'],
    note: 'Alle „da nun einmal“, danach folgt Pflicht oder Entschluss. からには ist am allgemeinsten, 以上は ist etwas förmlicher, 上は ist schriftlich.',
    ex: [
      { s: '引き受けた＿＿、最後まで責任を持ってやります。', opts: ['からには', 'ものの', 'せいか', 'くせして'], en: "Now that I've taken it on, I'll see it through responsibly.",
        why: 'からには: „da ich nun einmal …“ → Entschluss/Pflicht. ものの würde einen Gegensatz einleiten.' },
    ],
  },
  {
    id: 'dokoroka', forms: ['どころか', 'どころではない'],
    note: 'どころか: das Gegenteil trifft zu, geschweige denn. どころではない: keine Zeit oder Lage dafür.',
    ex: [
      { s: '雨がやむ＿＿、ますます強くなってきた。', opts: ['どころか', 'どころではない', 'からには', '次第'], en: 'Far from stopping, the rain got even stronger.',
        why: 'どころか: Das Gegenteil des Erwarteten tritt ein.' },
      { s: '試験の前日で、遊ぶ＿＿。', opts: ['どころではない', 'どころか', 'からこそ', 'かねる'], en: "It's the day before the exam — no time for fun.",
        why: 'どころではない: Die Lage lässt das gerade nicht zu.' },
    ],
  },
  {
    id: 'zunisumu', forms: ['ずに済む', 'なくて済む'],
    note: 'Gleiche Bedeutung, andere Form: ずに an den ない-Stamm (せずに済む), なくて an die ない-Form.',
    ex: [
      { s: '友達が車で送ってくれたので、タクシーを使わ＿＿。', opts: ['ずに済んだ', 'なくて済んだ', 'ずにはいられなかった', 'ざるを得なかった'], en: "My friend drove me, so I didn't have to take a taxi.",
        why: '使わ (ない-Stamm) + ずに済む. なくて済む bräuchte 使わなくて (ganzes ない).' },
      { s: '早めに予約したので、並ばなく＿＿。', opts: ['て済んだ', 'ずに済んだ', 'てたまらない', 'てならない'], en: "I booked early, so I didn't have to queue.",
        why: '並ばなく → て済んだ (なくて済む).' },
    ],
  },
  {
    id: 'even_if', forms: ['としても', 'にしても', 'にせよ', 'にしろ'],
    note: 'としても: selbst wenn, angenommen. にしても / にせよ / にしろ: auch bei …, sogar; にしろ ist umgangssprachlicher als にせよ.',
    ex: [
      { s: '行く＿＿行かない＿＿、早めに連絡してください。', opts: ['にせよ', 'としても', 'どころか', 'からには'], en: 'Whether you go or not, please let us know early.',
        why: 'A にせよ B にせよ: „ob A oder B“. としても wird nicht so paarweise verwendet.' },
      { s: 'たとえ反対された＿＿、私はこの道を選ぶ。', opts: ['としても', 'にせよ', 'からには', 'ばかりに'], en: 'Even if people oppose me, I will choose this path.',
        why: 'たとえ ～としても: „selbst wenn (angenommen)“.' },
    ],
  },
  {
    id: 'not_only', forms: ['ばかりか', 'のみならず', 'はもとより', 'に限らず'],
    note: 'Alle „nicht nur …“. ばかりか: danach steigert sich etwas. のみならず: schriftlich. はもとより: „ganz zu schweigen von“, betont das Selbstverständliche. に限らず: nicht auf … beschränkt.',
    ex: [
      { s: 'この祭りには、地元の人＿＿、海外からの観光客も大勢来る。', opts: ['はもとより', 'どころではない', 'ものの', 'からして'], en: 'Not to mention the locals, many tourists from abroad come to this festival.',
        why: 'はもとより: das Selbstverständliche (Einheimische) zuerst, dann die Erweiterung.' },
      { s: 'この映画は子供＿＿、大人にも人気がある。', opts: ['に限らず', 'につれて', '次第で', 'に先立ち'], en: 'This film is popular not just with children but with adults too.',
        why: 'に限らず: nicht auf … beschränkt.' },
    ],
  },
];
