import { ask, l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 3: the people of the Yukimi ski slope and hot-spring street (content/expansion.ts). */
export const EPISODES_EX3: Episode[] = [
  // ------------------------------------------------------------------ Yukina: the teacher who is afraid of the slope
  {
    id: 'ep_ex_yukina',
    chapter: 3,
    after: 'mq10',
    who: 'ex_yukina',
    title: ['白い斜面の向こう', 'Beyond the White Slope', 'Jenseits des weißen Hangs'],
    summary: [
      'Ski instructor Yukina can teach anyone — but since her accident she has not dared to ski down the slope herself.',
      'Skilehrerin Yukina kann jedem das Skifahren beibringen — aber seit ihrem Unfall traut sie sich selbst nicht mehr den Hang hinunter.',
    ],
    scenes: [
      {
        at: 'ex_yukina',
        goal: ['Talk to Yukina at the lift', 'Sprich mit Yukina am Lift'],
        lines: [
          l('ex_yukina', '三年前、{霧|きり|v:n3_0760}の日に、{急激|きゅうげき|v:n3_0737}な{斜面|しゃめん}で{転倒|てんとう}したの。気がついたら、ヘリで{救助|きゅうじょ|v:n3_0739}されてた。', ['Three years ago, on a foggy day, I fell on a sudden steep slope. When I came to, I was being rescued by helicopter.', 'Vor drei Jahren bin ich an einem nebligen Tag an einem plötzlich steilen Hang gestürzt. Als ich zu mir kam, wurde ich mit dem Hubschrauber gerettet.'], 'worried'),
          l('ex_yukina', '{全身|ぜんしん|v:n2_1029}の{骨|ほね}を折って、一年。体は{回復|かいふく|v:kaifuku}したわ。もう{症状|しょうじょう|v:shoujou}もない。', ['I broke bones all over my body, and it took a year. My body has recovered. There are no symptoms any more.', 'Ich hatte mir am ganzen Körper Knochen gebrochen, es dauerte ein Jahr. Mein Körper hat sich erholt. Symptome gibt es keine mehr.']),
          l('ex_yukina', 'でも、上に立つと、足が{しびれて||v:n2_0798}動かないの。これは、{恐怖|きょうふ|v:n3_0753}っていう{現実|げんじつ|v:n3_0860}ね。', ['But when I stand at the top, my legs go numb and won’t move. That’s the reality called fear.', 'Aber wenn ich oben stehe, werden meine Beine taub und bewegen sich nicht. Das ist die Wirklichkeit namens Angst.'], 'worried'),
        ],
        teach: ['v:n3_0760', 'v:n3_0737', 'v:n3_0739', 'v:n2_1029', 'v:kaifuku', 'v:shoujou', 'v:n2_0798', 'v:n3_0753', 'v:n3_0860'],
      },
      {
        at: 'exy_lift',
        goal: ['Watch Yukina’s lesson', 'Sieh dir Yukinas Unterricht an'],
        lines: [
          l('ex_yukina', 'はい、ひざを曲げて！{筋肉|きんにく|v:n3_0775}は{訓練|くんれん|v:n3_0820}すれば強くなるわよ！', ['Right, bend your knees! Your muscles get stronger if you train them!', 'So, Knie beugen! Muskeln werden stärker, wenn man sie trainiert!'], 'happy'),
          nar('子どもたちに教える声は、明るい。でも、ときどき{頂上|ちょうじょう}を見上げて、口を{結ぶ|むすぶ}。', ['Her voice is bright as she teaches the children. But now and then she looks up at the summit and presses her lips together.', 'Ihre Stimme klingt fröhlich, wenn sie die Kinder unterrichtet. Aber manchmal blickt sie zum Gipfel hinauf und presst die Lippen zusammen.']),
          l('ex_yukina', '昔は{競技|きょうぎ|v:n3_0746}で、日本一を{目指して|めざして|v:n2_1749}いたの。{強気|つよき|v:n2_1226}な選手だった。……今は、自分の{限界|げんかい|v:n3_0854}ばかり見てる。', ['I used to compete, aiming to be the best in Japan. I was a bold racer. …Now all I see are my own limits.', 'Früher bin ich Rennen gefahren und wollte die Beste Japans werden. Ich war eine mutige Läuferin. … Jetzt sehe ich nur noch meine Grenzen.'], 'worried'),
          l('ex_yukina', '{苦痛|くつう|v:n3_0788}なのは、けがじゃない。好きなことが、こわくなったことよ。', ['What hurts isn’t the injury. It’s that the thing I loved has become frightening.', 'Was wehtut, ist nicht die Verletzung. Es ist, dass das, was ich liebe, mir Angst macht.']),
        ],
        teach: ['v:n3_0775', 'v:n3_0820', 'v:n3_0746', 'v:n2_1749', 'v:n2_1226', 'v:n3_0854', 'v:n3_0788'],
      },
      {
        at: 'ex_yukina',
        goal: ['Be there when Yukina goes up the slope', 'Sei dabei, wenn Yukina den Hang hinaufgeht'],
        music: 'memory',
        lines: [
          nar('{頂上|ちょうじょう}。{震|ふる}える足の横に、小さな女の子が並んだ。毎日転んでいるゆずちゃんだ。', ['The summit. Next to her trembling legs stands a little girl: Yuzu, who falls over every day.', 'Der Gipfel. Neben ihren zitternden Beinen steht ein kleines Mädchen: Yuzu, die jeden Tag hinfällt.']),
          nar('「せんせい、いっしょにすべろう。ゆず、こわいけど、せんせいがいるから、だいじょうぶ」', ['“Teacher, let’s ski down together. I’m scared, but you’re here, so it’s okay.”', '„Frau Lehrerin, lass uns zusammen fahren. Ich hab Angst, aber Sie sind ja da, also geht es.“']),
          l('ex_yukina', '……教える{側|がわ}が、教えられちゃったわね。', ['…The teacher has been taught a lesson, hasn’t she.', '… Jetzt hat die Lehrerin etwas gelernt, was?'], 'happy'),
          l('ex_yukina', '{決心|けっしん|v:n3_0844}したわ。ゆっくりでいい。二人で、下まで行きましょう。', ['I’ve made up my mind. Slowly is fine. Let’s go all the way down, the two of us.', 'Ich habe mich entschieden. Langsam ist in Ordnung. Lass uns zu zweit bis ganz nach unten fahren.'], 'happy'),
          nar('二本の{線|せん}が、白い斜面に、ゆっくりと{描|えが}かれていった。', ['Two lines are slowly drawn across the white slope.', 'Zwei Linien werden langsam in den weißen Hang gezeichnet.']),
        ],
        teach: ['v:n3_0844'],
      },
    ],
  },
  // ------------------------------------------------------------------ Shigeru: the plough in the night
  {
    id: 'ep_ex_shigeru',
    chapter: 3,
    after: 'mq10',
    who: 'ex_shigeru',
    title: ['夜の除雪車', 'The Plough in the Night', 'Der Räumer in der Nacht'],
    summary: [
      'Every night Shigeru clears the road so the ambulance can get through in the morning. Nobody sees him — until one night it really matters.',
      'Jede Nacht räumt Shigeru die Straße, damit morgens der Krankenwagen durchkommt. Niemand sieht ihn — bis es eines Nachts wirklich darauf ankommt.',
    ],
    scenes: [
      {
        at: 'exy_plough',
        goal: ['Look into the plough depot', 'Schau ins Räumfahrzeug-Depot'],
        lines: [
          l('ex_shigeru', 'こいつが、村一番の{強力|きょうりょく|v:n3_0755}な{機械|きかい|v:n3_0692}だ。{巨大|きょだい|v:n3_0758}だろう？', ['This fellow is the most powerful machine in the village. Huge, isn’t it?', 'Das hier ist die stärkste Maschine im Dorf. Riesig, oder?'], 'happy'),
          l('ex_shigeru', '冬の{期間|きかん|v:n3_0695}は、毎晩これで道を走る。{金属|きんぞく|v:n3_0772}の{歯車|はぐるま|v:n2_1424}は寒さで{錆びる|さびる|v:n2_0732}から、{管理|かんり|v:n3_0686}が大変なんだ。', ['All winter I drive the roads with it every night. The metal gears rust in the cold, so looking after it is hard work.', 'Den ganzen Winter fahre ich damit jede Nacht die Straßen ab. Die Zahnräder aus Metall rosten in der Kälte, deshalb ist die Pflege mühsam.']),
          l('ex_shigeru', '{ねじ||v:n2_1386}一本でも{交換|こうかん|v:n3_0883}を忘れたら、夜中に止まっちまう。', ['Forget to replace even one screw, and it stops in the middle of the night.', 'Vergisst man auch nur eine Schraube auszutauschen, bleibt sie mitten in der Nacht stehen.']),
        ],
        teach: ['v:n3_0755', 'v:n3_0692', 'v:n3_0758', 'v:n3_0695', 'v:n3_0772', 'v:n2_1424', 'v:n2_0732', 'v:n3_0686', 'v:n2_1386', 'v:n3_0883'],
      },
      {
        at: 'ex_shigeru',
        goal: ['Ride along on Shigeru’s night shift', 'Fahr bei Shigerus Nachtschicht mit'],
        evening: true,
        lines: [
          nar('夜中の二時。{薄暗い|うすぐらい|v:n2_0223}ライトの中、雪が{凍って|こおって|v:n3_0909}、道は{氷|こおり|v:n3_0908}のようだ。', ['Two in the morning. In the dim headlights, the snow has frozen and the road is like ice.', 'Zwei Uhr nachts. Im trüben Scheinwerferlicht ist der Schnee gefroren, die Straße ist wie Eis.']),
          l('ex_shigeru', '今夜はよく{冷える|ひえる|v:hieru}な。{標識|ひょうしき|v:n2_1528}も雪で見えん。{地面|じめん|v:n2_0812}の感じだけで走るんだ。', ['It’s really freezing tonight. Even the road signs are buried in snow. I drive by the feel of the ground alone.', 'Heute Nacht ist es richtig kalt. Selbst die Verkehrsschilder sind zugeschneit. Ich fahre nur nach dem Gefühl für den Boden.']),
          nar('その時、無線が鳴った。「{清水|しみず}さんの家で、赤ちゃんが熱を出した！救急車が来られない！」', ['Just then the radio crackles: “At the Shimizu house a baby has a fever! The ambulance can’t get through!”', 'Da knistert das Funkgerät: „Bei den Shimizus hat ein Baby Fieber! Der Krankenwagen kommt nicht durch!“']),
          l('ex_shigeru', '{人命|じんめい|v:n2_0930}がかかってる。{警告|けいこく|v:n3_0827}ランプをつけろ！行くぞ！', ['A life is at stake. Turn on the warning lights! Here we go!', 'Es geht um ein Menschenleben. Warnlichter an! Los geht’s!']),
        ],
        teach: ['v:n2_0223', 'v:n3_0909', 'v:n3_0908', 'v:hieru', 'v:n2_1528', 'v:n2_0812', 'v:n2_0930', 'v:n3_0827'],
      },
      {
        at: 'ex_shigeru',
        goal: ['Hear about the morning after', 'Hör, was am nächsten Morgen geschah'],
        lines: [
          l('ex_shigeru', '道を開けて、救急車が間に合った。赤ちゃんは、もう大丈夫だそうだ。', ['We cleared the road and the ambulance made it in time. They say the baby is fine now.', 'Wir haben die Straße freigeräumt, und der Krankenwagen kam rechtzeitig. Dem Baby geht es jetzt gut, heißt es.'], 'happy'),
          l('ex_shigeru', '朝、清水さんの{奥|おく}さんが来て、何度も頭を下げてな。こっちが{恐縮|きょうしゅく|v:n2_0508}しちまったよ。', ['In the morning Mrs. Shimizu came and bowed again and again. I felt quite embarrassed.', 'Morgens kam Frau Shimizu und hat sich immer wieder verbeugt. Mir war das richtig unangenehm.'], 'happy'),
          l('ex_shigeru', 'おれの仕事は、だれにも見えない。でも、村のみんなの{協力|きょうりょく|v:n3_0754}があって、はじめて道はつながるんだ。', ['My work is invisible to everyone. But a road only connects with the help of everyone in the village.', 'Meine Arbeit sieht niemand. Aber eine Straße verbindet erst, wenn alle im Dorf zusammenhelfen.']),
        ],
        teach: ['v:n2_0508', 'v:n3_0754'],
      },
    ],
  },
  // ------------------------------------------------------------------ Sachiko: the guesthouse without guests
  {
    id: 'ep_ex_sachiko',
    chapter: 3,
    after: 'mq11',
    who: 'ex_sachiko',
    title: ['三年ぶりのお客', 'The First Guest in Three Years', 'Der erste Gast seit drei Jahren'],
    summary: [
      'Sachiko’s guesthouse has had no guests for three winters. She still airs the futons every morning.',
      'Sachikos Pension hatte seit drei Wintern keinen Gast mehr. Trotzdem lüftet sie jeden Morgen die Futons.',
    ],
    scenes: [
      {
        at: 'exy_minshuku',
        goal: ['Call at the guesthouse', 'Schau in der Pension vorbei'],
        lines: [
          l('ex_sachiko', '{ごめんください||v:n2_0677}って、言ってくれたの？……あら、お客さんじゃないのね。', ['Did you call “Is anyone home?” …Oh, you’re not a guest.', 'Haben Sie „Ist jemand da?“ gerufen? … Ach, Sie sind gar kein Gast.']),
          l('ex_sachiko', '{観光|かんこう|v:n3_0669}の人は、みんな大きなホテルに行くの。{景気|けいき|v:n3_0825}が悪くなってから、{経営|けいえい|v:n3_0824}はずっと赤字。', ['Tourists all go to the big hotels. Since the economy went bad, I’ve been running at a loss.', 'Die Touristen gehen alle in die großen Hotels. Seit die Wirtschaft schlecht läuft, schreibe ich nur noch rote Zahlen.'], 'worried'),
          l('ex_sachiko', 'でも、毎朝、{枕|まくら|v:n2_1668}を{干して|ほして}、部屋を{片付けて|かたづけて|v:n3_0617}いるの。いつお客さんが来てもいいように。', ['But every morning I air the pillows and tidy the rooms. So I’m ready whenever a guest comes.', 'Aber jeden Morgen lüfte ich die Kissen und räume die Zimmer auf. Damit ich bereit bin, wann immer ein Gast kommt.']),
          l('ex_sachiko', '{予備|よび|v:n2_1850}の{布団|ふとん}も、いつもふかふかよ。……{折角|せっかく|v:n2_1011}だから、お茶でも飲んでいって。', ['The spare futons are always fluffy too. …Since you came all this way, at least stay for a cup of tea.', 'Auch die Reservefutons sind immer schön flauschig. … Wo Sie schon mal da sind, trinken Sie doch wenigstens einen Tee.']),
        ],
        teach: ['v:n2_0677', 'v:n3_0669', 'v:n3_0825', 'v:n3_0824', 'v:n2_1668', 'v:n3_0617', 'v:n2_1850', 'v:n2_1011'],
      },
      {
        at: 'ex_sachiko',
        goal: ['Help Sachiko find guests', 'Hilf Sachiko, Gäste zu finden'],
        lines: [
          l('ex_sachiko', '{広告|こうこく|v:n3_0889}を出すお金もないの。{豪華|ごうか|v:n3_0881}な料理も、{高価|こうか|v:n3_0880}な{部屋|へや}もないし。', ['I don’t even have the money to advertise. No luxurious meals, no expensive rooms.', 'Ich habe nicht einmal Geld für Werbung. Kein luxuriöses Essen, keine teuren Zimmer.'], 'worried'),
          l('ex_sachiko', 'あるのは、雪と、おばあちゃんの{献立|こんだて|v:n2_0691}だけ。今の{傾向|けいこう|v:n3_0826}には、合わないわよね。', ['All I have is snow and my grandmother’s menus. That doesn’t fit today’s trends, does it.', 'Alles, was ich habe, sind Schnee und die Speisepläne meiner Großmutter. Das passt nicht zum heutigen Trend, oder?']),
          ask(
            ['それが、一番のごちそうです', ['That is the greatest treat of all', 'Genau das ist der größte Genuss'], [
              l('ex_sachiko', '……そう言ってくれる人がいるなんて。', ['…To think someone would say that.', '… Dass jemand so etwas sagt.'], 'surprised'),
            ]],
            ['大学生のボランティアに聞いてみます', ['I’ll ask the student volunteers', 'Ich frage die Studenten-Freiwilligen'], [
              l('ex_sachiko', '晴人くんたち？あの子たち、いつもカップラーメンばかり食べてるのよね。', ['Haruto and his friends? Those kids always eat nothing but cup noodles.', 'Haruto und seine Freunde? Die essen immer nur Instantnudeln.']),
            ]],
          ),
        ],
        teach: ['v:n3_0889', 'v:n3_0881', 'v:n3_0880', 'v:n2_0691', 'v:n3_0826'],
      },
      {
        at: 'ex_sachiko',
        goal: ['See the guesthouse full of guests', 'Sieh die Pension voller Gäste'],
        music: 'memory',
        evening: true,
        lines: [
          nar('その夜、民宿「さち」に明かりがともった。雪かきボランティアの学生たちが、十人、{泊まって|とまって}いる。', ['That night the lights go on at Minshuku Sachi. Ten student snow volunteers are staying there.', 'An diesem Abend gehen in der Pension Sachi die Lichter an. Zehn studentische Schneeräum-Freiwillige übernachten dort.']),
          l('ex_sachiko', '{歓迎|かんげい|v:n3_0668}するわ！三年分の{布団|ふとん}が、やっと役に立つわね。', ['Welcome! Three years’ worth of futons are finally of use!', 'Herzlich willkommen! Die Futons von drei Jahren kommen endlich zum Einsatz!'], 'happy'),
          l('ex_haruto2', '大学が、宿代を出してくれることになったんです。{金額|きんがく|v:n3_0768}は少ないけど……。', ['The university agreed to pay for our lodging. It’s not a big amount, though…', 'Die Uni übernimmt die Übernachtungskosten. Der Betrag ist zwar klein …']),
          l('ex_sachiko', '{勘定|かんじょう|v:n3_0674}は、{現金|げんきん|v:n3_0855}じゃなくていいわ。その代わり、雪かきをお願いね。……{泊める|とめる|v:n2_1325}って、こんなにうれしいことだったのね。', ['You don’t have to pay the bill in cash. Instead, please shovel the snow. …I’d forgotten how happy it makes me to give someone a bed for the night.', 'Die Rechnung müsst ihr nicht bar bezahlen. Schaufelt dafür bitte Schnee. … Ich hatte vergessen, wie glücklich es mich macht, jemanden übernachten zu lassen.'], 'happy'),
          l('ex_haruto2', 'こちらこそ、ありがとうございます！', ['No, thank *you*!', 'Wir haben zu danken!'], 'happy'),
        ],
        teach: ['v:n3_0668', 'v:n3_0768', 'v:n3_0674', 'v:n3_0855', 'v:n2_1325'],
      },
    ],
  },
  // ------------------------------------------------------------------ Itsuki: spoons from a fallen tree
  {
    id: 'ep_ex_itsuki',
    chapter: 3,
    after: 'mq11',
    who: 'ex_itsuki',
    title: ['倒れた木のスプーン', 'Spoons from a Fallen Tree', 'Löffel aus einem gefallenen Baum'],
    summary: [
      'The great old cedar of the village fell in a storm. Woodworker Itsuki wants to give every family something made from it.',
      'Die große alte Zeder des Dorfes ist im Sturm umgestürzt. Holzhandwerker Itsuki will jeder Familie etwas daraus schenken.',
    ],
    scenes: [
      {
        at: 'exy_wood',
        goal: ['Visit the woodworking studio', 'Besuche die Holzwerkstatt'],
        lines: [
          nar('工房の{床|ゆか}に、{大木|たいぼく|v:n2_1102}の{皮|かわ|v:n3_0654}と{材木|ざいもく|v:n2_0703}が積んである。{木|き}のいいにおいがする。', ['On the studio floor lie piles of bark from a huge tree, and timber. It smells wonderfully of wood.', 'Auf dem Boden der Werkstatt stapeln sich Rinde eines riesigen Baums und Bauholz. Es duftet herrlich nach Holz.']),
          l('ex_itsuki', '村の{山林|さんりん|v:n2_0744}で、四百年立っていた杉だ。{嵐|あらし}の夜、{傾いて|かたむいて|v:n2_0410}、倒れた。', ['It was a cedar that stood for four hundred years in the village forest. On a stormy night it tilted and fell.', 'Es war eine Zeder, die vierhundert Jahre im Dorfwald stand. In einer Sturmnacht neigte sie sich und fiel.']),
          l('ex_itsuki', 'この{木材|もくざい|v:n2_1768}は、{硬くて|かたくて|v:n3_0615}、{芯|しん|v:n2_0918}まで{堅い|かたい|v:n3_0614}。ふつうの木とは、まるで違う。', ['This wood is hard, solid right to the core. Nothing like ordinary wood.', 'Dieses Holz ist hart, fest bis ins Mark. Ganz anders als gewöhnliches Holz.']),
        ],
        teach: ['v:n2_1102', 'v:n3_0654', 'v:n2_0703', 'v:n2_0744', 'v:n2_0410', 'v:n2_1768', 'v:n3_0615', 'v:n2_0918', 'v:n3_0614'],
      },
      {
        at: 'ex_itsuki',
        goal: ['Talk to Itsuki about his plan', 'Sprich mit Itsuki über seinen Plan'],
        lines: [
          l('ex_itsuki', '木は、{死んで|しんで}もまだ役に立つ。村の家、一軒に一本ずつ、スプーンを作るんだ。', ['A tree is still useful even when it’s dead. I’ll make one spoon for every house in the village.', 'Ein Baum ist auch tot noch zu etwas nütze. Ich mache für jedes Haus im Dorf einen Löffel.']),
          l('ex_itsuki', 'まず{型|かた|v:n3_0612}を作って、{見本|みほん|v:n2_1721}を一本。……でも、俺は{器用|きよう|v:n3_0744}じゃないから、時間がかかる。', ['First I make a template, then one sample. …But I’m not very skilful, so it takes time.', 'Zuerst mache ich eine Schablone, dann ein Muster. … Aber ich bin nicht sehr geschickt, also dauert es.']),
          l('ex_itsuki', '{癖|くせ|v:n3_0783}でね、木の{声|こえ}を聞くまで、ナイフを入れられないんだ。{芸術|げいじゅつ|v:n3_0831}なんて立派なもんじゃない。ただの、ばかな癖さ。', ['It’s a habit of mine: I can’t cut until I hear the wood’s voice. It’s nothing as grand as art. Just a silly habit.', 'Das ist so eine Angewohnheit: Ich kann nicht schneiden, bevor ich die Stimme des Holzes höre. Keine große Kunst. Nur eine dumme Angewohnheit.']),
        ],
        teach: ['v:n3_0612', 'v:n2_1721', 'v:n3_0744', 'v:n3_0783', 'v:n3_0831'],
      },
      {
        at: 'ex_itsuki',
        goal: ['See the finished spoons', 'Sieh dir die fertigen Löffel an'],
        music: 'memory',
        lines: [
          l('ex_itsuki', '{完成|かんせい|v:n3_0680}したよ。百二十本。……一本、あんたの分だ。', ['They’re finished. A hundred and twenty. …This one is yours.', 'Sie sind fertig. Hundertzwanzig Stück. … Dieser hier ist für dich.'], 'happy'),
          nar('小さな{木|き}のスプーン。{持ち手|もちて}に、{森林|しんりん|v:n2_0932}の{年輪|ねんりん}が{生き生き|いきいき|v:n2_0177}と{浮かんで|うかんで}いる。', ['A small wooden spoon. On the handle, the growth rings of the forest stand out vividly.', 'Ein kleiner Holzlöffel. Auf dem Griff zeichnen sich die Jahresringe des Waldes lebendig ab.']),
          l('ex_itsuki', '村のみんなが、毎日このスプーンでご飯を食べる。あの杉が倒れた{記念|きねん|v:n3_0718}に。四百年分、まだ生きてるんだ。', ['Everyone in the village will eat with these spoons every day. In memory of the day that cedar fell. Four hundred years — still alive.', 'Alle im Dorf essen jeden Tag mit diesen Löffeln. Zur Erinnerung an den Tag, an dem die Zeder fiel. Vierhundert Jahre — und sie lebt immer noch.'], 'happy'),
        ],
        teach: ['v:n3_0680', 'v:n2_0932', 'v:n2_0177', 'v:n3_0718'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ken: the forester who meant to leave
  {
    id: 'ep_ex_ken',
    chapter: 3,
    after: 'mq11',
    who: 'ex_ken',
    title: ['森が呼んだ', 'The Forest Called', 'Der Wald hat gerufen'],
    summary: [
      'Young Ken always meant to leave the village. Then a bear with her cubs appears near the school, and the forest needs him.',
      'Der junge Ken wollte immer aus dem Dorf weg. Dann taucht eine Bärin mit Jungen bei der Schule auf, und der Wald braucht ihn.',
    ],
    scenes: [
      {
        at: 'ex_ken',
        goal: ['Talk to Ken at the edge of the village', 'Sprich mit Ken am Dorfrand'],
        lines: [
          l('ex_ken', '俺、春になったら{盆地|ぼんち|v:n2_1659}の町に出るつもりだったんだ。山なんて、{関心|かんしん|v:n3_0678}もなかった。', ['I meant to leave for the town in the basin in spring. I had no interest in the mountains.', 'Ich wollte im Frühling in die Stadt im Becken ziehen. Die Berge haben mich nicht interessiert.']),
          l('ex_ken', 'でも、{親父|おやじ}が{倒れて|たおれて}……森の仕事の{現場|げんば|v:n3_0868}を、俺が{引き継ぐ|ひきつぐ}ことになった。', ['But my dad collapsed… and I ended up taking over his work out in the forest.', 'Aber mein Vater ist zusammengebrochen … und ich musste seine Arbeit im Wald übernehmen.'], 'worried'),
          l('ex_ken', '毎日、草を{刈って|かって|v:n3_0652}、{植木|うえき|v:n2_0215}を育てて。{生意気な|なまいきな|v:n2_1356}ことばっかり言ってた俺が、{案外|あんがい|v:n2_0172}、向いてるらしい。', ['Every day I cut grass and raise young trees. Me, the one who only ever talked back — apparently I’m surprisingly suited to it.', 'Jeden Tag mähe ich Gras und ziehe Setzlinge. Ich, der immer nur frech dahergeredet hat — anscheinend liegt es mir überraschend gut.']),
        ],
        teach: ['v:n2_1659', 'v:n3_0678', 'v:n3_0868', 'v:n3_0652', 'v:n2_0215', 'v:n2_1356', 'v:n2_0172'],
      },
      {
        at: 'ex_ken',
        goal: ['Follow Ken into the forest', 'Folge Ken in den Wald'],
        lines: [
          nar('山の{麓|ふもと|v:n2_1578}。雪の上に、大きな{足跡|あしあと}と、小さな足跡が続いている。', ['At the foot of the mountain, large footprints and small ones run across the snow.', 'Am Fuß des Berges ziehen sich große und kleine Fußspuren über den Schnee.']),
          l('ex_ken', '{熊|くま}の親子だ。学校の近くまで来てる。……{脅かす|おどかす|v:n2_0307}と、逆に{危|あぶ}ない。', ['A bear and her cubs. They’ve come close to the school. …If we frighten them, it’s actually more dangerous.', 'Eine Bärin mit Jungen. Sie sind bis in die Nähe der Schule gekommen. … Wenn wir sie erschrecken, wird es nur gefährlicher.']),
          l('ex_ken', '{近寄る|ちかよる|v:n2_1151}な。{睨んで|にらんで|v:n2_1382}もだめだ。{追いかけて|おいかけて|v:n2_0266}もだめ。ゆっくり、{離|はな}れるんだ。', ['Don’t go near them. Don’t glare at them either. Don’t chase them. Move away slowly.', 'Geh nicht näher. Starr sie auch nicht an. Lauf ihnen nicht hinterher. Langsam zurückweichen.']),
          l('ex_ken', '冬に{餌|えさ}がないと、熊は{生存|せいぞん|v:n2_0997}のために、村まで下りてくる。熊が悪いんじゃない。', ['When there’s no food in winter, bears come down to the village to survive. It’s not the bears’ fault.', 'Wenn es im Winter kein Futter gibt, kommen die Bären ins Dorf herunter, um zu überleben. Es ist nicht ihre Schuld.']),
        ],
        teach: ['v:n2_1578', 'v:n2_0307', 'v:n2_1151', 'v:n2_1382', 'v:n2_0266', 'v:n2_0997'],
      },
      {
        at: 'ex_ken',
        goal: ['Hear Ken’s decision', 'Hör dir Kens Entscheidung an'],
        lines: [
          l('ex_ken', '熊の親子は、森の{奥|おく}へ帰っていった。{群れ|むれ|v:n2_1736}に戻れるといいな。', ['The bear and her cubs went back deep into the forest. I hope they find their group again.', 'Die Bärin und ihre Jungen sind tief in den Wald zurückgegangen. Hoffentlich finden sie zu den anderen zurück.'], 'happy'),
          l('ex_ken', '森の{活動|かつどう|v:n3_0626}をちゃんとすれば、熊の餌も増える。人と熊が、お互いの場所を守れるんだ。', ['If we look after the forest properly, there’ll be more food for the bears too. People and bears can each keep their own place.', 'Wenn wir den Wald richtig pflegen, gibt es auch mehr Futter für die Bären. Menschen und Bären können dann ihren eigenen Platz behalten.']),
          l('ex_ken', '……決めた。俺、村に{残|のこ}るよ。森が、俺を呼んだんだと思う。', ['…I’ve decided. I’m staying in the village. I think the forest called me.', '… Ich habe mich entschieden. Ich bleibe im Dorf. Ich glaube, der Wald hat mich gerufen.'], 'happy'),
        ],
        teach: ['v:n2_1736', 'v:n3_0626'],
      },
    ],
  },
  // ------------------------------------------------------------------ Mr. Hoshino: twenty-five years of weather
  {
    id: 'ep_ex_hoshino',
    chapter: 3,
    after: 'mq12',
    who: 'ex_hoshino',
    title: ['だれのための天気', 'Weather for Whom?', 'Wetter für wen?'],
    summary: [
      'For twenty-five years Mr. Hoshino has written down the weather every day. Now the office in the city wants to close his station.',
      'Seit fünfundzwanzig Jahren schreibt Herr Hoshino jeden Tag das Wetter auf. Jetzt will das Amt in der Stadt seine Station schließen.',
    ],
    scenes: [
      {
        at: 'exy_weather',
        goal: ['Visit the weather station', 'Besuche die Wetterstation'],
        lines: [
          l('ex_hoshino', '毎朝六時、{気圧|きあつ|v:n2_0474}と{湿度|しつど|v:n2_0784}を{記録|きろく|v:n3_0763}する。二十五年、一日も休んだことがない。', ['Every morning at six I record the air pressure and humidity. In twenty-five years I haven’t missed a single day.', 'Jeden Morgen um sechs notiere ich Luftdruck und Luftfeuchtigkeit. In fünfundzwanzig Jahren habe ich keinen einzigen Tag ausgelassen.']),
          l('ex_hoshino', '{快晴|かいせい|v:n2_0350}の日も、{夕立|ゆうだち|v:n2_1814}の日も、同じことを{繰り返す|くりかえす|v:n3_0804}んだ。', ['On clear days and on days with sudden showers, I repeat the same routine.', 'An klaren Tagen und an Tagen mit Regenschauern wiederhole ich dasselbe.']),
          l('ex_hoshino', '{望遠鏡|ぼうえんきょう|v:n2_1627}で山の雲を見て、雪の{確率|かくりつ|v:n2_0380}を{計算|けいさん|v:n3_0828}する。{結果|けっか|v:n3_0841}は、ほとんど当たるよ。', ['I watch the mountain clouds through a telescope and calculate the chance of snow. The results are almost always right.', 'Ich beobachte die Wolken am Berg durch ein Teleskop und berechne die Schneewahrscheinlichkeit. Die Ergebnisse stimmen fast immer.'], 'happy'),
        ],
        teach: ['v:n2_0474', 'v:n2_0784', 'v:n3_0763', 'v:n2_0350', 'v:n2_1814', 'v:n3_0804', 'v:n2_1627', 'v:n2_0380', 'v:n3_0828', 'v:n3_0841'],
      },
      {
        at: 'ex_hoshino',
        goal: ['Ask Mr. Hoshino about the letter from the city', 'Frag Herrn Hoshino nach dem Brief aus der Stadt'],
        lines: [
          l('ex_hoshino', '町の役所から手紙が来た。「{衛星|えいせい}があるから、{人|ひと}の観測は要らない」とな。', ['A letter came from the city office: “We have satellites, so human observation is no longer needed.”', 'Ein Brief vom Amt in der Stadt kam: „Wir haben Satelliten, menschliche Beobachtung wird nicht mehr gebraucht.“'], 'worried'),
          l('ex_hoshino', '{確|たし}かに、{気候|きこう|v:n3_0701}は{東西|とうざい|v:n2_1289}{南北|なんぼく|v:n2_1366}、空から全部見える。……じゃあ、わしの二十五年は、何だったんだろうな。', ['It’s true, from the sky you can see the whole climate — east, west, north and south. …Then what were my twenty-five years for?', 'Es stimmt, aus dem All sieht man das ganze Klima — Ost, West, Nord und Süd. … Wofür waren dann meine fünfundzwanzig Jahre?'], 'worried'),
          l('ex_hoshino', '{一定|いってい|v:n2_0196}の場所で、{ずうっと||v:n2_0952}見ること。それにも、意味があると思っていたんだが。', ['Watching from one fixed place, all the time. I thought that had meaning too.', 'Immer von einem festen Ort aus zu beobachten. Ich dachte, auch das hätte einen Sinn.']),
        ],
        teach: ['v:n3_0701', 'v:n2_1289', 'v:n2_1366', 'v:n2_0196', 'v:n2_0952'],
      },
      {
        at: 'ex_hoshino',
        goal: ['Bring Mr. Hoshino the answer from the museum', 'Bring Herrn Hoshino die Antwort aus dem Museum'],
        music: 'memory',
        lines: [
          l('ex_fumiko', '星野さん、これを見て。六十年前の大雪の日記と、あなたの記録。{湿気|しっけ|v:n2_0780}の{増大|ぞうだい|v:n2_1055}が、そっくり同じなの。', ['Mr. Hoshino, look at this. The diary from the great snowstorm sixty years ago, and your records. The rise in humidity is exactly the same.', 'Herr Hoshino, sehen Sie sich das an. Das Tagebuch vom großen Schneesturm vor sechzig Jahren und Ihre Aufzeichnungen. Der Anstieg der Feuchtigkeit ist genau gleich.']),
          l('ex_hoshino', '本当だ……！{水蒸気|すいじょうき|v:n2_0939}の{傾|かたむ}きも、{日の入り|ひのいり|v:n2_1518}の空の色まで……。', ['It’s true…! The trend in water vapour, even the colour of the sky at sunset…', 'Tatsächlich …! Der Verlauf des Wasserdampfs, sogar die Farbe des Himmels bei Sonnenuntergang …'], 'surprised'),
          l('ex_fumiko', '{衛星|えいせい}には分からないことが、あなたの{手書き|てがき}にはあるのよ。村の{避難|ひなん}{計画|けいかく}に、使わせてください。', ['Your handwritten notes hold things satellites can’t tell. Please let us use them for the village’s evacuation plan.', 'In Ihren handschriftlichen Notizen steht, was Satelliten nicht wissen. Bitte lassen Sie uns sie für den Evakuierungsplan des Dorfes nutzen.']),
          l('ex_hoshino', '……だれのための天気か、やっと分かった。村のためだったんだな。', ['…At last I know whom the weather was for. It was for the village.', '… Endlich weiß ich, für wen das Wetter war. Für das Dorf.'], 'happy'),
        ],
        teach: ['v:n2_0780', 'v:n2_1055', 'v:n2_0939', 'v:n2_1518'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ryūji: ten years without a letter
  {
    id: 'ep_ex_ryuuji',
    chapter: 3,
    after: 'mq12',
    who: 'ex_ryuuji',
    title: ['十年分の手紙', 'Ten Years of Letters', 'Briefe aus zehn Jahren'],
    summary: [
      'Every winter Ryūji comes to Yukimi to work. He has not written to his daughter in ten years — and now she is getting married.',
      'Jeden Winter kommt Ryūji zum Arbeiten nach Yukimi. Seiner Tochter hat er seit zehn Jahren nicht geschrieben — und jetzt heiratet sie.',
    ],
    scenes: [
      {
        at: 'ex_ryuuji',
        goal: ['Talk to Ryūji by the bridge', 'Sprich mit Ryūji an der Brücke'],
        lines: [
          l('ex_ryuuji', '冬だけここで{暮らして|くらして|v:n3_0800}、春になったら、また次の現場さ。そういう{暮らし|くらし|v:n3_0798}を、もう二十年。', ['I live here only in winter, and in spring I’m off to the next site. I’ve lived like that for twenty years.', 'Ich lebe nur im Winter hier, und im Frühling geht es zur nächsten Baustelle. So lebe ich schon seit zwanzig Jahren.']),
          l('ex_ryuuji', '{長女|ちょうじょ|v:n2_1177}がいてな。離婚してから、{帰宅|きたく|v:n3_0710}する家もなくなった。……{誤解|ごかい|v:n3_0911}されたまま、十年だ。', ['I have an eldest daughter. Since the divorce I haven’t had a home to go back to. …Ten years now, still misunderstood.', 'Ich habe eine älteste Tochter. Seit der Scheidung habe ich kein Zuhause mehr, in das ich zurückkehren könnte. … Seit zehn Jahren missverstanden.'], 'worried'),
          l('ex_ryuuji', '{けち||v:n3_0839}な父親だと思われてる。{金銭|きんせん|v:n3_0771}は全部送ってたんだがな。……{決まり|きまり|v:n3_0724}が悪くて、手紙は一度も書けなかった。', ['She thinks I’m a stingy father. I sent all the money I had, though. …I was too embarrassed to ever write a letter.', 'Sie hält mich für einen geizigen Vater. Dabei habe ich ihr alles Geld geschickt. … Es war mir zu peinlich, je einen Brief zu schreiben.'], 'worried'),
        ],
        teach: ['v:n3_0800', 'v:n3_0798', 'v:n2_1177', 'v:n3_0710', 'v:n3_0911', 'v:n3_0839', 'v:n3_0771', 'v:n3_0724'],
      },
      {
        at: 'ex_ryuuji',
        goal: ['See what Ryūji has received', 'Sieh nach, was Ryūji bekommen hat'],
        lines: [
          nar('{竜二|りゅうじ}さんが、白い{封筒|ふうとう}を持って立ちつくしている。東京から、{温泉|おんせん}の町を{経由|けいゆ|v:n3_0833}して届いた手紙だ。', ['Ryūji stands frozen, holding a white envelope. A letter that came from Tokyo by way of the hot-spring town.', 'Ryūji steht wie erstarrt da, einen weißen Umschlag in der Hand. Ein Brief aus Tokio, der über die Onsen-Stadt hierher kam.']),
          l('ex_ryuuji', '{思い掛けない|おもいがけない|v:n2_0321}手紙だ……娘が、結婚する。{花嫁|はなよめ|v:n2_1453}の父として、式に来てほしい、と。', ['An unexpected letter… my daughter is getting married. She wants me at the ceremony, as the bride’s father.', 'Ein unerwarteter Brief … meine Tochter heiratet. Sie möchte, dass ich als Vater der Braut zur Feier komme.'], 'surprised'),
          nar('竜二さんは、長い{溜息|ためいき|v:n2_1130}をついた。{唇|くちびる|v:n2_0539}が{震|ふる}え、{まぶた||v:n2_1689}が赤くなっている。', ['Ryūji lets out a long sigh. His lips tremble, his eyelids have turned red.', 'Ryūji stößt einen langen Seufzer aus. Seine Lippen zittern, seine Augenlider sind rot geworden.']),
          l('ex_ryuuji', '……{詳しい|くわしい|v:n3_0814}ことは書いてない。ただ、「お父さんの{恋人|こいびと|v:n3_0875}だった母さんが、ずっと、本当のことを話してくれていました」と。', ['…It doesn’t say much. Only: “Mum — the woman you once loved — always told me the truth about you.”', '… Viel steht nicht drin. Nur: „Mama — die Frau, die du einst geliebt hast — hat mir immer die Wahrheit über dich erzählt.“']),
        ],
        teach: ['v:n3_0833', 'v:n2_0321', 'v:n2_1453', 'v:n2_1130', 'v:n2_0539', 'v:n2_1689', 'v:n3_0814', 'v:n3_0875'],
      },
      {
        at: 'ex_ryuuji',
        goal: ['Help Ryūji write his answer', 'Hilf Ryūji, seine Antwort zu schreiben'],
        music: 'memory',
        lines: [
          l('ex_ryuuji', '何て書けばいいか、分からん。十年分の{言葉|ことば}が、どこにもないんだ。', ['I don’t know what to write. Ten years’ worth of words, and I can’t find any of them.', 'Ich weiß nicht, was ich schreiben soll. Zehn Jahre an Worten, und ich finde keins davon.'], 'worried'),
          ask(
            ['「おめでとう」だけで、十分です', ['“Congratulations” alone is enough', '„Herzlichen Glückwunsch“ reicht völlig'], [
              l('ex_ryuuji', '……そうか。{一言|ひとこと}で、いいのか。', ['…Is that so. Just one word is enough?', '… Ach so. Ein einziges Wort genügt?'], 'surprised'),
            ]],
            ['会いたいと、書けばいい', ['Just write that you want to see her', 'Schreiben Sie einfach, dass Sie sie sehen wollen'], [
              l('ex_ryuuji', '会いたい……。そんな{恋|こい|v:n3_0873}文みたいなこと、書けるかよ。……いや、書くか。', ['That I want to see her… Write something like a love letter? …No — I will write it.', 'Dass ich sie sehen will … So etwas wie einen Liebesbrief? … Nein — ich schreibe es.'], 'happy'),
            ]],
          ),
          nar('竜二さんは、{暮れ|くれ|v:n3_0810}の空の下で、ゆっくりと書いた。「おめでとう。会いに行く。父より」', ['Under the dusk sky, Ryūji writes slowly: “Congratulations. I’m coming to see you. Dad.”', 'Unter dem Abendhimmel schreibt Ryūji langsam: „Herzlichen Glückwunsch. Ich komme dich besuchen. Papa.“']),
          l('ex_ryuuji', '{幸福|こうふく|v:n3_0900}ってのは、{幸運|こううん|v:n3_0876}とは違うんだな。自分から、取りに行くもんだ。', ['Happiness isn’t the same as luck, is it. It’s something you go and get yourself.', 'Glück ist nicht dasselbe wie Zufall, oder? Man muss es sich selbst holen.'], 'happy'),
        ],
        teach: ['v:n3_0873', 'v:n3_0810', 'v:n3_0900', 'v:n3_0876'],
      },
    ],
  },
  // ------------------------------------------------------------------ Director Fumiko: the diary of the great snowstorm
  {
    id: 'ep_ex_fumiko',
    chapter: 3,
    after: 'mq12',
    who: 'ex_fumiko',
    title: ['大雪の日記', 'The Diary of the Great Snow', 'Das Tagebuch des großen Schnees'],
    summary: [
      'A diary from the great snowstorm sixty years ago turns up in the local museum. Who wrote it — and who did the writer save?',
      'Im Heimatmuseum taucht ein Tagebuch vom großen Schneesturm vor sechzig Jahren auf. Wer hat es geschrieben — und wen hat der Schreiber gerettet?',
    ],
    scenes: [
      {
        at: 'exy_museum',
        goal: ['Visit the local history museum', 'Besuche das Heimatmuseum'],
        lines: [
          l('ex_fumiko', '{旧|きゅう|v:n3_0732}{役場|やくば}の{倉|くら}から、{奇妙|きみょう|v:n3_0726}な日記が見つかったの。{偶然|ぐうぜん|v:n3_0779}、{床|ゆか}の下からね。', ['A strange diary was found in the storehouse of the old village office. Under the floor, by chance.', 'Im Speicher des alten Gemeindeamts wurde ein seltsames Tagebuch gefunden. Zufällig, unter dem Fußboden.']),
          l('ex_fumiko', '六十年前の大雪の{災難|さいなん|v:n2_0701}の記録よ。{現代|げんだい|v:n3_0864}の{記事|きじ|v:n3_0704}より、ずっと{詳しく|くわしく}書いてあるの。', ['It’s a record of the great snow disaster sixty years ago. It’s far more detailed than any modern article.', 'Es ist eine Aufzeichnung der großen Schneekatastrophe vor sechzig Jahren. Viel ausführlicher als jeder moderne Artikel.']),
          l('ex_fumiko', '{文体|ぶんたい|v:n2_1602}は{近代|きんだい|v:n3_0773}のもので、ところどころに{俳句|はいく|v:n2_1412}がある。最後の{句|く|v:n3_0777}が、とても美しいの。', ['The style is from the modern era, with haiku here and there. The last verse is very beautiful.', 'Der Stil stammt aus der Moderne, hier und da stehen Haiku. Der letzte Vers ist wunderschön.']),
        ],
        teach: ['v:n3_0732', 'v:n3_0726', 'v:n3_0779', 'v:n2_0701', 'v:n3_0864', 'v:n3_0704', 'v:n2_1602', 'v:n3_0773', 'v:n2_1412', 'v:n3_0777'],
      },
      {
        at: 'ex_fumiko',
        goal: ['Read the diary with Fumiko', 'Lies mit Fumiko im Tagebuch'],
        lines: [
          nar('「二月十日。雪は{屋根|やね}を{越え|こえ}た。{方々|ほうぼう|v:n3_0616}の家が{閉じ込め|とじこめ}られた。{軍隊|ぐんたい|v:n3_0819}の{救援|きゅうえん}は、まだ来ない」', ['“February 10th. The snow has risen above the roofs. Houses everywhere are cut off. The army’s relief has still not come.”', '„10. Februar. Der Schnee ist über die Dächer gestiegen. Überall sind Häuser eingeschlossen. Die Hilfe der Armee ist immer noch nicht da.“']),
          nar('「わたしは{医者|いしゃ}ではない。だが、{子|こ}どもの{熱|ねつ}を下げる{薬草|やくそう}を知っている。行かねばならぬ」', ['“I am not a doctor. But I know the herb that brings down a child’s fever. I must go.”', '„Ich bin kein Arzt. Aber ich kenne das Kraut, das das Fieber eines Kindes senkt. Ich muss gehen.“']),
          l('ex_fumiko', '{記者|きしゃ|v:n3_0706}の書いた{見出し|みだし|v:n2_1712}には、名前がない。「{国民|こくみん|v:n3_0920}の一人、雪の中を歩く」だけ。', ['The headline the journalist wrote has no name. Only: “One citizen walks through the snow.”', 'Die Schlagzeile des Journalisten nennt keinen Namen. Nur: „Ein Bürger geht durch den Schnee.“']),
        ],
        teach: ['v:n3_0616', 'v:n3_0819', 'v:n3_0706', 'v:n2_1712', 'v:n3_0920'],
      },
      {
        at: 'ex_fumiko',
        goal: ['Hear what Fumiko found out', 'Hör, was Fumiko herausgefunden hat'],
        music: 'memory',
        lines: [
          l('ex_fumiko', '{索引|さくいん|v:n2_0712}をたどって、やっと分かった。日記を書いたのは、わたしの祖母だったのよ。', ['Following the index, I finally found out. The diary was written by my grandmother.', 'Über das Register habe ich es endlich herausgefunden. Das Tagebuch hat meine Großmutter geschrieben.'], 'surprised'),
          l('ex_fumiko', 'そして、助けられた子どもは……{白髪|しらが|v:n2_0910}の、山で{薬草|やくそう}を{採る|とる}{梅|うめ}さん。今も元気に、隣の谷で暮らしてる。', ['And the child she saved… is Grandma Ume, the white-haired herb gatherer. She still lives, hale and hearty, in the next valley.', 'Und das Kind, das sie gerettet hat … ist Oma Ume, die weißhaarige Kräutersammlerin. Sie lebt noch heute munter im Nachbartal.']),
          l('ex_fumiko', '{結論|けつろん|v:n3_0848}は一つ。{現在|げんざい|v:n3_0859}のわたしたちは、だれかが雪の中を歩いてくれた{結果|けっか}なのね。', ['There’s only one conclusion. All of us today are here because someone once walked through the snow for us.', 'Es gibt nur eine Schlussfolgerung. Wir alle heute sind da, weil einmal jemand für uns durch den Schnee gegangen ist.'], 'happy'),
          l('ex_fumiko', 'この日記、{寄付|きふ|v:n3_0721}として資料館に飾るわ。{見解|けんかい|v:n3_0853}も解説も要らない。ただ、読んでもらうの。', ['I’ll put this diary on display in the museum as a donation. No opinions, no commentary. Just let people read it.', 'Ich stelle das Tagebuch als Schenkung im Museum aus. Keine Meinung, kein Kommentar. Die Leute sollen es einfach lesen.']),
        ],
        teach: ['v:n2_0712', 'v:n2_0910', 'v:n3_0848', 'v:n3_0859', 'v:n3_0721', 'v:n3_0853'],
      },
    ],
  },
  // ------------------------------------------------------------------ Yuzu: the girl who falls every day
  {
    id: 'ep_ex_yuzu',
    chapter: 3,
    after: 'mq13',
    who: 'ex_yuzu',
    title: ['ころんでもいい', 'It’s Okay to Fall', 'Hinfallen ist erlaubt'],
    summary: [
      'Little Yuzu falls over every day at ski school and wants to quit. The ski race for children is next week.',
      'Die kleine Yuzu fällt in der Skischule jeden Tag hin und will aufhören. Nächste Woche ist das Kinderskirennen.',
    ],
    scenes: [
      {
        at: 'ex_yuzu',
        goal: ['Talk to Yuzu at the ski school', 'Sprich mit Yuzu in der Skischule'],
        lines: [
          l('ex_yuzu', 'もう、スキーなんて{嫌い|きらい}！雪の{凸凹|でこぼこ|v:n2_1250}で、すぐ{転がる|ころがる|v:n2_0684}の。', ['I hate skiing! On the bumpy snow I roll over straight away.', 'Ich hasse Skifahren! Auf dem holprigen Schnee kugle ich sofort um.'], 'worried'),
          l('ex_yuzu', 'きのうは、{引っ繰り返って|ひっくりかえって|v:n2_1498}、雪だるまみたいになった。みんな、笑ったもん。', ['Yesterday I flipped over and ended up like a snowman. Everyone laughed.', 'Gestern hab ich mich überschlagen und sah aus wie ein Schneemann. Alle haben gelacht.'], 'worried'),
          l('ex_yuzu', '{悔しい|くやしい|v:n3_0796}！{可愛そう|かわいそう|v:n3_0656}って言われるのも、{嫌|いや}！', ['It’s so frustrating! And I hate it when they say “poor thing” too!', 'Das ist so ärgerlich! Und ich hasse es auch, wenn sie „Du Arme“ sagen!'], 'worried'),
        ],
        teach: ['v:n2_1250', 'v:n2_0684', 'v:n2_1498', 'v:n3_0796', 'v:n3_0656'],
      },
      {
        at: 'ex_yuzu',
        goal: ['Practise with Yuzu', 'Übe mit Yuzu'],
        lines: [
          l('ex_yuzu', 'コーチの{真似|まね|v:n2_1688}をしてみる。ひざを曲げて……。', ['I’ll try copying the coach. Bend the knees…', 'Ich mache es dem Trainer nach. Knie beugen …']),
          l('ex_yuzu', '{目立つ|めだつ|v:n2_1753}の、{嫌い|きらい|v:n3_0759}なの。でも、{勝ち|かち|v:n3_0620}たい。……へんかな？', ['I hate standing out. But I want to win. …Is that weird?', 'Ich hasse es aufzufallen. Aber ich will gewinnen. … Ist das komisch?']),
          ask(
            ['転んでも、また立てばいいよ', ['Even if you fall, just get up again', 'Auch wenn du fällst, steh einfach wieder auf'], [
              l('ex_yuzu', '……転んでも、いいの？', ['…It’s okay to fall?', '… Hinfallen ist okay?'], 'surprised'),
            ]],
            ['ゆずちゃんなら、できるよ', ['You can do it, Yuzu', 'Du schaffst das, Yuzu'], [
              l('ex_yuzu', 'ほんと？……じゃあ、もう一回だけ。', ['Really? …Then just one more time.', 'Echt? … Dann nur noch einmal.'], 'happy'),
            ]],
          ),
          l('ex_yuzu', '{機嫌|きげん|v:n3_0700}、直った！{いよいよ||v:n2_0206}来週は、大会だもんね。', ['I’m in a good mood again! The race is finally next week!', 'Gute Laune ist wieder da! Nächste Woche ist endlich das Rennen!'], 'happy'),
        ],
        teach: ['v:n2_1688', 'v:n2_1753', 'v:n3_0759', 'v:n3_0620', 'v:n3_0700', 'v:n2_0206'],
      },
      {
        at: 'ex_yuzu',
        goal: ['Cheer Yuzu on at the race', 'Feuere Yuzu beim Rennen an'],
        music: 'memory',
        lines: [
          nar('子どもスキー大会。ゆずちゃんは、{ゴール||v:n3_0910}の手前で、一度だけ転んだ。でも、すぐに立ち上がった。', ['The children’s ski race. Just before the finish, Yuzu falls once. But she gets straight back up.', 'Das Kinderskirennen. Kurz vor dem Ziel fällt Yuzu einmal hin. Aber sie steht sofort wieder auf.']),
          nar('結果は、ビリ。それでも、だれよりも大きな{拍手|はくしゅ}が起きた。{雪菜|ゆきな}{先生|せんせい}が、{可愛らしい|かわいらしい|v:n3_0657}{手袋|てぶくろ}で、ぱちぱちと手をたたいている。', ['She comes last. Even so, she gets the loudest applause of all. Ms. Yukina is clapping away in her sweet little gloves.', 'Sie wird Letzte. Trotzdem bekommt sie den lautesten Applaus von allen. Frau Yukina klatscht in ihren niedlichen Handschuhen.']),
          l('ex_yuzu', 'ビリだったけど……{流石|さすが|v:n2_0726}、ゆず、って言われた！{物凄い|ものすごい|v:n2_1781}、うれしい！', ['I came last… but they said, “That’s our Yuzu!” I’m super, super happy!', 'Ich war Letzte … aber sie haben gesagt: „Typisch Yuzu, toll!“ Ich bin wahnsinnig glücklich!'], 'happy'),
        ],
        teach: ['v:n3_0910', 'v:n3_0657', 'v:n2_0726', 'v:n2_1781'],
      },
    ],
  },
  // ------------------------------------------------------------------ Haruto: a second family in the snow
  {
    id: 'ep_ex_haruto2',
    chapter: 3,
    after: 'mq13',
    who: 'ex_haruto2',
    title: ['雪かきの単位', 'Credits for Shovelling Snow', 'Punkte fürs Schneeschippen'],
    summary: [
      'University student Haruto came to clear snow only for his credits. Before he knows it, the village has become his second family.',
      'Student Haruto kam nur wegen der Uni-Punkte zum Schneeräumen. Ehe er sich versieht, ist das Dorf seine zweite Familie geworden.',
    ],
    scenes: [
      {
        at: 'ex_haruto2',
        goal: ['Talk to the student volunteer', 'Sprich mit dem Studenten-Freiwilligen'],
        lines: [
          l('ex_haruto2', '{後期|こうき}の{学期|がっき|v:n3_0625}、{単位|たんい}が足りなくて。この「地域ボランティア」っていう{科目|かもく|v:n3_0645}を取ったんです。', ['In the second semester I was short of credits. So I took this course called “community volunteering”.', 'Im zweiten Semester haben mir Punkte gefehlt. Also habe ich das Fach „Freiwilligenarbeit in der Region“ belegt.']),
          l('ex_haruto2', '{ゼミ||v:n2_1019}の{教授|きょうじゅ|v:n3_0749}に「レポートの{締切|しめきり|v:n2_0807}は三月だ」って。{期限|きげん|v:n2_0480}までに、二週間{働けば|はたらけば}いいだけ。', ['My seminar professor said, “The report deadline is March.” All I have to do is work two weeks before the deadline.', 'Mein Seminarprofessor sagte: „Abgabe des Berichts ist im März.“ Ich muss bis zur Frist nur zwei Wochen arbeiten.']),
          l('ex_haruto2', '授業は{欠席|けっせき|v:n3_0845}ばかりだったけど、ここなら{合計|ごうけい|v:n3_0886}の時間だけで{評価|ひょうか}される。楽な{切っ掛け|きっかけ|v:n2_0491}でしょ？', ['I mostly skipped classes, but here I’m graded just on total hours. An easy way in, right?', 'Ich habe die Vorlesungen meistens geschwänzt, aber hier zählt nur die Gesamtzeit. Ein bequemer Einstieg, oder?']),
        ],
        teach: ['v:n3_0625', 'v:n3_0645', 'v:n2_1019', 'v:n3_0749', 'v:n2_0807', 'v:n2_0480', 'v:n3_0845', 'v:n3_0886', 'v:n2_0491'],
      },
      {
        at: 'exy_footbath',
        goal: ['Take a break at the footbath', 'Mach eine Pause am Fußbad'],
        lines: [
          l('ex_haruto2', 'ふう……{休憩|きゅうけい|v:n3_0736}。雪かきって、こんなに大変なんですね。{手拭い|てぬぐい|v:n2_1260}、びしょびしょ。', ['Phew… break time. Shovelling snow is this hard, huh. My hand towel is soaked.', 'Puh … Pause. Schneeschippen ist ja echt anstrengend. Mein Handtuch ist klatschnass.']),
          l('ex_haruto2', '村のおばあちゃんたちが、{水筒|すいとう|v:n2_0944}にお茶を入れてくれるんです。「若い人がいると、村に{活気|かっき|v:n3_0623}が出る」って。', ['The grannies of the village fill my water bottle with tea. “When young people are around, the village livens up,” they say.', 'Die Omas im Dorf füllen mir Tee in die Trinkflasche. „Wenn junge Leute da sind, kommt Leben ins Dorf“, sagen sie.'], 'happy'),
          l('ex_haruto2', '{行儀|ぎょうぎ|v:n3_0747}が悪いって{叱|しか}られたり、{後輩|こうはい|v:n3_0899}みたいにかわいがられたり。……{感じる|かんじる|v:n3_0676}んです。ここ、家みたいだって。', ['They scold me for bad manners, and they spoil me like a younger brother. …I feel it. This place is like home.', 'Sie schimpfen mich wegen schlechter Manieren und verwöhnen mich wie einen jüngeren Bruder. … Ich spüre es. Hier ist es wie zu Hause.']),
        ],
        teach: ['v:n3_0736', 'v:n2_1260', 'v:n2_0944', 'v:n3_0623', 'v:n3_0747', 'v:n3_0899', 'v:n3_0676'],
      },
      {
        at: 'ex_haruto2',
        goal: ['Hear what Haruto wrote in his report', 'Hör, was Haruto in seinen Bericht geschrieben hat'],
        music: 'memory',
        lines: [
          l('ex_haruto2', 'レポートの{題|だい}、変えました。「村に{貢献|こうけん|v:n3_0888}した二週間」じゃなくて、「村にもらった二週間」。', ['I changed the title of my report. Not “Two weeks I contributed to the village”, but “Two weeks the village gave me”.', 'Ich habe den Titel meines Berichts geändert. Nicht „Zwei Wochen, in denen ich dem Dorf geholfen habe“, sondern „Zwei Wochen, die mir das Dorf geschenkt hat“.'], 'happy'),
          l('ex_haruto2', '{教授|きょうじゅ}が{感心|かんしん|v:n3_0677}してくれて。来年は、ゼミの{共同|きょうどう|v:n3_0752}研究で、みんなで来ることになったんです。', ['My professor was impressed. Next year our whole seminar is coming for a joint research project.', 'Mein Professor war beeindruckt. Nächstes Jahr kommt das ganze Seminar für ein gemeinsames Forschungsprojekt.'], 'happy'),
          l('ex_haruto2', 'お年寄りへの{敬意|けいい|v:n3_0823}とか、雪の{全般|ぜんぱん|v:n2_1039}の知識とか……{共通|きょうつう|v:n3_0751}するのは、ここで覚えたことばかりです。', ['Respect for the elderly, everything about snow… what it all has in common is that I learned it here.', 'Respekt vor den Alten, alles über Schnee … Gemeinsam ist allem, dass ich es hier gelernt habe.']),
        ],
        teach: ['v:n3_0888', 'v:n3_0677', 'v:n3_0752', 'v:n3_0823', 'v:n2_1039', 'v:n3_0751'],
      },
    ],
  },
];
