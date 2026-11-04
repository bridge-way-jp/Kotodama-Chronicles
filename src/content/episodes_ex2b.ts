import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 2, second round: Masaji, Risa, Mr. Uchida, Dr. Sanae. */
export const EPISODES_EX2B: Episode[] = [
  // ------------------------------------------------------------------ Masaji: the price of rice
  {
    id: 'ep_ex_masaji2',
    chapter: 2,
    after: 'mq9',
    who: 'ex_masaji',
    title: ['米の値段', 'The Price of Rice', 'Der Preis des Reises'],
    summary: [
      'Masaji takes his upper-terrace rice to the market for the first time. Will anyone pay what it is worth?',
      'Masaji bringt seinen Reis von den oberen Terrassen zum ersten Mal auf den Markt. Wird jemand zahlen, was er wert ist?',
    ],
    scenes: [
      {
        at: 'ex_masaji',
        goal: ['Talk to Masaji about selling his rice', 'Sprich mit Masaji über den Verkauf seines Reises'],
        lines: [
          l('ex_masaji', '{市場|いちば|v:n3_0391}で、わしの{米|こめ}を{売|う}ってみようと{思|おも}う。{価格|かかく|v:kakaku}は{毎日|まいにち}{変|か}わる。{安定|あんてい|v:n3_0358}しとらんのじゃ。', ['I think I’ll try selling my rice at the market. The price changes every day. It isn’t stable.', 'Ich will meinen Reis auf dem Markt verkaufen. Der Preis ändert sich jeden Tag. Er ist nicht stabil.']),
          l('ex_masaji', '{およそ||v:n3_0534}{一|ひと}{俵|たわら}で、{普通|ふつう}の{米|こめ}の{倍|ばい}の{値|ね}がつけばいいが。{一方|いっぽう|v:n3_0403}、{安|やす}く{売|う}れば、{買|か}う{人|ひと}は{喜|よろこ}ぶ。', ['If one bale could get about twice the price of ordinary rice. On the other hand, if I sell cheap, buyers are happy.', 'Wenn ein Ballen ungefähr den doppelten Preis von gewöhnlichem Reis erzielen könnte. Andererseits freuen sich Käufer über einen niedrigen Preis.']),
        ],
        teach: ['v:n3_0391', 'v:kakaku', 'v:n3_0358', 'v:n3_0534', 'v:n3_0403'],
      },
      {
        at: 'ex_masaji',
        goal: ['Go to the market with Masaji', 'Geh mit Masaji zum Markt'],
        lines: [
          nar('{市場|いちば}の{朝|あさ}。{買|か}い{手|て}の{多|おお}くは、{主に|おもに|v:n3_0531}{料理人|りょうりにん}たちだ。{米|こめ}を{一|ひと}つぶ{口|くち}に{入|い}れて、{首|くび}をかしげる。', ['Morning at the market. Most of the buyers are mainly chefs. They put a single grain in their mouths and tilt their heads.', 'Morgens auf dem Markt. Die meisten Käufer sind hauptsächlich Köche. Sie stecken sich ein einzelnes Korn in den Mund und neigen den Kopf.']),
          l('ex_masaji', '{税金|ぜいきん}を{納める|おさめる|v:n3_0506}ために、{米|こめ}を{売|う}る{農家|のうか}も{多|おお}い。……わしの{米|こめ}は、{安|やす}く{見|み}られたくない。', ['Many farmers sell rice in order to pay their taxes. …I don’t want my rice looked down on as cheap.', 'Viele Bauern verkaufen Reis, um ihre Steuern zu zahlen. … Ich möchte nicht, dass mein Reis als billig angesehen wird.'], 'worried'),
        ],
        teach: ['v:n3_0531', 'v:n3_0506'],
      },
      {
        at: 'ex_masaji',
        goal: ['Hear how the rice sold', 'Hör, wie sich der Reis verkauft hat'],
        music: 'memory',
        lines: [
          l('ex_masaji', '{会計|かいけい|v:n3_0553}をしたら、{想像|そうぞう}の{倍|ばい}の{金|かね}じゃった。{料理人|りょうりにん}が「{毎年|まいとし}、{送|おく}ってくれ」と{言|い}うてな。', ['At the till, the sum was double what I’d imagined. A chef said, “Send me some every year.”', 'An der Kasse war es doppelt so viel, wie ich gedacht hatte. Ein Koch sagte: „Schicken Sie mir jedes Jahr welchen.“'], 'happy'),
          l('ex_masaji', '{運転|うんてん|v:n3_0464}して{帰|かえ}る{道|みち}で、{涙|なみだ}が{出|で}た。……{田|た}んぼは、まだ{終|お}わらんぞ。', ['On the drive home, tears came. …The paddies aren’t finished yet.', 'Auf der Heimfahrt kamen mir die Tränen. … Die Reisfelder sind noch nicht am Ende.'], 'happy'),
        ],
        teach: ['v:n3_0553', 'v:n3_0464'],
      },
    ],
  },
  // ------------------------------------------------------------------ Risa: the painter at the café
  {
    id: 'ep_ex_risa2',
    chapter: 2,
    after: 'mq9',
    who: 'ex_risa',
    title: ['カフェの画家', 'The Painter in the Café', 'Der Maler im Café'],
    summary: [
      'A travelling painter stays at Risa’s café for a week and leaves her a scroll — a picture of the village.',
      'Ein reisender Maler bleibt eine Woche in Risas Café und hinterlässt ihr eine Schriftrolle — ein Bild des Dorfes.',
    ],
    scenes: [
      {
        at: 'ex_risa',
        goal: ['Meet the painter at the café', 'Triff den Maler im Café'],
        lines: [
          l('ex_risa', '{いらっしゃい||v:n3_0421}……あら、{違|ちが}った。{お客|きゃく}さんじゃなくて、{画家|がか|v:n3_0570}の{先生|せんせい}ね。', ['Welcome… oh, I made a mistake. Not a customer, but the painter.', 'Willkommen … ach, falsch. Kein Gast, sondern der Maler.']),
          l('ex_risa', '{空き|あき|v:n3_0306}の{席|せき}を{全部|ぜんぶ}お{使|つか}いください。この{村|むら}を{描|えが}くなら、{窓|まど}の{景色|けしき}が{一番|いちばん}です。{いわゆる||v:n3_0427}「{特等席|とくとうせき}」ですよ。', ['Please use all the free seats. If you’re painting this village, the window view is best. It’s what you might call the “best seat”.', 'Bitte benutzen Sie alle freien Plätze. Wenn Sie dieses Dorf malen, ist die Aussicht aus dem Fenster am besten. Das ist sozusagen der „Ehrenplatz“.']),
        ],
        teach: ['v:n3_0421', 'v:n3_0570', 'v:n3_0306', 'v:n3_0427'],
      },
      {
        at: 'ex_risa',
        goal: ['Bring the painter some sweets', 'Bring dem Maler etwas Süßes'],
        lines: [
          nar('{画家|がか}は、{一週間|いっしゅうかん}、{毎日|まいにち}{同|おな}じ{席|せき}で{絵|え}を{描|か}いた。{お礼|おれい}に、リサさんは{手作|てづく}りの{菓子|かし|v:n3_0605}を{贈った|おくった|v:n3_0501}。', ['For a week the painter painted at the same seat every day. In thanks, Risa gave him handmade sweets.', 'Eine Woche lang malte der Maler jeden Tag am selben Platz. Als Dank schenkte Risa ihm selbst gemachte Süßigkeiten.']),
          l('ex_risa', 'この{絵|え}、{印刷|いんさつ|v:n3_0429}して、お{店|みせ}のポスターにしてもいいですか？……ええっ、{掛け軸|かけじく|v:kakejiku}にしてくれるんですか？', ['May I print this picture and use it as a poster for the shop? …What, you’ll make it into a hanging scroll for me?', 'Darf ich dieses Bild drucken und als Plakat für das Café verwenden? … Was, Sie machen eine Hängerolle daraus?'], 'surprised'),
        ],
        teach: ['v:n3_0605', 'v:n3_0501', 'v:n3_0429', 'v:kakejiku'],
      },
    ],
  },
  // ------------------------------------------------------------------ Mr. Uchida: dawn on the lake
  {
    id: 'ep_ex_uchida2',
    chapter: 2,
    after: 'mq9',
    who: 'ex_uchida',
    title: ['夜が明けるまで', 'Until the Night Breaks', 'Bis die Nacht endet'],
    summary: [
      'Mr. Uchida takes the player on a night watch at the dam, where the old village reappears with the dawn.',
      'Herr Uchida nimmt den Spieler mit auf die Nachtwache am Damm, wo das alte Dorf mit der Morgendämmerung wieder auftaucht.',
    ],
    scenes: [
      {
        at: 'ex_uchida',
        goal: ['Keep watch with Mr. Uchida', 'Halte mit Herrn Uchida Wache'],
        evening: true,
        lines: [
          l('ex_uchida', '{夜|よ}が{明ける|あける|v:n3_0312}まで、ここで{見張|みは}る。ダムの{水|みず}は、{エネルギー||v:n3_0475}にもなるし、{洪水|こうずい}も{起|お}こす。', ['I keep watch here until night turns to dawn. The dam’s water can become energy, and can cause floods too.', 'Ich halte hier Wache, bis die Nacht der Dämmerung weicht. Das Wasser des Damms kann zu Energie werden, aber auch Überschwemmungen verursachen.']),
          l('ex_uchida', '{今に|いまに|v:n3_0414}{雨|あめ}が{降|ふ}る。{雲|くも}が{重なる|かさなる|v:n3_0601}と、{川|かわ}の{音|おと}が{変|か}わるんじゃ。', ['It will rain soon. When the clouds pile up, the sound of the river changes.', 'Bald wird es regnen. Wenn sich die Wolken übereinanderschieben, ändert sich das Rauschen des Flusses.']),
        ],
        teach: ['v:n3_0312', 'v:n3_0475', 'v:n3_0414', 'v:n3_0601'],
      },
      {
        at: 'ext_dam',
        goal: ['Watch the lake at dawn', 'Sieh bei Sonnenaufgang auf den See'],
        lines: [
          nar('{朝日|あさひ}が{昇|のぼ}る。{水面|すいめん}に、{古|ふる}い{屋根|やね}の{形|かたち}が{姿|すがた}を{現す|あらわす|v:n3_0342}。ここに{村|むら}が{在った|あった|v:n3_0347}という{証|あかし}だ。', ['The morning sun rises. On the water’s surface the shape of old roofs shows itself. Proof that a village once stood here.', 'Die Morgensonne geht auf. Auf der Wasseroberfläche zeigt sich die Form alter Dächer. Der Beweis, dass hier einmal ein Dorf stand.']),
          l('ex_uchida', '{子|こ}どもの{頃|ころ}、この{道|みち}を{友|とも}だちと{追う|おう|v:n3_0488}ように{走|はし}った。{追い付く|おいつく|v:n3_0486}と、{肩|かた}をたたきあって{笑|わら}った。', ['As a child, I ran along this road as if chasing my friends. When I caught up, we slapped shoulders and laughed.', 'Als Kind bin ich diese Straße entlanggerannt, als würde ich meine Freunde verfolgen. Wenn ich sie einholte, klopften wir uns auf die Schultern und lachten.']),
        ],
        teach: ['v:n3_0342', 'v:n3_0347', 'v:n3_0488', 'v:n3_0486'],
      },
    ],
  },
  // ------------------------------------------------------------------ Dr. Sanae: a lesson for the new vet
  {
    id: 'ep_ex_sanae2',
    chapter: 2,
    after: 'mq9',
    who: 'ex_sanae',
    title: ['子牛が来た日', 'The Day the Calf Came', 'Der Tag, an dem das Kalb kam'],
    summary: [
      'A calf is born in the night, and Dr. Sanae teaches a young student how to be present at a birth.',
      'In der Nacht wird ein Kalb geboren, und Dr. Sanae zeigt einer jungen Studentin, wie man bei einer Geburt dabei ist.',
    ],
    scenes: [
      {
        at: 'ex_sanae',
        goal: ['Visit the clinic at night', 'Besuche nachts die Tierklinik'],
        evening: true,
        lines: [
          l('ex_sanae', '{実習生|じっしゅうせい}の{美咲|みさき}さんは、{学習|がくしゅう|v:n3_0587}{意欲|いよく}が{高|たか}いの。でも、{外出|がいしゅつ|v:n3_0559}{禁止|きんし}の{夜|よる}も、{一人|ひとり}で{牛舎|ぎゅうしゃ}に{来|き}ちゃうのよ。', ['The trainee Misaki is very eager to learn. But even on nights when going out is banned, she comes to the cowshed alone.', 'Die Praktikantin Misaki ist sehr lernbegierig. Aber auch in Nächten, in denen das Ausgehen verboten ist, kommt sie allein in den Stall.']),
          l('ex_sanae', '{牛|うし}の{意思|いし|v:n3_0371}は、{言葉|ことば}では{分|わ}からない。だから、{目|め}を{見|み}て、{体|からだ}に{手|て}を{当てる|あてる|v:n3_0330}の。{いけない||v:n3_0369}ことは、{急|いそ}ぐことよ。', ['You can’t tell a cow’s will in words. So you look in its eyes and put your hand on its body. What you mustn’t do is rush.', 'Den Willen einer Kuh erkennt man nicht an Worten. Also schaut man ihr in die Augen und legt die Hand auf ihren Körper. Was man nicht darf, ist hetzen.']),
        ],
        teach: ['v:n3_0587', 'v:n3_0559', 'v:n3_0371', 'v:n3_0330', 'v:n3_0369'],
      },
      {
        at: 'ex_sanae',
        goal: ['Be there when the calf is born', 'Sei dabei, wenn das Kalb geboren wird'],
        evening: true,
        music: 'memory',
        lines: [
          nar('{牛舎|ぎゅうしゃ}の{夜|よる}。{母牛|ははうし}を{囲む|かこむ|v:n3_0599}ように、{皆|みな}が{静|しず}かに{立|た}っている。{一|ひと}つ、{大|おお}きな{息|いき}。そして、{子牛|こうし}が{生|う}まれた。', ['A night in the cowshed. Everyone stands quietly as if surrounding the mother cow. One big breath. And then the calf is born.', 'Nacht im Kuhstall. Alle stehen still wie um die Mutterkuh herum. Ein tiefer Atemzug. Und dann ist das Kalb geboren.']),
          l('ex_sanae', '{演技|えんぎ|v:n3_0480}では{出|だ}せない{安心|あんしん}が、{顔|かお}に{出|で}てるわね。{あるいは||v:n3_0349}、{涙|なみだ}かしら。', ['A relief you can’t fake shows on your face. Or perhaps those are tears.', 'Auf deinem Gesicht zeigt sich eine Erleichterung, die man nicht spielen kann. Oder sind es Tränen?'], 'happy'),
          l('ex_sanae', '{挙げる|あげる|v:n3_0314}ほどの{大|おお}きな{事件|じけん}じゃない。でも、この{仕事|しごと}を{終える|おえる|v:n3_0494}{時|とき}まで、{今夜|こんや}を{忘|わす}れないで。', ['It’s not a big event worth listing. But until the day you finish this work, don’t forget tonight.', 'Es ist kein so großes Ereignis, dass man es aufzählen müsste. Aber vergiss diese Nacht nicht, bis du diese Arbeit beendest.'], 'happy'),
        ],
        teach: ['v:n3_0599', 'v:n3_0480', 'v:n3_0349', 'v:n3_0314', 'v:n3_0494'],
      },
    ],
  },
];
