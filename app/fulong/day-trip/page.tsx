import Link from 'next/link';
import {
  DayTripDetailCard,
} from '@/components/fulong/ItineraryStyle';
import GuideArticleLayout from '@/components/fulong/GuideArticleLayout';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import { PageJsonLd } from '@/components/PageJsonLd';
import { getFulongArticle } from '@/lib/fulongArticles';
import { FULONG_DAY_TRIPS, splitByVehicle } from '@/lib/fulongGuide';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const article = getFulongArticle('day-trip');
const DAY_TRIPS_BY_VEHICLE = splitByVehicle(FULONG_DAY_TRIPS);

export const metadata = buildPageMetadata({
  title: article.title,
  description: article.description,
  path: article.path,
  keywords: [...FULONG_SEO_KEYWORDS.guide, ...article.keywords],
  ogImage: article.heroImage,
  ogImageAlt: article.shortTitle,
});

export default function FulongDayTripPage() {
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
      <GuideArticleLayout slug="day-trip">
        <section className="prose-none space-y-4">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            為什麼一日遊也要以「一間屋」為起迄？
          </h2>
          <p className="text-sm leading-relaxed text-[#5c4f42] sm:text-base">
            福隆車站出站 30
            秒即達一間屋・駅前宿。當日來回的旅客可先寄放行李再出門；若玩到想慢一點，傍晚直接入住，不必拖著行李趕末班車。以下 6
            條路線皆從一間屋旁出發、當日結束，時間含交通估算。
          </p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-[#5c4f42]">
            <li>無車：優先選沙灘放空、舊草嶺單車（車站可租腳踏車／電輔車）</li>
            <li>有自備汽機車：可選潮間帶、南雅南子吝、草嶺古道</li>
            <li>福隆目前沒有租機車店；跨區請預留回程時間</li>
          </ul>
        </section>

        <GuideBookingCta
          variant="soft"
          title="想當日玩、晚上住？"
          subtitle="先選路線，傍晚再訂房也來得及——官網查空房最直覺。"
        />

        <section className="space-y-6">
          <h2 className="font-playfair text-2xl font-light text-[#2c2416] sm:text-3xl">
            6 條一日遊路線
          </h2>
          <p className="text-sm text-[#6B665F]">
            無自備車方案排在最前（只租腳踏車＆電輔車或步行）。玩不夠可改{' '}
            <Link href="/fulong#2d1n" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
              2 天 1 夜
            </Link>
            。
          </p>
          <p className="text-xs font-semibold tracking-wide text-[#2f6b7a]">
            🚴 只租腳踏車＆電輔車（或步行）
          </p>
          <div className="grid gap-6">
            {DAY_TRIPS_BY_VEHICLE.noVehicle.map((trip) => (
              <DayTripDetailCard key={trip.id} plan={trip} />
            ))}
          </div>
          <p className="text-xs font-semibold tracking-wide text-[#8B5a3c]">
            🛵 需自備機車／汽車
          </p>
          <div className="grid gap-6">
            {DAY_TRIPS_BY_VEHICLE.withVehicle.map((trip) => (
              <DayTripDetailCard key={trip.id} plan={trip} />
            ))}
          </div>
        </section>

        <GuideBookingCta variant="inline" />

        <section className="rounded-2xl border border-[#EDE8E0] bg-white p-5 sm:p-6">
          <h2 className="font-playfair text-xl font-light text-[#2c2416]">讀完一日遊後</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#5c4f42]">
            <li>
              · 想騎單車深化：
              <Link href="/fulong/bike" className="ml-1 font-medium text-[#8B7355] underline-offset-2 hover:underline">
                舊草嶺單車專文
              </Link>
            </li>
            <li>
              · 想玩水浮潛：
              <Link href="/fulong/water" className="ml-1 font-medium text-[#8B7355] underline-offset-2 hover:underline">
                玩水・浮潛專文
              </Link>
            </li>
            <li>
              · 看全部景點與多日行程：
              <Link href="/fulong" className="ml-1 font-medium text-[#8B7355] underline-offset-2 hover:underline">
                完整福隆旅遊攻略
              </Link>
            </li>
          </ul>
        </section>
      </GuideArticleLayout>
    </>
  );
}
