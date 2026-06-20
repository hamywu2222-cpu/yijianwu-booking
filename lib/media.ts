export type SceneryItem = {
  src: string;
  title: string;
  caption: string;
  span?: 'wide' | 'tall' | 'hero';
};

export const SCENERY_IMAGES: SceneryItem[] = [
  {
    src: '/images/scenery/fulong-beach-aerial.jpg',
    title: '福隆海水浴場',
    caption: '步行 5 分鐘 · 金色沙灣與湛藍海線',
    span: 'hero',
  },
  {
    src: '/images/scenery/fulong-caoling-tunnel.jpg',
    title: '舊草嶺隧道',
    caption: '台灣第一條鐵路隧道，單車族必騎經典路線',
    span: 'tall',
  },
  {
    src: '/images/scenery/fulong-caoling-loop-sign.jpg',
    title: '舊草嶺隧道環狀線',
    caption: '沿海公路騎行，藍天碧海一路相伴',
    span: 'wide',
  },
  {
    src: '/images/scenery/fulong-station.jpg',
    title: '福隆車站',
    caption: '出站右轉 30 秒即達一間屋',
  },
  {
    src: '/images/scenery/fulong-sandcastle.jpg',
    title: '沙雕藝術季',
    caption: '福隆沙灘經典地標，每年吸引無數旅人',
  },
  {
    src: '/images/scenery/fulong-sand-sculpture.jpg',
    title: '沙雕展',
    caption: '海風、細沙與匠人巧手交織的風景',
  },
  {
    src: '/images/scenery/fulong-ring-immersive-art.webp',
    title: '環狀線沿途體驗',
    caption: '東北角單車之旅，沿途特色景點豐富',
  },
  {
    src: '/images/scenery/fulong-view-from-inn.jpg',
    title: '民宿窗外',
    caption: '推門即見青山綠意與福隆日常',
  },
  {
    src: '/images/scenery/fulong-starbucks.jpg',
    title: '福隆夜色',
    caption: '車站旁休閒角落，散步即可抵達',
  },
];

export const ROOM_VIDEOS = {
  double: {
    poster: '/images/double_room.jpg',
    label: '和鳴 · 雙人房實景',
    sources: ['/videos/double-room-1.mp4', '/videos/double-room-2.mp4', '/videos/family-room-1.mp4'],
  },
  family: {
    poster: '/images/photo_2026-06-18_02-06-05.jpg',
    label: '和風4-6人家庭房實景',
    sources: ['/videos/family-room-2.mp4'],
  },
} as const;

export const OUTDOOR_HIGHLIGHTS = [
  {
    image: '/images/scenery/fulong-beach-aerial.jpg',
    title: '海邊 5 分鐘',
    desc: '福隆海水浴場步行可達，沙灘夕陽與海水浴',
  },
  {
    image: '/images/scenery/fulong-caoling-tunnel.jpg',
    title: '舊草嶺隧道',
    desc: '單車騎行經典景點，從福隆出發輕鬆抵達',
  },
  {
    image: '/images/scenery/fulong-caoling-loop-sign.jpg',
    title: '環狀線騎行',
    desc: '舊草嶺隧道環狀線，沿海公路藍天碧海',
  },
  {
    image: '/images/scenery/fulong-view-from-inn.jpg',
    title: '單車停放無憂',
    desc: '室內遮雨專屬空間，騎完環狀線安心停放',
  },
  {
    image: '/images/scenery/fulong-sand-sculpture.jpg',
    title: '沙灘文化',
    desc: '福隆沙雕季與海岸風光，四季各有風景',
  },
  {
    image: '/images/scenery/fulong-station.jpg',
    title: '交通樞紐',
    desc: '福隆車站前，東北角海岸自行車道起點',
  },
] as const;

export const WEB_DEV_FEATURES = [
  {
    title: '非套版網站',
    desc: '不是 Wix、WordPress 模板，每一行版面與功能皆依需求撰寫',
  },
  {
    title: '純代碼開發',
    desc: 'Next.js + React + TypeScript，現代工程架構，長期維護更容易',
  },
  {
    title: '極速載入',
    desc: '靜態預渲染、圖片與影片按需載入，手機開啟明顯比套版站更快',
  },
  {
    title: '高度客製',
    desc: '訂房流程、房間影片、風景相簿、SEO 皆可量身設計，不受模板限制',
  },
  {
    title: '手機優先',
    desc: '響應式排版，一鍵撥號、LINE 訂房在手機上完整可用',
  },
  {
    title: '上線部署',
    desc: '含網域設定、正式環境部署與後續更新，交件即可對外營運',
  },
] as const;

export const WEB_DEV_REQUIREMENTS = [
  '具備前端工程能力（HTML / CSS / JavaScript / React）',
  '能獨立完成響應式版面與互動設計，而非只會套用主題',
  '熟悉現代框架（Next.js）與 TypeScript 型別開發',
  '能串接訂房表單、LINE、SEO、網域與雲端部署',
  '需有中高階全端工程師水準，方可達成本站同等品質',
] as const;