import type { Step } from '../core/script';

/**
 * Talking with people beyond the story (core/social.ts builds the conversations from this):
 * who speaks how (voice, the register they expect), what they like as a gift, small talk that fits the time,
 * season and the player's journey, the replies the player chooses in three registers, and one heart event for
 * the people you get close to.
 */

export type Register = 'keigo' | 'polite' | 'casual';

export interface Profile {
  /** voice for read-aloud and listening */
  voice: 'f' | 'm';
  /** how you should talk to them: elders, officials and hosts expect keigo, most adults polite, friends casual */
  reg: Register;
  loves?: string[];
  likes?: string[];
}

// gift ids: heal items in creatures.ts (food and drink)
export const PROFILES: Record<string, Profile> = {
  mori: { voice: 'f', reg: 'polite', loves: ['greentea', 'wagashi'], likes: ['peach', 'yatsuhashi', 'hoshigaki'] },
  haruto: { voice: 'm', reg: 'casual', loves: ['ramen', 'takoyaki'], likes: ['onigiri', 'energy_drink', 'canned_coffee'] },
  customer: { voice: 'm', reg: 'polite', likes: ['greentea', 'canned_coffee'] },
  kaede: { voice: 'f', reg: 'polite', loves: ['matcha', 'dorayaki'], likes: ['cake', 'peach', 'lemon'] },
  aoi: { voice: 'f', reg: 'casual', loves: ['cake', 'dorayaki'], likes: ['takoyaki', 'grape_juice'] },
  sato: { voice: 'm', reg: 'keigo', loves: ['greentea', 'tsukemono'], likes: ['hoshigaki', 'amazake'] },
  station_staff: { voice: 'm', reg: 'polite', likes: ['canned_coffee', 'onigiri'] },
  kirishima: { voice: 'm', reg: 'polite', loves: ['coffee_black'], likes: ['canned_coffee', 'energy_drink'] },
  hayashi: { voice: 'm', reg: 'polite', loves: ['grape_juice'], likes: ['onigiri', 'greentea'] },
  sakura_hayashi: { voice: 'f', reg: 'casual', loves: ['cake', 'dorayaki'], likes: ['peach', 'takosen'] },
  okami: { voice: 'f', reg: 'keigo', loves: ['wagashi', 'matcha'], likes: ['onsen_tamago', 'greentea'] },
  kenji: { voice: 'm', reg: 'polite', loves: ['tsukemono'], likes: ['grape_juice', 'kushikatsu'] },
  ota: { voice: 'm', reg: 'keigo', loves: ['matcha'], likes: ['wagashi', 'greentea'] },
  tsuru: { voice: 'f', reg: 'keigo', loves: ['amazake', 'hoshigaki'], likes: ['oyaki', 'greentea'] },
  hina: { voice: 'f', reg: 'casual', loves: ['dorayaki'], likes: ['oyaki', 'cake'] },
  fujii: { voice: 'f', reg: 'polite', loves: ['lemon'], likes: ['greentea', 'amazake'] },
  kuroda: { voice: 'm', reg: 'polite', loves: ['oyaki'], likes: ['canned_coffee', 'onigiri'] },
  jokan: { voice: 'm', reg: 'keigo', loves: ['hoshigaki'], likes: ['matcha', 'amazake'] },
  gen: { voice: 'm', reg: 'polite', loves: ['ikayaki'], likes: ['sea_salt', 'onigiri'] },
  nagisa: { voice: 'f', reg: 'casual', loves: ['lemon'], likes: ['takosen', 'cake'] },
  hamada: { voice: 'f', reg: 'polite', loves: ['sea_salt'], likes: ['lemon', 'greentea'] },
  kaito: { voice: 'm', reg: 'casual', loves: ['takosen', 'ikayaki'], likes: ['takoyaki', 'energy_drink'] },
  umino: { voice: 'm', reg: 'keigo', loves: ['greentea'], likes: ['sea_salt', 'hoshigaki'] },
  shiraishi: { voice: 'f', reg: 'polite', loves: ['coffee_black'], likes: ['lemon', 'canned_coffee'] },
  sumie: { voice: 'f', reg: 'keigo', loves: ['wagashi'], likes: ['matcha', 'yatsuhashi'] },
  matsuo: { voice: 'f', reg: 'polite', loves: ['yatsuhashi'], likes: ['matcha', 'tsukemono'] },
  rin: { voice: 'f', reg: 'casual', loves: ['wagashi', 'dorayaki'], likes: ['yatsuhashi', 'cake'] },
  ikeda: { voice: 'm', reg: 'keigo', loves: ['canned_coffee'], likes: ['onigiri', 'greentea'] },
  sakamoto: { voice: 'm', reg: 'polite', loves: ['energy_drink'], likes: ['canned_coffee', 'coffee_black'] },
  emma: { voice: 'f', reg: 'casual', loves: ['takoyaki', 'matcha'], likes: ['ramen', 'dorayaki'] },
  tachibana: { voice: 'f', reg: 'keigo', loves: ['matcha'], likes: ['wagashi', 'greentea'] },
  kenta: { voice: 'm', reg: 'casual', loves: ['energy_drink'], likes: ['canned_coffee', 'kushikatsu', 'onigiri'] },
  okan: { voice: 'f', reg: 'casual', loves: ['okonomiyaki'], likes: ['takoyaki', 'kushikatsu', 'grape_juice'] },
  fujita: { voice: 'm', reg: 'keigo', loves: ['kushikatsu'], likes: ['canned_coffee', 'energy_drink'] },
  minh: { voice: 'f', reg: 'polite', loves: ['ramen'], likes: ['onigiri', 'lemon'] },
  porter: { voice: 'm', reg: 'polite', likes: ['canned_coffee', 'takoyaki'] },
  kuroi: { voice: 'm', reg: 'polite', loves: ['coffee_black'], likes: ['ramen', 'canned_coffee'] },
  haru: { voice: 'f', reg: 'casual', loves: ['ramen'], likes: ['coffee_black', 'dorayaki'] },
  yoshie: { voice: 'f', reg: 'keigo', loves: ['coffee_black'], likes: ['dorayaki', 'cake'] },
  yamamoto: { voice: 'm', reg: 'keigo', loves: ['canned_coffee'], likes: ['onigiri', 'greentea'] },
  priya: { voice: 'f', reg: 'casual', loves: ['ramen', 'coffee_black'], likes: ['dorayaki', 'takoyaki'] },
  attendant: { voice: 'm', reg: 'polite', likes: ['canned_coffee', 'onigiri'] },
};

/** the context a small-talk line fits; omitted = always */
export interface TalkWhen {
  time?: 'morning' | 'evening';
  season?: 'spring' | 'summer' | 'autumn' | 'winter';
  region?: string;
  flag?: string;
  notFlag?: string;
}

/** what the person says (in the form that suits them) and which reply set fits */
export interface TalkLine {
  when?: TalkWhen;
  casual: string;
  polite: string;
  en: string;
  reply: string;
}

export const TALK: TalkLine[] = [
  { when: { time: 'morning' }, casual: 'おはよう！ 今日も早いね。', polite: 'おはようございます。今日もお早いですね。', en: 'Good morning! You are up early again.', reply: 'morning' },
  { when: { time: 'evening' }, casual: 'もう夕方だね。一日、早いなあ。', polite: 'もう夕方ですね。一日があっという間です。', en: 'It is evening already. The day flew by.', reply: 'evening' },
  { when: { season: 'spring' }, casual: '桜、もう咲いてたよ。見た？', polite: '桜がもう咲いていましたよ。ご覧になりましたか。', en: 'The cherry blossoms are out. Have you seen them?', reply: 'season' },
  { when: { season: 'summer' }, casual: '暑いね〜。冷たいものが飲みたいよ。', polite: '毎日暑いですね。冷たいものが恋しくなります。', en: 'So hot. I want something cold to drink.', reply: 'weather' },
  { when: { season: 'autumn' }, casual: '紅葉がきれいな季節になったね。', polite: '紅葉がきれいな季節になりましたね。', en: 'It is the season of beautiful autumn leaves.', reply: 'season' },
  { when: { season: 'winter' }, casual: '寒いね。風邪ひかないでね。', polite: '寒くなりましたね。風邪をひかないようにしてくださいね。', en: 'It is cold. Do not catch a cold.', reply: 'care' },
  { casual: '最近、日本語どう？ 上手になったね。', polite: '最近、日本語がずいぶん上手になりましたね。', en: 'Your Japanese has really improved lately.', reply: 'praise' },
  { casual: '今日はどこか行くの？', polite: '今日はどちらかへお出かけですか。', en: 'Are you going somewhere today?', reply: 'plan' },
  { casual: 'ちゃんとご飯食べてる？', polite: 'ちゃんとお食事はとっていますか。', en: 'Are you eating properly?', reply: 'care' },
  { casual: 'なんか元気そうだね。いいことあった？', polite: 'お元気そうですね。何かいいことがありましたか。', en: 'You look well. Did something good happen?', reply: 'good' },
  { when: { region: 'Hinomori' }, casual: '日野森は静かでいいでしょ。', polite: '日野森は静かでいいところでしょう。', en: 'Hinomori is quiet and nice, isn’t it?', reply: 'place' },
  { when: { region: 'Kyoto' }, casual: '京都、どう？ 気に入った？', polite: '京都はいかがですか。お気に召しましたか。', en: 'How do you like Kyoto?', reply: 'place' },
  { when: { region: 'Osaka' }, casual: '大阪、どう？ にぎやかでええやろ。', polite: '大阪はいかがですか。にぎやかでいいでしょう。', en: 'How is Osaka? Lively and nice, right?', reply: 'place' },
  { when: { region: 'Tokyo' }, casual: '東京、電車が多すぎて迷わない？', polite: '東京は電車が多くて、迷いませんか。', en: 'Tokyo has so many trains, don’t you get lost?', reply: 'lost' },
  { when: { flag: 'kyoto_visited', notFlag: 'osaka_visited' }, casual: '京都に行ってきたんだって？ どうだった？', polite: '京都に行ってこられたそうですね。いかがでしたか。', en: 'I heard you went to Kyoto. How was it?', reply: 'trip' },
  { when: { flag: 'osaka_visited', notFlag: 'tokyo_visited' }, casual: '大阪、楽しかった？ たこ焼き食べた？', polite: '大阪は楽しかったですか。たこ焼きは召し上がりましたか。', en: 'Was Osaka fun? Did you eat takoyaki?', reply: 'trip' },
  { when: { flag: 'tokyo_visited' }, casual: '東京まで行ったんだ。すごいね。', polite: '東京まで行かれたんですね。すごいですね。', en: 'You went all the way to Tokyo. Amazing.', reply: 'trip' },
  { when: { flag: 'shiomi_visited' }, casual: '海の町、行ったんだね。いいなあ。', polite: '海の町に行かれたんですね。うらやましいです。', en: 'You went to the sea town. I am jealous.', reply: 'trip' },
  { when: { flag: 'yukimi_visited' }, casual: '雪見村、寒かったでしょ？', polite: '雪見村は寒かったでしょう。', en: 'Yukimi Village must have been cold.', reply: 'weather' },
];

/** the player's answer in three registers, the polite one also in building blocks */
export interface ReplySet {
  keigo: string;
  polite: string;
  casual: string;
  en: string;
  chunks: string[];
}
export const REPLIES: Record<string, ReplySet> = {
  morning: { keigo: 'おはようございます。本日もよろしくお願いいたします。', polite: 'おはようございます。今日もよろしくお願いします。', casual: 'おはよう！ 今日もよろしくね。', en: 'Good morning, looking forward to today.', chunks: ['おはようございます。', '今日も', 'よろしく', 'お願いします。'] },
  evening: { keigo: '本当でございますね。お疲れさまでございます。', polite: '本当ですね。お疲れさまです。', casual: 'ほんとだね。おつかれ！', en: 'Really. Good work today.', chunks: ['本当ですね。', 'お疲れ', 'さまです。'] },
  season: { keigo: 'ええ、拝見いたしました。本当に美しゅうございました。', polite: 'はい、見ました。とてもきれいでした。', casual: 'うん、見た見た！ すごくきれいだった。', en: 'Yes, I saw. It was beautiful.', chunks: ['はい、', '見ました。', 'とても', 'きれいでした。'] },
  weather: { keigo: 'さようでございますね。どうぞお体をお大事になさってください。', polite: 'そうですね。体に気をつけてください。', casual: 'そうだね。体に気をつけてね。', en: 'Yes. Take care of yourself.', chunks: ['そうですね。', '体に', '気をつけて', 'ください。'] },
  care: { keigo: 'お気遣いいただき、ありがとうございます。', polite: '心配してくれて、ありがとうございます。', casual: '心配してくれて、ありがとう！', en: 'Thank you for caring.', chunks: ['心配して', 'くれて、', 'ありがとう', 'ございます。'] },
  praise: { keigo: '恐れ入ります。まだまだ勉強中でございます。', polite: 'ありがとうございます。まだまだ勉強中です。', casual: 'ありがとう！ まだまだだけどね。', en: 'Thank you, I am still learning.', chunks: ['ありがとう', 'ございます。', 'まだまだ', '勉強中です。'] },
  plan: { keigo: 'はい、少し町を歩いてまいります。', polite: 'はい、ちょっと町を歩いてきます。', casual: 'うん、ちょっと町を歩いてくる。', en: 'Yes, I will take a walk around town.', chunks: ['はい、', 'ちょっと', '町を', '歩いてきます。'] },
  place: { keigo: 'ええ、たいへん気に入っております。', polite: 'はい、とても気に入っています。', casual: 'うん、すごく気に入ってる！', en: 'Yes, I really like it here.', chunks: ['はい、', 'とても', '気に入って', 'います。'] },
  good: { keigo: 'はい、おかげさまで、うれしいことがございました。', polite: 'はい、ちょっといいことがありました。', casual: 'うん、ちょっといいことがあったんだ！', en: 'Yes, something nice happened.', chunks: ['はい、', 'ちょっと', 'いいことが', 'ありました。'] },
  lost: { keigo: 'はい、たびたび迷ってしまいます。', polite: 'はい、よく迷います。でも、楽しいです。', casual: 'うん、よく迷う！ でも楽しいよ。', en: 'Yes, I often get lost. But it is fun.', chunks: ['はい、', 'よく', '迷います。', 'でも、', '楽しいです。'] },
  trip: { keigo: 'はい、たいへん楽しゅうございました。', polite: 'はい、とても楽しかったです。', casual: 'うん、すっごく楽しかった！', en: 'Yes, it was a lot of fun.', chunks: ['はい、', 'とても', '楽しかった', 'です。'] },
};

/** what a person says to your reply: right register, a bit too casual, a bit too stiff */
export const REACT = {
  good: {
    casual: { jp: 'うん、だよね！', en: 'Right?!' },
    polite: { jp: 'ええ、本当に。', en: 'Yes, indeed.' },
    keigo: { jp: 'まあ、ご丁寧にありがとうございます。', en: 'Oh, how polite of you, thank you.' },
  },
  tooCasual: { jp: '……あら、ずいぶん気さくですね。', en: '…Oh, that was rather casual.', note: 'Too casual: with older people, hosts, teachers and officials use です／ます (or keigo).' },
  tooStiff: { jp: 'ちょっと、かたいよ〜！ 普通に話してよ。', en: 'Hey, so stiff! Just talk normally.', note: 'Too stiff: friends and people your age use the plain form (だ／る).' },
};

/** the heart event of the people you get close to (relationship points 6+), once */
export const HEART_EVENTS: Record<string, Step[]> = {
  mori: [
    { say: '@nameさん、ちょっといいかしら。……実はね、この町に来る人を、わたしはずっと見送ってきたの。', who: 'mori', en: '@name, do you have a moment? …I have seen so many people leave this town.' },
    { say: 'でも、あなたは帰ってきてくれる。それが、思っていたより、うれしいのよ。', who: 'mori', en: 'But you keep coming back. That makes me happier than I expected.', mood: 'happy' },
    { say: '「おかえりなさい」って言える人がいるのは、幸せなことね。', who: 'mori', en: 'It is a happy thing to have someone to say “welcome home” to.' },
  ],
  kaede: [
    { say: 'この店ね、母から受け継いだの。最初は、コーヒーの味が全然違うって言われてばかりで。', who: 'kaede', en: 'I took this café over from my mother. At first everyone said the coffee tasted completely different.' },
    { say: 'でも、「楓さんの味もいいね」って言ってくれる人が、少しずつ増えたの。@nameさんも、その一人。', who: 'kaede', en: 'But more and more people started saying “Kaede’s taste is good too”. You are one of them.', mood: 'happy' },
    { say: '変わることを、怖がらなくていいのよね。……これ、新作のケーキ。味見してくれる？', who: 'kaede', en: 'There is no need to be afraid of change. …This is my new cake. Will you taste it?' },
    { do: [{ give: 'cake' }] },
  ],
  haruto: [
    { say: 'なあ、@name。おれ、本当は料理人になりたかったんだ。', who: 'haruto', en: 'Hey @name. I actually wanted to become a cook.' },
    { say: 'でも、コンビニで毎日お客さんの顔を見てたら、これも悪くないなって。「いらっしゃいませ」って、いい言葉だよな。', who: 'haruto', en: 'But seeing the customers’ faces every day at the konbini, this is not bad either. “Irasshaimase” is a good word.', mood: 'happy' },
    { say: 'これ、おれが作ったおにぎり。店のより、ちょっとでかいぞ。', who: 'haruto', en: 'This is a rice ball I made. A bit bigger than the ones in the shop.' },
    { do: [{ give: 'onigiri', n: 3 }] },
  ],
  aoi: [
    { say: 'ねえ、@name。わたし、就職の面接で、敬語を間違えちゃったんだ。', who: 'aoi', en: 'Hey @name. In a job interview I got my keigo wrong.', mood: 'worried' },
    { say: '「申される」って言っちゃって……。正しくは「おっしゃる」だよね。', who: 'aoi', en: 'I said “mōsareru”… The right word is “ossharu”, isn’t it?' },
    { say: 'でも、@nameと練習してから、ちょっと自信がついた。次は、きっと大丈夫！', who: 'aoi', en: 'But since practising with you I feel more confident. Next time it will be fine!', mood: 'happy' },
  ],
  sato: [
    { say: '@nameさん。教師をやめてから、言葉を教える相手がいなくなりましてね。', who: 'sato', en: '@name. After I retired I had nobody left to teach words to.' },
    { say: 'あなたが図書館に来てくれると、教壇に立っていたころを思い出すのです。', who: 'sato', en: 'When you come to the library I remember standing in front of a class.', mood: 'happy' },
    { say: '学ぶ人がいる限り、言葉は消えません。……これは、わたしが若いころに使った栞です。', who: 'sato', en: 'As long as someone learns, words do not disappear. …This is a bookmark I used when I was young.' },
    { do: [{ give: 'shiori' }] },
  ],
  okami: [
    { say: '@name様。この旅館は、わたしで四代目でございます。', who: 'okami', en: '@name, I am the fourth generation running this inn.' },
    { say: 'お客様の「ただいま」を聞くのが、何よりの喜びでございます。また、いつでもお帰りくださいませ。', who: 'okami', en: 'Hearing guests say “I am home” is my greatest joy. Please come back any time.', mood: 'happy' },
    { do: [{ give: 'onsen_tamago', n: 2 }] },
  ],
  tsuru: [
    { say: '@nameちゃん、よう来てくれたねえ。冬の夜は長いから、話し相手がいるとうれしいよ。', who: 'tsuru', en: '@name, thank you for coming. Winter nights are long, so I am glad to have someone to talk to.' },
    { say: '昔はね、この村の言葉も、もっとたくさんあったんだよ。雪の名前だけで、二十もあったんだから。', who: 'tsuru', en: 'In the old days this village had many more words. Twenty names just for snow.' },
    { say: 'あんたが覚えてくれたら、言葉はまた生きる。……ほら、おやき、持っておいき。', who: 'tsuru', en: 'If you remember them, the words live again. …Here, take some oyaki.', mood: 'happy' },
    { do: [{ give: 'oyaki', n: 2 }] },
  ],
  gen: [
    { say: '……おう、@name。海はな、毎日ちがう顔をするんだ。', who: 'gen', en: '…Hey, @name. The sea shows a different face every day.' },
    { say: '言葉も同じだ。同じ「ありがとう」でも、言い方ひとつで、ちがう意味になる。', who: 'gen', en: 'Words are the same. The same “thank you” means something else depending on how you say it.' },
    { say: 'おまえの「ありがとう」は、まっすぐでいい。……持ってけ、いか焼きだ。', who: 'gen', en: 'Your “thank you” is straight, that is good. …Take this, grilled squid.', mood: 'happy' },
    { do: [{ give: 'ikayaki', n: 2 }] },
  ],
  nagisa: [
    { say: 'ねえ、@name。わたし、東京の大学に行くか、この町に残るか、ずっと迷ってるの。', who: 'nagisa', en: 'Hey @name. I keep going back and forth: university in Tokyo, or staying in this town.', mood: 'worried' },
    { say: 'でも、@nameを見てたら思ったんだ。どこに行っても、帰れる場所があればいいんだって。', who: 'nagisa', en: 'But watching you I realised: wherever you go, it is fine as long as there is a place to come back to.', mood: 'happy' },
  ],
  matsuo: [
    { say: '@nameさん、京都の人は「ぶぶ漬けでもどうどす」って言うって、聞いたことある？', who: 'matsuo', en: '@name, have you heard that Kyoto people say “how about some bubuzuke”?' },
    { say: 'あれは「そろそろお帰り」の合図、っていう話。でもね、わたしは本当にお茶漬けを出したい人なの。', who: 'matsuo', en: 'They say it is a hint to leave. But I am someone who really wants to serve you tea-rice.', mood: 'happy' },
    { say: 'だから、遠慮しないで、また泊まりに来てね。', who: 'matsuo', en: 'So do not hold back, come and stay again.' },
    { do: [{ give: 'yatsuhashi', n: 2 }] },
  ],
  okan: [
    { say: '@nameちゃん、あんた、ほんまにええ子やなあ！', who: 'okan', en: '@name, you really are a good kid!', mood: 'happy' },
    { say: '大阪ではな、知らん人にも「おおきに」言うんや。それだけで、ちょっと仲良うなれるねん。', who: 'okan', en: 'In Osaka we say “ookini” even to strangers. That alone makes you a little closer.' },
    { say: 'ほら、おかん特製のお好み焼きや。持って帰り！', who: 'okan', en: 'Here, Okan’s special okonomiyaki. Take it home!' },
    { do: [{ give: 'okonomiyaki', n: 2 }] },
  ],
  kenta: [
    { say: '@name、聞いてくれよ。今日、初めて課長に「よくやった」って言われたんだ！', who: 'kenta', en: '@name, listen. Today the section chief told me “well done” for the first time!', mood: 'happy' },
    { say: 'わからないことを「わかりません」って言えるようになったら、仕事が楽になってさ。', who: 'kenta', en: 'Once I could say “I don’t understand”, work got easier.' },
    { say: 'おまえのおかげだよ。これ、お礼の栄養ドリンク。……地味だけど、効くぞ。', who: 'kenta', en: 'Thanks to you. Here, an energy drink as thanks. …Plain, but it works.' },
    { do: [{ give: 'energy_drink', n: 2 }] },
  ],
  haru: [
    { say: '@name。北海道から出てきたとき、東京の言葉が冷たく聞こえたんだ。', who: 'haru', en: '@name. When I came from Hokkaido, Tokyo’s words sounded cold to me.' },
    { say: 'でも、冷たいんじゃなくて、みんな忙しくて、言葉が短くなってるだけなんだよね。', who: 'haru', en: 'But they are not cold, everyone is just busy, so the words get short.' },
    { say: 'だから、わたしは長めに話すことにしてる。「ありがとう、助かったよ」ってね。', who: 'haru', en: 'So I decided to talk a little longer. Like “thanks, that helped a lot”.', mood: 'happy' },
  ],
  yoshie: [
    { say: '@nameさん。この喫茶店も、もう五十年になりますの。', who: 'yoshie', en: '@name. This coffee house is fifty years old now.' },
    { say: '常連さんは少なくなりましたけれど、あなたのような方が来てくださると、カップを温める手が、うれしくなるんですよ。', who: 'yoshie', en: 'There are fewer regulars now, but when someone like you comes, my hands warming the cups feel happy.', mood: 'happy' },
    { do: [{ give: 'coffee_black', n: 2 }] },
  ],
  priya: [
    { say: '@name、聞いて。会社で初めて、日本語だけで会議ができたの！', who: 'priya', en: '@name, listen. For the first time I did a whole meeting only in Japanese!', mood: 'happy' },
    { say: '「検討します」が「たぶん無理です」って意味だって、もうわかるよ。ふふ。', who: 'priya', en: 'I now know that “we will consider it” means “probably not”. Hehe.' },
    { say: 'わたしたち、同じ外国人の仲間だね。これからも一緒にがんばろう。', who: 'priya', en: 'We are fellow foreigners. Let’s keep going together.' },
  ],
};

/** short calls passersby and people make when you walk past (speech bubbles) */
export const GREETINGS: Record<Register, string[]> = {
  casual: ['やあ！', 'おーい！', 'あ、@name！', 'げんき？', 'またね〜'],
  polite: ['こんにちは。', 'いい天気ですね。', 'あ、どうも。', 'お元気ですか。'],
  keigo: ['いらっしゃいませ。', 'ごきげんよう。', 'ようこそ。', 'お気をつけて。'],
};
