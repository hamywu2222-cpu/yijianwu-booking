import Image from 'next/image';
import GuideArticleLayout from '@/components/fulong/GuideArticleLayout';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import { PageJsonLd } from '@/components/PageJsonLd';
import { getFulongArticle } from '@/lib/fulongArticles';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const article = getFulongArticle('miscanthus');

type Photo = {
  src: string;
  alt: string;
  caption: string;
  credit?: { name: string; license: string; fileUrl: string; licenseUrl: string };
};

const STOPS: {
  time: string;
  title: string;
  text: string;
  pause: string;
  images?: Photo[];
}[] = [
  {
    time: '08:00',
    title: '一間屋・駅前宿',
    text: '這一季從民宿出門。福隆車站就在出站 30 秒的地方，前一晚把行李留在房裡，早上穿好鞋再走。活動日只有週六、週日，2026/11/14 到 12/13，一共 10 天：11/14、11/15、11/21、11/22、11/28、11/29、12/5、12/6、12/12、12/13。平日古道還是開的，只是沒有接駁、古裝、市集和手作。',
    pause: '吃・歇：房間裡先喝水。便當在出門前買好，當山上的午餐。',
    images: [
      {
        src: '/images/loop-ride/return-home.jpg',
        alt: '一間屋門口',
        caption: '門裡的燈還亮著，這一季從這裡出門。',
      },
      {
        src: '/images/caoling-2026/dates.jpg',
        alt: '2026 草嶺古道芒花季活動期間 11 月 14 日至 12 月 13 日',
        caption: '銀白的日子排在週末。這一季，就這十天。',
      },
    ],
  },
  {
    time: '08:10',
    title: '福隆車站前',
    text: '住一間屋不用再趕火車進福隆。出房門幾十步就是車站，週末買便當的人會擠在一起，越早買越從容。水、行動糧、防風外套在這裡補齊。自己開車的人，車停福隆遊客中心，傍晚搭火車回來取車。平日沒有芒花接駁，福隆站有公車到遠望坑口，班次常改，出門前再查。',
    pause: '吃・歇：鄉野便當在福隆街 1 號，出站就在旁邊，週末排隊久，大約早上七點到傍晚六點半。發記便當在興隆街 17 號，月台也有賣，大約早上七點到晚上七點。兩間都適合當午餐帶上山。車站和便利商店可以補水。',
    images: [
      {
        src: '/images/scenery/fulong-station.jpg',
        alt: '福隆車站',
        caption: '便當和出發，都在這棟房子前面。',
      },
    ],
  },
  {
    time: '08:20',
    title: '福隆遊客中心',
    text: '走路大約 5 分鐘。這裡蓋第一個章，再搭「福隆遊客中心 ⇋ 遠望坑口」接駁。週六日行駛，不用預約，排隊上車，悠遊卡、一卡通或現金都可以。接駁大約 10 分鐘。人太多排不上，站前計程車到遠望坑口一車大約 250 元，8 到 10 分鐘。從車站走路到遠望坑大約 1 小時，不建議拿來當正班。',
    pause: '吃・歇：遊客中心有公廁和飲水機。',
    images: [
      {
        src: '/images/caoling-2026/fulong-visitor.jpg',
        alt: '福隆遊客中心門口',
        caption: '白棚子底下，第一個章蓋在這裡。',
        credit: {
          name: 'Solomon203',
          license: 'CC BY-SA 4.0',
          fileUrl: 'https://commons.wikimedia.org/wiki/File:Fulong_Visitor_Center_20211016.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      },
    ],
  },
  {
    time: '08:50',
    title: '遠望坑親水公園',
    text: '古道北端從這裡開始。下車後走到親水公園，短的說法是大約 5 分鐘，也有人沿產業道路走 15 到 20 分鐘，當天跟著現場指標。溪邊、水梯田和木棧道先把步調放穩，登山杖也在這裡調好。公廁在起登前，下一間在半山休憩亭。',
    pause: '吃・歇：親水公園有公廁。便當先留著，下一處能好好坐下吃的是半山休憩亭。',
    images: [
      {
        src: '/images/caoling-2026/yuanwangkeng.jpg',
        alt: '遠望坑親水公園涼亭與溪流',
        caption: '溪聲在腳邊，真正的上坡還沒開始。',
      },
    ],
  },
  {
    time: '09:40',
    title: '雄鎮蠻煙碑',
    text: '緩坡林道大約 50 到 60 分鐘。清同治年間劉明燈北巡時題的字，刻在半山的巨石上，現在是直轄市定古蹟。這裡可以站一下，便當留到前面的休憩亭。',
    pause: '吃・歇：碑邊能歇腳。沒有店，也不是這段最完整的廁所。',
    images: [
      {
        src: '/images/caoling-2026/xiongzhen.jpg',
        alt: '草嶺古道雄鎮蠻煙碑',
        caption: '字還在石頭上，林子把光遮住了。',
        credit: {
          name: 'Comet115',
          license: 'CC BY-SA 3.0',
          fileUrl: 'https://commons.wikimedia.org/wiki/File:%E9%9B%84%E9%8E%AE%E8%A0%BB%E7%85%99%E7%A2%91.JPG',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
        },
      },
    ],
  },
  {
    time: '10:00',
    title: '休憩亭',
    text: '過了雄鎮蠻煙碑再走大約 15 到 20 分鐘，就是這條路上最適合把便當吃完的地方。涼亭和椅子都有，地上也能坐。芒花季週末人會多。垃圾要自己帶下山。',
    pause: '吃・歇：這裡有公廁。從遠望坑上來之後，下一間要到護管所。水還是自己的。',
  },
  {
    time: '10:25',
    title: '虎字碑',
    text: '從休憩亭再走大約 15 分鐘。草書一個「虎」字，也是劉明燈所題，取風從虎的意思，想把山風鎮住。國定古蹟。看到這塊碑，埡口就在前面。這裡風已經大了，沒有廁所。拓碑不在石碑前，下山後到大里遊客中心現場報名。',
    pause: '吃・歇：沒有洗手間，也沒有賣吃的。外套先拿出來。',
    images: [
      {
        src: '/images/caoling-2026/tiger-stele.jpg',
        alt: '草嶺古道虎字碑',
        caption: '風口上的那個字，鎮了很久。',
        credit: {
          name: 'Outlookxp',
          license: 'CC BY-SA 4.0',
          fileUrl: 'https://commons.wikimedia.org/wiki/File:%E8%8D%89%E5%B6%BA%E8%99%8E%E5%AD%97%E7%A2%91%E6%AD%A3%E9%9D%A2%E7%85%A7.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      },
    ],
  },
  {
    time: '10:35',
    title: '埡口',
    text: '再走幾分鐘就是整條路最高的地方。埡讀作「物」，是兩座山之間的鞍部。芒花鋪在這裡，出去是太平洋和龜山島，下面是大里。風比林子裡強，體感會再降一些。涼亭可以遠眺，想把剩下的便當吃完也可以。想輕鬆的，在這裡拍完，原路緩坡折返遠望坑搭車回福隆，晚上回一間屋，膝蓋最省。想走完全程，就接下去坡，到大里再搭火車回來。',
    pause: '吃・歇：有觀景涼亭。沒有洗手間，也沒有賣吃的。',
    images: [
      {
        src: '/images/caoling-2026/saddle.jpg',
        alt: '草嶺古道埡口步道與芒花',
        caption: '風從鞍部穿過來，芒花跟著一起動。',
      },
      {
        src: '/images/caoling-2026/guishan.jpg',
        alt: '埡口遠眺龜山島與海岸',
        caption: '站在最高的地方，島安靜地浮在海上。',
      },
    ],
  },
  {
    time: '11:15',
    title: '護管所',
    text: '從埡口下石階大約 15 分鐘，拍照會再久一點。客馬披草古道護管所蓋第二個章。連續下坡從這裡才要開始，先坐下，讓膝蓋歇一下。旁邊的古道客棧有咖啡、茶葉蛋和簡單熱食，大約早上八點到下午五點，座位多半要消費才坐。芒花季週末有時會奉茶，杯子要自己帶，當天有沒有、幾點補，以現場為準。',
    pause: '吃・歇：有公廁、木椅和販賣機。熱食在客棧。水不夠就在這裡補。',
  },
  {
    time: '12:00',
    title: '大里天公廟',
    text: '連續石階大約 40 分鐘，古道南端在慶雲宮。廟建於 1836 年，主祀玉皇大帝，廟下大石刻著「蘭陽第一勝景」。海風和龜山島還在，這一走可以先在這裡停。廟方常有平安粥，有就坐下來喝一碗。',
    pause: '吃・歇：廟裡有公廁和飲水機。芒花季週六日，廟方多半有免費平安粥，沒有的日子就當歇腳。',
    images: [
      {
        src: '/images/caoling-2026/qingyun.jpg',
        alt: '大里天公廟慶雲宮',
        caption: '紅瓦沿著山坡下來，古道在這裡結束。',
        credit: {
          name: '阿道',
          license: 'CC BY-SA 4.0',
          fileUrl: 'https://commons.wikimedia.org/wiki/File:Caoling_Qingyun_Temple_20240715.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
        },
      },
    ],
  },
  {
    time: '12:15',
    title: '大里遊客中心',
    text: '走路大約 5 分鐘。蓋第三個章，集滿三處可換當週徽章，每週款式不同，送完為止。廊道是「芒著走」市集。虎字碑拓印在這裡現場報名。手作在週六日 13:30–14:30，有茶香午安枕、香蕉絲擺飾、藍染小方巾、龜山島印畫杯墊，要先到活動官網預約。古裝在 10:00–12:00 和 14:30–15:30，帶身分證件即可免費換，完成指定任務可再換小禮。以這個步調，上午的換裝多半已經過了，下午那一場還趕得上。',
    pause: '吃・歇：有公廁、飲水機。芒花季週末廊道有市集，常看得到石花凍和點心，有就買，沒有就回福隆再吃。',
    images: [
      {
        src: '/images/caoling-2026/dali-visitor.jpg',
        alt: '大里遊客中心門口',
        caption: '紅磚廊下，第三個章蓋在這裡。',
        credit: {
          name: 'lienyuan lee',
          license: 'CC BY 3.0',
          fileUrl: 'https://commons.wikimedia.org/wiki/File:Dali_Visitor_Center_%E5%A4%A7%E9%87%8C%E9%81%8A%E5%AE%A2%E4%B8%AD%E5%BF%83_-_panoramio_(2).jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
        },
      },
    ],
  },
  {
    time: '15:20',
    title: '大里火車站',
    text: '活動參加完，走路大約 8 到 10 分鐘到大里站，搭區間車北上福隆。車程大約半小時上下，班次當天再查。這一趟的終點是回到一間屋，不另排夜宿。',
    pause: '吃・歇：車站周邊有雜貨和販賣機。水在上車前補好。',
    images: [
      {
        src: '/images/caoling-2026/dali-station.jpg',
        alt: '大里車站',
        caption: '海在站牌後面。回程從這裡上車。',
        credit: {
          name: '翁維德',
          license: 'CC BY-SA 2.0',
          fileUrl: 'https://commons.wikimedia.org/wiki/File:TRA_Dali_Station_20151220.jpg',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
        },
      },
    ],
  },
  {
    time: '傍晚',
    title: '回一間屋',
    text: '福隆站一出站，就回到一間屋。洗個熱水澡，今晚好好休息。',
    pause: '吃・歇：想再吃一點熱的，車站前便當還開著。',
    images: [
      {
        src: '/images/loop-ride/return-home.jpg',
        alt: '回到一間屋門口',
        caption: '回到暖暖的小窩，這一季在這裡結束。',
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

export default function FulongMiscanthusPage() {
  return (
    <>
      <PageJsonLd
        data={getBreadcrumbJsonLd([
          { name: '首頁', path: '/' },
          { name: '福隆旅遊攻略', path: '/fulong' },
          { name: article.shortTitle, path: article.path },
        ])}
      />
      <GuideArticleLayout slug="miscanthus">
        <section className="space-y-4">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            從前一晚的床出發，傍晚回到同一扇門
          </h2>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            2026 草嶺古道芒花季第 25 年，主題是穿越古道時光。受颱風影響延後兩週，活動日是 11 月 14 日到 12 月 13 日的週六、週日。住一間屋的走法是福隆起登、大里下山。上去是緩坡，下來雖是石階，出口接著天公廟平安粥和市集，再走到大里火車站搭回一間屋。
          </p>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            全程大約 8.5–10 公里、3.5–4.5 小時。現場路線圖寫約 9 公里、3 到 4 小時。週末若從福隆遊客中心搭接駁到遠望坑，健行段大約 5.5 公里、2.5–3 小時。下面的時刻是住在一間屋、而且搭上接駁的參考，拍照和排隊都會往後挪。山上沒有一般餐廳。午餐是出門前買的便當，坐在半山休憩亭吃；熱食、粥和點心，要下山之後才有。
          </p>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            平日古道一樣開著。這一季的活動只在那十個週末。活動日才有遊客中心到遠望坑的接駁、古裝、市集、手作，以及集章換當週徽章。天公廟的平安粥也是週末多半才有，沒有的日子就當歇腳。季節裡的平日，芒花還在，只是沒有攤位和接駁。午餐仍是福隆買好的便當。平日自己到遠望坑口：福隆站有公車，班次常改，出門前再查；站前計程車一車大約 250 元。從車站走路過去大約 1 小時，不拿來當正班。12 月 13 日之後，古道全年可走，只是這一季的活動結束了。
          </p>
        </section>

        <section className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            ['11/14–12/13', '只有週六、週日'],
            ['福隆進', '大里出再搭回來'],
            ['08:00', '從一間屋出門'],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-[#e8e0d4] bg-white px-3 py-4 text-center">
              <p className="font-playfair text-lg font-light text-[#2c2416] sm:text-xl">{n}</p>
              <p className="mt-1 text-[11px] text-[#9a9086] sm:text-xs">{l}</p>
            </div>
          ))}
        </section>

        <section className="space-y-3">
          <figure className="overflow-hidden rounded-2xl border border-[#e8e0d4] bg-white">
            <Image
              src="/images/caoling-2026/route.jpg"
              alt="草嶺古道健行地圖，福隆車站到大里車站"
              width={1200}
              height={900}
              className="h-auto w-full bg-[#efeae3]"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <figcaption className="px-3 py-2.5 text-xs leading-relaxed text-[#5c4f42] sm:text-sm">
              線從福隆拉到大里。晚上，人再搭回一間屋。
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-[#e8e0d4] bg-white">
            <Image
              src="/images/caoling-2026/map-sign.jpg"
              alt="草嶺古道現場路線圖，全程約 9 公里"
              width={1200}
              height={900}
              className="h-auto w-full bg-[#efeae3]"
              sizes="(max-width: 768px) 100vw, 720px"
            />
            <figcaption className="px-3 py-2.5 text-xs leading-relaxed text-[#5c4f42] sm:text-sm">
              路上寫著大約九公里。慢慢走，三、四個小時就夠。
            </figcaption>
          </figure>
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
                        {image.credit ? (
                          <span className="mt-1 block text-[11px] leading-relaxed text-[#9a9086]">
                            照片：
                            <a
                              href={image.credit.fileUrl}
                              className="underline-offset-2 hover:underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {image.credit.name}
                            </a>
                            ，
                            <a
                              href={image.credit.licenseUrl}
                              className="underline-offset-2 hover:underline"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {image.credit.license}
                            </a>
                          </span>
                        ) : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>

        <section className="rounded-3xl border border-[#EDE8E0] bg-white p-5 sm:p-6">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416]">出門前看這幾件</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#6B665F]">
            <li>平日沒有接駁、古裝、市集和手作。到遠望坑口搭福隆站的公車，班次出門前再查，或搭站前計程車，一車大約 250 元。</li>
            <li>鞋底要抓得住。中段和下坡是舊石階，潮了會滑，不要穿平底休閒鞋。</li>
            <li>埡口到天公廟是連續下坡。有登山杖，膝蓋會輕很多。</li>
            <li>林道裡會出汗，一到埡口風就強。貼身穿排汗，外層帶防風外套。</li>
            <li>嬰兒車走不了全程。幼兒用背巾。長輩若膝蓋不適，埡口拍完就原路折返。</li>
            <li>
              手作名額要先到
              <a
                href="https://events.necoast-nsa.gov.tw/flower26/"
                className="mx-1 text-[#8B7355] underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                活動官網
              </a>
              預約。古裝、集章、市集、拓碑當天在大里現場即可。
            </li>
          </ul>
        </section>

        <GuideBookingCta
          variant="soft"
          title="傍晚回到同一扇門"
          subtitle="一間屋在福隆車站出站 30 秒。前一晚住下，走完搭火車回來。"
        />
      </GuideArticleLayout>
    </>
  );
}
