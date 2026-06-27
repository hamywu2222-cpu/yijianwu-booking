/** 每張圖片專屬 alt：描述畫面內容，關鍵字自然帶入、不重複堆砌 */
export const IMAGE_ALT: Record<string, string> = {
  '/images/photo_2026-04-25_01-38-33.jpg':
    '2026年4月施工前 福隆車站旁一間屋駅前宿 一樓舊式客房空間待重新整建',
  '/images/photo_2026-04-25_01-38-38.jpg':
    '福隆民宿翻新前室內走道 一間屋駅前宿牆面與地坪保留原始樣貌',
  '/images/photo_2026-04-26_16-17-21.jpg':
    '一間屋駅前宿施工前角落 福隆車站民宿舊管線與設備待拆除',
  '/images/photo_2026-05-01_23-59-02.jpg':
    '2026年5月施工中 福隆一間屋民宿工人拆除舊隔間與裝潢',
  '/images/photo_2026-05-01_23-59-09.jpg':
    '福隆車站民宿翻新進行中 一間屋木作與泥作同步施工現場',
  '/images/double_room.jpg':
    '福隆車站出站30秒 一間屋駅前宿 和鳴雙人房實景 原木和式雅房',
  '/images/photo_2026-06-18_02-06-05.jpg':
    '福隆車站旁一間屋 和風4至6人家庭房實景 兩張雙人床寬敞日式空間',
  '/images/facilities.jpg':
    '福隆民宿一間屋駅前宿 公共交誼區與行李空間 單車族友善停放',
  '/images/hallway.jpg':
    '一間屋駅前宿溫潤木質走廊 福隆日式民宿客房區柔和燈光',
  '/images/hallway2.jpg':
    '福隆車站民宿室內通道 一間屋簡潔木質地板與米白牆面',
  '/images/hallway3.jpg':
    '一間屋駅前宿走道轉角門牌 福隆日式民宿簡約收納設計',
  '/images/bathroom.jpg':
    '福隆一間屋民宿共用衛浴 提供洗髮精沐浴乳與香皂',
  '/images/double_room2.jpg':
    '福隆出站30秒民宿 和鳴雙人房床邊特寫 木質床架暖色床單',
  '/images/exterior3.jpg':
    '一間屋駅前宿和鳴雙人房門口望向室內 福隆車站旁暖色燈光空間',
  '/images/exterior4.jpg':
    '福隆民宿和鳴雙人房側面視角 一間屋木質地板簡約和式空間',
  '/images/scenery/fulong-beach-aerial.jpg':
    '福隆海水浴場空拍 從一間屋出發步行8分鐘金色沙灣湛藍海線',
  '/images/scenery/fulong-station.jpg':
    '福隆火車站外觀 一間屋駅前宿出站右轉步行30秒即達',
  '/images/scenery/fulong-sandcastle.jpg':
    '福隆海水浴場沙雕城堡 福隆國際沙雕藝術季海邊文化地標',
  '/images/scenery/fulong-sand-sculpture.jpg':
    '福隆沙灘沙雕作品 福隆海水浴場匠人風景與藝術季',
  '/images/scenery/fulong-view-from-inn.jpg':
    '一間屋駅前宿窗外遠眺 福隆車站民宿青山綠意街景',
  '/images/scenery/fulong-starbucks.jpg':
    '福隆車站旁黃昏街景 住一間屋散步即可抵達休閒角落',
  '/images/scenery/fulong-caoling-loop-sign.jpg':
    '舊草嶺隧道環狀線路標 福隆單車騎行沿海公路景色',
  '/images/scenery/fulong-caoling-tunnel.jpg':
    '舊草嶺隧道內部 福隆單車族必騎百年鐵道隧道',
  '/images/scenery/fulong-ring-immersive-art.webp':
    '東北角環狀線沉浸光影體驗 福隆單車旅遊特色景點',
  '/images/scenery/caoling-tunnel-entrance.jpg':
    '舊草嶺隧道入口 福隆出發單車旅客整装騎行',
  '/images/scenery/caoling-coastal-path.jpg':
    '舊草嶺濱海自行車道 福隆環狀線山海相伴海景路段',
  '/images/scenery/maoao-fishing-village.jpg':
    '卯澳漁村海岸雕塑 舊草嶺環狀線福隆單車路線漁港風光',
  '/images/Mountain1.jpg':
    '草嶺古道石階步道 福隆登山健行俯瞰東北角海岸',
  '/images/Mountain2.webp':
    '桃源谷大草原木棧步道 福隆一日遊綠色山稜芒草草原',
  '/images/Mountain3.webp':
    '桃源谷山區蜿蜒道路 福隆民宿出發山海步道景觀',
  '/images/hero.jpg':
    '福隆車站步行30秒 一間屋駅前宿日式民宿外觀',
};

export function getImageAlt(src: string): string {
  return IMAGE_ALT[src] ?? '福隆車站旁一間屋駅前宿 日式民宿室內空間照片';
}