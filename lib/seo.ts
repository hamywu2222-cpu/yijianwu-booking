/**
 * 2026 年 8 月「福隆車站旁民宿」搜尋主詞（對標福容、地球人、海都）
 * 1. 福隆車站民宿        — 沒開車／出站最近，一間屋最能贏
 * 2. 福隆車站住宿        — Trip.com 2026 榜單主詞
 * 3. 福隆民宿            — 大流量核心詞
 * 4. 福隆車站附近住宿    — 地圖／比價長尾
 * 5. 新北海邊住宿        — 台北出發海邊旅遊
 */
export const TOP5_REGIONAL_KEYWORDS = [
  '福隆車站民宿',
  '福隆車站住宿',
  '福隆民宿',
  '福隆車站附近住宿',
  '新北海邊住宿',
] as const;

export const FULONG_SEO_KEYWORDS = {
  tier1: [...TOP5_REGIONAL_KEYWORDS, '福隆住宿', '福隆海水浴場住宿', '東北角民宿'],
  tier2: [
    '貢寮民宿',
    '新北貢寮住宿',
    '福隆青年旅館',
    '福隆背包客棧',
    '福隆包棟民宿',
    '福隆日式民宿',
    '福隆火車站民宿',
    '2026福隆住宿',
    '新北民宿',
  ],
  tier3: [
    '舊草嶺隧道民宿',
    '草嶺古道住宿',
    '福隆親子民宿',
    '福隆單車住宿',
    '福隆出站住宿',
    '沒開車福隆住宿',
    '雙北月票福隆',
    'LINE自助入住',
    '一間屋民宿',
  ],
  /** 攻略頁／景點長尾（含舊搜尋詞） */
  guide: [
    '福隆旅遊攻略',
    '福隆攻略',
    '福隆怎麼玩',
    '福隆一日遊',
    '福隆兩天一夜',
    '福隆景點',
    '福隆行程',
    '舊草嶺隧道',
    '福隆海水浴場',
    '東北角一日遊',
  ],
} as const;

export const SITE_SEO_KEYWORDS = [
  ...FULONG_SEO_KEYWORDS.tier1,
  ...FULONG_SEO_KEYWORDS.tier2,
  ...FULONG_SEO_KEYWORDS.tier3,
] as const;

/** 首頁 H1 關鍵字（螢幕閱讀器 + SEO，含 2026 車站主詞） */
export const HOME_H1_TEXT =
  '福隆車站民宿｜出站步行30秒・2026全新裝潢・一間屋·駅前宿';

/**
 * 首頁 Title（車站主詞置前，約 28 字）
 */
export const HOME_PAGE_TITLE =
  '福隆車站民宿｜出站步行30秒・2026全新裝潢・一間屋';

/**
 * 首頁 Meta Description（沒開車＋最近＋價格＋合法）
 */
export const HOME_PAGE_DESCRIPTION =
  '福隆車站民宿首選：出站步行約30秒即達一間屋・駅前宿。2026全新裝潢日式民宿，合法登記新北市民宿152號。沒開車、拖行李也能輕鬆入住；近福隆海水浴場、舊草嶺隧道。雙人房平日$1,500，官網直訂最優惠，LINE @811mszbh 自助入住。';

export const BOOKING_PAGE_TITLE =
  '立即訂房｜福隆車站民宿官網最優惠・出站30秒・一間屋';

export const BOOKING_PAGE_DESCRIPTION =
  '福隆車站附近住宿線上訂房：查空房、選房型、立即付款。出站步行約30秒。和鳴雙人房平日$1,500、包棟$8,800。官網保證最優惠，LINE @811mszbh 自助入住。';