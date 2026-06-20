/** 每張圖片專屬 alt：描述畫面內容，關鍵字自然帶入、不重複堆砌 */
export const IMAGE_ALT: Record<string, string> = {
  '/images/photo_2026-04-25_01-38-33.jpg':
    '2026年4月施工前，福隆車站旁一樓舊式客房空間待重新整建',
  '/images/photo_2026-04-25_01-38-38.jpg':
    '翻新前的室內走道，牆面與地坪仍保留原始樣貌',
  '/images/photo_2026-04-26_16-17-21.jpg':
    '施工前待處理的角落，舊管線與設備尚未拆除',
  '/images/photo_2026-05-01_23-59-02.jpg':
    '2026年5月施工中，工人拆除舊隔間與裝潢',
  '/images/photo_2026-05-01_23-59-09.jpg':
    '翻新進行中，木作與泥作同步施工的現場',
  '/images/double_room.jpg':
    '和鳴雙人房全景，原木色和式雅房附獨立冷氣與舒適寢具',
  '/images/photo_2026-06-18_02-06-05.jpg':
    '和風4至6人家庭房，兩張雙人床的寬敞日式空間',
  '/images/facilities.jpg':
    '公共交誼區與行李空間，單車族可安心停放',
  '/images/hallway.jpg':
    '溫潤木質走廊連接各客房，柔和燈光營造和風氛圍',
  '/images/hallway2.jpg':
    '客房區室內通道，簡潔木質地板與米白牆面',
  '/images/hallway3.jpg':
    '走道轉角與門牌細節，日式簡約收納設計',
  '/images/bathroom.jpg':
    '共用衛浴空間，提供洗髮精、沐浴乳與香皂',
  '/images/double_room2.jpg':
    '和鳴雙人房床邊特寫，木質床架與暖色床單',
  '/images/exterior3.jpg':
    '雙人房從門口望向窗邊，採光充足、空間整潔',
  '/images/exterior4.jpg':
    '和式雙人房側面視角，收納櫃與榻榻米風地板',
  '/images/scenery/fulong-beach-aerial.jpg':
    '福隆海水浴場空拍，金色沙灣延伸至湛藍海線',
  '/images/scenery/fulong-station.jpg':
    '福隆火車站外觀，一間屋駅前宿步行 30 秒即達',
  '/images/scenery/fulong-sandcastle.jpg':
    '福隆沙灘大型沙雕城堡，海邊文化地標',
  '/images/scenery/fulong-sand-sculpture.jpg':
    '福隆國際沙雕藝術季作品，沙灘上的匠人風景',
  '/images/scenery/fulong-view-from-inn.jpg':
    '一間屋窗外遠眺，青山綠意與福隆街景',
  '/images/scenery/fulong-starbucks.jpg':
    '福隆車站旁黃昏街景，散步即可抵達的休閒角落',
  '/images/scenery/fulong-caoling-loop-sign.jpg':
    '舊草嶺隧道環狀線路標，福隆沿海公路單車騎行景色',
  '/images/scenery/fulong-caoling-tunnel.jpg':
    '舊草嶺隧道內部，單車騎士穿梭百年鐵道隧道',
  '/images/scenery/fulong-ring-immersive-art.webp':
    '東北角環狀線沿途沉浸光影體驗，單車旅遊特色景點',
};

export function getImageAlt(src: string): string {
  return IMAGE_ALT[src] ?? '一間屋駅前宿室內空間照片';
}