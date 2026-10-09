export interface NpcDef {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  /** base sprite key; "<key>_down/_up/_side" variants are used when available */
  sprite: string;
  tint?: number;
  portrait?: string;
  /** CSS filter so dialogue portraits roughly match the in-world tint */
  portraitFilter?: string;
  color: string;
}

export const NPCS: Record<string, NpcDef> = {
  mori: { id: 'mori', name: '森さん', nameEn: 'Ms. Mori', role: 'Landlady', sprite: 'kimono_f', tint: 0xd8cfe8, portraitFilter: 'grayscale(0.45) brightness(1.05)', color: '#9b6bb3' },
  haruto: { id: 'haruto', name: 'ハルト', nameEn: 'Haruto', role: 'Convenience-store clerk', sprite: 'boy', color: '#d0473a' },
  customer: { id: 'customer', name: '常連さん', nameEn: 'Regular customer', role: 'Regular customer', sprite: 'kimono_m', tint: 0xc9b9a0, portraitFilter: 'sepia(0.45)', color: '#7a6a50' },
  kaede: { id: 'kaede', name: '楓', nameEn: 'Kaede', role: 'Café owner', sprite: 'kimono_f', color: '#d9739b' },
  aoi: { id: 'aoi', name: 'アオイ', nameEn: 'Aoi', role: 'University student', sprite: 'hero', tint: 0xa9c4ff, portraitFilter: 'saturate(0.6) brightness(1.05)', color: '#3f6fd1' },
  sato: { id: 'sato', name: '佐藤先生', nameEn: 'Mr. Satō', role: 'Retired teacher', sprite: 'kimono_m', color: '#3d5a80' },
  station_staff: { id: 'station_staff', name: '駅員', nameEn: 'Station attendant', role: 'Station attendant', sprite: 'boy', tint: 0x9fb4ff, portraitFilter: 'saturate(0.7)', color: '#2b4c9b' },
  kirishima: { id: 'kirishima', name: '霧島博士', nameEn: 'Dr. Kirishima', role: 'Researcher', sprite: 'kimono_m', tint: 0xb8c4c8, portraitFilter: 'grayscale(0.6)', color: '#4a6670' },
  yukitsune: { id: 'yukitsune', name: '？？？', nameEn: '???', role: 'Kotodama', sprite: 'k_fox_blue', portrait: 'k_fox_blue', color: '#6c8fd6' },
};
