import { DE_STORY } from './de_story';
import type { DialogueRule, Step } from '../core/script';
import { EXPANSION_GEN } from './expansion.gen';
import { EX_JOB_NPC, EX_JOBS } from './jobs_ex';

/**
 * The world expansion: one new district in each region (tools/build_expansion.py builds the maps, buildings and people
 * from the art in art/sheets), each reached from a signpost on its region's map. Ten new people live in each district;
 * their 心の物語 stand in content/episodes_ex*.ts. Here: the signposts, the buildings' words and the people's greetings.
 */

type T = [en: string, de: string];
const de = ([en, d]: T) => ((DE_STORY[en] ??= d), en);
const n = (ja: string, t: T): Step => ({ say: ja, en: de(t) });
const say = (who: string, ja: string, t: T): Step => ({ say: ja, who, en: de(t) });

/** the signpost on a region's map that leads into its district: [map, sign tile, the sign's words] */
export const EXPANSION_SIGNS: Record<string, { map: string; x: number; y: number; text: string; t: T }> = {
  hinomori: { map: 'town', x: 23, y: 14, text: '{道|みち}しるべ：「→ ひのもり{商店街|しょうてんがい}・{市民|しみん}{病院|びょういん}」', t: ['Signpost: “→ Hinomori shopping arcade · City hospital”', 'Wegweiser: „→ Einkaufsstraße Hinomori · Stadtkrankenhaus“'] },
  tal: { map: 'valley', x: 38, y: 18, text: '{道|みち}しるべ：「→ {谷|たに}の{分校|ぶんこう}・{棚田|たなだ}」', t: ['Signpost: “→ Valley branch school · Rice terraces”', 'Wegweiser: „→ Talschule · Reisterrassen“'] },
  yukimi: { map: 'mountain', x: 2, y: 12, text: '{道|みち}しるべ：「→ {雪見|ゆきみ}スキー{場|じょう}・{湯|ゆ}の{町|まち}」', t: ['Signpost: “→ Yukimi ski slope · Hot-spring street”', 'Wegweiser: „→ Skihang Yukimi · Onsen-Straße“'] },
  shiomi: { map: 'harbor', x: 40, y: 22, text: '{船着|ふなつ}き{場|ば}の{看板|かんばん}：「{潮見島|しおみじま}{行|ゆ}き{渡|わた}し{船|ぶね}」', t: ['A sign at the landing: “Ferry to Shiomi Island”', 'Schild am Anleger: „Fähre zur Insel Shiomi“'] },
  kyoto: { map: 'k_kamo', x: 1, y: 23, text: '{道|みち}しるべ：「→ {大学|だいがく}・{嵐山|あらしやま}」', t: ['Signpost: “→ University · Arashiyama”', 'Wegweiser: „→ Universität · Arashiyama“'] },
};

const GO: T = ['Go there', 'Hingehen'];
const STAY: T = ['Not now', 'Jetzt nicht'];

/** the words of the buildings (by script id) */
const BUILDINGS: Record<string, [string, T]> = {
  // Hinomori: the shopping arcade and the city hospital
  exh_hospital: ['{市民|しみん}{病院|びょういん}。{夜|よる}になっても、{窓|まど}の{明|あ}かりが{消|き}えることはない。', ['The city hospital. Even at night, the lights in its windows never go out.', 'Das Stadtkrankenhaus. Auch nachts erlöschen die Lichter in seinen Fenstern nie.']],
  exh_school: ['ひのもり{小学校|しょうがっこう}。{下駄箱|げたばこ}に、{小|ちい}さな{上履|うわば}きがきれいに{並|なら}んでいる。', ['Hinomori Primary School. Small indoor shoes stand neatly in the shoe lockers.', 'Die Grundschule Hinomori. In den Schuhfächern stehen kleine Hausschuhe ordentlich in einer Reihe.']],
  exh_greengrocer: ['{八百屋|やおや}「{大森|おおもり}」。「{今日|きょう}のおすすめ：{大根|だいこん} 一本 百円」', ['Ōmori’s greengrocer. “Today’s pick: daikon, 100 yen each.”', 'Gemüseladen „Ōmori“. „Heute im Angebot: Rettich, 100 Yen das Stück.“']],
  exh_flowers: ['{小|ちい}さな{花屋|はなや}。{入口|いりぐち}のバケツに、{季節|きせつ}の{花|はな}がたくさん{入|はい}っている。', ['A little flower shop. The buckets at the door are full of seasonal flowers.', 'Ein kleiner Blumenladen. Die Eimer am Eingang sind voller Blumen der Jahreszeit.']],
  exh_bakery: ['パン{屋|や}。{焼|や}きたてのパンの、いいにおいがする。「{朝|あさ}六時から{営業|えいぎょう}」', ['A bakery. It smells of fresh bread. “Open from 6 a.m.”', 'Eine Bäckerei. Es riecht nach frischem Brot. „Geöffnet ab 6 Uhr morgens.“']],
  exh_post: ['{郵便局|ゆうびんきょく}。「{手紙|てがみ}は、{気持|きも}ちを{届|とど}けます」というポスターが{貼|は}ってある。', ['The post office. A poster says: “A letter delivers your feelings.”', 'Die Post. Auf einem Plakat steht: „Ein Brief überbringt deine Gefühle.“']],
  exh_shutter: ['シャッターが{下|お}りている。「{長|なが}い{間|あいだ}、ありがとうございました」と{書|か}いた{紙|かみ}が{貼|は}ってある。', ['The shutter is down. A note on it says: “Thank you for all these years.”', 'Der Rollladen ist unten. Ein Zettel hängt daran: „Vielen Dank für all die Jahre.“']],
  exh_hall: ['{公民館|こうみんかん}。{掲示板|けいじばん}に「{夏祭|なつまつ}り　ボランティア{募集|ぼしゅう}」と{書|か}いてある。', ['The community hall. The notice board says: “Summer festival — volunteers wanted.”', 'Das Gemeindehaus. Am Schwarzen Brett steht: „Sommerfest — Freiwillige gesucht.“']],
  // the valley: the branch school and the rice terraces
  ext_school: ['{古|ふる}い{木造|もくぞう}の{分校|ぶんこう}。{今|いま}は{小|ちい}さなカフェになっている。', ['The old wooden branch school. Now it is a little café.', 'Die alte hölzerne Zweigschule. Heute ist sie ein kleines Café.']],
  ext_coop: ['{農協|のうきょう}の{倉庫|そうこ}。{米|こめ}の{袋|ふくろ}が{高|たか}く{積|つ}んである。', ['The farm co-op’s storehouse. Sacks of rice are piled high.', 'Das Lager der Bauerngenossenschaft. Reissäcke sind hoch gestapelt.']],
  ext_dam: ['ダムの{管理|かんり}{小屋|ごや}。{水位|すいい}を{測|はか}る{棒|ぼう}が、{湖|みずうみ}に{立|た}っている。', ['The dam keeper’s hut. A gauge for the water level stands in the lake.', 'Die Hütte des Dammwärters. Ein Pegel für den Wasserstand steht im See.']],
  ext_drum: ['{神社|じんじゃ}の{太鼓櫓|たいこやぐら}。{大|おお}きな{太鼓|たいこ}が、{静|しず}かに{祭|まつ}りを{待|ま}っている。', ['The shrine’s drum tower. A big drum quietly waits for the festival.', 'Der Trommelturm des Schreins. Eine große Trommel wartet still auf das Fest.']],
  ext_vet: ['{動物|どうぶつ}{病院|びょういん}。{庭|にわ}で{子牛|こうし}が{一頭|いっとう}、{草|くさ}を{食|た}べている。', ['The animal clinic. A calf is eating grass in the yard.', 'Die Tierklinik. Im Hof frisst ein Kälbchen Gras.']],
  ext_brewery: ['{酒蔵|さかぐら}。{入口|いりぐち}の{杉玉|すぎだま}が{茶色|ちゃいろ}くなっている。{新酒|しんしゅ}ができた{印|しるし}だ。', ['The sake brewery. The cedar ball at the door has turned brown — a sign that the new sake is ready.', 'Die Sake-Brauerei. Die Zedernkugel am Eingang ist braun geworden — ein Zeichen, dass der neue Sake fertig ist.']],
  ext_farm: ['かやぶき{屋根|やね}の{農家|のうか}。{縁側|えんがわ}に{干|ほ}し{柿|がき}がつるしてある。', ['A thatched farmhouse. Dried persimmons hang along the veranda.', 'Ein strohgedecktes Bauernhaus. Auf der Veranda hängen getrocknete Kakis.']],
  ext_newfarm: ['{新|あたら}しい{農家|のうか}。{屋根|やね}の{上|うえ}に、ソーラーパネルが{光|ひか}っている。', ['A new farmhouse. Solar panels shine on the roof.', 'Ein neues Bauernhaus. Auf dem Dach glänzen Solarzellen.']],
  // Yukimi: the ski slope and the hot-spring street
  exy_lift: ['リフト{乗|の}り{場|ば}。「{本日|ほんじつ}{運行|うんこう}{中|ちゅう}　{上|うえ}は{風|かぜ}が{強|つよ}いです」', ['The lift station. “Running today — strong wind at the top.”', 'Die Liftstation. „Heute in Betrieb — oben starker Wind.“']],
  exy_plough: ['{除雪車|じょせつしゃ}の{車庫|しゃこ}。オレンジ{色|いろ}の{大|おお}きな{除雪車|じょせつしゃ}が、{夜|よる}を{待|ま}っている。', ['The snow-plough depot. A big orange plough waits for the night.', 'Das Räumfahrzeug-Depot. Ein großes oranges Räumfahrzeug wartet auf die Nacht.']],
  exy_weather: ['{気象|きしょう}{観測所|かんそくしょ}。{屋根|やね}の{上|うえ}で、{風見|かざみ}がくるくる{回|まわ}っている。', ['The weather station. A wind vane spins round and round on the roof.', 'Die Wetterstation. Auf dem Dach dreht sich eine Windfahne im Kreis.']],
  exy_inn: ['{古|ふる}い{木|き}の{宿|やど}。{屋根|やね}の{雪|ゆき}の{上|うえ}に、{湯気|ゆげ}が{上|あ}がっている。', ['An old wooden inn. Steam rises above the snow on its roof.', 'Ein altes Holzgasthaus. Über dem Schnee auf dem Dach steigt Dampf auf.']],
  exy_wood: ['{木工|もっこう}{工房|こうぼう}。{窓|まど}の{向|む}こうに、{木|き}のスプーンがたくさん{並|なら}んでいる。', ['The woodworking studio. Behind the window stand rows of wooden spoons.', 'Die Holzwerkstatt. Hinter dem Fenster liegen viele Holzlöffel in Reihen.']],
  exy_minshuku: ['{民宿|みんしゅく}「さち」。{青|あお}いのれんが、{冷|つめ}たい{風|かぜ}に{揺|ゆ}れている。', ['Minshuku “Sachi”. Its blue noren curtain sways in the cold wind.', 'Die Pension „Sachi“. Ihr blauer Noren-Vorhang schwankt im kalten Wind.']],
  exy_museum: ['{郷土|きょうど}{資料館|しりょうかん}。{古|ふる}い{蔵|くら}を{使|つか}った、{小|ちい}さな{博物館|はくぶつかん}だ。', ['The local history museum: a little museum in an old storehouse.', 'Das Heimatmuseum: ein kleines Museum in einem alten Speicherhaus.']],
  exy_footbath: ['{足湯|あしゆ}。だれでも{無料|むりょう}で{入|はい}れる。{足|あし}を{入|い}れると、{体|からだ}じゅうが{温|あたた}まった。', ['The footbath. Free for everyone. Putting your feet in warms your whole body.', 'Das Fußbad. Kostenlos für alle. Die Füße hineinzustecken wärmt den ganzen Körper.']],
  // Shiomi Island
  exs_ferry: ['{渡|わた}し{船|ぶね}の{待合所|まちあいじょ}。「{本土|ほんど}{行|ゆ}き　一日{三便|さんびん}」', ['The ferry waiting hut. “To the mainland — three boats a day.”', 'Die Wartehütte der Fähre. „Zum Festland — drei Fahrten am Tag.“']],
  exs_market: ['{魚市場|うおいちば}。{朝|あさ}の{競|せ}りが{終|お}わって、{床|ゆか}が{水|みず}で{光|ひか}っている。', ['The fish market. The morning auction is over, and the floor glistens with water.', 'Der Fischmarkt. Die Morgenauktion ist vorbei, und der Boden glänzt vor Wasser.']],
  exs_shipyard: ['{造船所|ぞうせんじょ}。{作|つく}りかけの{木|き}の{舟|ふね}が、{静|しず}かに{待|ま}っている。', ['The shipyard. A half-built wooden boat waits quietly.', 'Die Werft. Ein halb gebautes Holzboot wartet still.']],
  exs_school: ['{島|しま}の{分校|ぶんこう}。{教室|きょうしつ}の{机|つくえ}は、{二|ふた}つしかない。', ['The island’s branch school. There are only two desks in the classroom.', 'Die Zweigschule der Insel. Im Klassenzimmer stehen nur zwei Tische.']],
  exs_clinic: ['{島|しま}の{診療所|しんりょうじょ}。「{医師|いし}は{毎週|まいしゅう}{水曜日|すいようび}に{来|き}ます」', ['The island clinic. “The doctor comes every Wednesday.”', 'Die Inselpraxis. „Der Arzt kommt jeden Mittwoch.“']],
  exs_house: ['{漁師|りょうし}の{家|いえ}。{網|あみ}が{干|ほ}してあって、{潮|しお}のにおいがする。', ['A fisherman’s house. Nets are hung out to dry; it smells of the sea.', 'Ein Fischerhaus. Netze hängen zum Trocknen; es riecht nach Meer.']],
  exs_guesthouse: ['{民宿|みんしゅく}「うみ」。{入口|いりぐち}に、{手作|てづく}りの{花|はな}の{鉢|はち}が{並|なら}んでいる。', ['Minshuku “Umi”. Handmade flower pots line the entrance.', 'Die Pension „Umi“. Am Eingang stehen selbst gemachte Blumentöpfe.']],
  exs_coop: ['{漁協|ぎょきょう}の{事務所|じむしょ}。{今月|こんげつ}の{漁獲量|ぎょかくりょう}のグラフが{貼|は}ってある。', ['The fisheries co-op office. A chart of this month’s catch hangs on the wall.', 'Das Büro der Fischereigenossenschaft. An der Wand hängt ein Diagramm der Fangmenge dieses Monats.']],
  // Kyoto: the university and Arashiyama
  exk_library: ['{大学|だいがく}{図書館|としょかん}。{高|たか}い{窓|まど}から、{秋|あき}の{光|ひかり}が{入|はい}っている。', ['The university library. Autumn light falls through its tall windows.', 'Die Universitätsbibliothek. Durch die hohen Fenster fällt Herbstlicht.']],
  exk_hall: ['{時計台|とけいだい}の{講堂|こうどう}。{百年|ひゃくねん}{以上|いじょう}、{学生|がくせい}たちを{見|み}てきた。', ['The clock-tower lecture hall. For over a hundred years it has watched the students.', 'Der Hörsaal mit dem Uhrturm. Seit über hundert Jahren sieht er den Studierenden zu.']],
  exk_dorm: ['{学生|がくせい}{寮|りょう}。ベランダに{洗濯物|せんたくもの}が{揺|ゆ}れている。「{取|と}り{壊|こわ}し{反対|はんたい}」の{紙|かみ}も。', ['The student dormitory. Laundry sways on the balconies — and a sign: “No to the demolition”.', 'Das Studentenwohnheim. Auf den Balkonen schaukelt Wäsche — und ein Schild: „Nein zum Abriss“.']],
  exk_bookshop: ['{古本屋|ふるほんや}。{店|みせ}の{前|まえ}に、一冊百円の{本|ほん}が{積|つ}んである。', ['A second-hand bookshop. Books at 100 yen each are piled in front.', 'Ein Antiquariat. Davor stapeln sich Bücher für 100 Yen das Stück.']],
  exk_bamboo: ['{竹細工|たけざいく}の{工房|こうぼう}。{壁|かべ}に{青|あお}い{竹|たけ}が{立|た}てかけてある。', ['The bamboo-craft workshop. Green bamboo poles lean against the wall.', 'Die Bambuswerkstatt. Grüne Bambusstangen lehnen an der Wand.']],
  exk_okiya: ['{置屋|おきや}。{格子|こうし}の{窓|まど}の{奥|おく}から、{三味線|しゃみせん}の{練習|れんしゅう}が{聞|き}こえる。', ['The okiya. Shamisen practice can be heard behind the lattice windows.', 'Das Okiya. Hinter den Gitterfenstern hört man jemanden Shamisen üben.']],
  exk_gate: ['{寺|てら}の{庭|にわ}の{門|もん}。{奥|おく}に、{赤|あか}く{色|いろ}づいた{古|ふる}い{紅葉|もみじ}が{見|み}える。', ['The gate to a temple garden. Deep inside, an old maple glows red.', 'Das Tor zu einem Tempelgarten. Tief drinnen leuchtet ein alter Ahorn rot.']],
  exk_rickshaw: ['{人力車|じんりきしゃ}の{乗|の}り{場|ば}。「{嵐山|あらしやま}{一周|いっしゅう}　三十分」', ['The rickshaw stand. “Around Arashiyama — 30 minutes.”', 'Der Rikscha-Stand. „Rund um Arashiyama — 30 Minuten.“']],
};

/** what each new person says when there is no story scene with them (a hint of their story) */
const GREETINGS: Record<string, [string, T]> = {
  // Hinomori
  ex_oomori: ['いらっしゃい！……{隣|となり}の{店|みせ}も、{先月|せんげつ}{閉|し}まっちゃってね。でも、うちは{最後|さいご}まで{開|あ}けるよ。', ['Welcome! …The shop next door closed last month, too. But I’ll keep mine open to the very end.', 'Willkommen! …Der Laden nebenan hat letzten Monat auch zugemacht. Aber meiner bleibt bis zum Schluss offen.']],
  ex_yuuma: ['あ、あの……い、いらっしゃいませ。……{花|はな}、{見|み}ていってください。', ['Ah, um… w-welcome. …Please, have a look at the flowers.', 'Äh, also … w-willkommen. … Schauen Sie sich ruhig die Blumen an.']],
  ex_chihiro: ['これから{夜勤|やきん}なの。……{娘|むすめ}の{寝顔|ねがお}しか、もう{何年|なんねん}も{見|み}てないなあ。', ['I’m off to the night shift. …For years now, I’ve only seen my daughter asleep.', 'Gleich fängt meine Nachtschicht an. … Seit Jahren sehe ich meine Tochter nur noch schlafend.']],
  ex_ren: ['ぼく、{手紙|てがみ}を{書|か}いてるんだ。クラスのみんなに。……{返事|へんじ}、{来|く}るかな。', ['I’m writing a letter. To everyone in my class. …Do you think they’ll write back?', 'Ich schreibe einen Brief. An alle in meiner Klasse. … Ob sie wohl zurückschreiben?']],
  ex_takahashi: ['{一年生|いちねんせい}の{担任|たんにん}です。……{子|こ}どもたちに、どう{話|はな}せば{伝|つた}わるんでしょう。', ['I teach the first-years. …How do I speak so that the children actually hear me?', 'Ich bin Klassenlehrerin der Erstklässler. … Wie muss ich sprechen, damit die Kinder mich wirklich verstehen?']],
  ex_murai: ['{郵便|ゆうびん}です！……{返事|へんじ}の{来|こ}ない{手紙|てがみ}もね、ちゃんと{届|とど}けるのが{仕事|しごと}なんですよ。', ['Post! …Even letters that never get an answer — delivering them properly is my job.', 'Post! … Auch Briefe, auf die nie eine Antwort kommt — sie ordentlich zuzustellen ist meine Arbeit.']],
  ex_shouta: ['{朝|あさ}四時{起|お}きで{新聞|しんぶん}{配達|はいたつ}。それから{学校|がっこう}。……{眠|ねむ}いけど、{平気|へいき}っす。', ['Up at four to deliver newspapers, then school. …I’m sleepy, but I’m fine.', 'Um vier aufstehen, Zeitungen austragen, dann Schule. … Bin müde, aber passt schon.']],
  ex_oono: ['{今年|ことし}の{夏祭|なつまつ}りは、{中止|ちゅうし}かもしれん。{若|わか}い{人|ひと}が、だれも{手伝|てつだ}ってくれんのだ。', ['This year’s summer festival may be cancelled. None of the young people will help.', 'Das Sommerfest fällt dieses Jahr vielleicht aus. Keiner von den jungen Leuten hilft mit.']],
  ex_misaki: ['いらっしゃいませ！{毎朝|まいあさ}四時から{焼|や}いてるの。{今日|きょう}のメロンパン、{自信|じしん}あるわよ。', ['Welcome! I bake from four every morning. I’m proud of today’s melon bread.', 'Willkommen! Ich backe jeden Morgen ab vier. Auf das Melonenbrot heute bin ich stolz.']],
  ex_genichirou: ['{将棋|しょうぎ}、{指|さ}すかい？……いや、{友|とも}だちを{待|ま}っておるんじゃ。{毎日|まいにち}、ここでな。', ['Fancy a game of shogi? …No, I’m waiting for a friend. Every day, right here.', 'Lust auf eine Partie Shogi? … Nein, ich warte auf einen Freund. Jeden Tag, genau hier.']],
  // the valley
  ex_masaji: ['{上|うえ}の{棚田|たなだ}は、もうわしだけじゃ。{田|た}んぼは、{一年|いちねん}{休|やす}むと{戻|もど}らんのよ。', ['I’m the only one left on the upper terraces. Leave a paddy for a single year and it never comes back.', 'Auf den oberen Terrassen bin nur noch ich. Lässt man ein Reisfeld ein Jahr liegen, kommt es nie zurück.']],
  ex_risa: ['いらっしゃい。{都会|とかい}から{来|き}て三年。……まだ「{都会|とかい}の{人|ひと}」って{呼|よ}ばれるんです。', ['Welcome. Three years since I came from the city. …They still call me “the one from the city”.', 'Willkommen. Seit drei Jahren bin ich aus der Stadt hier. … Man nennt mich immer noch „die aus der Stadt“.']],
  ex_uchida: ['この{湖|みずうみ}の{底|そこ}にはね、わしの{生|う}まれた{村|むら}があるんだよ。', ['At the bottom of this lake lies the village where I was born.', 'Auf dem Grund dieses Sees liegt das Dorf, in dem ich geboren bin.']],
  ex_sanae: ['{獣医|じゅうい}の{仕事|しごと}で{一番|いちばん}つらいのは、{治|なお}せないって{伝|つた}える{時|とき}なの。', ['The hardest part of being a vet is telling someone you can’t cure their animal.', 'Das Schwerste an der Arbeit als Tierärztin ist, jemandem zu sagen, dass man nicht heilen kann.']],
  ex_daichi: ['じいちゃんの{太鼓|たいこ}……{今年|ことし}はぼくが{叩|たた}くんだって。……{無理|むり}だよ。', ['Grandpa’s drum… they say I have to play it this year. …I can’t.', 'Opas Trommel … dieses Jahr soll ich sie schlagen. … Das schaff ich nicht.']],
  ex_ume: ['{山|やま}のことなら、なんでも{知|し}っとるよ。……はて、{今日|きょう}はどっちから{来|き}たかねえ。', ['Ask me anything about the mountain. …Now, which way did I come from today?', 'Über den Berg weiß ich alles. … Nanu, aus welcher Richtung bin ich heute gekommen?']],
  ex_miho: ['{村|むら}おこしのボランティアです！……でも、{何|なに}をやっても、うまくいかなくて。', ['I’m a volunteer for reviving the village! …But nothing I try works.', 'Ich bin Freiwillige zur Wiederbelebung des Dorfes! … Aber nichts, was ich versuche, klappt.']],
  ex_megumi: ['うちの{保育園|ほいくえん}、{子|こ}どもが{三人|さんにん}だけになっちゃって。{来年|らいねん}は……。', ['Our nursery is down to three children. Next year…', 'In unserem Kindergarten sind nur noch drei Kinder. Nächstes Jahr …']],
  ex_youske: ['{会社|かいしゃ}を{辞|や}めて、{農業|のうぎょう}を{始|はじ}めたんです。……{妻|つま}は、まだ{慣|な}れないみたいで。', ['I quit my company and started farming. …My wife doesn’t seem used to it yet.', 'Ich habe meine Firma verlassen und mit der Landwirtschaft angefangen. … Meine Frau hat sich wohl noch nicht eingewöhnt.']],
  ex_toji: ['{今年|ことし}の{酒|さけ}が、わしの{最後|さいご}の{酒|さけ}になる。……{継|つ}ぐ{者|もの}は、まだおらん。', ['This year’s sake will be my last. …There’s still no one to take over.', 'Der Sake dieses Jahres wird mein letzter sein. … Einen Nachfolger gibt es noch nicht.']],
  // Yukimi
  ex_yukina: ['スキーの{先生|せんせい}よ。……{教|おし}えることはできるの。{自分|じぶん}で{滑|すべ}るのが、こわいだけ。', ['I’m a ski teacher. …I can teach. It’s only skiing myself that scares me.', 'Ich bin Skilehrerin. … Unterrichten kann ich. Nur selbst zu fahren macht mir Angst.']],
  ex_shigeru: ['{夜中|よなか}に{道|みち}の{雪|ゆき}をどけるんだ。{朝|あさ}、{救急車|きゅうきゅうしゃ}が{通|とお}れるようにな。', ['I clear the snow off the roads at night, so the ambulance can get through in the morning.', 'Nachts räume ich den Schnee von den Straßen, damit morgens der Krankenwagen durchkommt.']],
  ex_sachiko: ['{民宿|みんしゅく}をやってるの。……もう{三年|さんねん}も、お{客|きゃく}さんが{来|こ}ないけどね。', ['I run a guesthouse. …Though no guest has come for three years now.', 'Ich führe eine Pension. … Auch wenn seit drei Jahren kein Gast mehr gekommen ist.']],
  ex_itsuki: ['{倒|たお}れた{古|ふる}い{木|き}で、スプーンを{作|つく}ってる。{木|き}は、{死|し}んでもまだ{役|やく}に{立|た}つんだ。', ['I make spoons from an old fallen tree. Even dead, a tree is still useful.', 'Ich mache Löffel aus einem alten umgestürzten Baum. Auch tot ist ein Baum noch zu etwas nütze.']],
  ex_ken: ['{俺|おれ}、{村|むら}を{出|で}るつもりだったんだ。……でも、{森|もり}が{放|ほう}っておけなくてさ。', ['I meant to leave the village. …But I couldn’t just abandon the forest.', 'Ich wollte eigentlich aus dem Dorf weg. … Aber den Wald konnte ich nicht im Stich lassen.']],
  ex_hoshino: ['{二十五年|にじゅうごねん}、{毎日|まいにち}{天気|てんき}を{記録|きろく}してきた。……だれが{読|よ}むんだろうね。', ['For twenty-five years I’ve recorded the weather every day. …I wonder who reads it.', 'Seit fünfundzwanzig Jahren schreibe ich jeden Tag das Wetter auf. … Wer das wohl liest?']],
  ex_ryuuji: ['{冬|ふゆ}だけ、ここで{働|はたら}いてるんだ。……{娘|むすめ}には、もう十年{手紙|てがみ}を{書|か}いてねえ。', ['I work here only in winter. …I haven’t written to my daughter in ten years.', 'Ich arbeite nur im Winter hier. … Meiner Tochter habe ich seit zehn Jahren nicht geschrieben.']],
  ex_fumiko: ['{資料館|しりょうかん}へようこそ。{六十年前|ろくじゅうねんまえ}の{大雪|おおゆき}の{日記|にっき}が、{見|み}つかったのよ。', ['Welcome to the museum. We found a diary from the great snowstorm sixty years ago.', 'Willkommen im Museum. Wir haben ein Tagebuch vom großen Schneesturm vor sechzig Jahren gefunden.']],
  ex_yuzu: ['もう、スキーなんて{大|だい}っきらい！{毎日|まいにち}{転|ころ}ぶんだもん。', ['I hate skiing! I fall over every single day.', 'Ich hasse Skifahren! Ich falle jeden Tag hin.']],
  ex_haruto2: ['{大学|だいがく}の{単位|たんい}のために{来|き}た{雪|ゆき}かきボランティアです。……でも、ここ、いいところですね。', ['I came as a snow-clearing volunteer for university credits. …But it’s a good place here.', 'Ich bin als Schneeräum-Freiwilliger für Uni-Punkte gekommen. … Aber es ist schön hier.']],
  // Shiomi Island
  ex_tsuyoshi: ['この{渡|わた}し{船|ぶね}も、{来年|らいねん}でなくなるかもしれん。{島|しま}の{足|あし}なのにな。', ['This ferry may be gone next year. And it’s the island’s only way out.', 'Diese Fähre gibt es nächstes Jahr vielleicht nicht mehr. Dabei ist sie die einzige Verbindung der Insel.']],
  ex_tetsuo: ['{最後|さいご}の{木|き}の{舟|ふね}を{作|つく}ってる。{会|あ}ったこともない{孫|まご}のためにな。', ['I’m building my last wooden boat. For a grandson I have never met.', 'Ich baue mein letztes Holzboot. Für einen Enkel, den ich nie getroffen habe.']],
  ex_kouji: ['……（{声|こえ}が{出|で}ないらしい。{小|ちい}さなメモに「{競|せ}り{人|にん}です」と{書|か}いて{見|み}せてくれた）', ['…(He seems unable to speak. He shows you a small note: “I’m the auctioneer.”)', '… (Er scheint nicht sprechen zu können. Er zeigt dir einen kleinen Zettel: „Ich bin der Auktionator.“)']],
  ex_natsumi: ['{分校|ぶんこう}の{先生|せんせい}です。{生徒|せいと}は{二人|ふたり}。……{一人|ひとり}、{春|はる}に{引|ひ}っ{越|こ}すの。', ['I teach at the branch school. Two pupils. …One of them moves away in spring.', 'Ich unterrichte an der Zweigschule. Zwei Schüler. … Einer zieht im Frühling weg.']],
  ex_tomi: ['{海女|あま}になって{六十年|ろくじゅうねん}。……{今日|きょう}が、{最後|さいご}の{潜|もぐ}りじゃ。', ['Sixty years as an ama diver. …Today is my last dive.', 'Sechzig Jahre Ama-Taucherin. … Heute ist mein letzter Tauchgang.']],
  ex_takumi: ['{東京|とうきょう}で{働|はたら}きすぎて、{倒|たお}れて……{気|き}がついたら、この{島|しま}で{釣|つ}りをしてました。', ['I overworked in Tokyo and collapsed… and the next thing I knew, I was fishing on this island.', 'Ich habe mich in Tokio überarbeitet und bin zusammengebrochen … und plötzlich angelte ich auf dieser Insel.']],
  ex_morikawa: ['{診療所|しんりょうじょ}の{船|ふね}で、{島|しま}を{回|まわ}ってるんだ。……{自分|じぶん}の{家族|かぞく}には、なかなか{会|あ}えないけどね。', ['I go round the islands on the clinic boat. …Though I hardly ever see my own family.', 'Ich fahre mit dem Praxisboot die Inseln ab. … Meine eigene Familie sehe ich dabei kaum.']],
  ex_yumi: ['{民宿|みんしゅく}「うみ」へようこそ。……{息子|むすこ}がね、{島|しま}を{出|で}たいって。{父親|ちちおや}と{同|おな}じね。', ['Welcome to Minshuku Umi. …My son says he wants to leave the island. Just like his father.', 'Willkommen in der Pension Umi. … Mein Sohn will die Insel verlassen. Genau wie sein Vater.']],
  ex_sofia: ['こんにちは！{祖父|そふ}の{古|ふる}い{写真|しゃしん}と{同|おな}じ{場所|ばしょ}を、{探|さが}しているんです。', ['Hello! I’m looking for the place in my grandfather’s old photo.', 'Hallo! Ich suche den Ort auf dem alten Foto meines Großvaters.']],
  ex_saori: ['{漁協|ぎょきょう}の{事務|じむ}です。……{漁師|りょうし}さんたちに、つらい{話|はなし}をしなきゃいけなくて。', ['I work in the co-op office. …I have to tell the fishermen something hard.', 'Ich arbeite im Büro der Genossenschaft. … Ich muss den Fischern etwas Schweres sagen.']],
  // Kyoto
  ex_lucas: ['オラ！ブラジルから{来|き}たルーカスです。{日本語|にほんご}は{話|はな}せる。……でも、{本当|ほんとう}に{分|わ}かり{合|あ}えてるのかな。', ['Olá! I’m Lucas from Brazil. I can speak Japanese. …But do we really understand each other?', 'Olá! Ich bin Lucas aus Brasilien. Japanisch spreche ich. … Aber verstehen wir uns wirklich?']],
  ex_miyamoto: ['{来週|らいしゅう}が{最後|さいご}の{講義|こうぎ}でね。……{聞|き}きに{来|く}る{学生|がくせい}は、{何人|なんにん}いるかな。', ['Next week is my last lecture. …I wonder how many students will come.', 'Nächste Woche halte ich meine letzte Vorlesung. … Wie viele Studierende wohl kommen?']],
  ex_daisuke: ['{人力車|じんりきしゃ}、いかがですか！……{昔|むかし}はね、{陸上|りくじょう}の{選手|せんしゅ}を{目指|めざ}してたんすよ。', ['How about a rickshaw ride! …I used to train to be a track athlete, you know.', 'Wie wär’s mit einer Rikscha-Fahrt! … Früher wollte ich mal Leichtathlet werden.']],
  ex_matsui: ['この{紅葉|もみじ}は、三百年ここに{立|た}っておる。……だが、もう{長|なが}くはない。', ['This maple has stood here for three hundred years. …But it won’t last much longer.', 'Dieser Ahorn steht hier seit dreihundert Jahren. … Aber lange hält er nicht mehr.']],
  ex_shizu: ['{竹|たけ}を{編|あ}んで、もう{六十年|ろくじゅうねん}。……{教|おし}える{相手|あいて}も、おらんけどねえ。', ['Sixty years of weaving bamboo. …Though there’s no one to teach.', 'Seit sechzig Jahren flechte ich Bambus. … Auch wenn ich niemanden zum Unterrichten habe.']],
  ex_ichirou: ['いらっしゃい。{古|ふる}い{本|ほん}にはね、{前|まえ}の{持|も}ち{主|ぬし}の{時間|じかん}が{残|のこ}っておるんだよ。', ['Welcome. Old books keep a little of their former owners’ time.', 'Willkommen. In alten Büchern bleibt etwas von der Zeit ihrer früheren Besitzer.']],
  ex_koharu: ['{舞妓|まいこ}さんになるための{修業|しゅぎょう}中です。……お{母|かあ}さんの{声|こえ}、{聞|き}きたいなあ。', ['I’m in training to become a maiko. …I miss hearing my mother’s voice.', 'Ich bin in der Ausbildung zur Maiko. … Ich würde so gern die Stimme meiner Mutter hören.']],
  ex_haruka: ['{図書館|としょかん}の{司書|ししょ}です。{返|かえ}ってきた{本|ほん}の{中|なか}に、ときどき{手紙|てがみ}が{入|はい}っているんですよ。', ['I’m the librarian. Sometimes there’s a letter inside a returned book.', 'Ich bin die Bibliothekarin. Manchmal steckt in einem zurückgegebenen Buch ein Brief.']],
  ex_kikue: ['この{寮|りょう}で{五十年|ごじゅうねん}、{学生|がくせい}のご{飯|はん}を{作|つく}ってきたのよ。……{来年|らいねん}、{取|と}り{壊|こわ}されるの。', ['For fifty years I’ve cooked for the students in this dorm. …Next year it will be torn down.', 'Seit fünfzig Jahren koche ich in diesem Wohnheim für die Studierenden. … Nächstes Jahr wird es abgerissen.']],
  ex_yui: ['……（{何|なに}も{言|い}わずに、{筆|ふで}で{半紙|はんし}に「こんにちは」と{書|か}いて{見|み}せてくれた）', ['…(Without a word, she writes “hello” on a sheet of paper with her brush and shows you.)', '… (Ohne ein Wort schreibt sie mit dem Pinsel „Hallo“ auf ein Blatt Papier und zeigt es dir.)']],
};

export const EXPANSION_SCRIPTS: Record<string, DialogueRule[]> = {};
for (const [name, s] of Object.entries(EXPANSION_SIGNS)) {
  const [x, y, facing] = EXPANSION_GEN[name].entry;
  void facing;
  EXPANSION_SCRIPTS[`exp_go_${name}`] = [
    { steps: [n(s.text, s.t), { choice: [{ text: '{行|い}く', en: de(GO), then: [{ do: [{ warp: { map: `ex_${name}`, x, y } }] }] }, { text: 'やめる', en: de(STAY) }] }] },
  ];
}
for (const [id, [ja, t]] of Object.entries(BUILDINGS)) EXPANSION_SCRIPTS[id] = [{ steps: [n(ja, t)] }];
const WORK: T = ['Work (pays per correct answer)', 'Arbeiten (Lohn pro richtiger Antwort)'];
for (const [id, [ja, t]] of Object.entries(GREETINGS)) {
  const steps: Step[] = [say(id, ja, t)];
  const job = EX_JOB_NPC[id];
  if (job) steps.push({ choice: [{ text: 'バイトする', en: `${de(WORK)}: ${EX_JOBS[job].titleEn}`, then: [{ do: [{ open: `job:${job}` }] }] }, { text: 'やめる', en: de(STAY) }] });
  EXPANSION_SCRIPTS[id] = [{ steps }];
}
