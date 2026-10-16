/**
 * Karaoke songs (original lyrics written for the game, NOT real songs). Each line has one blank with four options; the first
 * option is the right one (the game shuffles). N2-level grammar, one point of the song per line.
 */
export interface KaraokeLine {
  /** the line with ＿＿ where the missing part goes */
  jp: string;
  en: string;
  options: [string, string, string, string];
  why: string;
}
export interface KaraokeSong {
  id: string;
  title: string;
  titleEn: string;
  mood: string;
  lines: KaraokeLine[];
}

export const KARAOKE: KaraokeSong[] = [
  {
    id: 'night_scramble',
    title: '夜のスクランブル',
    titleEn: 'Night Scramble',
    mood: 'neon pop',
    lines: [
      { jp: '夜の渋谷は、人が多い＿＿、なぜか静かに感じる。', en: 'Night Shibuya feels strangely quiet despite the crowds.', options: ['にもかかわらず', 'ばかりに', 'をはじめ', 'によって'], why: 'にもかかわらず = despite (a contrast).' },
      { jp: '信号が青に変わる＿＿、みんなが一斉に歩き出す。', en: 'The moment the light turns green, everyone starts walking at once.', options: ['やいなや', 'ばかりか', 'にわたって', 'とはいえ'], why: '～やいなや = as soon as.' },
      { jp: 'いくら忙しい＿＿、夢をあきらめるわけにはいかない。', en: 'No matter how busy I am, I cannot give up my dream.', options: ['からといって', 'ものだから', 'おかげで', 'ように'], why: '～からといって～わけにはいかない = just because … doesn’t mean/I can’t.' },
      { jp: '君の声が聞こえた＿＿、胸が熱くなった。', en: 'The instant I heard your voice, my chest grew warm.', options: ['とたん', 'ばかりに', 'ものの', 'くせに'], why: '～たとたん = right when something happened.' },
      { jp: '練習した＿＿あって、今夜は上手に歌えた。', en: 'As expected after all that practice, I sang well tonight.', options: ['だけ', 'ばかり', 'ほど', 'くらい'], why: '～だけあって = it is only natural given …' },
      { jp: '終電に乗り遅れた＿＿、朝まで歌うことにした。', en: 'Since I missed the last train, I decided to sing until morning.', options: ['ので', 'けれど', 'くせに', 'ばかりか'], why: 'ので = because (a natural reason).' },
      { jp: '失敗を恐れる＿＿なく、挑戦してみよう。', en: 'Let’s try, without fearing failure.', options: ['こと', 'あまり', 'せい', 'ほど'], why: '～ことなく = without doing …' },
      { jp: '歌い終わる＿＿、拍手が起こった。', en: 'The moment I finished singing, applause broke out.', options: ['が早いか', 'どころか', 'くせに', 'ながらも'], why: '～が早いか = no sooner than.' },
    ],
  },
  {
    id: 'home_station',
    title: 'ふるさとの駅',
    titleEn: 'Station of My Hometown',
    mood: 'slow ballad',
    lines: [
      { jp: '故郷を離れて＿＿、もう十年がたつ。', en: 'It has already been ten years since I left my hometown.', options: ['から', 'ために', 'ながら', 'ほど'], why: '～てから = since / after doing.' },
      { jp: '母の手紙を読む＿＿、涙が止まらなくなった。', en: 'As I read my mother’s letter, I could not stop crying.', options: ['うちに', 'ばかりに', 'かわりに', 'くせに'], why: '～うちに = while doing (a gradual change).' },
      { jp: '何度食べて＿＿、ふるさとの味は忘れられない。', en: 'However often I eat it, I never forget the taste of home.', options: ['も', 'ては', 'さえ', 'など'], why: '何度～ても = no matter how many times.' },
      { jp: '帰りたい＿＿、帰れない事情が、私にはある。', en: 'I want to go home, but I have my reasons for not being able to.', options: ['のに', 'ために', 'ように', 'ばかり'], why: 'のに = although / even though (contrast).' },
      { jp: '駅で別れる＿＿、母は何も言わずに手を振った。', en: 'When we parted at the station, Mother waved without a word.', options: ['際', 'せい', 'はず', 'おかげ'], why: '～際（に） = on the occasion of.' },
      { jp: 'あの日の約束を思い出す＿＿、胸が痛む。', en: 'Every time I remember our promise that day, my heart aches.', options: ['たびに', 'ばかりに', 'とたんに', 'ものの'], why: '～たびに = every time.' },
      { jp: '雪が降る＿＿、ホームは静まり返っていた。', en: 'With the snow falling, the platform lay completely silent.', options: ['中', 'せい', 'ほど', 'うえ'], why: '～中（で） = in the midst of.' },
      { jp: 'たとえ遠く離れて＿＿、心はいつもここにある。', en: 'Even if we are far apart, my heart is always here.', options: ['いても', 'いては', 'いるので', 'いたら'], why: 'たとえ～ても = even if.' },
    ],
  },
  {
    id: 'after_school',
    title: '放課後のうた',
    titleEn: 'After-School Song',
    mood: 'upbeat rock',
    lines: [
      { jp: '宿題が終わらない＿＿、友達と遊びに行く。', en: 'My homework isn’t done, yet I go out to play with friends.', options: ['のに', 'ばかりに', 'ために', 'ものだから'], why: 'のに = even though.' },
      { jp: '先生に叱られた＿＿、明日も同じことをするだろう。', en: 'Even if I’m scolded by the teacher, I’ll probably do the same tomorrow.', options: ['としても', 'ために', 'ように', 'ことに'], why: '～としても = even if / even supposing.' },
      { jp: '彼は優しい＿＿、少し頼りない。', en: 'He is kind, but a little unreliable.', options: ['ものの', 'からには', 'ことだから', 'ばかりか'], why: '～ものの = although (admits a fact, then a contrast).' },
      { jp: '試験に合格する＿＿は、毎日勉強しなければならない。', en: 'If I’m going to pass the exam, I have to study every day.', options: ['からには', 'ばかりに', 'ついでに', 'くせに'], why: '～からには = now that / since (so one must).' },
      { jp: '雨が降ってきた＿＿、傘を持っていない。', en: 'It started raining, and I don’t have an umbrella.', options: ['のに', 'ばかりか', 'ほど', 'ように'], why: 'のに can also express regret/unlucky contrast here.' },
      { jp: '好きだ＿＿言えなかった。', en: 'I couldn’t say that I liked her.', options: ['とは', 'ほど', 'だけ', 'より'], why: '～とは言えなかった = couldn’t say that …' },
      { jp: '大事な試合を前に、練習を休む＿＿にはいかない。', en: 'With an important match ahead, I can’t skip practice.', options: ['わけ', 'はず', 'つもり', 'ばかり'], why: '～わけにはいかない = cannot (for a reason).' },
      { jp: '卒業しても、君のことは忘れる＿＿。', en: 'Even after graduation, I will never forget you.', options: ['まい', 'ないで', 'ずに', 'ばかり'], why: '～まい = will surely not (a firm resolve).' },
    ],
  },
];
