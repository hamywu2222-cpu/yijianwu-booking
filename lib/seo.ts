/**
 * 台北・新北旅客搜尋「福隆／海邊住宿」前 5 大關鍵字（與一間屋定位最匹配）
 * 1. 福隆民宿        — 在地核心詞，意圖最明確
 * 2. 新北海邊住宿    — 台北/新北出發海邊旅遊主詞
 * 3. 福隆海水浴場住宿 — 玩沙玩水場景詞
 * 4. 福隆車站住宿    — 交通優勢（出站30秒）
 * 5. 東北角民宿      — 區域長尾（含貢寮、草嶺、雙溪）
 */
export const TOP5_REGIONAL_KEYWORDS = [
  '福隆民宿',
  '新北海邊住宿',
  '福隆海水浴場住宿',
  '福隆車站住宿',
  '東北角民宿',
] as const;

export const FULONG_SEO_KEYWORDS = {
  tier1: [...TOP5_REGIONAL_KEYWORDS, '福隆住宿', '福隆車站民宿'],
  tier2: [
    '貢寮民宿',
    '新北貢寮住宿',
    '福隆青年旅館',
    '福隆背包客棧',
    '福隆包棟民宿',
    '福隆日式民宿',
    '新北民宿',
  ],
  tier3: [
    '舊草嶺隧道民宿',
    '草嶺古道住宿',
    '福隆親子民宿',
    '福隆單車住宿',
    '福隆出站住宿',
    'LINE自助入住',
    '一間屋民宿',
  ],
} as const;

export const SITE_SEO_KEYWORDS = [
  ...FULONG_SEO_KEYWORDS.tier1,
  ...FULONG_SEO_KEYWORDS.tier2,
  ...FULONG_SEO_KEYWORDS.tier3,
] as const;

/** 首頁 H1 關鍵字（螢幕閱讀器 + SEO，含 Top5） */
export const HOME_H1_TEXT =
  '福隆民宿・新北海邊住宿｜福隆車站出站30秒・福隆海水浴場住宿・東北角民宿 一間屋·駅前宿';

/**
 * 首頁 Title（核心詞置前 + 轉換誘因，≤60 字）
 * 嵌入：福隆民宿、新北海邊、車站30秒、官網最優惠
 */
export const HOME_PAGE_TITLE =
  '福隆民宿推薦｜新北海邊出站30秒・一間屋駅前宿・官網訂房最優惠';

/**
 * 首頁 Meta Description（轉換字眼 + Top5 關鍵字自然融入）
 */
export const HOME_PAGE_DESCRIPTION =
  '【立即預訂】福隆民宿・新北海邊住宿首選！福隆車站出站30秒，合法日式民宿2026全新裝潢。近福隆海水浴場，東北角民宿最佳落腳處。雙人房平日$1,500、包棟$8,800，官網保證最優惠價，LINE自助入住免櫃檯。';

export const BOOKING_PAGE_TITLE =
  '立即訂房｜福隆民宿官網最優惠・新北海邊住宿・一間屋駅前宿';

export const BOOKING_PAGE_DESCRIPTION =
  '福隆車站住宿線上訂房：查空房、選房型、立即付款。和鳴雙人房平日$1,500、包棟$8,800。官網保證最優惠價，加入LINE @811mszbh自助入住門禁密碼。新北海邊住宿出站30秒。';