/** 官網與 Google 商家共用的 NAP（名稱、地址、電話）單一來源 */
export const BUSINESS_NAME = '一間屋・駅前宿';
export const BUSINESS_LEGAL_NAME = '一間屋民宿';
export const BUSINESS_REGISTRATION = '新北市民宿152號';

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
} as const;

export const BUSINESS_LINE = {
  id: '@811mszbh',
  url: 'https://line.me/ti/p/@811mszbh',
} as const;

export const BUSINESS_GEO = {
  latitude: 25.021,
  longitude: 121.9443,
} as const;

export const BUSINESS_HOURS = {
  checkIn: '15:00',
  checkOut: '11:00',
  /** 客服／訂房聯絡時段（供 Google 商家營業時間參考） */
  contact: { opens: '09:00', closes: '21:00' },
} as const;

export const BUSINESS_ROOM_COUNT = 5;

const MAP_QUERY = encodeURIComponent(BUSINESS_ADDRESS.full);

export const BUSINESS_URLS = {
  googleMapsSearch: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
  googleMapsPlace: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS_NAME} ${BUSINESS_ADDRESS.full}`)}`,
  googleMapsEmbed: `https://maps.google.com/maps?q=${MAP_QUERY}&hl=zh-TW&z=17&output=embed`,
  googleMapsDirections: `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}&travelmode=walking`,
  taiwanStay: 'https://www.taiwanstay.net.tw/TSA/web_page/TSA020200.jsp?hohi_id=3078',
  facebook: 'https://www.facebook.com/onekitchenandhostel/',
} as const;

/** Google 商家後台可直接貼上的簡介（750 字內） */
export const GMB_DESCRIPTION = `福隆車站出站右轉步行 30 秒即達。一間屋・駅前宿（合法登記：${BUSINESS_REGISTRATION}）提供日式雅房與家庭房，2026 年全新裝潢，環境乾淨舒適。

・和鳴雙人房 NT$1,600/晚（共 4 間）
・和風 4–6 人家庭房 NT$3,200 起（僅 1 間）
・包房平日 NT$8,800 / 假日 NT$9,200
・入住 15:00 後｜退房 11:00 前
・單車友善停放｜免費 WiFi｜福隆海水浴場步行 5 分鐘

訂房請加入 LINE 官方 ${BUSINESS_LINE.id}，或來電 ${BUSINESS_PHONE.mobile}。
官網：yijianwu-website.vercel.app`;