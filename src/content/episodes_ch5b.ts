import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 5, second round: Mr. Ikeda, the wagashi master, the tea-stand master on Mount Inari. */
export const EPISODES_CH5B: Episode[] = [
  // ------------------------------------------------------------------ Mr. Ikeda: the lost-property umbrella
  {
    id: 'ep_ikeda',
    chapter: 5,
    after: 'mq19',
    who: 'ikeda',
    title: ['忘れ物の傘', 'The Forgotten Umbrella', 'Der vergessene Schirm'],
    summary: [
      'Mr. Ikeda is being transferred to Tokyo. Before he goes, he wants to return one umbrella he has kept in lost property for ten years.',
      'Herr Ikeda wird nach Tokio versetzt. Bevor er geht, will er einen Schirm zurückgeben, den er seit zehn Jahren im Fundbüro aufbewahrt.',
    ],
    scenes: [
      {
        at: 'ikeda',
        goal: ['Ask Mr. Ikeda why he is packing boxes', 'Frag Herrn Ikeda, warum er Kisten packt'],
        lines: [
          l('ikeda', 'ああ、@name様。実は、来月から東京駅へ{異動|いどう|v:n3_1222}になりまして。二十年いた京都駅とも、お別れです。', ['Ah, @name. I’m being transferred to Tokyo Station from next month. After twenty years, it’s goodbye to Kyoto Station.', 'Ah, @name. Ab nächstem Monat werde ich zum Bahnhof Tokio versetzt. Nach zwanzig Jahren heißt es Abschied nehmen vom Bahnhof Kyoto.']),
          l('ikeda', '季節{に応じて||g:nioujite}、忘れ物も変わるんですよ。夏は帽子、冬は手袋。国籍{を問わず||g:wotowazu}、皆さん、よく{携帯|けいたい|v:n3_1272}電話を忘れていかれます。', [
            'Lost property changes with the seasons, you know. Hats in summer, gloves in winter. And people of every nationality often leave their mobile phones behind.',
            'Die Fundsachen ändern sich je nach Jahreszeit. Im Sommer Hüte, im Winter Handschuhe. Und Menschen aller Nationalitäten vergessen oft ihr Handy.',
          ]),
          l('ikeda', 'ただ、一{件|けん|v:n3_1276}だけ、心残りが。十年前、雨の日に、女の子が忘れていった赤い傘です。', ['But there’s one matter I still have on my mind. A red umbrella a little girl left behind on a rainy day ten years ago.', 'Aber eine Sache liegt mir noch auf dem Herzen. Ein roter Schirm, den ein kleines Mädchen vor zehn Jahren an einem Regentag vergessen hat.']),
          l('ikeda', '本来は、一定期間で処分するのが決まりです。でも、柄に「おばあちゃんから」と書いてあって、どうしても捨てられなかった。……{後悔|こうかい|v:n3_1279}はしたくないんです。', [
            'Normally the rule is to dispose of things after a set period. But the handle says “From Grandma”, and I just couldn’t throw it away. …I don’t want to have regrets.',
            'Eigentlich ist die Regel, Dinge nach einer bestimmten Zeit zu entsorgen. Aber am Griff steht „Von Oma“, und ich konnte ihn einfach nicht wegwerfen. …Ich will nichts bereuen.',
          ]),
        ],
        teach: ['v:n3_1222', 'v:n3_1272', 'v:n3_1276', 'v:n3_1279', 'g:nioujite', 'g:wotowazu'],
      },
      {
        at: 'k_station_front',
        goal: ['Look at the lost-property notice in front of the station', 'Sieh dir den Fundsachen-Aushang vor dem Bahnhof an'],
        lines: [
          nar('駅前の掲示板に、池田さんが手書きで貼った紙があった。「十年前の雨の日、赤い傘を忘れた方へ。まだ、お預かりしています」', [
            'On the noticeboard in front of the station is a handwritten sheet from Mr. Ikeda: “To the person who forgot a red umbrella on a rainy day ten years ago. We are still keeping it for you.”',
            'Am Brett vor dem Bahnhof hängt ein handgeschriebener Zettel von Herrn Ikeda: „An die Person, die vor zehn Jahren an einem Regentag einen roten Schirm vergessen hat. Wir bewahren ihn noch für Sie auf.“',
          ]),
          nar('その前で、制服姿の女子高生が、立ち止まっていた。「……これ、わたしのだ。{先日|せんじつ|v:n3_1305}、SNSで見たって友達が教えてくれて」', [
            'A high-school girl in uniform has stopped in front of it. “…That’s mine. A friend told me she saw it on social media the other day.”',
            'Davor ist eine Oberschülerin in Uniform stehen geblieben. „…Das ist meiner. Eine Freundin hat mir neulich erzählt, dass sie es in den sozialen Medien gesehen hat.“',
          ]),
          nar('「祖母が亡くなる前にくれた傘なんです。なくしてから、ずっと自分を責めてた。……{驚き|おどろき|v:n3_1232}で、足が震えてます」', [
            '“It’s the umbrella my grandmother gave me before she died. Ever since I lost it, I’ve blamed myself. …I’m so surprised my legs are shaking.”',
            '„Das ist der Schirm, den mir meine Oma vor ihrem Tod geschenkt hat. Seit ich ihn verloren habe, mache ich mir Vorwürfe. …Vor Überraschung zittern mir die Beine.“',
          ]),
        ],
        teach: ['v:n3_1305', 'v:n3_1232'],
      },
      {
        at: 'ikeda',
        goal: ['Bring the girl to Mr. Ikeda', 'Bring das Mädchen zu Herrn Ikeda'],
        lines: [
          nar('赤い傘を受け取った女の子は、何度も頭を下げた。池田さんは、少しだけ目を赤くしていた。', ['The girl takes the red umbrella and bows again and again. Mr. Ikeda’s eyes are a little red.', 'Das Mädchen nimmt den roten Schirm und verbeugt sich immer wieder. Herrn Ikedas Augen sind ein wenig gerötet.']),
          l('ikeda', '十年も前のことなのに、覚えていてくださって。……駅員の仕事は、ものを預かるだけではない。人と人の{縁|えん|v:n3_1227}を預かる仕事なのですね。', [
            'Ten years ago, and you still remembered. …A station attendant’s job isn’t just keeping things. It’s keeping the bonds between people.',
            'Das ist zehn Jahre her, und Sie haben sich trotzdem erinnert. …Die Arbeit eines Bahnhofsangestellten ist nicht nur, Dinge aufzubewahren. Es ist, die Bande zwischen Menschen aufzubewahren.',
          ], 'happy'),
          ask(
            ['東京駅でも、きっと同じ仕事ができますね', ['You’ll be able to do the same work at Tokyo Station too.', 'Diese Arbeit können Sie bestimmt auch am Bahnhof Tokio machen.']],
            ['この気持ちを、後輩に伝えてください', ['Please pass this feeling on to your juniors.', 'Geben Sie dieses Gefühl bitte an Ihre Nachfolger weiter.']],
          ),
          l('ikeda', '東京駅の皆さんの期待{にこたえて||g:x_nikotaete}、がんばります。そして、後輩{全員|ぜんいん|v:n3_1301}に、この{教え|おしえ|v:n3_1231}を残していきます。忘れ物は、誰かの思い出だ、と。', [
            'I’ll do my best to live up to the expectations of everyone at Tokyo Station. And I’ll leave this lesson to all my juniors: lost property is somebody’s memory.',
            'Ich werde mein Bestes geben, um den Erwartungen der Kollegen in Tokio gerecht zu werden. Und allen meinen Nachfolgern hinterlasse ich diese Lehre: Fundsachen sind jemandes Erinnerung.',
          ], 'happy'),
          l('ikeda', '東京駅{ともなると||g:tomonaruto}、忘れ物は一日に何千件。でも、一つ一つの後ろに、人がいる。……@name様、東京でも、またお会いしましょう。', [
            'At a station like Tokyo, lost items run into thousands a day. But behind every single one there is a person. …@name, let’s meet again in Tokyo.',
            'An einem Bahnhof wie Tokio sind es Tausende Fundsachen am Tag. Aber hinter jeder einzelnen steht ein Mensch. …@name, sehen wir uns in Tokio wieder.',
          ], 'happy'),
          pic('cg_kyoto_arrival', '雨上がりの京都駅。赤い傘をさした女の子が、ホームから池田さんに手を振っていた。', [
            'Kyoto Station after the rain. On the platform, a girl with a red umbrella waves to Mr. Ikeda.',
            'Der Bahnhof Kyoto nach dem Regen. Auf dem Bahnsteig winkt ein Mädchen mit rotem Schirm Herrn Ikeda zu.',
          ]),
        ],
        teach: ['v:n3_1227', 'v:n3_1301', 'v:n3_1231', 'g:x_nikotaete', 'g:tomonaruto'],
      },
    ],
  },

  // ------------------------------------------------------------------ the wagashi master: sweets of the season
  {
    id: 'ep_wagashi_ten',
    chapter: 5,
    after: 'mq18',
    who: 'wagashi_ten',
    title: ['父と子の和菓子', 'A Father’s and a Son’s Sweets', 'Die Süßigkeiten von Vater und Sohn'],
    summary: [
      'The wagashi master’s son wants to sell modern cakes with chocolate. The father calls it a betrayal of three hundred years of tradition.',
      'Der Sohn des Wagashi-Meisters will moderne Kuchen mit Schokolade verkaufen. Der Vater nennt es Verrat an dreihundert Jahren Tradition.',
    ],
    scenes: [
      {
        at: 'wagashi_ten',
        goal: ['Ask the wagashi master why he is angry', 'Frag den Wagashi-Meister, warum er wütend ist'],
        lines: [
          l('wagashi_ten', '……ああ、失礼。お見苦しいところを。息子と、けんかをしましてな。', ['…Ah, excuse me. You caught me at a bad moment. I had a quarrel with my son.', '…Ach, verzeihen Sie. Sie sehen mich in einem schlechten Moment. Ich habe mich mit meinem Sohn gestritten.']),
          l('wagashi_ten', 'あいつは、チョコレートやクリームを{加味|かみ|v:n3_1243}した菓子を作りたいと。客が{増加|ぞうか|v:n3_1316}するとか言いおって。', ['He wants to make sweets with chocolate and cream added. He says it’ll bring more customers.', 'Er will Süßigkeiten mit Schokolade und Sahne machen. Er sagt, dann kämen mehr Kunden.']),
          l('wagashi_ten', '味{はともかく||g:hatomokaku}、三百年の店を{相続|そうぞく|v:n3_1319}する者が、伝統を捨てるなど。……わしは、息子を{責めて|せめて|v:n3_1298}しまった。', [
            'Taste aside — for the one who inherits a three-hundred-year-old shop to throw away tradition… I ended up blaming my son.',
            'Vom Geschmack einmal abgesehen – dass derjenige, der einen dreihundert Jahre alten Laden erbt, die Tradition wegwirft… Ich habe meinem Sohn Vorwürfe gemacht.',
          ], 'worried'),
          l('wagashi_ten', '息子は今日、祇園の広場で、自分の菓子を売っているらしい。……わしは、行けん。', ['My son is apparently selling his own sweets on the square in Gion today. …I can’t go.', 'Mein Sohn verkauft heute anscheinend seine eigenen Süßigkeiten auf dem Platz in Gion. …Ich kann nicht hingehen.']),
        ],
        teach: ['v:n3_1243', 'v:n3_1316', 'v:n3_1319', 'v:n3_1298', 'g:hatomokaku'],
      },
      {
        at: 'k_gion_lantern',
        goal: ['Visit the son’s stall on the square in Gion', 'Besuch den Stand des Sohnes auf dem Platz in Gion'],
        music: 'gion',
        lines: [
          nar('祇園の広場の小さな屋台。若い職人が、抹茶とチョコレートの練り切りを並べていた。', ['A small stall on the square in Gion. A young confectioner is laying out nerikiri sweets of matcha and chocolate.', 'Ein kleiner Stand auf dem Platz in Gion. Ein junger Konditor legt Nerikiri aus Matcha und Schokolade aus.']),
          nar('「父の和菓子は、本当にすごいんです。でも、若い人が店に来ない。{そのまま||v:n3_1336}続けたら、店は{減少|げんしょう|v:n3_1277}していく客と一緒に消えてしまう」', [
            '“My father’s wagashi are truly amazing. But young people don’t come to the shop. If we just carry on unchanged, the shop will vanish along with the shrinking customers.”',
            '„Die Wagashi meines Vaters sind wirklich großartig. Aber junge Leute kommen nicht in den Laden. Wenn wir einfach so weitermachen, verschwindet der Laden zusammen mit den immer weniger werdenden Kunden.“',
          ]),
          nar('「ほら、見てください。中のあんこは、父のを{そっと||v:n3_1330}分けてもらったものです。父の味の上に、僕の{想像|そうぞう|v:n3_1318}をのせただけなんです」', [
            '“Look. The bean paste inside I quietly got from my father’s batch. I only put my own imagination on top of my father’s taste.”',
            '„Schauen Sie. Die Bohnenpaste darin habe ich mir heimlich von meinem Vater geholt. Ich habe nur meine eigene Vorstellung auf den Geschmack meines Vaters gesetzt.“',
          ]),
          nar('売れたかと思うと、また次の客が来る。屋台は、若い客でいっぱいになり{つつあった||g:tsutsuaru}。', [
            'No sooner is one sold than the next customer comes. The stall is gradually filling up with young customers.',
            'Kaum ist eins verkauft, kommt schon der nächste Kunde. Der Stand füllt sich nach und nach mit jungen Leuten.',
          ]),
        ],
        teach: ['v:n3_1336', 'v:n3_1277', 'v:n3_1330', 'v:n3_1318', 'g:tsutsuaru'],
      },
      {
        at: 'wagashi_ten',
        goal: ['Bring the son’s sweet to the wagashi master', 'Bring dem Wagashi-Meister die Süßigkeit seines Sohnes'],
        lines: [
          nar('息子さんの練り切りを渡すと、主人は、黙って一口食べた。', ['When you hand him his son’s nerikiri, the master silently takes a bite.', 'Als du ihm das Nerikiri seines Sohnes gibst, beißt der Meister schweigend hinein.']),
          l('wagashi_ten', '……これは、わしのあんこだ。食べた{かと思うと||g:katoomouto}、すぐにわかった。', ['…This is my bean paste. The moment I tasted it, I knew.', '…Das ist meine Bohnenpaste. Kaum hatte ich hineingebissen, wusste ich es.'], 'surprised'),
          l('wagashi_ten', '伝統{も||g:x_mo_ba_mo}守れ{ば||g:x_mo_ba_mo}、新しさも生む。わしが{育てた|そだてた|v:n3_1328}息子は、わしよりずっと欲張りだったようだ。', [
            'He keeps the tradition and creates something new as well. The son I raised seems to be far more ambitious than I am.',
            'Er bewahrt die Tradition und schafft zugleich Neues. Der Sohn, den ich großgezogen habe, ist offenbar viel ehrgeiziger als ich.',
          ], 'happy'),
          ask(
            ['二人で、新しいお菓子を作ってみては？', ['Why not create a new sweet together, the two of you?', 'Warum entwickeln Sie nicht zu zweit eine neue Süßigkeit?']],
            ['息子さんに、そう伝えてあげてください', ['Please tell your son that.', 'Sagen Sie das bitte Ihrem Sohn.']],
          ),
          l('wagashi_ten', 'この店の菓子は、全部わしが作り{きる||g:kiru}と思っていた。だが、これからは二人で作る。……{選択|せんたく|v:n3_1312}を迫ったのは、わしの{粗末|そまつ|v:n3_1339}な意地だったな。', [
            'I thought I would make every sweet in this shop all by myself, to the very end. But from now on, we’ll make them together. …Forcing him to choose was just my own petty stubbornness.',
            'Ich dachte, ich würde jede Süßigkeit in diesem Laden bis zum Schluss allein machen. Aber ab jetzt machen wir sie zu zweit. …Ihn vor die Wahl zu stellen, war nur mein kleinlicher Starrsinn.',
          ], 'happy'),
          pic('cg_kyoto_tea', '和菓子屋の奥。父と息子が並んで、一つの練り切りを作っていた。紅葉と、チョコレート色の葉が、一つの皿にのった。', [
            'The back of the wagashi shop. Father and son stand side by side, making one nerikiri. A maple leaf and a chocolate-coloured leaf lie on one plate.',
            'Im hinteren Teil des Wagashi-Ladens. Vater und Sohn stehen nebeneinander und machen ein Nerikiri. Ein Ahornblatt und ein schokoladenfarbenes Blatt liegen auf einem Teller.',
          ]),
        ],
        teach: ['v:n3_1328', 'v:n3_1312', 'v:n3_1339', 'g:katoomouto', 'g:x_mo_ba_mo', 'g:kiru'],
      },
    ],
  },

  // ------------------------------------------------------------------ the tea-stand master on Mount Inari: halfway up
  {
    id: 'ep_teestand_oyaji',
    chapter: 5,
    after: 'mq21',
    who: 'teestand_oyaji',
    title: ['山の途中の茶屋', 'The Tea Stand Halfway Up', 'Der Teestand auf halbem Weg'],
    summary: [
      'Every morning a young runner stops at the tea stand halfway up Mount Inari. He has lost his place on the national team.',
      'Jeden Morgen hält ein junger Läufer am Teestand auf halber Höhe des Inari-Bergs. Er hat seinen Platz in der Nationalmannschaft verloren.',
    ],
    scenes: [
      {
        at: 'teestand_oyaji',
        goal: ['Have tea at the stand halfway up the mountain', 'Trink Tee am Stand auf halber Höhe'],
        lines: [
          l('teestand_oyaji', 'ようこそ。五十年{にわたって||g:niwatatte}、この山の途中で、茶を出してきたんだ。', ['Welcome. For fifty years I’ve served tea here, halfway up this mountain.', 'Willkommen. Seit fünfzig Jahren schenke ich hier, auf halber Höhe dieses Bergs, Tee aus.']),
          l('teestand_oyaji', '最近、毎朝、鳥居の道を{駆けて|かけて|v:n3_1239}上がってくる若い{選手|せんしゅ|v:n3_1307}がいてな。{全国|ぜんこく|v:n3_1303}大会の代表から、外されたらしい。', [
            'Lately there’s a young athlete who comes running up the path of torii every morning. Apparently he was dropped from the national championship team.',
            'In letzter Zeit kommt jeden Morgen ein junger Sportler den Torii-Weg heraufgerannt. Er wurde wohl aus der Mannschaft für die Landesmeisterschaft gestrichen.',
          ]),
          l('teestand_oyaji', '茶を出す{そばから||g:sobakara}、飲まずに走っていく。{課題|かだい|v:n3_1241}は足じゃない、心だな、あれは。', [
            'No sooner do I pour his tea than he runs off without drinking it. His problem isn’t his legs — it’s his heart.',
            'Kaum schenke ich ihm Tee ein, rennt er schon weiter, ohne zu trinken. Sein Problem sind nicht die Beine, sondern das Herz.',
          ]),
          l('teestand_oyaji', '今朝も、山頂のほうへ行った。……ちょっと、様子を見てきてくれんか。', ['He went up towards the summit again this morning. …Would you go and see how he is?', 'Heute Morgen ist er wieder zum Gipfel hinauf. …Würdest du mal nach ihm sehen?']),
        ],
        teach: ['v:n3_1239', 'v:n3_1307', 'v:n3_1303', 'v:n3_1241', 'g:niwatatte', 'g:sobakara'],
      },
      {
        at: 'k_fushimi_summit',
        goal: ['Find the runner at the summit', 'Finde den Läufer auf dem Gipfel'],
        music: 'kyoto',
        lines: [
          nar('山頂の鳥居の下で、ジャージの青年が、膝を抱えて座っていた。', ['Under the torii at the summit, a young man in a tracksuit sits hugging his knees.', 'Unter dem Torii auf dem Gipfel sitzt ein junger Mann im Trainingsanzug und umklammert seine Knie.']),
          nar('「代表に選ばれるために、全部{賭けて|かけて|v:n3_1240}きたんです。お金も{節約|せつやく|v:n3_1296}して、友達とも会わずに」', [
            '“I bet everything on being chosen for the team. I saved every yen and didn’t even see my friends.”',
            '„Ich habe alles darauf gesetzt, für die Mannschaft ausgewählt zu werden. Ich habe jeden Yen gespart und nicht einmal meine Freunde getroffen.“',
          ]),
          nar('「周りの心配{をよそに||g:x_woyosoni}、一人で走り続けた。でも、外された。走る意味が、もうわからない」', [
            '“I ignored everyone’s worries and kept running alone. But I was dropped. I don’t know why I run any more.”',
            '„Ohne mich um die Sorgen der anderen zu kümmern, bin ich allein weitergelaufen. Aber ich wurde gestrichen. Ich weiß nicht mehr, warum ich laufe.“',
          ]),
          nar('ポケットから、くしゃくしゃの紙が出てきた。茶屋のおやじの字で、「茶を飲む時間も、走る{備え|そなえ|v:n3_1332}のうち」と書いてあった。', [
            'A crumpled note comes out of his pocket. In the tea-stand master’s writing: “Time for a cup of tea is part of preparing to run, too.”',
            'Aus seiner Tasche kommt ein zerknitterter Zettel. In der Schrift des Teestand-Wirts steht: „Auch die Zeit für eine Tasse Tee gehört zur Vorbereitung aufs Laufen.“',
          ]),
        ],
        teach: ['v:n3_1240', 'v:n3_1296', 'v:n3_1332', 'g:x_woyosoni'],
      },
      {
        at: 'teestand_oyaji',
        goal: ['Walk back down to the tea stand with the runner', 'Geh mit dem Läufer zurück zum Teestand'],
        lines: [
          nar('青年は、初めて茶屋の椅子に座り、ゆっくりと茶を飲んだ。', ['For the first time, the young man sits down on a chair at the tea stand and slowly drinks his tea.', 'Zum ersten Mal setzt sich der junge Mann auf einen Stuhl am Teestand und trinkt langsam seinen Tee.']),
          l('teestand_oyaji', '五十年、この{一帯|いったい|v:n3_1221}の山道を見てきた。速い者も、遅い者も、みんな途中で休む。休んだ者{だけましだ||g:x_dakemashi}、とわしは思うがな。', [
            'For fifty years I’ve watched the mountain paths around here. The fast ones and the slow ones — everyone rests halfway. Those who rest are the better off, if you ask me.',
            'Fünfzig Jahre lang habe ich die Bergwege hier in der Gegend beobachtet. Die Schnellen und die Langsamen – alle machen auf halbem Weg Pause. Wer Pause macht, ist noch gut dran, finde ich.',
          ]),
          ask(
            ['ここで休んで、また走ればいいんですよ', ['You can rest here and run again.', 'Du kannst hier ausruhen und dann wieder laufen.']],
            ['今度は、誰かと一緒に走ってみたら？', ['Next time, why not run with someone?', 'Warum läufst du nächstes Mal nicht mit jemandem zusammen?']],
          ),
          nar('青年は、少しだけ笑った。「来年は、この山の大会に出ます。おやじさんの茶屋を、折り返し地点にして」', [
            'The young man smiles a little. “Next year I’ll enter the race on this mountain. With your tea stand as the turning point.”',
            'Der junge Mann lächelt ein wenig. „Nächstes Jahr laufe ich beim Rennen auf diesem Berg mit. Mit Ihrem Teestand als Wendepunkt.“',
          ]),
          l('teestand_oyaji', 'ほう、そりゃいい。地元の人たちの応援{のもとで||g:x_nomotode}走ったら、{歓声|かんせい|v:n3_1251}で足が軽くなるぞ。一歩ずつの{前進|ぜんしん|v:n3_1309}でいい。', [
            'Oh, that’s good. When you run with the backing of the locals, the cheering will make your legs light. One step forward at a time is enough.',
            'Oh, das ist gut. Wenn du mit der Unterstützung der Leute hier läufst, machen die Jubelrufe deine Beine leicht. Schritt für Schritt vorwärts reicht.',
          ], 'happy'),
          pic('cg_kyoto_fushimi', '朝霧の千本鳥居。青年が、今度はゆっくりと、一歩ずつ山を登っていった。', [
            'The thousand torii in the morning mist. This time the young man climbs the mountain slowly, step by step.',
            'Die tausend Torii im Morgennebel. Diesmal steigt der junge Mann langsam, Schritt für Schritt, den Berg hinauf.',
          ]),
        ],
        teach: ['v:n3_1221', 'v:n3_1251', 'v:n3_1309', 'g:x_dakemashi', 'g:x_nomotode'],
      },
    ],
  },
];
