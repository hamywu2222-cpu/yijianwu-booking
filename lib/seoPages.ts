import {
  BOOKING_FAQ,
  BUSINESS_NAME,
  BUSINESS_REGISTRATION,
  PACKAGE_BOOKING,
  PACKAGE_SECTION,
  ROOMS_SECTION,
} from '@/lib/business';
import { FULONG_SECTION, OUTDOOR_FRIENDLY, SCENERY_IMAGES } from '@/lib/media';

export const SITE_FAQ = [
  ...BOOKING_FAQ,
  {
    question: '從福隆車站怎麼走到一間屋・駅前宿？',
    answer:
      '出福隆車站大廳後右轉直走，約 30 秒即可看見一間屋・駅前宿招牌。是福隆出站 30 秒民宿，比等紅綠燈還快，適合搭火車抵達的旅人。',
  },
  {
    question: '福隆有什麼好玩？住一間屋方便嗎？',
    answer:
      '福隆海水浴場步行約 8 分鐘，舊草嶺隧道單車約 15 分鐘，舊草嶺隧道環狀線是單車族經典路線。一間屋位於福隆車站前，可作為玩水、騎車、登山的住宿據點。',
  },
  {
    question: '一間屋適合單車族或背包客嗎？',
    answer:
      '適合。提供室內遮雨單車停放、行李寄放，鄰近舊草嶺隧道環狀線起點，是福隆背包客棧與青年旅館的熱門選擇。',
  },
  {
    question: '一間屋是合法民宿嗎？',
    answer: `是，${BUSINESS_NAME}已依法登記為合法民宿（${BUSINESS_REGISTRATION}），可安心入住。`,
  },
] as const;

export const FULONG_GUIDE = {
  title: '福隆怎麼玩｜從福隆車站步行路線與周邊景點',
  description:
    '福隆車站出站 30 秒即達一間屋・駅前宿。整理福隆海水浴場、舊草嶺隧道、環狀線單車與桃源谷登山，讓你住對地方、玩得更順。',
  walking: {
    title: '從福隆車站步行到一間屋（30 秒路線）',
    steps: [
      '出福隆火車站大廳，面向站前廣場。',
      '向右轉，沿福隆街直走約 30 秒。',
      '看見「一間屋・駅前宿」招牌即抵達，無需過馬路或搭車。',
    ],
    note: '若搭火車、區間車或自強號抵達，此路線最快速。自駕旅客可將車輛停放濱海公路 7-11 旁停車場，再步行回民宿。',
  },
  attractions: SCENERY_IMAGES,
  outdoor: OUTDOOR_FRIENDLY,
  intro: FULONG_SECTION.intro,
} as const;

export const RENOVATION_PAGE = {
  title: '2026 全新裝潢紀錄｜一間屋 1 樓翻新歷程',
  description:
    '2026 年 4 月至 5 月，一間屋・駅前宿完成 1 樓全面翻新。從施工前、施工中到完工後，以日式溫潤風格重新打造福隆車站旁的住宿空間。',
  timeline: [
    { period: '2026.04', label: '翻新前', note: '盤點舊有空間，規劃木作、泥作與動線。' },
    { period: '2026.05.01', label: '施工中', note: '拆除舊隔間，同步進行木作與泥作工程。' },
    { period: '2026.05+', label: '翻新後', note: '和鳴雙人房、家庭房與公共空間全面升級，正式迎接旅人。' },
  ],
} as const;

export const ROOM_PAGES = {
  double: {
    slug: 'double',
    path: '/rooms/double',
    title: '和鳴雙人房｜福隆車站出站30秒・一間屋駅前宿',
    description:
      '福隆車站步行 30 秒的和鳴雙人房，原木和式雅房共 4 間。平日 NT$1,500、假日 NT$1,600，適合情侶、好友與獨旅，2026 年全新裝潢。',
    room: ROOMS_SECTION.double,
    image: '/images/ROOMS/photo_2026-06-30_20-31-57.jpg',
    maxOccupancy: 3,
    bed: '2 張單人床',
  },
  family: {
    slug: 'family',
    path: '/rooms/family',
    title: '和風4-6人家庭房｜福隆一間屋・僅此1間',
    description:
      '福隆車站旁和風 4–6 人家庭房，兩張雙人床、寬敞日式空間。平日 NT$3,000 起、假日 NT$3,200 起，適合家庭與小團體入住。',
    room: ROOMS_SECTION.family,
    image: '/images/4-6ROOMS/photo_2026-06-30_21-55-08.jpg',
    maxOccupancy: 6,
    bed: '2 張雙人床',
  },
  package: {
    slug: 'package',
    path: '/rooms/package',
    title: '一間屋包棟方案｜全館 5 間包房優惠',
    description: `福隆一間屋全館包房（5 間）：4 間和鳴雙人房 + 1 間和風家庭房。平日 NT$8,800、假日 NT$9,200，舒適建議 ${PACKAGE_BOOKING.comfortMin}–${PACKAGE_BOOKING.comfortMax} 人，適合包棟、團體與單車隊。`,
    section: PACKAGE_SECTION,
    image: '/images/facilities.jpg',
    maxOccupancy: PACKAGE_BOOKING.maxPeople,
  },
} as const;

export type RoomPageKey = keyof typeof ROOM_PAGES;