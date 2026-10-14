export interface NpcDef {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  /** base sprite key; "<key>_down/_up/_side" variants are used when available */
  sprite: string;
  tint?: number;
  /** portrait asset; keys starting with "portrait_" have _neutral/_happy/_surprised/_worried variants */
  portrait?: string;
  /** CSS filter so dialogue portraits roughly match the in-world tint */
  portraitFilter?: string;
  color: string;
}

export const NPCS: Record<string, NpcDef> = {
  mori: { id: 'mori', name: '森さん', nameEn: 'Ms. Mori', role: 'Landlady', sprite: 'npc_mori', portrait: 'portrait_mori', color: '#9b6bb3' },
  haruto: { id: 'haruto', name: 'ハルト', nameEn: 'Haruto', role: 'Convenience-store clerk', sprite: 'npc_haruto', portrait: 'portrait_haruto', color: '#d0473a' },
  customer: { id: 'customer', name: '常連さん', nameEn: 'Regular customer', role: 'Regular customer', sprite: 'npc_customer', portrait: 'portrait_customer', color: '#7a6a50' },
  kaede: { id: 'kaede', name: '楓', nameEn: 'Kaede', role: 'Café owner', sprite: 'npc_kaede', portrait: 'portrait_kaede', color: '#d9739b' },
  aoi: { id: 'aoi', name: 'アオイ', nameEn: 'Aoi', role: 'University student', sprite: 'npc_aoi', portrait: 'portrait_aoi', color: '#3f6fd1' },
  sato: { id: 'sato', name: '佐藤先生', nameEn: 'Mr. Satō', role: 'Retired teacher', sprite: 'npc_sato', portrait: 'portrait_sato', color: '#3d5a80' },
  station_staff: { id: 'station_staff', name: '駅員', nameEn: 'Station attendant', role: 'Station attendant', sprite: 'npc_station_staff', portrait: 'portrait_station_staff', color: '#2b4c9b' },
  kirishima: { id: 'kirishima', name: '霧島博士', nameEn: 'Dr. Kirishima', role: 'Researcher', sprite: 'npc_kirishima', portrait: 'portrait_kirishima', color: '#4a6670' },
  yukitsune: { id: 'yukitsune', name: '？？？', nameEn: '???', role: 'Kotodama', sprite: 'k_fox_blue', portrait: 'k_fox_blue', color: '#6c8fd6' },
  // chapter 2: Hinomori valley
  hayashi: { id: 'hayashi', name: '林さん', nameEn: 'Mr. Hayashi', role: 'Peach farmer', sprite: 'npc_hayashi', portrait: 'portrait_hayashi', color: '#b5733a' },
  sakura_hayashi: { id: 'sakura_hayashi', name: 'さくら', nameEn: 'Sakura', role: 'Farmer’s granddaughter', sprite: 'npc_sakura', portrait: 'portrait_sakura', color: '#e0a32a' },
  okami: { id: 'okami', name: '女将さん', nameEn: 'Okami-san', role: 'Onsen inn owner', sprite: 'npc_okami', portrait: 'portrait_okami', color: '#6b3f7a' },
  kenji: { id: 'kenji', name: '健二', nameEn: 'Kenji', role: 'Winemaker', sprite: 'npc_kenji', portrait: 'portrait_kenji', color: '#3f7a4a' },
  ota: { id: 'ota', name: '太田先生', nameEn: 'Mr. Ōta', role: 'Calligrapher, master of words', sprite: 'npc_ota', portrait: 'portrait_ota', color: '#2f4a7a' },
  // chapter 3: Yukimi, the snowy mountain village
  tsuru: { id: 'tsuru', name: 'つるさん', nameEn: 'Grandma Tsuru', role: 'Guesthouse owner', sprite: 'npc_tsuru', portrait: 'portrait_tsuru', color: '#3b4a7a' },
  hina: { id: 'hina', name: 'ひな', nameEn: 'Hina', role: 'Village girl', sprite: 'npc_hina', portrait: 'portrait_hina', color: '#c8463c' },
  fujii: { id: 'fujii', name: '藤井先生', nameEn: 'Dr. Fujii', role: 'Village doctor', sprite: 'npc_fujii', portrait: 'portrait_fujii', color: '#5a8fb8' },
  kuroda: { id: 'kuroda', name: '黒田さん', nameEn: 'Mr. Kuroda', role: 'Mountain guide', sprite: 'npc_kuroda', portrait: 'portrait_kuroda', color: '#d0662a' },
  jokan: { id: 'jokan', name: '定観和尚', nameEn: 'Jōkan-oshō', role: 'Head priest, master of kanji', sprite: 'npc_jokan', portrait: 'portrait_jokan', color: '#8a6a22' },
  gen: { id: 'gen', name: '源さん', nameEn: 'Gen-san', role: 'Old fisherman', sprite: 'npc_gen', portrait: 'portrait_gen', color: '#2e4a7a' },
  nagisa: { id: 'nagisa', name: 'なぎさ', nameEn: 'Nagisa', role: 'Tourist office', sprite: 'npc_nagisa', portrait: 'portrait_nagisa', color: '#4a8fd0' },
  hamada: { id: 'hamada', name: '浜田さん', nameEn: 'Mrs. Hamada', role: 'Harbour diner', sprite: 'npc_hamada', portrait: 'portrait_hamada', color: '#c8463c' },
  kaito: { id: 'kaito', name: 'カイト', nameEn: 'Kaito', role: 'Harbour boy', sprite: 'npc_kaito', portrait: 'portrait_kaito', color: '#d0a040' },
  umino: { id: 'umino', name: '海野さん', nameEn: 'Mr. Umino', role: 'Lighthouse keeper, master of grammar', sprite: 'npc_umino', portrait: 'portrait_umino', color: '#2f3f6a' },
  shiraishi: { id: 'shiraishi', name: '白石博士', nameEn: 'Dr. Shiraishi', role: 'Marine researcher', sprite: 'npc_shiraishi', portrait: 'portrait_shiraishi', color: '#6a7a3a' },
  traveller: { id: 'traveller', name: '旅の人', nameEn: 'Traveller', role: '???', sprite: 'npc_traveller', portrait: 'portrait_traveller', color: '#3f6a4a' },
  sumie: { id: 'sumie', name: '澄江さん', nameEn: 'Sumie-san', role: 'Tea-house mistress, master of reading between the lines', sprite: 'npc_sumie', portrait: 'portrait_sumie', color: '#2f6a46' },
  matsuo: { id: 'matsuo', name: '松尾さん', nameEn: 'Ms. Matsuo', role: 'Machiya guesthouse host', sprite: 'npc_matsuo', portrait: 'portrait_matsuo', color: '#3b4a7a' },
  rin: { id: 'rin', name: '凛さん', nameEn: 'Rin', role: 'Kimono-rental student', sprite: 'npc_rin', portrait: 'portrait_rin', color: '#c04a5a' },
  ikeda: { id: 'ikeda', name: '池田さん', nameEn: 'Mr. Ikeda', role: 'Station attendant', sprite: 'npc_ikeda', portrait: 'portrait_ikeda', color: '#2f3f6a' },
  sakamoto: { id: 'sakamoto', name: '坂本さん', nameEn: 'Mr. Sakamoto', role: 'Business traveller', sprite: 'npc_sakamoto', portrait: 'portrait_sakamoto', color: '#5a5a66' },
  emma: { id: 'emma', name: 'エマ', nameEn: 'Emma', role: 'Backpacker', sprite: 'npc_emma', portrait: 'portrait_emma', color: '#d0a040' },
  tachibana: { id: 'tachibana', name: '立花さん', nameEn: 'Tachibana-san', role: 'Business-manners trainer, master of keigo', sprite: 'npc_tachibana', portrait: 'portrait_tachibana', color: '#3f3f4f' },
  kenta: { id: 'kenta', name: '健太さん', nameEn: 'Kenta', role: 'New graduate salesman', sprite: 'npc_kenta', portrait: 'portrait_kenta', color: '#2f3f6a' },
  okan: { id: 'okan', name: 'おかん', nameEn: 'Okan (Mrs. Naniwa)', role: 'Takoyaki shop owner', sprite: 'npc_okan', portrait: 'portrait_okan', color: '#b8742a' },
  fujita: { id: 'fujita', name: '藤田課長', nameEn: 'Section chief Fujita', role: 'Overworked section chief', sprite: 'npc_fujita', portrait: 'portrait_fujita', color: '#5a5a66' },
  minh: { id: 'minh', name: 'ミンさん', nameEn: 'Minh', role: 'Convenience-store worker', sprite: 'npc_minh', portrait: 'portrait_minh', color: '#3a7fc0' },
  porter: { id: 'porter', name: 'ポーターさん', nameEn: 'Hotel porter', role: 'Hotel porter', sprite: 'npc_porter', portrait: 'portrait_porter', color: '#2f3a5a' },
  kuroi: { id: 'kuroi', name: '黒井さん', nameEn: 'Kuroi-san', role: 'Night-radio host, master of Tokyo', sprite: 'npc_kuroi', portrait: 'portrait_kuroi', color: '#2f3f5a' },
  haru: { id: 'haru', name: 'ハル', nameEn: 'Haru', role: 'Freelancer from Hokkaido', sprite: 'npc_haru', portrait: 'portrait_haru', color: '#b59a6a' },
  yoshie: { id: 'yoshie', name: '芳江さん', nameEn: 'Yoshie-san', role: 'Owner of an old kissaten', sprite: 'npc_yoshie', portrait: 'portrait_yoshie', color: '#7a4a7a' },
  yamamoto: { id: 'yamamoto', name: '山本さん', nameEn: 'Yamamoto-san', role: 'Ward-office clerk', sprite: 'npc_yamamoto', portrait: 'portrait_yamamoto', color: '#5a8ab5' },
  priya: { id: 'priya', name: 'プリヤ', nameEn: 'Priya', role: 'IT engineer from India', sprite: 'npc_priya', portrait: 'portrait_priya', color: '#3f3f4a' },
  attendant: { id: 'attendant', name: '駅員さん', nameEn: 'Station attendant', role: 'Tokyo Station attendant', sprite: 'npc_attendant', portrait: 'portrait_attendant', color: '#1f2f5a' },
  kotone: { id: 'kotone', name: '琴音', nameEn: 'Kotone', role: 'K', sprite: '', color: '#2f5a3f' },
  busdriver: { id: 'busdriver', name: '運転手さん', nameEn: 'Bus driver', role: 'Bus driver', sprite: 'npc_busdriver', portrait: 'npc_busdriver_down', color: '#4a86b5' },
};
