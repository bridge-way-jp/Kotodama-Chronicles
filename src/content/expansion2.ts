import { DE_STORY } from './de_story';
import type { DialogueRule, Step } from '../core/script';

/**
 * The second wave of the expansion: the districts of Osaka, Tokyo, Okinawa, Hokkaidō and Nara
 * (tools/build_expansion.py): the words of their buildings and the first words of their fifty people.
 */
type R = [ja: string, en: string, de: string];
const sc = (ja: string, en: string, de: string): R => [ja, en, de];

const BUILDINGS: Record<string, R> = {
  // Osaka: the town of small factories
  exo_school: sc('{夜間|やかん}{学校|がっこう}。{窓|まど}に{明|あ}かりがともり、{仕事|しごと}を{終|お}えた{大人|おとな}たちが{席|せき}についている。', 'The night school. Lights shine in the windows, and adults who finished work take their seats.', 'Die Abendschule. In den Fenstern brennt Licht, und Erwachsene nach der Arbeit nehmen ihre Plätze ein.'),
  exo_theatre: sc('{小|ちい}さな{劇場|げきじょう}。{赤|あか}いカーテンの{奥|おく}から、{笑|わら}い{声|ごえ}が{聞|き}こえてくる。', 'A tiny theatre. Laughter drifts out from behind the red curtain.', 'Ein winziges Theater. Hinter dem roten Vorhang dringt Gelächter hervor.'),
  exo_court: sc('{裁判所|さいばんしょ}。{大|おお}きな{柱|はしら}が、{静|しず}かに{入口|いりぐち}を{守|まも}っている。', 'The courthouse. Great pillars quietly guard the entrance.', 'Das Gericht. Große Säulen bewachen still den Eingang.'),
  exo_workshop: sc('{町工場|まちこうば}だ。シャッターが{半分|はんぶん}{開|あ}いて、{機械|きかい}の{音|おと}が{響|ひび}いている。', 'A small workshop. The shutter is half open and the sound of machines rings out.', 'Eine kleine Werkstatt. Der Rollladen ist halb offen, und Maschinengeräusche hallen heraus.'),
  exo_factory: sc('{小|ちい}さな{工場|こうじょう}。ノコギリ{屋根|やね}の{下|した}で、{夜|よる}まで{灯|あか}りがついている。', 'A small factory. Under its saw-tooth roof the lights stay on until night.', 'Eine kleine Fabrik. Unter dem Sägezahndach brennt das Licht bis in die Nacht.'),
  exo_care: sc('{介護|かいご}ホーム。{庭|にわ}のベンチで、おばあさんが{日|ひ}なたぼっこをしている。', 'The care home. An old lady sunbathes on a bench in the garden.', 'Das Pflegeheim. Auf einer Gartenbank sonnt sich eine alte Dame.'),
  exo_news: sc('{新聞社|しんぶんしゃ}の{小|ちい}さな{支局|しきょく}。{机|つくえ}の{上|うえ}に、{書|か}きかけの{記事|きじ}が{積|つ}まれている。', 'A small branch of a newspaper. Half-written articles pile up on the desks.', 'Eine kleine Zweigstelle einer Zeitung. Auf den Tischen stapeln sich halb fertige Artikel.'),
  exo_clinic: sc('{町|まち}のお{医者|いしゃ}さん。{白|しろ}い{看板|かんばん}に、{古|ふる}い{字|じ}で「{内科|ないか}」とある。', 'The town doctor. On the white sign, in old lettering: “Internal medicine”.', 'Der Stadtarzt. Auf dem weißen Schild steht in alter Schrift: „Innere Medizin“.'),
  // Tokyo: the bay and the old lanes
  ext2_cowork: sc('ガラスのビル。{屋上|おくじょう}の{庭|にわ}で、だれかが{電話|でんわ}をしている。', 'A glass tower. Someone is making a phone call in the rooftop garden.', 'Ein Glasturm. Im Dachgarten telefoniert jemand.'),
  ext2_lab: sc('{研究所|けんきゅうじょ}。{屋根|やね}の{上|うえ}のアンテナが、ゆっくり{空|そら}を{向|む}いている。', 'A research lab. The dish on the roof slowly turns to the sky.', 'Ein Forschungslabor. Die Antenne auf dem Dach dreht sich langsam zum Himmel.'),
  ext2_depot: sc('{配送|はいそう}センター。{段|だん}ボールの{箱|はこ}が、{山|やま}のように{積|つ}んである。', 'A delivery depot. Cardboard boxes are piled up like a mountain.', 'Ein Paketverteilzentrum. Kartons türmen sich wie ein Berg.'),
  ext2_fire: sc('{消防署|しょうぼうしょ}。{赤|あか}い{消防車|しょうぼうしゃ}が、いつでも{出|で}られるように{待|ま}っている。', 'The fire station. The red fire engine waits, ready to go out at any moment.', 'Die Feuerwache. Das rote Löschfahrzeug wartet, jederzeit bereit auszurücken.'),
  ext2_care: sc('{明|あか}るいケアハウス。{入口|いりぐち}に、{車|くるま}いすがいくつか{並|なら}んでいる。', 'A bright care house. A few wheelchairs are lined up at the entrance.', 'Ein helles Pflegehaus. Am Eingang stehen ein paar Rollstühle in einer Reihe.'),
  ext2_estate: sc('{古|ふる}い{不動産屋|ふどうさんや}。{窓|まど}に、{部屋|へや}の{間取|まど}り{図|ず}が{何枚|なんまい}も{貼|は}ってある。', 'An old real-estate office. Many floor plans are stuck on the window.', 'Ein altes Maklerbüro. Am Fenster hängen viele Grundrisse.'),
  ext2_nursery: sc('{夜|よる}の{保育園|ほいくえん}。{窓|まど}の{灯|あか}りの{中|なか}で、{子|こ}どもの{絵|え}が{揺|ゆ}れている。', 'A night nursery. In the lit window, a child’s drawing sways.', 'Eine Nachtkita. Im erleuchteten Fenster wiegt sich eine Kinderzeichnung.'),
  ext2_salon: sc('{美容院|びよういん}。{赤|あか}と{青|あお}と{白|しろ}のくるくるが、{店|みせ}の{前|まえ}で{回|まわ}っている。', 'A hair salon. The red, blue and white pole spins in front of the shop.', 'Ein Friseursalon. Die rot-blau-weiße Stange dreht sich vor dem Laden.'),
  ext2_old: sc('{古|ふる}い{家|いえ}だ。{小|ちい}さな{庭|にわ}に、{鉢植|はちう}えがずらりと{並|なら}んでいる。', 'An old house. Potted plants stand in a long row in the little garden.', 'Ein altes Haus. Im kleinen Garten stehen Topfpflanzen in einer langen Reihe.'),
  // Okinawa: the southern island village
  exk2_hall: sc('{公民館|こうみんかん}。{舞台|ぶたい}の{前|まえ}に、エイサーの{太鼓|たいこ}が{置|お}いてある。', 'The community hall. Eisa drums are set out in front of the stage.', 'Das Gemeindehaus. Vor der Bühne stehen Eisa-Trommeln bereit.'),
  exk2_clinic: sc('{島|しま}の{診療所|しんりょうじょ}。{赤|あか}いハイビスカスが、{入口|いりぐち}で{揺|ゆ}れている。', 'The island clinic. Red hibiscus sways at the entrance.', 'Die Inselpraxis. Am Eingang wiegt sich roter Hibiskus.'),
  exk2_still: sc('{泡盛|あわもり}の{蔵|くら}。{大|おお}きな{甕|かめ}が、{壁|かべ}ぎわにずらりと{並|なら}んでいる。', 'The awamori distillery. Big clay jars stand in a row along the wall.', 'Die Awamori-Brennerei. Große Tonkrüge stehen in einer Reihe an der Wand.'),
  exk2_soba: sc('{沖縄|おきなわ}そばとかき{氷|ごおり}の{店|みせ}。{氷|こおり}の{旗|はた}が、{風|かぜ}にはためいている。', 'A shop for Okinawa soba and shaved ice. The ice flag flutters in the wind.', 'Ein Laden für Okinawa-Soba und Eisschnee. Die Eisfahne flattert im Wind.'),
  exk2_house: sc('{赤瓦|あかがわら}の{家|いえ}。{屋根|やね}の{上|うえ}のシーサーが、{村|むら}を{見守|みまも}っている。', 'A red-tiled house. The shisa on the roof watches over the village.', 'Ein rot gedecktes Haus. Der Shisa auf dem Dach wacht über das Dorf.'),
  exk2_school: sc('{小学校|しょうがっこう}。ガジュマルの{木|き}の{下|した}で、{子|こ}どもたちが{遊|あそ}んでいる。', 'The elementary school. Children play beneath the banyan tree.', 'Die Grundschule. Unter dem Banyanbaum spielen Kinder.'),
  exk2_dive: sc('ダイビングショップ。{壁|かべ}に、サーフボードとシュノーケルがかけてある。', 'A dive shop. Surfboards and snorkels hang on the wall.', 'Ein Tauchladen. An der Wand hängen Surfbretter und Schnorchel.'),
  exk2_fish: sc('{魚屋|さかなや}の{屋台|やたい}。{氷|こおり}の{上|うえ}に、{朝|あさ}とれた{魚|さかな}が{並|なら}んでいる。', 'A fish stall. This morning’s catch lies on ice.', 'Ein Fischstand. Der Fang von heute Morgen liegt auf Eis.'),
  // Hokkaidō: the northern ranch and snow town
  exh2_barn: sc('{牛舎|ぎゅうしゃ}とサイロ。{雪|ゆき}の{朝|あさ}も、{牛|うし}たちの{白|しろ}い{息|いき}が{立|た}ちのぼる。', 'The cowshed and the silo. Even on snowy mornings, the cows’ white breath rises.', 'Kuhstall und Silo. Auch an Schneemorgen steigt der weiße Atem der Kühe auf.'),
  exh2_cheese: sc('チーズ{工房|こうぼう}。{銅|どう}のなべから、{甘|あま}いミルクのにおいがする。', 'The cheese workshop. Sweet milk smells rise from the copper vats.', 'Die Käserei. Aus den Kupferkesseln steigt der Duft süßer Milch.'),
  exh2_gym: sc('{体育館|たいいくかん}。{中|なか}から、ホッケーのスティックの{音|おと}が{聞|き}こえる。', 'The gym. From inside you hear the sound of hockey sticks.', 'Die Turnhalle. Von drinnen hört man Hockeyschläger klacken.'),
  exh2_ramen: sc('ラーメン{屋|や}。{赤|あか}いのれんの{向|む}こうから、{湯気|ゆげ}がもくもくと{出|で}ている。', 'The ramen shop. Steam billows from behind the red noren curtain.', 'Der Ramen-Laden. Hinter dem roten Noren-Vorhang quillt dichter Dampf hervor.'),
  exh2_bakery: sc('パン{屋|や}カフェ。まどが{白|しろ}く{曇|くも}って、{中|なか}のオーブンの{熱|ねつ}がわかる。', 'A bakery café. The windows are fogged white; you can feel the heat of the oven inside.', 'Ein Bäckereicafé. Die Fenster sind weiß beschlagen; man spürt die Hitze des Ofens drinnen.'),
  exh2_library: sc('{図書館|としょかん}。{暖炉|だんろ}のそばの{椅子|いす}で、{子|こ}どもが{本|ほん}を{読|よ}んでいる。', 'The library. A child reads a book in a chair by the fireplace.', 'Die Bibliothek. Auf einem Stuhl am Kamin liest ein Kind ein Buch.'),
  exh2_ice: sc('{氷上|ひょうじょう}つりの{道具屋|どうぐや}。ソリと{釣|つ}りざおが、{店|みせ}の{前|まえ}に{並|なら}んでいる。', 'The ice-fishing gear shop. Sleds and rods stand in front of the shop.', 'Der Eisangel-Laden. Schlitten und Angeln stehen vor dem Geschäft.'),
  exh2_station: sc('{小|ちい}さな{駅|えき}。{一日|いちにち}に{数本|すうほん}しか、{電車|でんしゃ}は{来|こ}ない。', 'A little station. Only a handful of trains come each day.', 'Ein kleiner Bahnhof. Nur ein paar Züge kommen am Tag.'),
  exh2_farm: sc('{丸太|まるた}の{家|いえ}。{煙突|えんとつ}から、まっすぐに{煙|けむり}が{上|あ}がっている。', 'A log house. Smoke rises straight from the chimney.', 'Ein Blockhaus. Aus dem Schornstein steigt der Rauch senkrecht auf.'),
  // Nara: the deer park and the old temple
  exn_hall: sc('{大|おお}きな{本堂|ほんどう}。{階段|かいだん}の{上|うえ}から、{鐘|かね}の{音|おと}が{降|ふ}ってくる。', 'The great main hall. The sound of a bell falls from the top of the stairs.', 'Die große Haupthalle. Von der Treppe oben fällt der Klang einer Glocke herab.'),
  exn_pagoda: sc('{五重塔|ごじゅうのとう}。{見上|みあ}げると、{空|そら}に{届|とど}きそうだ。', 'The five-storey pagoda. Looking up, it seems to reach the sky.', 'Die fünfstöckige Pagode. Wer hinaufblickt, meint, sie reiche bis in den Himmel.'),
  exn_museum: sc('{仏像|ぶつぞう}の{博物館|はくぶつかん}。{白|しろ}い{壁|かべ}の{向|む}こうに、{静|しず}かな{庭|にわ}が{見|み}える。', 'The museum of Buddhist statues. Beyond the white wall you see a quiet garden.', 'Das Museum der Buddhastatuen. Hinter der weißen Mauer sieht man einen stillen Garten.'),
  exn_brush: sc('{筆屋|ふでや}。{窓|まど}に、{長|なが}い{筆|ふで}と{短|みじか}い{筆|ふで}が{吊|つ}るされている。', 'A brush shop. Long and short brushes hang in the window.', 'Ein Pinselladen. Im Fenster hängen lange und kurze Pinsel.'),
  exn_tea: sc('{茶屋|ちゃや}。{赤|あか}い{傘|かさ}の{下|した}の{椅子|いす}で、{鹿|しか}がこちらを{見|み}ている。', 'A tea house. A deer looks over from beside the chair under the red umbrella.', 'Ein Teehaus. Neben dem Stuhl unter dem roten Schirm schaut ein Hirsch herüber.'),
  exn_inn: sc('{旅館|りょかん}。{格子|こうし}の{戸|と}と{青|あお}いのれんが、{歴史|れきし}を{感|かん}じさせる。', 'A ryokan. The lattice door and blue noren curtain give a sense of history.', 'Ein Ryokan. Die Gittertür und der blaue Noren-Vorhang lassen die Geschichte spüren.'),
  exn_toy: sc('{木|き}のおもちゃの{店|みせ}。{入口|いりぐち}の{鹿|しか}の{置物|おきもの}が、お{客|きゃく}さんを{迎|むか}える。', 'The wooden-toy shop. A deer figure at the entrance welcomes the guests.', 'Der Holzspielzeugladen. Eine Hirschfigur am Eingang begrüßt die Gäste.'),
  exn_cracker: sc('{鹿|しか}せんべいの{店|みせ}。{買|か}うと、{鹿|しか}がすぐに{集|あつ}まってくる。', 'The deer-cracker stand. As soon as you buy some, the deer gather round.', 'Der Hirschkeks-Stand. Kaum hat man welche gekauft, versammeln sich die Hirsche.'),
  exn_house: sc('{古|ふる}い{町家|まちや}。{格子|こうし}の{窓|まど}から、{筆|ふで}の{音|おと}が{聞|き}こえる。', 'An old townhouse. Through the lattice window you hear the sound of a brush.', 'Ein altes Stadthaus. Durch das Gitterfenster hört man das Kratzen eines Pinsels.'),
};

/** what each person says first (a hint of their story) */
const GREETINGS: Record<string, R> = {
  // Osaka
  ex_teppei: sc('うちは{三代|さんだい}{続|つづ}く{金属|きんぞく}の{工場|こうじょう}だ。{仕事|しごと}は{減|へ}ったが、{腕|うで}だけは、{落|お}ちとらん。', 'Our workshop has worked in metal for three generations. The jobs are fewer, but our skill hasn’t slipped.', 'Unsere Werkstatt arbeitet seit drei Generationen mit Metall. Die Aufträge sind weniger, aber unser Können hat nicht nachgelassen.'),
  ex_jun: sc('{親方|おやかた}の{言|い}うとおりにやってるのに、{怒|おこ}られてばかりで……。{俺|おれ}、{向|む}いてないんすかね。', 'I do exactly what the boss says, and I still get scolded all the time… Maybe I’m not cut out for this.', 'Ich mache genau, was der Chef sagt, und werde trotzdem ständig ausgeschimpft … Vielleicht bin ich dafür nicht gemacht.'),
  ex_nina: sc('インドネシアから{来|き}ました。{日本語|にほんご}は、まだ{難|むずか}しいです。でも、{部品|ぶひん}の{名前|なまえ}は、{全部|ぜんぶ}{覚|おぼ}えました。', 'I came from Indonesia. Japanese is still difficult. But I’ve learned the names of all the parts.', 'Ich komme aus Indonesien. Japanisch ist noch schwer. Aber die Namen aller Teile habe ich gelernt.'),
  ex_hayakawa: sc('{普通|ふつう}の{人|ひと}の{困|こま}りごとを{聞|き}くのが、{私|わたし}の{仕事|しごと}です。{小|ちい}さな{争|あらそ}いほど、{心|こころ}は{重|おも}いものです。', 'My job is to listen to ordinary people’s troubles. The smaller the dispute, the heavier the heart.', 'Meine Arbeit ist, die Sorgen gewöhnlicher Menschen anzuhören. Je kleiner der Streit, desto schwerer das Herz.'),
  ex_yuuko: sc('{毎日|まいにち}、お{年寄|としよ}りの{世話|せわ}をしています。{腰|こし}は{痛|いた}いけど、「ありがとう」{一言|ひとこと}で、{全部|ぜんぶ}{忘|わす}れます。', 'Every day I care for the elderly. My back aches, but a single “thank you” and I forget it all.', 'Jeden Tag pflege ich alte Menschen. Mein Rücken schmerzt, aber ein einziges „Danke“ und ich vergesse alles.'),
  ex_tsuyoshi2: sc('{保育園|ほいくえん}の{男|おとこ}の{先生|せんせい}は、{珍|めずら}しいんです。「{お母|かあ}さん{先生|せんせい}がいい」って、{言|い}われることも。', 'A male nursery teacher is rare. Sometimes I’m told, “We’d rather have a mother-teacher.”', 'Ein männlicher Erzieher ist selten. Manchmal sagt man mir: „Eine Mutter-Erzieherin wäre uns lieber.“'),
  ex_fujiwara: sc('{町|まち}の{小|ちい}さな{話|はなし}を{書|か}いています。{大|おお}きな{記事|きじ}じゃなくても、{読|よ}んでくれる{人|ひと}は、{必|かなら}ずいる。', 'I write the small stories of the town. Even if they’re not big articles, there’s always someone who reads them.', 'Ich schreibe die kleinen Geschichten der Stadt. Auch wenn es keine großen Artikel sind, gibt es immer jemanden, der sie liest.'),
  ex_tsukkomi: sc('{相方|あいかた}が{辞|や}めてん。……せやけど、{笑|わら}わせる{気持|きも}ちは、まだ{残|のこ}っとる。', 'My partner quit. …But the wish to make people laugh is still here.', 'Mein Partner hat aufgehört. … Aber der Wunsch, Leute zum Lachen zu bringen, ist noch da.'),
  ex_akira: sc('{四十六|よんじゅうろく}で、{夜間|やかん}{学校|がっこう}に{入|はい}りました。{子|こ}どもの{頃|ころ}、{読|よ}めなかった{字|じ}を、{今|いま}、{一|ひと}つずつ{覚|おぼ}えています。', 'At forty-six I entered night school. Characters I couldn’t read as a child, I’m learning one by one now.', 'Mit sechsundvierzig bin ich in die Abendschule eingetreten. Zeichen, die ich als Kind nicht lesen konnte, lerne ich jetzt eins nach dem anderen.'),
  ex_sakata: sc('この{町|まち}で、{五十年|ごじゅうねん}{医者|いしゃ}をしてきた。{患者|かんじゃ}さんの{孫|まご}まで、{診|み}ているよ。', 'I’ve been a doctor in this town for fifty years. I even treat my patients’ grandchildren.', 'Seit fünfzig Jahren bin ich Arzt in dieser Stadt. Ich behandle sogar die Enkel meiner Patienten.'),
  // Tokyo
  ex_mao: sc('{会社|かいしゃ}は{大|おお}きくなった。でも、{一番|いちばん}{話|はな}したい{人|ひと}は、もう{隣|となり}にいないの。', 'The company has grown. But the person I most want to talk to is no longer next to me.', 'Die Firma ist gewachsen. Aber der Mensch, mit dem ich am liebsten reden würde, sitzt nicht mehr neben mir.'),
  ex_nakajima: sc('{介護|かいご}ロボットを{作|つく}っているんです。……{実家|じっか}の{母|はは}には、もう三年、{会|あ}っていませんが。', 'I’m building a care robot. …Though I haven’t seen my mother at home for three years.', 'Ich baue einen Pflegeroboter. … Dabei habe ich meine Mutter zu Hause seit drei Jahren nicht gesehen.'),
  ex_hayato: sc('{火事|かじ}の{現場|げんば}では、{全員|ぜんいん}は{救|すく}えない。……それが、{一番|いちばん}{辛|つら}いところだ。', 'At a fire you can’t save everyone. …That is the hardest part.', 'Bei einem Brand kann man nicht alle retten. … Das ist das Schwerste.'),
  ex_hana: sc('{昔|むかし}の{東京|とうきょう}はね、{路面電車|ろめんでんしゃ}が{走|はし}っていて、{空|そら}が{広|ひろ}かったのよ。', 'In the old Tokyo, streetcars ran and the sky was wide.', 'Im alten Tokio fuhren Straßenbahnen, und der Himmel war weit.'),
  ex_shimizu: sc('{判決|はんけつ}を{書|か}き{取|と}るのが、{私|わたし}の{仕事|しごと}です。……{一人|ひとり}だけ、{今|いま}でも{夢|ゆめ}に{出|で}てくる{人|ひと}がいます。', 'My job is to take down verdicts. …There is one person who still appears in my dreams.', 'Meine Arbeit ist, Urteile zu protokollieren. … Einen Menschen sehe ich bis heute im Traum.'),
  ex_riku: sc('{日曜日|にちようび}は、お{店|みせ}を{休|やす}んで、{公園|こうえん}で{髪|かみ}を{切|き}ってるんだ。{お金|かね}は、いらないよ。', 'On Sundays I close the shop and cut hair in the park. No charge.', 'Sonntags schließe ich den Laden und schneide im Park Haare. Kostenlos.'),
  ex_isamu: sc('{一日|いちにち}、{二百|にひゃく}{個|こ}の{荷物|にもつ}。……{自分|じぶん}あての{荷物|にもつ}なんて、もう{何年|なんねん}も{来|き}てないなあ。', 'Two hundred parcels a day. …I haven’t received a parcel of my own in years.', 'Zweihundert Pakete am Tag. … Ein Paket für mich selbst habe ich seit Jahren nicht bekommen.'),
  ex_nikaidou: sc('{部屋|へや}を{探|さが}している{人|ひと}に、{断|ことわ}られた{人|ひと}は、{私|わたし}のところに{来|く}るんだ。{鍵|かぎ}は、{信用|しんよう}の{印|しるし}さ。', 'People who’ve been turned away come to me when they look for a flat. A key is a sign of trust.', 'Wer anderswo abgewiesen wurde und eine Wohnung sucht, kommt zu mir. Ein Schlüssel ist ein Zeichen des Vertrauens.'),
  ex_sophie: sc('ボンジュール。……ここでは、だれも、わたしと{遊|あそ}ばない。{用務員|ようむいん}さんだけが、{友|とも}だち。', 'Bonjour. …Nobody here plays with me. Only the caretaker is my friend.', 'Bonjour. … Hier spielt niemand mit mir. Nur der Hausmeister ist mein Freund.'),
  ex_mai: sc('{夜|よる}の{保育園|ほいくえん}には、{眠|ねむ}れない{子|こ}がたくさん{来|く}ます。{絵本|えほん}を{読|よ}むと、みんな{静|しず}かになるんです。', 'Many children who can’t sleep come to the night nursery. When I read a picture book, they all go quiet.', 'In die Nachtkita kommen viele Kinder, die nicht schlafen können. Wenn ich ein Bilderbuch vorlese, werden alle still.'),
  // Okinawa
  ok_seiyu: sc('{古|ふる}い{泡盛|あわもり}は、{何年|なんねん}も{眠|ねむ}るほど、うまくなる。……{人|ひと}も、{同|おな}じかもしれんな。', 'Old awamori gets better the longer it sleeps. …Maybe people are the same.', 'Alter Awamori wird besser, je länger er schläft. … Vielleicht ist es bei Menschen genauso.'),
  ok_umi: sc('サンゴが{白|しろ}くなってるの。{海|うみ}の{中|なか}は、{静|しず}かに{変|か}わっているのに、{誰|だれ}も{気|き}づかない。', 'The coral is turning white. The sea quietly changes, and nobody notices.', 'Die Korallen werden weiß. Das Meer verändert sich still, und niemand merkt es.'),
  ok_sanshin: sc('この{歌|うた}は、{楽譜|がくふ}がない。{耳|みみ}から{耳|みみ}へ、{百年|ひゃくねん}、{伝|つた}わってきたんだ。', 'This song has no score. For a hundred years it has passed from ear to ear.', 'Dieses Lied hat keine Noten. Hundert Jahre lang wurde es von Ohr zu Ohr weitergegeben.'),
  ok_kana: sc('お{母|かあ}さんは、{遠|とお}い{町|まち}で{働|はたら}いてるの。わたし、{毎日|まいにち}、{貝|かい}がらに{手紙|てがみ}を{書|か}くんだ。', 'My mum works in a far-off town. Every day I write letters on seashells.', 'Meine Mama arbeitet in einer fernen Stadt. Jeden Tag schreibe ich Briefe auf Muscheln.'),
  ok_hirugi: sc('{沖縄|おきなわ}そば、{食|た}べなさい。{残|のこ}したら、{怒|おこ}るよ。でも、{残|のこ}す{人|ひと}は、いないさあ。', 'Eat your Okinawa soba. If you leave any, I’ll be angry. But nobody ever does.', 'Iss deinen Okinawa-Soba. Wenn du etwas übrig lässt, werde ich böse. Aber das tut nie jemand.'),
  ok_taiyo: sc('{波|なみ}に{乗|の}ってると、{島|しま}の{外|そと}が{見|み}える{気|き}がするんだ。……{出|で}ていきたい。でも、{怖|こわ}い。', 'When I ride the waves, I feel I can see beyond the island. …I want to leave. But I’m scared.', 'Wenn ich auf den Wellen reite, glaube ich, über die Insel hinauszusehen. … Ich will weg. Aber ich habe Angst.'),
  ok_masako: sc('四つの{村|むら}で、{私|わたし}は{唯一|ゆいいつ}の{医者|いしゃ}です。{倒|たお}れるわけには、いきません。', 'Across four villages, I’m the only doctor. I can’t afford to collapse.', 'In vier Dörfern bin ich die einzige Ärztin. Ich darf nicht zusammenbrechen.'),
  ok_kenta: sc('このサトウキビ{畑|ばたけ}は、{爺|じい}さんの{代|だい}から。……ホテルが{買|か}いたいと、{言|い}ってきた。', 'This sugar-cane field goes back to my grandfather’s time. …A hotel wants to buy it.', 'Dieses Zuckerrohrfeld stammt noch aus der Zeit meines Großvaters. … Ein Hotel will es kaufen.'),
  ok_alex: sc('{島|しま}の{言葉|ことば}を、{勉強|べんきょう}しています。おじいは「{若|わか}い{人|ひと}は、もう{使|つか}わない」と{言|い}いますが……。', 'I’m studying the island’s language. The old men say, “Young people don’t use it any more”…', 'Ich lerne die Sprache der Insel. Die alten Männer sagen: „Junge Leute benutzen sie nicht mehr“ …'),
  ok_nagisa2: sc('エイサーは{今年|ことし}で五十{回目|かいめ}。……{踊|おど}る{人|ひと}が、{足|た}りないの。{手伝|てつだ}って！', 'This year is the fiftieth Eisa. …We don’t have enough dancers. Please help!', 'Dieses Jahr ist das fünfzigste Eisa. … Uns fehlen Tänzer. Hilf bitte mit!'),
  // Hokkaidō
  hk_gorou: sc('{牛|うし}は、{毎朝|まいあさ}{待|ま}ってくれる。……{息子|むすこ}は、もう{待|ま}ってくれんがな。', 'The cows wait for me every morning. …My son no longer waits.', 'Die Kühe warten jeden Morgen auf mich. … Mein Sohn wartet nicht mehr.'),
  hk_chiaki: sc('このチーズは、{母|はは}の{味|あじ}。{賞|しょう}をもらっても、{母|はは}に{見|み}せられないのが、{残念|ざんねん}です。', 'This cheese tastes like my mother’s. Even with a prize, it’s a pity I can’t show her.', 'Dieser Käse schmeckt wie der meiner Mutter. Selbst mit einem Preis kann ich ihn ihr leider nicht zeigen.'),
  hk_tomoya: sc('{電車|でんしゃ}は、{一日|いちにち}{三本|さんぼん}。……それでも、{毎回|まいかい}、{旗|はた}をふるんです。{誰|だれ}も{乗|の}らなくても。', 'Three trains a day. …Still, I wave my flag every time. Even if nobody gets on.', 'Drei Züge am Tag. … Trotzdem winke ich jedes Mal mit meiner Fahne. Auch wenn niemand einsteigt.'),
  hk_hotaru: sc('このスープは、{二十年|にじゅうねん}、{味|あじ}を{変|か}えてないの。{食|た}べた{人|ひと}は、{皆|みな}、{故郷|こきょう}を{思|おも}い{出|だ}すって。', 'This soup hasn’t changed in twenty years. Everyone who eats it says it reminds them of home.', 'Diese Suppe hat sich in zwanzig Jahren nicht verändert. Wer sie isst, sagt, sie erinnere ihn an die Heimat.'),
  hk_ryo: sc('うちのチームは、{七人|ななにん}。そのうち{一人|ひとり}は、{女|おんな}の{子|こ}だ。……{公式戦|こうしきせん}には、{出|だ}せないと{言|い}われた。', 'Our team has seven players. One of them is a girl. …We’re told she can’t play in official matches.', 'Unser Team hat sieben Spieler. Eine davon ist ein Mädchen. … Man sagt uns, sie dürfe bei offiziellen Spielen nicht mitspielen.'),
  hk_utako: sc('この{模様|もよう}は、{私|わたし}の{祖母|そぼ}の{祖母|そぼ}から。……{意味|いみ}を{知|し}る{人|ひと}は、もう{私|わたし}だけだよ。', 'This pattern comes from my grandmother’s grandmother. …I’m the only one left who knows its meaning.', 'Dieses Muster stammt von der Großmutter meiner Großmutter. … Ich bin die Einzige, die seine Bedeutung noch kennt.'),
  hk_ken2: sc('{氷|こおり}は、{毎年|まいとし}{薄|うす}くなる。……{観光客|かんこうきゃく}には、{本当|ほんとう}のことを{言|い}わなきゃならん。', 'The ice gets thinner every year. …I have to tell the tourists the truth.', 'Das Eis wird jedes Jahr dünner. … Ich muss den Touristen die Wahrheit sagen.'),
  hk_mizuho: sc('{雪|ゆき}の{日|ひ}は、{学校|がっこう}が{休|やす}みになるでしょう？{子|こ}どもたちは、ここで{本|ほん}を{読|よ}んで{待|ま}つんです。', 'On snow days, school is cancelled, isn’t it? The children wait here and read books.', 'An Schneetagen fällt die Schule aus, nicht wahr? Die Kinder warten hier und lesen Bücher.'),
  hk_pierre: sc('ボンジュール！{私|わたし}は、パンを{焼|や}くために、ここへ{来|き}たのではありません。{一人|ひとり}の{人|ひと}に、{会|あ}いに{来|き}たのです。', 'Bonjour! I did not come here to bake bread. I came to see one person.', 'Bonjour! Ich bin nicht hierhergekommen, um Brot zu backen. Ich kam, um einen Menschen zu sehen.'),
  hk_yukko: sc('オーロラを、この{町|まち}で{見|み}た{人|ひと}が、{昔|むかし}いたの。{私|わたし}、それを{証明|しょうめい}したいんだ。', 'Long ago someone saw the aurora in this town. I want to prove it.', 'Vor langer Zeit hat jemand in dieser Stadt das Polarlicht gesehen. Das will ich beweisen.'),
  // Nara
  nr_kou: sc('{鹿|しか}の{子|こ}が、{怪我|けが}をしていてね。{世話|せわ}をしているうちに、{家族|かぞく}より、{鹿|しか}の{顔|かお}を{見|み}る{時間|じかん}が{長|なが}くなった。', 'A fawn was injured. While caring for it, I started to spend more time with deer than with my family.', 'Ein Hirschkalb war verletzt. Während ich es pflegte, verbrachte ich mehr Zeit mit den Hirschen als mit meiner Familie.'),
  nr_shinkai: sc('{仏像|ぶつぞう}の{中|なか}から、{古|ふる}い{手紙|てがみ}が{出|で}てきた。……{何|なん}を{願|ねが}った{人|ひと}が、{入|い}れたのだろう。', 'An old letter came out from inside a Buddha statue. …I wonder what the person who put it there was wishing for.', 'Aus dem Inneren einer Buddhastatue kam ein alter Brief zum Vorschein. … Was sich der Mensch, der ihn hineingelegt hat, wohl gewünscht hat.'),
  nr_fude: sc('{筆|ふで}は、{一本|いっぽん}{作|つく}るのに、{三日|みっか}かかる。……{息子|むすこ}は、ゲームのほうが{好|す}きらしい。', 'A single brush takes three days to make. …My son seems to prefer video games.', 'Für einen einzigen Pinsel brauche ich drei Tage. … Mein Sohn mag Computerspiele offenbar lieber.'),
  nr_senbei: sc('{鹿|しか}は、{私|わたし}の{顔|かお}を{覚|おぼ}えてる。{孫|まご}より、よほど{覚|おぼ}えがいいよ。', 'The deer remember my face. They’re much better at it than my grandchildren.', 'Die Hirsche erinnern sich an mein Gesicht. Viel besser als meine Enkel.'),
  nr_emi: sc('{毎日|まいにち}、{同|おな}じ{説明|せつめい}をしています。でも、{本当|ほんとう}は、{故郷|ふるさと}の{話|はなし}が、したいんです。', 'Every day I give the same explanation. But what I really want is to talk about my hometown.', 'Jeden Tag gebe ich dieselbe Erklärung. Aber eigentlich möchte ich über meine Heimat sprechen.'),
  nr_okami: sc('{十二代|じゅうにだい}{続|つづ}いた{宿|やど}です。……{娘|むすめ}は、{閉|し}めたほうがいいと{言|い}います。{私|わたし}は、まだ{決|き}められません。', 'An inn that has gone on for twelve generations. …My daughter says it would be better to close. I can’t decide yet.', 'Ein Gasthaus, das seit zwölf Generationen besteht. … Meine Tochter sagt, es sei besser zu schließen. Ich kann mich noch nicht entscheiden.'),
  nr_daigo: sc('あの{灯籠|とうろう}には、{恋人|こいびと}の{幽霊|ゆうれい}が{出|で}るんですよ。……{全部|ぜんぶ}、{私|わたし}の{作|つく}り{話|ばなし}ですけどね。', 'A lover’s ghost appears at that lantern. …All made up by me, of course.', 'An dieser Laterne erscheint der Geist einer Geliebten. … Alles von mir erfunden, natürlich.'),
  nr_tsubasa: sc('このシカは、「たろう」。あっちは「はなこ」。……みんな、ぼくの{友|とも}だち。', 'This deer is “Tarō”. That one is “Hanako”. …They’re all my friends.', 'Dieser Hirsch heißt „Tarō“. Der dort „Hanako“. … Sie sind alle meine Freunde.'),
  nr_lena: sc('たった{一|ひと}つの{仏像|ぶつぞう}を{見|み}に、{来|き}ました。でも、{今|いま}は、{町|まち}の{人|ひと}たちに、{会|あ}いたくて{残|のこ}っています。', 'I came to see a single Buddha statue. But now I stay because I want to meet the people of the town.', 'Ich kam, um eine einzige Buddhastatue zu sehen. Aber jetzt bleibe ich, weil ich die Menschen der Stadt treffen möchte.'),
  nr_taiko: sc('{夕方|ゆうがた}の{鐘|かね}を、わしが{鳴|な}らす。……{何|なん}のために{鳴|な}らすのか、もう{誰|だれ}も{知|し}らん。', 'I ring the evening bell. …Nobody knows any more what it is rung for.', 'Ich läute die Abendglocke. … Niemand weiß mehr, wofür sie läutet.'),
};

export const EXPANSION2_SCRIPTS: Record<string, DialogueRule[]> = {};
for (const [id, [ja, en, de]] of Object.entries(BUILDINGS)) {
  DE_STORY[en] ??= de;
  EXPANSION2_SCRIPTS[id] = [{ steps: [{ say: ja, en }] }];
}
export const GREETING_TEXTS = GREETINGS;
export function greeting(id: string): Step[] | undefined {
  const g = GREETINGS[id];
  if (!g) return undefined;
  DE_STORY[g[1]] ??= g[2];
  return [{ say: g[0], who: id, en: g[1] }];
}
