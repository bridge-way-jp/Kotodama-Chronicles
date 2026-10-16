import type { DialogueRule, Mood, Step } from '../core/script';
import { GRAMMAR_BY_ID } from './grammar';

/** Chapter 7 (Tokyo) interaction scripts; merged into SCRIPTS (see scripts.ts). */

const say = (who: string | undefined, text: string, en?: string, mood?: Mood): Step => (mood ? { say: text, who, en, mood } : { say: text, who, en });
const n = (text: string, en?: string): Step => say(undefined, text, en);

const grammarQuiz = (id: string, idx = 0): Step => {
  const g = GRAMMAR_BY_ID[id];
  const ex = g.exercises[idx];
  return {
    quiz: { q: ex.sentence, qEn: ex.en, options: ex.options.map((o) => o.text), answer: ex.answer, why: ex.why },
    keys: ['g:' + id],
    area: 'grammar',
    retry: true,
  };
};

/** a short note describing a place; the first match wins, so objects with quest steps list those first */
const place = (jp: string, en: string, note?: string): DialogueRule[] => [{ steps: [n(jp, en), ...(note ? [{ do: [{ note }] } as Step] : [])] }];

export const TOKYO_SCRIPTS: Record<string, DialogueRule[]> = {
  // ---------------------------------------------------------------- places (outdoors)
  tk_station: [{ steps: [n('東京駅。赤れんがの大きな駅舎に、新幹線のホームから人が流れてくる。', 'Tokyo Station. People stream out of the Shinkansen platforms into the big red-brick building. The ticket gates are just inside.')] }],
  tk_tower: place('ガラスの高いビルだ。窓の中で、たくさんの人が画面を見つめている。', 'A tall glass tower. Behind the windows many people stare at screens.'),
  tk_kiosk: place('小さな売店だ。コーヒーとおにぎりを買う人が、急ぎ足で通りすぎる。', 'A small kiosk. People hurry past to buy coffee and rice balls.'),
  as_gate: [
    {
      when: { all: [{ questActive: 'mq27' }, { notObj: 'mq27.yoshie' }] },
      steps: [n('{雷門|かみなりもん}だ。大きな赤い{提灯|ちょうちん}の下を、観光客の人たちが写真を撮りながら通っていく。{喫茶店|きっさてん}は、左上の細い道の先らしい。', 'Kaminarimon, the Thunder Gate. Under the huge red lantern, tourists stream through taking photos. The coffee house seems to be down a narrow lane to the upper left.')],
    },
    { steps: [n('{雷門|かみなりもん}だ。大きな赤い{提灯|ちょうちん}の下を、観光客の人たちが写真を撮りながら通っていく。', 'Kaminarimon, the Thunder Gate. Under the huge red lantern, tourists stream through taking photos.')] },
  ],
  as_stall: place('仲見世通りの店だ。人形焼やせんべいのいい匂いがする。壁に、町内会の祭りの練習のお知らせがはってある。', 'A stall on Nakamise street. It smells of baked sweets and rice crackers. A notice on the wall announces festival rehearsals by the neighbourhood association.', 'chonaikai'),
  as_shop: place('昔からあるお土産屋さんだ。店のおばさんが、外国のお客さんに、ゆっくり日本語で説明している。', 'A long-established souvenir shop. The woman behind the counter explains slowly in Japanese to foreign customers.'),
  sb_tower: place('ガラスの高いビルだ。屋上の大きな画面が、色とりどりの広告を流している。', 'A tall glass tower. A huge screen on the roof shows a stream of colourful adverts.'),
  sb_shop: place('若い人たちでにぎわう店だ。大きな看板が、夕日の中で光っている。', 'A shop busy with young people. A big signboard glows in the evening sun.'),
  sj_tower: place('高層ビルだ。上の階の窓は、夜になっても明るいままだ。', 'A skyscraper. The windows on the upper floors stay lit even at night.'),
  sj_alley: place('横丁の小さな店だ。提灯の下で、会社帰りの人たちが肩をならべている。', 'A tiny shop in the alley. Under lanterns, people on their way home from work sit shoulder to shoulder.'),
  sm_share: place('四角い窓がならぶ、シェアハウスだ。窓の中で、何人かが台所をかこんでいる。', 'A share house with rows of square windows. Inside, several people are gathered around the kitchen.', 'sharehouse'),
  sm_hut: place('川の見張り小屋だ。壁に、花火大会のポスターがはってある。', 'A little river hut. A fireworks-festival poster is stuck on the wall.'),
  sm_dock: place('船着き場だ。水の上を、屋形船の灯りがゆっくり流れていく。', 'The landing stage. The lights of a pleasure boat drift slowly across the water.'),
  t_door: [{ steps: [n('入口だ。', 'The entrance.')] }],

  // ---------------------------------------------------------------- people
  attendant: [
    {
      when: { all: [{ questActive: 'mq26' }, { obj: 'mq26.arrive' }, { notObj: 'mq26.attendant' }] },
      steps: [
        say('attendant', 'いらっしゃいませ。……あ、きょろきょろしていますね。東京駅は、初めての方には迷路ですから。', 'Welcome. …Ah, you’re looking around. Tokyo Station is a maze for first-timers.'),
        n('さっきのホームも電車も、{満員|まんいん|v:tk_manin}だった。{通勤|つうきん|v:tk_tsuukin}の人たちは、だれも{顔|かお}を上げない。', 'The platform just now was like a packed train. The commuters — nobody lifted their face.'),
        { do: [{ note: 'rushhour' }] },
        say('attendant', 'この{駅|えき}には、一日に、何十万人もの人が来ます。でも、{落|お}とし{物|もの}や{忘|わす}れ{物|もの|v:tk_wasuremono}は、{毎日|まいにち}、{山|やま}のようにあるんです。', 'Hundreds of thousands of people come through this station every day. But lost and forgotten things pile up like a mountain every day.'),
        say('attendant', '{実|じつ}は、{忘|わす}れ{物|もの}センターに、ずっと{引|ひ}き{取|と}り{手|て}のない手紙が{一通|いっつう}あるんです。「あとから来る人へ」と書いてあって。……もしかして、あなたのことでしょうか。', 'Actually, in the lost-property office there is one letter that nobody has ever claimed. It says “To the one who comes after.” …Could it be for you?'),
        {
          quiz: { q: '電車の中に傘を忘れた。駅員さんに、まず何と言うのが一番よいか。', qEn: 'You left an umbrella on the train. What is the best thing to say first to the station attendant?',
            options: ['すみません、電車に傘を忘れてしまったのですが', 'おい、傘、見つけてよ', '傘は、どこですか。早く出してください', '傘？ ああ、もういいです'], answer: 0,
            why: 'すみません plus 忘れてしまったのですが is polite and soft: it states the problem and asks for help without ordering the attendant around.' },
          keys: ['v:tk_wasuremono'], area: 'reading', retry: true,
        },
        n('{便箋|びんせん}は、{古|ふる}いけれど、{字|じ}はていねいだった。「{言葉|ことば}は、{東京|とうきょう}で{一番|いちばん}{速|はや}く{走|はし}る。だから、{走|はし}らない{場所|ばしょ}を{探|さが}して。{浅草|あさくさ}の、{古|ふる}い{喫茶店|きっさてん}。　K」', 'The paper is old, but the handwriting is neat. “Words run fastest in Tokyo. So look for a place where nothing runs. An old coffee house in Asakusa. — K”'),
        say('attendant', 'ICカードも、どうぞ。{東京|とうきょう}では、これがないと{何|なに}も始まりませんから。', 'Take this IC card, too. In Tokyo nothing starts without it.', 'happy'),
        { do: [{ note: 'cashless' }, { objective: 'mq26.attendant' }, { rel: 'attendant', points: 1 }, { learn: ['v:tk_manin', 'v:tk_tsuukin', 'v:tk_wasuremono'] }] },
      ],
    },
    { when: { flag: 'chapter7_done' }, steps: [say('attendant', 'お帰りなさい。……最近、あの手紙のように、{返事|へんじ}を{待|ま}っている{忘|わす}れ{物|もの}が、少し{減|へ}った気がします。', 'Welcome back. …Lately, I feel the number of “forgotten things” still waiting for a reply has gone down a little.', 'happy')] },
    { steps: [say('attendant', '東京駅へようこそ。お{出口|でぐち}は、{丸|まる}の{内|うち}{側|がわ}と、{八重洲|やえす}{側|がわ}。……って、{言|い}われても、{迷|まよ}いますよね。', 'Welcome to Tokyo Station. The exits are the Marunouchi side and the Yaesu side. …Even so, you’ll probably get lost.'), { choice: [{ text: '案内係を手伝う', en: 'Help at the information desk (listening, pays ¥200 per correct answer)', then: [{ do: [{ open: 'job:station' }] }] }, { text: 'やめる', en: 'Not now' }] }] },
  ],
  yoshie: [
    {
      when: { all: [{ questActive: 'mq27' }, { notObj: 'mq27.yoshie' }] },
      steps: [
        say('yoshie', 'いらっしゃいませ。……あら、めずらしい。若い方が、うちみたいな古い{喫茶店|きっさてん}に。', 'Welcome. …My, how unusual. A young person in an old coffee house like mine.', 'happy'),
        n('{昭和|しょうわ}の{匂|にお}いがする{店|みせ}だ。{赤|あか}いソファ、サイフォンのコーヒー、{奥|おく}の{時計|とけい}の{音|おと}。', 'It is a shop that smells of the Showa era. Red sofas, siphon coffee, the sound of the clock at the back.'),
        { do: [{ note: 'kissaten' }] },
        say('yoshie', '手紙を{持|も}っているのね。……その{字|じ}、見覚えがあるわ。{私|わたし}は、{芳江|よしえ}。{四十年|よんじゅうねん}、この{店|みせ}をやっています。', 'You have a letter. …I know that handwriting. I am Yoshie. I have run this shop for forty years.'),
        say('yoshie', 'その{人|ひと}は、「Kさん」としか{名乗|なの}らなかったわ。あの{角|かど}の{席|せき}で、{赤|あか}い{手帳|てちょう}に{何|なに}か{書|か}いては、{消|け}して、また{書|か}いて。……{言葉|ことば}を{集|あつ}めているというより、{返|かえ}す{相手|あいて}を{探|さが}している{人|ひと}だった。', 'That person only ever gave the name “K”. In that corner seat they wrote something in a red notebook, erased it, wrote again. …Less someone collecting words than someone looking for whom to return them to.'),
        say('yoshie', '{私|わたし}も、{店|みせ}を{開|あ}けてから{閉|し}めるまで、{客|きゃく}の{話|はなし}を、つい{聞|き}き{流|なが}し{がち||g:gachi}で。……その{人|ひと}に、{言|い}われたのよ。「{聞|き}こえていることと、{聞|き}いていることは、{違|ちが}います」って。', 'Even I, from opening to closing, tend to let customers’ talk wash over me. …That person said to me: “Hearing and listening are not the same.”'),
        {
          quiz: { q: '朝から晩まで忙しくて、お客さんの話を＿＿聞き流してしまった。', qEn: 'I am so busy from morning to night that I ended up letting the customers’ stories go past me ___.',
            options: ['つい', 'ぜひ', 'まさか', 'ちっとも'], answer: 0,
            why: 'つい = “before I knew it / without meaning to”: it fits an action done unintentionally. ぜひ asks for something; まさか and ちっとも do not fit.' },
          keys: ['v:tk_kikinagasu'], area: 'vocab', retry: true,
        },
        grammarQuiz('sobakara', 0),
        say('yoshie', 'その{人|ひと}は、{隣|となり}の{銭湯|せんとう}に、{手紙|てがみ}を{預|あず}けていきました。{番台|ばんだい}の{横|よこ}の{引|ひ}き{出|だ}しよ。……これ、{交通安全|こうつうあんぜん}のお{守|まも}り。{東京|とうきょう}は、{人|ひと}が{多|おお}いから。', 'That person left a letter at the sento next door, in the drawer beside the counter. …Here, a traffic-safety charm. Tokyo has so many people.', 'happy'),
        { do: [{ objective: 'mq27.yoshie' }, { give: 'omamori_traffic' }, { rel: 'yoshie', points: 2 }, { learn: ['v:tk_kikinagasu', 'g:sobakara', 'g:tehajimete'] }] },
      ],
    },
    { when: { flag: 'chapter7_done' }, steps: [say('yoshie', 'いらっしゃい。……{今日|きょう}は、{角|かど}の{席|せき}に、{誰|だれ}も{座|すわ}らせないでおいたの。もうすぐ、{来|く}る{気|き}がして。', 'Welcome. …Today I left the corner seat empty. I have a feeling someone will come soon.', 'happy')] },
    { steps: [say('yoshie', 'ご{注文|ちゅうもん}は、お{決|き}まりですか。……ゆっくりどうぞ。{急|いそ}ぐ{人|ひと}は、ここには{来|き}ませんから。', 'Have you decided on your order? …Take your time. People in a hurry do not come here.')] },
  ],
  haru: [
    {
      when: { all: [{ questActive: 'mq28' }, { notObj: 'mq28.haru' }] },
      steps: [
        say('haru', 'わっ、びっくりした！ ……あ、ごめんなさい。クレーンゲーム、さっきから三千円も使ったのに、ぜんぜん取れなくて。', 'Whoa, you startled me! …Oh, sorry. I’ve spent three thousand yen on this crane game and still caught nothing.', 'surprised'),
        say('haru', 'ハルです。北海道から来て、三年。家で{一人|ひとり}で{仕事|しごと}をしているから、{一日|いちにち}{誰|だれ}とも{話|はな}さない{日|ひ}が、{多|おお}いんです。', 'I’m Haru. I came from Hokkaido three years ago. I work alone at home, so there are many days when I speak to nobody at all.'),
        say('haru', 'ここは、{音|おと}が{大|おお}きいから、{誰|だれ}も{話|はな}しかけてこない。……{人|ひと}は{多|おお}いのに、{一人|ひとり}。{不思議|ふしぎ}ですよね。', 'It’s loud here, so nobody talks to me. …Lots of people, and yet I’m alone. Strange, isn’t it.'),
        { do: [{ note: 'kodoku' }] },
        grammarQuiz('gachi', 1),
        say('haru', 'こんなこと、{人|ひと}に{話|はな}したの、{初|はじ}めてかも。……{聞|き}いてくれて、ありがとう。これ、{前|まえ}に{友|とも}だちと{撮|と}ったプリクラ。もらってください。', 'I may never have told anyone this before. …Thank you for listening. This is a purikura I took with a friend. Please take it.', 'happy'),
        { do: [{ objective: 'mq28.haru' }, { give: 'purikura' }, { rel: 'haru', points: 2 }, { learn: ['v:tk_kodoku', 'g:gachi'] }] },
      ],
    },
    { when: { flag: 'chapter7_done' }, steps: [say('haru', '{最近|さいきん}、{深夜|しんや}ラジオを{聞|き}くようになったんです。……{誰|だれ}かが{話|はな}している{声|こえ}があるだけで、{全然|ぜんぜん}{違|ちが}って。', 'Lately I’ve started listening to late-night radio. …With just someone’s voice talking, it feels completely different.', 'happy'), { choice: [{ text: '言葉キャッチャーをやる', en: 'Play the word crane game (vocabulary, pays ¥180 per correct answer)', then: [{ do: [{ open: 'job:crane' }] }] }, { text: 'カラオケをやる', en: 'Sing karaoke (fill in the grammar; pays once per song per day)', then: [{ do: [{ open: 'karaoke' }] }] }, { text: 'やめる', en: 'Not now' }] }] },
    { steps: [say('haru', 'このゲーム、ぜったい{取|と}ります。……たぶん。', 'I will catch this prize. …Probably.'), { choice: [{ text: '言葉キャッチャーをやる', en: 'Play the word crane game (vocabulary, pays ¥180 per correct answer)', then: [{ do: [{ open: 'job:crane' }] }] }, { text: 'カラオケをやる', en: 'Sing karaoke (fill in the grammar; pays once per song per day)', then: [{ do: [{ open: 'karaoke' }] }] }, { text: 'やめる', en: 'Not now' }] }] },
  ],
  priya: [
    {
      when: { all: [{ questActive: 'mq28' }, { notObj: 'mq28.priya' }] },
      steps: [
        say('priya', 'Excuse me, are you lost? Can I help you find the —', 'Excuse me, are you lost? Can I help you find the —', 'neutral'),
        say('priya', '……あ、日本語で{大丈夫|だいじょうぶ}なんですね。ごめんなさい。{最近|さいきん}、{日本語|にほんご}で{話|はな}しかけても、すぐ{英語|えいご}で{返|かえ}されることが{多|おお}くて。', '…Oh, Japanese is fine for you. Sorry. Lately when I address people in Japanese, they often answer right away in English.'),
        say('priya', 'プリヤです。インドから来た、ITエンジニアです。{会社|かいしゃ}の{日本語|にほんご}は{完璧|かんぺき}なのに、{道|みち}で{聞|き}かれると、「{外国人|がいこくじん}」の{顔|かお}で{見|み}られちゃう。', 'I’m Priya, an IT engineer from India. My business Japanese is flawless, yet when I’m asked something on the street I’m seen only as “a foreigner”.'),
        {
          quiz: { q: 'ある人が、日本語が上手な外国人に、いきなり英語で話しかけた。その人は、日本語で返事をしたいと思っている。ていねいで感じのいい返事はどれか。', qEn: 'Someone suddenly speaks English to a foreigner who speaks good Japanese. The foreigner wants to reply in Japanese. Which reply is polite and friendly?',
            options: ['日本語で大丈夫ですよ。お手伝いしましょうか', '英語は分かりません。話しかけないでください', 'わたしは外国人ではありません', '……（何も言わずに行く）'], answer: 0,
            why: '日本語で大丈夫ですよ gently tells the other person that Japanese is fine, and offering help keeps the mood warm.' },
          keys: ['v:tk_share'], area: 'reading', retry: true,
        },
        say('priya', 'ふふ、{完璧|かんぺき}な{返事|へんじ}。……{私|わたし}は、{今|いま}、シェアハウスに{住|す}んでいます。{家|いえ}を{借|か}りる{契約|けいやく|v:tk_keiyaku}は、{保証人|ほしょうにん}が{必要|ひつよう}で、{大変|たいへん}でした。', 'Ha, a perfect reply. …I live in a share house now. Renting a flat needed a guarantor and a contract — it was hard.'),
        { do: [{ note: 'sharehouse' }] },
        say('priya', 'うちのシェアハウスは、隅田川の{近|ちか}くです。……よかったら、{今度|こんど}、{遊|あそ}びに{来|き}てください。これ、{鍵|かぎ}の{予備|よび}。{冗談|じょうだん}ですよ、{半分|はんぶん}は。', 'Our share house is near the Sumida River. …If you like, come visit some time. Here’s a spare key. Only half joking.', 'happy'),
        { do: [{ objective: 'mq28.priya' }, { give: 'house_key' }, { rel: 'priya', points: 2 }, { learn: ['v:tk_share', 'v:tk_keiyaku'] }] },
      ],
    },
    { when: { flag: 'chapter7_done' }, steps: [say('priya', '{最近|さいきん}、{道|みち}で、「日本語でどうぞ」と{言|い}われることが{増|ふ}えました。……ちょっとだけ、{変|か}わってきたのかも。', 'Lately people on the street have begun to say “Please, in Japanese is fine.” …Maybe things are changing, just a little.', 'happy')] },
    { steps: [say('priya', '今日も、いい{天気|てんき}ですね。……{傘|かさ}は、{持|も}っていますか。{東京|とうきょう}は、すぐ{降|ふ}りますから。', 'Nice weather again today. …Do you have an umbrella? It rains quickly in Tokyo.')] },
  ],
  yamamoto: [
    {
      when: { all: [{ questActive: 'mq28' }, { notObj: 'mq28.yamamoto' }] },
      steps: [
        say('yamamoto', 'いらっしゃいませ。{番号札|ばんごうふだ}を{取|と}ってお{待|ま}ちください。……あ、もう{取|と}ってありますね。', 'Welcome. Please take a number and wait. …Ah, you already have one.'),
        { do: [{ give: 'number_ticket' }] },
        say('yamamoto', '{山本|やまもと}です。{窓口|まどぐち|v:tk_madoguchi}は、五時で{閉|し}まります。{今日|きょう}は、どのような{手続|てつづ}きでしょうか。', 'I’m Yamamoto. The counters close at five. What kind of procedure is it today?'),
        n('{引|ひ}っ{越|こ}しをしたら、{区役所|くやくしょ}で{届|とど}け{出|で}をする。{住民票|じゅうみんひょう|v:tk_juuminhyou}は、その{町|まち}に{住|す}んでいる{証明|しょうめい}だ。', 'When you move, you notify the ward office. The certificate of residence proves that you live in that town.'),
        { do: [{ note: 'kuyakusho' }] },
        {
          quiz: { q: '住民票をもらうとき、窓口で、まずすることはどれか。', qEn: 'When you want a certificate of residence, what do you do first at the counter?',
            options: ['申請書に名前と住所を書いて、番号札の順番を待つ', '何も書かずに、大きな声で担当者を呼ぶ', '印鑑も身分証も持たずに、友だちに行ってもらう', '窓口が閉まるまで、入口で待つ'], answer: 0,
            why: 'You fill in the application form and wait for your number to be called. A proof of identity is needed; sending a friend without any papers does not work.' },
          keys: ['v:tk_tetsuzuki'], area: 'reading', retry: true,
        },
        grammarQuiz('nimotozuite', 0),
        say('yamamoto', 'はい、できました。これが、あなたの{住民票|じゅうみんひょう}です。……{手続|てつづ}きは、{面倒|めんどう}ですよね。でも、{一枚|いちまい}の{紙|かみ}が、「ここに{住|す}んでいい」という{証|あかし}になるんです。', 'There, it’s done. This is your certificate of residence. …Paperwork is a bother, isn’t it. But a single sheet of paper becomes the proof that you may live here.', 'happy'),
        { do: [{ objective: 'mq28.yamamoto' }, { give: 'juminhyo' }, { rel: 'yamamoto', points: 2 }, { learn: ['v:tk_tetsuzuki', 'v:tk_juuminhyou', 'v:tk_madoguchi', 'g:nimotozuite'] }] },
      ],
    },
    { when: { flag: 'chapter7_done' }, steps: [say('yamamoto', 'この{頃|ごろ}、{窓口|まどぐち}に、{英語|えいご}とベトナム語の{案内|あんない}も{置|お}きました。……{小|ちい}さな{変化|へんか}ですが、{大事|だいじ}だと{思|おも}って。', 'Recently we put English and Vietnamese guides at the counter. …A small change, but I think it matters.', 'happy')] },
    { steps: [say('yamamoto', '{番号札|ばんごうふだ}を{取|と}って、お{待|ま}ちください。……{長|なが}くお{待|ま}たせして、{申|もう}し{訳|わけ}ありません。', 'Please take a number and wait. …I’m sorry to keep you waiting so long.'), { choice: [{ text: '窓口を手伝う', en: 'Help at the counter (kanji, pays ¥220 per correct answer)', then: [{ do: [{ open: 'job:kuyakusho' }] }] }, { text: 'やめる', en: 'Not now' }] }] },
  ],
  kuroi: [
    {
      when: { all: [{ questActive: 'mq29' }, { obj: 'mq29.voice' }, { notObj: 'mq29.kuroi' }] },
      steps: [
        say('kuroi', 'おっと、ノックもなしに{入|はい}ってくるなんて。……あ、{今|いま}は{放送中|ほうそうちゅう}じゃないから、{大丈夫|だいじょうぶ}です。', 'Oh, coming in without knocking. …Well, we’re not on air right now, so it’s fine.'),
        say('kuroi', '{黒井|くろい}です。{毎晩|まいばん}、{深夜|しんや|v:tk_shinya}の{放送|ほうそう|v:tk_housou}で、{何千人|なんぜんにん}もの{人|ひと}に{話|はな}しかけています。……でも、{最近|さいきん}、{自分|じぶん}の{声|こえ}が、{聞|き}こえなくなって。', 'I’m Kuroi. Every night I speak on the late-night broadcast to thousands of people. …But lately I can’t hear my own voice.'),
        { do: [{ note: 'nightradio' }] },
        say('kuroi', '{聞|き}き{流|なが}す{側|がわ}も、{話|はな}す{側|がわ}も、{同|おな}じですね。{忙|いそが}しい{町|まち}では、{誰|だれ}もが、{誰|だれ}かを{聞|き}き{流|なが}している。……{試|ため}してもいいですか。{私|わたし}の{試練|しれん}です。', 'Listeners and speakers alike. In a busy town everyone lets someone else’s words wash over them. …May I test you? It’s my trial.'),
        {
          quiz: { q: 'このラジオ番組は、毎晩十一時から二時間にわたって放送される。この文で、「にわたって」が表す意味はどれか。', qEn: 'This radio programme is broadcast every night for two hours from eleven. What does 「にわたって」 express here?',
            options: ['ある長さの範囲に、ずっと続くこと', '二つの番組を比べること', 'すぐに終わってしまうこと', '誰かの代わりにすること'], answer: 0,
            why: 'にわたって = “across / throughout” a span of time, space or number: here the broadcast continues over a stretch of two hours.' },
          keys: ['g:niwatatte', 'v:tk_housou'], area: 'grammar', retry: true,
        },
        grammarQuiz('womeguratte', 0),
        say('kuroi', '……{合格|ごうかく}です。{最後|さいご}に、{私|わたし}の{言霊|ことだま}と{向|む}き合ってください。{聞|き}いてもらえなかった{言葉|ことば}から、{生|う}まれたものです。', '…You pass. Lastly, face my Kotodama. It was born from words that were never heard.'),
        {
          battle: { species: 'koegitsune', level: 38, recruitable: true, bg: 'bg_tokyo_sumida.webp' },
          win: [
            n('{戦|たたか}いのあと、{黒井|くろい}さんは、{長|なが}いあいだ、{黙|だま}って、マイクを{見|み}つめていた。', 'After the battle, Kuroi stared at the microphone in silence for a long time.'),
            say('kuroi', '……{今|いま}の{戦|たたか}いで、{初|はじ}めて、{自分|じぶん}の{声|こえ}を{聞|き}いた{気|き}がします。{話|はな}すだけじゃなくて、{聞|き}く。……{忘|わす}れていました。', '…In that battle I felt for the first time that I heard my own voice. Not only speaking, but listening. …I had forgotten.', 'happy'),
            say('kuroi', 'この{番組|ばんぐみ}には、{毎週|まいしゅう}{水曜|すいよう}、{手紙|てがみ}を{読|よ}んでくれるボランティアの{方|かた}がいます。{隅田川|すみだがわ}の{近|ちか}くに{住|す}んでいて、{夕方|ゆうがた}、{青|あお}い{時間|じかん}に、いつも{川|かわ}ぞいを{歩|ある}いている。……{会|あ}ってみてください。', 'Every Wednesday a volunteer reads out listeners’ letters on this show. She lives near the Sumida River and always walks along the bank at blue hour in the evening. …Please go and meet her.'),
            { do: [{ objective: 'mq29.kuroi' }, { give: 'microphone' }, { give: 'headphones' }, { rel: 'kuroi', points: 3 }, { learn: ['v:tk_shinya', 'v:tk_housou', 'g:niwatatte', 'g:womeguratte'] }] },
          ],
          lose: [say('kuroi', '{焦|あせ}らずに。{声|こえ}は、{届|とど}くまで{時間|じかん}がかかるものです。', 'Don’t rush. A voice takes time to arrive.')],
        },
      ],
    },
    {
      when: { all: [{ questActive: 'mq29' }, { notObj: 'mq29.voice' }] },
      steps: [say('kuroi', '{私|わたし}の{言霊|ことだま}と{向|む}き合う{前|まえ}に、{町|まち}の{声|こえ}を、{聞|き}いてきてください。{新宿|しんじゅく}の{横丁|よこちょう}に、{誰|だれ}にも{聞|き}いてもらえない{声|こえ}が、ひとつあるはずです。', 'Before facing my Kotodama, go and listen to the voices of the city. In the Shinjuku alley there should be a voice nobody has listened to.')],
    },
    { when: { flag: 'chapter7_done' }, steps: [say('kuroi', 'こんばんは。……{今夜|こんや}の{放送|ほうそう}は、{初|はじ}めて、{読|よ}む{手紙|てがみ}より、{聞|き}く{時間|じかん}の{方|ほう}が{長|なが}かったんです。', 'Good evening. …Tonight, for the first time, I spent more time listening than reading letters.', 'happy')] },
    { steps: [say('kuroi', 'こんばんは。{夜|よる}は、{長|なが}いですね。……{眠|ねむ}れない{人|ひと}たちのために、{今夜|こんや}も{話|はな}します。', 'Good evening. The night is long, isn’t it. …I’ll talk tonight, too, for the people who cannot sleep.')] },
  ],

  kotone: [
    { when: { flag: 'epilogue_stay' }, steps: [say('kotone', '{春|はる}になったら、{日野森|ひのもり}の{勉強部屋|べんきょうべや}で{会|あ}いましょう。{楓|かえで}も、{待|ま}っているわ。', 'See you in the study room in Hinomori in spring. Kaede is waiting, too.', 'happy')] },
    { steps: [say('kotone', '{楓|かえで}と、{毎週|まいしゅう}{電話|でんわ}をしているの。{最初|さいしょ}の{一言|ひとこと}は、「ただいま」だったわ。', 'I phone Kaede every week now. My first words were “I’m home”.', 'happy')] },
  ],

  // ---------------------------------------------------------------- the unheard Kotodama (Shinjuku alley) and the river
  yokocho_counter: [
    {
      when: { all: [{ questActive: 'mq29' }, { notObj: 'mq29.voice' }] },
      steps: [
        n('カウンターの{端|はし}で、{小|ちい}さな{何|なに}かが、{肩|かた}を{落|お}としている。{改札|かいさつ}のふたを{背負|せお}った、{眠|ねむ}そうな{言霊|ことだま}だ。', 'At the end of the counter something small droops its shoulders: a sleepy Kotodama with a ticket-gate flap on its back.'),
        n('「ピッ……おつかれさま……おつかれさま……」{何|なん}{万回|まんかい}も{言|い}われた{挨拶|あいさつ}は、{誰|だれ}にも{届|とど}かないまま、{空|そら}に{消|き}えていくようだ。', '“Beep… good work… good work…” The greeting said ten thousand times seems to fade into the air without reaching anyone.'),
        {
          battle: { species: 'passuko', level: 36, recruitable: true, bg: 'bg_tokyo_yokocho.webp' },
          win: [
            n('パスッコは、ふにゃっと{笑|わら}った。{背中|せなか}の{改札|かいさつ}のふたが、やわらかい{音|おと}で{開|ひら}いた。', 'Passuko smiled limply. The ticket-gate flap on its back opened with a soft sound.'),
            n('「……ありがとう。{今|いま}、ちゃんと{聞|き}いてくれた。」', '“…Thank you. You really listened just now.”'),
            { do: [{ objective: 'mq29.voice' }, { seen: 'passuko' }] },
          ],
          lose: [n('パスッコは、ねむそうに{首|くび}をふった。もう{少|すこ}し、ゆっくり{聞|き}いてあげよう。', 'Passuko shook its sleepy head. Let’s try listening a little more slowly.')],
        },
      ],
    },
    { steps: [n('カウンターの{端|はし}に、{空|あ}いた{席|せき}がひとつ。{隣|となり}の{人|ひと}の{話|はなし}し{声|ごえ}が、ぼんやりと{聞|き}こえる。', 'One empty seat at the end of the counter. Your neighbours’ voices come through faintly.')] },
  ],
  sm_river: [
    {
      when: { all: [{ questActive: 'mq30' }, { notObj: 'mq30.river' }] },
      steps: [
        { do: [{ music: 'lighthouse' }] },
        { cg: 'cg_tokyo_river', say: '{青|あお}い{時間|じかん}の{隅田川|すみだがわ}。{高|たか}い{塔|とう}が{水|みず}の{上|うえ}に{光|ひか}り、{大|おお}きな{鉄|てつ}の{橋|はし}に{灯|あか}りがともっている。{川|かわ}ぞいの{道|みち}を、{緑|みどり}のコートの{女|おんな}の{人|ひと}が、ゆっくり{歩|ある}いてくる。', en: 'The Sumida in blue hour. A tall tower glows above the water, and the great steel bridge is lit. Along the riverside path a woman in a dark-green coat walks slowly towards you.' },
        n('{赤|あか}い{手帳|てちょう}が、{彼女|かのじょ}の{手|て}の{中|なか}にある。{古|ふる}い{革|かわ}の{表紙|ひょうし}が、{街灯|がいとう}の{光|ひかり}で、{赤|あか}くやわらかく{光|ひか}った。', 'A red notebook is in her hands. Its old leather cover glows soft red in the street lamps.'),
        say('kotone', '……とうとう、ここまで{来|き}たのね。マリアさん。', '…So you’ve finally come all this way, Maria.'),
        say('kotone', '{私|わたし}は、{琴音|ことね}。{楓|かえで}の{姉|あね}で、{昔|むかし}、{日野森|ひのもり}の{研究所|けんきゅうじょ}で「{言霊|ことだま}アーカイブ{計画|けいかく}」を{進|すす}めていた{人|ひと}。……あなたが「K」と{呼|よ}んでくれた{人|ひと}よ。', 'I am Kotone. Kaede’s older sister, and the one who led the Kotodama Archive Project at the Hinomori research facility long ago. …The person you called “K”.'),
        say('kotone', '{私|わたし}たちは、{人|ひと}の{言葉|ことば}と{記憶|きおく}を、{永遠|えいえん}に{残|のこ}そうとした。でも、{保存|ほぞん}された{言葉|ことば}は、もう、{誰|だれ}にも{話|はな}しかけてくれなかった。……あの{事故|じこ}のあと、{私|わたし}は、{逃|に}げたの。', 'We tried to keep people’s words and memories forever. But the preserved words never spoke to anyone again. …After the accident, I ran away.'),
        say('kotone', '{京都|きょうと}、{大阪|おおさか}、{東京|とうきょう}。{散|ち}らばった{言霊|ことだま}たちを{訪|たず}ねて、{手帳|てちょう}に{書|か}いて、ひとつずつ、{返|かえ}してきたつもり。……でも、{一番|いちばん}{返|かえ}したかったのは、あの{子|こ}だった。', 'Kyoto, Osaka, Tokyo. I visited the scattered Kotodama, wrote in my notebook, and tried to return them one by one. …But the one I most wanted to return was that child.'),
        n('マリアの{肩|かた}で、{白|しろ}い{狐|きつね}が、{青|あお}い{耳|みみ}の{先|さき}を、そっと{光|ひか}らせた。', 'On Maria’s shoulder the white fox let the pale-blue tips of its ears glow softly.'),
        say('kotone', 'その{子|こ}は、アーカイブで{最初|さいしょ}に{生|う}まれた{言霊|ことだま}。{名前|なまえ}は「{言ノ葉|ことのは|v:tk_kotonoha}」。{私|わたし}が、{保存|ほぞん}の{箱|はこ}に{閉|と}じこめて、{事故|じこ}で、{外|そと}へ{逃|に}げてしまった{子|こ}。……あなたと、{出会|であ}えたのね。', 'That child is the first Kotodama born in the Archive. Its name is “Kotonoha”. I shut it in a preservation box, and in the accident it escaped outside. …So it met you.'),
        say('kotone', 'あなたは、{覚|おぼ}えるだけでなく、{使|つか}って、{間違|まちが}えて、{笑|わら}って、{言葉|ことば}を{覚|おぼ}えてきた。……それが、アーカイブに{一番|いちばん}{足|た}りなかったもの。', 'You have not only memorised; you have used words, made mistakes and laughed over them. …That is exactly what the Archive lacked most.'),
        say('kotone', '{最後|さいご}に、お{願|ねが}いがあるの。{言ノ葉|ことのは}に、あなたの{言葉|ことば}で、{何|なに}か{一言|ひとこと}、{伝|つた}えてあげて。', 'One last request. Tell Kotonoha something in your own words.'),
        {
          quiz: { q: '言ノ葉に、あなた自身の言葉で、一番気持ちが伝わる一言はどれか。', qEn: 'Which line, in your own words, best conveys your feelings to Kotonoha?',
            options: ['今まで、そばにいてくれて、ありがとう。これからも、いっしょに言葉を使っていこうね', '私が勝ったのだから、あなたは私に従うべきだ', '保存しておけば、安全だから、もう出てこないで', '別に。どうでもいい'], answer: 0,
            why: 'Thanking the fox and promising to keep using words together is exactly the “living” use of language the story has been about. The other options command, store or dismiss.' },
          keys: ['v:tk_kotonoha'], area: 'reading', retry: true,
        },
        grammarQuiz('tekoso', 0),
        grammarQuiz('dakenokotohaaru', 0),
        { cg: 'cg_tokyo_radio', say: '{白|しろ}い{狐|きつね}の{体|からだ}が、{青|あお}い{光|ひかり}に{包|つつ}まれた。{光|ひかり}の{中|なか}で、{小|ちい}さな{言葉|ことば}の{粒|つぶ}が、{町|まち}じゅうへ{飛|と}んでいく。ラジオから、{黒井|くろい}さんの{声|こえ}。{今|いま}、{初|はじ}めて、{誰|だれ}かが{聞|き}いている。', en: 'The white fox is wrapped in blue light. Within it little grains of words fly out over the whole city. From a radio, Kuroi’s voice — and for the first time someone is truly listening.' },
        say('kotone', '……おかえりなさい、{言ノ葉|ことのは}。', '…Welcome back, Kotonoha.', 'happy'),
        { do: [{ recruit: 'kotonoha', level: 40 }, { objective: 'mq30.river' }, { give: 'umbrella' }, { rel: 'kotone', points: 3 }, { learn: ['v:tk_kotonoha', 'g:tekoso', 'g:dakenokotohaaru'] }, { flag: 'kotonoha_awake' }] },
        say('kotone', 'これから、{楓|かえで}に{電話|でんわ}する。……{何|なん}{年|ねん}ぶりだろう。{最初|さいしょ}の{一言|ひとこと}が、{見|み}つからなくて。', 'I’m going to call Kaede now. …How many years has it been? I can’t find the first words.'),
        {
          choice: [
            { text: '「ただいま」から、はじめてみては', en: '“Why not start with ‘I’m home’?”', then: [say('kotone', '……そうね。「ただいま」。……ありがとう、マリアさん。', '…Yes. “I’m home.” …Thank you, Maria.', 'happy')] },
            { text: '「ごめんなさい」から、はじめてみては', en: '“Why not start with ‘I’m sorry’?”', then: [say('kotone', '……そうね。まず、「ごめんなさい」。それから、「ありがとう」を。', '…Yes. First “I’m sorry”. Then “thank you”.', 'happy')] },
          ],
        },
        { do: [{ music: 'ending' }] },
        { cg: 'cg_ending', say: '{川|かわ}の{向|む}こうで、{高|たか}い{塔|とう}が、{静|しず}かに{光|ひか}っていた。{言葉|ことば}は、{保存|ほぞん}するためではなく、{届|とど}けるためにある。\n― 第七章「東京」完 ―', en: 'Across the river the tall tower glowed quietly. Words are not for keeping but for reaching someone.\n— Chapter 7 “Tokyo” complete —' },
        { do: [{ flag: 'game_complete' }] },
        n('ありがとう！ ここまで、マリアと{言霊|ことだま}たちの{旅|たび}に{付|つ}き{合|あ}ってくれて。ストーリーは、これでひとまず{完結|かんけつ}です。{町|まち}は、これからも{自由|じゆう}に{歩|ある}けます。', 'Thank you for travelling with Maria and the Kotodama this far! The main story is now complete. You can keep exploring every town freely.'),
        {
          choice: [
            { text: 'もう一年、日本で勉強を続ける', en: 'Stay in Japan another year and keep studying', then: [{ do: [{ flag: 'epilogue_stay' }] }, { cg: 'cg_epilog_stay', say: '{春|はる}、{日野森|ひのもり}の{研究所|けんきゅうじょ}には、{小|ちい}さな{勉強部屋|べんきょうべや}ができる。{言葉|ことば}を{使|つか}う{人|ひと}たちの、{新|あたら}しい{場所|ばしょ}だ。', en: 'In spring, a small study room opens at the Hinomori research facility — a new place for people who use words.' }] },
            { text: '一度、家に帰って、春にまた来る', en: 'Go home for a while and come back in spring', then: [{ do: [{ flag: 'epilogue_home' }] }, { cg: 'cg_epilog_home', say: '{空港|くうこう}で、{日本語|にほんご}の{手紙|てがみ}を{書|か}いた。「{春|はる}に、また。」ポケットの{中|なか}で、{言ノ葉|ことのは}が{小|ちい}さく{鳴|な}いた。', en: 'At the airport you wrote a letter in Japanese: “See you in spring.” In your pocket, Kotonoha gave a small cry.' }] },
          ],
        },
      ],
    },
    { steps: [n('{隅田川|すみだがわ}の{青|あお}い{時間|じかん}。{川|かわ}の{向|む}こうで、{高|たか}い{塔|とう}が、{静|しず}かに{光|ひか}っている。', 'The Sumida at blue hour. Across the river the tall tower glows quietly.')] },
  ],


  // ---------------------------------------------------------------- furniture of the Osaka and Tokyo rooms
  furn_seat: place('座り心地のよさそうな椅子だ。', 'A seat that looks comfortable.'),
  furn_table: place('使いこまれたテーブルだ。', 'A well-used table.'),
  furn_desk: place('机の上に、書類とペンが置いてある。', 'Papers and pens lie on the desk.'),
  furn_box: place('箱や入れ物が、きちんと積んである。', 'Boxes and containers stacked neatly.'),
  furn_shelf: place('棚に、いろいろな物がならんでいる。', 'Various things lined up on the shelf.'),
  furn_machine: place('機械だ。使い方は、見れば分かりそうだ。', 'A machine. It looks easy enough to work out.'),
  furn_lamp: place('あたたかい灯りがともっている。', 'A warm light glows.'),
  furn_rack: place('コートかけだ。', 'A coat rack.'),
  furn_sign: place('立て看板だ。字は、ちょっとかすれている。', 'A standing sign board. The writing is a little faded.'),
  furn_jukebox: place('古いジュークボックスだ。今は、静かに眠っている。', 'An old jukebox. It sleeps quietly right now.'),

  // ---------------------------------------------------------------- interiors
  kissaten_siphon: place('サイフォンが、こぽこぽと音を立てている。コーヒーのいい匂いが、店じゅうに広がっている。', 'The siphon bubbles. The good smell of coffee spreads through the whole shop.'),
  kissaten_cups: place('棚に、同じ形のコーヒーカップが、きれいにならんでいる。', 'Coffee cups of the same shape stand in neat rows on the shelves.'),
  kissaten_case: place('ショーケースに、プリンとクリームソーダの見本がある。プリンは、昔ながらの、かたいタイプだ。', 'In the display case there are samples of pudding and cream soda. The pudding is the old-style firm kind.'),
  kissaten_clock: place('古い柱時計だ。時間は少しずれているけれど、それも店の味だという。', 'An old pendulum clock. The time is a little off, but they say that is part of the shop’s charm.'),
  kissaten_booths: place('赤いソファの席が三つ。いちばん奥の角の席だけ、「予約席」の札が立っている。', 'Three red-sofa booths. Only the corner seat at the very back has a “reserved” card.'),
  kissaten_books: place('マンガと小説の棚だ。何十年も、お客さんが読んできた本が、ぼろぼろになっている。', 'A shelf of manga and novels, worn out by decades of customers reading them.'),
  kissaten_window: place('レースのカーテンごしに、浅草の通りが見える。', 'Through the lace curtain you can see the streets of Asakusa.'),
  kissaten_counter: place('カウンターには、サイフォンと、ミルと、古いレジが並んでいる。', 'On the counter stand the siphon, the grinder and an old cash register.'),
  sento_noren_blue: place('青いのれんに、湯気のマークが白く染めぬいてある。「男」の入口だ。', 'A blue noren with a white steam mark dyed into it. The men’s entrance.'),
  sento_noren_red: place('赤いのれんに、湯気のマークが白く染めぬいてある。「女」の入口だ。', 'A red noren with a white steam mark dyed into it. The women’s entrance.'),
  sento_fuji: [{ steps: [n('壁いっぱいの、富士山の絵だ。銭湯のお湯に入りながら見ると、まるで本物の山のように見える。', 'A huge painting of Mount Fuji fills the wall. Seen from the hot bath, it looks like the real mountain.'), { do: [{ note: 'sento' }] }] }],
  sento_counter: [
    {
      when: { all: [{ questActive: 'mq27' }, { obj: 'mq27.yoshie' }, { notObj: 'mq27.letter' }] },
      steps: [
        n('{番台|ばんだい}の{横|よこ}の{引|ひ}き{出|だ}しに、{古|ふる}い{封筒|ふうとう}が{一通|いっつう}、{入|はい}っていた。{宛名|あてな}は「{隅田川|すみだがわ}に{来|く}る{人|ひと}へ」。', 'In the drawer beside the counter lies an old envelope. It is addressed “To the one who comes to the Sumida.”'),
        n('「{人|ひと}の{多|おお}い{町|まち}では、{全部|ぜんぶ}を{聞|き}こうとしなくていい。{一人|ひとり}ずつ、{聞|き}いて。そして、{夜|よる}の{声|こえ}を{探|さが}して。　K」', '“In a city of many people you need not try to hear everything. Listen to one person at a time. And look for the voices of the night. — K”'),
        {
          quiz: { q: '「聞き流す」の意味に一番近いものはどれか。', qEn: 'Which is closest in meaning to 「聞き流す」?',
            options: ['聞いても、ほとんど注意を払わないこと', '一度聞いただけで、すべてを覚えること', '大きな声で、相手に聞かせること', '相手の話を、メモにくわしく書くこと'], answer: 0,
            why: '聞き流す = to hear without really paying attention, letting it flow past you — the opposite of listening carefully.' },
          keys: ['v:tk_kikinagasu'], area: 'vocab', retry: true,
        },
        { do: [{ objective: 'mq27.letter' }, { learn: ['v:tk_kikinagasu'] }] },
        n('{夜|よる}の{声|こえ}……{深夜|しんや}ラジオのことだろうか。{次|つぎ}は、{渋谷|しぶや}と{新宿|しんじゅく}で、{人|ひと}の{声|こえ}を{聞|き}いてみよう。', 'The voices of the night… could that mean late-night radio? Next, let’s listen to people in Shibuya and Shinjuku.'),
      ],
    },
    { steps: [n('番台に、そろばんと、白いタオルが二枚。おじいさんが、新聞を読みながら、のんびり座っている。', 'On the counter are an abacus and two white towels. An old man sits at ease, reading a newspaper.')] },
  ],
  sento_lockers: place('木の下駄箱だ。木の札がカギになっている。', 'Wooden shoe lockers. Wooden tags work as keys.'),
  sento_vending: place('牛乳の自動販売機だ。お風呂のあとの一本は、特別においしいという。', 'A milk vending machine. They say a bottle after the bath tastes especially good.'),
  sento_bench: place('木のベンチだ。お風呂あがりの人が、ぼんやり座っている。', 'A wooden bench. People fresh from the bath sit here, spacing out.'),
  game_arcade: place('ゲームの筐体が、ずらりと並んでいる。一人でプレーする人が、静かに画面を見つめている。', 'Arcade cabinets stand in a row. People play alone, staring quietly at the screen.'),
  game_prize: place('景品のカウンターだ。ぬいぐるみが、ぎっしりと棚に座っている。', 'The prize counter. Stuffed toys sit packed on the shelves.'),
  game_crane: place('クレーンゲームだ。ぬいぐるみを取ろうとして、何度もアームを動かしている人がいる。', 'Crane games. Someone moves the arm again and again, trying to catch a toy.'),
  game_dance: place('ダンスのゲームだ。画面の矢印に合わせて、足を動かす。', 'A dance game. You move your feet to the arrows on the screen.'),
  game_purikura: place('プリクラの機械だ。友だち同士が、笑いながら写真を撮っている。', 'A purikura booth. Friends laugh while taking photos.'),
  yokocho_bottles: place('日本酒の瓶が、ぎっしり並んでいる。', 'Bottles of sake are packed on the shelves.'),
  yokocho_menu: place('紙のメニューが、壁にずらりとはってある。手書きの字だ。', 'Paper menus hang along the wall, handwritten.'),
  yokocho_grill: place('串焼きの煙が、細い天井に立ちのぼっている。', 'Smoke from the skewers rises toward the low ceiling.'),
  yokocho_noren: place('白いのれんの向こうは、台所だ。', 'Beyond the white noren is the kitchen.'),
  yokocho_tv: place('小さなテレビが、ニュースを流している。誰も、あまり見ていない。', 'A small TV plays the news. Hardly anyone is watching.'),
  yokocho_coat: place('コート掛けに、会社帰りの人のコートが、ぎゅうぎゅうにかかっている。', 'The coat hooks are crammed with the coats of people on their way home from work.'),
  kuyaku_counter: place('窓口には番号が書いてあるが、どの窓口がどの手続きなのか、一度では分からない。', 'The windows have numbers, but which window handles which procedure is hard to tell at a glance.', 'kuyakusho'),
  kuyaku_board: place('掲示板に、ゴミの出し方や、防災訓練のお知らせがはってある。', 'The notice board carries information about garbage rules and disaster drills.'),
  kuyaku_forms: place('申請書が、種類ごとに棚にならんでいる。外国語のものもある。', 'Application forms are lined up by type on the shelf. Some are in foreign languages.'),
  kuyaku_ticket: place('番号札の機械だ。「ただ今の呼び出し：四十七番」と出ている。', 'The number-ticket machine. The display says “Now serving: 47”.'),
  radio_desk: place('机に、マイクとヘッドホンと、手紙の束がある。', 'On the desk are a microphone, headphones and a bundle of letters.'),
  radio_onair: place('「ON AIR」のランプだ。今は、消えている。', 'The “ON AIR” lamp. It is off right now.'),
  radio_records: place('古いレコードとCDが、棚にぎっしり並んでいる。', 'Old records and CDs are crammed onto the shelves.'),
  radio_thermos: place('ポットと、使い終わった紙コップがある。夜は、長い。', 'A flask and used paper cups. The nights are long.'),
};
