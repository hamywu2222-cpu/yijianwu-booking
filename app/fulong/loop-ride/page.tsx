import Image from 'next/image';
import GuideArticleLayout from '@/components/fulong/GuideArticleLayout';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import { PageJsonLd } from '@/components/PageJsonLd';
import { getFulongArticle } from '@/lib/fulongArticles';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const article = getFulongArticle('loop-ride');

const STOPS: {
  title: string;
  text: string;
  pause: string;
  images?: { src: string; alt: string }[];
}[] = [
  {
    title: '一間屋・駅前宿',
    text: '環線從福隆車站旁的民宿出發。出站走幾步就是一間屋，這一圈走完，還是回到這裡。',
    pause: '吃・歇：車站前有便當和小吃，可以出門前買了帶著。車站有廁所。',
  },
  {
    title: '舊草嶺隧道',
    text: '往南接到北口，門額題著「制天險」。洞內約兩公里，涼、有光。穿出去就是宜蘭頭城的石城，山的裡面走進、海的外面出來。',
    pause: '吃・歇：洞裡沒有店。要坐下、補水，出隧道到石城。',
    images: [{ src: '/images/loop-ride/tunnel.jpg', alt: '舊草嶺隧道北口，門額題著制天險' }],
  },
  {
    title: '石城・龜山島',
    text: '一出隧道，海岸打開。海面上那座島是龜山島，石城觀景區是補水、看海的第一站。',
    pause: '吃・歇：石城服務區可以歇，有公共廁所，也有賣輕食的地方。出隧道後第一個能坐下的點。',
    images: [{ src: '/images/loop-ride/guishan.jpg', alt: '石城外海遠眺龜山島' }],
  },
  {
    title: '萊萊海蝕平台',
    text: '外圍海岸往北，萊萊的岩盤一層一層伸進海裡。退潮時平台露出來，風大，適合停一下看浪。',
    pause: '吃・歇：這裡有休憩站，現場有店，可以買咖啡和簡單吃的。',
    images: [{ src: '/images/loop-ride/rocks.jpg', alt: '萊萊海蝕平台的層層岩岸' }],
  },
  {
    title: '四角窟觀景台',
    text: '觀景台在上面，台 2 線在下方。往頭城、台北的路牌就在這一段，海平線拉得很長。',
    pause: '吃・歇：只能看海歇腳。這一段沒有店，水要先備好。',
    images: [
      { src: '/images/loop-ride/overlook.jpg', alt: '四角窟一帶的濱海觀景台' },
      { src: '/images/loop-ride/coast-road.jpg', alt: '觀景台旁的台2線，路牌指向頭城與台北' },
    ],
  },
  {
    title: '三貂角燈塔',
    text: '外圍的高點，台灣本島極東。白燈塔面向太平洋，是這一圈最明顯的地標。過了這裡，路開始往漁村降。',
    pause: '吃・歇：適合拍照歇一下。這裡店不多，要吃東西就往下一個漁村。',
  },
  {
    title: '馬崗・卯澳',
    text: '三貂角一下來，馬崗和卯澳就連在一起。先到馬崗漁港：堤防上畫著魚，港口外是消波塊和橘色航標，旁邊是芒草和水塔，村外可以看潮池。接著進卯澳，石頭厝沿著灣澳排開。',
    pause: '吃・歇：馬崗漁村有人賣石花凍，哨所那一帶可以坐下，也有廁所。卯澳漁港有海鮮和小卷米粉，店不只一家，是這一圈最容易坐下吃一餐的地方。利洋宮可以歇，有廁所，也可以加水。',
    images: [
      { src: '/images/loop-ride/blue-wall.jpg', alt: '馬崗漁港堤防上的魚壁畫' },
      { src: '/images/loop-ride/harbor.jpg', alt: '馬崗漁港、消波塊與外海平台' },
      { src: '/images/loop-ride/reeds.jpg', alt: '馬崗漁港旁的芒草與水塔' },
    ],
  },
  {
    title: '福連',
    text: '過了馬崗、卯澳就是福連。福連國小有彩虹階梯，校門前那一片潮池。人少的時候海水很清。',
    pause: '吃・歇：看潮池和彩虹階梯。這裡沒有店。',
  },
  {
    title: '福隆漁港',
    text: '過了福連，回福隆的路上會經過福隆漁港。看一眼，再往東興宮。',
    pause: '吃・歇：不把這裡當吃飯的點。',
  },
  {
    title: '東興宮',
    text: '環線最後一站，在挖仔。廟前就是福隆金色沙灘，對岸看得到海水浴場。傍晚太陽從這一側落下，停一下再沿沙灘走回去。',
    pause: '吃・歇：廟前沙灘可以坐。要吃東西，再往海水浴場或車站前。',
    images: [
      { src: '/images/loop-ride/dongxing-sunset.jpg', alt: '東興宮前的夕陽，對面是福隆海水浴場' },
      { src: '/images/loop-ride/dongxing-railing.jpg', alt: '東興宮欄杆外的夕陽與沙灘' },
    ],
  },
  {
    title: '回一間屋',
    text: '回程經過福隆海水浴場。藍色屋頂的星巴克就在沙灘這一帶，再走幾分鐘，回到車站旁的民宿。',
    pause: '吃・歇：星巴克有飲料和輕食。回到車站前，便當和小吃都還在。',
    images: [{ src: '/images/loop-ride/starbucks.jpg', alt: '福隆海水浴場旁、藍色屋頂的星巴克' }],
  },
];

export const metadata = buildPageMetadata({
  title: article.title,
  description: article.description,
  path: article.path,
  keywords: [...FULONG_SEO_KEYWORDS.guide, ...article.keywords],
  ogImage: article.heroImage,
  ogImageAlt: article.shortTitle,
});

export default function LoopRidePage() {
  return (
    <>
      <PageJsonLd
        data={[
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '福隆旅遊攻略', path: '/fulong' },
            { name: article.shortTitle, path: article.path },
          ]),
        ]}
      />
      <GuideArticleLayout slug="loop-ride">
        <section className="space-y-4">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            一整圈，從民宿出門再回到民宿
          </h2>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            一間屋 → 舊草嶺隧道 → 石城（龜山島）→ 萊萊 → 四角窟 → 三貂角燈塔 → 馬崗・卯澳 → 福連 →
            福隆漁港 → 東興宮 → 回一間屋。含拍照停留大約 20–24 公里，全程大約 2–3 小時。中途能坐下吃的，主要在石城、萊萊、馬崗和卯澳。四角窟、三貂角、福連這幾段沒有店。
          </p>
        </section>

        <section className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            ['20–24 km', '含停留的一圈'],
            ['2–3 小時', '慢慢看的時間'],
            ['東興宮', '回民宿前的最後一站'],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-[#e8e0d4] bg-white px-3 py-4 text-center">
              <p className="font-playfair text-lg font-light text-[#2c2416] sm:text-xl">{n}</p>
              <p className="mt-1 text-[11px] text-[#9a9086] sm:text-xs">{l}</p>
            </div>
          ))}
        </section>

        <section className="space-y-10">
          {STOPS.map((stop, i) => (
            <section key={stop.title} className="space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[#8B7355]">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-playfair text-xl font-light text-[#2c2416]">{stop.title}</h3>
              <p className="text-sm leading-relaxed text-[#5c4f42]">{stop.text}</p>
              <p className="text-sm leading-relaxed text-[#8B7355]">{stop.pause}</p>
              {stop.images?.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-2xl border border-[#e8e0d4] bg-[#efeae3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={1600}
                    className="h-auto w-full"
                    priority={i === 1}
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                </figure>
              ))}
            </section>
          ))}
        </section>

        <GuideBookingCta
          variant="soft"
          title="走完就回到車站旁"
          subtitle="一間屋出站約 30 秒。行李可以先放著，再出門走這一圈。"
        />
      </GuideArticleLayout>
    </>
  );
}
