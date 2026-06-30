/** 官網與 Google 商家共用的 NAP（名稱、地址、電話）單一來源 */
/** 分享連結預覽圖（LINE / Facebook / iMessage 縮圖） */
export const SITE_OG_IMAGE = '/images/hero.jpg';
export const SITE_OG_IMAGE_ALT =
  '福隆民宿・新北海邊住宿｜一間屋駅前宿・福隆車站出站30秒・東北角民宿';
/** 與 public/images/hero.jpg 實際尺寸一致，供 OG / Twitter meta 使用 */
export const SITE_OG_IMAGE_WIDTH = 1280;
export const SITE_OG_IMAGE_HEIGHT = 853;

/** Google 商家「查詢空房」、對外正式訂房頁（請用此網址，勿用首頁 /#booking） */
export const OFFICIAL_BOOKING_PAGE_URL = 'https://onehouse.asia/booking';

export const BUSINESS_NAME = '一間屋・駅前宿';
export const BUSINESS_NAME_EN = 'OneHouse Backpacker';
/** Schema / 對外完整品牌名（中英並列） */
export const BUSINESS_DISPLAY_NAME = '一間屋・駅前宿 OneHouse Backpacker';
export const BUSINESS_LEGAL_NAME = '一間屋民宿';
export const BUSINESS_REGISTRATION = '新北市民宿152號';

/** Google 商家／地圖正式名稱（駅前宿檔案，非舊版「背包客棧 Area」） */
export const BUSINESS_MAPS_NAME =
  '福隆出站30秒｜一間屋·駅前宿 OneHouse Backpacker';

/** Google Places API 正式 Place ID（對應 Google Travel 商家檔案） */
export const GOOGLE_PLACE_ID = 'ChIJN2tYluJdXTQRD288urUGwmM';

/** Google Travel 評價頁（客人分享／查看全部評價用） */
export const GOOGLE_TRAVEL_REVIEWS_URL =
  'https://www.google.com/travel/hotels/entity/CgoIj97x0dvWgeFjEAE/reviews';

export const BUSINESS_ADDRESS = {
  full: '新北市貢寮區福隆街2巷1-2號',
  street: '福隆街2巷1-2號',
  locality: '貢寮區',
  region: '新北市',
  postalCode: '228',
  country: 'TW',
} as const;

export const BUSINESS_PHONE = {
  mobile: '0912-362-533',
  mobileTel: '0912362533',
  mobileE164: '+886-912-362-533',
  landline: '02-24992161',
  landlineTel: '0224992161',
  landlineE164: '+886-2-24992161',
  /** 手機一鍵撥號（所有 <a href> 請用此值） */
  mobileHref: 'tel:0912362533',
  landlineHref: 'tel:0224992161',
} as const;

export const BUSINESS_LINE = {
  id: '@811mszbh',
  url: 'https://line.me/ti/p/@811mszbh',
  /** 官網上 LINE 的主要用途（訂房改走奧丁丁） */
  accessNote: '加入官方 LINE，入住前自動收到門禁密碼',
} as const;

/** Airbnb 房源（使用無追蹤參數的乾淨連結，手機可順暢跳轉 App） */
export const AIRBNB_BOOKING = {
  url: 'https://www.airbnb.com.tw/rooms/1703072956956615756',
  label: 'Airbnb 訂房',
  note: '亦可透過 Airbnb 預訂；手機有安裝 App 會自動詢問開啟',
} as const;

/** 包房（包棟）下單規則 — 官網文案單一來源 */
export const PACKAGE_BOOKING = {
  comfortMin: 12,
  comfortMax: 14,
  /** 奧丁丁下單時超過舒適人數，人數欄請填此值 */
  orderAdultCap: 14,
  maxPeople: 18,
  extraPerPerson: 600,
  remarkExample: '實際共 16 人，超出 14 人 2 人',
} as const;

/** 奧丁丁人數欄位下方說明 — 官網訂房表單共用 */
export const PACKAGE_ADULTS_FIELD_NOTE = `包房超過 ${PACKAGE_BOOKING.orderAdultCap} 人：請填 ${PACKAGE_BOOKING.orderAdultCap} 人下單，並於備註寫實際人數（超出每人 +${PACKAGE_BOOKING.extraPerPerson}，最多 ${PACKAGE_BOOKING.maxPeople} 人）`;

/** 舊版 Google 表單包房人數說明 — BookingForm 共用 */
export const PACKAGE_FORM_PEOPLE_HINT = `舒適建議 ${PACKAGE_BOOKING.comfortMin}–${PACKAGE_BOOKING.comfortMax} 人，最多 ${PACKAGE_BOOKING.maxPeople} 人。超過 ${PACKAGE_BOOKING.orderAdultCap} 人請填 ${PACKAGE_BOOKING.orderAdultCap} 人下單，備註寫實際共幾人（超出每人 +NT$${PACKAGE_BOOKING.extraPerPerson}）`;

/** 房型區塊文案 — 官網單一來源 */
export const ROOMS_SECTION = {
  title: '房型與包房',
  sharedNote: '盥洗用品、每房吹風機、民宿內拖鞋，不供一次性用品，單車友善。',
  double: {
    title: '和鳴 · 雙人房',
    subtitle: '共 4 間，格局大小都相同',
    note: '簡約和式雅房，木質溫潤、寧靜留白。2026 年 5 月全新裝潢，適合情侶、好友或獨旅，享受車站旁難得的安靜夜晚。',
    tags: ['2 張單人床', '2 人', '衛浴共用', '民宿內拖鞋'] as const,
    priceNote: '2 人入住',
    pricing: {
      weekday: { label: '平日', original: 'NT$2,000', sale: 'NT$1,500' },
      holiday: { label: '假日', original: 'NT$2,100', sale: 'NT$1,600' },
    },
  },
  family: {
    title: '和風4-6人家庭房',
    badge: '僅此1間',
    note: '寬敞和風家庭房，空間從容、采光舒適。適合家庭與好友小團體，在福隆住得自在安靜。',
    tags: ['2 張雙人床', '4–6 人', '衛浴共用', '民宿內拖鞋'] as const,
    priceNote: '4 人起價',
    extraNote: '每加 1 人 +NT$600（最多 6 人）',
    pricing: {
      weekday: { label: '平日', original: 'NT$4,000', sale: 'NT$3,000' },
      holiday: { label: '假日', original: 'NT$4,200', sale: 'NT$3,200' },
    },
  },
} as const;

/** 全館包房區塊文案 — 官網單一來源 */
export const PACKAGE_SECTION = {
  eyebrow: 'WHOLE HOUSE RENTAL',
  title: '一間屋．全館包房優惠方案（共 5 間）',
  intro: '一次打包全館空間，非常適合家庭聚會、團體旅遊、單車隊或公司行號包棟！',
  highlights: [
    '客房配置：和鳴雙人房 × 4 間 ＋ 和風 4–6 人家庭房 × 1 間（全館共用衛浴）。',
    `容納人數：舒適建議 ${PACKAGE_BOOKING.comfortMin}–${PACKAGE_BOOKING.comfortMax} 人（上限最多 ${PACKAGE_BOOKING.maxPeople} 人）。`,
    '貼心提供：衛浴用品、每房獨立吹風機。',
  ],
  ecoNote: '為響應環保，不提供一次性消耗用品，請記得自備牙刷刮鬍刀喔！',
  priceNote: '價格固定（特殊活動日另詢）。單車停放空間充足。',
} as const;

/** 奧丁丁 OwlNest 官網訂房引擎（可被 NEXT_PUBLIC_OWLNEST_BOOKING_URL 覆寫） */
export const OWLNEST_BOOKING = {
  url: 'https://www.booking-owlnest.com/yijianwu?lang=zh_TW&adult=1&child=0&infant=0',
  sections: {
    guest: {
      title: '人數與房型說明（請確認人數後再訂房）',
      lines: [
        '和鳴雙人房｜建議 2 人。平日 $1,500 / 假日 $1,600。可加 1 人（+$600，含日式軟墊/枕頭/毯子）。',
        '4–6人家庭房｜4 人起：平日 $3,000 / 假日 $3,200，每加 1 人 +$600（超過 6 人請斟酌）。',
      ],
    },
    booking: {
      title: '訂房小提醒與包房規則',
      availabilityHighlight: {
        title: '有空房嗎？進訂房頁一看就知道',
        steps: [
          '先在下方選好入住、退房日期與人數。',
          '點「點我訂房最高優惠」進入選房頁面。',
          '若看得到房型且可以選擇，代表當天有空房，請直接完成預訂。',
        ],
        note: '若完全找不到可選房型，表示當天已售完。',
      },
      lines: [
        '想包房（全館 5 間）請滑到最下方選擇；若無選項代表當天已被分開預訂。',
        `人數限制｜舒適建議 ${PACKAGE_BOOKING.comfortMin}–${PACKAGE_BOOKING.comfortMax} 人，最多收 ${PACKAGE_BOOKING.maxPeople} 人。`,
      ],
      stepsTitle: '超過 14 人下單三步驟：',
      steps: [
        '下單時人數請選 14 人直接完成訂房。',
        '備註欄註明實際總人數（例：實際共 16 人，超出 2 人）。',
        `超出 14 人的部分，每多 1 人現場 +$${PACKAGE_BOOKING.extraPerPerson}。`,
      ],
    },
  },
} as const;

/** 官網訂房按鈕與說明文案（單一來源） */
export const BOOKING_CTA = {
  jump: '點我訂房最高優惠',
  /** 手機固定列等窄空間用 */
  jumpShort: '點我訂房最高優惠',
  action: '點我訂房最高優惠',
  intro: '選好日期與人數，即可查空房、選房型並完成付款（含包房優惠方案，舒適建議人數 12–14）。',
  note: '點擊後在新分頁完成訂房與刷卡',
  sectionTitle: '線上訂房付款',
  sectionSubtitle: '選日期與人數，查空房、選房型並完成付款',
  package: '點我訂房最高優惠',
} as const;

export const BUSINESS_FACEBOOK = {
  url: 'https://www.facebook.com/onekitchenandhostel/',
  name: '一間廚房 & 背包客棧',
} as const;

/** Google 地圖商家精確座標（與 Google 商家檔案一致） */
export const BUSINESS_GEO = {
  latitude: 25.0158858,
  longitude: 121.945463,
} as const;

export const BUSINESS_HOURS = {
  checkIn: '15:00',
  checkOut: '11:00',
  /** 客服／訂房聯絡時段（供 Google 商家營業時間參考） */
  contact: { opens: '09:00', closes: '21:00' },
} as const;

/** 訂房 FAQ — 官網文案與 FAQPage 結構化資料共用 */
export const BOOKING_FAQ = [
  {
    question: '如何確認一間屋當天有空房？',
    answer:
      '請至官網訂房頁選擇入住與退房日期。訂房頁上房型可選表示有空房；若看不到可選房型，表示當天已無空房。',
  },
  {
    question: '如何預訂全館包房（5 間）？超過 14 人怎麼下單？',
    answer: `於官網訂房頁選好日期後，滑到最下方查看包房選項。舒適建議 ${PACKAGE_BOOKING.comfortMin}–${PACKAGE_BOOKING.comfortMax} 人，最多 ${PACKAGE_BOOKING.maxPeople} 人。若超過 ${PACKAGE_BOOKING.orderAdultCap} 人，下單時人數請填 ${PACKAGE_BOOKING.orderAdultCap} 人，並在備註寫實際共幾人；超出 ${PACKAGE_BOOKING.orderAdultCap} 人部分，每多 1 人 +NT$${PACKAGE_BOOKING.extraPerPerson}（備註範例：${PACKAGE_BOOKING.remarkExample}）。`,
  },
  {
    question: '和鳴雙人房可以住幾人？加人如何計費？',
    answer:
      '和鳴雙人房舒適建議 2 人，官網優惠價平日 NT$1,500 / 假日 NT$1,600。若要多加 1 人，每人加 NT$600，並提供日式軟墊、枕頭、毯子。',
  },
  {
    question: '和風 4–6 人家庭房如何計價？',
    answer:
      '4 人起基本價平日 NT$3,000 / 假日 NT$3,200，每增加 1 人加 NT$600（最多 6 人）。舒適建議 4–6 人，超過請自行斟酌空間與寢具安排。',
  },
  {
    question: '入住與退房時間是幾點？',
    answer: `入住時間 ${BUSINESS_HOURS.checkIn} 後，退房時間 ${BUSINESS_HOURS.checkOut} 前。`,
  },
  {
    question: '訂房後如何取得門禁密碼？',
    answer: `完成訂房後，請加入 LINE 官方 ${BUSINESS_LINE.id}，入住前將自動收到門禁密碼與入住資訊。`,
  },
  {
    question: '入住前後可以寄放行李嗎？',
    answer:
      '可以。一間屋提供房客行李寄放服務，入住前後如需暫放，歡迎事先透過 LINE 或電話洽詢安排。',
  },
] as const;

export const BUSINESS_ROOM_COUNT = 5;

/** 在地 SEO 關鍵字（HTML 文案與 JSON-LD 共用） */
export const LOCAL_SEO_KEYWORDS = [
  '福隆民宿',
  '新北海邊住宿',
  '福隆海水浴場住宿',
  '福隆車站住宿',
  '東北角民宿',
  '福隆住宿',
  '福隆車站民宿',
  '貢寮民宿',
  '新北貢寮住宿',
  '福隆青年旅館',
  '福隆包棟民宿',
  '草嶺古道住宿',
  '舊草嶺隧道民宿',
] as const;

const MAP_COORDS = `${BUSINESS_GEO.latitude},${BUSINESS_GEO.longitude}`;

/** Google 商家檔案正式連結（地址／地圖按鈕／導航統一導向） */
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://maps.app.goo.gl/Hp4it2im1FD88NbeA';

export const BUSINESS_URLS = {
  googleMapsBusiness: GOOGLE_BUSINESS_PROFILE_URL,
  googleMapsShort: GOOGLE_BUSINESS_PROFILE_URL,
  googleMapsSearch: GOOGLE_BUSINESS_PROFILE_URL,
  googleMapsPlace: GOOGLE_BUSINESS_PROFILE_URL,
  googleMapsEmbed: `https://maps.google.com/maps?q=${MAP_COORDS}&hl=zh-TW&z=17&output=embed`,
  googleMapsDirections: GOOGLE_BUSINESS_PROFILE_URL,
  facebook: BUSINESS_FACEBOOK.url,
} as const;

/** Schema.org 房型與價格 — 官網與 JSON-LD 單一來源 */
export const ROOM_TYPES = [
  {
    slug: 'double' as const,
    name: '和鳴雙人房',
    description:
      '簡約和式雅房，木質溫潤、寧靜留白。2026 年 5 月全新裝潢，適合情侶、好友或獨旅。',
    weekdayPrice: 1500,
    weekendPrice: 1600,
    path: '/rooms/double',
  },
  {
    slug: 'family' as const,
    name: '和風4-6人家庭房',
    description:
      '寬敞和風家庭房，空間從容、采光舒適。適合家庭與好友小團體，在福隆住得自在安靜。',
    weekdayPrice: 3000,
    weekendPrice: 3200,
    path: '/rooms/family',
  },
  {
    slug: 'package' as const,
    name: '一間屋包房優惠方案',
    description:
      '一次打包全館 5 間空間，適合家庭聚會、團體旅遊、單車隊或公司行號包棟。',
    weekdayPrice: 8800,
    weekendPrice: 9200,
    path: '/rooms/package',
  },
] as const;

/** Schema.org 周邊景點 — 福隆海水浴場、舊草嶺隧道 */
export const FULONG_ATTRACTIONS = [
  {
    id: 'fulong-beach',
    name: '福隆海水浴場',
    description:
      '從一間屋步行約 8 分鐘即可抵達，金色沙灣與湛藍海線是福隆最具代表性的海灘。',
    url: 'https://www.necoast-nsa.gov.tw/',
  },
  {
    id: 'caoling-tunnel',
    name: '舊草嶺隧道',
    description:
      '台灣第一條鐵路隧道，單車約 15 分鐘即可抵達，是舊草嶺隧道環狀線經典路段。',
    url: 'https://www.necoast-nsa.gov.tw/',
  },
] as const;

export const GMB_DESCRIPTION = `福隆車站出站右轉步行 30 秒即達。一間屋・駅前宿（合法登記：${BUSINESS_REGISTRATION}）提供日式雅房與家庭房，2026 年全新裝潢，環境乾淨舒適。

・和鳴雙人房 平日 NT$1,500 / 假日 NT$1,600（共 4 間）
・和風 4–6 人家庭房 平日 NT$3,000起 / 假日 NT$3,200起（僅 1 間）
・一間屋包房優惠方案(5間)（4間和鳴雙人房+1間和風4-6人家庭房）平日 NT$8,800 / 假日 NT$9,200｜舒適建議人數 12–14
・入住 15:00 後｜退房 11:00 前
・單車友善停放｜免費 WiFi｜福隆海水浴場步行 8 分鐘

線上訂房：${OFFICIAL_BOOKING_PAGE_URL}
加入 LINE 官方 ${BUSINESS_LINE.id} 接收入住門禁密碼。急事來電 ${BUSINESS_PHONE.mobile}。`;