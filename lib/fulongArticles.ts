/**
 * 福隆攻略系列文章（獨立 SEO 頁）— 像部落格、讀完導向訂房
 */

export const FULONG_ARTICLE_SERIES = [
  {
    slug: 'day-trip',
    path: '/fulong/day-trip',
    emoji: '☀️',
    shortTitle: '福隆一日遊',
    title: '福隆一日遊攻略｜6 條路線從一間屋出發（不含住宿也能玩）',
    description:
      '福隆一日遊完整攻略：沙灘放空、舊草嶺單車環線、福連潮池與馬崗、南雅南子吝健行等 6 條路線。以福隆車站出站 30 秒「一間屋・駅前宿」為起迄，標交通時間，玩完想過夜再訂房。',
    keywords: [
      '福隆一日遊',
      '福隆1日遊',
      '福隆行程',
      '福隆怎麼玩',
      '東北角一日遊',
      '福隆旅遊攻略',
    ] as const,
    heroImage: '/images/scenery/fulong-beach-aerial.jpg',
    lead: '只有一天也夠玩——以車站旁的一間屋為起點與終點，行李可寄放，晚上若想留下來再訂房。',
  },
  {
    slug: 'bike',
    path: '/fulong/bike',
    emoji: '🚴',
    shortTitle: '舊草嶺單車',
    title: '舊草嶺隧道單車攻略｜環線 18–22 km・三貂角・從一間屋出發',
    description:
      '舊草嶺隧道與環狀自行車道攻略：車站旁租車、隧道往返與全環線、三貂角燈塔與卯澳串遊。福隆一間屋出站 30 秒，騎完回房沖澡最方便，單車客與親子友善。',
    keywords: [
      '舊草嶺隧道',
      '舊草嶺單車',
      '福隆單車',
      '福隆腳踏車',
      '三貂角燈塔',
      '福隆環狀線',
    ] as const,
    heroImage: '/images/scenery/fulong-caoling-tunnel.jpg',
    lead: '福隆最強節奏：車站租車 → 山進海出 → 回一間屋沖澡。環線可串三貂角、馬崗、卯澳。',
  },
  {
    slug: 'water',
    path: '/fulong/water',
    emoji: '🤿',
    shortTitle: '玩水・浮潛',
    title: '福隆玩水浮潛攻略｜海水浴場・福連潮池・馬崗潮間帶・龍洞',
    description:
      '福隆玩水與浮潛攻略：海水浴場步行即達、福連國小潮池、馬崗潮間帶、卯澳與龍洞。以一間屋為 overnight 基地，對潮汐、安全提醒與交通一次整理。',
    keywords: [
      '福隆海水浴場',
      '福連潮池',
      '馬崗潮間帶',
      '卯澳浮潛',
      '龍洞海洋公園',
      '福隆玩水',
    ] as const,
    heroImage: '/images/scenery/fulian-tide-pool-1.jpg',
    lead: '從步行即達的金沙灘，到需對潮汐的潮池與潮間帶——玩完走回車站旁 overnight 最輕鬆。',
  },
] as const;

export type FulongArticleSlug = (typeof FULONG_ARTICLE_SERIES)[number]['slug'];

export function getFulongArticle(slug: FulongArticleSlug) {
  const article = FULONG_ARTICLE_SERIES.find((a) => a.slug === slug);
  if (!article) throw new Error(`Unknown fulong article: ${slug}`);
  return article;
}
