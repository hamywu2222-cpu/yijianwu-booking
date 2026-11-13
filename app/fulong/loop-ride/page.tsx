import Image from 'next/image';
import GuideArticleLayout from '@/components/fulong/GuideArticleLayout';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import { PageJsonLd } from '@/components/PageJsonLd';
import { BUSINESS_LINE } from '@/lib/business';
import { getFulongArticle } from '@/lib/fulongArticles';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const article = getFulongArticle('loop-ride');

const STOPS: {
  time: string;
  title: string;
  text: string;
  pause: string;
  images?: { src: string; alt: string; caption: string }[];
}[] = [
  {
    time: '09:00',
    title: '一間屋・駅前宿',
    text: '環線從福隆車站旁的民宿出發。出站走幾步就是一間屋，這一圈走完，還是回到這裡。',
    pause: '吃・歇：車站前有便當和小吃，可以出門前買了帶著。車站有廁所。',
    images: [
      {
        src: '/images/loop-ride/return-home.jpg',
        alt: '一間屋門口',
        caption: '門裡的燈亮著，這一圈從這裡出門。',
      },
    ],
  },
  {
    time: '09:15',
    title: '舊草嶺隧道',
    text: '從入口進北口，洞內約兩公里，涼、有光。中間經過新北與宜蘭的交界，穿出去就是石城。',
    pause: '吃・歇：洞裡沒有店。要坐下、補水、上廁所，出隧道到石城。',
    images: [
      {
        src: '/images/loop-ride/entrance.jpg',
        alt: '舊草嶺隧道北口，匾額制天險',
        caption: '外面還熱著，一進拱門就涼了。',
      },
      {
        src: '/images/loop-ride/tunnel-border-1.jpg',
        alt: '隧道內往前看，右側是新北與宜蘭交界牌',
        caption: '燈一路往前，腳步聲被洞壁拉得很長。',
      },
      {
        src: '/images/loop-ride/tunnel-border.jpg',
        alt: '隧道內新北市與宜蘭縣交界牌',
        caption: '走到這裡，新北留在身後，前面是宜蘭。',
      },
    ],
  },
  {
    time: '09:35',
    title: '石城出口・龜山島',
    text: '一出隧道就是石城，洞口匾額是「白雲飛處」。榕樹下可以歇，旁邊有圓形廁所。再往上是石城漁港上方的觀景台，台 2 線在腳下。海面上那座島是龜山島。想走輕鬆的，在石城周邊逛逛，再原路穿隧道返回車站，最愜意。想挑戰全程 20–24 公里，可以接續接下來的行程，記得斟酌體力。',
    pause: '吃・歇：石城出口有公共廁所，榕樹下也有賣石花凍的地方。出隧道後第一個能坐下的點。',
    images: [
      {
        src: '/images/loop-ride/shicheng.jpg',
        alt: '石城出口外',
        caption: '出了隧道，石城的光和人聲一起湧上來。',
      },
      {
        src: '/images/loop-ride/shicheng-1.jpg',
        alt: '石城出口，匾額白雲飛處',
        caption: '穿出洞口，光突然白了，海的味道也跟著進來。',
      },
      {
        src: '/images/loop-ride/shicheng-2.jpg',
        alt: '石城出口外的下坡車道',
        caption: '出洞之後，路慢慢朝海開。',
      },
      {
        src: '/images/loop-ride/shicheng-banyan.jpg',
        alt: '石城出口榕樹下的石花凍店',
        caption: '榕蔭鋪得很滿，想歇就歇在這裡。',
      },
      {
        src: '/images/loop-ride/shicheng-toilet.jpg',
        alt: '石城出口圓形公共廁所',
        caption: '山靠得很近，出隧道的人多半會在這停一下。',
      },
      {
        src: '/images/loop-ride/shicheng-toilet-2.jpg',
        alt: '石城出口廁所側面與藍色車道',
        caption: '白房子一側已經開闊，海風從這裡進來。',
      },
      {
        src: '/images/loop-ride/shicheng-3.jpg',
        alt: '石城木棧道遠眺龜山島',
        caption: '欄杆一開，龜山島就坐在海中央。',
      },
      {
        src: '/images/loop-ride/guishan-2.jpg',
        alt: '觀景平台欄杆外的龜山島',
        caption: '雲不高，島看起來好像可以走到。',
      },
      {
        src: '/images/loop-ride/guishan-3.jpg',
        alt: '藍色步道沿岩岸看龜山島',
        caption: '沿著海岸走，島一直陪在旁邊。',
      },
      {
        src: '/images/loop-ride/overlook.jpg',
        alt: '石城漁港上方觀景台，樹下俯瞰濱海公路',
        caption: '站高一點，漁港和海都在腳下，風很乾淨。',
      },
      {
        src: '/images/loop-ride/coast-road.jpg',
        alt: '石城漁港上方，台2線路牌指向頭城與台北',
        caption: '路在下面自己走，人站在風裡就夠了。',
      },
    ],
  },
  {
    time: '09:55',
    title: '外圍往福隆',
    text: '出了石城就沿外圍海岸往福隆走。這一段是山海和岩岸，中間會經過懸崖餐廳外面。',
    pause: '吃・歇：懸崖餐廳外可以歇。萊萊還有休憩站，可以買咖啡和簡單吃的。',
    images: [
      {
        src: '/images/loop-ride/guishan.jpg',
        alt: '離開石城往福隆，退潮岩岸與龜山島',
        caption: '剛離開石城，潮退了，島還在後面。',
      },
      {
        src: '/images/loop-ride/coast-a.jpg',
        alt: '海岸解說牌，其中一塊標題是龜山島',
        caption: '先不必急。海在這裡已經夠寬。',
      },
      {
        src: '/images/loop-ride/coast-b.jpg',
        alt: '芒草外海中央的龜山島',
        caption: '一整座島，安靜地浮著。',
      },
      {
        src: '/images/loop-ride/coast-c.jpg',
        alt: '黃色條紋水泥柱與岩棚，遠處龜山島',
        caption: '浪聲比什麼都近。',
      },
      {
        src: '/images/loop-ride/coast-d.jpg',
        alt: '從路上俯瞰小港口與防波堤',
        caption: '從上面看下去，港口小得剛好，天色開始暖了。',
      },
      {
        src: '/images/loop-ride/coast-view.jpg',
        alt: '海邊舊草嶺鏡面大字與彩繪山形板',
        caption: '山的顏色靠著海，午後很亮。',
      },
      {
        src: '/images/loop-ride/cliff.jpg',
        alt: '懸崖餐廳外的礁岩與遠處龜山島',
        caption: '走到岩石盡頭，海就沒有再遠的地方。',
      },
      {
        src: '/images/loop-ride/rocks.jpg',
        alt: '外圍海岸退潮後的層層岩棚',
        caption: '潮退之後，石頭還帶著水光。',
      },
    ],
  },
  {
    time: '10:15',
    title: '四角窟觀景台',
    text: '黑白格子的廣場，階梯往上是觀景平台。再往前走，山頭上已經看得到三貂角的白燈塔。',
    pause: '吃・歇：只能看海歇腳。這一段沒有店，水要先備好。',
    images: [
      {
        src: '/images/loop-ride/sijiao-1.jpg',
        alt: '四角窟黑白格子廣場與觀景階梯',
        caption: '格子鋪到階梯口，上面只剩風和海。',
      },
      {
        src: '/images/loop-ride/sijiao-2.jpg',
        alt: '四角窟廣場上的夕陽',
        caption: '太陽貼著山邊，廣場慢慢安靜下來。',
      },
      {
        src: '/images/loop-ride/sijiao-3.jpg',
        alt: '車道前方山頭上的三貂角燈塔',
        caption: '白塔還在前面的山頭，這一圈的高點就快到了。',
      },
    ],
  },
  {
    time: '10:35',
    title: '三貂角燈塔',
    text: '外圍的高點，台灣本島極東。白燈塔面向太平洋，是這一圈最明顯的地標。過了這裡，路開始往漁村降。',
    pause: '吃・歇：適合拍照歇一下。這裡店不多，要吃東西就往下一個漁村。',
  },
  {
    time: '11:00',
    title: '馬崗・卯澳',
    text: '三貂角一下來，馬崗和卯澳就連在一起。馬岡咖啡可以坐下，裡面有廁所，旁邊還有一處小秘境。再往下是馬岡漁村，接著進卯澳，石頭厝沿著灣澳排開。',
    pause: '吃・歇：馬岡咖啡有廁所。漁村有人賣石花凍。卯澳漁港有海鮮和小卷米粉，店不只一家。利洋宮可以歇，有廁所，也可以加水。',
    images: [
      {
        src: '/images/loop-ride/magang-cafe-toilet.jpg',
        alt: '馬崗咖啡旁的洗手間',
        caption: '樹蔭裡正好歇一口氣。',
      },
      {
        src: '/images/loop-ride/magang-cafe.jpg',
        alt: '白牆木門的馬崗咖啡',
        caption: '白房子藏在榕樹下，時間在這裡會變慢。',
      },
      {
        src: '/images/loop-ride/magang-cafe-cove.jpg',
        alt: '馬崗咖啡旁通往海邊的小路',
        caption: '小路走到盡頭，就是海。',
      },
      {
        src: '/images/loop-ride/magang-village.jpg',
        alt: '馬崗漁港藍色堤防與魚的壁畫',
        caption: '藍牆對著港口，午後很慢。',
      },
      {
        src: '/images/loop-ride/magang-village-1.jpg',
        alt: '馬崗漁港堤防壁畫與港內棧橋',
        caption: '港裡的水幾乎不動，像把下午留住。',
      },
      {
        src: '/images/loop-ride/magang-harbor.jpg',
        alt: '馬崗漁港口與防波堤',
        caption: '防波堤伸進海裡，人突然變得很小。',
      },
      {
        src: '/images/loop-ride/blue-wall.jpg',
        alt: '馬崗漁港轉角的藍色魚壁畫',
        caption: '轉過這個彎，海就開了。',
      },
      {
        src: '/images/loop-ride/reeds.jpg',
        alt: '港邊芒草與遠處水塔',
        caption: '草比人高，風從草裡過。',
      },
      {
        src: '/images/loop-ride/maoao.jpg',
        alt: '卯澳社區富利漁村牌樓',
        caption: '一進牌樓，漁村的日子就慢了下來。',
      },
      {
        src: '/images/loop-ride/maoao-1.jpg',
        alt: '卯澳漁港前的食堂店招',
        caption: '廣場曬著太陽，漁港的下午是用來坐的。',
      },
      {
        src: '/images/loop-ride/maoao-2.jpg',
        alt: '卯澳社區解說牌與廁所指標',
        caption: '山還在後面，村子安安靜靜的。',
      },
    ],
  },
  {
    time: '11:25',
    title: '福連',
    text: '過了馬崗、卯澳就是福連。福連國小有彩虹階梯，校門前那一片潮池。人少的時候海水很清。',
    pause: '吃・歇：看潮池和彩虹階梯。這裡沒有店。',
    images: [
      {
        src: '/images/loop-ride/fulian.jpg',
        alt: '福連國小彩虹階梯',
        caption: '彩虹靠著山，海邊的小學很亮。',
      },
      {
        src: '/images/loop-ride/fulian-1.jpg',
        alt: '福連岸邊的欄杆與消波塊',
        caption: '欄杆外的海很平，山線遠得剛好。',
      },
    ],
  },
  {
    time: '11:30',
    title: '小香蘭',
    text: '福連再往福隆，會經過小香蘭。灣澳比漁村更安靜，適合停一下看海。',
    pause: '吃・歇：岸邊有吃飯、看海的指示牌。',
    images: [
      {
        src: '/images/loop-ride/xianglan.jpg',
        alt: '小香蘭岸邊，林投樹與吃飯看海指示牌',
        caption: '林投樹下有一點鹹風，灣澳安靜得想停。',
      },
    ],
  },
  {
    time: '11:35',
    title: '福隆漁港',
    text: '過了福連，回福隆的路上會經過福隆漁港。看一眼，再往東興宮。',
    pause: '吃・歇：不把這裡當吃飯的點。',
  },
  {
    time: '11:50',
    title: '東興宮',
    text: '環線最後一站，在挖仔。廟前就是福隆金色沙灘，對岸看得到海水浴場。傍晚太陽從這一側落下，停一下再沿沙灘走回去。',
    pause: '吃・歇：廟前沙灘可以坐。要吃東西，再往海水浴場或車站前。',
    images: [
      {
        src: '/images/loop-ride/dongxing-beach.jpg',
        alt: '東興宮門前沙灘與黃旗',
        caption: '廟前就是沙，一天的光從這裡開始收。',
      },
      {
        src: '/images/loop-ride/dongxing-beach-1.jpg',
        alt: '東興宮沙灘往北，遠處是福隆的橋',
        caption: '沙灘拉得很長，遠處的橋發著一點光。',
      },
      {
        src: '/images/loop-ride/dongxing.jpg',
        alt: '東興宮廟埕與龍雕屋脊',
        caption: '香火和海風混在一起，廟埕寬寬的。',
      },
      {
        src: '/images/loop-ride/dongxing-path.jpg',
        alt: '往東興宮的林投步道',
        caption: '樹把天色蓋住，廟就在前面不遠。',
      },
      {
        src: '/images/loop-ride/dongxing-sunset.jpg',
        alt: '東興宮前停車場的夕陽',
        caption: '太陽落在對岸，大家都忍不住停下來。',
      },
      {
        src: '/images/loop-ride/dongxing-railing.jpg',
        alt: '東興宮石欄杆外的夕陽',
        caption: '靠著欄杆就夠了，海把最後的光接住。',
      },
    ],
  },
  {
    time: '12:05',
    title: '回一間屋',
    text: '離開東興宮，經過福隆大飯店旁邊和藍色屋頂的星巴克，再走幾分鐘就回到車站旁的民宿。',
    pause: '吃・歇：星巴克有飲料和輕食。回到車站前，便當和小吃都還在。',
    images: [
      {
        src: '/images/loop-ride/fulong-hotel.jpg',
        alt: '福隆大飯店旁的白色棚架與小橋',
        caption: '風還在，回程從這裡開始近了。',
      },
      {
        src: '/images/loop-ride/starbucks.jpg',
        alt: '藍色屋頂的福隆星巴克',
        caption: '藍屋頂亮著燈，一天快走到尾聲。',
      },
      {
        src: '/images/loop-ride/return-home.jpg',
        alt: '回到一間屋門口',
        caption: '門裡的燈是暖的，這一圈在這裡結束。',
      },
    ],
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
            一間屋 → 舊草嶺隧道 → 石城出口（龜山島）→ 外圍往福隆 → 四角窟 → 三貂角燈塔 → 馬崗・卯澳 → 福連 →
            小香蘭 → 福隆漁港 → 東興宮 → 回一間屋。含拍照停留大約 20–24 公里，全程大約 2–3 小時。中途能坐下吃的，主要在石城、萊萊、馬崗和卯澳。四角窟、三貂角、福連這幾段沒有店。
          </p>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            如果只想來回隧道，可以在周邊逛逛，再原路返回車站，這樣最輕鬆。如果想挑戰全程 20–24 公里，再接續行程。
          </p>
          <div className="rounded-2xl border border-[#e8d5a8] bg-[#fbf6ea] p-4 text-sm leading-relaxed text-[#5c4f42]">
            <p>這頁照順序介紹景點，可以自己走。</p>
            <p className="mt-1">
              想找人帶、或想照這條排一天，行程導覽可以另外詢問。{' '}
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#8B7355] underline-offset-2 hover:underline"
              >
                {BUSINESS_LINE.inquireLabel}
              </a>
            </p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            ['20–24 km', '含停留的一圈'],
            ['2–3 小時', '慢慢看的時間'],
            ['09:00', '從一間屋出發'],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-[#e8e0d4] bg-white px-3 py-4 text-center">
              <p className="font-playfair text-lg font-light text-[#2c2416] sm:text-xl">{n}</p>
              <p className="mt-1 text-[11px] text-[#9a9086] sm:text-xs">{l}</p>
            </div>
          ))}
        </section>

        <ol className="relative">
          {STOPS.map((stop, i) => {
            const isLast = i === STOPS.length - 1;
            return (
              <li key={stop.title} className="relative flex gap-3 pb-8 last:pb-0">
                {isLast ? null : (
                  <span
                    className="absolute left-[0.85rem] top-8 bottom-0 w-px bg-[#e8e0d4]"
                    aria-hidden
                  />
                )}
                <span
                  className="relative z-[1] mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e8d5a8] bg-[#fbf6ea] text-[11px] font-semibold text-[#8B7355]"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-3">
                  <div>
                    <p className="text-xs font-semibold tabular-nums tracking-wide text-[#8B7355]">
                      {stop.time}
                    </p>
                    <h3 className="mt-0.5 font-playfair text-xl font-light text-[#2c2416]">{stop.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5c4f42]">{stop.text}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#8B7355]">{stop.pause}</p>
                  </div>
                  {stop.images?.map((image, imageIndex) => (
                    <figure key={image.src} className="overflow-hidden rounded-2xl border border-[#e8e0d4] bg-white">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={1600}
                        className="h-auto w-full bg-[#efeae3]"
                        priority={i === 0 && imageIndex === 0}
                        sizes="(max-width: 768px) 100vw, 720px"
                      />
                      <figcaption className="px-3 py-2.5 text-xs leading-relaxed text-[#5c4f42] sm:text-sm">
                        {image.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <GuideBookingCta
          variant="soft"
          title="走完就回到車站旁"
          subtitle="一間屋出站約 30 秒。行李可以先放著，再出門走這一圈。"
        />
      </GuideArticleLayout>
    </>
  );
}
