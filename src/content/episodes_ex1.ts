import { ask, l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 1: the people of the Hinomori shopping arcade and the city hospital (content/expansion.ts). */
export const EPISODES_EX1: Episode[] = [
  // ------------------------------------------------------------------ Mr. Ōmori: the last shop of the arcade
  {
    id: 'ep_ex_oomori',
    chapter: 1,
    after: 'mq2',
    who: 'ex_oomori',
    title: ['最後の八百屋', 'The Last Greengrocer', 'Der letzte Gemüsehändler'],
    summary: [
      'One shop after another in the arcade closes. Mr. Ōmori, the greengrocer, wants to be the last one standing — but his figures say otherwise.',
      'Ein Laden nach dem anderen in der Einkaufsstraße schließt. Herr Ōmori, der Gemüsehändler, will als Letzter bleiben — aber seine Zahlen sagen etwas anderes.',
    ],
    scenes: [
      {
        at: 'ex_oomori',
        goal: ['Talk to Mr. Ōmori at his greengrocer', 'Sprich mit Herrn Ōmori an seinem Gemüseladen'],
        lines: [
          l('ex_oomori', 'いらっしゃい！今日の大根は{新鮮|しんせん|v:n3_0195}だよ。……と言っても、お客さんは君だけか。', ['Welcome! Today’s daikon is fresh. …Mind you, you’re my only customer.', 'Willkommen! Der Rettich ist heute frisch. … Wobei, du bist meine einzige Kundin.']),
          l('ex_oomori', 'この{商店|しょうてん|v:n2_0884}街には、昔は五十の店があった。{商人|しょうにん|v:n3_0148}の声で、うるさいくらいだったんだ。', ['This arcade once had fifty shops. It was almost too loud with the voices of the merchants.', 'In dieser Einkaufsstraße gab es früher fünfzig Läden. Vor lauter Händlerstimmen war es fast zu laut.']),
          l('ex_oomori', 'でも、駅前に大きなスーパーができて、店が{次々に|つぎつぎに|v:tsugitsugini}閉まった。去年は三軒が{相次いで|あいついで|v:aitsuide}やめたよ。', ['But a big supermarket opened by the station, and the shops closed one after another. Last year three quit in a row.', 'Aber am Bahnhof hat ein großer Supermarkt aufgemacht, und die Läden haben einer nach dem anderen zugemacht. Letztes Jahr haben drei kurz hintereinander aufgegeben.'], 'worried'),
          l('ex_oomori', 'うちの{売上|うりあげ|v:n2_0239}も、半分になった。{収入|しゅうにゅう|v:n3_0103}より{支出|ししゅつ|v:n3_0037}のほうが多い月もある。', ['My sales have halved too. Some months, my expenses are higher than my income.', 'Mein Umsatz hat sich auch halbiert. In manchen Monaten sind die Ausgaben höher als die Einnahmen.'], 'worried'),
          l('ex_oomori', '{それでも||v:soredemo}、わしは{決して|けっして|v:kesshite}閉めないよ。この街に、八百屋が一軒もないなんて、さびしすぎるだろう？', ['Even so, I will never close. A town without a single greengrocer — that would be too lonely, wouldn’t it?', 'Trotzdem mache ich niemals zu. Eine Stadt ohne einen einzigen Gemüseladen — das wäre doch zu traurig, oder?']),
        ],
        teach: ['v:n3_0195', 'v:n2_0884', 'v:n3_0148', 'v:tsugitsugini', 'v:aitsuide', 'v:n2_0239', 'v:n3_0103', 'v:n3_0037', 'v:soredemo', 'v:kesshite'],
      },
      {
        at: 'exh_shutter',
        goal: ['Look at the closed shops of the arcade', 'Sieh dir die geschlossenen Läden der Straße an'],
        music: 'memory',
        lines: [
          nar('シャッターに、古い紙が{何|なん}枚も{貼|は}ってある。「{特売|とくばい|v:n2_1309}」「{売り切れ|うりきれ|v:n2_0241}ました」「{定価|ていか|v:n2_1234}の半額」……。', ['Several old papers are stuck to the shutter. “Special sale.” “Sold out.” “Half the list price.”…', 'Am Rollladen kleben mehrere alte Zettel. „Sonderangebot.“ „Ausverkauft.“ „Halber Listenpreis.“ …']),
          nar('一番下に、子どもの字で{書|か}いた紙があった。「おじさんのコロッケ、いつも{売れ行き|うれゆき|v:n2_0244}一番！」', ['At the very bottom is a paper in a child’s handwriting: “Your croquettes always sell best, mister!”', 'Ganz unten hängt ein Zettel in Kinderschrift: „Ihre Kroketten verkaufen sich immer am besten!“']),
          l('ex_oomori', 'ここは、肉屋の{田中|たなか}さんの店だった。どんな{種類|しゅるい|v:n3_0120}の{商品|しょうひん|v:n3_0153}でも、{注文|ちゅうもん}すれば{仕入|しい}れてくれた。', ['This was Mr. Tanaka the butcher’s shop. Whatever kind of goods you wanted, he’d order them in.', 'Das hier war der Laden von Herrn Tanaka, dem Metzger. Welche Ware man auch wollte, er hat sie bestellt.']),
          l('ex_oomori', '{商売|しょうばい|v:n3_0151}は、ただ{品|しな|v:n3_0067}を売ることじゃない。{住民|じゅうみん|v:n3_0104}の顔を覚えて、毎日「元気？」と聞くことなんだ。', ['Business isn’t just selling goods. It’s remembering the residents’ faces and asking “How are you?” every day.', 'Handel heißt nicht nur, Waren zu verkaufen. Es heißt, sich die Gesichter der Bewohner zu merken und jeden Tag zu fragen: „Wie geht’s?“']),
        ],
        teach: ['v:n2_1309', 'v:n2_0241', 'v:n2_1234', 'v:n2_0244', 'v:n3_0120', 'v:n3_0153', 'v:n3_0151', 'v:n3_0067', 'v:n3_0104'],
      },
      {
        at: 'ex_oomori',
        goal: ['Bring Mr. Ōmori the news from the arcade', 'Bring Herrn Ōmori die Nachricht aus der Straße'],
        lines: [
          l('ex_oomori', '……{借金|しゃっきん|v:n3_0085}をして店を続けるのは、{常識|じょうしき|v:n3_0138}で考えれば、おかしい。{世間|せけん|v:n3_0289}もそう言うだろう。', ['…Borrowing money to keep the shop going is, by common sense, crazy. That’s what people will say too.', '… Schulden zu machen, um den Laden weiterzuführen, ist nach gesundem Menschenverstand verrückt. Das werden die Leute auch sagen.'], 'worried'),
          ask(
            ['でも、みんな{大森|おおもり}さんの店が好きです', ['But everyone loves your shop, Mr. Ōmori', 'Aber alle lieben Ihren Laden, Herr Ōmori'], [
              l('ex_oomori', '……そうか。{下町|したまち|v:n2_0776}の八百屋なんて、時代{遅|おく}れだと思っていたよ。', ['…Really? I thought a back-street greengrocer was out of date.', '… Wirklich? Ich dachte, ein Gemüseladen in der Altstadt sei aus der Zeit gefallen.'], 'surprised'),
            ]],
            ['お店を手伝います', ['I’ll help in the shop', 'Ich helfe im Laden'], [
              l('ex_oomori', 'ははは、{下町|したまち|v:n2_0776}の八百屋の手伝いか。給料は、大根一本だぞ。', ['Ha ha, helping at a back-street greengrocer? The pay is one daikon.', 'Haha, Hilfe in einem Gemüseladen der Altstadt? Der Lohn ist ein Rettich.'], 'happy'),
            ]],
          ),
          l('ex_oomori', '{実は|じつは}、パン屋の{美咲|みさき}ちゃんが、「店の前で一緒に朝市をやろう」と言ってくれてね。{さらに||v:sarani}花屋の{悠真|ゆうま}くんも{参加|さんか|v:n3_0012}するって。', ['Actually, Misaki from the bakery said, “Let’s hold a morning market in front of the shops together.” And Yūma from the flower shop is joining too.', 'Eigentlich hat Misaki von der Bäckerei gesagt: „Lass uns zusammen vor den Läden einen Morgenmarkt machen.“ Und Yūma vom Blumenladen macht auch mit.'], 'happy'),
          l('ex_oomori', '一人じゃ{無理|むり}でも、三人なら{実現|じつげん|v:n3_0053}できるかもしれない。……ありがとう、君が話を聞いてくれたおかげだ。', ['Alone it’s impossible, but three of us might make it happen. …Thank you. It’s because you listened to me.', 'Allein ist es unmöglich, aber zu dritt schaffen wir es vielleicht. … Danke. Weil du mir zugehört hast.'], 'happy'),
        ],
        teach: ['v:n3_0085', 'v:n3_0138', 'v:n3_0289', 'v:n2_0776', 'v:sarani', 'v:n3_0012', 'v:n3_0053'],
      },
    ],
  },
  // ------------------------------------------------------------------ Yūma: the boy who talks to flowers
  {
    id: 'ep_ex_yuuma',
    chapter: 1,
    after: 'mq2',
    who: 'ex_yuuma',
    title: ['花にだけ話せる', 'Only to Flowers', 'Nur mit Blumen'],
    summary: [
      'Yūma the young florist stutters and would rather talk to his flowers than to people. Then a customer needs his words.',
      'Yūma, der junge Florist, stottert und spricht lieber mit seinen Blumen als mit Menschen. Dann braucht eine Kundin seine Worte.',
    ],
    scenes: [
      {
        at: 'ex_yuuma',
        goal: ['Speak to Yūma at the flower shop', 'Sprich mit Yūma am Blumenladen'],
        lines: [
          l('ex_yuuma', 'す、すみません……ぼく、人と{しゃべる||v:n3_0086}のが、に、苦手で。', ['S-sorry… I’m b-bad at talking to people.', 'E-entschuldigung … ich bin s-schlecht darin, mit Leuten zu reden.'], 'worried'),
          l('ex_yuuma', '{神経|しんけい|v:n3_0184}が{細|ほそ}い{性格|せいかく|v:n3_0259}なんです。人に{じろじろ||v:jirojiro}見られると、言葉が出なくなる。', ['I’m a nervous type. When people stare at me, the words won’t come.', 'Ich bin ein nervöser Typ. Wenn mich Leute anstarren, kommen die Worte nicht heraus.'], 'worried'),
          l('ex_yuuma', 'でも、{植物|しょくぶつ|v:n3_0164}には{少しも|すこしも|v:n3_0226}緊張しないんです。花は、ぼくの話を{笑|わら}わないから。', ['But I’m not the least bit nervous with plants. Flowers don’t laugh at what I say.', 'Aber bei Pflanzen bin ich kein bisschen nervös. Blumen lachen nicht über das, was ich sage.']),
          l('ex_yuuma', '学校では、みんなが{ひそひそ||v:hisohiso}話して、ぼくを{ちらちら||v:chirachira}見ていました。……だから、花屋になったのかも。', ['At school everyone whispered and kept glancing at me. …Maybe that’s why I became a florist.', 'In der Schule haben alle getuschelt und mir immer wieder Blicke zugeworfen. … Vielleicht bin ich deshalb Florist geworden.']),
        ],
        teach: ['v:n3_0086', 'v:n3_0184', 'v:n3_0259', 'v:jirojiro', 'v:n3_0164', 'v:n3_0226', 'v:hisohiso', 'v:chirachira'],
      },
      {
        at: 'exh_flowers',
        goal: ['Watch the flower shop', 'Beobachte den Blumenladen'],
        lines: [
          nar('黒い服のおばあさんが、店の前で{じっと||v:n3_0058}花を見ている。{冷|つめ}たい雨に、{湿った|しめった|v:n3_0082}{肩|かた}が{震|ふる}えている。', ['An old lady in black stands motionless in front of the shop, gazing at the flowers. Her damp shoulders shiver in the cold rain.', 'Eine alte Dame in Schwarz steht reglos vor dem Laden und betrachtet die Blumen. Ihre feuchten Schultern zittern im kalten Regen.']),
          nar('「夫が{亡|な}くなったの。好きだった花を……でも、名前が思い出せないのよ」', ['“My husband passed away. The flower he loved… but I can’t remember its name.”', '„Mein Mann ist gestorben. Die Blume, die er liebte … aber mir fällt ihr Name nicht ein.“']),
          l('ex_yuuma', 'ど、どんな花でしたか。い、色は……{形|かたち}は……。', ['W-what kind of flower was it? The c-colour… the shape…', 'W-was für eine Blume war es? Die F-Farbe … die Form …']),
          nar('「青くて、小さくて……{霜|しも|v:n3_0084}が{降|お}りる{頃|ころ}に{咲|さ}くの。夫はいつも、『空が{澄んで|すんで|v:n3_0246}いる色だ』と」', ['“Blue and small… it blooms when the frost comes. My husband always said, ‘It’s the colour of a clear sky.’”', '„Blau und klein … sie blüht, wenn der Frost kommt. Mein Mann sagte immer: ‚Das ist die Farbe eines klaren Himmels.‘“']),
          l('ex_yuuma', 'そ、それは、リンドウです。……{花言葉|はなことば}は、「あなたの{悲しみ|かなしみ}に{寄り添う|よりそう}」。', ['Th-that’s a gentian. …In the language of flowers it means “I stand beside you in your sorrow.”', 'D-das ist ein Enzian. … In der Blumensprache heißt er: „Ich stehe dir in deinem Kummer bei.“']),
          nar('その{瞬間|しゅんかん|v:n3_0122}、おばあさんの目から{涙|なみだ}がこぼれた。「……そうよ、それだわ」', ['In that instant, tears spill from the old lady’s eyes. “…Yes. That’s the one.”', 'In diesem Augenblick laufen der alten Dame Tränen aus den Augen. „… Ja. Genau die.“']),
        ],
        teach: ['v:n3_0058', 'v:n3_0082', 'v:n3_0084', 'v:n3_0246', 'v:n3_0122'],
      },
      {
        at: 'ex_yuuma',
        goal: ['See how Yūma is after the customer left', 'Sieh nach, wie es Yūma nach der Kundin geht'],
        lines: [
          l('ex_yuuma', 'ぼく、今日、初めて人の前で……{最後|さいご}までちゃんと話せました。', ['Today, for the first time, I… spoke properly to someone all the way to the end.', 'Heute habe ich zum ersten Mal … mit jemandem richtig bis zum Ende gesprochen.'], 'surprised'),
          l('ex_yuuma', '花は、言葉の代わりに気持ちを{示す|しめす|v:n3_0080}ものです。赤いバラは{愛情|あいじょう|v:n3_0297}の{印|しるし|v:n3_0181}。白いユリは、{知らせ|しらせ|v:n3_0178}を待つ心。', ['Flowers show feelings instead of words. A red rose is a sign of love. A white lily is a heart waiting for news.', 'Blumen zeigen Gefühle statt Worte. Eine rote Rose ist ein Zeichen der Liebe. Eine weiße Lilie ist ein Herz, das auf Nachricht wartet.']),
          l('ex_yuuma', '……あの、これ、あなたに。{冗談|じょうだん|v:n3_0145}じゃないですよ。「ありがとう」っていう花です。', ['…Um, this is for you. I’m not joking. It’s a flower that means “thank you”.', '… Äh, die ist für dich. Kein Witz. Es ist eine Blume, die „danke“ bedeutet.'], 'happy'),
          l('ex_yuuma', '{鋭い|するどい|v:n3_0250}言葉より、{すてき||v:n3_0237}な花一本のほうが、届くこともあるんですね。……でも、次は、言葉でも言ってみます。', ['Sometimes one lovely flower reaches further than sharp words. …But next time, I’ll try saying it in words too.', 'Manchmal kommt eine schöne Blume weiter als scharfe Worte. … Aber nächstes Mal versuche ich es auch mit Worten.'], 'happy'),
        ],
        teach: ['v:n3_0080', 'v:n3_0297', 'v:n3_0181', 'v:n3_0178', 'v:n3_0145', 'v:n3_0250', 'v:n3_0237'],
      },
    ],
  },
  // ------------------------------------------------------------------ Chihiro: ten years of night shifts
  {
    id: 'ep_ex_chihiro',
    chapter: 1,
    after: 'mq3',
    who: 'ex_chihiro',
    title: ['夜明けの看護師', 'The Nurse at Dawn', 'Die Krankenschwester im Morgengrauen'],
    summary: [
      'Chihiro has worked night shifts for ten years. She looks after strangers all night — and has only ever seen her daughter asleep.',
      'Chihiro arbeitet seit zehn Jahren Nachtschicht. Die ganze Nacht kümmert sie sich um Fremde — und ihre Tochter sieht sie nur schlafend.',
    ],
    scenes: [
      {
        at: 'ex_chihiro',
        goal: ['Visit the city hospital at night', 'Besuche nachts das Stadtkrankenhaus'],
        evening: true,
        lines: [
          nar('{夜間|やかん|v:n2_1791}の{待合室|まちあいしつ|v:n2_1678}。{咳|せき|v:n3_0285}をする子どもを、母親が{しっかり||v:shikkari}抱いている。', ['The night waiting room. A mother holds her coughing child tight.', 'Das nächtliche Wartezimmer. Eine Mutter hält ihr hustendes Kind fest im Arm.']),
          l('ex_chihiro', '大丈夫よ。先生の{診察|しんさつ|v:n3_0190}は、もうすぐだからね。{酸素|さんそ|v:n3_0016}の{数字|すうじ}も、ちゃんと出てるわ。', ['It’s all right. The doctor will see you soon. The oxygen numbers look fine.', 'Keine Sorge. Der Arzt untersucht euch gleich. Die Sauerstoffwerte sind gut.']),
          l('ex_chihiro', 'さっき、{心臓|しんぞう|v:n3_0196}の{手術|しゅじゅつ|v:n3_0109}を受けたおじいさんも、今は{状態|じょうたい|v:n3_0143}が落ち着いたの。', ['The old man who had heart surgery earlier is stable now, too.', 'Der alte Mann, der vorhin am Herzen operiert wurde, ist jetzt auch stabil.']),
          l('ex_chihiro', '夜の病院はね、{重大|じゅうだい|v:n3_0099}なことが、急に起こるの。だから、だれかが起きていなきゃいけない。', ['At night in a hospital, serious things happen suddenly. So someone has to stay awake.', 'Nachts passieren im Krankenhaus plötzlich ernste Dinge. Deshalb muss jemand wach bleiben.']),
        ],
        teach: ['v:n2_1791', 'v:n2_1678', 'v:n3_0285', 'v:shikkari', 'v:n3_0190', 'v:n3_0016', 'v:n3_0196', 'v:n3_0109', 'v:n3_0143', 'v:n3_0099'],
      },
      {
        at: 'ex_chihiro',
        goal: ['Talk to Chihiro after her shift', 'Sprich nach ihrer Schicht mit Chihiro'],
        lines: [
          l('ex_chihiro', 'ふう……夜が{更けて|ふけて|v:n2_1556}から、朝まで{ずっと||v:n3_0235}走り回ってたわ。もう、{くたびれた||v:n2_0536}。', ['Phew… from late at night until morning I’ve been running around nonstop. I’m worn out.', 'Puh … von spät in der Nacht bis zum Morgen bin ich nur herumgerannt. Ich bin völlig erledigt.']),
          l('ex_chihiro', '家に帰ると、娘はもう学校。夜、わたしが出かける時は、もう{寝間着|ねまき|v:n2_1390}で{ぐっすり||v:gussuri}寝てる。', ['When I get home, my daughter has already left for school. When I leave at night, she’s already fast asleep in her pyjamas.', 'Wenn ich heimkomme, ist meine Tochter schon in der Schule. Wenn ich abends gehe, schläft sie schon tief im Schlafanzug.'], 'worried'),
          l('ex_chihiro', '十年も、こんな{生活|せいかつ}を{過ごして|すごして|v:n3_0227}きた。娘の起きている顔、{徐々に|じょじょに|v:n3_0172}忘れていく気がするの。', ['I’ve lived like this for ten years. I feel I’m slowly forgetting what my daughter looks like awake.', 'Zehn Jahre lebe ich schon so. Ich habe das Gefühl, dass ich langsam vergesse, wie meine Tochter wach aussieht.'], 'worried'),
          l('ex_chihiro', '{身体|しんたい|v:n3_0197}も、もう若くない。……でも、だれかがやらなきゃ。',  ['My body isn’t young any more either. …But someone has to do it.', 'Mein Körper ist auch nicht mehr jung. … Aber irgendjemand muss es ja machen.']),
        ],
        teach: ['v:n2_1556', 'v:n3_0235', 'v:n2_0536', 'v:n2_1390', 'v:gussuri', 'v:n3_0227', 'v:n3_0172', 'v:n3_0197'],
      },
      {
        at: 'ex_chihiro',
        goal: ['Give Chihiro the note her daughter left', 'Gib Chihiro den Zettel, den ihre Tochter hinterlassen hat'],
        music: 'memory',
        lines: [
          nar('{起床|きしょう|v:n2_0486}の時間の前に、小さな女の子が病院の前まで来ていた。手に、四つに{畳んだ|たたんだ|v:n2_1119}紙を持っている。', ['Before getting-up time, a little girl came all the way to the hospital. In her hand is a paper folded in four.', 'Noch vor dem Aufstehen ist ein kleines Mädchen bis zum Krankenhaus gekommen. In der Hand hält sie ein vierfach gefaltetes Papier.']),
          nar('「ママ、いつも{昼寝|ひるね|v:n2_1533}ばっかりでずるいって思ってた。でも、夜に人を助けてたんだね。{包帯|ほうたい|v:n2_1636}の{巻|ま}き{方|かた}、わたしも{習|なら}いたい」', ['“Mom, I thought it wasn’t fair that you always nap. But you were helping people at night. I want to learn how to wrap bandages too.”', '„Mama, ich fand es gemein, dass du immer nur Mittagsschlaf machst. Aber du hast nachts Menschen geholfen. Ich will auch lernen, wie man Verbände anlegt.“']),
          l('ex_chihiro', '……{うとうと||v:utouto}してる間に、こんなに大きくなってたのね。', ['…While I was dozing, she grew up this much.', '… Während ich vor mich hin gedöst habe, ist sie so groß geworden.'], 'surprised'),
          l('ex_chihiro', '来月から、週に二日だけ、日勤にしてもらうわ。{深刻|しんこく|v:n3_0189}に考えすぎてた。一緒に朝ごはんを食べる日も、必要よね。', ['From next month I’ll ask to work day shifts just two days a week. I was taking it all too seriously. We need days when we eat breakfast together, too.', 'Ab nächstem Monat frage ich nach zwei Tagschichten pro Woche. Ich habe alles zu ernst genommen. Wir brauchen auch Tage, an denen wir zusammen frühstücken.'], 'happy'),
        ],
        teach: ['v:n2_0486', 'v:n2_1119', 'v:n2_1533', 'v:n2_1636', 'v:utouto', 'v:n3_0189'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ren: letters to a classroom
  {
    id: 'ep_ex_ren',
    chapter: 1,
    after: 'mq3',
    who: 'ex_ren',
    title: ['教室への手紙', 'Letters to a Classroom', 'Briefe an ein Klassenzimmer'],
    summary: [
      'Ren has been in hospital for a year. He writes letters to his class every week — and has never had an answer.',
      'Ren liegt seit einem Jahr im Krankenhaus. Jede Woche schreibt er Briefe an seine Klasse — und hat nie eine Antwort bekommen.',
    ],
    scenes: [
      {
        at: 'ex_ren',
        goal: ['Ask Ren about his letter', 'Frag Ren nach seinem Brief'],
        lines: [
          l('ex_ren', 'ぼくね、学校の{プリント||v:n2_1587}、全部やってるんだ。算数は{満点|まんてん|v:n2_1698}だったよ！', ['You know, I do all the school worksheets. I got full marks in maths!', 'Weißt du, ich mache alle Arbeitsblätter der Schule. In Mathe hatte ich volle Punktzahl!'], 'happy'),
          l('ex_ren', '大きい{数|かず|v:n3_0215}の{数字|すうじ|v:n3_0216}も読めるようになった。いち、じゅう、ひゃく、せん、まん！', ['I can read the digits of big numbers now too. One, ten, hundred, thousand, ten thousand!', 'Ich kann jetzt auch die Ziffern großer Zahlen lesen. Eins, zehn, hundert, tausend, zehntausend!'], 'happy'),
          l('ex_ren', 'でも、クラスに手紙を書いても、返事が来ないんだ。……みんな、ぼくのこと、忘れちゃったのかな。', ['But even when I write to my class, no answer comes. …Maybe everyone has forgotten me.', 'Aber auch wenn ich meiner Klasse schreibe, kommt keine Antwort. … Vielleicht haben mich alle vergessen.'], 'worried'),
          l('ex_ren', 'いちばんの{親友|しんゆう|v:n3_0203}の{翔|しょう}くんにも、毎週書いてる。手紙の{題名|だいめい|v:n2_1103}は、いつも「ぼくは元気です」。', ['I write every week to my best friend Shō too. The title of the letter is always “I’m fine.”', 'Ich schreibe auch jede Woche meinem besten Freund Shō. Der Titel des Briefs ist immer „Mir geht es gut.“']),
        ],
        teach: ['v:n2_1587', 'v:n2_1698', 'v:n3_0215', 'v:n3_0216', 'v:n3_0203', 'v:n2_1103'],
      },
      {
        at: 'exh_school',
        goal: ['Ask at the primary school about Ren’s letters', 'Frag in der Grundschule nach Rens Briefen'],
        lines: [
          nar('職員室の机の上に、手紙の{塊|かたまり}が{重ねて|かさねて|v:n2_0387}あった。全部、{蓮|れん}くんからだ。', ['On a desk in the staff room lies a pile of letters stacked on top of each other. All of them from Ren.', 'Auf einem Tisch im Lehrerzimmer liegt ein Stapel Briefe übereinander. Alle von Ren.']),
          nar('「先生が、新しい{担任|たんにん}に{渡す|わたす}のを忘れていたんです。……{実際|じっさい|v:n3_0055}、だれも読んでいなかった」', ['“The teacher forgot to pass them on to the new class teacher. …In fact, nobody had read them.”', '„Der Lehrer hat vergessen, sie an die neue Klassenlehrerin weiterzugeben. … Tatsächlich hat sie niemand gelesen.“']),
          l('ex_takahashi', 'ひどい……！すぐにクラスで読みます。{五十音|ごじゅうおん|v:n2_0661}を{習|なら}ったばかりの子たちが、返事を書けるように。', ['That’s awful…! I’ll read them to the class right away — so that the children who just learned the kana chart can write back.', 'Wie schlimm …! Ich lese sie sofort in der Klasse vor — damit die Kinder, die gerade die Kana-Tabelle gelernt haben, zurückschreiben können.'], 'surprised'),
          nar('子どもたちは{わくわく||v:wakuwaku}しながら、{屋外|おくがい|v:n2_0289}の{広場|ひろば|v:n2_1536}で、大きな紙に{寄せ書き|よせがき}を書いた。', ['Full of excitement, the children wrote a group message on a big sheet of paper out on the open square.', 'Voller Aufregung schrieben die Kinder draußen auf dem Platz eine gemeinsame Nachricht auf ein großes Blatt Papier.']),
        ],
        teach: ['v:n2_0387', 'v:n3_0055', 'v:n2_0661', 'v:wakuwaku', 'v:n2_0289', 'v:n2_1536'],
      },
      {
        at: 'ex_ren',
        goal: ['Bring Ren the answer from his class', 'Bring Ren die Antwort seiner Klasse'],
        music: 'memory',
        lines: [
          l('ex_ren', 'え……これ、ぼくに？{びっくり||v:bikkuri}した……！', ['Huh… this is for me? I’m so surprised…!', 'Hä … das ist für mich? Ich bin total überrascht …!'], 'surprised'),
          nar('「れんくん　はやく　げんきになってね」「せきは　まどのよこに　とってあるよ」「しょうより」', ['“Ren, get well soon.” “Your seat by the window is saved for you.” “From Shō.”', '„Ren, werd schnell gesund.“ „Dein Platz am Fenster ist für dich frei.“ „Von Shō.“']),
          l('ex_ren', 'ずっと{がっかり||v:gakkari}してたけど……ちゃんと、ぼくの席、あったんだ。', ['I was disappointed all this time… but my seat really was still there.', 'Ich war die ganze Zeit enttäuscht … aber mein Platz war wirklich noch da.'], 'happy'),
          l('ex_ren', '病気っていう{障害|しょうがい|v:n3_0130}があっても、学校に戻るのが目標。先生が言った{条件|じょうけん|v:n3_0135}は、毎日ちゃんと薬を飲むこと。……{万歳|ばんざい|v:n2_1468}！がんばるぞ！', ['Even with an illness in my way, my goal is to go back to school. The condition the doctor set is to take my medicine properly every day. …Banzai! I’ll do my best!', 'Auch wenn die Krankheit mir im Weg steht, ist mein Ziel, wieder zur Schule zu gehen. Die Bedingung des Arztes ist, jeden Tag ordentlich meine Medizin zu nehmen. … Banzai! Ich gebe mein Bestes!'], 'happy'),
        ],
        teach: ['v:bikkuri', 'v:gakkari', 'v:n3_0130', 'v:n3_0135', 'v:n2_1468'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ms. Takahashi: a class that will not listen
  {
    id: 'ep_ex_takahashi',
    chapter: 1,
    after: 'mq4',
    who: 'ex_takahashi',
    title: ['聞いてくれない教室', 'The Class That Won’t Listen', 'Die Klasse, die nicht zuhört'],
    summary: [
      'Ms. Takahashi’s first class is chaos, and one girl has stopped coming altogether. She thinks she is not meant to be a teacher.',
      'Frau Takahashis erste Klasse ist ein einziges Chaos, und ein Mädchen kommt gar nicht mehr. Sie glaubt, sie sei nicht zur Lehrerin geboren.',
    ],
    scenes: [
      {
        at: 'exh_school',
        goal: ['Look into the first-year classroom', 'Schau in das Klassenzimmer der ersten Klasse'],
        lines: [
          nar('教室は大{騒ぎ|さわぎ|v:n3_0011}だった。子どもたちは{ばらばら||v:barabara}に走り回り、机の上は{めちゃくちゃ||v:mechakucha}だ。', ['The classroom is in uproar. The children run around all over the place, and the desks are a complete mess.', 'Im Klassenzimmer herrscht Aufruhr. Die Kinder rennen kreuz und quer herum, und die Tische sind ein einziges Chaos.']),
          l('ex_takahashi', 'み、みなさん！{順番|じゅんばん|v:n3_0124}に並んでください！名前の{順|じゅん|v:n3_0121}ですよ！', ['E-everyone! Line up in turn, please! In order of your names!', 'A-alle mal! Stellt euch bitte der Reihe nach auf! In der Reihenfolge eurer Namen!'], 'worried'),
          l('ex_takahashi', '{作法|さほう|v:n3_0000}を教えるのも、仕事なのに……。{集団|しゅうだん|v:n3_0101}になると、だれもわたしの声を聞かないんです。', ['Teaching manners is part of my job too… but in a group, nobody hears my voice.', 'Ihnen Manieren beizubringen gehört auch zu meinem Job … aber in der Gruppe hört niemand meine Stimme.'], 'worried'),
          l('ex_takahashi', '{いちいち||v:n2_0188}注意しても、{各々|おのおの|v:n2_0311}が{様々|さまざま|v:n3_0001}なことを{一斉|いっせい|v:n2_0194}に言い出して……。', ['Even if I tell them off one by one, they each start saying all sorts of things at once…', 'Auch wenn ich jeden einzeln ermahne, fangen alle gleichzeitig an, die verschiedensten Dinge zu sagen …']),
        ],
        teach: ['v:n3_0011', 'v:barabara', 'v:mechakucha', 'v:n3_0124', 'v:n3_0121', 'v:n3_0000', 'v:n3_0101', 'v:n2_0188', 'v:n2_0311', 'v:n3_0001', 'v:n2_0194'],
      },
      {
        at: 'ex_takahashi',
        goal: ['Talk to Ms. Takahashi after school', 'Sprich nach der Schule mit Frau Takahashi'],
        lines: [
          l('ex_takahashi', '{美月|みづき}ちゃんという子が、もう二週間、学校に来ないんです。わたしのせいかもしれません。', ['A girl called Mizuki hasn’t come to school for two weeks now. It may be my fault.', 'Ein Mädchen namens Mizuki ist schon seit zwei Wochen nicht mehr zur Schule gekommen. Vielleicht ist es meine Schuld.'], 'worried'),
          l('ex_takahashi', '先輩の先生の授業を{参考|さんこう|v:n3_0013}にしても、同じ{手段|しゅだん|v:n3_0111}を{実行|じっこう|v:n3_0054}しても、うまくいかない。', ['Even when I take the senior teachers’ lessons as a model and use the same methods, it doesn’t work.', 'Auch wenn ich mich an den Stunden der erfahrenen Lehrer orientiere und dieselben Methoden anwende, klappt es nicht.']),
          l('ex_takahashi', '{性質|せいしつ|v:n2_0992}の{違う|ちがう}子どもが三十人。みんな、別の{刺激|しげき|v:n3_0031}がほしいんです。', ['Thirty children, each with a different nature. Each one wants something different to spark them.', 'Dreißig Kinder, jedes mit einem anderen Wesen. Jedes braucht einen anderen Anreiz.']),
          ask(
            ['美月ちゃんに会いに行ってみませんか', ['Why not go and see Mizuki?', 'Warum besuchen Sie Mizuki nicht?'], [
              l('ex_takahashi', '……会いに行く。そうですね。教室で待っているだけじゃ、だめですね。', ['…Go and see her. You’re right. Just waiting in the classroom won’t do.', '… Sie besuchen. Sie haben recht. Nur im Klassenzimmer zu warten reicht nicht.']),
            ]],
            ['先生に向いていますよ', ['You are made for teaching', 'Sie sind wie gemacht für den Beruf'], [
              l('ex_takahashi', 'そう言ってもらえると……。まずは美月ちゃんに会いに行ってみます。', ['Hearing you say that… First I’ll go and see Mizuki.', 'Wenn Sie das sagen … Zuerst besuche ich Mizuki.'], 'happy'),
            ]],
          ),
        ],
        teach: ['v:n3_0013', 'v:n3_0111', 'v:n3_0054', 'v:n2_0992', 'v:n3_0031'],
      },
      {
        at: 'exh_school',
        goal: ['See what happened in the classroom', 'Sieh nach, was im Klassenzimmer passiert ist'],
        lines: [
          nar('朝の教室。先生の横に、小さな女の子が立っている。美月ちゃんだ。', ['The classroom in the morning. Next to the teacher stands a little girl. It is Mizuki.', 'Das Klassenzimmer am Morgen. Neben der Lehrerin steht ein kleines Mädchen. Es ist Mizuki.']),
          l('ex_takahashi', '美月ちゃんは、大きな声が{怖|こわ}かったんです。だから、今日から「{小|ちい}さい声の時間」を作ります。{賛成|さんせい|v:n3_0014}の人？', ['Mizuki was scared of loud voices. So from today we’ll have a “quiet voice time”. Who agrees?', 'Mizuki hatte Angst vor lauten Stimmen. Deshalb gibt es ab heute eine „Leise-Stimmen-Zeit“. Wer ist dafür?'], 'happy'),
          nar('子どもたちが、{てきぱき||v:tekipaki}と手を上げた。だれも{主張|しゅちょう|v:n3_0112}しない。みんな、小さい声で「はーい」。', ['The children raise their hands briskly. Nobody insists on anything. Everyone says a small “yes”.', 'Die Kinder heben flink die Hände. Niemand besteht auf irgendetwas. Alle sagen leise „Jaa“.']),
          l('ex_takahashi', '{上達|じょうたつ|v:n3_0144}するのは、子どもだけじゃないですね。教師の{精神|せいしん|v:n3_0269}も、少しずつ{育|そだ}つんだと思います。', ['It isn’t only the children who improve. I think a teacher’s spirit grows little by little too.', 'Es sind nicht nur die Kinder, die Fortschritte machen. Ich glaube, auch der Geist einer Lehrerin wächst nach und nach.'], 'happy'),
        ],
        teach: ['v:n3_0014', 'v:tekipaki', 'v:n3_0112', 'v:n3_0144', 'v:n3_0269'],
      },
    ],
  },
  // ------------------------------------------------------------------ Mr. Murai: the letters nobody answers
  {
    id: 'ep_ex_murai',
    chapter: 1,
    after: 'mq3',
    who: 'ex_murai',
    title: ['宛先のない手紙', 'The Letter Without an Address', 'Der Brief ohne Adresse'],
    summary: [
      'For thirty years Mr. Murai has delivered letters. One has been waiting at the post office for months: the addressee has vanished.',
      'Seit dreißig Jahren trägt Herr Murai Briefe aus. Einer wartet seit Monaten in der Post: Der Empfänger ist verschwunden.',
    ],
    scenes: [
      {
        at: 'exh_post',
        goal: ['Ask at the post office', 'Frag in der Post nach'],
        lines: [
          l('ex_murai', 'この手紙、もう半年も{預かって|あずかって|v:azukeru}いるんです。{宛先|あてさき}の{住宅|じゅうたく|v:n3_0100}は、もう{空っぽ|からっぽ|v:n2_0443}でね。', ['I’ve been holding this letter for half a year. The house it’s addressed to is empty now.', 'Diesen Brief verwahre ich schon seit einem halben Jahr. Das Haus, an das er adressiert ist, steht jetzt leer.'], 'worried'),
          l('ex_murai', '{管理人|かんりにん|v:kanrinin}さんに聞いたら、{引っ越し|ひっこし|v:hikkoshi}の{届|とど}けも出ていない。{行方|ゆくえ|v:n2_1819}が分からないんです。', ['I asked the caretaker: no notice of a move was ever filed. Nobody knows where she went.', 'Ich habe den Hausverwalter gefragt: Ein Umzug wurde nie gemeldet. Niemand weiß, wo sie hin ist.']),
          l('ex_murai', '{差出人|さしだしにん}は、九十歳の男性。{正式|せいしき|v:n3_0267}な{書類|しょるい|v:n3_0177}じゃない。ただの、{妹|いもうと}への手紙です。', ['The sender is a man of ninety. It’s not an official document. Just a letter to his younger sister.', 'Der Absender ist ein neunzigjähriger Mann. Es ist kein offizielles Dokument. Nur ein Brief an seine jüngere Schwester.']),
          l('ex_murai', '{規則|きそく}では、もう返さなきゃいけない。でも……{謎|なぞ|v:nazo}のまま返すのは、{何とも|なんとも|v:n2_1363}言えない気持ちでね。', ['By the rules I should send it back by now. But… sending it back still a mystery leaves me with an indescribable feeling.', 'Laut Vorschrift muss ich ihn eigentlich zurückschicken. Aber … ihn als Rätsel zurückzuschicken, gibt mir ein unbeschreibliches Gefühl.']),
        ],
        teach: ['v:azukeru', 'v:n3_0100', 'v:n2_0443', 'v:kanrinin', 'v:hikkoshi', 'v:n2_1819', 'v:n3_0267', 'v:n3_0177', 'v:nazo', 'v:n2_1363'],
      },
      {
        at: 'ex_murai',
        goal: ['Look for a clue with Mr. Murai', 'Such mit Herrn Murai nach einem Hinweis'],
        lines: [
          l('ex_murai', '{手がかり|てがかり|v:tegakari}は、この古い写真だけ。{和服|わふく|v:n2_1900}の女の人と、大きな{別荘|べっそう|v:n2_1618}。', ['The only clue is this old photo. A woman in a kimono and a big villa.', 'Der einzige Hinweis ist dieses alte Foto. Eine Frau im Kimono und eine große Villa.']),
          l('ex_murai', 'この{付近|ふきん|v:n2_1547}の{住居|じゅうきょ|v:n2_0830}を、{所々|ところどころ|v:n2_1314}回って聞いてみたんですが……。', ['I went round some of the homes in this neighbourhood, here and there, and asked…', 'Ich bin hier und da bei den Wohnungen in der Nachbarschaft vorbeigegangen und habe gefragt …']),
          nar('写真の{裏|うら}に、{小|ちい}さな字があった。「{自宅|じたく|v:n2_0775}の{庭|にわ}で。{余所|よそ|v:n2_1847}に住んでも、ここが家」。', ['On the back of the photo is small writing: “In the garden at home. Even if I live elsewhere, this is home.”', 'Auf der Rückseite des Fotos steht etwas in kleiner Schrift: „Im Garten zu Hause. Auch wenn ich woanders wohne, ist hier mein Zuhause.“']),
          l('ex_murai', 'この庭……老人ホームの「さくら{荘|そう}」の庭と同じだ！もしかして、そこに……。', ['This garden… it’s the same as the garden of the Sakura-sō care home! Maybe she’s there…', 'Dieser Garten … er ist derselbe wie der Garten des Altenheims Sakura-sō! Vielleicht ist sie dort …'], 'surprised'),
        ],
        teach: ['v:tegakari', 'v:n2_1900', 'v:n2_1618', 'v:n2_1547', 'v:n2_0830', 'v:n2_1314', 'v:n2_0775', 'v:n2_1847'],
      },
      {
        at: 'ex_murai',
        goal: ['Hear how the letter ended', 'Hör, wie die Geschichte des Briefes ausging'],
        music: 'memory',
        lines: [
          l('ex_murai', '会えましたよ。妹さんは、{家主|やぬし|v:n2_1806}だった家を{失って|うしなって|v:ushinau}、ホームに入っていたんです。', ['I found her. The sister had lost the house she owned and moved into the home.', 'Ich habe sie gefunden. Die Schwester hatte das Haus verloren, das ihr gehörte, und war ins Heim gezogen.'], 'happy'),
          l('ex_murai', '「{恐れ入ります|おそれいります|v:osoreiru}」って、何度も頭を下げて……手紙を読んで、ずっと泣いていました。', ['“I’m so grateful,” she said, bowing again and again… then she read the letter and cried and cried.', '„Ich bin Ihnen so dankbar“, sagte sie und verbeugte sich immer wieder … dann las sie den Brief und weinte lange.']),
          l('ex_murai', '{受取|うけとり|v:n2_0221}のサインは、{震|ふる}える字でした。でもね、あんなにきれいなサイン、見たことがない。', ['Her signature on the receipt was shaky. But you know, I’ve never seen a more beautiful signature.', 'Ihre Unterschrift auf der Empfangsbestätigung war zittrig. Aber weißt du, eine schönere Unterschrift habe ich nie gesehen.'], 'happy'),
          l('ex_murai', '返事の手紙も、{承知|しょうち|v:shouchi}しました。……三十年この仕事をしていて、よかったです。', ['I’ve agreed to take her reply too. …I’m glad I’ve done this job for thirty years.', 'Ihren Antwortbrief nehme ich auch mit. … Ich bin froh, dass ich diese Arbeit dreißig Jahre gemacht habe.'], 'happy'),
        ],
        teach: ['v:n2_1806', 'v:ushinau', 'v:osoreiru', 'v:n2_0221', 'v:shouchi'],
      },
    ],
  },
  // ------------------------------------------------------------------ Shōta: the paper boy before dawn
  {
    id: 'ep_ex_shouta',
    chapter: 1,
    after: 'mq4',
    who: 'ex_shouta',
    title: ['夜明け前の自転車', 'The Bicycle Before Dawn', 'Das Fahrrad vor dem Morgengrauen'],
    summary: [
      'Shōta delivers newspapers before school to save for university. He tells nobody — not even his mother, the baker.',
      'Shōta trägt vor der Schule Zeitungen aus, um für die Uni zu sparen. Er sagt es niemandem — nicht einmal seiner Mutter, der Bäckerin.',
    ],
    scenes: [
      {
        at: 'ex_shouta',
        goal: ['Talk to Shōta, the paper boy', 'Sprich mit Shōta, dem Zeitungsjungen'],
        lines: [
          l('ex_shouta', '毎朝、二百軒に{新聞|しんぶん}を配ってるんす。{正午|しょうご|v:n3_0136}には、もう{眠|ねむ}くて{眠|ねむ}くて。', ['Every morning I deliver newspapers to two hundred houses. By noon I’m dead tired.', 'Jeden Morgen trage ich Zeitungen an zweihundert Häuser aus. Mittags bin ich todmüde.']),
          l('ex_shouta', '大学に行きたいんすよ。{奨学金|しょうがくきん|v:n3_0131}もあるけど、{制度|せいど|v:n3_0277}が{複雑|ふくざつ}で、{支給|しきゅう|v:n3_0028}は四月から。', ['I want to go to university. There are scholarships, but the system is complicated and they only pay from April.', 'Ich will an die Uni. Es gibt Stipendien, aber das System ist kompliziert, und ausgezahlt wird erst ab April.']),
          l('ex_shouta', 'だから、今の{時期|じき|v:n3_0027}に{蓄えて|たくわえて|v:n2_1115}おかないと。{贅沢|ぜいたく|v:n3_0274}なんて、ぜんぜんしてないっす。', ['So I have to save up now, at this time. I’m not spending on any luxuries at all.', 'Deshalb muss ich jetzt sparen. Luxus gönne ich mir überhaupt nicht.']),
          l('ex_shouta', '……母ちゃんには{内緒|ないしょ}っすよ。パン屋が{精々|せいぜい|v:n3_0271}なのに、心配かけたくないんで。', ['…Keep it secret from my mum. The bakery is barely getting by as it is; I don’t want to worry her.', '… Sag es nicht meiner Mutter. Die Bäckerei kommt gerade so über die Runden; ich will ihr keine Sorgen machen.']),
        ],
        teach: ['v:n3_0136', 'v:n3_0131', 'v:n3_0277', 'v:n3_0028', 'v:n3_0027', 'v:n2_1115', 'v:n3_0274', 'v:n3_0271'],
      },
      {
        at: 'ex_shouta',
        goal: ['Find Shōta on his early round', 'Finde Shōta auf seiner frühen Runde'],
        lines: [
          nar('まだ暗い道。自転車のライトが、{霜|しも}のない道を{照|て}らしている。{渋滞|じゅうたい|v:n3_0098}もない、静かな町。', ['A road still dark. The bicycle light shines on the street. No traffic jams — a quiet town.', 'Eine noch dunkle Straße. Das Fahrradlicht beleuchtet die Fahrbahn. Kein Stau — eine stille Stadt.']),
          l('ex_shouta', '昨日、角で車と{衝突|しょうとつ|v:n3_0147}しそうになって……。{青年|せいねん|v:n3_0278}なんだから、気をつけろって{叱|しか}られたっす。', ['Yesterday I nearly collided with a car at the corner… I got told off: “You’re a young man, be careful.”', 'Gestern wäre ich an der Ecke fast mit einem Auto zusammengestoßen … Ich wurde ausgeschimpft: „Du bist ein junger Mann, pass auf.“']),
          l('ex_shouta', '新聞って、{政府|せいふ|v:n3_0281}のこととか、{税金|ぜいきん|v:n3_0263}のこととか、いろんな{情報|じょうほう|v:n3_0156}が{載|の}ってるんすね。配りながら、ちょっと読んでるんす。', ['Newspapers carry all kinds of information — about the government, about taxes. I read a bit while I deliver.', 'In Zeitungen stehen alle möglichen Informationen — über die Regierung, über Steuern. Beim Austragen lese ich ein bisschen.']),
          l('ex_shouta', '{首都|しゅと|v:n3_0116}の大学に{上京|じょうきょう|v:n3_0133}して、記者になりたいっす。……{就職|しゅうしょく|v:n3_0094}できるかは、分かんないけど。', ['I want to go up to a university in the capital and become a journalist. …Whether I’ll get a job, I don’t know.', 'Ich will in der Hauptstadt studieren und Journalist werden. … Ob ich eine Stelle kriege, weiß ich nicht.']),
        ],
        teach: ['v:n3_0098', 'v:n3_0147', 'v:n3_0278', 'v:n3_0281', 'v:n3_0263', 'v:n3_0156', 'v:n3_0116', 'v:n3_0133', 'v:n3_0094'],
      },
      {
        at: 'ex_misaki',
        goal: ['Visit the bakery', 'Besuche die Bäckerei'],
        lines: [
          nar('パン屋の{奥|おく}で、{美咲|みさき}さんが小さな{封筒|ふうとう}を見つめている。「{年度|ねんど|v:n2_1394}{末|まつ}の{ボーナス||v:n2_1625}」と書いてある。', ['At the back of the bakery, Misaki is staring at a small envelope. It says: “End-of-year bonus”.', 'Hinten in der Bäckerei starrt Misaki auf einen kleinen Umschlag. Darauf steht: „Bonus zum Jahresende“.']),
          l('ex_misaki', '翔太の部屋で見つけたの。「母ちゃんへ。オレの{職|しょく|v:n3_0160}の、初めてのボーナス」って……。', ['I found it in Shōta’s room. “For Mum. The first bonus from my job,” it says…', 'Ich habe ihn in Shōtas Zimmer gefunden. „Für Mama. Der erste Bonus von meinem Job“, steht darauf …'], 'surprised'),
          l('ex_misaki', 'あの子、自分の学費をためながら……わたしにまで。ばかね。……本当に、ばかなんだから。', ['That boy, saving for his own school fees… and still something for me. Silly boy. …Really, such a silly boy.', 'Der Junge spart für sein eigenes Studium … und dann noch etwas für mich. Dummer Junge. … Wirklich, so ein dummer Junge.'], 'happy'),
        ],
        teach: ['v:n2_1394', 'v:n2_1625', 'v:n3_0160'],
      },
    ],
  },
  // ------------------------------------------------------------------ Chairman Ōno: the festival nobody helps with
  {
    id: 'ep_ex_oono',
    chapter: 1,
    after: 'mq4',
    who: 'ex_oono',
    title: ['夏祭りを守れ', 'Save the Summer Festival', 'Rettet das Sommerfest'],
    summary: [
      'The neighbourhood association wants to cancel the summer festival: no young people will help. Chairman Ōno will not give up so easily.',
      'Der Nachbarschaftsverein will das Sommerfest absagen: Kein junger Mensch hilft mit. Vorsitzender Ōno gibt nicht so leicht auf.',
    ],
    scenes: [
      {
        at: 'ex_oono',
        goal: ['Talk to Chairman Ōno', 'Sprich mit dem Vorsitzenden Ōno'],
        lines: [
          l('ex_oono', '夏祭りは、七月{下旬|げじゅん|v:n2_0572}の{予定|よてい}じゃった。だが、{実施|じっし|v:n3_0056}は{難|むずか}しいと言われてな。', ['The summer festival was planned for late July. But I’ve been told it will be hard to hold.', 'Das Sommerfest war für Ende Juli geplant. Aber man hat mir gesagt, es sei schwer durchzuführen.'], 'worried'),
          l('ex_oono', '{主要|しゅよう|v:n3_0118}な{項目|こうもく|v:n2_0642}は三つ。お金、人、場所。……どれも足りん。', ['There are three main points: money, people, a place. …We’re short of all of them.', 'Es gibt drei Hauptpunkte: Geld, Leute, Ort. … Von allem haben wir zu wenig.']),
          l('ex_oono', '町内会の{資本|しほん|v:n3_0075}は、もうほとんどない。去年の{消費|しょうひ|v:n3_0152}が大きすぎたんじゃ。', ['The association has hardly any funds left. Last year’s spending was too large.', 'Der Verein hat kaum noch Kapital. Die Ausgaben im letzten Jahr waren zu hoch.']),
          l('ex_oono', 'じゃが、わしは{絶対|ぜったい|v:n3_0293}にあきらめん。祭りは、この町の{重要|じゅうよう|v:n3_0105}な{思い出|おもいで}なんじゃ。', ['But I absolutely will not give up. The festival is an important memory of this town.', 'Aber ich gebe auf keinen Fall auf. Das Fest ist eine wichtige Erinnerung dieser Stadt.']),
        ],
        teach: ['v:n2_0572', 'v:n3_0056', 'v:n3_0118', 'v:n2_0642', 'v:n3_0075', 'v:n3_0152', 'v:n3_0293', 'v:n3_0105'],
      },
      {
        at: 'exh_hall',
        goal: ['Go to the meeting at the community hall', 'Geh zur Versammlung im Gemeindehaus'],
        lines: [
          nar('公民館の会議。{形式|けいしき|v:n2_0558}ばかりの話し合いが続く。だれも{積極的|せっきょくてき|v:n3_0291}に手を上げない。', ['The meeting at the community hall. The discussion is all formality. Nobody raises a hand with any enthusiasm.', 'Die Versammlung im Gemeindehaus. Die Besprechung ist reine Formsache. Niemand meldet sich mit Begeisterung.']),
          l('ex_oono', 'わしの{計画|けいかく}を、少し{修正|しゅうせい|v:n3_0096}した。{屋台|やたい}は商店街の店に出してもらう。それなら、お金はかからん。', ['I’ve revised my plan a little. The stalls will be run by the shops of the arcade. That way it costs nothing.', 'Ich habe meinen Plan etwas überarbeitet. Die Stände übernehmen die Läden der Einkaufsstraße. So kostet es nichts.']),
          nar('「でも、{需要|じゅよう|v:n3_0119}はあるんですか」「若い人は来ませんよ」……{反対|はんたい}の声ばかりだ。', ['“But is there any demand?” “Young people won’t come.” …Nothing but voices against it.', '„Aber gibt es überhaupt Nachfrage?“ „Junge Leute kommen doch nicht.“ … Nur Gegenstimmen.']),
          nar('その時、ドアが開いた。新聞配達の{翔太|しょうた}と、{浴衣|ゆかた|v:n2_1818}を{抱えた|かかえた}{高校生|こうこうせい}たちが立っていた。「オレたち、手伝います！」', ['Just then, the door opens. There stands Shōta the paper boy, with high-school students carrying yukata. “We’ll help!”', 'In diesem Moment geht die Tür auf. Da steht Shōta, der Zeitungsjunge, mit Oberschülern, die Yukata im Arm haben. „Wir helfen mit!“']),
        ],
        teach: ['v:n2_0558', 'v:n3_0291', 'v:n3_0096', 'v:n3_0119', 'v:n2_1818'],
      },
      {
        at: 'ex_oono',
        goal: ['Hear Chairman Ōno’s decision', 'Hör dir die Entscheidung des Vorsitzenden Ōno an'],
        lines: [
          l('ex_oono', 'ははは！若い人は、ちゃんとおった。わしらが、声をかけておらんかっただけじゃ。', ['Ha ha ha! The young people were there all along. We just never asked them.', 'Hahaha! Die jungen Leute waren die ganze Zeit da. Wir haben sie bloß nie gefragt.'], 'happy'),
          l('ex_oono', '会議で、みんなの{承認|しょうにん|v:n3_0149}ももらった。{日にち|ひにち|v:n2_1516}は、八月{上旬|じょうじゅん|v:n2_0881}に変更じゃ。', ['The meeting gave its approval too. The date has been moved to early August.', 'Die Versammlung hat auch zugestimmt. Der Termin wird auf Anfang August verlegt.'], 'happy'),
          l('ex_oono', '会場の{設計|せっけい|v:n3_0292}は若い人に任せる。年寄りは、{安全|あんぜん}を{重視|じゅうし|v:n3_0093}して、{整理|せいり|v:n3_0284}と{処理|しょり|v:n3_0176}をやる。', ['We’ll leave the layout of the venue to the young ones. We old folk will put safety first and do the sorting and the paperwork.', 'Die Gestaltung des Festplatzes überlassen wir den Jungen. Wir Alten legen Wert auf Sicherheit und kümmern uns um Ordnung und Abwicklung.']),
          l('ex_oono', '君も{ぜひとも||v:n2_1017}来てくれ。{大いに|おおいに|v:ooini}{踊|おど}ろうじゃないか！', ['You must come too, no matter what. Let’s dance to our hearts’ content!', 'Du musst unbedingt auch kommen. Lass uns nach Herzenslust tanzen!'], 'happy'),
        ],
        teach: ['v:n3_0149', 'v:n2_1516', 'v:n2_0881', 'v:n3_0292', 'v:n3_0093', 'v:n3_0284', 'v:n3_0176', 'v:n2_1017', 'v:ooini'],
      },
    ],
  },
  // ------------------------------------------------------------------ Misaki: bread at four in the morning
  {
    id: 'ep_ex_misaki',
    chapter: 1,
    after: 'mq2',
    who: 'ex_misaki',
    title: ['朝四時のパン', 'Bread at Four in the Morning', 'Brot um vier Uhr morgens'],
    summary: [
      'Misaki bakes alone every morning from four. Her son seems ashamed of the little shop — or so she believes.',
      'Misaki backt jeden Morgen ab vier allein. Ihr Sohn scheint sich für den kleinen Laden zu schämen — so glaubt sie jedenfalls.',
    ],
    scenes: [
      {
        at: 'ex_misaki',
        goal: ['Look into the bakery early in the morning', 'Schau frühmorgens in die Bäckerei'],
        lines: [
          nar('まだ暗い朝四時。{エプロン||v:n2_0255}をつけた{美咲|みさき}さんが、パン{生地|きじ}の{塊|かたまり|v:n2_0407}をこねている。', ['Four in the morning, still dark. Misaki, wearing an apron, is kneading a lump of dough.', 'Vier Uhr morgens, noch dunkel. Misaki in Schürze knetet einen Klumpen Brotteig.']),
          l('ex_misaki', '焼きたては、少し{冷まして|さまして|v:n3_0002}から{並|なら}べるの。でも、{冷めすぎる|さめすぎる|v:n3_0004}と、おいしくない。', ['Fresh loaves have to cool a little before I put them out. But if they get too cold, they don’t taste good.', 'Frisches Brot lasse ich ein bisschen abkühlen, bevor ich es auslege. Aber wenn es zu kalt wird, schmeckt es nicht.']),
          l('ex_misaki', 'この{粗い|あらい|v:n2_0160}{粉|こな}は、{夫|おっと}が好きだった{種類|しゅるい}。{脂|あぶら|v:n2_0148}を少しだけ入れるのが、うちの{秘密|ひみつ}よ。', ['This coarse flour is the kind my husband liked. Adding just a little fat is our secret.', 'Dieses grobe Mehl ist die Sorte, die mein Mann mochte. Ein kleines bisschen Fett hinzuzufügen ist unser Geheimnis.']),
          l('ex_misaki', '夫が{亡|な}くなって、もう五年。一人でオーブンの前に立つと、目が{覚める|さめる|v:n3_0005}の。……眠いのにね。', ['It’s been five years since my husband died. Standing alone in front of the oven wakes me up. …Even though I’m sleepy.', 'Seit mein Mann gestorben ist, sind fünf Jahre vergangen. Allein vor dem Ofen zu stehen, macht mich wach. … Obwohl ich müde bin.']),
        ],
        teach: ['v:n2_0255', 'v:n2_0407', 'v:n3_0002', 'v:n3_0004', 'v:n2_0160', 'v:n2_0148', 'v:n3_0005'],
      },
      {
        at: 'ex_misaki',
        goal: ['Hear what worries Misaki', 'Hör, was Misaki Sorgen macht'],
        lines: [
          l('ex_misaki', '息子がね、友だちに「家はパン屋」って言わないの。{恥|は}ずかしいのかしら。', ['My son never tells his friends “we have a bakery”. I wonder if he’s embarrassed.', 'Mein Sohn erzählt seinen Freunden nie: „Wir haben eine Bäckerei.“ Ob er sich wohl schämt?'], 'worried'),
          l('ex_misaki', '昔は、{食卓|しょくたく|v:n3_0162}にわたしのパンの{皿|さら|v:n3_0007}があると、{食欲|しょくよく|v:n3_0166}がない日でも、全部食べてくれたのに。', ['In the old days, when there was a plate of my bread on the dining table, he ate everything, even on days he had no appetite.', 'Früher, wenn ein Teller mit meinem Brot auf dem Esstisch stand, hat er alles aufgegessen — selbst an Tagen ohne Appetit.']),
          l('ex_misaki', '大きなパン工場の{製造|せいぞう|v:n3_0273}するパンは、安くてきれい。うちのパンなんて、{惨め|みじめ|v:n2_1707}に見えるわよね。', ['The bread made in big factories is cheap and pretty. Ours must look pitiful next to it.', 'Das Brot, das große Fabriken herstellen, ist billig und hübsch. Unseres sieht daneben bestimmt kläglich aus.'], 'worried'),
          l('ex_misaki', '……{憎らしい|にくらしい|v:n2_1371}ことを言われても、言い返せない。母親って、そういうものね。', ['…Even when he says hateful things, I can’t answer back. That’s what mothers are like.', '… Selbst wenn er gemeine Dinge sagt, kann ich nichts erwidern. So sind Mütter eben.']),
        ],
        teach: ['v:n3_0162', 'v:n3_0007', 'v:n3_0166', 'v:n3_0273', 'v:n2_1707', 'v:n2_1371'],
      },
      {
        at: 'ex_misaki',
        goal: ['Tell Misaki what Shōta said about her', 'Erzähl Misaki, was Shōta über sie gesagt hat'],
        music: 'memory',
        lines: [
          ask(
            ['翔太くんは、お母さんのパンが一番だと言っていました', ['Shōta said your bread is the best', 'Shōta hat gesagt, Ihr Brot sei das beste'], [
              l('ex_misaki', 'え……あの子が？', ['Huh… that boy said that?', 'Wie … das hat er gesagt?'], 'surprised'),
            ]],
            ['翔太くんは、お母さんを心配していました', ['Shōta is worried about you', 'Shōta macht sich Sorgen um Sie'], [
              l('ex_misaki', '心配……？あの子が、わたしを？', ['Worried…? About me?', 'Sorgen …? Um mich?'], 'surprised'),
            ]],
          ),
          l('ex_misaki', '友だちに言わなかったのは、「パン屋の息子なのに、パンを{かじって||v:n2_0399}ばかりいる」って{笑|わら}われたからなのね。', ['So he didn’t tell his friends because they laughed at him: “a baker’s son who just nibbles bread all day.”', 'Er hat es seinen Freunden also nicht erzählt, weil sie ihn ausgelacht haben: „Ein Bäckersohn, der den ganzen Tag nur Brot knabbert.“']),
          l('ex_misaki', '{恥|は}ずかしがっていたのは、わたしのほうだった。……このお店、ずっと{自慢|じまん|v:n3_0078}していいのよね。', ['It was me who was ashamed. …I can be proud of this shop, always.', 'Ich war es, die sich geschämt hat. … Ich darf auf diesen Laden stolz sein, immer.'], 'happy'),
          l('ex_misaki', '明日から、{包丁|ほうちょう|v:n2_1638}と{フライパン||v:n2_1579}で、新しいサンドイッチも作ってみるわ。翔太の好きな、たまごサンド！', ['From tomorrow I’ll try making new sandwiches too, with knife and frying pan. Shōta’s favourite — egg sandwiches!', 'Ab morgen probiere ich mit Messer und Pfanne auch neue Sandwiches. Shōtas Lieblings-Eiersandwich!'], 'happy'),
        ],
        teach: ['v:n2_0399', 'v:n3_0078', 'v:n2_1638', 'v:n2_1579'],
      },
    ],
  },
  // ------------------------------------------------------------------ Gen’ichirō: waiting for a friend who will not come
  {
    id: 'ep_ex_genichirou',
    chapter: 1,
    after: 'mq3',
    who: 'ex_genichirou',
    title: ['待ちぼうけの将棋盤', 'The Shogi Board That Waits', 'Das wartende Shogi-Brett'],
    summary: [
      'Every day old Gen’ichirō sets up a shogi board in the arcade and waits for his friend Shigeo. Nobody has the heart to tell him why Shigeo never comes.',
      'Jeden Tag stellt der alte Gen’ichirō in der Einkaufsstraße ein Shogi-Brett auf und wartet auf seinen Freund Shigeo. Niemand bringt es übers Herz, ihm zu sagen, warum Shigeo nie kommt.',
    ],
    scenes: [
      {
        at: 'ex_genichirou',
        goal: ['Play shogi with Gen’ichirō', 'Spiel Shogi mit Gen’ichirō'],
        lines: [
          l('ex_genichirou', '{茂雄|しげお}とはな、六十年、ここで{指|さ}してきた。{勝|しょう|v:n2_0059}{負|ぶ}は、ちょうど五百{勝|しょう}五百{敗|ぱい}の{引分け|ひきわけ|v:n2_1488}じゃ。', ['Shigeo and I have played here for sixty years. Our record is a perfect draw: five hundred wins, five hundred losses each.', 'Shigeo und ich spielen hier seit sechzig Jahren. Unsere Bilanz ist genau ausgeglichen: fünfhundert Siege, fünfhundert Niederlagen.']),
          l('ex_genichirou', '{審判|しんぱん|v:n3_0200}なんぞ、おらん。{角|かく|v:n3_0243}を{左右|さゆう|v:n3_0006}どちらに動かすか、二人で{一時間|いちじかん}もけんかしたもんじゃ。', ['No referee. We’d argue for an hour about whether to move the bishop left or right.', 'Einen Schiedsrichter gab es nicht. Wir haben eine Stunde darüber gestritten, ob der Läufer nach links oder rechts zieht.'], 'happy'),
          l('ex_genichirou', 'あいつは、ここ半年、来ん。{日陰|ひかげ|v:n2_1480}のこの{席|せき}で、{じっと||v:n3_0058}待っとるんじゃがな。', ['He hasn’t come for half a year now. I wait patiently here on this seat in the shade.', 'Seit einem halben Jahr kommt er nicht. Ich warte geduldig auf diesem Platz im Schatten.']),
          l('ex_genichirou', '{現に|げんに|v:n2_0597}、ほれ、盤も{駒|こま}も、あいつの分まで{並|なら}べてある。', ['Look — the board and the pieces are set out, his side as well.', 'Sieh nur — Brett und Steine sind aufgestellt, auch seine Seite.']),
        ],
        teach: ['v:n2_0059', 'v:n2_1488', 'v:n3_0200', 'v:n3_0243', 'v:n3_0006', 'v:n2_1480', 'v:n2_0597'],
      },
      {
        at: 'exh_post',
        goal: ['Ask Mr. Murai about Shigeo', 'Frag Herrn Murai nach Shigeo'],
        lines: [
          l('ex_murai', '{茂雄|しげお}さんは……去年の{末|すえ|v:n3_0218}に、この世を{去り|さり|v:n3_0009}ました。{死亡|しぼう|v:n3_0074}の{知らせ|しらせ}を届けたのは、わたしです。', ['Shigeo… passed away at the end of last year. I was the one who delivered the news of his death.', 'Shigeo … ist Ende letzten Jahres gestorben. Ich war es, der die Todesnachricht überbracht hat.'], 'worried'),
          l('ex_murai', '源一郎さんにも、何度も話しました。でも、{事実|じじつ|v:n3_0036}を受け入れられないみたいで……。', ['I told Gen’ichirō several times. But he can’t seem to accept the fact…', 'Ich habe es Gen’ichirō mehrmals gesagt. Aber er scheint die Tatsache nicht annehmen zu können …'], 'worried'),
          l('ex_murai', 'これ、茂雄さんの奥さんから{預かった|あずかった}ものです。「源一郎さんに」と。……あなたから、渡してくれませんか。', ['This is something Shigeo’s wife gave me to pass on. “For Gen’ichirō,” she said. …Would you give it to him?', 'Das hier hat mir Shigeos Frau mitgegeben. „Für Gen’ichirō“, sagte sie. … Würdest du es ihm geben?']),
        ],
        teach: ['v:n3_0218', 'v:n3_0009', 'v:n3_0074', 'v:n3_0036'],
      },
      {
        at: 'ex_genichirou',
        goal: ['Give Gen’ichirō the package from Shigeo’s wife', 'Gib Gen’ichirō das Päckchen von Shigeos Frau'],
        music: 'memory',
        lines: [
          nar('{包|つつ}みの中には、古い{駒|こま}が一つと、手紙が入っていた。{詩人|しじん|v:n3_0039}のような、{丁寧|ていねい}な字だ。', ['Inside the package are a single old shogi piece and a letter, in careful handwriting like a poet’s.', 'In dem Päckchen sind ein einzelner alter Shogi-Stein und ein Brief in sorgfältiger Schrift, wie die eines Dichters.']),
          nar('「源ちゃんへ。千一{局目|きょくめ}は、お前の勝ちだ。おれは先に行って、{のんびり||v:nonbiri}待っている。急ぐなよ」', ['“To Gen. Game one thousand and one is your win. I’ve gone on ahead and will wait at my leisure. Don’t hurry.”', '„Für Gen. Partie Nummer tausendeins geht an dich. Ich bin vorausgegangen und warte in aller Ruhe. Beeil dich nicht.“']),
          l('ex_genichirou', '……{しいんと||v:n2_0750}しとると思うたら、そういうことか。……{実に|じつに|v:n3_0059}、あいつらしい。', ['…So that’s why it’s been so deathly quiet. …Truly, that’s just like him.', '… Deshalb war es also so totenstill. … Wirklich, das ist ganz er.'], 'worried'),
          l('ex_genichirou', '心が{沈んで|しずんで|v:n3_0041}、{ぼんやり||v:bonyari}待っとったが……もう、待つのはやめじゃ。', ['My heart was sunk, and I just waited absent-mindedly… but no more waiting.', 'Mein Herz war schwer, und ich habe nur geistesabwesend gewartet … aber mit dem Warten ist jetzt Schluss.']),
          l('ex_genichirou', 'おい、そこの若いの。明日から、わしと指さんか。一から教えてやる。', ['Hey, you there, young one. From tomorrow, won’t you play with me? I’ll teach you from scratch.', 'He, du da, junger Mensch. Spielst du ab morgen mit mir? Ich bringe es dir von Grund auf bei.'], 'happy'),
        ],
        teach: ['v:n3_0039', 'v:nonbiri', 'v:n2_0750', 'v:n3_0059', 'v:n3_0041', 'v:bonyari'],
      },
    ],
  },
];
