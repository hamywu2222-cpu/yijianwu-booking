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
  FULONG_DAY_TRIPS,
  FULONG_SNORKEL_SPOTS,
  FULONG_WATER_SPOTS,
  sortSpotsByDistance,
} from '@/lib/fulongGuide';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const article = getFulongArticle('water');

const dayWater = FULONG_DAY_TRIPS.find((t) => t.id === 'day-beach') ?? FULONG_DAY_TRIPS[0];
const daySnorkel = FULONG_DAY_TRIPS.find((t) => t.id === 'day-snorkel') ?? FULONG_DAY_TRIPS[2];

export const metadata = buildPageMetadata({
  title: article.title,
  description: article.description,
  path: article.path,
  keywords: [...FULONG_SEO_KEYWORDS.guide, ...article.keywords],
  ogImage: article.heroImage,
  ogImageAlt: article.shortTitle,
});

export default function FulongWaterPage() {
  const waterSpots = sortSpotsByDistance(FULONG_WATER_SPOTS);
  const snorkelSpots = sortSpotsByDistance(FULONG_SNORKEL_SPOTS);

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
      <GuideArticleLayout slug="water">
        <section className="space-y-4">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            從金沙灘到潮間帶：一間屋當 overnight 基地
          </h2>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            福隆海水浴場從一間屋步行約 8–12 分即可抵達；若要往福連潮池、馬崗、卯澳或龍洞，建議自備汽機車或預留大眾運輸時間。玩水後回民宿沖澡、放行李，比當日拖著濕裝備趕火車輕鬆很多。
          </p>
          <div className="rounded-2xl border border-[#e8e0d4] bg-white p-4 text-sm text-[#5c4f42]">
            <p className="font-semibold text-[#8B7355]">安全與潮汐</p>
            <ul className="mt-2 space-y-1.5">
              <li>· 潮間帶／潮池務必對潮汐與海象，浪大勿下</li>
              <li>· 岩岸穿防滑鞋；浮潛建議救生衣與教練指引</li>
              <li>· 東北季風季（約 10–3 月）沿海風浪大，可改沙灘散步</li>
              <li>· 小孩戲水請家長全程陪同</li>
            </ul>
          </div>
        </section>

        <GuideBookingCta
          variant="soft"
          title="玩水後想沖澡 overnight？"
          subtitle="車站旁一間屋，濕裝備回房整理，隔天再出發。"
        />

        <section className="space-y-4">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            建議行程
          </h2>
          <div className="grid gap-6">
            {dayWater ? <DayTripDetailCard plan={dayWater} /> : null}
            {daySnorkel && daySnorkel !== dayWater ? (
              <DayTripDetailCard plan={daySnorkel} />
            ) : null}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            玩水・沙灘
          </h2>
          <div className="grid gap-6">
            {waterSpots.map((spot, i) => (
              <SpotCard key={spot.id} spot={spot} priority={i === 0} />
            ))}
          </div>
        </section>

        <GuideBookingCta variant="inline" />

        <section className="space-y-6">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            浮潛・潮間帶・潛水
          </h2>
          <div className="grid gap-6">
            {snorkelSpots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#EDE8E0] bg-white p-5 sm:p-6">
          <h2 className="font-playfair text-xl font-light">相關攻略</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#5c4f42]">
            <li>
              <Link href="/fulong/day-trip" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                福隆一日遊全部路線
              </Link>
            </li>
            <li>
              <Link href="/fulong/bike" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                舊草嶺單車（可隔天安排）
              </Link>
            </li>
            <li>
              <Link href="/fulong#2d1n-water" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                2 天 1 夜慢活篇：水上＋沙灘＋舊草嶺隧道
              </Link>
            </li>
            <li>
              <Link href="/fulong#3d2n" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
                3 天 2 夜：雙溪夕陽＋舊草嶺環線＋草嶺古道
              </Link>
            </li>
          </ul>
        </section>
      </GuideArticleLayout>
    </>
  );
}
