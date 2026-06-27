/**
 * 福隆民宿 SEO 關鍵字策略（依搜尋意圖與競品標題整理）
 * Tier 1：高搜尋量核心詞｜Tier 2：房型／場景詞｜Tier 3：長尾詞
 */
export const FULONG_SEO_KEYWORDS = {
  tier1: [
    '福隆民宿',
    '福隆住宿',
    '福隆車站民宿',
    '福隆車站住宿',
    '福隆火車站住宿',
  ],
  tier2: [
    '福隆青年旅館',
    '福隆背包客棧',
    '福隆包棟',
    '福隆包棟民宿',
    '福隆海水浴場住宿',
    '貢寮民宿',
    '新北貢寮住宿',
    '福隆日式民宿',
  ],
  tier3: [
    '舊草嶺隧道民宿',
    '草嶺古道住宿',
    '福隆親子民宿',
    '福隆單車住宿',
    '福隆出站住宿',
    '福隆近車站住宿',
    '福隆平價住宿',
    '一間屋民宿',
    '駅前宿',
  ],
} as const;

export const SITE_SEO_KEYWORDS = [
  ...FULONG_SEO_KEYWORDS.tier1,
  ...FULONG_SEO_KEYWORDS.tier2,
  ...FULONG_SEO_KEYWORDS.tier3,
] as const;

/** 首頁 Title（≤60 字元，核心詞置前） */
export const HOME_PAGE_TITLE =
  '福隆出站30秒 一間屋·駅前宿 | 日式民宿 官網訂房享最大優惠';

/** 首頁 Meta Description（120–155 字元，涵蓋高搜尋詞 + 轉換賣點） */
export const HOME_PAGE_DESCRIPTION =
  '福隆民宿近車站，出站步行30秒即達一間屋·駅前宿（合法民宿）。2026全新裝潢日式雅房，和鳴雙人房、家庭房與包棟方案。官網訂房享最大優惠，加入LINE自助入住取得門禁密碼。單車友善，近福隆海水浴場、舊草嶺隧道。';

export const BOOKING_PAGE_TITLE = '福隆民宿線上訂房 | 官網訂房享最大優惠・一間屋駅前宿';

export const BOOKING_PAGE_DESCRIPTION =
  '福隆車站民宿一間屋·駅前宿官網訂房：查空房、選房型、線上付款。和鳴雙人房平日$1,500、包棟$8,800起。加入LINE @811mszbh自助入住門禁密碼。福隆住宿近車站出站30秒。';