/** 每張圖片專屬 alt：描述畫面 + Top5 關鍵字自然融入 */
export const IMAGE_ALT: Record<string, string> = {
  '/images/photo_2026-04-25_01-38-33.jpg':
    '2026年翻新前 福隆民宿一間屋駅前宿 新北海邊住宿一樓舊客房待整建',
  '/images/photo_2026-04-25_01-38-38.jpg':
    '福隆車站住宿翻新前走道 一間屋駅前宿室內原始樣貌',
  '/images/photo_2026-04-26_16-17-21.jpg':
    '東北角民宿一間屋施工前角落 福隆民宿舊設備待拆除',
  '/images/photo_2026-05-01_23-59-02.jpg':
    '2026年5月 福隆民宿一間屋施工中 拆除舊隔間',
  '/images/photo_2026-05-01_23-59-09.jpg':
    '新北海邊住宿翻新現場 福隆民宿木作泥作同步施工',
  '/images/double_room.jpg':
    '福隆民宿和鳴雙人房 福隆車站出站30秒 一間屋駅前宿和式雅房實景',
  '/images/photo_2026-06-18_02-06-05.jpg':
    '福隆海水浴場住宿推薦 一間屋和風4至6人家庭房 兩張雙人床日式空間',
  '/images/facilities.jpg':
    '東北角民宿一間屋 公共交誼區行李空間 福隆單車友善停放',
  '/images/hallway.jpg':
    '福隆民宿溫潤木質走廊 新北海邊住宿一間屋客房區',
  '/images/hallway2.jpg':
    '福隆車站住宿室內通道 一間屋簡潔木質地板米白牆面',
  '/images/hallway3.jpg':
    '福隆民宿走道門牌細節 一間屋駅前宿日式收納設計',
  '/images/bathroom.jpg':
    '福隆民宿共用衛浴 一間屋提供洗髮精沐浴乳香皂',
  '/images/double_room2.jpg':
    '福隆車站住宿和鳴雙人房 一間屋木質床架暖色床單特寫',
  '/images/exterior3.jpg':
    '福隆民宿和鳴雙人房門口 新北海邊住宿一間屋暖色燈光',
  '/images/exterior4.jpg':
    '福隆民宿雙人房側視角 一間屋和式木質地板空間',
  '/images/scenery/fulong-beach-aerial.jpg':
    '福隆海水浴場空拍 新北海邊住宿步行8分鐘金色沙灣',
  '/images/scenery/fulong-station.jpg':
    '福隆火車站 福隆車站住宿一間屋出站30秒即達',
  '/images/scenery/fulong-sandcastle.jpg':
    '福隆海水浴場沙雕城堡 東北角民宿周邊海邊地標',
  '/images/scenery/fulong-sand-sculpture.jpg':
    '福隆沙灘沙雕藝術 福隆海水浴場住宿周邊景點',
  '/images/scenery/fulong-view-from-inn.jpg':
    '福隆民宿一間屋窗外遠眺 新北海邊貢寮山景',
  '/images/scenery/fulong-starbucks.jpg':
    '福隆車站旁黃昏街景 福隆民宿散步休閒角落',
  '/images/scenery/fulong-caoling-loop-sign.jpg':
    '舊草嶺隧道環狀線 東北角民宿出發單車海景路線',
  '/images/scenery/fulong-caoling-tunnel.jpg':
    '舊草嶺隧道內部 福隆民宿單車族必騎經典隧道',
  '/images/scenery/fulong-ring-immersive-art.webp':
    '東北角環狀線光影體驗 福隆海水浴場住宿單車景點',
  '/images/scenery/caoling-tunnel-entrance.jpg':
    '舊草嶺隧道入口 福隆車站住宿出發單車騎行',
  '/images/scenery/caoling-coastal-path.jpg':
    '舊草嶺濱海自行車道 新北海邊住宿山海景觀路段',
  '/images/scenery/maoao-fishing-village.jpg':
    '卯澳漁村海岸 東北角民宿單車路線漁港風光',
  '/images/Mountain1.jpg':
    '草嶺古道石階 福隆民宿出發登山俯瞰東北角海岸',
  '/images/Mountain2.webp':
    '桃源谷草原步道 福隆海水浴場住宿一日遊健行',
  '/images/Mountain3.webp':
    '桃源谷山區道路 東北角民宿山海步道景觀',
  '/images/hero.jpg':
    '福隆民宿一間屋駅前宿 新北海邊住宿福隆車站出站30秒外觀',
};

export function getImageAlt(src: string): string {
  return (
    IMAGE_ALT[src] ??
    '福隆民宿・新北海邊住宿｜一間屋駅前宿・福隆車站住宿・東北角民宿'
  );
}