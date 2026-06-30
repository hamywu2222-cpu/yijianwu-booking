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
    caption: '步行 8 分鐘 · 金色沙灣與湛藍海線',
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
    src: '/images/scenery/fulong-ring-immersive-art.webp',
    title: '環狀線沿途體驗',
    caption: '東北角單車之旅，沿途特色景點豐富',
  },
  {
    src: '/images/scenery/fulong-starbucks.jpg',
    title: '福隆夜色',
    caption: '車站旁休閒角落，散步即可抵達',
  },
];

/** 和鳴雙人房實景照片 — public/images/ROOMS */
export const DOUBLE_ROOM_IMAGES = [
  '/images/ROOMS/photo_2026-06-30_20-31-57.jpg',
  '/images/ROOMS/photo_2026-06-30_20-32-17.jpg',
  '/images/ROOMS/photo_2026-06-30_20-32-21.jpg',
  '/images/ROOMS/photo_2026-06-30_20-32-24.jpg',
  '/images/ROOMS/photo_2026-06-30_20-32-27.jpg',
  '/images/ROOMS/photo_2026-06-30_20-32-32.jpg',
] as const;

/** 和風 4–6 人家庭房實景照片 — public/images/4-6ROOMS */
export const FAMILY_ROOM_IMAGES = [
  '/images/4-6ROOMS/photo_2026-06-30_21-55-08.jpg',
  '/images/4-6ROOMS/photo_2026-06-30_21-55-00.jpg',
] as const;

export const ROOM_VIDEOS = {
  double: {
    poster: DOUBLE_ROOM_IMAGES[0],
    label: '和鳴 · 雙人房實景',
    sources: ['/videos/double-room-1.mp4', '/videos/double-room-2.mp4', '/videos/family-room-1.mp4'],
  },
  family: {
    poster: FAMILY_ROOM_IMAGES[0],
    label: '和風4-6人家庭房實景',
    sources: ['/videos/family-room-2.mp4'],
  },
} as const;

/** 福隆風景區塊 — 與上方相簿不重複的戶外友善說明 */
export const FULONG_SECTION = {
  intro: '住一間屋，福隆山海風光、單車路線與桃源谷登山都在門外。',
} as const;

export type OutdoorRouteItem = {
  image: string;
  name: string;
  badge: string;
  meta: string;
  desc: string;
};

export const OUTDOOR_FRIENDLY = {
  eyebrow: '單車 · 戶外友善',
  title: '單車騎行 · 登山健行',
  intro:
    '福隆車站前出發，舊草嶺環狀線與桃源谷登山都方便。室內遮雨單車停放，騎完直接停好。',
  cycling: {
    title: '舊草嶺環狀線',
    intro: '全長約 18.5 km，1 級親子路線。福隆出發繞三貂角，多為自行車專用道。',
    routes: [
      {
        image: '/images/scenery/caoling-tunnel-entrance.jpg',
        name: '福隆 → 舊草嶺隧道',
        badge: '起點',
        meta: '約 2.2 km · 百年鐵道隧道',
        desc: '從福隆車站出發，舊草嶺隧道入口啟程，穿越音樂光廊經典首段。',
      },
      {
        image: '/images/scenery/caoling-coastal-path.jpg',
        name: '沿海專用道 · 三貂角',
        badge: '推薦',
        meta: '環繞台灣極東點 · 海景騎行',
        desc: '舊草嶺濱海步道一路看海，繞向三貂角燈塔，藍天碧海相伴。',
      },
      {
        image: '/images/scenery/maoao-fishing-village.jpg',
        name: '卯澳漁港 → 回福隆',
        badge: '一日遊',
        meta: '卯澳漁村 · 馬崗漁港風光',
        desc: '經卯澳漁村與漁港巷弄，沿環狀線騎回福隆，適合搭配便當一日完騎。',
      },
    ] satisfies OutdoorRouteItem[],
  },
  hiking: {
    title: '桃源谷｜海景大草原',
    intro: '東北角經典草原步道，遠眺太平洋與龜山島，海拔約 500m。',
    routes: [
      {
        image: '/images/Mountain2.webp',
        name: '內寮線',
        badge: '最輕鬆',
        meta: '往返 1–2 km · 約 40 分～1 小時',
        desc: '適合新手、親子半日遊，草原野餐即回。',
      },
      {
        image: '/images/Mountain1.jpg',
        name: '草嶺古道 → 桃源谷',
        badge: '推薦',
        meta: '可從福隆出發 · 來回約 8–9 km',
        desc: '經草嶺古道接桃源谷草嶺線，一日挑戰路線。',
      },
      {
        image: '/images/Mountain3.webp',
        name: '石觀音 · 大溪線',
        badge: '進階',
        meta: '往返 7–10 km · 約 5–8 小時',
        desc: '階梯多、爬升明顯，適合體力充足的健行者。',
      },
    ] satisfies OutdoorRouteItem[],
  },
} as const;

/** 簡介區塊 — 入住重要配套（緊湊標籤呈現） */
export const ABOUT_AMENITIES = [
  { icon: '🚲', label: '單車專屬停放區' },
  { icon: '🧳', label: '房客行李寄放服務' },
  { icon: '❄️', label: '獨立冷氣' },
  { icon: '📶', label: '免費 WiFi' },
  { icon: '🚿', label: '公共衛浴（洗髮精・沐浴乳・香皂）' },
  { icon: '💨', label: '每間房一台吹風機' },
  { icon: '🥿', label: '民宿內拖鞋' },
  { icon: '♻️', label: '不供一次性用品（提倡環保）' },
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
    desc: '響應式排版，一鍵撥號、線上訂房與 LINE 門禁通知在手機上完整可用',
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