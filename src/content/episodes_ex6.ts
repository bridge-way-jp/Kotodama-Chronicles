import { l, nar, type Episode } from './episodes_dsl';

/** 心の物語 of the expansion, chapter 6: the people of the town of small factories in Osaka (content/expansion2.ts). */
export const EPISODES_EX6: Episode[] = [
  // ------------------------------------------------------------------ Teppei: a deadline
  {
    id: 'ep_ex_teppei', chapter: 6, after: 'mq23', who: 'ex_teppei',
    title: ['納期は明日', 'The Deadline Is Tomorrow', 'Liefertermin: morgen'],
    summary: ['A big order must be finished by tomorrow, and the machine breaks down.', 'Ein großer Auftrag muss morgen fertig sein, und die Maschine fällt aus.'],
    scenes: [
      { at: 'ex_teppei', goal: ['Visit Teppei’s workshop', 'Besuche Teppeis Werkstatt'],
        lines: [
          l('ex_teppei', '{納期|のうき|v:os_nouki}は{明日|あした}だ。{寸法|すんぽう|v:n2_0987}が{一|いち}ミリでも{違|ちが}えば、{全部|ぜんぶ}{やり直|なお}しだ。', ['The deadline is tomorrow. If the dimensions are off by even one millimetre, we start all over.', 'Der Liefertermin ist morgen. Weicht das Maß auch nur um einen Millimeter ab, fangen wir von vorn an.'], 'worried'),
          l('ex_teppei', '{測定|そくてい|v:n2_1064}は{何度|なんど}もした。この{機械|きかい}の{性能|せいのう|v:n2_1001}は、まだ{十分|じゅうぶん}だ。……{問題|もんだい}は、{人手|ひとで}だ。', ['I measured it many times. This machine’s performance is still sufficient. …The problem is manpower.', 'Ich habe viele Male gemessen. Die Leistung dieser Maschine reicht noch. … Das Problem sind die Arbeitskräfte.']),
        ], teach: ['v:os_nouki', 'v:n2_0987', 'v:n2_1064', 'v:n2_1001'] },
      { at: 'exo_workshop', goal: ['Help Teppei at the workshop', 'Hilf Teppei in der Werkstatt'], evening: true,
        lines: [
          nar('{夜|よる}の{工場|こうじょう}。{仕上|しあ}がった{部品|ぶひん}が{一|ひと}つ、また{一|ひと}つ、{台|だい}の{上|うえ}に{並|なら}ぶ。', ['The factory at night. Finished parts line up on the bench, one after another.', 'Die Fabrik bei Nacht. Fertige Teile reihen sich auf dem Tisch, eins nach dem anderen.']),
          l('ex_teppei', '{鉱物|こうぶつ|v:n2_0640}から{作|つく}った{金属|きんぞく}は、{強化|きょうか|v:n2_0504}すれば、{百年|ひゃくねん}{持|も}つ。{仕上がり|しあがり|v:n2_0747}が、すべてだ。', ['Metal made from ore lasts a hundred years once strengthened. The finish is everything.', 'Metall aus Erz hält, wenn man es verstärkt, hundert Jahre. Die Verarbeitung ist alles.']),
        ], teach: ['v:n2_0640', 'v:n2_0504', 'v:n2_0747'] },
      { at: 'ex_teppei', goal: ['Hear whether the order was delivered', 'Hör, ob der Auftrag geliefert wurde'], music: 'memory',
        lines: [
          l('ex_teppei', '{承知|しょうち|v:os_shouchi}しました、と{返事|へんじ}をして、{朝|あさ}に{間|ま}に{合|あ}った。{職人|しょくにん}が{揃|そろ}うと、{夜|よる}は{短|みじか}いな。', ['I replied “understood”, and we made it by morning. When the craftsmen are all together, the night is short.', 'Ich antwortete „verstanden“, und am Morgen war es geschafft. Wenn die Handwerker beisammen sind, ist die Nacht kurz.'], 'happy'),
          l('ex_teppei', '{御中|おんちゅう|v:n2_0336}あての{礼状|れいじょう}が、{届|とど}いた。{機械|きかい}は{古|ふる}くても、{腕|うで}は{古|ふる}くならん。', ['A thank-you letter addressed to our company has arrived. Machines may be old, but skill doesn’t age.', 'Ein Dankesbrief an unsere Firma ist angekommen. Maschinen mögen alt sein, Können altert nicht.'], 'happy'),
        ], teach: ['v:os_shouchi', 'v:n2_0336'] },
    ],
  },
  // ------------------------------------------------------------------ Jun: the apprentice
  {
    id: 'ep_ex_jun', chapter: 6, after: 'mq23', who: 'ex_jun',
    title: ['親方の背中', 'The Master’s Back', 'Der Rücken des Meisters'],
    summary: ['Jun is scolded daily and wants to quit. Then he sees how the master works.', 'Jun wird täglich ausgeschimpft und will aufhören. Dann sieht er, wie der Meister arbeitet.'],
    scenes: [
      { at: 'ex_jun', goal: ['Talk to Jun outside the workshop', 'Sprich mit Jun vor der Werkstatt'],
        lines: [
          l('ex_jun', '{一年生|いちねんせい|v:n2_0095}の{時|とき}から、ここに{通|かよ}ってます。でも、{勝手|かって|v:n2_0419}に{機械|きかい}を{触|さわ}ると、{怒|おこ}られるんす。', ['I’ve come here since first year. But if I touch a machine on my own, I get yelled at.', 'Seit dem ersten Schuljahr komme ich her. Aber wenn ich eigenmächtig eine Maschine anfasse, werde ich angebrüllt.'], 'worried'),
          l('ex_jun', '{指定|してい|v:n2_0793}されたとおりにやれ、って。……でも、{心当|こころあ}たりのないミスが、{毎日|まいにち}{起|お}きるんす。', ['“Do exactly as specified,” they say. …But every day mistakes happen that I have no idea about.', '„Mach es genau wie vorgegeben“, heißt es. … Aber jeden Tag passieren Fehler, für die ich keinen Anhaltspunkt habe.']),
        ], teach: ['v:n2_0095', 'v:n2_0419', 'v:n2_0793'] },
      { at: 'exo_factory', goal: ['Watch the master at work with Jun', 'Sieh mit Jun dem Meister bei der Arbeit zu'],
        lines: [
          nar('{親方|おやかた}は、{一|ひと}つの{部品|ぶひん}を、{三時間|さんじかん}かけて{削る|けずる|v:n2_0574}。{粉|こな}を{払|はら}い、{指|ゆび}でなでて、また{削る|けずる}。', ['The master spends three hours shaving one part. He brushes off the dust, strokes it with his finger, and shaves again.', 'Der Meister feilt drei Stunden an einem einzigen Teil. Er pustet den Staub weg, streicht mit dem Finger darüber und feilt weiter.']),
          l('ex_jun', '……{見|み}てただけで、{分|わ}かったっす。{原理|げんり|v:n2_0600}は{簡単|かんたん}でも、{心得|こころえ|v:n2_0657}が{要|い}るんだって。', ['…Just watching, I understood. The principle is simple, but it takes the right attitude.', '… Schon beim Zusehen habe ich es verstanden. Das Prinzip ist einfach, aber man braucht die richtige Haltung.']),
        ], teach: ['v:n2_0574', 'v:n2_0600', 'v:n2_0657'] },
      { at: 'ex_jun', goal: ['Hear what Jun decided', 'Hör, was Jun beschlossen hat'], music: 'memory',
        lines: [
          l('ex_jun', '{謙遜|けんそん|v:n2_0594}するわけじゃないけど、{俺|おれ}の{腕|うで}は、まだ{最|もっと|v:n2_0695}も{下|した}っす。でも、{辞|や}めない。', ['I’m not being modest, but my skill is still at the very bottom. But I won’t quit.', 'Ich will nicht bescheiden tun, aber mein Können ist noch ganz unten. Aber ich höre nicht auf.'], 'happy'),
          l('ex_jun', '{親方|おやかた}の{背中|せなか}が、{俺|おれ}の{コース|こーす|v:n2_0604}っす。{一|ひと}つずつ、{削って|けずって}いきます。', ['The master’s back is my course. I’ll shave away step by step.', 'Der Rücken des Meisters ist mein Kurs. Ich feile mich Schritt für Schritt voran.'], 'happy'),
        ], teach: ['v:n2_0594', 'v:n2_0695', 'v:n2_0604'] },
    ],
  },
  // ------------------------------------------------------------------ Nina: katakana and kanji
  {
    id: 'ep_ex_nina', chapter: 6, after: 'mq23', who: 'ex_nina',
    title: ['部品の名前', 'The Names of Parts', 'Die Namen der Teile'],
    summary: ['Nina, a technical trainee from Indonesia, studies Japanese at night school after work.', 'Nina, Praktikantin aus Indonesien, lernt nach der Arbeit in der Abendschule Japanisch.'],
    scenes: [
      { at: 'ex_nina', goal: ['Meet Nina after work', 'Triff Nina nach der Arbeit'],
        lines: [
          l('ex_nina', '{毎日|まいにち}、{帳|ちょう|v:n2_0079}に{新|あたら}しい{言葉|ことば}を{書|か}いています。{かたかな|かたかな|v:n2_0405}は{得意|とくい}です。でも、{漢字|かんじ}は{難|むずか}しい。', ['Every day I write new words in my notebook. I’m good at katakana. But kanji are hard.', 'Jeden Tag schreibe ich neue Wörter in mein Heft. Katakana kann ich gut. Aber Kanji sind schwer.']),
          l('ex_nina', '{書取|かきとり|v:n2_0366}のテストは、いつも{半分|はんぶん}です。でも、{自習|じしゅう|v:n2_0767}は{続|つづ}けます。', ['My dictation tests are always half right. But I keep up my self-study.', 'Meine Diktate sind immer nur zur Hälfte richtig. Aber ich lerne selbstständig weiter.']),
        ], teach: ['v:n2_0079', 'v:n2_0405', 'v:n2_0366', 'v:n2_0767'] },
      { at: 'exo_school', goal: ['Go to the night school with Nina', 'Geh mit Nina zur Abendschule'], evening: true,
        lines: [
          nar('{校舎|こうしゃ|v:n2_0621}の{窓|まど}に、{灯|あか}りがつく。{時間割|じかんわり|v:n2_0758}には、{夜|よる}の{授業|じゅぎょう}がずらりと{並|なら}んでいる。', ['Lights go on in the windows of the school building. The timetable lists a row of evening classes.', 'In den Fenstern des Schulgebäudes geht das Licht an. Der Stundenplan führt eine Reihe von Abendkursen auf.']),
          l('ex_nina', '{講師|こうし|v:n2_0616}の{先生|せんせい}は、{大学|だいがく}の{人|ひと}です。{学年|がくねん|v:n2_0377}も{年齢|ねんれい}も、バラバラ。でも、みんな{同|おな}じ{目|め}をしています。', ['The instructor is someone from the university. Years and ages all differ. But everyone has the same look in their eyes.', 'Der Dozent kommt von der Universität. Schuljahre und Alter sind alle verschieden. Aber alle haben denselben Blick.']),
        ], teach: ['v:n2_0621', 'v:n2_0758', 'v:n2_0616', 'v:n2_0377'] },
      { at: 'ex_nina', goal: ['See Nina’s test result', 'Sieh Ninas Prüfungsergebnis'], music: 'memory',
        lines: [
          l('ex_nina', '{受験|じゅけん|v:n2_0848}した{試験|しけん}に、{受|う}かりました！{学力|がくりょく|v:n2_0381}が、{少|すこ}し{上|あ}がったんです。', ['I passed the exam I took! My academic ability has gone up a little.', 'Ich habe die Prüfung bestanden, die ich abgelegt habe! Mein Lernstand ist ein wenig gestiegen.'], 'happy'),
          l('ex_nina', '{先生|せんせい}が、{囁|ささや|v:n2_0718}いてくれました。「{次|つぎ}は、もっと{高|たか}いところを{目指|めざ}そう」。', ['The teacher whispered to me: “Next, let’s aim higher.”', 'Der Lehrer flüsterte mir zu: „Als Nächstes wollen wir höher hinaus.“'], 'happy'),
        ], teach: ['v:n2_0848', 'v:n2_0381', 'v:n2_0718'] },
    ],
  },
  // ------------------------------------------------------------------ Hayakawa: the lawyer
  {
    id: 'ep_ex_hayakawa', chapter: 6, after: 'mq24', who: 'ex_hayakawa',
    title: ['小さな争い', 'A Small Dispute', 'Ein kleiner Streit'],
    summary: ['Two neighbours fight over a tiny strip of land. The lawyer tries to find what lies beneath.', 'Zwei Nachbarn streiten um einen winzigen Landstreifen. Die Anwältin sucht, was darunter liegt.'],
    scenes: [
      { at: 'ex_hayakawa', goal: ['Talk to the lawyer at the courthouse', 'Sprich mit der Anwältin am Gericht'],
        lines: [
          l('ex_hayakawa', '{争う|あらそう|v:n2_0162}二人は、{五十|ごじゅう}センチの{土地|とち}のために、{三年|さんねん}{争|あらそ}っています。{対立|たいりつ|v:n2_1108}は、もう{深|ふか}いんです。', ['The two who quarrel have fought for three years over fifty centimetres of land. The confrontation is already deep.', 'Die beiden Streitenden kämpfen seit drei Jahren um fünfzig Zentimeter Land. Der Gegensatz ist schon tief.']),
          l('ex_hayakawa', '{法律|ほうりつ}を{解説|かいせつ|v:n2_0351}しても、{解決|かいけつ}にはなりません。{過半数|かはんすう|v:n2_0429}の{町|まち}の{人|ひと}は、「どっちでもいい」と{言|い}います。', ['Explaining the law doesn’t solve it. The majority of townspeople say, “Either way is fine.”', 'Das Gesetz zu erklären löst es nicht. Die Mehrheit der Stadtleute sagt: „Mir ist beides recht.“']),
        ], teach: ['v:n2_0162', 'v:n2_1108', 'v:n2_0351', 'v:n2_0429'] },
      { at: 'exo_court', goal: ['Go with the lawyer to the hearing', 'Geh mit der Anwältin zur Verhandlung'],
        lines: [
          nar('{調停|ちょうてい}の{部屋|へや}。{二人|ふたり}の{老人|ろうじん}が、{目|め}を{合|あ}わせずに{座|すわ}っている。{書留|かきとめ|v:n2_0365}の{封筒|ふうとう}が、{机|つくえ}の{上|うえ}で{開|あ}いたままだ。', ['The mediation room. Two old men sit without meeting each other’s eyes. A registered-mail envelope lies open on the desk.', 'Der Schlichtungsraum. Zwei alte Männer sitzen da, ohne einander in die Augen zu sehen. Ein Einschreibebrief liegt geöffnet auf dem Tisch.']),
          l('ex_hayakawa', '{改正|かいせい|v:n2_0349}された{規則|きそく}に{関|かか}わる{問題|もんだい}ではありません。{対策|たいさく|v:n2_1093}は、{話|はな}し{合|あ}いだけです。', ['It isn’t a question concerning the revised rules. The only countermeasure is talking.', 'Es geht nicht um eine Frage der geänderten Regeln. Die einzige Gegenmaßnahme ist ein Gespräch.']),
        ], teach: ['v:n2_0365', 'v:n2_0349', 'v:n2_1093'] },
      { at: 'ex_hayakawa', goal: ['Hear how the dispute ended', 'Hör, wie der Streit endete'], music: 'memory',
        lines: [
          l('ex_hayakawa', '{社説|しゃせつ|v:n2_0821}にまで{書|か}かれた{争|あらそ}いの{原因|げんいん}は、{二人|ふたり}の{亡|な}き{妻|つま}の{庭|にわ}でした。{五十|ごじゅう}センチは、{花壇|かだん}の{幅|はば}だったんです。', ['The cause of the dispute, even written up in an editorial, was the garden of the two men’s late wives. Fifty centimetres was the width of the flower bed.', 'Die Ursache des Streits, über den sogar ein Leitartikel geschrieben wurde, war der Garten der verstorbenen Ehefrauen der beiden. Fünfzig Zentimeter waren die Breite des Blumenbeets.'], 'happy'),
          l('ex_hayakawa', '{二人|ふたり}は、{一緒|いっしょ}に{花|はな}を{植|う}えることに{決|き}めました。{指定|してい}された{期日|きじつ}より、ずっと{早|はや}く。', ['The two decided to plant flowers together. Much earlier than the date set.', 'Die beiden beschlossen, gemeinsam Blumen zu pflanzen. Viel früher als der festgesetzte Termin.'], 'happy'),
        ], teach: ['v:n2_0821'] },
    ],
  },
  // ------------------------------------------------------------------ Yūko: the care worker
  {
    id: 'ep_ex_yuuko', chapter: 6, after: 'mq24', who: 'ex_yuuko',
    title: ['ありがとうの重さ', 'The Weight of Thank You', 'Das Gewicht von Danke'],
    summary: ['Yūko is tired, her back aches — then a resident she was most worried about says her name for the first time.', 'Yūko ist müde, ihr Rücken schmerzt — dann spricht eine Bewohnerin, um die sie sich am meisten sorgte, erstmals ihren Namen.'],
    scenes: [
      { at: 'ex_yuuko', goal: ['Speak to the care worker', 'Sprich mit der Pflegerin'],
        lines: [
          l('ex_yuuko', '{寿命|じゅみょう|v:n2_0854}は{誰|だれ}にも{決|き}められない。でも、{最後|さいご}まで{気持|きも}ちよく{過|す}ごしてほしいの。{消化|しょうか|v:n2_0867}のいい{食事|しょくじ}を、{考|かんが}えています。', ['Nobody can decide a lifespan. But I want them to live comfortably to the end. I’m thinking about meals that digest easily.', 'Niemand kann die Lebensdauer bestimmen. Aber ich möchte, dass sie bis zuletzt angenehm leben. Ich denke über gut verdauliche Mahlzeiten nach.']),
          l('ex_yuuko', '{食塩|しょくえん|v:n2_0900}は{控|ひか}えめに。でも、{味|あじ}が{薄|うす}いと、{食欲|しょくよく}がなくなるの。{難|むずか}しいわ。', ['Easy on the salt. But if it’s bland, they lose their appetite. It’s difficult.', 'Wenig Salz. Aber wenn es fade ist, vergeht der Appetit. Es ist schwierig.']),
        ], teach: ['v:n2_0854', 'v:n2_0867', 'v:n2_0900'] },
      { at: 'exo_care', goal: ['Visit the care home garden', 'Besuche den Garten des Pflegeheims'],
        lines: [
          nar('{庭|にわ}のベンチ。{一人|ひとり}のおばあさんが、{小|ちい}さな{入|い}れ{物|もの|v:n2_0209}を{膝|ひざ}にのせている。{中|なか}には、{編|あ}みかけの{編み物|あみもの|v:n2_0154}が。', ['A bench in the garden. An old lady has a small container on her lap. Inside is a half-finished piece of knitting.', 'Eine Gartenbank. Eine alte Dame hat einen kleinen Behälter auf dem Schoß. Darin liegt eine angefangene Strickarbeit.']),
          l('ex_yuuko', 'この{方|かた}は、{落とし物|おとしもの|v:n2_0308}を{拾|ひろ}うたびに、「あなたのかしら」と{聞|き}いて{回|まわ}るの。{優|やさ}しい{人|ひと}。', ['Whenever this lady picks up lost property, she goes around asking, “Is this yours?” A kind person.', 'Immer wenn diese Dame etwas Verlorenes findet, geht sie herum und fragt: „Gehört das dir?“ Ein freundlicher Mensch.']),
        ], teach: ['v:n2_0209', 'v:n2_0154', 'v:n2_0308'] },
      { at: 'ex_yuuko', goal: ['Hear what happened that morning', 'Hör, was an diesem Morgen geschah'], music: 'memory',
        lines: [
          l('ex_yuuko', '{今朝|けさ}、おばあさんが、{初|はじ}めて、{私|わたし}の{名前|なまえ}を{呼|よ}んだの。{何年|なんねん}も、{忘|わす}れていたのに。', ['This morning the old lady called my name for the first time. After forgetting it for years.', 'Heute Morgen hat die alte Dame zum ersten Mal meinen Namen gerufen. Nachdem sie ihn jahrelang vergessen hatte.'], 'surprised'),
          l('ex_yuuko', '「{優子|ゆうこ}さん、{編|あ}み{物|もの}、できたわ」。……{毛糸|けいと}の{帽子|ぼうし}を、くれたの。{思い込んで|おもいこんで|v:n2_0323}いたより、ずっと{温|あたた}かい。', ['“Yūko, the knitting is done.” …She gave me a wool hat. It’s much warmer than I’d imagined.', '„Yūko, das Stricken ist fertig.“ … Sie gab mir eine Wollmütze. Sie ist viel wärmer, als ich gedacht hatte.'], 'happy'),
        ], teach: ['v:n2_0323'] },
    ],
  },
  // ------------------------------------------------------------------ Tsuyoshi-sensei: the male nursery teacher
  {
    id: 'ep_ex_tsuyoshi2', chapter: 6, after: 'mq24', who: 'ex_tsuyoshi2',
    title: ['男の先生', 'The Male Teacher', 'Der Erzieher'],
    summary: ['Some parents doubt a man can teach small children. A child’s drawing changes things.', 'Manche Eltern zweifeln, ob ein Mann kleine Kinder unterrichten kann. Eine Kinderzeichnung ändert das.'],
    scenes: [
      { at: 'ex_tsuyoshi2', goal: ['Talk to Tsuyoshi-sensei', 'Sprich mit Tsuyoshi-sensei'],
        lines: [
          l('ex_tsuyoshi2', '{小学生|しょうがくせい|v:n2_0868}になる{前|まえ}の{子|こ}どもたちは、{数|かず}を{覚|おぼ}える{算数|さんすう|v:n2_0740}の{遊|あそ}びが{大好|だいす}きです。{掛け算|かけざん|v:n2_0382}も、{歌|うた}で{覚|おぼ}えます。', ['Children before they become primary-school pupils love number games. They learn even multiplication through songs.', 'Kinder vor der Grundschule lieben Zahlenspiele. Sogar das Einmaleins lernen sie durch Lieder.'], 'happy'),
          l('ex_tsuyoshi2', 'でも、{男|おとこ}の{先生|せんせい}は、お{母|かあ}さんたちに、{消極的|しょうきょくてき|v:n2_0875}に{見|み}られることもあるんです。', ['But mothers sometimes view a male teacher with reserve.', 'Aber manche Mütter sehen einen männlichen Erzieher auch eher zurückhaltend.'], 'worried'),
        ], teach: ['v:n2_0868', 'v:n2_0740', 'v:n2_0382', 'v:n2_0875'] },
      { at: 'ex_tsuyoshi2', goal: ['Visit the nursery class', 'Besuche die Kindergartengruppe'],
        lines: [
          nar('{校庭|こうてい|v:n2_0633}のような{広|ひろ}い{庭|にわ}で、{体操|たいそう|v:n2_1100}の{時間|じかん}。{先生|せんせい}の{大|おお}きな{声|こえ}に、{子|こ}どもたちが{続々|ぞくぞく|v:n2_1062}と{集|あつ}まってくる。', ['In a big yard like a school ground, it’s gymnastics time. At the teacher’s loud voice, the children come gathering one after another.', 'In einem großen Hof wie einem Schulhof ist Turnstunde. Auf die laute Stimme des Erziehers hin versammeln sich die Kinder nacheinander.']),
          nar('一人の{女|おんな}の{子|こ}が、{絵|え}を{見|み}せに{来|き}た。{先生|せんせい}と、{お母|かあ}さんと、{自分|じぶん}が、{手|て}をつないでいる。{三|みっ}つの{顔|かお}が、そっくり{同|おな}じ{笑顔|えがお}だ。', ['A little girl comes to show her picture. The teacher, her mum and herself hold hands. The three faces have exactly the same smile.', 'Ein kleines Mädchen zeigt ihr Bild. Erzieher, Mama und sie selbst halten sich an den Händen. Die drei Gesichter lächeln genau gleich.']),
        ], teach: ['v:n2_0633', 'v:n2_1100', 'v:n2_1062'] },
      { at: 'ex_tsuyoshi2', goal: ['Hear what the mother said', 'Hör, was die Mutter gesagt hat'], music: 'memory',
        lines: [
          l('ex_tsuyoshi2', 'お{母|かあ}さんが、{そういえば|そういえば|v:n2_1046}、と{言|い}って、{笑|わら}ったんです。「{私|わたし}が{一番|いちばん}、{先生|せんせい}の{味方|みかた}です」と。', ['The mother laughed and said, “Come to think of it, I’m on your side more than anyone.”', 'Die Mutter lachte und sagte: „Übrigens, ich bin Ihre größte Verbündete.“'], 'happy'),
          l('ex_tsuyoshi2', '{男|おとこ}も{女|おんな}も、{関係|かんけい}ない。{子|こ}どもに{必要|ひつよう}なのは、{安心|あんしん}できる{大人|おとな}です。{心得|こころえ}ました。', ['Man or woman, it doesn’t matter. What a child needs is an adult they feel safe with. I’ve taken it to heart.', 'Mann oder Frau spielt keine Rolle. Ein Kind braucht einen Erwachsenen, bei dem es sich sicher fühlt. Das habe ich mir zu Herzen genommen.'], 'happy'),
        ], teach: ['v:n2_1046'] },
    ],
  },
  // ------------------------------------------------------------------ Fujiwara: the small article
  {
    id: 'ep_ex_fujiwara', chapter: 6, after: 'mq24', who: 'ex_fujiwara',
    title: ['小さな記事', 'A Small Article', 'Ein kleiner Artikel'],
    summary: ['A reporter writes about the lawyer’s neighbours and learns what a newspaper is for.', 'Ein Reporter schreibt über die Nachbarn der Anwältin und lernt, wofür eine Zeitung da ist.'],
    scenes: [
      { at: 'ex_fujiwara', goal: ['Visit the newspaper branch', 'Besuche die Zeitungsfiliale'],
        lines: [
          l('ex_fujiwara', '{書店|しょてん|v:n2_0907}に{並|なら}ぶ{書籍|しょせき|v:n2_0904}より、{町|まち}の{記事|きじ}のほうが、{人|ひと}の{心|こころ}に{近|ちか}い。そう{信|しん}じて、{執筆|しっぴつ|v:n2_0785}しています。', ['More than books lined up in bookshops, town articles are closer to people’s hearts. Believing that, I write.', 'Mehr als Bücher in den Buchhandlungen sind Artikel über die Stadt den Herzen der Menschen nah. Daran glaube ich, wenn ich schreibe.']),
          l('ex_fujiwara', '{随筆|ずいひつ|v:n2_0945}のような{記事|きじ}が{書|か}きたいのに、{上司|じょうし}は「{数字|すうじ}の{出|で}る{記事|きじ}を」と。{図表|ずひょう|v:n2_0976}ばかりです。', ['I want to write articles like essays, but my boss says, “Give us articles that bring numbers.” It’s all charts.', 'Ich möchte Artikel wie Essays schreiben, aber mein Chef sagt: „Schreib Artikel, die Zahlen bringen.“ Es sind nur Tabellen.']),
        ], teach: ['v:n2_0907', 'v:n2_0904', 'v:n2_0785', 'v:n2_0945', 'v:n2_0976'] },
      { at: 'exo_news', goal: ['Help write the story about the two neighbours', 'Hilf beim Artikel über die zwei Nachbarn'],
        lines: [
          nar('{机|つくえ}の{上|うえ}には、{英文|えいぶん|v:n2_0249}の{資料|しりょう}と、{観測|かんそく|v:n2_0461}データ。{その他|そのほか|v:n2_1074}にも、{書|か}きかけの{原稿|げんこう}が{山|やま}のようだ。', ['On the desk are English documents and observation data. Besides these, a mountain of half-written manuscripts.', 'Auf dem Schreibtisch liegen englische Unterlagen und Beobachtungsdaten. Außerdem türmen sich angefangene Manuskripte.']),
          l('ex_fujiwara', '{見出|みだ}しは{決|き}まりました。「{五十|ごじゅう}センチの{花壇|かだん}」。……{周辺|しゅうへん|v:n2_0840}の{住民|じゅうみん}に{聞|き}いた{実例|じつれい|v:n2_0790}を、{一|ひと}つ{入|い}れます。', ['The headline is settled: “Fifty Centimetres of Flower Bed”. …I’ll add one real example I got from the neighbours.', 'Die Überschrift steht: „Fünfzig Zentimeter Blumenbeet“. … Ein konkretes Beispiel von den Anwohnern nehme ich dazu.']),
        ], teach: ['v:n2_0249', 'v:n2_0461', 'v:n2_1074', 'v:n2_0840', 'v:n2_0790'] },
      { at: 'ex_fujiwara', goal: ['See what the article caused', 'Sieh, was der Artikel bewirkt hat'], music: 'memory',
        lines: [
          l('ex_fujiwara', '{記事|きじ}は、{町|まち}の{小|ちい}さなニュースでした。でも、{翌日|よくじつ}、{十|じゅう}{通|つう}の{手紙|てがみ}が{届|とど}きました。「{私|わたし}も、{隣人|りんじん}と{仲直|なかなお}りしたい」と。', ['The article was a little piece of town news. But the next day ten letters arrived: “I want to make up with my neighbour too.”', 'Der Artikel war eine kleine Stadtnachricht. Aber am nächsten Tag kamen zehn Briefe: „Auch ich möchte mich mit meinem Nachbarn versöhnen.“'], 'happy'),
          l('ex_fujiwara', '{書籍|しょせき}じゃなくても、{記事|きじ}は、{誰|だれ}かの{背中|せなか}を{押|お}せる。……{社説|しゃせつ}じゃなくて、{随筆|ずいひつ}みたいな{記事|きじ}を、これからも{書|か}きます。', ['Even if it’s not a book, an article can push someone’s back. …Not editorials, but essay-like articles, I’ll keep writing.', 'Auch wenn es kein Buch ist, kann ein Artikel jemandem den Rücken stärken. … Keine Leitartikel, sondern essayartige Artikel werde ich weiterschreiben.'], 'happy'),
        ], teach: [] },
    ],
  },
  // ------------------------------------------------------------------ Tsukkomi: the comedian
  {
    id: 'ep_ex_tsukkomi', chapter: 6, after: 'mq24', who: 'ex_tsukkomi',
    title: ['一人のツッコミ', 'The Straight Man Alone', 'Der Ernste ohne Partner'],
    summary: ['A manzai comedian whose partner has quit must find a new rhythm — and learns the Kansai dialect has two voices.', 'Ein Manzai-Komiker, dessen Partner aufgehört hat, muss einen neuen Rhythmus finden.'],
    scenes: [
      { at: 'ex_tsukkomi', goal: ['Talk to the comedian outside the theatre', 'Sprich mit dem Komiker vor dem Theater'],
        lines: [
          l('ex_tsukkomi', '{関西弁|かんさいべん|v:os_kansai}の{漫才|まんざい}は、{二人|ふたり}の{呼吸|こきゅう}が{命|いのち}や。{娯楽|ごらく|v:n2_0680}やけど、{真剣勝負|しんけんしょうぶ}なんや。', ['Kansai-dialect manzai lives on the two’s breathing. It’s entertainment, but it’s a serious contest.', 'Manzai im Kansai-Dialekt lebt vom Atem der beiden. Es ist Unterhaltung, aber ein ernster Wettkampf.']),
          l('ex_tsukkomi', '{来月|らいげつ}の{コンクール|こんくーる|v:n2_0687}に、{一人|ひとり}で{出|で}るかどうか、まだ{迷|まよ}っとる。{相方|あいかた}の{席|せき}が、あいとるんや。', ['I’m still unsure whether to enter next month’s competition alone. My partner’s seat is empty.', 'Ob ich nächsten Monat allein am Wettbewerb teilnehme, weiß ich noch nicht. Der Platz meines Partners ist leer.'], 'worried'),
        ], teach: ['v:os_kansai', 'v:n2_0680', 'v:n2_0687'] },
      { at: 'exo_theatre', goal: ['Watch the rehearsal', 'Sieh der Probe zu'],
        lines: [
          nar('{舞台|ぶたい}の{袖|そで}。{琴|こと|v:n2_0516}の{音|ね}が、どこからか{聞|き}こえてくる。{隣|となり}の{部屋|へや}で、{誰|だれ}かが{練習|れんしゅう}しているらしい。', ['The wings of the stage. The sound of a koto drifts from somewhere. Someone seems to be practising next door.', 'Die Bühnengasse. Von irgendwoher klingt eine Koto. Nebenan scheint jemand zu üben.']),
          l('ex_tsukkomi', '{雑音|ざつおん|v:n2_0728}が{入|はい}ってもかまへん。{笑|わら}いは、{その|その}{場|ば}の{空気|くうき}から{生|う}まれるんや。', ['Noise creeping in doesn’t matter. Laughter is born from the air of the moment.', 'Störgeräusche machen nichts. Gelächter entsteht aus der Luft des Augenblicks.']),
        ], teach: ['v:n2_0516', 'v:n2_0728'] },
      { at: 'ex_tsukkomi', goal: ['Hear how the competition went', 'Hör, wie der Wettbewerb lief'], music: 'memory',
        lines: [
          l('ex_tsukkomi', '一人でも、{勝手|かって}に{喋|しゃべ}った。{客|きゃく}が、{相方|あいかた}の{声|こえ}を{想像|そうぞう}して、{笑|わら}ってくれたんや。', ['Even alone, I just talked away. The audience imagined my partner’s voice and laughed.', 'Auch allein habe ich einfach drauflosgeredet. Das Publikum hat sich die Stimme meines Partners vorgestellt und gelacht.'], 'happy'),
          l('ex_tsukkomi', '{お疲|つか}れさま、と{楽屋|がくや|v:os_nagare}で{声|こえ}をかけられた。……{謙遜|けんそん}せず{言|い}うわ。{最高|さいこう}の{夜|よる}やった。', ['In the dressing room someone said “good work”. …I’ll say it without false modesty: it was the best night.', 'In der Garderobe sagte jemand „gute Arbeit“. … Ohne falsche Bescheidenheit: Es war die beste Nacht.'], 'happy'),
        ], teach: ['v:os_nagare'] },
    ],
  },
  // ------------------------------------------------------------------ Akira: the night-school student
  {
    id: 'ep_ex_akira', chapter: 6, after: 'mq24', who: 'ex_akira',
    title: ['四十六歳の一年生', 'A First-Year at Forty-Six', 'Ein Erstklässler mit sechsundvierzig'],
    summary: ['Akira finally learns the characters he could never read as a child.', 'Akira lernt endlich die Zeichen, die er als Kind nie lesen konnte.'],
    scenes: [
      { at: 'ex_akira', goal: ['Meet Akira at the night school', 'Triff Akira an der Abendschule'],
        lines: [
          l('ex_akira', '{私立|しりつ|v:n2_0913}の{学校|がっこう}には、{行|い}けませんでした。{小数|しょうすう|v:n2_0882}の{計算|けいさん}も、{整数|せいすう|v:n2_0995}の{割|わ}り{算|ざん}も、{今|いま}が{初|はじ}めてです。', ['I couldn’t go to a private school. Calculating with decimals and dividing integers — I’m doing these for the first time now.', 'Auf eine Privatschule konnte ich nicht gehen. Rechnen mit Dezimalzahlen und das Teilen ganzer Zahlen mache ich jetzt zum ersten Mal.']),
          l('ex_akira', '{読|よ}み{書|か}きが、できないと、{履歴書|りれきしょ}も{書|か}けない。……{学年|がくねん}は{一番|いちばん}{下|した}でも、{気持|きも}ちは{一番|いちばん}{上|うえ}です。', ['If you can’t read and write, you can’t even write a CV. …In grade I’m the lowest, but in spirit I’m the highest.', 'Wer nicht lesen und schreiben kann, kann nicht einmal einen Lebenslauf schreiben. … Im Jahrgang bin ich der Unterste, im Geist der Höchste.']),
        ], teach: ['v:n2_0913', 'v:n2_0882', 'v:n2_0995'] },
      { at: 'exo_school', goal: ['Sit in on Akira’s class', 'Besuche Akiras Unterricht'], evening: true,
        lines: [
          nar('{教室|きょうしつ}の{黒板|こくばん}には、{主語|しゅご|v:n2_0849}と{述語|じゅつご|v:n2_0852}の{図|ず}。{先生|せんせい}は、{句読点|くとうてん|v:n2_0544}の{打|う}ち{方|かた}を、ゆっくり{教|おし}えている。', ['On the classroom blackboard, a diagram of subject and predicate. The teacher slowly explains where to put punctuation marks.', 'An der Tafel steht ein Schema von Subjekt und Prädikat. Der Lehrer erklärt langsam, wie man Satzzeichen setzt.']),
          l('ex_akira', '{初|はじ}めて、{自分|じぶん}の{名前|なまえ}を、ちゃんと{漢字|かんじ}で{書|か}きました。{書|か}いてみると、{意外|いがい}と、{字|じ}が{震|ふる}えるものですね。', ['For the first time I properly wrote my own name in kanji. When you try writing it, your hand surprisingly shakes.', 'Zum ersten Mal habe ich meinen eigenen Namen ordentlich in Kanji geschrieben. Wenn man es versucht, zittert die Hand überraschend.'], 'happy'),
        ], teach: ['v:n2_0849', 'v:n2_0852', 'v:n2_0544'] },
      { at: 'ex_akira', goal: ['Hear Akira’s news', 'Hör Akiras Neuigkeit'], music: 'memory',
        lines: [
          l('ex_akira', '{大学院|だいがくいん|v:n2_1089}に{入|はい}る{人|ひと}もいる{学校|がっこう}で、{私|わたし}は、{小学校|しょうがっこう}の{卒業|そつぎょう}{証書|しょうしょ}をもらいました。{在学|ざいがく|v:n2_0696}{三年|さんねん}です。', ['At a school where some go on to graduate school, I received an elementary-school diploma. Three years of enrolment.', 'In einer Schule, wo manche sogar ins Graduiertenstudium gehen, habe ich ein Grundschulzeugnis bekommen. Drei Jahre Einschreibung.'], 'happy'),
          l('ex_akira', '{今|いま}、{書|か}きたい{手紙|てがみ}があるんです。{三十年|さんじゅうねん}{前|まえ}に、{別|わか}れた{母|はは}へ。ちゃんと{自分|じぶん}の{字|じ}で。', ['Now there’s a letter I want to write. To my mother, from whom I parted thirty years ago. In my own hand.', 'Jetzt gibt es einen Brief, den ich schreiben will. An meine Mutter, von der ich mich vor dreißig Jahren getrennt habe. In meiner eigenen Handschrift.'], 'happy'),
        ], teach: ['v:n2_1089', 'v:n2_0696'] },
    ],
  },
  // ------------------------------------------------------------------ Sakata: the old doctor
  {
    id: 'ep_ex_sakata', chapter: 6, after: 'mq25', who: 'ex_sakata',
    title: ['五十年の聴診器', 'Fifty Years of the Stethoscope', 'Fünfzig Jahre Stethoskop'],
    summary: ['The old town doctor has his last day. Three generations of patients come to say thank you.', 'Der alte Stadtarzt hat seinen letzten Tag. Drei Generationen von Patienten kommen, um Danke zu sagen.'],
    scenes: [
      { at: 'ex_sakata', goal: ['Visit the clinic', 'Besuche die Praxis'],
        lines: [
          l('ex_sakata', '{外科|げか|v:n2_0568}も{内科|ないか}も、この{町|まち}では、わしが{一人|ひとり}で{診|み}てきた。{診察|しんさつ}{券|けん}には、{五十年|ごじゅうねん}の{名前|なまえ}が、{並|なら}んどる。', ['Surgery and internal medicine alike, I’ve seen to them all alone in this town. On the registry cards, names of fifty years line up.', 'Chirurgie wie innere Medizin habe ich in dieser Stadt allein betreut. In den Karteikarten stehen die Namen von fünfzig Jahren.']),
          l('ex_sakata', '{さようなら|さようなら|v:n2_0735}を{言|い}うのは、{苦手|にがて}でな。……{来月|らいげつ}から、{若|わか}い{医者|いしゃ}が{来|く}る。', ['I’m bad at saying goodbye. …From next month, a young doctor comes.', 'Ich bin schlecht im Abschiednehmen. … Ab nächstem Monat kommt ein junger Arzt.']),
        ], teach: ['v:n2_0568', 'v:n2_0735'] },
      { at: 'exo_clinic', goal: ['See the clinic on its last day', 'Sieh die Praxis an ihrem letzten Tag'],
        lines: [
          nar('{待合室|まちあいしつ}には、{古|ふる}い{患者|かんじゃ}が{続々}と{集|あつ}まってくる。{こないだ|こないだ|v:n2_0673}の{腰|こし}の{痛|いた}みを{診|み}てもらった{人|ひと}も、{杖|つえ}をついた{老人|ろうじん}も。', ['Old patients keep gathering in the waiting room. Someone who recently had back pain examined, an old man with a cane.', 'Im Wartezimmer versammeln sich nacheinander alte Patienten. Jemand, der neulich seine Rückenschmerzen untersuchen ließ, ein alter Mann am Stock.']),
          l('ex_sakata', '{心得|こころえ}た。{医者|いしゃ}が{一番|いちばん}{大切|たいせつ}にするのは、{薬|くすり}より、{話|はなし}を{聞|き}くことじゃ。', ['I’ve understood: what a doctor values most is listening, more than medicine.', 'Ich habe begriffen: Was ein Arzt am meisten schätzt, ist Zuhören, mehr noch als Medizin.']),
        ], teach: ['v:n2_0673'] },
      { at: 'ex_sakata', goal: ['Say goodbye to the old doctor', 'Verabschiede dich vom alten Arzt'], music: 'memory',
        lines: [
          nar('{小学生|しょうがくせい}が、{寄|よ}せ{書|が}きの{色紙|しきし}を{差|さ}し{出|だ}した。「{坂田|さかた}{先生|せんせい}、ありがとう！」の{字|じ}が、{何|なん}十も{並|なら}ぶ。', ['Primary-school children hold out a signed memorial board: dozens of “Thank you, Dr. Sakata!” lines.', 'Grundschulkinder reichen ein Erinnerungsbrett: Dutzende „Danke, Dr. Sakata!“ stehen nebeneinander.']),
          l('ex_sakata', '……{寿命|じゅみょう}を{延|の}ばすのは、{薬|くすり}だけじゃなかった。この{町|まち}の{皆|みな}さんが、わしの{寿命|じゅみょう}を、{延|の}ばしてくれたんじゃな。', ['…It wasn’t only medicine that lengthened lives. The people of this town have lengthened mine.', '… Nicht nur Medizin verlängert das Leben. Die Menschen dieser Stadt haben meines verlängert.'], 'happy'),
        ], teach: [] },
    ],
  },
];
