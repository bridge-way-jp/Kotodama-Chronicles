import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 1, second round: Yūma, Ren, Ms. Takahashi, Chairman Ōno, Gen’ichirō. */
export const EPISODES_EX1B: Episode[] = [
  // ------------------------------------------------------------------ Yūma: the first big order
  {
    id: 'ep_ex_yuuma2',
    chapter: 1,
    after: 'mq6',
    who: 'ex_yuuma',
    title: ['初めての注文書', 'The First Big Order', 'Die erste große Bestellung'],
    summary: [
      'A bride-to-be orders all the flowers for her wedding from shy Yūma. He must speak, advise — and send an invoice.',
      'Eine Braut bestellt bei dem schüchternen Yūma alle Blumen für ihre Hochzeit. Er muss reden, beraten — und eine Rechnung schreiben.',
    ],
    scenes: [
      {
        at: 'ex_yuuma',
        goal: ['Visit Yūma at the flower shop', 'Besuche Yūma im Blumenladen'],
        lines: [
          l('ex_yuuma', '{全|すべ|v:n3_0241}て、{推薦|すいせん|v:n3_0212}してくれた{人|ひと}のおかげです。{市役所|しやくしょ}の{人|ひと}が、ぼくの{店|みせ}を{結婚式|けっこんしき}の{花屋|はなや}に{勧めて|すすめて|v:n3_0230}くれたんです。', ['It’s all thanks to the person who recommended me. Someone at the city office suggested my shop as the florist for a wedding.', 'Alles verdanke ich der Person, die mich empfohlen hat. Jemand im Rathaus hat meinen Laden als Blumenhändler für eine Hochzeit vorgeschlagen.'], 'happy'),
          l('ex_yuuma', '{しかも||v:n3_0024}、{花嫁|はなよめ}さんは「{週|しゅう|v:n3_0087}に一度、{試作|しさく}を見たい」と言うんです。……ぼく、ちゃんと話せるかな。', ['What’s more, the bride says she wants to see a trial arrangement once a week. …Will I be able to talk properly?', 'Außerdem will die Braut einmal pro Woche ein Probegesteck sehen. … Ob ich richtig sprechen kann?'], 'worried'),
        ],
        teach: ['v:n3_0241', 'v:n3_0212', 'v:n3_0230', 'v:n3_0024', 'v:n3_0087'],
      },
      {
        at: 'exh_flowers',
        goal: ['Help Yūma talk to the bride', 'Hilf Yūma beim Gespräch mit der Braut'],
        lines: [
          nar('花嫁さんは、{赤|あか}いバラと{白|しろ}いユリを{見比|みくら}べている。「どちらがいいか、{決|き}められなくて」', ['The bride compares red roses and white lilies. “I just can’t decide which is better.”', 'Die Braut vergleicht rote Rosen und weiße Lilien. „Ich kann mich einfach nicht entscheiden.“']),
          l('ex_yuuma', 'どちらもきれいです。……{それとも||v:soretomo}、{二|ふた}つを{混|ま}ぜますか？{ますます||v:masumasu}、{華|はな}やかになりますよ。', ['Both are beautiful. …Or shall we mix the two? It will become more and more splendid.', 'Beide sind schön. … Oder sollen wir die beiden mischen? Es wird immer prächtiger.']),
          nar('「それ、いいですね！」……ゆうまくんの{声|こえ}は、{震|ふる}えていなかった。', ['“That sounds wonderful!” …Yūma’s voice did not tremble.', '„Das klingt wunderbar!“ … Yūmas Stimme zitterte nicht.']),
        ],
        teach: ['v:soretomo', 'v:masumasu'],
      },
      {
        at: 'ex_yuuma',
        goal: ['Hear how the order ended', 'Hör, wie die Bestellung ausging'],
        music: 'memory',
        lines: [
          l('ex_yuuma', '{請求書|せいきゅうしょ}を{書|か}くのが、{一番|いちばん}{緊張|きんちょう}しました。お{金|かね}の{請求|せいきゅう|v:n3_0262}って、{恥|は}ずかしくて。', ['Writing the invoice made me most nervous. Asking for money is so embarrassing.', 'Die Rechnung zu schreiben hat mich am nervösesten gemacht. Geld zu verlangen ist so peinlich.']),
          l('ex_yuuma', 'でも、{花嫁|はなよめ}さんは、すぐに{支払|しはら|v:n3_0072}ってくれて、「いい{仕事|しごと}には、いい{お代|だい}を」って。', ['But the bride paid right away, saying “good work deserves a good price.”', 'Aber die Braut hat sofort bezahlt und gesagt: „Gute Arbeit verdient einen guten Preis.“'], 'happy'),
          l('ex_yuuma', '花は、人に{話|はな}しかけなくても、{届|とど}く。……でも、言葉があれば、もっと{遠|とお}くまで{届|とど}くんですね。', ['Flowers reach people even without speaking. …But with words, they reach even farther.', 'Blumen erreichen Menschen auch ohne Worte. … Aber mit Worten reichen sie noch viel weiter.'], 'happy'),
        ],
        teach: ['v:n3_0262', 'v:n3_0072'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ren: standing up
  {
    id: 'ep_ex_ren2',
    chapter: 1,
    after: 'mq6',
    who: 'ex_ren',
    title: ['立ち上がる日', 'The Day He Stood Up', 'Der Tag, an dem er aufstand'],
    summary: [
      'Ren has to practise walking again after his long stay. His sisters come to cheer him on.',
      'Ren muss nach seinem langen Aufenthalt das Gehen neu üben. Seine Schwestern kommen, um ihn anzufeuern.',
    ],
    scenes: [
      {
        at: 'ex_ren',
        goal: ['Meet Ren in the hospital garden', 'Triff Ren im Krankenhausgarten'],
        lines: [
          l('ex_ren', 'ぼく、{身長|しんちょう|v:n3_0198}が三センチのびたんだ。でも、{足|あし}の{筋|きん|v:n3_0228}{肉|にく}は、{細|ほそ}くなっちゃった。', ['I’ve grown three centimetres taller. But the muscles in my legs have gotten thin.', 'Ich bin drei Zentimeter gewachsen. Aber die Muskeln in meinen Beinen sind dünn geworden.']),
          l('ex_ren', '{車|くるま}いすの{使用|しよう|v:n3_0125}は、もうやめたいんだ。……けど、{修理|しゅうり|v:n3_0106}の{人|ひと}が来る{日|ひ}は、ちょっとさびしい。', ['I want to stop using the wheelchair now. …But on the day the repairman comes, I feel a little lonely.', 'Ich will den Rollstuhl nicht mehr benutzen. … Aber an dem Tag, an dem der Mechaniker kommt, bin ich ein bisschen traurig.']),
        ],
        teach: ['v:n3_0198', 'v:n3_0228', 'v:n3_0125', 'v:n3_0106'],
      },
      {
        at: 'ex_ren',
        goal: ['Cheer Ren on with his sisters', 'Feuere Ren mit seinen Schwestern an'],
        lines: [
          nar('{病院|びょういん}の{廊下|ろうか}。{姉妹|しまい|v:n3_0076}が二人、{うきうき||v:ukiuki}した{顔|かお}で{手|て}をふっている。「れん、がんばれー！」', ['The hospital corridor. His two sisters wave, looking thrilled. “Ren, you can do it!”', 'Der Krankenhausflur. Seine beiden Schwestern winken mit freudigen Gesichtern. „Ren, du schaffst das!“']),
          l('ex_ren', '……{眠|ねむ}い{朝|あさ}も、{目|め}を{覚ます|さます|v:n3_0003}と、{二人|ふたり}の{顔|かお}が{浮|う}かぶんだ。ぼく、{一人|ひとり}じゃなかった。', ['…Even on sleepy mornings, when I wake up, I picture their faces. I was never alone.', '… Auch an müden Morgen, wenn ich aufwache, sehe ich ihre Gesichter vor mir. Ich war nie allein.'], 'happy'),
        ],
        teach: ['v:n3_0076', 'v:ukiuki', 'v:n3_0003'],
      },
      {
        at: 'ex_ren',
        goal: ['See Ren take his first steps', 'Sieh, wie Ren seine ersten Schritte macht'],
        music: 'memory',
        lines: [
          nar('{手|て}すりにつかまって、{蓮|れん}くんは一歩、また一歩と{進|すす}んだ。{廊下|ろうか}のおしまいで、{姉|あね}が両手を広げている。', ['Holding the handrail, Ren advanced step by step. At the end of the corridor, his sister holds out both arms.', 'Am Geländer festgehalten, geht Ren Schritt für Schritt vorwärts. Am Ende des Flurs breitet seine Schwester beide Arme aus.']),
          l('ex_ren', '……{愛|あい|v:n3_0295}されてるって、{足|あし}にも{力|ちから}が{入|はい}るんだね。{つまり||v:tsumari}、ぼくは、{一人|ひとり}で{歩|ある}いてるんじゃないんだ。', ['…When you’re loved, your legs get strength too. In short, I’m not walking alone.', '… Wenn man geliebt wird, bekommen auch die Beine Kraft. Mit anderen Worten: Ich gehe nicht allein.'], 'happy'),
        ],
        teach: ['v:n3_0295', 'v:tsumari'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ms. Takahashi: the parents’ evening
  {
    id: 'ep_ex_takahashi2',
    chapter: 1,
    after: 'mq6',
    who: 'ex_takahashi',
    title: ['保護者会の夜', 'The Parents’ Evening', 'Der Elternabend'],
    summary: [
      'At her first parents’ evening, Ms. Takahashi must show that parents can trust a young teacher.',
      'Beim ersten Elternabend muss Frau Takahashi zeigen, dass Eltern einer jungen Lehrerin vertrauen können.',
    ],
    scenes: [
      {
        at: 'ex_takahashi',
        goal: ['Help Ms. Takahashi prepare', 'Hilf Frau Takahashi bei der Vorbereitung'],
        lines: [
          l('ex_takahashi', 'すみません、{手伝|てつだ}ってもらえますか？{保護者会|ほごしゃかい}の{資料|しりょう}です。{学校|がっこう}の{規則|きそく}に{従って|したがって|v:n3_0046}、{全員|ぜんいん}に{同|おな}じ{説明|せつめい}をしなければ。', ['Sorry, could you help me? It’s the material for the parents’ evening. Following the school rules, I have to give everyone the same explanation.', 'Entschuldigung, könnten Sie mir helfen? Es sind die Unterlagen für den Elternabend. Nach den Schulregeln muss ich allen dieselbe Erklärung geben.']),
          l('ex_takahashi', 'でも、{経験|けいけん}が{少|すく}ない私には、{信用|しんよう|v:n3_0204}が{足|た}りない{気|き}がして。', ['But I feel that, with so little experience, I lack trust.', 'Aber ich habe das Gefühl, mir fehlt mit so wenig Erfahrung das Vertrauen.'], 'worried'),
        ],
        teach: ['v:n3_0046', 'v:n3_0204'],
      },
      {
        at: 'exh_school',
        goal: ['Go to the parents’ evening', 'Geh zum Elternabend'],
        lines: [
          nar('{教室|きょうしつ}に、{保護者|ほごしゃ}がぎっしり{座|すわ}っている。{腕|うで}を組んでいる{人|ひと}も、いる。', ['The classroom is packed with parents. Some sit with their arms crossed.', 'Im Klassenzimmer sitzen dicht gedrängt die Eltern. Manche haben die Arme verschränkt.']),
          nar('「{制限|せいげん|v:n3_0265}のない{自由|じゆう}な{教育|きょういく}、ですか？」「{ところが||v:tokoroga}、{基本|きほん}のルールは{必要|ひつよう}なんです」', ['“Education with no limits, free-form?” “However, basic rules are necessary.”', '„Eine freie Erziehung ohne Grenzen?“ „Allerdings sind Grundregeln nötig.“']),
          l('ex_takahashi', '{美月|みづき}ちゃんの{小|ちい}さい{声|こえ}の{時間|じかん}のおかげで、クラスは{変|か}わりました。{だが||v:daga}、{全|すべ}てがうまくいったわけではありません。', ['Thanks to Mizuki’s quiet-voice time, the class has changed. But not everything has gone well.', 'Dank Mizukis Leise-Stimmen-Zeit hat sich die Klasse verändert. Aber nicht alles ist gut gelaufen.']),
        ],
        teach: ['v:n3_0265', 'v:tokoroga', 'v:daga'],
      },
      {
        at: 'ex_takahashi',
        goal: ['Hear what the parents said', 'Hör, was die Eltern gesagt haben'],
        music: 'memory',
        lines: [
          l('ex_takahashi', '{正直|しょうじき}に{失敗|しっぱい}も話したら、{保護者|ほごしゃ}の{皆|みな}さんが{拍手|はくしゅ}してくれたんです。', ['When I honestly talked about my failures too, the parents clapped.', 'Als ich ehrlich auch von Misserfolgen erzählt habe, haben die Eltern geklatscht.'], 'surprised'),
          l('ex_takahashi', '「{先生|せんせい}の{努力|どりょく}の{証明|しょうめい|v:n3_0157}は、{子|こ}どもたちの{顔|かお}です」って。{信用|しんよう}は、{必ずしも|かならずしも|v:kanarazushimo}{経験|けいけん}の{長|なが}さだけじゃ、{生|う}まれないんですね。', ['“The proof of your effort is the children’s faces,” they said. Trust isn’t necessarily born only from length of experience.', '„Der Beweis Ihrer Mühe sind die Gesichter der Kinder“, sagten sie. Vertrauen entsteht nicht unbedingt nur aus langer Erfahrung.'], 'happy'),
        ],
        teach: ['v:n3_0157', 'v:kanarazushimo'],
      },
    ],
  },
  // ------------------------------------------------------------------ Chairman Ōno: the festival night
  {
    id: 'ep_ex_oono2',
    chapter: 1,
    after: 'mq6',
    who: 'ex_oono',
    title: ['祭りの夜に', 'On Festival Night', 'In der Festnacht'],
    summary: [
      'The summer festival is on. Ōno’s biggest worry: too many visitors — and one lost child.',
      'Das Sommerfest findet statt. Ōnos größte Sorge: zu viele Besucher — und ein verlorenes Kind.',
    ],
    scenes: [
      {
        at: 'ex_oono',
        goal: ['Help Chairman Ōno at the festival', 'Hilf dem Vorsitzenden Ōno beim Fest'],
        evening: true,
        lines: [
          l('ex_oono', '{出場|しゅつじょう|v:n3_0113}{者|しゃ}は{女子|じょし|v:n3_0170}{高校生|こうこうせい}のチームが、{一番|いちばん}{多|おお}い。{成人|せいじん|v:n3_0270}のチームは、{三|みっ}つだけじゃ。', ['Among the participants, the girls’ high-school teams are the most numerous. The adult teams are only three.', 'Unter den Teilnehmern sind die Mädchenteams der Oberschule am zahlreichsten. Erwachsenenteams gibt es nur drei.'], 'happy'),
          l('ex_oono', '{参拝|さんぱい|v:sanpai}の人も多い。{宿泊|しゅくはく|v:n3_0108}は、もう{満室|まんしつ}じゃ。もっとにぎやかになるぞ！', ['Many people come to pray at the shrine. The inns are already full. It’s getting livelier and livelier!', 'Viele Leute kommen zum Schreinbesuch. Die Unterkünfte sind schon voll. Es wird immer lebhafter!'], 'happy'),
        ],
        teach: ['v:n3_0113', 'v:n3_0170', 'v:n3_0270', 'v:sanpai', 'v:n3_0108'],
      },
      {
        at: 'exh_hall',
        goal: ['Look for a lost child in the crowd', 'Such in der Menge nach einem verlorenen Kind'],
        evening: true,
        lines: [
          nar('{人|ひと}でごった返す{境内|けいだい}。{迷子|まいご}の{放送|ほうそう}が{流|なが}れた。「{赤|あか}い{浴衣|ゆかた}の{女|おんな}の子が、{泣|な}いています」', ['The shrine grounds are crammed with people. A lost-child announcement is made: “A girl in a red yukata is crying.”', 'Das Schreingelände ist voller Menschen. Eine Durchsage meldet ein verlorenes Kind: „Ein Mädchen im roten Yukata weint.“']),
          l('ex_oono', '{しばしば||v:shibashiba}、{祭|まつ}りでは{迷子|まいご}が出る。{影響|えいきょう|v:eikyou}は大きいぞ。{皆|みな}、{探|さが}すのを{手伝|てつだ}ってくれ！', ['Lost children often turn up at festivals. The effect is big. Everyone, help us look!', 'Auf Festen gibt es oft verlorene Kinder. Die Wirkung ist groß. Alle helfen beim Suchen!']),
        ],
        teach: ['v:shibashiba', 'v:eikyou'],
      },
      {
        at: 'ex_oono',
        goal: ['Hear how the festival ended', 'Hör, wie das Fest endete'],
        music: 'memory',
        lines: [
          l('ex_oono', '{すると||v:suruto}、{翔太|しょうた}たちが{先|さき}に{見|み}つけてくれた。{迷子|まいご}は{無事|ぶじ}じゃ。{ぎっしり||v:gisshiri}の{人|ひと}ごみの{中|なか}を、よく{探|さが}したもんじゃ。', ['And then Shōta and the others found her first. The child is safe. They searched well in that tightly packed crowd.', 'Dann haben Shōta und die anderen sie zuerst gefunden. Das Kind ist wohlauf. Sie haben sich in der dichten Menge gut umgesehen.'], 'happy'),
          l('ex_oono', '祭りは、{人|ひと}と{人|ひと}が{顔|かお}を{合|あ}わせる{場|ば}所じゃ。{来年|らいねん}は、もっと{多|おお}くの{若|わか}い{人|ひと}に、{出|で}てもらうぞ。', ['A festival is a place where people meet face to face. Next year I’ll have even more young people take part.', 'Ein Fest ist ein Ort, an dem Menschen einander von Angesicht zu Angesicht begegnen. Nächstes Jahr lasse ich noch mehr junge Leute mitmachen.'], 'happy'),
        ],
        teach: ['v:suruto', 'v:gisshiri'],
      },
    ],
  },
  // ------------------------------------------------------------------ Gen’ichirō: a new opponent
  {
    id: 'ep_ex_genichirou2',
    chapter: 1,
    after: 'mq6',
    who: 'ex_genichirou',
    title: ['新しい相手', 'A New Opponent', 'Ein neuer Gegner'],
    summary: [
      'Gen’ichirō teaches the player shogi. In a stranger he recognises his old friend’s face.',
      'Gen’ichirō bringt dem Spieler Shōgi bei. In einem Fremden erkennt er das Gesicht seines alten Freundes.',
    ],
    scenes: [
      {
        at: 'ex_genichirou',
        goal: ['Play shogi with Gen’ichirō', 'Spiel Shōgi mit Gen’ichirō'],
        lines: [
          l('ex_genichirou', '{すくなくとも||v:n3_0222}、{駒|こま}の{動|うご}かし{方|かた}くらいは{覚|おぼ}えてもらうぞ。{全|すべ}ては、そこからじゃ。', ['At the very least, you’re going to learn how to move the pieces. Everything starts from there.', 'Wenigstens die Züge der Steine sollst du lernen. Alles beginnt dort.']),
          l('ex_genichirou', '{知合|しりあ}いの{子|こ}に{勧|すす}められて、{孫|まご}と{指|さ}してみたが、{そっくり||v:sokkuri}でな。{目|め}の{鋭|するど}いところが、{茂雄|しげお}に。', ['A friend’s child urged me to try playing with my grandson, and he’s the very image of Shigeo. The sharpness of his eyes especially.', 'Ein Bekanntenkind hat mich gedrängt, mit meinem Enkel zu spielen, und er sieht Shigeo zum Verwechseln ähnlich. Besonders der scharfe Blick.']),
        ],
        teach: ['v:n3_0222', 'v:sokkuri'],
      },
      {
        at: 'ex_genichirou',
        goal: ['Hear what happened in the park', 'Hör, was im Park geschehen ist'],
        lines: [
          l('ex_genichirou', '{ところで||v:tokorode}、{公園|こうえん}で{すれ違った|すれちがった|v:n3_0251}{青年|せいねん}が、{茂雄|しげお}の{孫|まご}じゃった。……{こっそり||v:kossori}、{私|わし}の{駒|こま}を{見|み}ていたらしい。', ['By the way, the young man I passed in the park was Shigeo’s grandson. …Apparently he’d been secretly watching my pieces.', 'Übrigens, der junge Mann, an dem ich im Park vorbeiging, war Shigeos Enkel. … Er hat anscheinend heimlich meine Steine beobachtet.'], 'surprised'),
          l('ex_genichirou', '{したがって||v:shitagatte}、わしの{相手|あいて}は、もう{一人|ひとり}おる、ということじゃ。すっぱい{梅干|うめぼ}しより、{甘|あま}い{茶|ちゃ}がうまい{日|ひ}もあるわい。', ['Therefore, I have one more opponent. Some days sweet tea tastes better than a sour plum.', 'Folglich habe ich einen weiteren Gegner. An manchen Tagen schmeckt süßer Tee besser als eine saure Salzpflaume.']),
        ],
        teach: ['v:n3_0251', 'v:kossori', 'v:tokorode', 'v:shitagatte'],
      },
      {
        at: 'ex_genichirou',
        goal: ['Watch the two play', 'Sieh den beiden beim Spielen zu'],
        music: 'memory',
        lines: [
          nar('{公園|こうえん}のベンチ。{老人|ろうじん}と{青年|せいねん}が、{盤|ばん}をはさんで{向|む}かい{合|あ}っている。{駒|こま}の{音|おと}だけが、{響|ひび}く。', ['A bench in the park. An old man and a young man face each other across the board. Only the sound of pieces echoes.', 'Eine Parkbank. Ein alter und ein junger Mann sitzen sich über dem Brett gegenüber. Nur das Klacken der Steine hallt wider.']),
          l('ex_genichirou', '{愛する|あいする|v:n3_0300}{者|もの}は、{去|さ}っても、{形|かたち}を変えて{戻|もど}ってくる。……{天|てん}の{空|そら}で、{茂雄|しげお}が{笑|わら}っとるじゃろう。', ['Those we love, even when they leave, return in another form. …Shigeo must be laughing up in the sky.', 'Die wir lieben, kehren, auch wenn sie gehen, in anderer Gestalt zurück. … Oben im Himmel lacht Shigeo bestimmt.'], 'happy'),
        ],
        teach: ['v:n3_0300'],
      },
    ],
  },
];
