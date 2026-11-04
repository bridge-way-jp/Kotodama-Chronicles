import { ask, l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 4: the people of Shiomi Island (content/expansion.ts). */
export const EPISODES_EX4: Episode[] = [
  // ------------------------------------------------------------------ Captain Tsuyoshi: the last ferry
  {
    id: 'ep_ex_tsuyoshi',
    chapter: 4,
    after: 'mq14',
    who: 'ex_tsuyoshi',
    title: ['島の足', 'The Island’s Lifeline', 'Die Lebensader der Insel'],
    summary: [
      'The ferry to Shiomi Island is to be discontinued. Captain Tsuyoshi has one month to prove that the island needs it.',
      'Die Fähre zur Insel Shiomi soll eingestellt werden. Kapitän Tsuyoshi hat einen Monat, um zu beweisen, dass die Insel sie braucht.',
    ],
    scenes: [
      {
        at: 'exs_ferry',
        goal: ['Visit the ferry waiting hut', 'Besuche die Wartehütte der Fähre'],
        lines: [
          nar('{待合所|まちあいじょ}の{壁|かべ}に、紙が{貼|は}ってある。「{通知|つうち|v:n2_1201}：本{航路|こうろ}は来月末で{最終|さいしゅう|v:n3_0962}{運航|うんこう}となります」', ['A paper is stuck on the wall of the waiting hut: “Notice: this route will make its final run at the end of next month.”', 'An der Wand der Wartehütte hängt ein Zettel: „Mitteilung: Diese Linie fährt Ende nächsten Monats zum letzten Mal.“']),
          l('ex_tsuyoshi', '{片道|かたみち|v:n2_0409}二十分、{往復|おうふく|v:n2_0274}で四十分。{料金|りょうきん|v:n3_1171}は三百円。{定員|ていいん|v:n2_1233}は四十人じゃが、乗るのは毎日五人じゃ。', ['Twenty minutes one way, forty there and back. The fare is three hundred yen. It holds forty people, but only five ride each day.', 'Zwanzig Minuten einfach, vierzig hin und zurück. Der Fahrpreis ist dreihundert Yen. Platz ist für vierzig Leute, aber jeden Tag fahren nur fünf mit.'], 'worried'),
          l('ex_tsuyoshi', '会社は、{利益|りえき|v:n3_1159}が出んと言う。島は{過疎|かそ|v:kaso}じゃから、しかたないんかのう。', ['The company says it makes no profit. The island is depopulated, so maybe there’s nothing to be done.', 'Die Firma sagt, sie macht keinen Gewinn. Die Insel entvölkert sich, da kann man wohl nichts machen.'], 'worried'),
        ],
        teach: ['v:n2_1201', 'v:n3_0962', 'v:n2_0409', 'v:n2_0274', 'v:n3_1171', 'v:n2_1233', 'v:n3_1159', 'v:kaso'],
      },
      {
        at: 'ex_tsuyoshi',
        goal: ['Talk to Captain Tsuyoshi on the jetty', 'Sprich mit Kapitän Tsuyoshi am Steg'],
        lines: [
          l('ex_tsuyoshi', 'この船は、島の{唯一|ゆいいつ|v:n3_1102}の{交通機関|こうつうきかん|v:n2_0632}じゃ。病人も、魚も、手紙も、全部この船で{輸送|ゆそう|v:n2_1822}する。', ['This boat is the island’s only means of transport. Sick people, fish, letters — everything travels on it.', 'Dieses Boot ist das einzige Verkehrsmittel der Insel. Kranke, Fisch, Briefe — alles wird damit transportiert.']),
          l('ex_tsuyoshi', '{陸|りく|v:n3_1161}の人間には分からん。{天気予報|てんきよほう|v:n3_1145}が{外れて|はずれて}も、わしは{針路|しんろ|v:n2_0934}を変えて、{半島|はんとう|v:n2_1474}の{岬|みさき|v:n2_1705}を回る。', ['Landlubbers don’t understand. Even when the weather forecast is wrong, I change course and round the cape of the peninsula.', 'Leute an Land verstehen das nicht. Auch wenn die Wettervorhersage danebenliegt, ändere ich den Kurs und umrunde das Kap der Halbinsel.']),
          l('ex_tsuyoshi', '{湾|わん|v:n3_1204}の中なら、目をつぶっても走れる。四十年、この海はわしの家じゃった。', ['Inside the bay I could sail with my eyes closed. For forty years this sea has been my home.', 'In der Bucht könnte ich mit geschlossenen Augen fahren. Vierzig Jahre lang war dieses Meer mein Zuhause.']),
        ],
        teach: ['v:n3_1102', 'v:n2_0632', 'v:n2_1822', 'v:n3_1161', 'v:n3_1145', 'v:n2_0934', 'v:n2_1474', 'v:n2_1705', 'v:n3_1204'],
      },
      {
        at: 'ex_tsuyoshi',
        goal: ['Bring the island’s signatures to the captain', 'Bring dem Kapitän die Unterschriften der Insel'],
        music: 'memory',
        lines: [
          nar('{島|しま}じゅうの人が、一枚の紙に{サイン||v:n3_0969}をした。子どもも、お年寄りも。{本土|ほんど}の人まで。', ['Everyone on the island signs a single sheet of paper. Children and old people alike. Even people from the mainland.', 'Alle auf der Insel unterschreiben auf einem einzigen Blatt. Kinder wie Alte. Sogar Leute vom Festland.']),
          l('ex_tsuyoshi', '会社への{要求|ようきゅう|v:n3_1126}は、一つだけじゃ。「船を残してくれ」。……{不通|ふつう|v:n2_1570}になれば、島は{終|お}わる。', ['We make only one demand of the company: “Keep the boat.” …If the line is cut, the island is finished.', 'Wir stellen der Firma nur eine Forderung: „Behaltet das Boot.“ … Wird die Verbindung gekappt, ist die Insel am Ende.']),
          l('ex_tsuyoshi', '……来たぞ、返事じゃ。「{当面|とうめん}、運航を続ける」。ははは！まだまだ、わしの仕事はあるわい！', ['…Here it is, the reply: “Service will continue for the time being.” Ha ha! There’s still work for me yet!', '… Da ist sie, die Antwort: „Der Betrieb wird vorerst fortgesetzt.“ Haha! Es gibt noch Arbeit für mich!'], 'happy'),
        ],
        teach: ['v:n3_0969', 'v:n3_1126', 'v:n2_1570'],
      },
    ],
  },
  // ------------------------------------------------------------------ Tetsuo: a boat for a grandson he never met
  {
    id: 'ep_ex_tetsuo',
    chapter: 4,
    after: 'mq14',
    who: 'ex_tetsuo',
    title: ['孫の舟', 'A Boat for a Grandson', 'Ein Boot für den Enkel'],
    summary: [
      'Old shipwright Tetsuo is building his last wooden boat — for a grandson he has never met.',
      'Der alte Bootsbauer Tetsuo baut sein letztes Holzboot — für einen Enkel, den er nie getroffen hat.',
    ],
    scenes: [
      {
        at: 'exs_shipyard',
        goal: ['Look into the shipyard', 'Schau in die Werft'],
        lines: [
          nar('{造船|ぞうせん|v:n2_1053}{所|じょ}の中。{梯子|はしご|v:n2_1428}の上で、{鉄男|てつお}さんが{のこぎり||v:n2_1400}を引いている。', ['Inside the shipyard. Up on a ladder, Tetsuo is working with a saw.', 'In der Werft. Oben auf einer Leiter sägt Tetsuo.']),
          l('ex_tetsuo', '{船大工|ふなだいく}は、ふつうの{大工|だいく|v:n2_1090}とは違う。舟には、{直線|ちょくせん|v:n2_1186}が一本もないんだ。', ['A boatwright isn’t like an ordinary carpenter. There isn’t a single straight line in a boat.', 'Ein Bootsbauer ist nicht wie ein gewöhnlicher Zimmermann. In einem Boot gibt es keine einzige gerade Linie.']),
          l('ex_tetsuo', '昔は島に{名人|めいじん|v:n3_1047}が十人いた。今は、わし一人。この{一艘|いっそう|v:n2_0071}が、最後の木の舟になる。', ['Once there were ten masters on the island. Now there’s only me. This one boat will be the last wooden boat.', 'Früher gab es auf der Insel zehn Meister. Heute nur noch mich. Dieses eine Boot wird das letzte Holzboot sein.']),
        ],
        teach: ['v:n2_1053', 'v:n2_1428', 'v:n2_1400', 'v:n2_1090', 'v:n2_1186', 'v:n3_1047', 'v:n2_0071'],
      },
      {
        at: 'ex_tetsuo',
        goal: ['Ask Tetsuo who the boat is for', 'Frag Tetsuo, für wen das Boot ist'],
        lines: [
          l('ex_tetsuo', '息子は、二十年前に島を出た。けんかをしてな。それから、一度も帰ってこん。', ['My son left the island twenty years ago. We had a fight. He has never come back since.', 'Mein Sohn hat die Insel vor zwanzig Jahren verlassen. Wir hatten Streit. Seitdem ist er nie zurückgekommen.'], 'worried'),
          l('ex_tetsuo', '{姪|めい|v:n2_1737}が{教|おし}えてくれた。息子には、十歳の{坊や|ぼうや|v:n2_1642}がいるそうだ。わしの孫だ。', ['My niece told me. My son has a ten-year-old boy, she says. My grandson.', 'Meine Nichte hat es mir erzählt. Mein Sohn hat einen zehnjährigen Jungen, sagt sie. Meinen Enkel.']),
          l('ex_tetsuo', '{舳先|へさき}に、波の{模様|もよう}を{彫って|ほって|v:n2_1656}いる。昔、息子が好きだった{物語|ものがたり|v:n3_1082}の、海の{竜|りゅう}だ。', ['I’m carving a wave pattern into the bow. The sea dragon from a story my son loved long ago.', 'In den Bug schnitze ich ein Wellenmuster. Den Meeresdrachen aus einer Geschichte, die mein Sohn früher geliebt hat.']),
          l('ex_tetsuo', 'この舟を{譲る|ゆずる|v:n3_1116}相手が、いつか来ればいいがな。', ['I hope that someday the one I’m to hand this boat to will come.', 'Ich hoffe, dass eines Tages der kommt, dem ich dieses Boot übergeben soll.']),
        ],
        teach: ['v:n2_1737', 'v:n2_1642', 'v:n2_1656', 'v:n3_1082', 'v:n3_1116'],
      },
      {
        at: 'ex_tetsuo',
        goal: ['Be at the shipyard when the ferry comes in', 'Sei in der Werft, wenn die Fähre ankommt'],
        music: 'memory',
        lines: [
          nar('{渡|わた}し{船|ぶね}から、男の子が{跳|と}び{降|お}りた。リュックを{背負って|せおって|v:n2_1009}、まっすぐ造船所へ走ってくる。', ['A boy jumps off the ferry. Wearing a backpack, he runs straight to the shipyard.', 'Ein Junge springt von der Fähre. Mit einem Rucksack auf dem Rücken rennt er geradewegs zur Werft.']),
          nar('「おじいちゃんですか？お父さんが、{彫刻|ちょうこく|v:n2_1175}の竜の話をいつもしてくれるんです！」', ['“Are you Grandpa? Dad always tells me the story of the carved dragon!”', '„Bist du Opa? Papa erzählt mir immer die Geschichte vom geschnitzten Drachen!“']),
          l('ex_tetsuo', '……息子が、話して……おったのか。', ['…My son… talked about it?', '… Mein Sohn … hat davon erzählt?'], 'surprised'),
          l('ex_tetsuo', 'ほう、{優秀|ゆうしゅう|v:n3_1106}な目をしとる。{有能|ゆうのう|v:n3_1110}な船大工になるぞ。……{若々しい|わかわかしい|v:n2_1898}な、わしまで{若返|わかがえ}るわい。', ['Well now, you’ve got sharp eyes. You’ll make a capable boatwright. …So youthful — I feel younger myself.', 'Na so was, du hast einen scharfen Blick. Aus dir wird ein fähiger Bootsbauer. … So jugendlich — da werde ich selbst wieder jung.'], 'happy'),
        ],
        teach: ['v:n2_1009', 'v:n2_1175', 'v:n3_1106', 'v:n3_1110', 'v:n2_1898'],
      },
    ],
  },
  // ------------------------------------------------------------------ Kōji: the auctioneer without a voice
  {
    id: 'ep_ex_kouji',
    chapter: 4,
    after: 'mq15',
    who: 'ex_kouji',
    title: ['声のない競り', 'An Auction Without a Voice', 'Eine Auktion ohne Stimme'],
    summary: [
      'Kōji’s booming voice ran the fish auction for thirty years. After an operation on his throat it is gone.',
      'Kōjis dröhnende Stimme hat dreißig Jahre lang die Fischauktion geleitet. Nach einer Operation am Hals ist sie weg.',
    ],
    scenes: [
      {
        at: 'exs_market',
        goal: ['Watch the morning auction', 'Sieh dir die Morgenauktion an'],
        lines: [
          nar('朝の{漁港|ぎょこう|v:gyokou}。{鐘|かね|v:n2_0425}が鳴ると、{行列|ぎょうれつ|v:n2_0510}ができる。でも、競りの声が聞こえない。', ['The fishing port in the morning. When the bell rings, a line forms. But there’s no voice calling the auction.', 'Der Fischerhafen am Morgen. Als die Glocke läutet, bildet sich eine Schlange. Aber man hört keine Stimme, die die Auktion leitet.']),
          nar('若い{競|せ}り{人|にん}が、小さな声で値段を言う。だれも聞いていない。買い手は{無視|むし|v:n3_1032}して、{文句|もんく|v:n3_1086}ばかり言っている。', ['A young auctioneer calls the prices in a small voice. Nobody is listening. The buyers ignore him and do nothing but complain.', 'Ein junger Auktionator ruft die Preise mit leiser Stimme. Niemand hört zu. Die Käufer ignorieren ihn und beschweren sich nur.']),
          nar('{浩二|こうじ}さんは、{市場|いちば}の{隅|すみ}で、{札|ふだ|v:n3_0991}を{握|にぎ}りしめていた。', ['Kōji stands in a corner of the market, gripping a wooden tag tightly.', 'Kōji steht in einer Ecke der Halle und hält ein Holztäfelchen fest umklammert.']),
        ],
        teach: ['v:gyokou', 'v:n2_0425', 'v:n2_0510', 'v:n3_1032', 'v:n3_1086', 'v:n3_0991'],
      },
      {
        at: 'ex_kouji',
        goal: ['Talk to Kōji with his notepad', 'Unterhalte dich mit Kōji über seinen Notizblock'],
        lines: [
          nar('浩二さんは、{メモ||v:n3_1053}に{文字|もじ|v:n3_1066}を書いて見せた。「{手術|しゅじゅつ}は成功。でも、声はもう戻らない」', ['Kōji writes on his notepad and shows you: “The operation was a success. But my voice won’t come back.”', 'Kōji schreibt auf seinen Notizblock und zeigt es dir: „Die Operation war ein Erfolg. Aber meine Stimme kommt nicht zurück.“']),
          nar('「{漁業|ぎょぎょう|v:n2_0511}の人間は、{気|き}が{荒|あら}い。{悪口|わるぐち|v:n3_1202}も言われた。{怒り|いかり|v:n3_1215}で、夜も{眠|ねむ}れない」', ['“Fishing folk are rough. They said nasty things too. I’m so angry I can’t sleep at night.”', '„Fischer sind raue Leute. Sie haben auch über mich gelästert. Vor Wut kann ich nachts nicht schlafen.“']),
          nar('「でも、{意地|いじ|v:n3_1217}がある。{水産|すいさん|v:n2_0937}の町で、三十年{競|せ}りをやってきた。{依然|いぜん|v:n3_1218}として、この{市場|いちば}が好きなんだ」', ['“But I have my pride. I’ve run auctions in this fishing town for thirty years. I still love this market.”', '„Aber ich habe meinen Stolz. Dreißig Jahre habe ich in dieser Fischerstadt Auktionen geleitet. Ich liebe diesen Markt immer noch.“']),
        ],
        teach: ['v:n3_1053', 'v:n3_1066', 'v:n2_0511', 'v:n3_1202', 'v:n3_1215', 'v:n3_1217', 'v:n2_0937', 'v:n3_1218'],
      },
      {
        at: 'exs_market',
        goal: ['See the new auction', 'Sieh dir die neue Auktion an'],
        music: 'memory',
        lines: [
          nar('次の朝。市場の真ん中に、大きな黒板が立っていた。浩二さんが、{記号|きごう|v:n2_0481}と数字を書いていく。', ['The next morning, a big blackboard stands in the middle of the market. Kōji writes symbols and numbers on it.', 'Am nächsten Morgen steht ein großes Tafelbrett mitten in der Halle. Kōji schreibt Zeichen und Zahlen darauf.']),
          nar('若い競り人が、その数字を大きな声で読む。浩二さんが{判子|はんこ|v:n2_1467}を{押す|おす}。二人で、一人の競り人だ。', ['The young auctioneer reads the numbers out loud. Kōji presses his seal. Together the two of them are one auctioneer.', 'Der junge Auktionator liest die Zahlen laut vor. Kōji drückt seinen Stempel darauf. Zu zweit sind sie ein Auktionator.']),
          nar('「{要するに|ようするに|v:n3_1129}、声がなくても、{冷静|れいせい|v:n3_1176}な目があればいい」……浩二さんのメモに、市場じゅうから{笑い|わらい|v:n3_1200}が起きた。', ['“In short: even without a voice, a cool head and good eyes are enough.” …Kōji’s note sets the whole market laughing.', '„Kurz gesagt: Auch ohne Stimme reichen ein kühler Kopf und gute Augen.“ … Kōjis Zettel bringt die ganze Halle zum Lachen.']),
          nar('「{率直|そっちょく|v:n2_1071}に言う。ありがとう」……最後のメモには、そう書いてあった。', ['“To be frank: thank you.” …That’s what his last note says.', '„Ganz ehrlich: Danke.“ … Das steht auf seinem letzten Zettel.']),
        ],
        teach: ['v:n2_0481', 'v:n2_1467', 'v:n3_1129', 'v:n3_1176', 'v:n3_1200', 'v:n2_1071'],
      },
    ],
  },
  // ------------------------------------------------------------------ Ms. Natsumi: a school of two
  {
    id: 'ep_ex_natsumi',
    chapter: 4,
    after: 'mq15',
    who: 'ex_natsumi',
    title: ['ふたりの卒業式', 'A Graduation for Two', 'Eine Abschlussfeier für zwei'],
    summary: [
      'The island school has only two pupils, Kaito and Mio. In spring Mio moves to the mainland. Ms. Natsumi wants to give them a proper farewell.',
      'Die Inselschule hat nur zwei Schüler, Kaito und Mio. Im Frühling zieht Mio aufs Festland. Frau Natsumi möchte ihnen einen richtigen Abschied schenken.',
    ],
    scenes: [
      {
        at: 'exs_school',
        goal: ['Visit the island school', 'Besuche die Inselschule'],
        lines: [
          l('ex_natsumi', '今日は{習字|しゅうじ|v:n2_0833}と{写生|しゃせい|v:n2_0820}の日。{文房具|ぶんぼうぐ|v:n2_1604}は、二人でぜんぶ{分|わ}け{合|あ}ってるの。', ['Today is calligraphy and sketching day. The two of them share all their stationery.', 'Heute ist Kalligrafie- und Zeichentag. Die beiden teilen sich das ganze Schreibzeug.'], 'happy'),
          l('ex_natsumi', '{遠足|えんそく|v:n2_0261}も、工場の{見学|けんがく|v:n2_0587}も、ずっと二人。{定規|じょうぎ|v:n2_0872}一本でけんかして、すぐ仲直り。', ['Excursions, factory visits — always just the two of them. They fight over a single ruler and make up straight away.', 'Ausflüge, Fabrikbesichtigungen — immer nur die beiden. Sie streiten um ein einziges Lineal und vertragen sich sofort wieder.']),
          l('ex_natsumi', '{美緒|みお}ちゃんは、春から本土の中学の{寮|りょう|v:n2_1870}に入るの。……{海斗|かいと}くんは、一人になるわ。', ['From spring, Mio is going to a junior high school dormitory on the mainland. …Kaito will be on his own.', 'Ab Frühling zieht Mio ins Wohnheim einer Mittelschule auf dem Festland. … Kaito wird allein sein.'], 'worried'),
        ],
        teach: ['v:n2_0833', 'v:n2_0820', 'v:n2_1604', 'v:n2_0261', 'v:n2_0587', 'v:n2_0872', 'v:n2_1870'],
      },
      {
        at: 'ex_natsumi',
        goal: ['Help Ms. Natsumi plan the farewell', 'Hilf Frau Natsumi, den Abschied zu planen'],
        lines: [
          l('ex_natsumi', '二人の{友情|ゆうじょう|v:n3_1108}は、{理想|りそう|v:n3_1164}みたいにきれい。だから、{別れ|わかれ|v:n3_1191}が、つらすぎるのよ。', ['The friendship between the two is as beautiful as an ideal. That’s why the parting is so painful.', 'Die Freundschaft der beiden ist so schön wie ein Ideal. Deshalb ist der Abschied so schmerzhaft.'], 'worried'),
          l('ex_natsumi', '{卒業式|そつぎょうしき}は、{各自|かくじ|v:n2_0371}が手紙を読むことにしたの。{銘々|めいめい|v:n2_1746}、自分の言葉でね。', ['At the graduation ceremony, each of them will read a letter. Each in their own words.', 'Bei der Abschlussfeier liest jeder einen Brief vor. Jeder mit seinen eigenen Worten.']),
          ask(
            ['港で見送りをしましょう', ['Let’s see her off at the harbour', 'Lass uns sie am Hafen verabschieden'], [
              l('ex_natsumi', '島のみんなで？……いいわね。船が見えなくなるまで。', ['All of the island together? …That’s lovely. Until the boat is out of sight.', 'Mit der ganzen Insel? … Wie schön. Bis das Boot nicht mehr zu sehen ist.'], 'happy'),
            ]],
            ['二人に写真を撮りましょう', ['Let’s take a photo of the two of them', 'Lass uns ein Foto von den beiden machen'], [
              l('ex_natsumi', 'ソフィアさんに頼んでみるわ。最高の一枚になるわね。', ['I’ll ask Sofia. It’ll be the best picture ever.', 'Ich frage Sofia. Das wird das beste Bild überhaupt.'], 'happy'),
            ]],
          ),
        ],
        teach: ['v:n3_1108', 'v:n3_1164', 'v:n3_1191', 'v:n2_0371', 'v:n2_1746'],
      },
      {
        at: 'ex_natsumi',
        goal: ['Be at the harbour for Mio’s departure', 'Sei am Hafen, wenn Mio abfährt'],
        music: 'memory',
        lines: [
          nar('{港|みなと}。島じゅうの人が、{見送り|みおくり|v:n3_1010}に来ている。海斗くんが、一歩前に出た。', ['The harbour. The whole island has come to see her off. Kaito steps forward.', 'Der Hafen. Die ganze Insel ist gekommen, um sie zu verabschieden. Kaito tritt einen Schritt vor.']),
          nar('「美緒は、ぼくの一番の{友人|ゆうじん|v:n3_1109}です。{留学|りゅうがく|v:n3_1166}みたいに{遠|とお}くても、ぼくは{勇気|ゆうき|v:n3_1103}を出して、毎週手紙を書きます」', ['“Mio is my best friend. Even if she’s as far away as studying abroad, I’ll be brave and write every week.”', '„Mio ist meine beste Freundin. Auch wenn sie so weit weg ist wie bei einem Auslandsstudium, nehme ich allen Mut zusammen und schreibe jede Woche.“']),
          nar('「{お元気で|おげんきで|v:n2_0291}！」……美緒ちゃんの声が、{汽笛|きてき}に{混|ま}じって聞こえた。', ['“Take care!” …Mio’s voice mingles with the ship’s horn.', '„Mach’s gut!“ … Mios Stimme mischt sich in das Tuten des Schiffs.']),
          l('ex_natsumi', '教師の{喜び|よろこび|v:n3_1152}って、こういうことね。子どもが、自分の力で前に進むのを見ること。', ['So this is a teacher’s joy. Watching a child move forward on their own strength.', 'Das ist also die Freude einer Lehrerin. Zu sehen, wie ein Kind aus eigener Kraft vorwärtsgeht.'], 'happy'),
        ],
        teach: ['v:n3_1010', 'v:n3_1109', 'v:n3_1166', 'v:n3_1103', 'v:n2_0291', 'v:n3_1152'],
      },
    ],
  },
  // ------------------------------------------------------------------ Grandma Tomi: the last dive
  {
    id: 'ep_ex_tomi',
    chapter: 4,
    after: 'mq15',
    who: 'ex_tomi',
    title: ['最後の潜り', 'The Last Dive', 'Der letzte Tauchgang'],
    summary: [
      'Tomi has dived for abalone as an ama for sixty years. Today she goes into the sea for the last time.',
      'Tomi taucht seit sechzig Jahren als Ama nach Abalonen. Heute geht sie zum letzten Mal ins Meer.',
    ],
    scenes: [
      {
        at: 'ex_tomi',
        goal: ['Talk to Tomi on the beach', 'Sprich mit Tomi am Strand'],
        lines: [
          l('ex_tomi', '十五の時から、この{海洋|かいよう|v:n2_0360}で{潜って|もぐって}きた。息を止めて、一分。{胸|むね|v:n3_1040}が{苦|くる}しくなっても、まだ{探る|さぐる|v:n2_0717}。', ['I’ve dived in this sea since I was fifteen. Hold your breath, one minute. Even when your chest hurts, you keep searching.', 'Seit ich fünfzehn bin, tauche ich in diesem Meer. Luft anhalten, eine Minute. Auch wenn die Brust schmerzt, sucht man weiter.']),
          l('ex_tomi', '海の中は、{透き通って|すきとおって|v:n2_0960}おる。{日差し|ひざし|v:n2_1491}が、{粒|つぶ|v:n2_1217}みたいに光るんじゃ。', ['Under the sea, the water is crystal clear. The sunlight sparkles like tiny grains.', 'Unter Wasser ist alles glasklar. Das Sonnenlicht funkelt wie winzige Körnchen.'], 'happy'),
          l('ex_tomi', 'あわびを{捕る|とる|v:n2_1332}のは、{身|み|v:n3_1008}一つ。道具なんか、要らんのよ。', ['To catch abalone, all you need is your own body. No tools required.', 'Um Abalonen zu fangen, braucht man nur den eigenen Körper. Werkzeug braucht es keins.']),
        ],
        teach: ['v:n2_0360', 'v:n3_1040', 'v:n2_0717', 'v:n2_0960', 'v:n2_1491', 'v:n2_1217', 'v:n2_1332', 'v:n3_1008'],
      },
      {
        at: 'exs_house',
        goal: ['Visit Tomi’s house before the dive', 'Besuche Tomis Haus vor dem Tauchgang'],
        lines: [
          nar('{網|あみ}を{干|ほ}した家の前で、若い女の子が{稽古|けいこ|v:n2_0555}をしている。息を止めて、じっと海を見ている。', ['In front of the house with the nets hung out, a young girl is practising. Holding her breath, she stares at the sea.', 'Vor dem Haus mit den aufgehängten Netzen übt ein junges Mädchen. Sie hält die Luft an und starrt aufs Meer.']),
          l('ex_tomi', 'わしの{孫|まご}じゃ。{陽気|ようき|v:n3_1125}な子でな。「おばあちゃんの{跡|あと}を{継|つ}ぐ」と言うて、きかんのよ。', ['My granddaughter. A cheerful girl. She keeps saying, “I’ll follow in Grandma’s footsteps,” and won’t listen.', 'Meine Enkelin. Ein fröhliches Mädchen. Sie sagt immer: „Ich trete in Omas Fußstapfen“, und lässt sich nicht davon abbringen.'], 'happy'),
          l('ex_tomi', '{老人|ろうじん|v:n3_1182}の{仕事|しごと}じゃと思うとった。……じゃが、海は、若い者にもちゃんと{湧く|わく|v:n3_1194}もんを{与|あた}えてくれる。', ['I thought it was work for old folk. …But the sea gives young people something that wells up in them too.', 'Ich dachte, das sei Arbeit für Alte. … Aber das Meer schenkt auch jungen Leuten etwas, das in ihnen aufquillt.']),
        ],
        teach: ['v:n2_0555', 'v:n3_1125', 'v:n3_1182', 'v:n3_1194'],
      },
      {
        at: 'ex_tomi',
        goal: ['Watch Tomi’s last dive', 'Sieh Tomis letztem Tauchgang zu'],
        music: 'memory',
        lines: [
          nar('{潮|しお}が{満ちる|みちる|v:n3_1014}朝。トミさんと孫が、二人で海に入った。浜では、島の人たちが{舟歌|ふなうた|v:funauta}を歌っている。', ['A morning of high tide. Tomi and her granddaughter go into the sea together. On the beach, the islanders are singing a boat song.', 'Ein Morgen bei Flut. Tomi und ihre Enkelin gehen gemeinsam ins Meer. Am Strand singen die Inselleute ein Bootslied.']),
          nar('一分後。二人が、同時に{顔|かお}を出した。孫の手に、大きなあわびが光っている。', ['A minute later, both surface at the same moment. In the granddaughter’s hand, a large abalone gleams.', 'Eine Minute später tauchen beide gleichzeitig auf. In der Hand der Enkelin glänzt eine große Abalone.']),
          l('ex_tomi', 'ほう……{最高|さいこう|v:n3_0960}の{一つ|ひとつ}じゃ。これで、安心して{陸|りく}に{上|あ}がれるわい。', ['Well, well… a perfect one. Now I can come ashore with peace of mind.', 'Na so was … ein prächtiges Stück. Jetzt kann ich beruhigt an Land gehen.'], 'happy'),
          l('ex_tomi', '六十年分の海が、{懐かしさ|なつかしさ|v:natsukashii_kioku}でいっぱいじゃ。……{豊か|ゆたか|v:n3_1117}な{一生|いっしょう}じゃったのう。', ['Sixty years of sea, all full of nostalgia. …It has been a rich life.', 'Sechzig Jahre Meer, voller Wehmut. … Es war ein reiches Leben.'], 'happy'),
        ],
        teach: ['v:n3_1014', 'v:funauta', 'v:n3_0960', 'v:natsukashii_kioku', 'v:n3_1117'],
      },
    ],
  },
  // ------------------------------------------------------------------ Takumi: the angler who ran away
  {
    id: 'ep_ex_takumi',
    chapter: 4,
    after: 'mq16',
    who: 'ex_takumi',
    title: ['逃げてきた釣り人', 'The Angler Who Ran Away', 'Der Angler, der weggelaufen ist'],
    summary: [
      'Takumi collapsed from overwork in Tokyo and fled to the island. Now his old company calls: they want him back.',
      'Takumi ist in Tokio vor Überarbeitung zusammengebrochen und auf die Insel geflohen. Jetzt ruft seine alte Firma an: Sie wollen ihn zurück.',
    ],
    scenes: [
      {
        at: 'ex_takumi',
        goal: ['Talk to Takumi on the quay', 'Sprich mit Takumi am Kai'],
        lines: [
          l('ex_takumi', '東京では、{平日|へいじつ|v:n2_1611}は毎晩{夜中|よなか|v:n3_1142}まで{労働|ろうどう|v:n3_1183}。週末は{出張|しゅっちょう|v:n2_0853}。{日程|にってい|v:n2_1378}は、いつもぎゅうぎゅうでした。', ['In Tokyo I worked until midnight every weekday. Weekends were business trips. My schedule was always packed.', 'In Tokio habe ich an Wochentagen jeden Abend bis Mitternacht gearbeitet. Am Wochenende Geschäftsreisen. Mein Terminplan war immer vollgestopft.']),
          l('ex_takumi', '{余裕|よゆう|v:n3_1149}なんて、一秒もなかった。ある朝、駅のホームで{倒れて|たおれて}……気がついたら、病院でした。', ['I didn’t have a second to spare. One morning I collapsed on the station platform… and woke up in hospital.', 'Ich hatte keine Sekunde Luft. Eines Morgens bin ich auf dem Bahnsteig zusammengebrochen … und im Krankenhaus aufgewacht.'], 'worried'),
          l('ex_takumi', '会社を{辞めて|やめて|v:n3_1100}、気がついたら、この島で釣りをしてました。今は、{呑気|のんき|v:n2_1409}なもんです。', ['I quit the company, and the next thing I knew, I was fishing on this island. Now I take life easy.', 'Ich habe gekündigt, und ehe ich mich versah, angelte ich auf dieser Insel. Jetzt lebe ich ganz gemütlich.'], 'happy'),
        ],
        teach: ['v:n2_1611', 'v:n3_1142', 'v:n3_1183', 'v:n2_0853', 'v:n2_1378', 'v:n3_1149', 'v:n3_1100', 'v:n2_1409'],
      },
      {
        at: 'ex_takumi',
        goal: ['Ask Takumi about the phone call', 'Frag Takumi nach dem Anruf'],
        lines: [
          l('ex_takumi', '前の会社から電話が来ました。「{予算|よさん|v:n3_1137}がついたから、もう一度{雇う|やとう|v:n3_1096}。{給料|きゅうりょう}も上げる」って。', ['My old company called. “We’ve got the budget now, so we’ll hire you again. With a raise,” they said.', 'Meine alte Firma hat angerufen. „Wir haben jetzt das Budget, wir stellen dich wieder ein. Mit Gehaltserhöhung“, sagten sie.']),
          l('ex_takumi', '{世の中|よのなか|v:n3_1143}の{常識|じょうしき}なら、戻るべきなんでしょう。島にいるのは、{わがまま||v:n3_1190}で、{無駄|むだ|v:n3_1038}な時間かもしれない。', ['By the world’s common sense, I should go back. Staying on the island may be selfish — a waste of time.', 'Nach dem gesunden Menschenverstand der Welt sollte ich zurückgehen. Auf der Insel zu bleiben ist vielleicht egoistisch — verschwendete Zeit.'], 'worried'),
          l('ex_takumi', '{寧ろ|むしろ|v:n3_1035}、{物事|ものごと|v:n3_1083}を{理解|りかい|v:n3_1160}するのに、時間が要るんです。……自分が、何をしたいのか。', ['If anything, I need time to understand things. …What it is I actually want to do.', 'Eher brauche ich Zeit, um die Dinge zu verstehen. … Was ich eigentlich tun will.']),
        ],
        teach: ['v:n3_1137', 'v:n3_1096', 'v:n3_1143', 'v:n3_1190', 'v:n3_1038', 'v:n3_1035', 'v:n3_1083', 'v:n3_1160'],
      },
      {
        at: 'ex_takumi',
        goal: ['Hear Takumi’s answer', 'Hör dir Takumis Antwort an'],
        music: 'memory',
        lines: [
          l('ex_takumi', '断りました。……{もったいない||v:n3_1072}って、みんなに言われましたけど。', ['I turned it down. …Everyone says it’s a waste, though.', 'Ich habe abgelehnt. … Auch wenn alle sagen, das sei eine Verschwendung.']),
          l('ex_takumi', '{漁協|ぎょきょう}のさおりさんに、パソコンの仕事を{頼|たの}まれたんです。島の魚を、ネットで売る仕事。{張り切って|はりきって|v:n2_1463}ますよ。', ['Saori from the co-op asked me to do some computer work for her. Selling the island’s fish online. I’m really fired up.', 'Saori von der Genossenschaft hat mich um Computerarbeit gebeten. Den Fisch der Insel online verkaufen. Ich bin voller Tatendrang.'], 'happy'),
          l('ex_takumi', '{めっきり||v:n2_1755}{顔色|かおいろ}がよくなった、って言われます。{用心|ようじん|v:n3_1127}して、今度は、休むことも仕事にします。', ['People say I look noticeably healthier. I’ll be careful — this time, resting will be part of the job too.', 'Die Leute sagen, ich sehe deutlich gesünder aus. Ich bin vorsichtig — diesmal gehört auch das Ausruhen zur Arbeit.'], 'happy'),
        ],
        teach: ['v:n3_1072', 'v:n2_1463', 'v:n2_1755', 'v:n3_1127'],
      },
    ],
  },
  // ------------------------------------------------------------------ Dr. Morikawa: the doctor of the clinic boat
  {
    id: 'ep_ex_morikawa',
    chapter: 4,
    after: 'mq16',
    who: 'ex_morikawa',
    title: ['診療船の医者', 'The Doctor on the Clinic Boat', 'Der Arzt auf dem Praxisboot'],
    summary: [
      'Dr. Morikawa sails from island to island to care for the sick. His own daughter is ill at home — and he is far away.',
      'Dr. Morikawa fährt von Insel zu Insel, um Kranke zu versorgen. Seine eigene Tochter ist zu Hause krank — und er ist weit weg.',
    ],
    scenes: [
      {
        at: 'exs_clinic',
        goal: ['Visit the island clinic', 'Besuche die Inselpraxis'],
        lines: [
          l('ex_morikawa', '{医院|いいん|v:n3_1214}といっても、{部屋|へや}は一つだけ。{消毒|しょうどく|v:n2_0886}の{匂い|におい}がする、小さな{診療所|しんりょうじょ}です。', ['It’s called a clinic, but it has only one room. A little practice that smells of disinfectant.', 'Es heißt zwar Praxis, hat aber nur einen Raum. Eine kleine Praxis, die nach Desinfektionsmittel riecht.']),
          l('ex_morikawa', '今日は、子どもたちの{虫歯|むしば|v:n3_1034}の{予防|よぼう|v:n3_1146}と、お年寄りの{見舞い|みまい|v:n3_1017}。{風邪|かぜ}が{長引いて|ながびいて|v:n2_1339}いる人もいます。', ['Today: preventing tooth decay for the children and calling on the elderly. Some people have colds that have dragged on.', 'Heute: Kariesvorsorge für die Kinder und Besuche bei den Alten. Manche haben eine Erkältung, die sich hinzieht.']),
          l('ex_morikawa', '船が{酔う|よう|v:n3_1122}ほど{揺|ゆ}れる日も、行きます。待っている人が、いるので。', ['I go even on days when the boat rocks so much I get seasick. Because there are people waiting.', 'Ich fahre auch an Tagen, an denen das Boot so schaukelt, dass mir übel wird. Weil Leute auf mich warten.']),
        ],
        teach: ['v:n3_1214', 'v:n2_0886', 'v:n3_1034', 'v:n3_1146', 'v:n3_1017', 'v:n2_1339', 'v:n3_1122'],
      },
      {
        at: 'ex_morikawa',
        goal: ['Talk to Dr. Morikawa during the storm', 'Sprich während des Sturms mit Dr. Morikawa'],
        evening: true,
        lines: [
          nar('{嵐|あらし}の夜。島は{停電|ていでん|v:n2_1240}して、{断水|だんすい|v:n2_1141}もしている。{電池|でんち|v:n2_1271}のライトだけが光っている。', ['A stormy night. The island has a power cut, and the water is off too. Only battery lights glow.', 'Eine Sturmnacht. Auf der Insel ist der Strom ausgefallen, das Wasser ebenfalls. Nur Batterielampen leuchten.']),
          l('ex_morikawa', '……妻から電話でした。娘が熱を出して、{様子|ようす|v:n3_1128}がおかしいと。でも、この{嵐|あらし}では、船は出ない。', ['…That was my wife on the phone. Our daughter has a fever and isn’t herself. But in this storm, no boat can sail.', '… Das war meine Frau am Telefon. Unsere Tochter hat Fieber und wirkt seltsam. Aber bei diesem Sturm fährt kein Boot.'], 'worried'),
          l('ex_morikawa', '{申し訳|もうしわけ|v:n3_1061}ない。他人の子どもは{診|み}られるのに、自分の子は……。父親の{役割|やくわり|v:n3_1092}を、何も{果|は}たしていない。', ['I feel so sorry. I can examine other people’s children, but my own… I’m not fulfilling a father’s role at all.', 'Es tut mir so leid. Fremde Kinder kann ich untersuchen, aber mein eigenes … Ich erfülle die Rolle eines Vaters überhaupt nicht.'], 'worried'),
        ],
        teach: ['v:n2_1240', 'v:n2_1141', 'v:n2_1271', 'v:n3_1128', 'v:n3_1061', 'v:n3_1092'],
      },
      {
        at: 'ex_morikawa',
        goal: ['Hear about the morning after the storm', 'Hör, was am Morgen nach dem Sturm geschah'],
        music: 'memory',
        lines: [
          l('ex_morikawa', '{夜中|よなか}に、娘とビデオ電話をしました。妻の{携帯|けいたい}で、熱を{測|はか}って、薬の{量|りょう}を{教|おし}えて。', ['In the middle of the night I video-called my daughter. On my wife’s phone, we took her temperature and I told them how much medicine to give.', 'Mitten in der Nacht habe ich mit meiner Tochter videotelefoniert. Über das Handy meiner Frau haben wir Fieber gemessen, und ich habe die Medikamentendosis gesagt.']),
          l('ex_morikawa', '{簡単|かんたん}じゃなかった。でも、{有効|ゆうこう|v:n3_1105}な方法でした。娘は、朝には{笑って|わらって}いました。', ['It wasn’t easy. But it worked. By morning my daughter was laughing.', 'Es war nicht einfach. Aber es hat funktioniert. Am Morgen hat meine Tochter gelacht.'], 'happy'),
          l('ex_morikawa', '「パパ、{島|しま}の子もちゃんと{治|なお}してね」と。……{容易|ようい|v:n3_1123}な仕事じゃないけど、続けます。来週は、娘を{迎え|むかえ|v:n3_1028}に行って、島を見せるんです。', ['“Daddy, make the island children better too,” she said. …It’s not an easy job, but I’ll keep at it. Next week I’ll go and fetch her and show her the island.', '„Papa, mach die Inselkinder auch gesund“, sagte sie. … Leicht ist die Arbeit nicht, aber ich mache weiter. Nächste Woche hole ich sie ab und zeige ihr die Insel.'], 'happy'),
        ],
        teach: ['v:n3_1105', 'v:n3_1123', 'v:n3_1028'],
      },
    ],
  },
  // ------------------------------------------------------------------ Yumi: the son who wants to leave
  {
    id: 'ep_ex_yumi',
    chapter: 4,
    after: 'mq16',
    who: 'ex_yumi',
    title: ['島を出る息子', 'The Son Who Wants to Leave', 'Der Sohn, der gehen will'],
    summary: [
      'Yumi runs the guesthouse alone. Her son wants to leave the island for the city — just as his father once did.',
      'Yumi führt die Pension allein. Ihr Sohn will die Insel verlassen und in die Stadt gehen — genau wie einst sein Vater.',
    ],
    scenes: [
      {
        at: 'exs_guesthouse',
        goal: ['Have dinner at the guesthouse', 'Iss in der Pension zu Abend'],
        lines: [
          nar('{宿|やど|v:n3_1095}の夕ごはん。{茹でた|ゆでた|v:n3_1118}{豆|まめ|v:n3_1000}と、{皮|かわ}を{剥いた|むいた|v:n3_1030}{夏|なつ}みかん。{椀|わん|v:n3_1205}の中で、{潮汁|うしおじる}が{匂って|におって|v:n2_1367}いる。', ['Dinner at the inn. Boiled beans and peeled summer oranges. In the bowl, clear fish soup gives off its aroma.', 'Abendessen in der Herberge. Gekochte Bohnen und geschälte Sommerorangen. In der Schale duftet eine klare Fischsuppe.']),
          l('ex_yumi', 'お{客|きゃく}さんの{好み|このみ|v:n3_0937}に合わせて、{胡椒|こしょう|v:n3_0923}も置いてあるわ。息子は、パンのほうを{好む|このむ|v:n3_0938}けどね。', ['I keep pepper out for guests’ tastes. My son prefers bread, though.', 'Für den Geschmack der Gäste steht auch Pfeffer bereit. Mein Sohn mag allerdings lieber Brot.']),
          l('ex_yumi', '{小麦|こむぎ|v:n3_0942}{粉|こ}から、毎朝焼いてるのよ。……あの子、{都|みやこ|v:n3_1019}のパン屋で働きたいんだって。', ['I bake it every morning from wheat flour. …He wants to work at a bakery in the capital, he says.', 'Ich backe es jeden Morgen aus Weizenmehl. … Er will in einer Bäckerei in der Hauptstadt arbeiten, sagt er.'], 'worried'),
        ],
        teach: ['v:n3_1095', 'v:n3_1118', 'v:n3_1000', 'v:n3_1030', 'v:n3_1205', 'v:n2_1367', 'v:n3_0937', 'v:n3_0923', 'v:n3_0938', 'v:n3_0942', 'v:n3_1019'],
      },
      {
        at: 'ex_yumi',
        goal: ['Talk to Yumi after dinner', 'Sprich nach dem Essen mit Yumi'],
        lines: [
          l('ex_yumi', '夫も、{都会|とかい}の{流行|りゅうこう|v:n3_1167}と{魅力|みりょく|v:n3_1023}に{惹|ひ}かれて、島を出たの。そのまま、{離婚|りこん|v:n3_1163}よ。', ['My husband was drawn by city fashions and charms and left the island too. It ended in divorce.', 'Auch mein Mann ließ sich vom Trend und Reiz der Stadt locken und verließ die Insel. Es endete mit der Scheidung.'], 'worried'),
          l('ex_yumi', '{嫁|よめ|v:n3_1148}に来て、二十年。夫のことは、もう{許した|ゆるした|v:n3_1119}わ。でも、息子まで……。', ['Twenty years since I married into this family. I’ve forgiven my husband. But my son as well…', 'Zwanzig Jahre ist es her, dass ich hier eingeheiratet habe. Meinem Mann habe ich verziehen. Aber jetzt auch noch mein Sohn …'], 'worried'),
          l('ex_yumi', '{日帰り|ひがえり|v:n2_1478}で行ける{距離|きょり}じゃないもの。{引き返して|ひきかえして|v:n2_1483}ほしいなんて、言えないけど。', ['It’s not a distance you can manage as a day trip. I can’t tell him I want him to turn back, though.', 'Das ist keine Entfernung für einen Tagesausflug. Aber ich kann ihm nicht sagen, dass er umkehren soll.']),
        ],
        teach: ['v:n3_1167', 'v:n3_1023', 'v:n3_1163', 'v:n3_1148', 'v:n3_1119', 'v:n2_1478', 'v:n2_1483'],
      },
      {
        at: 'ex_yumi',
        goal: ['See Yumi’s son off', 'Verabschiede Yumis Sohn'],
        music: 'memory',
        lines: [
          nar('出発の朝。息子さんが、大きな{土産|みやげ|v:n3_1018}の{袋|ふくろ}を持って立っている。「これ、母さんの{夏|なつ}みかんジャム。東京の店で、出してみる」', ['The morning of departure. Her son stands holding a large bag of souvenirs. “This is Mum’s summer-orange jam. I’ll try selling it at the shop in Tokyo.”', 'Der Morgen der Abreise. Ihr Sohn steht mit einer großen Tüte Mitbringsel da. „Das ist Mamas Sommerorangen-Marmelade. Ich versuche, sie im Laden in Tokio anzubieten.“']),
          nar('「父さんとは{違う|ちがう}。ぼくは、島のパンを{都会|とかい}に持っていくんだ。……いつか、ここで店を開くために」', ['“I’m not like Dad. I’m taking the island’s bread to the city. …So I can open a shop here someday.”', '„Ich bin nicht wie Papa. Ich bringe das Brot der Insel in die Stadt. … Damit ich eines Tages hier einen Laden aufmachen kann.“']),
          l('ex_yumi', '……ジャム、{こぼさない||v:n3_0939}ように持っていきなさいよ。', ['…Carry the jam carefully, so you don’t spill it.', '… Trag die Marmelade vorsichtig, damit du sie nicht verschüttest.'], 'happy'),
          l('ex_yumi', '{向かい|むかい|v:n3_1027}の{本土|ほんど}は、思ったより近いのね。……{行って|いって}らっしゃい。', ['The mainland across the water is closer than I thought. …Off you go, and come back.', 'Das Festland gegenüber ist näher, als ich dachte. … Geh nur, und komm wieder.'], 'happy'),
        ],
        teach: ['v:n3_1018', 'v:n3_0939', 'v:n3_1027'],
      },
    ],
  },
  // ------------------------------------------------------------------ Sofia: the photo of her grandfather
  {
    id: 'ep_ex_sofia',
    chapter: 4,
    after: 'mq17',
    who: 'ex_sofia',
    title: ['祖父の一枚', 'Grandfather’s Photograph', 'Großvaters Foto'],
    summary: [
      'Sofia, a photographer from Europe, is searching for the place in an old photo her grandfather left her — a sailor who once stopped at Shiomi.',
      'Sofia, eine Fotografin aus Europa, sucht den Ort auf einem alten Foto, das ihr Großvater ihr hinterlassen hat — ein Seemann, der einst in Shiomi Halt machte.',
    ],
    scenes: [
      {
        at: 'ex_sofia',
        goal: ['Talk to Sofia at the lookout', 'Sprich mit Sofia am Aussichtspunkt'],
        lines: [
          l('ex_sofia', '{祖父|そふ}は船乗りでした。{ヨーロッパ||v:n3_1133}から{東洋|とうよう|v:n2_1300}まで、たくさんの{国境|こっきょう|v:n3_0929}を{越え|こえ}たんです。', ['My grandfather was a sailor. From Europe to the Orient, he crossed many borders.', 'Mein Großvater war Seemann. Von Europa bis in den Osten hat er viele Grenzen überquert.']),
          l('ex_sofia', 'この写真の{裏|うら}に、{地名|ちめい|v:n2_1162}が書いてあります。でも、字が{異なる|ことなる|v:n3_0933}んです。今の地図にない名前。', ['On the back of this photo there’s a place name. But the characters are different. A name that isn’t on today’s maps.', 'Auf der Rückseite dieses Fotos steht ein Ortsname. Aber die Schriftzeichen sind anders. Ein Name, der auf heutigen Karten nicht steht.']),
          l('ex_sofia', '{日本|にほん}{列島|れっとう|v:n2_1884}の、{南|みなみ}の{方面|ほうめん|v:n2_1641}だと思うんですけど……。', ['I think it’s somewhere in the south of the Japanese archipelago…', 'Ich glaube, es liegt irgendwo im Süden des japanischen Inselbogens …']),
        ],
        teach: ['v:n3_1133', 'v:n2_1300', 'v:n3_0929', 'v:n2_1162', 'v:n3_0933', 'v:n2_1884', 'v:n2_1641'],
      },
      {
        at: 'ex_sofia',
        goal: ['Look for the place in the photo with Sofia', 'Such mit Sofia den Ort auf dem Foto'],
        lines: [
          l('ex_sofia', '写真には、岩の{模様|もよう|v:n3_1085}と、白い{矢印|やじるし|v:n2_1801}が見えます。{妙|みょう|v:n3_1020}でしょう？', ['In the photo you can see a pattern on the rock and a white arrow. Strange, isn’t it?', 'Auf dem Foto sieht man ein Muster auf dem Felsen und einen weißen Pfeil. Seltsam, oder?']),
          l('ex_sofia', '島のおばあさんが{訳して|やくして|v:n3_1091}くれました。この字は「{境|さかい|v:n3_0970}の岩」。島の{地点|ちてん|v:n2_1161}で、海と陸の{境|さかい}にある岩です。', ['An old lady on the island translated it for me. These characters mean “the boundary rock” — a rock on the island where sea meets land.', 'Eine alte Frau auf der Insel hat es mir übersetzt. Die Zeichen bedeuten „Grenzfels“ — ein Felsen auf der Insel, wo Meer und Land sich treffen.']),
          l('ex_sofia', '{予期|よき|v:n3_1134}しなかった。こんなに近くにあったなんて……あの{岬|みさき}の{手前|てまえ|v:n2_1261}です！', ['I never expected it. To think it was this close… it’s just this side of the cape!', 'Das hätte ich nie erwartet. Dass es so nah ist … es ist direkt vor dem Kap!'], 'surprised'),
        ],
        teach: ['v:n3_1085', 'v:n2_1801', 'v:n3_1020', 'v:n3_1091', 'v:n3_0970', 'v:n2_1161', 'v:n3_1134', 'v:n2_1261'],
      },
      {
        at: 'ex_sofia',
        goal: ['See Sofia’s photograph', 'Sieh dir Sofias Foto an'],
        music: 'memory',
        lines: [
          nar('{境|さかい}の岩の上。白い矢印の下に、古い{英語|えいご}の{文字|もじ}が{彫|ほ}ってあった。「ここで、優しい島の人に助けられた」', ['On top of the boundary rock. Under the white arrow, old English letters are carved: “Here, kind islanders saved me.”', 'Oben auf dem Grenzfelsen. Unter dem weißen Pfeil sind alte englische Buchstaben eingeritzt: „Hier haben mich freundliche Inselbewohner gerettet.“']),
          l('ex_sofia', '祖父の船は、{嵐|あらし}でこの島に{流|なが}れ{着|つ}いたんです。島の人が、{通訳|つうやく|v:n2_1203}もなしに、言葉の{代|か}わりに、ご飯をくれた。', ['Grandfather’s ship drifted to this island in a storm. The islanders, without any interpreter, gave him food instead of words.', 'Großvaters Schiff wurde im Sturm an diese Insel getrieben. Die Inselleute haben ihm ohne Dolmetscher statt Worten Essen gegeben.']),
          l('ex_sofia', '祖父のような{作家|さっか|v:n3_0992}にはなれないけど、わたしは写真で、この島の{物語|ものがたり}を残します。{鑑賞|かんしょう|v:n2_0456}する人が、島を{連想|れんそう|v:n3_1180}できるように。', ['I can’t be a writer like Grandfather, but I’ll keep this island’s story alive in photographs. So that those who look at them think of the island.', 'Ich kann keine Schriftstellerin werden wie Großvater, aber ich halte die Geschichte dieser Insel in Fotos fest. Damit jeder, der sie betrachtet, an die Insel denkt.'], 'happy'),
        ],
        teach: ['v:n2_1203', 'v:n3_0992', 'v:n2_0456', 'v:n3_1180'],
      },
    ],
  },
  // ------------------------------------------------------------------ Saori: the limits on the catch
  {
    id: 'ep_ex_saori',
    chapter: 4,
    after: 'mq17',
    who: 'ex_saori',
    title: ['漁獲量の話', 'The Talk About the Catch', 'Das Gespräch über die Fangmenge'],
    summary: [
      'Saori works in the fisheries co-op. She has to tell the fishermen that their catch is to be limited — the fishermen who raised her.',
      'Saori arbeitet bei der Fischereigenossenschaft. Sie muss den Fischern sagen, dass ihre Fangmenge begrenzt wird — den Fischern, die sie großgezogen haben.',
    ],
    scenes: [
      {
        at: 'exs_coop',
        goal: ['Visit the co-op office', 'Besuche das Büro der Genossenschaft'],
        lines: [
          l('ex_saori', 'このグラフを見て。魚の{量|りょう|v:n3_1168}が、十年で半分。{予測|よそく|v:n3_1140}では、あと五年で{最低|さいてい|v:n3_0964}になるの。', ['Look at this chart. The amount of fish has halved in ten years. The forecast says it will hit its lowest in five more years.', 'Sieh dir dieses Diagramm an. Die Fischmenge hat sich in zehn Jahren halbiert. Laut Prognose erreicht sie in fünf Jahren den Tiefststand.'], 'worried'),
          l('ex_saori', '{要点|ようてん|v:n3_1131}は一つ。海の{循環|じゅんかん|v:n2_0857}を守ること。そのために、{漁獲|ぎょかく}を{縮小|しゅくしょう|v:n2_0847}しなきゃいけない。', ['There’s only one key point: protecting the sea’s cycle. For that, the catch has to be reduced.', 'Es gibt nur einen Kernpunkt: den Kreislauf des Meeres zu schützen. Dafür muss der Fang verringert werden.']),
          l('ex_saori', '{漁師|りょうし}さんたちは、きっと{逆らう|さからう|v:n3_0971}わ。海は、みんなの{財産|ざいさん|v:n3_0961}だから。', ['The fishermen will surely resist. Because the sea is everyone’s fortune.', 'Die Fischer werden sich bestimmt widersetzen. Denn das Meer ist ihr aller Vermögen.']),
        ],
        teach: ['v:n3_1168', 'v:n3_1140', 'v:n3_0964', 'v:n3_1131', 'v:n2_0857', 'v:n2_0847', 'v:n3_0971', 'v:n3_0961'],
      },
      {
        at: 'exs_coop',
        goal: ['Go to the fishermen’s meeting', 'Geh zur Versammlung der Fischer'],
        lines: [
          nar('{話し合い|はなしあい|v:n2_1448}は、すぐに{論争|ろんそう|v:n3_1186}になった。会場は{混乱|こんらん|v:n3_0956}している。', ['The discussion soon turns into an argument. The meeting hall is in chaos.', 'Die Besprechung wird schnell zum Streit. Im Saal herrscht Durcheinander.']),
          nar('「{大型|おおがた}の船だけが{有利|ゆうり|v:n3_1113}になる！」「小さい船との{差|さ|v:n3_0957}が広がるぞ！」', ['“Only the big boats will gain from this!” “The gap with the small boats will grow!”', '„Nur die großen Boote profitieren davon!“ „Der Abstand zu den kleinen Booten wird größer!“']),
          l('ex_saori', '……{厄介|やっかい|v:n3_1094}な話なのは、分かってます。でも、{論じる|ろんじる|v:n3_1185}だけじゃ、魚は戻らないんです！', ['…I know this is a difficult matter. But just arguing about it won’t bring the fish back!', '… Ich weiß, dass das eine schwierige Sache ist. Aber nur darüber zu diskutieren, bringt die Fische nicht zurück!'], 'worried'),
          nar('静かになった会場で、{一番|いちばん}年上の漁師が立ち上がった。さおりさんの、おじいさんだ。', ['In the hall that has fallen silent, the oldest fisherman stands up. It is Saori’s grandfather.', 'Im still gewordenen Saal steht der älteste Fischer auf. Es ist Saoris Großvater.']),
        ],
        teach: ['v:n2_1448', 'v:n3_1186', 'v:n3_0956', 'v:n3_1113', 'v:n3_0957', 'v:n3_1094', 'v:n3_1185'],
      },
      {
        at: 'ex_saori',
        goal: ['Hear how the meeting ended', 'Hör, wie die Versammlung ausging'],
        music: 'memory',
        lines: [
          l('ex_saori', 'おじいちゃんが言ったの。「孫の時代にも、魚がいる海を残そう」って。それで、みんな黙った。', ['Grandpa said: “Let’s leave a sea with fish in it for our grandchildren’s time too.” And everyone fell silent.', 'Opa hat gesagt: „Lasst uns auch für die Zeit unserer Enkel ein Meer mit Fischen hinterlassen.“ Da wurden alle still.']),
          l('ex_saori', '大きい船と小さい船で、{割合|わりあい}を{調整|ちょうせい|v:n2_1178}することにしたの。{妥当|だとう|v:n2_1124}な{率|りつ|v:n3_1165}を、みんなで決めた。', ['We decided to adjust the shares between large and small boats. Together we agreed on a fair rate.', 'Wir haben beschlossen, die Anteile zwischen großen und kleinen Booten anzupassen. Gemeinsam haben wir eine angemessene Quote festgelegt.'], 'happy'),
          l('ex_saori', '{重点|じゅうてん|v:n2_0838}は、量より{質|しつ}。{拓海|たくみ}さんがネットで高く売ってくれるから。……{要素|ようそ|v:n3_1130}が全部つながった気がする。', ['The focus is quality over quantity. Because Takumi sells the fish online at good prices. …I feel like all the pieces have come together.', 'Der Schwerpunkt liegt auf Qualität statt Menge. Denn Takumi verkauft den Fisch online zu guten Preisen. … Ich habe das Gefühl, alle Teile passen zusammen.'], 'happy'),
          l('ex_saori', '来月、{県|けん}の{補助|ほじょ}に{申し込む|もうしこむ|v:n3_1060}わ。この海を、守るためにね。', ['Next month I’ll apply for a grant from the prefecture. To protect this sea.', 'Nächsten Monat beantrage ich einen Zuschuss der Präfektur. Um dieses Meer zu schützen.'], 'happy'),
        ],
        teach: ['v:n2_1178', 'v:n2_1124', 'v:n3_1165', 'v:n2_0838', 'v:n3_1130', 'v:n3_1060'],
      },
    ],
  },
];
