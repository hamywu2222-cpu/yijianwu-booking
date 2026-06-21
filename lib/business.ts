/** 官網與 Google 商家共用的 NAP（名稱、地址、電話）單一來源 */
/** 分享連結預覽圖（LINE / Facebook / iMessage 縮圖） */
export const SITE_OG_IMAGE = '/images/hero.jpg';
export const SITE_OG_IMAGE_ALT = '一間屋・駅前宿｜福隆車站旁日式民宿';

export const BUSINESS_NAME = '一間屋・駅前宿';
export const BUSINESS_LEGAL_NAME = '一間屋民宿';
export const BUSINESS_REGISTRATION = '新北市民宿152號';

/** Google 商家／地圖正式名稱 */
export const BUSINESS_MAPS_NAME = '福隆一間屋背包客棧';

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

export const BUSINESS_ROOM_COUNT = 5;

/** 在地 SEO 關鍵字（HTML 文案與 JSON-LD 共用） */
export const LOCAL_SEO_KEYWORDS = [
  '福隆青年旅館',
  '福隆背包客棧',
  '新北貢寮住宿',
  '草嶺古道住宿',
  '福隆包棟民宿',
] as const;

const MAP_QUERY = encodeURIComponent(BUSINESS_ADDRESS.full);
const MAP_COORDS = `${BUSINESS_GEO.latitude},${BUSINESS_GEO.longitude}`;

/** Google 商家正式地圖網址（hasMap / sameAs 用） */
const GOOGLE_MAPS_PLACE_URL =
  'https://www.google.com/maps/place/@25.0158858,121.945463,17z/data=!4m6!3m5!1s0x345d5d00f311114b:0x9cc510218a9b628b!8m2!3d25.0158858!4d121.945463!16s%2Fg%2F1thq30lt';

export const BUSINESS_URLS = {
  googleMapsBusiness: GOOGLE_MAPS_PLACE_URL,
  googleMapsShort: 'https://maps.app.goo.gl/qufazd7DVkdem2y37',
  googleMapsSearch: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
  googleMapsPlace: GOOGLE_MAPS_PLACE_URL,
  googleMapsEmbed: `https://maps.google.com/maps?q=${MAP_COORDS}&hl=zh-TW&z=17&output=embed`,
  googleMapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS}&travelmode=walking`,
  facebook: BUSINESS_FACEBOOK.url,
} as const;

/** Google 商家後台可直接貼上的簡介（750 字內） */
export const GMB_DESCRIPTION = `福隆車站出站右轉步行 30 秒即達。一間屋・駅前宿（合法登記：${BUSINESS_REGISTRATION}）提供日式雅房與家庭房，2026 年全新裝潢，環境乾淨舒適。

・和鳴雙人房 NT$1,600/晚（共 4 間）
・和風 4–6 人家庭房 NT$3,200 起（僅 1 間）
・包房（4間和鳴雙人房+1間和風4-6人家庭房）平日 NT$8,800 / 假日 NT$9,200
・入住 15:00 後｜退房 11:00 前
・單車友善停放｜免費 WiFi｜福隆海水浴場步行 5 分鐘

訂房請加入 LINE 官方 ${BUSINESS_LINE.id}，或來電 ${BUSINESS_PHONE.mobile}。
官網：yijianwu-booking.vercel.app`;