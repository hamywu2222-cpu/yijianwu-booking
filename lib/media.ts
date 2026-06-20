export type SceneryItem = {
  src: string;
  title: string;
  caption: string;
  span?: 'wide' | 'tall' | 'hero';
};

export const SCENERY_IMAGES: SceneryItem[] = [
  {
    src: '/images/scenery/fulong-beach-aerial.jpg',
    title: '福隆海水浴場',
    caption: '步行 5 分鐘 · 金色沙灣與湛藍海線',
    span: 'hero',
  },
  {
    src: '/images/scenery/fulong-station.jpg',
    title: '福隆車站',
    caption: '出站右轉 30 秒即達一間屋',
    span: 'tall',
  },
  {
    src: '/images/scenery/fulong-sandcastle.jpg',
    title: '沙雕藝術季',
    caption: '福隆沙灘經典地標，每年吸引無數旅人',
  },
  {
    src: '/images/scenery/fulong-sand-sculpture.jpg',
    title: '沙雕展',
    caption: '海風、細沙與匠人巧手交織的風景',
  },
  {
    src: '/images/scenery/fulong-view-from-inn.jpg',
    title: '民宿窗外',
    caption: '推門即見青山綠意與福隆日常',
    span: 'wide',
  },
  {
    src: '/images/scenery/fulong-starbucks.jpg',
    title: '福隆夜色',
    caption: '車站旁休閒角落，散步即可抵達',
  },
];

export const ROOM_VIDEOS = {
  double: {
    poster: '/images/double_room.jpg',
    label: '和鳴 · 雙人房實景',
    sources: ['/videos/double-room-1.mp4', '/videos/double-room-2.mp4', '/videos/family-room-1.mp4'],
  },
  family: {
    poster: '/images/photo_2026-06-18_02-06-05.jpg',
    label: '和風4-6人家庭房實景',
    sources: ['/videos/family-room-2.mp4'],
  },
} as const;

export const OUTDOOR_HIGHLIGHTS = [
  {
    image: '/images/scenery/fulong-beach-aerial.jpg',
    title: '海邊 5 分鐘',
    desc: '福隆海水浴場步行可達，沙灘夕陽與海水浴',
  },
  {
    image: '/images/scenery/fulong-view-from-inn.jpg',
    title: '單車停放無憂',
    desc: '室內遮雨專屬空間，單車族安心出發',
  },
  {
    image: '/images/scenery/fulong-sand-sculpture.jpg',
    title: '沙灘文化',
    desc: '福隆沙雕季與海岸風光，四季各有風景',
  },
  {
    image: '/images/scenery/fulong-station.jpg',
    title: '交通樞紐',
    desc: '福隆車站前，東北角海岸自行車道起點',
  },
] as const;