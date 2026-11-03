import { ask, l, nar, pic, type Episode } from './episodes_dsl';

/** 心の物語, chapter 2 (Hinomori valley): Sakura and her grandfather, Okami-san, Kenji, Mr. Ōta. */
export const EPISODES_CH2: Episode[] = [
  // ------------------------------------------------------------------ Sakura and Mr. Hayashi: the promise of the peach tree
  {
    id: 'ep_sakura',
    chapter: 2,
    after: 'mq7',
    who: 'sakura_hayashi',
    title: ['桃の木の約束', 'The Promise of the Peach Tree', 'Das Versprechen des Pfirsichbaums'],
    summary: [
      'Sakura dreams of the city. Her grandfather’s hands are getting weaker, and nobody is left to help on the farm.',
      'Sakura träumt von der Stadt. Die Hände ihres Großvaters werden schwächer, und auf dem Hof hilft niemand mehr.',
    ],
    scenes: [
      {
        at: 'sakura_hayashi',
        goal: ['Talk to Sakura in the peach grove', 'Sprich mit Sakura im Pfirsichhain'],
        music: 'valley',
        lines: [
          l('sakura_hayashi', 'ねえ@name、東京って、どんなところ？ わたし、ずっと都会に{憧れて|あこがれて|v:n2_0133}るんだ。', [
            'Hey @name, what is Tokyo like? I’ve always longed for the city.',
            'Sag mal, @name, wie ist Tokio so? Ich sehne mich schon immer nach der Großstadt.',
          ], 'happy'),
          l('sakura_hayashi', 'でも、おじいちゃんの{果樹園|かじゅえん|v:kajuen}は{人手不足|ひとでぶそく|v:hitodebusoku}で、毎年手伝う人が減ってるの。', [
            'But Grandpa’s orchard is short of hands. Every year fewer people come to help.',
            'Aber Opas Obstgarten fehlen die Leute. Jedes Jahr kommen weniger zum Helfen.',
          ], 'worried'),
          l('sakura_hayashi', 'この前、おじいちゃんが{手首|てくび|v:n2_1249}を押さえて、こっそり痛そうな顔をしてた。……わたしが出て行ったら、誰が桃を守るの？', [
            'The other day Grandpa was holding his wrist and secretly making a pained face. …If I leave, who will look after the peaches?',
            'Neulich hat Opa sich das Handgelenk gehalten und heimlich das Gesicht verzogen. …Wenn ich weggehe, wer kümmert sich dann um die Pfirsiche?',
          ], 'worried'),
          l('sakura_hayashi', '若い{うちに||g:uchini}、外の世界を見てみたい。でも、そう思う{たびに||g:tabini}、胸がちくっとするの。', [
            'I want to see the outside world while I’m young. But every time I think that, my chest stings.',
            'Ich will die Welt da draußen sehen, solange ich jung bin. Aber jedes Mal, wenn ich das denke, sticht es in meiner Brust.',
          ]),
          ask(
            ['おじいさんと、ちゃんと話してみたら？', ['Why not talk to your grandfather properly?', 'Warum redest du nicht richtig mit deinem Opa?']],
            ['どっちを選んでも、さくらちゃんの人生だよ', ['Whatever you choose, it’s your life.', 'Was du auch wählst, es ist dein Leben.']],
          ),
          l('sakura_hayashi', '……うん。あ、そうだ。道の入口の、無人の販売所を見てきてくれる？ 最近、お客さんが減ってるみたいで。', [
            '…Yeah. Oh, right — could you check the unmanned stand by the road? It seems fewer customers come lately.',
            '…Ja. Ach, genau – kannst du nach dem unbemannten Verkaufsstand an der Straße schauen? Anscheinend kommen in letzter Zeit weniger Kunden.',
          ]),
        ],
        teach: ['v:n2_0133', 'v:kajuen', 'v:hitodebusoku', 'v:n2_1249', 'g:uchini', 'g:tabini'],
      },
      {
        at: 'valley_stand',
        goal: ['Look at the peach stand by the road', 'Schau dir den Pfirsichstand an der Straße an'],
        evening: true,
        music: 'memory',
        lines: [
          nar('夕暮れの販売所。お金の箱の中に、小銭と一緒に、小さな紙がたくさん入っていた。', [
            'The stand at dusk. In the money box, along with the coins, there are lots of little slips of paper.',
            'Der Stand in der Abenddämmerung. In der Geldkasse liegen neben den Münzen viele kleine Zettel.',
          ]),
          nar('「毎年、この桃が{熟す|じゅくす|v:jukusu}のを楽しみにしています」「入院中の母が、この桃だけは食べてくれました」', [
            '“Every year I look forward to these peaches ripening.” “My mother in hospital ate nothing but these peaches.”',
            '„Jedes Jahr freue ich mich darauf, dass diese Pfirsiche reif werden.“ „Meine Mutter im Krankenhaus hat nur diese Pfirsiche gegessen.“',
          ]),
          nar('一番下に、古い紙が一枚。子どもの字だった。「さくらの木が、はやく{実り|みのり|v:minoru}ますように。さくら　五さい」', [
            'At the very bottom, one old slip. A child’s handwriting: “I hope Sakura’s tree bears fruit soon. Sakura, age 5.”',
            'Ganz unten ein alter Zettel, in Kinderschrift: „Ich wünsche mir, dass Sakuras Baum bald Früchte trägt. Sakura, 5 Jahre.“',
          ]),
          nar('箱の裏には、林さんの字でこう書いてあった。「この{苦労|くろう|v:kurou}も、さくらの笑顔を思えば軽い」', [
            'On the back of the box, in Mr. Hayashi’s hand: “All this hardship feels light when I think of Sakura’s smile.”',
            'Auf der Rückseite der Kiste steht in Herrn Hayashis Schrift: „Alle Mühe ist leicht, wenn ich an Sakuras Lächeln denke.“',
          ]),
        ],
        teach: ['v:jukusu', 'v:minoru', 'v:kurou'],
      },
      {
        at: 'hayashi',
        goal: ['Bring the slips of paper to Mr. Hayashi', 'Bring die Zettel zu Herrn Hayashi'],
        music: 'valley',
        lines: [
          l('hayashi', 'おや、その紙……。孫が生まれた年に、わしが植えた桃の木があってな。孫の名前を取って「さくら」と{名付けた|なづけた|v:nazukeru}んだ。', [
            'Oh, those slips… In the year my granddaughter was born, I planted a peach tree. I named it “Sakura”, after her.',
            'Oh, diese Zettel… Im Jahr, als meine Enkelin geboren wurde, habe ich einen Pfirsichbaum gepflanzt. Ich habe ihn nach ihr „Sakura“ genannt.',
          ]),
          l('hayashi', '木の{手入れ|ていれ|v:teire}は、毎朝欠かさずやってきた。……だがな、あの子を、この谷に縛るつもりはないんだよ。', [
            'I have tended that tree every single morning. …But I have no intention of tying the girl to this valley.',
            'Ich habe den Baum jeden Morgen gepflegt, ohne Ausnahme. …Aber ich will das Mädchen nicht an dieses Tal binden.',
          ]),
          nar('そのとき、後ろで小さな声がした。さくらちゃんが、泣きそうな顔で立っていた。', [
            'Just then, a small voice behind you. Sakura is standing there, close to tears.',
            'Da hörst du hinter dir eine leise Stimme. Sakura steht da, den Tränen nahe.',
          ]),
          l('sakura_hayashi', 'おじいちゃん……。わたし、東京に行く。でも、行く{からには||g:karaniwa}、ちゃんと勉強して、この桃を東京で売れるようにして帰ってくる！', [
            'Grandpa… I’m going to Tokyo. But since I’m going, I’ll study properly and come back able to sell these peaches in Tokyo!',
            'Opa… Ich gehe nach Tokio. Aber wenn ich schon gehe, dann lerne ich richtig und komme zurück, sodass wir diese Pfirsiche in Tokio verkaufen können!',
          ]),
          nar('林さんは、何も言わずに、ゆっくり{うなずいた||v:n2_0229}。', ['Mr. Hayashi says nothing and slowly nods.', 'Herr Hayashi sagt nichts und nickt langsam.']),
          l('hayashi', '……@nameさんの{おかげで||g:okagede}、やっと孫の本当の気持ちが聞けた。{果たして|はたして|v:n2_1437}、わしの思ったとおりの子だったよ。', [
            '…Thanks to you, @name, I finally heard what my granddaughter really feels. She is exactly the girl I thought she was.',
            '…Dank dir, @name, habe ich endlich gehört, was meine Enkelin wirklich fühlt. Sie ist genau so, wie ich dachte.',
          ], 'happy'),
          pic('cg_peach_harvest', '夏の果樹園。おじいさんと孫が、同じ木の下で、同じ桃を見上げていた。', [
            'The orchard in summer. Grandfather and granddaughter stand under the same tree, looking up at the same peaches.',
            'Der Obstgarten im Sommer. Großvater und Enkelin stehen unter demselben Baum und schauen zu denselben Pfirsichen hinauf.',
          ]),
        ],
        teach: ['v:nazukeru', 'v:teire', 'v:n2_0229', 'v:n2_1437', 'g:karaniwa', 'g:okagede'],
        give: ['peach', 2],
      },
    ],
  },

  // ------------------------------------------------------------------ Okami-san: the fourth generation's water
  {
    id: 'ep_okami',
    chapter: 2,
    after: 'mq8',
    who: 'okami',
    title: ['四代目の湯', 'The Fourth Generation’s Water', 'Das Wasser der vierten Generation'],
    summary: [
      'Okami-san’s son wants to sell the old inn. She has not told anyone how tired she is.',
      'Der Sohn der Wirtin will das alte Gasthaus verkaufen. Sie hat niemandem erzählt, wie müde sie ist.',
    ],
    scenes: [
      {
        at: 'okami',
        goal: ['Ask Okami-san what is troubling her', 'Frag die Wirtin, was sie bedrückt'],
        music: 'onsen',
        lines: [
          l('okami', '@name様……お恥ずかしいところをお見せしました。実は、東京にいる息子から手紙が参りまして。', [
            '@name… forgive me for letting you see me like this. A letter came from my son in Tokyo.',
            '@name… verzeihen Sie, dass Sie mich so sehen. Ein Brief ist gekommen, von meinem Sohn in Tokio.',
          ], 'worried'),
          l('okami', '「旅館を売って、東京で一緒に暮らそう」と。お客様は減る{一方で||g:ippoude}、建物は古くなり、最近は{苦情|くじょう|v:n2_0528}もいただくようになりました。', [
            '“Sell the inn and come live with me in Tokyo,” he says. While the guests keep getting fewer, the building gets older, and lately I even receive complaints.',
            '„Verkauf das Gasthaus und zieh zu mir nach Tokio“, schreibt er. Während die Gäste immer weniger werden, wird das Haus älter, und neuerdings bekomme ich sogar Beschwerden.',
          ], 'worried'),
          l('okami', '来月から、しばらく{休業|きゅうぎょう|v:n2_0498}しようかと考えております。……四代続いたこの宿を、わたしの代で終わらせるのかと思うと。', [
            'I am thinking of closing for a while from next month. …When I think that this inn, kept for four generations, may end with me…',
            'Ich überlege, ab nächstem Monat eine Weile zu schließen. …Wenn ich daran denke, dass dieses Gasthaus nach vier Generationen mit mir endet…',
          ], 'worried'),
          l('okami', '足湯に、毎年いらっしゃる古いお客様がおります。よろしければ、あの方とお話しになってみてくださいませ。', [
            'There is an old guest who comes to the footbath every year. If you like, please go and talk with him.',
            'Ein alter Gast kommt jedes Jahr zum Fußbad. Wenn Sie mögen, sprechen Sie doch einmal mit ihm.',
          ]),
        ],
        teach: ['v:n2_0528', 'v:n2_0498', 'g:ippoude'],
      },
      {
        at: 'valley_ashiyu',
        goal: ['Talk to the old guest at the footbath', 'Sprich mit dem alten Gast am Fußbad'],
        evening: true,
        music: 'onsen',
        lines: [
          nar('夕方の足湯。白い{湯気|ゆげ|v:yuge}の向こうで、おじいさんが一人、足を湯に{浸けて|つけて}いた。', [
            'The footbath in the evening. Beyond the white steam, an old man sits alone with his feet in the hot water.',
            'Das Fußbad am Abend. Hinter dem weißen Dampf sitzt ein alter Mann allein mit den Füßen im heißen Wasser.',
          ]),
          nar('「五十年前、新婚旅行でこの宿に来たんだ。若女将――今の女将さんのお母さんがね、家内に{格別|かくべつ|v:n2_0379}な{もてなし||v:motenashi}をしてくれた」', [
            '“Fifty years ago we came to this inn on our honeymoon. The young okami — today’s okami’s mother — gave my wife the most special hospitality.”',
            '„Vor fünfzig Jahren waren wir auf Hochzeitsreise in diesem Gasthaus. Die junge Wirtin – die Mutter der heutigen – hat meine Frau ganz besonders herzlich umsorgt.“',
          ]),
          nar('「家内は体が弱くて、大きな風呂には{浸かれ|つかれ|v:tsukaru}なかった。だから女将さんが、夜中に、家内のためだけに小さな湯船を用意してくれたんだよ」', [
            '“My wife was frail and couldn’t soak in the big bath. So the okami prepared a small tub in the middle of the night, just for her.”',
            '„Meine Frau war schwach und konnte nicht ins große Bad. Da hat die Wirtin mitten in der Nacht nur für sie einen kleinen Zuber vorbereitet.“',
          ]),
          nar('「あの夜の湯の温かさを、家内は死ぬまで話していた。わし{にとって||g:x_nitotte}、ここは、家内に会える場所なんだ」', [
            '“My wife talked about the warmth of that night’s bath until the day she died. For me, this is the place where I can meet her.”',
            '„Von der Wärme jenes Bades hat meine Frau bis zu ihrem Tod erzählt. Für mich ist das hier der Ort, an dem ich ihr begegne.“',
          ]),
          nar('「女将さんに伝えてくれんか。この湯を{味わう|あじわう|v:n2_0137}たびに、わしは幸せだと」', [
            '“Would you tell the okami? Every time I taste this water, I am happy.”',
            '„Würdest du es der Wirtin sagen? Jedes Mal, wenn ich dieses Wasser genieße, bin ich glücklich.“',
          ]),
        ],
        teach: ['v:yuge', 'v:n2_0379', 'v:motenashi', 'v:tsukaru', 'v:n2_0137', 'g:x_nitotte'],
      },
      {
        at: 'okami',
        goal: ['Pass the old guest’s words to Okami-san', 'Gib die Worte des alten Gastes an die Wirtin weiter'],
        music: 'onsen',
        lines: [
          nar('おじいさんの言葉を伝えると、女将さんは、しばらく目を閉じていた。', ['When you pass on the old man’s words, Okami-san closes her eyes for a long moment.', 'Als du die Worte des alten Mannes weitergibst, schließt die Wirtin lange die Augen.']),
          l('okami', '母が……そのようなことを。わたしは、建物や数字ばかり見て、母のもてなしの心を忘れておりました。', [
            'My mother… did such a thing. I was only looking at the building and the numbers, and had forgotten my mother’s heart of hospitality.',
            'Meine Mutter… hat so etwas getan. Ich habe nur auf das Gebäude und die Zahlen geschaut und das gastfreundliche Herz meiner Mutter vergessen.',
          ]),
          l('okami', '悩んだ{末に||g:x_sue}、決めました。宿は続けます。ただ、無理はいたしません。息子にも、正直に「手伝ってほしい」と書いてみます。', [
            'After much agonising, I have decided. I will keep the inn. But I won’t overdo it. I will write honestly to my son, too: “I would like your help.”',
            'Nach langem Grübeln habe ich mich entschieden. Ich führe das Gasthaus weiter. Aber ich übernehme mich nicht. Auch meinem Sohn schreibe ich ehrlich: „Ich hätte gern deine Hilfe.“',
          ], 'happy'),
          l('okami', '宿を{継続|けいぞく|v:n2_0559}するのは、建物ではなく、心なのでございますね。……そう{実感|じっかん|v:n2_0779}いたしました。', [
            'What keeps an inn going is not the building but the heart. …I truly feel that now.',
            'Was ein Gasthaus weiterleben lässt, ist nicht das Gebäude, sondern das Herz. …Das spüre ich jetzt wirklich.',
          ], 'happy'),
          pic('cg_heart_okami', '夕暮れの旅館「ゆのか」。女将さんが、深くおじぎをして迎えてくれた。', [
            'Dusk at the inn “Yunoka”. Okami-san welcomes you with a deep bow.',
            'Abenddämmerung am Gasthaus „Yunoka“. Die Wirtin empfängt dich mit einer tiefen Verbeugung.',
          ]),
          l('okami', '{謙虚|けんきょ|v:n2_0588}に、一日一日、お客様をお迎えいたします。@name様も、どうぞいつでもお帰りくださいませ。', [
            'Humbly, day by day, I will welcome my guests. Please, @name, come home here any time.',
            'Bescheiden, Tag für Tag, werde ich meine Gäste empfangen. Bitte, @name, kommen Sie jederzeit hierher nach Hause.',
          ], 'happy'),
        ],
        teach: ['v:n2_0559', 'v:n2_0779', 'v:n2_0588', 'g:x_sue'],
        give: ['onsen_tamago', 2],
      },
    ],
  },

  // ------------------------------------------------------------------ Kenji: the late grapes
  {
    id: 'ep_kenji',
    chapter: 2,
    after: 'mq8',
    who: 'kenji',
    title: ['遅れてきた葡萄', 'The Late Grapes', 'Die späten Trauben'],
    summary: [
      'Kenji left his office job in Tokyo to make wine. His father has not spoken to him since.',
      'Kenji hat seinen Bürojob in Tokio aufgegeben, um Wein zu machen. Sein Vater spricht seitdem nicht mehr mit ihm.',
    ],
    scenes: [
      {
        at: 'kenji',
        goal: ['Talk to Kenji at the vineyard', 'Sprich mit Kenji im Weinberg'],
        music: 'valley',
        lines: [
          l('kenji', '三年前まで、東京で{サラリーマン||v:n2_0736}をしていたんですよ。毎晩終電で帰る{職場|しょくば|v:n2_0902}でした。', [
            'Until three years ago I was an office worker in Tokyo. A workplace where I went home on the last train every night.',
            'Bis vor drei Jahren war ich Büroangestellter in Tokio. Ein Arbeitsplatz, von dem ich jeden Abend mit der letzten Bahn heimkam.',
          ]),
          l('kenji', 'ワインを作りたくて、会社を辞めて帰ってきた。ところが、帰ってきた{とたん||g:tatotan}、父は口をきいてくれなくなりました。', [
            'I wanted to make wine, so I quit and came home. But the moment I came back, my father stopped speaking to me.',
            'Ich wollte Wein machen, also habe ich gekündigt und bin zurückgekommen. Aber kaum war ich da, hat mein Vater aufgehört, mit mir zu reden.',
          ], 'worried'),
          l('kenji', '去年は、霜で苗が半分{枯れて|かれて|v:n2_0445}しまって。父の言うとおり、ぼくに{素質|そしつ|v:n2_1067}なんかないのかもしれません。', [
            'Last year frost killed half my young vines. Maybe my father is right, and I have no talent for this.',
            'Letztes Jahr ist durch Frost die Hälfte meiner jungen Reben eingegangen. Vielleicht hat mein Vater recht, und ich habe kein Talent dafür.',
          ], 'worried'),
          l('kenji', '……ワイナリーの樽、見ていってください。今年のは、まだ誰にも飲ませていないんです。', [
            '…Have a look at the barrels in the winery. Nobody has tasted this year’s wine yet.',
            '…Schauen Sie sich die Fässer in der Kellerei an. Den diesjährigen Wein hat noch niemand probiert.',
          ]),
        ],
        teach: ['v:n2_0736', 'v:n2_0902', 'v:n2_0445', 'v:n2_1067', 'g:tatotan'],
      },
      {
        at: 'valley_winery',
        goal: ['Look around the winery', 'Schau dich in der Kellerei um'],
        lines: [
          nar('樽の横の机に、ノートが開いたままになっていた。毎日の天気、土の様子、{肥料|ひりょう|v:hiryou}の量。', [
            'On the desk beside the barrels lies an open notebook: the weather every day, the state of the soil, the amount of fertiliser.',
            'Auf dem Tisch neben den Fässern liegt ein offenes Heft: das Wetter jedes Tages, der Zustand des Bodens, die Menge an Dünger.',
          ]),
          nar('ページの間に、知らない字のメモが挟まっていた。「この{品種|ひんしゅ|v:hinshu}は、この谷の寒さに強い。わしの畑の端に植えてみろ」', [
            'Between the pages there is a note in handwriting you don’t know: “This variety is hardy against the cold of this valley. Try planting it at the edge of my field.”',
            'Zwischen den Seiten steckt ein Zettel in fremder Handschrift: „Diese Sorte verträgt die Kälte dieses Tals. Pflanz sie mal am Rand meines Feldes.“',
          ]),
          nar('その下に、もう一枚。「霜の夜は、わしが見回る。お前は寝ろ。　父」', [
            'Below it, another one: “On frosty nights I’ll do the rounds. You sleep. — Father”',
            'Darunter noch einer: „In Frostnächten mache ich die Runde. Du schläfst. – Vater“',
          ]),
          nar('ノートの最後のページには、健二さんの字で、こう書いてあった。「{栽培|さいばい|v:saibai}を始めて三年。一本だけ、なぜか霜にも負けなかった木がある」', [
            'On the last page, in Kenji’s handwriting: “Three years since I began growing. There is one vine that, for some reason, even the frost did not beat.”',
            'Auf der letzten Seite, in Kenjis Schrift: „Drei Jahre, seit ich mit dem Anbau begonnen habe. Ein einziger Rebstock hat aus irgendeinem Grund sogar dem Frost getrotzt.“',
          ]),
        ],
        teach: ['v:hiryou', 'v:hinshu', 'v:saibai'],
      },
      {
        at: 'kenji',
        goal: ['Tell Kenji what you found', 'Erzähl Kenji, was du gefunden hast'],
        music: 'valley',
        lines: [
          nar('メモを見せると、健二さんの手が止まった。', ['When you show him the notes, Kenji’s hands stop.', 'Als du ihm die Zettel zeigst, halten Kenjis Hände inne.']),
          l('kenji', '……父の字だ。霜にも負けなかった一本は、父が夜中に守っていたのか。', [
            '…That’s my father’s handwriting. The one vine that beat the frost — my father was guarding it at night.',
            '…Das ist die Schrift meines Vaters. Der eine Rebstock, der dem Frost getrotzt hat – mein Vater hat ihn nachts beschützt.',
          ], 'surprised'),
          l('kenji', '口をきかない{ばかりか||g:bakarika}、反対されているとばかり思っていました。……ぼくのほうこそ、{反省|はんせい|v:n2_1470}しないと。', [
            'I thought he not only didn’t talk to me, but was against me too. …It’s me who needs to reflect.',
            'Ich dachte, er redet nicht nur nicht mit mir, sondern ist auch noch dagegen. …Ich bin es, der in sich gehen muss.',
          ]),
          l('kenji', '父と話して{からでないと||g:tekaradenaito}、このワインは{出荷|しゅっか|v:shukka}できません。最初の一本は、父と飲みます。', [
            'I can’t ship this wine until I’ve talked with my father. The first bottle, I’ll drink with him.',
            'Bevor ich nicht mit meinem Vater gesprochen habe, kann ich diesen Wein nicht ausliefern. Die erste Flasche trinke ich mit ihm.',
          ], 'happy'),
          l('kenji', '{傑作|けっさく|v:n2_0579}じゃなくていい。父と二人で作った、と言えるワインにしたい。……@nameさん、急ぐ{ことはない||g:x_kotowanai}ですよね。', [
            'It doesn’t have to be a masterpiece. I want it to be a wine I can say my father and I made together. …@name, there’s no need to hurry, is there?',
            'Es muss kein Meisterwerk sein. Ich will einen Wein, von dem ich sagen kann: Mein Vater und ich haben ihn zusammen gemacht. …@name, es gibt keinen Grund zur Eile, oder?',
          ], 'happy'),
        ],
        teach: ['v:n2_1470', 'v:shukka', 'v:n2_0579', 'g:bakarika', 'g:tekaradenaito', 'g:x_kotowanai'],
        give: ['grape_juice', 2],
      },
    ],
  },

  // ------------------------------------------------------------------ Mr. Ōta: the calligraphy without a name
  {
    id: 'ep_ota',
    chapter: 2,
    after: 'mq9',
    who: 'ota',
    title: ['名前のない書', 'The Calligraphy Without a Name', 'Die Kalligrafie ohne Namen'],
    summary: [
      'Mr. Ōta has been trying to write one name for thirty years. It is the name of his late wife.',
      'Herr Ōta versucht seit dreißig Jahren, einen einzigen Namen zu schreiben: den seiner verstorbenen Frau.',
    ],
    scenes: [
      {
        at: 'ota',
        goal: ['Ask Mr. Ōta about the unfinished scroll', 'Frag Herrn Ōta nach der unvollendeten Schriftrolle'],
        lines: [
          l('ota', '@name様。この{書道|しょどう|v:shodou}の工房に、一枚だけ、名前を書いていない紙がございます。', [
            '@name. In this calligraphy workshop there is one sheet on which no name has been written.',
            '@name. In dieser Kalligrafie-Werkstatt gibt es ein einziges Blatt, auf dem kein Name steht.',
          ]),
          l('ota', '三十年前に亡くなった家内の名前を、書こうとしてきました。ところが、筆を持つと、手が震えて、一画{すら||g:x_sura}書けないのです。', [
            'For thirty years I have tried to write the name of my wife, who died. But when I take up the brush my hand shakes, and I cannot write even a single stroke.',
            'Dreißig Jahre lang habe ich versucht, den Namen meiner verstorbenen Frau zu schreiben. Aber wenn ich den Pinsel nehme, zittert meine Hand, und ich bringe nicht einmal einen einzigen Strich zustande.',
          ], 'worried'),
          l('ota', '年を取って、{忘れっぽく|わすれっぽく|v:wasureppoi}なりました。家内の声も、だんだん思い出せなくなってきて……。名前まで{薄れて|うすれて}しまう前に、と思うのですが。', [
            'With age I have become forgetful. I can no longer recall my wife’s voice so well… I want to write it before even her name fades.',
            'Im Alter bin ich vergesslich geworden. An die Stimme meiner Frau erinnere ich mich immer schlechter… Ich möchte ihren Namen schreiben, bevor auch er verblasst.',
          ], 'worried'),
          l('ota', '家内の古い箱が、工房の入口に置いてあります。わたしは、三十年、一度も開けられませんでした。', [
            'My wife’s old box sits by the entrance of the workshop. In thirty years I have not once been able to open it.',
            'Die alte Schachtel meiner Frau steht am Eingang der Werkstatt. In dreißig Jahren habe ich sie nicht ein einziges Mal öffnen können.',
          ]),
        ],
        teach: ['v:shodou', 'v:wasureppoi', 'g:x_sura'],
      },
      {
        at: 'valley_workshop',
        goal: ['Open the old box at the workshop entrance', 'Öffne die alte Schachtel am Eingang der Werkstatt'],
        evening: true,
        music: 'memory',
        lines: [
          nar('箱の中には、古いノートが一冊。{地味|じみ|v:n2_0804}な灰色の{表紙|ひょうし|v:n2_1527}に、小さく「練習帳」と書いてある。', [
            'Inside the box is one old notebook. On its plain grey cover, in small letters: “Practice book”.',
            'In der Schachtel liegt ein altes Heft. Auf dem schlichten grauen Umschlag steht klein: „Übungsheft“.',
          ]),
          nar('中には、ひらがなの練習が、何十ページも続いていた。ゆがんだ「お」「お」「お」……。', [
            'Inside, page after page of hiragana practice. Crooked お, お, お…',
            'Darin Seite um Seite Hiragana-Übungen. Krumme お, お, お…',
          ]),
          nar('最後のページに、一枚の{言付け|ことづけ|v:kotozuke}が挟まっていた。「字が下手なわたしが、{自ら|みずから|v:n2_1709}あなたの名前を書けるようになるまで、内緒で練習しています」', [
            'On the last page there is a message: “I, whose handwriting is so poor, am practising in secret until I can write your name myself.”',
            'Auf der letzten Seite steckt eine Nachricht: „Ich, die so schlecht schreibt, übe heimlich, bis ich deinen Namen selbst schreiben kann.“',
          ]),
          nar('その下に、一度だけ、きれいに書かれた字があった。「太田　正一」――先生の名前だった。', [
            'Below it, just once, beautifully written: “Ōta Shōichi” — the master’s own name.',
            'Darunter, ein einziges Mal, wunderschön geschrieben: „Ōta Shōichi“ – der Name des Meisters selbst.',
          ]),
        ],
        teach: ['v:n2_0804', 'v:n2_1527', 'v:kotozuke', 'v:n2_1709'],
      },
      {
        at: 'ota',
        goal: ['Bring the practice book to Mr. Ōta', 'Bring das Übungsheft zu Herrn Ōta'],
        music: 'memory',
        lines: [
          nar('練習帳を見た太田先生は、長いあいだ、何も言わなかった。', ['Mr. Ōta looks at the practice book and is silent for a long time.', 'Herr Ōta betrachtet das Übungsheft und schweigt lange.']),
          l('ota', '家内は、字が下手だと笑っていました。{派手|はで|v:n2_1446}なことの嫌いな、静かな人でした。……わたしの名前を、こんなに。', [
            'My wife used to laugh that her handwriting was poor. A quiet person who disliked anything showy. …My name — so many times.',
            'Meine Frau lachte immer, sie schreibe schlecht. Ein stiller Mensch, der nichts Auffälliges mochte. …Meinen Namen – so oft.',
          ]),
          l('ota', '書く{最中に||g:saichuuni}、いつも家内の顔が{浮かんで|うかんで|v:n2_0217}、手が止まった。でも今は、隣で一緒に筆を持っている気がいたします。', [
            'Every time, in the middle of writing, her face came to mind and my hand stopped. But now I feel she is holding the brush beside me.',
            'Jedes Mal, mitten im Schreiben, tauchte ihr Gesicht vor mir auf, und meine Hand hielt inne. Aber jetzt ist mir, als hielte sie neben mir den Pinsel.',
          ]),
          nar('先生は筆を取り、一息で書いた。「太田　千鶴」。', ['The master takes up the brush and writes in one breath: “Ōta Chizuru”.', 'Der Meister nimmt den Pinsel und schreibt in einem Atemzug: „Ōta Chizuru“.']),
          l('ota', '名前は、人と人との{繋がり|つながり|v:n2_1215}そのものでございますね。名前{について||g:x_nitsuite}、わたしは三十年、家内から教わっていたのかもしれません。', [
            'A name is the very bond between people, isn’t it. Perhaps for thirty years my wife has been teaching me about names.',
            'Ein Name ist das Band zwischen Menschen selbst, nicht wahr. Vielleicht hat meine Frau mich dreißig Jahre lang über Namen belehrt.',
          ], 'happy'),
          l('ota', '@name様は、{偉い|えらい|v:n2_0256}方です。人の心の箱を、そっと開けてくださる。……時が経つ{とともに||g:totomoni}、この字も、きっと優しくなるでしょう。', [
            '@name, you are a remarkable person. You gently open the boxes in people’s hearts. …As time passes, this writing too will surely become gentler.',
            '@name, Sie sind ein bemerkenswerter Mensch. Sie öffnen behutsam die Kästchen in den Herzen der Menschen. …Mit der Zeit wird gewiss auch diese Schrift sanfter werden.',
          ], 'happy'),
        ],
        teach: ['v:n2_1446', 'v:n2_0217', 'v:n2_1215', 'v:n2_0256', 'g:saichuuni', 'g:x_nitsuite', 'g:totomoni'],
      },
    ],
  },
];
