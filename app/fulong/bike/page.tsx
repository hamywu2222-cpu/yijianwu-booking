import Link from 'next/link';
import {
  DayTripDetailCard,
} from '@/components/fulong/ItineraryStyle';
import GuideArticleLayout from '@/components/fulong/GuideArticleLayout';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import SpotCard from '@/components/fulong/SpotCard';
import { PageJsonLd } from '@/components/PageJsonLd';
import { getFulongArticle } from '@/lib/fulongArticles';
import {
  FULONG_BIKE_SPOTS,
  FULONG_DAY_TRIPS,
  FULONG_EXTRA_SPOTS,
  FULONG_SNORKEL_SPOTS,
  type FulongSpot,
} from '@/lib/fulongGuide';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const article = getFulongArticle('bike');
const dayBikePlan = FULONG_DAY_TRIPS.find((t) => t.id === 'day-bike') ?? FULONG_DAY_TRIPS[1];

/** 舊草嶺全環騎乘順序（山進海出） */
const LOOP_SPOT_IDS = [
  'bike-rental',
  'caoling-tunnel',
  'shicheng',
  'lailai',
  'sandiaojiao',
  'magang',
  'fulian-snorkel',
  'maoao',
  'maoao-stone',
] as const;

function loopSpots(): FulongSpot[] {
  const pool = [...FULONG_BIKE_SPOTS, ...FULONG_SNORKEL_SPOTS, ...FULONG_EXTRA_SPOTS];
  return LOOP_SPOT_IDS.map((id) => pool.find((s) => s.id === id)).filter(
    (s): s is FulongSpot => Boolean(s),
  );
}

export const metadata = buildPageMetadata({
  title: article.title,
  description: article.description,
  path: article.path,
  keywords: [...FULONG_SEO_KEYWORDS.guide, ...article.keywords],
  ogImage: article.heroImage,
  ogImageAlt: article.shortTitle,
});

export default function FulongBikePage() {
  const bikeSpots = loopSpots();

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
      <GuideArticleLayout slug="bike">
        <section className="space-y-4">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            舊草嶺單車：福隆最強節奏
          </h2>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            一間屋就在福隆車站旁，出站即可比價租腳踏車／電動輔助車／親子車。騎完隧道或環線，步行 1–3
            分回民宿沖澡——這是許多單車客與情侶選擇在此 overnight 的原因。
          </p>
          <div className="rounded-2xl border border-[#e8e0d4] bg-white p-4 text-sm text-[#5c4f42]">
            <p className="font-semibold text-[#8B7355]">快速重點</p>
            <ul className="mt-2 space-y-1.5">
              <li>· 租車點：福隆車站兩側（一間屋步行約 1–3 分）</li>
              <li>· 親子友善：隧道往返＋石城端（約 10 km 級）即可</li>
              <li>· 進階：全環約 18–22 km，可串三貂角、馬崗、卯澳</li>
              <li>· 專用道禁機車；福隆無租機車店</li>
            </ul>
          </div>
        </section>

        <GuideBookingCta
          variant="soft"
          title="騎完想好好睡一晚？"
          subtitle="單車停放方便、車站旁取還車，入住一間屋最省事。"
        />

        {dayBikePlan ? (
          <section className="space-y-4">
            <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
              建議一日單車行程
            </h2>
            <DayTripDetailCard plan={dayBikePlan} />
          </section>
        ) : null}

        <section className="space-y-6">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            舊草嶺全環景點
          </h2>
          <p className="text-sm leading-relaxed text-[#5c4f42]">
            全環約 18–22 km，依騎乘順序：租車 → 舊草嶺隧道 → 石城觀景區 → 萊萊地質 → 三貂角燈塔 → 馬崗潮間帶 → 福連潮池 → 卯澳漁村／石頭厝 → 回福隆。親子可只騎隧道至石城折返。
          </p>
          <div className="grid gap-6">
            {bikeSpots.map((spot, i) => (
              <SpotCard key={spot.id} spot={spot} priority={i === 0} />
            ))}
          </div>
        </section>

        <GuideBookingCta variant="inline" />

        <section className="rounded-2xl border border-[#EDE8E0] bg-white p-5 sm:p-6">
          <h2 className="font-playfair text-xl font-light">相關攻略</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#5c4f42]">
            <li>
              <Link href="/fulong/day-trip" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                福隆一日遊（含單車線與其他路線）
              </Link>
            </li>
            <li>
              <Link href="/fulong/water" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                玩水・浮潛（可與環線分兩天）
              </Link>
            </li>
            <li>
              <Link href="/fulong#2d1n" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                2 天 1 夜山海篇：Day1 環線、Day2 古道
              </Link>
            </li>
          </ul>
        </section>
      </GuideArticleLayout>
    </>
  );
}
