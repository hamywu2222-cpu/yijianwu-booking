/**
 * 星空×藝素村 — 一間屋攻略用資料
 * 用餐、手作、戶外行程皆須事先預約；週三、週四公休。
 */

export const SKYART = {
  name: '星空×藝素村',
  url: 'https://fulongskyartvegan.com/',
  eyebrow: '福隆山上純素',
  question: '想吃福隆山上純素嗎？',
  lead:
    '福隆火車站沿東興街上山約二十分鐘。純素料理、海廢手作與山海星光。住在車站旁，行李先放下再上山最從容。',
  hint: '須事先預約 · 週三週四公休',
  walkNote: '一間屋出發步行約 20 分；亦可向藝素村預約付費接送。',
  detailNote: '詳細時段、票價、集合點與線上報名，請看星空×藝素村官網。本頁只說明如何搭配一間屋住宿。',
  closed: '週三、週四公休；餐廳當日不接受訂位（請至少提前一天 LINE）。',
  address: '新北市貢寮區福隆里東興街1-1號',
} as const;

export const SKYART_BOOKING = {
  dining: {
    label: 'LINE 預約用餐',
    url: 'https://fulongskyartvegan.com/#booking',
    note: '純素料理請至少提前一天透過藝素村官方 LINE 預約；當日不提供預約。',
  },
  experiences: {
    label: '官網報名體驗',
    url: 'https://fulongskyartvegan.com/',
    note: '浪濤海玻璃、抹茶秘境、園區手作皆在藝素村官網線上報名；活動 24 小時前可免費取消。',
  },
} as const;

export const SKYART_EXPERIENCES = [
  {
    id: 'dining',
    emoji: '🌿',
    name: '純素餐桌',
    hint: '須提前一天 LINE',
    time: '時段見官網',
    where: '園區內',
    href: 'https://fulongskyartvegan.com/#dining',
    image: '/images/skyart/hero.jpg',
    blurb: '不含蛋、奶、五辛、蜂蜜。行李可先放一間屋再上山。',
  },
  {
    id: 'handmade',
    emoji: '🎨',
    name: '園區手作',
    hint: '須官網報名',
    time: '時段與票價見官網',
    where: '園區內完成，不必下海',
    href: 'https://fulongskyartvegan.com/#handmade',
    image: '/images/skyart/handmade.jpg',
    blurb: '盆栽、夜燈、浮球。詳細流程請看藝素村官網。',
  },
  {
    id: 'sea-glass',
    emoji: '💎',
    name: '東北角浪濤海玻璃',
    hint: '車站旁集合',
    time: '時段見官網',
    where: '距一間屋步行約 2–4 分',
    href: 'https://fulongskyartvegan.com/#sea-glass',
    image: '/images/skyart/sea-glass.jpg',
    blurb: '集合點幾乎在民宿門口。詳細行程請看藝素村官網。',
  },
  {
    id: 'matcha',
    emoji: '🍵',
    name: '抹茶秘境赤腳行',
    hint: '秋季限定',
    time: '時段見官網',
    where: '福隆火車站集合（出站 30 秒）',
    href: 'https://fulongskyartvegan.com/#matcha',
    image: '/images/skyart/matcha.jpg',
    blurb: '從火車站出發，前一晚住一間屋最順。',
  },
] as const;
