/**
 * 訂房客人常問的問題。答案只來自官網既有文案。
 * 官網沒寫的項目一律請客人改問 LINE，不在這裡猜規定。
 */

import {
  AIRBNB_BOOKING,
  BOOKING_CTA,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  BUSINESS_LINE,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGISTRATION,
  BUSINESS_ROOM_COUNT,
  PACKAGE_PEOPLE_NOTICE,
  PRICE_HOLIDAY_NOTICE,
  ROOMS_SECTION,
} from '@/lib/business';
import { ABOUT_AMENITIES } from '@/lib/media';
import { SKYART } from '@/lib/skyartGuide';

export const GUEST_ASK_LINE = `這項官網目前沒有寫明。請改問官方 LINE ${BUSINESS_LINE.id}，或打電話 ${BUSINESS_PHONE.mobile}。我不會自行猜測。`;

export type GuestTopic =
  | '訂房與價格'
  | '入住與密碼'
  | '交通與停車'
  | '房間與備品'
  | '周邊'
  | '官網尚未寫明';

export type GuestQuestion = {
  id: string;
  topic: GuestTopic;
  question: string;
  answer: string;
  /** 面板上直接露出的快捷問題 */
  pinned?: boolean;
};

const amenities = ABOUT_AMENITIES.map((item) => item.label).join('、');

export const GUEST_QUESTIONS: readonly GuestQuestion[] = [
  {
    id: 'how-to-book',
    topic: '訂房與價格',
    pinned: true,
    question: '怎麼訂房？怎麼看有沒有空房？',
    answer: `到官網訂房頁 /booking，選入住日、退房日與人數，再點「${BOOKING_CTA.action}」。會開新分頁到奧丁丁完成選房與刷卡。看得到房型而且可以選擇，就代表當天有空房；看不到可選房型，就是當天已滿。我無法在這裡查即時空房。習慣用 Airbnb 的話，也可以走「${AIRBNB_BOOKING.label}」。官網直訂是本站標示的最優惠管道。`,
  },
  {
    id: 'prices',
    topic: '訂房與價格',
    pinned: true,
    question: '房價多少？加人怎麼算？',
    answer: `${ROOMS_SECTION.double.title}共 4 間，平日 ${ROOMS_SECTION.double.pricing.weekday.sale}、假日 ${ROOMS_SECTION.double.pricing.holiday.sale}，舒適建議 2 人。若要多加 1 人，每人加 NT$600，並提供日式軟墊、枕頭、毯子。${ROOMS_SECTION.family.title}僅 1 間，4 人起平日 ${ROOMS_SECTION.family.pricing.weekday.sale}、假日 ${ROOMS_SECTION.family.pricing.holiday.sale}，每增加 1 人加 NT$600，最多 6 人。${PRICE_HOLIDAY_NOTICE}`,
  },
  {
    id: 'package',
    topic: '訂房與價格',
    pinned: true,
    question: '可以包棟嗎？超過 14 人呢？',
    answer: `可以訂全館包房，一共 ${BUSINESS_ROOM_COUNT} 間：和鳴雙人雅房 4 間，加上和風 4–6 人家庭雅房 1 間。${PACKAGE_PEOPLE_NOTICE.short} 請在訂房頁選好日期後，滑到最下方看包房。`,
  },
  {
    id: 'holiday-price',
    topic: '訂房與價格',
    question: '連假或節日價格會不一樣嗎？',
    answer: PRICE_HOLIDAY_NOTICE,
  },
  {
    id: 'checkin',
    topic: '入住與密碼',
    pinned: true,
    question: '幾點可以入住、幾點要退房？',
    answer: `入住 ${BUSINESS_HOURS.checkIn} 後，退房 ${BUSINESS_HOURS.checkOut} 前。`,
  },
  {
    id: 'password',
    topic: '入住與密碼',
    pinned: true,
    question: '訂完房怎麼拿到入住密碼？',
    answer: `完成訂房後，請加入官方 LINE ${BUSINESS_LINE.id}（${BUSINESS_LINE.ctaLabel}），在 LINE 自助取得入住密碼。這個網頁問答不查、也不提供門禁或房間密碼。`,
  },
  {
    id: 'luggage',
    topic: '入住與密碼',
    pinned: true,
    question: '入住前後可以寄放行李嗎？',
    answer: `可以。房客可寄放行李。入住前後若要暫放，請先用 LINE ${BUSINESS_LINE.id} 或電話 ${BUSINESS_PHONE.mobile} 說一聲，方便安排。`,
  },
  {
    id: 'station',
    topic: '交通與停車',
    pinned: true,
    question: '從福隆車站怎麼走？沒開車方便嗎？',
    answer: `${BUSINESS_NAME}在福隆車站旁。出站大廳、面向站前廣場後右轉，沿福隆街直走約 30 秒（約 80 公尺）就看到招牌，不用過馬路。持雙北月票可直達福隆站（宜蘭線、新北範圍最後一站）。地址是${BUSINESS_ADDRESS.full}。`,
  },
  {
    id: 'parking',
    topic: '交通與停車',
    pinned: true,
    question: '汽車、機車、腳踏車可以停哪裡？',
    answer:
      '汽車建議停濱海公路 7-11 旁停車場，再步行回民宿。機車與腳踏車可停在門口。單車另有室內遮雨停放，適合走舊草嶺隧道環狀線的旅客。',
  },
  {
    id: 'rooms',
    topic: '房間與備品',
    question: '有幾種房？床怎麼配置？',
    answer: `和鳴雙人雅房共 4 間，2 張單人床，衛浴共用，適合情侶、好友或獨旅。和風 4–6 人家庭雅房僅 1 間，2 張雙人床。全館共 ${BUSINESS_ROOM_COUNT} 間。2026 年 6 月初全新裝潢。合法登記 ${BUSINESS_REGISTRATION}。`,
  },
  {
    id: 'amenities',
    topic: '房間與備品',
    pinned: true,
    question: '衛浴和備品有什麼？有 WiFi 嗎？',
    answer: `入住配套有：${amenities}。衛浴含洗髮精、沐浴乳、香皂；每房附吹風機一台；提供民宿內拖鞋。響應環保規定，不提供牙刷、刮鬍刀等一次性個人用品，請自備。`,
  },
  {
    id: 'around',
    topic: '周邊',
    question: '附近可以玩什麼、吃什麼？',
    answer: `福隆海水浴場步行約 8–12 分鐘。舊草嶺隧道單車約 15 分鐘可到，車站旁可以租車。更多走法在官網「福隆旅遊攻略」/fulong。想吃福隆山上純素，可到${SKYART.name}（${SKYART.address}），從一間屋步行約 20 分鐘，須事先預約，週三、週四公休。行程與訂位請看 ${SKYART.url}，不包含在房價裡。`,
  },
  {
    id: 'contact',
    topic: '周邊',
    question: '地址、電話、LINE 是什麼？',
    answer: `${BUSINESS_NAME}，${BUSINESS_ADDRESS.full}。手機 ${BUSINESS_PHONE.mobile}，市話 ${BUSINESS_PHONE.landline}。官方 LINE ${BUSINESS_LINE.id}。聯絡時段參考 ${BUSINESS_HOURS.contact.opens}–${BUSINESS_HOURS.contact.closes}。`,
  },
  {
    id: 'early-late',
    topic: '官網尚未寫明',
    question: '可以提早入住或晚一點退房嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'cancel',
    topic: '官網尚未寫明',
    question: '怎麼取消或改期？要扣款嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'breakfast',
    topic: '官網尚未寫明',
    question: '有提供早餐嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'pets',
    topic: '官網尚未寫明',
    question: '可以帶寵物嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'smoking',
    topic: '官網尚未寫明',
    question: '房間可以吸菸嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'elevator',
    topic: '官網尚未寫明',
    question: '有電梯嗎？行李要搬樓層嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'kitchen',
    topic: '官網尚未寫明',
    question: '可以用廚房或烹飪嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'towel',
    topic: '官網尚未寫明',
    question: '有提供毛巾、牙刷嗎？',
    answer: `牙刷等一次性個人用品請自備。毛巾官網沒有另外寫明。${GUEST_ASK_LINE}`,
  },
  {
    id: 'invoice',
    topic: '官網尚未寫明',
    question: '可以開立發票或打統編嗎？',
    answer: GUEST_ASK_LINE,
  },
  {
    id: 'children',
    topic: '官網尚未寫明',
    question: '小孩怎麼計價？有嬰兒床嗎？',
    answer: `加人費用請看房價說明：雙人房多 1 人加 NT$600，家庭房每加 1 人也是 NT$600。嬰兒床、幾歲以下免費，官網沒有寫。${GUEST_ASK_LINE}`,
  },
] as const;

export const GUEST_TOPICS: readonly GuestTopic[] = [
  '訂房與價格',
  '入住與密碼',
  '交通與停車',
  '房間與備品',
  '周邊',
  '官網尚未寫明',
];

export function guestQuestionsByTopic(topic: GuestTopic) {
  return GUEST_QUESTIONS.filter((item) => item.topic === topic);
}

function compact(value: string) {
  return value.replace(/\s+/g, '').toLowerCase();
}

/** 客人點到與題庫相同的問題時，直接回官網答案，不送給模型。 */
export function findGuestQuestion(text: string) {
  const key = compact(text);
  return GUEST_QUESTIONS.find((item) => compact(item.question) === key);
}

export function guestKnowledgePrompt() {
  const lines = GUEST_QUESTIONS.map(
    (item) => `【${item.topic}】問：${item.question}\n答：${item.answer}`,
  ).join('\n\n');

  return `你是${BUSINESS_NAME}官網的訂房問答，用繁體中文、像櫃台一樣短答。

只根據下面的官網資料回答。
- 不要編造價格、空房、取消規定、寵物、早餐、提早入住或任何資料裡沒有的規則。
- 空房請客人到訂房頁 /booking 自己選日期。你不能查即時空房。
- 不要提供、不要猜測門禁或房間密碼。密碼只說明加入 LINE ${BUSINESS_LINE.id}。
- 資料寫著要改問 LINE 的項目，就照那樣回，並附上 LINE ${BUSINESS_LINE.id} 與電話 ${BUSINESS_PHONE.mobile}。
- 不要討論其他客人的訂單，也不要答應代訂。

官網資料：
${lines}`;
}
