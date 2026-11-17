// 1. キャラクター一覧データ
export const BRAWLERS = [
  { id: 'piper', name: 'エリザベス', role: 'スナイパー', counters: ['leon', 'mico', 'edgar', 'nani'] },
  { id: 'nani', name: 'ナーニ', role: 'スナイパー', counters: ['leon', 'max', 'mico'] },
  { id: 'belle', name: 'ベル', role: 'スナイパー', counters: ['leon', 'piper', 'mortis'] },
  { id: 'leon', name: 'レオン', role: 'アサシン', counters: ['shelly', 'gale', 'bull', 'pearl'] },
  { id: 'mico', name: 'ミコ', role: 'アサシン', counters: ['shelly', 'bull', 'gale', 'rt'] },
  { id: 'edgar', name: 'エドガー', role: 'アサシン', counters: ['shelly', 'gale', 'bull', 'surge'] },
  { id: 'shelly', name: 'シェリー', role: 'アタッカー', counters: ['piper', 'belle', 'spike', 'bea'] },
  { id: 'gale', name: 'ゲイル', role: 'コントローラー', counters: ['piper', 'belle', 'mandy'] },
  { id: 'spike', name: 'スパイク', role: 'アタッカー', counters: ['piper', 'belle', 'brock'] },
  { id: 'colt', name: 'コルト', role: 'アタッカー', counters: ['piper', 'nani', 'leon'] },
  { id: 'rico', name: 'リコ', role: 'アタッカー', counters: ['brock', 'piper', 'mico'] },
  { id: 'sandy', name: 'サンディ', role: 'コントローラー', counters: ['shelly', 'gale', 'spike'] },
  { id: 'emz', name: 'Emz', role: 'コントローラー', counters: ['piper', 'mortis', 'edgar'] },
  { id: 'frank', name: 'フランケン', role: 'タンク', counters: ['colette', 'gale', 'shelly', 'spike'] },
  { id: 'colette', name: 'コレット', role: 'アタッカー', counters: ['piper', 'spike', 'mrp'] }
];

// 2. マップごとのティア（強さ）データ
export const MAPS = [
  {
    id: 'shooting_star',
    name: '流れ星（賞金稼ぎ）',
    tierS: ['piper', 'nani', 'belle'], // +10点
    tierA: ['leon', 'mico', 'colt'],   // +6点
  },
  {
    id: 'open_zone',
    name: 'オープンゾーン（ホットゾーン）',
    tierS: ['sandy', 'emz', 'spike'],
    tierA: ['gale', 'piper', 'rico'],
  },
  {
    id: 'brawl_ball_center',
    name: '中央のフィールド（ブロストライカー）',
    tierS: ['frank', 'sandy', 'rico'],
    tierA: ['shelly', 'gale', 'colette', 'colt'],
  }
];