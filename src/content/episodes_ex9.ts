import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 7: the people of the northern ranch and snow town in Hokkaidō (content/expansion2.ts). */
export const EPISODES_EX9: Episode[] = [
  {
    id: 'ep_ex_gorou', chapter: 7, after: 'mq27', who: 'hk_gorou',
    title: ['牛が待つ朝', 'The Morning the Cows Wait', 'Der Morgen, auf den die Kühe warten'],
    summary: ['A dairy farmer’s son refuses to take over. A calf’s birth in a snowstorm changes both of them.', 'Der Sohn eines Milchbauern will den Hof nicht übernehmen. Die Geburt eines Kalbs im Schneesturm verändert beide.'],
    scenes: [
      { at: 'hk_gorou', goal: ['Talk to Gorō at the barn', 'Sprich mit Gorō am Stall'],
        lines: [
          l('hk_gorou', '{朝|あさ}の{五時|ごじ}、{牛乳|ぎゅうにゅう|v:kf_gyuunyuu}を{搾|しぼ}る。{有機|ゆうき|v:n3_2130}の{牧草|ぼくそう}だけで、{育|そだ}ててきた。{難|むずか|v:n3_2093}しい{仕事|しごと}だよ。', ['At five in the morning I milk. I’ve raised them only on organic grass. It’s a hard job.', 'Um fünf Uhr morgens melke ich. Ich habe sie nur mit Bio-Gras großgezogen. Es ist eine schwere Arbeit.']),
          l('hk_gorou', '{牛舎|ぎゅうしゃ}の{一部分|いちぶぶん}には、{草|くさ}の{生|は}え{た|た}ままの{土|つち}を{残|のこ}してある。{牛|うし}には、ここが{落|お}ち{着|つ}くらしい。', ['In part of the cowshed I’ve left earth with grass still growing. The cows seem to settle here.', 'In einem Teil des Stalls habe ich Erde mit wachsendem Gras gelassen. Hier scheinen die Kühe zur Ruhe zu kommen.']),
        ], teach: ['v:kf_gyuunyuu', 'v:n3_2130', 'v:n3_2093'] },
      { at: 'exh2_barn', goal: ['Help with the calf in the snowstorm', 'Hilf beim Kalb im Schneesturm'], evening: true,
        lines: [
          nar('{吹雪|ふぶき}の{夜|よる}、{産気|さんけ}づいた{母牛|ははうし}の{横|よこ}で、{息子|むすこ}が{震|ふる}える{手|て}で{ロープ|ろーぷ}を{引|ひ}いた。{藁|わら}に{交ざる|まざる|v:n3_1977}ように、{血|ち}と{雪|ゆき}が{落|お}ちる。', ['In the snowstorm night, beside the cow in labour, the son pulled the rope with trembling hands. Blood and snow fell as if mixed into the straw.', 'In der Schneesturmnacht zog der Sohn neben der kreißenden Kuh mit zitternden Händen am Seil. Blut und Schnee fielen, als würden sie sich ins Stroh mischen.']),
          l('hk_gorou', '{一部|いちぶ|v:n3_1893}の{牛|うし}しか、{名前|なまえ}を{覚|おぼ}えとらん、と{思|おも}っとった。……{息子|むすこ}は、{全部|ぜんぶ}、{覚|おぼ}えとった。', ['I thought he only remembered the names of some of the cows. …The boy remembered all of them.', 'Ich dachte, er kennt nur die Namen mancher Kühe. … Der Junge kannte sie alle.'], 'surprised'),
        ], teach: ['v:n3_1893', 'v:n3_1977'] },
      { at: 'hk_gorou', goal: ['Hear what the son said', 'Hör, was der Sohn gesagt hat'], music: 'memory',
        lines: [
          l('hk_gorou', '{春|はる}、{息子|むすこ}は{髭|ひげ}を{生やし|はやし|v:n3_2103}て、もう{立派|りっぱ}な{牛飼|うしか}いの{顔|かお}になっとった。「{俺|おれ}が、{継|つ}ぐよ」と、{一言|ひとこと}だけ。', ['In spring my son had grown a beard and already had the face of a fine cowherd. “I’ll take over,” he said, just those words.', 'Im Frühling hatte sich mein Sohn einen Bart wachsen lassen und sah schon aus wie ein richtiger Kuhhirte. „Ich übernehme“, sagte er nur das eine.'], 'happy'),
          l('hk_gorou', '{牛|うし}は、{毎朝|まいあさ}、{待|ま}ってくれる。……{息子|むすこ}も、{待|ま}っとってくれたんじゃな。', ['The cows wait for me every morning. …It seems my son was waiting for me too.', 'Die Kühe warten jeden Morgen auf mich. … Mein Sohn hat wohl auch auf mich gewartet.'], 'happy'),
        ], teach: ['v:n3_2103'] },
    ],
  },
  {
    id: 'ep_ex_chiaki', chapter: 7, after: 'mq27', who: 'hk_chiaki',
    title: ['母のレシピ帳', 'Mother’s Recipe Book', 'Mutters Rezeptbuch'],
    summary: ['A cheese maker wins a prize for her late mother’s recipe — and finds the book’s last page.', 'Eine Käsemacherin gewinnt einen Preis für das Rezept ihrer verstorbenen Mutter — und findet die letzte Seite des Buches.'],
    scenes: [
      { at: 'hk_chiaki', goal: ['Visit the cheese workshop', 'Besuche die Käserei'],
        lines: [
          l('hk_chiaki', '{表面|ひょうめん}の{膜|まく|v:n3_2120}が、{少|すこ}しずつ{固|かた}まっていく。{火|ひ}を{強める|つよめる|v:n3_2073}と、{味|あじ}が{変|か}わる。{弱める|よわめる|v:n3_2135}と、{香|かお}りが{逃|に}げる。', ['The film on the surface firms up little by little. If you strengthen the heat the taste changes; if you weaken it, the aroma escapes.', 'Die Haut an der Oberfläche wird nach und nach fest. Verstärkt man die Hitze, ändert sich der Geschmack; schwächt man sie, entweicht das Aroma.']),
          l('hk_chiaki', '{母|はは}の{ノート|のーと}は、{背|せ}が{擦|す}り{切|き}れるまで、{綴じ|とじ|v:n3_2088}{直|なお}してあります。{混じる|まじる|v:n3_1978}{ミルク|みるく}の{割合|わりあい}が、{秘密|ひみつ}なんです。', ['Mother’s notebook has been rebound until its spine wore out. The proportion of milk mixed in is the secret.', 'Mutters Heft wurde neu gebunden, bis der Rücken abgenutzt war. Das Mischverhältnis der Milch ist das Geheimnis.']),
        ], teach: ['v:n3_2120', 'v:n3_2073', 'v:n3_2135', 'v:n3_2088', 'v:n3_1978'] },
      { at: 'exh2_cheese', goal: ['See the prize ceremony', 'Sieh die Preisverleihung'],
        lines: [
          nar('{表彰式|ひょうしょうしき}。{賞状|しょうじょう}の{タイトル|たいとる|v:n3_2058}には、{母|はは}の{名前|なまえ}が、{小|ちい}さく{並|なら}んでいた。{チアキ|ちあき}さんは、{震|ふる}える{手|て}で、{それ|それ}を{受|う}け{取|と}った。', ['The award ceremony. In the title of the certificate, her mother’s name was listed in small letters. Chiaki took it with trembling hands.', 'Die Preisverleihung. Im Titel der Urkunde stand klein der Name ihrer Mutter. Chiaki nahm sie mit zitternden Händen entgegen.']),
        ], teach: ['v:n3_2058'] },
      { at: 'hk_chiaki', goal: ['Hear what she found in the notebook', 'Hör, was sie im Heft gefunden hat'], music: 'memory',
        lines: [
          l('hk_chiaki', '{最後|さいご}のページに、{母|はは}の{字|じ}で、「{千秋|ちあき}へ。{味|あじ}は、{人|ひと}の{手|て}で、{変|か}わっていい」と。……{母|はは}は、{私|わたし}の{味|あじ}を、{許|ゆる}してくれていたんです。', ['On the last page, in her handwriting: “To Chiaki: the taste may change with the person’s hands.” …Mother had allowed me my own taste.', 'Auf der letzten Seite stand in ihrer Schrift: „Für Chiaki: Der Geschmack darf sich mit den Händen des Menschen verändern.“ … Meine Mutter hatte mir meinen eigenen Geschmack erlaubt.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_tomoya', chapter: 7, after: 'mq27', who: 'hk_tomoya',
    title: ['誰も乗らない電車に', 'To the Train Nobody Boards', 'Dem Zug, in den niemand einsteigt'],
    summary: ['The line will close. The station master keeps waving his flag until the last train.', 'Die Strecke wird stillgelegt. Der Bahnhofsvorsteher winkt mit seiner Fahne bis zum letzten Zug.'],
    scenes: [
      { at: 'hk_tomoya', goal: ['Talk to the station master', 'Sprich mit dem Bahnhofsvorsteher'],
        lines: [
          l('hk_tomoya', '{ホーム|ほーむ|v:n3_1940}は、{雪|ゆき}の{中|なか}でも、{毎朝|まいあさ}かきます。{ダウン|だうん|v:n3_2059}ジャケットの{背中|せなか}に、{氷|こおり}が{付|つ}くほど。', ['I clear the platform every morning, even in snow. Until ice forms on the back of my down jacket.', 'Den Bahnsteig fege ich jeden Morgen, auch im Schnee. So lange, bis sich Eis auf dem Rücken meiner Daunenjacke bildet.']),
          l('hk_tomoya', '{廃線|はいせん}は、もう{決|き}まりました。{断つ|たつ|v:n3_2061}ことは、{簡単|かんたん}。でも、{一日|いちにち}三本の{電車|でんしゃ}を{待|ま}つ{人|ひと}が、まだいるんです。', ['The closure is already decided. Cutting a line is easy. But there are still people waiting for the three trains a day.', 'Die Stilllegung ist schon beschlossen. Eine Strecke abzubrechen ist leicht. Aber es gibt noch Leute, die auf die drei Züge am Tag warten.'], 'worried'),
        ], teach: ['v:n3_1940', 'v:n3_2059', 'v:n3_2061'] },
      { at: 'exh2_station', goal: ['Stand on the platform with him', 'Stell dich mit ihm auf den Bahnsteig'],
        lines: [
          nar('{小|ちい}さな{待合室|まちあいしつ}。おじいさんが、{杖|つえ}に{添う|そう|v:n3_2050}ように{腰|こし}かけて、{窓|まど}の{外|そと}を{見|み}ている。{電車|でんしゃ}の{音|おと}が{少|すこ}しずつ{高まる|たかまる|v:n3_2060}。', ['The little waiting room. An old man sits leaning along his cane, looking out the window. The sound of the train grows louder little by little.', 'Der kleine Warteraum. Ein alter Mann sitzt an seinen Stock gelehnt und schaut aus dem Fenster. Das Geräusch des Zuges wird nach und nach lauter.']),
          l('hk_tomoya', '{並|なみ|v:n3_2090}の{駅|えき}なら、{毎日|まいにち}、{何百人|なんびゃくにん}も{乗|の}ります。ここは、{一人|ひとり}。でも、その{一人|ひとり}には、この{駅|えき}が、{世界|せかい}の{全部|ぜんぶ}なんです。', ['In an ordinary station hundreds board every day. Here it’s one person. But to that one person, this station is the whole world.', 'In einem gewöhnlichen Bahnhof steigen jeden Tag Hunderte ein. Hier ist es einer. Aber für diesen einen ist dieser Bahnhof die ganze Welt.']),
        ], teach: ['v:n3_2050', 'v:n3_2060', 'v:n3_2090'] },
      { at: 'hk_tomoya', goal: ['See the last train', 'Sieh den letzten Zug'], music: 'memory',
        lines: [
          l('hk_tomoya', '{最終日|さいしゅうび}、{町|まち}じゅうの{人|ひと}が、{ホーム|ほーむ}に{集|あつ}まりました。{三百人|さんびゃくにん}。{初|はじ}めて、{旗|はた}を、{皆|みな}で{振|ふ}りました。', ['On the final day the whole town gathered on the platform. Three hundred people. For the first time, we all waved the flag together.', 'Am letzten Tag versammelte sich die ganze Stadt auf dem Bahnsteig. Dreihundert Menschen. Zum ersten Mal haben wir alle gemeinsam die Fahne geschwenkt.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_hotaru', chapter: 7, after: 'mq27', who: 'hk_hotaru',
    title: ['故郷の味のスープ', 'The Soup of Home', 'Die Suppe der Heimat'],
    summary: ['A stranger in the ramen shop recognises the taste of his childhood, and her story comes out.', 'Ein Fremder im Ramen-Laden erkennt den Geschmack seiner Kindheit, und ihre Geschichte kommt heraus.'],
    scenes: [
      { at: 'hk_hotaru', goal: ['Eat at the ramen shop', 'Iss im Ramen-Laden'],
        lines: [
          l('hk_hotaru', '{マスター|ますたー|v:n3_1982}が{残|のこ}した{寸胴|ずんどう}の{味|あじ}を、{二十年|にじゅうねん}、{守|まも}ってきたの。{別|べつ|v:n3_1916}に、{特別|とくべつ}な{材料|ざいりょう}はないのよ。', ['I’ve guarded for twenty years the taste of the big pot the master left behind. There are no special ingredients, really.', 'Zwanzig Jahre habe ich den Geschmack des großen Topfes bewahrt, den der Meister hinterließ. Besondere Zutaten gibt es gar nicht.']),
          l('hk_hotaru', '{まあ|まあ|v:n3_1962}、{座|すわ}って。{醤油|しょうゆ}と{塩|しお}が、{交じる|まじる|v:n3_1979}{順番|じゅんばん}が、{大|おお}事なの。', ['Well, sit down. The order in which soy sauce and salt mix is what matters.', 'Na, setz dich. Entscheidend ist die Reihenfolge, in der sich Sojasauce und Salz mischen.']),
        ], teach: ['v:n3_1982', 'v:n3_1916', 'v:n3_1962', 'v:n3_1979'] },
      { at: 'exh2_ramen', goal: ['Watch the stranger taste the soup', 'Sieh, wie der Fremde die Suppe probiert'],
        lines: [
          nar('{窓|まど}から、{朝日|あさひ}が{まぶしい|まぶしい|v:n3_1997}ほど{差|さ}し{込|こ}む。{見|み}{知|し}らぬ{男|おとこ}が、{一口|ひとくち}、スープを{飲|の}んで、{動|うご}かなくなった。{埃|ほこり|v:n3_1944}が、{光|ひかり}の{中|なか}で、{舞|ま}っている。', ['The morning sun pours in so dazzlingly through the window. A strange man takes one sip of soup and goes still. Dust dances in the light.', 'Die Morgensonne scheint so blendend durchs Fenster. Ein fremder Mann nimmt einen Schluck Suppe und erstarrt. Staub tanzt im Licht.']),
          l('hk_hotaru', '「……{父|ちち}の{味|あじ}だ」と、{彼|かれ}は{言|い}った。{亡|な}くなった{マスター|ますたー}は、{彼|かれ}の{父|ちち}だったの。{二十年|にじゅうねん}、{探|さが}していたんですって。', ['“…It’s my father’s taste,” he said. The late master was his father. He had been searching for twenty years, he said.', '„… Das ist der Geschmack meines Vaters“, sagte er. Der verstorbene Meister war sein Vater. Er habe zwanzig Jahre gesucht, sagte er.'], 'surprised'),
        ], teach: ['v:n3_1997', 'v:n3_1944'] },
      { at: 'hk_hotaru', goal: ['Hear what came of it', 'Hör, was daraus wurde'], music: 'memory',
        lines: [
          l('hk_hotaru', '{彼|かれ}は、{毎週|まいしゅう}、{手伝|てつだ}いに{来|き}てくれるようになったわ。{寸胴|ずんどう}の{前|まえ}に{並|なら}んで、{同|おな}じ{湯気|ゆげ}を、{浴|あ}びながら。', ['He now comes to help every week. Standing in front of the pot, bathing in the same steam.', 'Er kommt jetzt jede Woche zum Helfen. Er steht vor dem Topf und badet im selben Dampf.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_ryo', chapter: 7, after: 'mq27', who: 'hk_ryo',
    title: ['七人目の選手', 'The Seventh Player', 'Die siebte Spielerin'],
    summary: ['A girl is not allowed to play in official hockey matches. Her coach looks for a way.', 'Ein Mädchen darf bei offiziellen Eishockeyspielen nicht mitspielen. Ihr Trainer sucht einen Weg.'],
    scenes: [
      { at: 'hk_ryo', goal: ['Talk to the coach at the gym', 'Sprich mit dem Trainer in der Turnhalle'],
        lines: [
          l('hk_ryo', '{盾|たて|v:n3_2062}のような{防具|ぼうぐ}をつけて、{一日|いちにち}{三百回|さんびゃっかい}、ゴールを{狙|ねら}う。{彼女|かのじょ}のシュートは、チームで{一番|いちばん}{優|すぐ|v:n3_2129}れている。', ['Wearing shield-like pads, she aims at the goal three hundred times a day. Her shot is the best on the team.', 'Mit schildartigen Schonern zielt sie am Tag dreihundertmal aufs Tor. Ihr Schuss ist der beste im Team.']),
          l('hk_ryo', 'でも、{公式戦|こうしきせん}の{規則|きそく}では、{女|おんな}の{子|こ}は{出|で}られない。{負|ま}けて{帰|かえ}る{夜|よる}より、{出|だ}せなかった{夜|よる}が、{一番|いちばん}、{敗|やぶ|v:n3_2099}れた{気|き}がする。', ['But under the rules for official matches, girls can’t play. More than nights I come home losing, the nights I couldn’t send her out feel the most like defeat.', 'Aber nach den Regeln für offizielle Spiele dürfen Mädchen nicht antreten. Mehr als die Abende, an denen wir verlieren, fühlen sich die Abende wie eine Niederlage an, an denen ich sie nicht einsetzen konnte.'], 'worried'),
        ], teach: ['v:n3_2062', 'v:n3_2129', 'v:n3_2099'] },
      { at: 'exh2_gym', goal: ['Watch the practice match', 'Sieh dir das Trainingsspiel an'],
        lines: [
          nar('{練習試合|れんしゅうじあい}。{女|おんな}の{子|こ}が、{パック|ぱっく}を{ぶつける|ぶつける|v:n3_1888}ように、{鋭|するど}く{打|う}った。{ゴール|ごーる}の{網|あみ}が、{大|おお}きく{揺|ゆ}れる。{観客|かんきゃく}の{大人|おとな}が、{声|こえ}を{上|あ}げた。', ['A practice match. The girl shoots sharply, as if slamming the puck. The goal net shakes wide. The adult spectators cry out.', 'Ein Trainingsspiel. Das Mädchen schießt scharf, als würde sie den Puck dagegenknallen. Das Tornetz bebt gewaltig. Die erwachsenen Zuschauer rufen auf.']),
          l('hk_ryo', '{例|たと|v:n3_2063}え、{規則|きそく}が{変|か}わらなくても、{彼女|かのじょ}は{打|う}ち{続|つづ}ける。……{振り|ふり|v:n3_2113}{返|かえ}ると、{町|まち}の{人|ひと}が、{皆|みな}、{見|み}ていた。', ['Even if the rules never change, she will keep shooting. …When I turned round, the townspeople were all watching.', 'Selbst wenn sich die Regeln nie ändern, wird sie weiterschießen. … Als ich mich umdrehte, sahen alle Leute der Stadt zu.']),
        ], teach: ['v:n3_1888', 'v:n3_2063', 'v:n3_2113'] },
      { at: 'hk_ryo', goal: ['Hear about the new league', 'Hör von der neuen Liga'], music: 'memory',
        lines: [
          l('hk_ryo', '{町|まち}の{人|ひと}たちが、{署名|しょめい}を{集|あつ}めてくれた。{来年|らいねん}から、{男女|だんじょ}{混合|こんごう}の{町|まち}の{リーグ|りーぐ}を、{作|つく}る。{彼女|かのじょ}は、{七人目|ななにんめ}の{選手|せんしゅ}だ。', ['The townspeople collected signatures. From next year we’ll create a mixed town league. She is our seventh player.', 'Die Leute der Stadt haben Unterschriften gesammelt. Ab nächstem Jahr gründen wir eine gemischte Stadtliga. Sie ist unsere siebte Spielerin.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_utako', chapter: 7, after: 'mq27', who: 'hk_utako',
    title: ['意味を知る人', 'The One Who Knows the Meaning', 'Die Frau, die die Bedeutung kennt'],
    summary: ['An old embroiderer teaches the patterns’ meanings to a girl before the knowledge is lost.', 'Eine alte Stickerin lehrt ein Mädchen die Bedeutung der Muster, bevor das Wissen verloren geht.'],
    scenes: [
      { at: 'hk_utako', goal: ['Visit Utako by the fields', 'Besuche Utako bei den Feldern'],
        lines: [
          l('hk_utako', 'この{模様|もよう}は、{魔除|まよ}け。こっちは、{旅|たび}の{安全|あんぜん}。{布|ぬの}の{端|はし}を{接ぐ|はぐ|v:n3_2068}ときにも、{意味|いみ}がある。', ['This pattern wards off evil. This one is for a safe journey. Even joining the edges of the cloth has meaning.', 'Dieses Muster wehrt Böses ab. Dieses hier ist für eine sichere Reise. Auch beim Zusammenfügen der Stoffränder steckt Bedeutung.']),
          l('hk_utako', '{布|ぬの}が{裂ける|さける|v:n3_1999}と、{縫|ぬ}い{直|なお}す。{それ|それ}も、{大|おお}きな{刺繍|ししゅう}の、{一部|いちぶ}じゃよ。', ['When cloth tears, you sew it again. That, too, is part of the great embroidery.', 'Wenn der Stoff reißt, näht man ihn neu. Auch das ist Teil der großen Stickerei.']),
        ], teach: ['v:n3_2068', 'v:n3_1999'] },
      { at: 'exh2_farm', goal: ['Sit with Utako and a girl', 'Setz dich zu Utako und einem Mädchen'],
        lines: [
          nar('{松|まつ|v:n3_1988}の{木|き}の{下|した}で、{小|ちい}さな{女|おんな}の{子|こ}が、{歌子|うたこ}おばあの{針|はり}の{動|うご}きを、じっと{見|み}ている。{判|はん|v:n3_2105}を{押|お}すように、{一|ひと}つずつ、{模様|もよう}が{生|う}まれる。', ['Under a pine tree a little girl watches Utako’s needle movements intently. One by one, patterns are born as if stamped.', 'Unter einer Kiefer sieht ein kleines Mädchen Utakos Nadelbewegungen aufmerksam zu. Eins nach dem anderen entstehen Muster, wie mit einem Stempel.']),
          l('hk_utako', '{説く|とく|v:n3_2087}ほどの{知恵|ちえ}じゃないがね。……{何|なに}か、{問|と}いたいことは、{あるかい|あるかい}。', ['It’s hardly wisdom to expound. …Is there anything you want to ask?', 'Das ist kaum Weisheit, die man darlegen könnte. … Gibt es etwas, das du fragen möchtest?']),
        ], teach: ['v:n3_1988', 'v:n3_2105', 'v:n3_2087'] },
      { at: 'hk_utako', goal: ['Hear what the girl asked', 'Hör, was das Mädchen gefragt hat'], music: 'memory',
        lines: [
          l('hk_utako', '{女|おんな}の{子|こ}は、{私|わたし}に、{初|はじ}めて{問|と|v:n3_2080}う。「この{模様|もよう}は、{何|なに}？」……{私|わたし}が、ずっと{待|ま}っていた{問|と}いじゃった。', ['The girl asked me for the first time: “What is this pattern?” …It was the question I’d been waiting for all along.', 'Das Mädchen fragte mich zum ersten Mal: „Was ist dieses Muster?“ … Es war die Frage, auf die ich die ganze Zeit gewartet hatte.'], 'happy'),
        ], teach: ['v:n3_2080'] },
    ],
  },
  {
    id: 'ep_ex_ken2', chapter: 7, after: 'mq27', who: 'hk_ken2',
    title: ['薄くなる氷', 'The Thinning Ice', 'Das dünner werdende Eis'],
    summary: ['An ice-fishing guide must tell tourists the truth: the ice is not safe any more.', 'Ein Eisfischer-Führer muss Touristen die Wahrheit sagen: Das Eis ist nicht mehr sicher.'],
    scenes: [
      { at: 'hk_ken2', goal: ['Talk to the ice-fishing guide', 'Sprich mit dem Eisangel-Führer'],
        lines: [
          l('hk_ken2', '{氷|こおり}の{厚|あつ}さは、{毎朝|まいあさ}{測|はか}る。{昔|むかし}は、{三十|さんじゅう}センチが{普通|ふつう}だった。{今年|ことし}は、{十五|じゅうご}センチしかない。', ['I measure the ice’s thickness every morning. It used to be thirty centimetres as a rule. This year it’s only fifteen.', 'Jeden Morgen messe ich die Dicke des Eises. Früher waren dreißig Zentimeter normal. Dieses Jahr sind es nur fünfzehn.']),
          l('hk_ken2', '{堀|ほり|v:n3_1955}のように{深|ふか}い{割|わ}れ{目|め}が、{湖|みずうみ}の{端|はし}に{走|はし}ってな。{犬|いぬ}が、{吠える|ほえる|v:n3_1937}。{犬|いぬ}は、{人|ひと}より、{先|さき}に{気|き}づく。', ['A crack deep as a moat ran along the lake’s edge. The dog barks. Dogs notice before people do.', 'Ein tiefer Riss wie ein Graben lief am Rand des Sees entlang. Der Hund bellt. Hunde merken es vor den Menschen.'], 'worried'),
        ], teach: ['v:n3_1937', 'v:n3_1955'] },
      { at: 'hk_ken2', goal: ['Be there when the tourists come', 'Sei dabei, wenn die Touristen kommen'],
        lines: [
          nar('{観光客|かんこうきゃく}の{一団|いちだん}が、{氷|こおり}の{上|うえ}に{並|なら}んでいる。{マスコミ|ますこみ|v:n3_2121}の{カメラ|かめら}も、{来|き}ていた。{穴|あな}は、もう{三|みっ}つ、{掘|ほ}られている。', ['A group of tourists stands on the ice. Cameras of the media have come too. Three holes have already been drilled.', 'Eine Touristengruppe steht auf dem Eis. Auch Kameras der Medien sind gekommen. Drei Löcher sind schon gebohrt.']),
          l('hk_ken2', '{氷|こおり}の{割|わ}れた{音|おと}が、{股|また|v:n3_2122}の{下|した}で、{低|ひく}く{響|ひび}いた。「{皆|みな}さん、{今日|きょう}は、ここまでです」。……{捜査|そうさ|v:n3_2053}のような{目|め}で、{全員|ぜんいん}を、{数|かぞ}えた。', ['The sound of cracking ice rang low beneath the crotch. “Everyone, that’s it for today.” …With eyes like an investigator’s, I counted everybody.', 'Das Geräusch des brechenden Eises hallte tief zwischen den Beinen wider. „Meine Damen und Herren, das war es für heute.“ … Mit Augen wie ein Ermittler zählte ich alle durch.']),
        ], teach: ['v:n3_2121', 'v:n3_2122', 'v:n3_2053'] },
      { at: 'hk_ken2', goal: ['Hear what happened next', 'Hör, was dann geschah'], music: 'memory',
        lines: [
          l('hk_ken2', '{皆|みな}さんは、{怒|おこ}らなかった。{氷|こおり}の{上|うえ}に{臨|のぞ|v:n3_2097}んで、{静|しず}かに、{手|て}を{合|あ}わせてくれた。……{来年|らいねん}からは、{氷|こおり}の{博物館|はくぶつかん}を、{開|ひら}きます。', ['Nobody got angry. They looked out over the ice and quietly put their hands together. …From next year I’ll open an ice museum.', 'Niemand wurde böse. Sie blickten über das Eis und legten still die Hände zusammen. … Ab nächstem Jahr eröffne ich ein Eismuseum.'], 'happy'),
        ], teach: ['v:n3_2097'] },
    ],
  },
  {
    id: 'ep_ex_mizuho', chapter: 7, after: 'mq27', who: 'hk_mizuho',
    title: ['吹雪の日の読み聞かせ', 'Reading Aloud on a Snow Day', 'Vorlesen an einem Schneetag'],
    summary: ['On snow days the library is full of children — and one child has never turned a page.', 'An Schneetagen ist die Bibliothek voller Kinder — und ein Kind hat noch nie eine Seite umgeblättert.'],
    scenes: [
      { at: 'hk_mizuho', goal: ['Visit the library on a snow day', 'Besuche die Bibliothek an einem Schneetag'],
        lines: [
          l('hk_mizuho', '{吹雪|ふぶき}の{日|ひ}は、{学校|がっこう}が{休|やす}みになるから、{子|こ}どもたちが、{ベンチ|べんち|v:n3_1923}に{座|すわ}って、{本|ほん}を{待|ま}つの。', ['On blizzard days school is cancelled, so the children sit on the benches and wait for books.', 'An Schneesturmtagen fällt die Schule aus, also sitzen die Kinder auf den Bänken und warten auf Bücher.']),
          l('hk_mizuho', '{絵本|えほん}を{一枚|いちまい}ずつ{捲る|めくる|v:n3_2126}と、みんな{息|いき}を{止|と}める。{プラスチック|ぷらすちっく|v:n3_1899}の{カバー|かばー}が、ぱり、と{鳴|な}るたびに。', ['When I turn the picture book page by page, everyone holds their breath. Each time the plastic cover crackles.', 'Wenn ich das Bilderbuch Seite für Seite umblättere, halten alle den Atem an. Jedes Mal, wenn der Plastikumschlag knistert.']),
        ], teach: ['v:n3_1923', 'v:n3_2126', 'v:n3_1899'] },
      { at: 'exh2_library', goal: ['Meet the child who has never turned a page', 'Triff das Kind, das nie eine Seite umgeblättert hat'],
        lines: [
          nar('{隅|すみ}に、{一人|ひとり}の{男|おとこ}の{子|こ}。{本|ほん}には、{触|さわ}らない。{ミズホ|みずほ}さんは、{馴らす|ならす|v:n3_2092}ように、ゆっくり{隣|となり}に{座|すわ}った。', ['In a corner sits a boy. He doesn’t touch the books. Mizuho sits down slowly beside him, as if taming an animal.', 'In einer Ecke sitzt ein Junge. Er fasst die Bücher nicht an. Mizuho setzt sich langsam neben ihn, als würde sie ein Tier zähmen.']),
          l('hk_mizuho', '{焦|あせ}って、{何|なに}かを{図る|はかる|v:n3_2102}と、{逃|に}げてしまう。……{皆|みな}に{諮って|はかって|v:n3_2101}、この{子|こ}のための、{静|しず}かな{時間|じかん}を、{作|つく}ることにしました。', ['If I rush and plan something, he’ll run. …I consulted everyone and decided to make a quiet time for this boy.', 'Wenn ich dränge und etwas plane, rennt er weg. … Ich habe mich mit allen beraten und beschlossen, eine stille Zeit für diesen Jungen einzurichten.']),
        ], teach: ['v:n3_2092', 'v:n3_2102', 'v:n3_2101'] },
      { at: 'hk_mizuho', goal: ['Hear what the boy did', 'Hör, was der Junge getan hat'], music: 'memory',
        lines: [
          l('hk_mizuho', '{三週間後|さんしゅうかんご}、その{子|こ}は、{自分|じぶん}の{手|て}で、{初|はじ}めてページをめくりました。{窓|まど}の{外|そと}では、{雪|ゆき}が、{静|しず}かに{降|ふ}り{続|つづ}けていました。', ['Three weeks later, that boy turned a page with his own hand for the first time. Outside the window, the snow went on falling quietly.', 'Drei Wochen später blätterte der Junge zum ersten Mal mit eigener Hand eine Seite um. Draußen vor dem Fenster schneite es leise weiter.'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_pierre', chapter: 7, after: 'mq27', who: 'hk_pierre',
    title: ['バゲットの手紙', 'The Baguette Letter', 'Der Baguette-Brief'],
    summary: ['A French baker came to Hokkaidō for one person. A loaf finally says what he could not.', 'Ein französischer Bäcker kam wegen eines einzigen Menschen nach Hokkaidō. Ein Brot sagt endlich, was er nicht sagen konnte.'],
    scenes: [
      { at: 'hk_pierre', goal: ['Talk to Pierre in the bakery café', 'Sprich mit Pierre im Bäckereicafé'],
        lines: [
          l('hk_pierre', '{私|わたし}の{店|みせ}の{パン|ぱん}は、{フランス|ふらんす}の{方法|ほうほう}と、{北海道|ほっかいどう}の{小麦|こむぎ}を、{含めて|ふくめて|v:n3_1867}{作|つく}っています。ここで、{広め|ひろめ|v:n3_1848}たいんです。', ['The bread in my shop is made including French methods and Hokkaidō wheat. I want to spread it here.', 'Das Brot in meinem Laden wird mit französischen Methoden und Weizen aus Hokkaidō gemacht. Ich möchte es hier verbreiten.']),
          l('hk_pierre', '{不可|ふか|v:n3_1861}、と{言|い}われた{レシピ|れしぴ}も、あります。……でも、{私|わたし}が、{一番|いちばん}{焼|や}きたいパンは、まだ、{誰|だれ}にも{見|み}せていません。', ['There are recipes I was told were “not allowed”. …But the bread I most want to bake I haven’t shown to anyone yet.', 'Es gibt Rezepte, von denen man mir sagte, sie seien „nicht erlaubt“. … Aber das Brot, das ich am liebsten backen möchte, habe ich noch niemandem gezeigt.']),
        ], teach: ['v:n3_1867', 'v:n3_1848', 'v:n3_1861'] },
      { at: 'exh2_bakery', goal: ['See the loaf he is baking', 'Sieh das Brot, das er backt'],
        lines: [
          nar('{窓|まど}の{向|む}こうの{堀|ほり}に、{雪|ゆき}が{積|つ}もっている。{ピエール|ぴえーる}さんは、{長|なが}い{バゲット|ばげっと}に、{小|ちい}さな{紙|かみ}を、{供|とも|v:n3_2089}に{巻|ま}き{込|こ}んで{焼|や}いた。', ['In the moat beyond the window snow lies piled. Pierre baked a small piece of paper into a long baguette, along with the dough.', 'Im Graben hinter dem Fenster liegt Schnee. Pierre backte einen kleinen Zettel zusammen mit dem Teig in ein langes Baguette.']),
          l('hk_pierre', '{紙|かみ}には、{彼女|かのじょ}あての、{一行|いちぎょう}。「{武器|ぶき|v:n3_1863}じゃなくて、{パン|ぱん}で、{君|きみ}に、{会|あ}いに{来|き}た」。……{笑|わら}わないでくださいね。', ['On the paper, one line addressed to her: “I came to meet you not with weapons but with bread.” …Please don’t laugh.', 'Auf dem Zettel steht eine Zeile an sie: „Ich kam nicht mit Waffen, sondern mit Brot, um dich zu treffen.“ … Bitte lachen Sie nicht.'], 'worried'),
        ], teach: ['v:n3_2089', 'v:n3_1863'] },
      { at: 'hk_pierre', goal: ['Hear who received the baguette', 'Hör, wer das Baguette erhalten hat'], music: 'memory',
        lines: [
          l('hk_pierre', '{彼女|かのじょ}は、{図書館|としょかん}の{ミズホ|みずほ}さんでした。……{返事|へんじ}は、{図書|としょ}カードに、{一言|ひとこと}だけ。「また、{焼|や}いて」。', ['She was Mizuho from the library. …Her reply was on a library card, in just one phrase: “Bake again.”', 'Sie war Mizuho aus der Bibliothek. … Ihre Antwort stand auf einer Bibliothekskarte, nur eine Wendung: „Back wieder.“'], 'happy'),
        ], teach: [] },
    ],
  },
  {
    id: 'ep_ex_yukko', chapter: 7, after: 'mq27', who: 'hk_yukko',
    title: ['オーロラを探して', 'Searching for the Aurora', 'Auf der Suche nach dem Polarlicht'],
    summary: ['A girl wants to prove that the aurora was once seen in the town — and learns where proof can be found.', 'Ein Mädchen will beweisen, dass hier einmal das Polarlicht zu sehen war — und erfährt, wo Beweise zu finden sind.'],
    scenes: [
      { at: 'hk_yukko', goal: ['Meet Yukko with her camera', 'Triff Yukko mit ihrer Kamera'],
        lines: [
          l('hk_yukko', '{一億|いちおく|v:kf_oku}{分|ぶん}の{一|いち}の{確率|かくりつ}でも、いい。{夜|よる}は、{喫茶店|きっさてん|v:kf_kissaten}で{待|ま}って、{空|そら}が{晴|は}れたら、すぐ{出|で}るの。', ['Even a one-in-a-hundred-million chance is fine. At night I wait in the café, and as soon as the sky clears I go out.', 'Selbst eine Chance von eins zu hundert Millionen reicht. Nachts warte ich im Café, und sobald der Himmel aufklart, gehe ich hinaus.']),
          l('hk_yukko', 'この{町|まち}で{見|み}たという{記録|きろく}は、{一|ひと}つしかない。{市場|しじょう|v:n3_1963}のおじいさんの、{古|ふる}い{日記|にっき}だけ。', ['There’s only one record of anyone seeing it in this town: an old diary of an old man from the market.', 'Es gibt nur eine einzige Aufzeichnung, dass man es in dieser Stadt gesehen hat: das alte Tagebuch eines alten Mannes vom Markt.']),
        ], teach: ['v:kf_kissaten', 'v:kf_oku', 'v:n3_1963'] },
      { at: 'exh2_ice', goal: ['Look at the old diary with her', 'Sieh dir mit ihr das alte Tagebuch an'],
        lines: [
          nar('{日記|にっき}の{一|ひと}ページ。「{今夜|こんや}、{空|そら}が{緑|みどり}に{燃|も}えた。{仏|ほとけ|v:n3_1948}の{光|ひかり}かと{思|おも}った」。{日付|ひづけ}は、{七十年前|ななじゅうねんまえ}。{氷釣|こおりづ}りの{小屋|こや}の{主|ぬし}が、{書|か}いたものだ。', ['A page of the diary: “Tonight the sky burned green. I thought it was the light of the Buddha.” The date is seventy years ago. It was written by the owner of an ice-fishing hut.', 'Eine Seite des Tagebuchs: „Heute Nacht brannte der Himmel grün. Ich dachte, es sei das Licht des Buddha.“ Das Datum liegt siebzig Jahre zurück. Geschrieben hat es der Besitzer einer Eisfischerhütte.']),
          l('hk_yukko', '{分|ぶん}かった！この{日記|にっき}が、{証拠|しょうこ}。{来週|らいしゅう}の{夜|よる}、{同|おな}じ{場所|ばしょ}で、{待|ま}つ。', ['I get it! This diary is the proof. Next week at night I’ll wait in the same place.', 'Ich hab’s! Dieses Tagebuch ist der Beweis. Nächste Woche nachts warte ich am selben Ort.'], 'happy'),
        ], teach: ['v:n3_1948'] },
      { at: 'hk_yukko', goal: ['Be with Yukko on the night', 'Sei in der Nacht bei Yukko'], music: 'memory', evening: true,
        lines: [
          nar('{凍|こお}った{湖|みずうみ}の{上|うえ}。{三脚|さんきゃく}の{カメラ|かめら}の{前|まえ}で、{ゆっこ|ゆっこ}は、{何時間|なんじかん}も、{動|うご}かなかった。……そして、{北|きた}の{空|そら}が、ふっと、{緑|みどり}に{染|そ}まった。', ['On the frozen lake. In front of the tripod camera, Yukko didn’t move for hours. …And then the northern sky suddenly turned green.', 'Auf dem gefrorenen See. Vor der Kamera auf dem Stativ rührte sich Yukko stundenlang nicht. … Und dann färbte sich der nördliche Himmel plötzlich grün.']),
          l('hk_yukko', '……あった。{本当|ほんとう}に、あった。おじいさん、{七十年|ななじゅうねん}{前|まえ}の、{嘘|うそ}じゃなかったよ。', ['…There it is. It really exists. Grandpa, what you wrote seventy years ago wasn’t a lie.', '… Da ist es. Es gibt es wirklich. Opa, was du vor siebzig Jahren geschrieben hast, war keine Lüge.'], 'happy'),
        ], teach: [] },
    ],
  },
];
