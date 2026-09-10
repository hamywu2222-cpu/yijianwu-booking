import Image from 'next/image';
import Link from 'next/link';
import {
  CategorySectionHeader,
  DayTripDetailCard,
  MultiDayDetailCard,
} from '@/components/fulong/ItineraryStyle';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import HomeSeasonCards from '@/components/home/HomeSeasonCards';
import SkyArtGuidePanel from '@/components/fulong/SkyArtGuidePanel';
import SpotCard from '@/components/fulong/SpotCard';
import { PageJsonLd } from '@/components/PageJsonLd';
import { BOOKING_CTA } from '@/lib/business';
import { FULONG_ARTICLE_SERIES } from '@/lib/fulongArticles';
import {
  FULONG_BIKE_SPOTS,
  FULONG_CATEGORY_META,
  FULONG_DAY_TRIPS,
  FULONG_EXTRA_SPOTS,
  FULONG_GUIDE_PAGE,
  FULONG_HIKE_SPOTS,
  FULONG_HUB_PRINCIPLE,
  FULONG_MULTI_DAY_ITINERARIES,
  FULONG_PERSONA_ITINERARIES,
  FULONG_PRACTICAL_TIPS,
  FULONG_SNORKEL_SPOTS,
  FULONG_WATER_SPOTS,
  sortSpotsByDistance,
  splitByVehicle,
  type FulongSpot,
} from '@/lib/fulongGuide';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { FULONG_GUIDE } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getFulongGuideStructuredData } from '@/lib/structuredData';

export const metadata = buildPageMetadata({
  title: '福隆旅遊攻略｜福隆車站民宿出發・單車玩水健行',
  description: FULONG_GUIDE_PAGE.description,
  path: '/fulong',
  keywords: [
    ...FULONG_SEO_KEYWORDS.tier1,
    ...FULONG_SEO_KEYWORDS.guide,
    '草嶺古道',
    '桃源谷',
    '卯澳浮潛',
    '龍洞潛水',
    '馬崗潮間帶',
    '三貂角燈塔',
    '福隆純素餐廳',
    '星空藝素村',
    '浪濤海玻璃',
  ],
});

const DAY_TRIPS_BY_VEHICLE = splitByVehicle(FULONG_DAY_TRIPS);
const STAYS_BY_VEHICLE = splitByVehicle(FULONG_MULTI_DAY_ITINERARIES);

const CATEGORY_TONE: Record<
  'water' | 'snorkel' | 'bike' | 'hike' | 'culture' | 'food',
  'sand' | 'bike' | 'reef' | 'trail'
> = {
  water: 'sand',
  snorkel: 'reef',
  bike: 'bike',
  hike: 'trail',
  culture: 'trail',
  food: 'sand',
};

function CategoryBlock({
  id,
  category,
  spots,
}: {
  id: string;
  category: keyof typeof FULONG_CATEGORY_META;
  spots: FulongSpot[];
}) {
  const meta = FULONG_CATEGORY_META[category];
  const tone = CATEGORY_TONE[category] ?? 'sand';
  return (
    <section id={id} className="scroll-mt-24">
      <CategorySectionHeader
        emoji={meta.emoji}
        title={meta.title}
        intro={meta.intro}
        tone={tone}
      />
      <div className="grid gap-6 lg:gap-8">
        {spots.map((spot, i) => (
          <SpotCard key={spot.id} spot={spot} priority={i === 0 && id === 'water'} />
        ))}
      </div>
    </section>
  );
}

export default function FulongPage() {
  return (
    <>
      <PageJsonLd
        data={[
          getFulongGuideStructuredData(),
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '福隆旅遊攻略', path: '/fulong' },
          ]),
        ]}
      />

      <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
        <header className="border-b border-[#EDE8E0] bg-[#F8F5F1]/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-4 sm:px-6">
            <Link href="/" className="shrink-0 text-sm font-medium text-[#8B7355] hover:text-[#3F3A36]">
              ← 一間屋・駅前宿
            </Link>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span
                className="fulong-guide-btn fulong-guide-btn--nav text-[10px] sm:text-[11px] px-2.5 py-1 opacity-90 cursor-default pointer-events-none"
                aria-current="page"
              >
                <span>福隆旅遊攻略</span>
              </span>
              <Link
                href="/booking"
                className="primary-booking-btn inline-flex rounded-full px-4 py-2.5 text-sm font-semibold"
              >
                {BOOKING_CTA.jump}
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#EDE8E0]">
          <div className="absolute inset-0">
            <Image
              src="/images/scenery/fulong-beach-aerial.jpg"
              alt="福隆海水浴場航拍"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c2416ee] via-[#2c241688] to-[#2c241644]" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <p className="text-xs font-medium tracking-[3px] text-[#e8d5b5]">
              {FULONG_GUIDE_PAGE.eyebrow}
            </p>
            <h1 className="mt-2 font-playfair text-4xl font-light leading-tight text-white sm:text-5xl">
              {FULONG_GUIDE_PAGE.title}
            </h1>
            <p className="mt-2 text-lg text-[#f0e6d8] sm:text-xl">{FULONG_GUIDE_PAGE.subtitle}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {FULONG_GUIDE_PAGE.description}
            </p>
            <nav className="mt-6 max-w-xl space-y-2.5" aria-label="攻略快速跳轉">
              <div className="rounded-2xl border border-white/20 bg-black/25 p-3 backdrop-blur-sm">
                <p className="mb-2 text-[10px] font-semibold tracking-wide text-[#cfe8e0]">
                  🚴 只租腳踏車＆電輔車
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { href: '#day1', label: '1 日遊' },
                    { href: '#2d1n', label: '2 天 1 夜' },
                    { href: '#3d2n', label: '3 天 2 夜' },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-emerald-200/30 bg-white/10 px-2 py-2 text-center text-[11px] font-medium leading-tight text-white hover:bg-white/20 sm:text-xs"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-black/25 p-3 backdrop-blur-sm">
                <p className="mb-2 text-[10px] font-semibold tracking-wide text-[#f3d2bc]">
                  🛵 需自備機車／汽車
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { href: '#day1-car', label: '1 日遊' },
                    { href: '#2d1n-car', label: '2 天 1 夜' },
                    { href: '#3d2n-car', label: '3 天 2 夜' },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-orange-200/30 bg-white/10 px-2 py-2 text-center text-[11px] font-medium leading-tight text-white hover:bg-white/20 sm:text-xs"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <a
                  href="#season-now"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/35 bg-white/10 px-2 py-2 text-center text-[11px] text-white backdrop-blur-sm hover:bg-white/20 sm:text-xs"
                >
                  本季活動
                </a>
                <Link
                  href="/booking"
                  className="primary-booking-btn inline-flex min-h-10 items-center justify-center rounded-xl px-3 py-2 text-center text-[11px] font-semibold sm:text-xs"
                >
                  {BOOKING_CTA.jump}
                </Link>
                <Link
                  href="/fulong/day-trip"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/35 bg-white/10 px-2 py-2 text-center text-[11px] text-white backdrop-blur-sm hover:bg-white/20 sm:text-xs"
                >
                  ☀️ 一日遊專頁
                </Link>
                <Link
                  href="/fulong/bike"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/35 bg-white/10 px-2 py-2 text-center text-[11px] text-white backdrop-blur-sm hover:bg-white/20 sm:text-xs"
                >
                  🚴 舊草嶺單車
                </Link>
                <Link
                  href="/fulong/water"
                  className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/35 bg-white/10 px-2 py-2 text-center text-[11px] text-white backdrop-blur-sm hover:bg-white/20 sm:text-xs"
                >
                  🤿 玩水・浮潛
                </Link>
              </div>
            </nav>
          </div>
        </section>

        <article className="mx-auto max-w-3xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
          <HomeSeasonCards />

          {/* 基地 */}
          <section id="base" className="scroll-mt-24">
            <p className="text-xs tracking-[3px] text-[#8B7355]">BASE</p>
            <h2 className="mt-1 font-playfair text-2xl font-light sm:text-3xl">
              為什麼以一間屋為基地？
            </h2>
            <div className="mt-4 rounded-2xl border border-[#e8e0d4] bg-white p-5 sm:p-6">
              <p className="font-medium text-[#2c2416]">{FULONG_GUIDE_PAGE.base.name}</p>
              <p className="mt-1 text-sm text-[#8B7355]">{FULONG_GUIDE_PAGE.base.highlight}</p>
              <p className="mt-1 text-sm text-[#6B665F]">{FULONG_GUIDE_PAGE.base.address}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5c4f42]">
                {FULONG_GUIDE_PAGE.base.note}
              </p>
              <div className="mt-5 border-t border-[#EDE8E0] pt-4">
                <h3 className="font-playfair text-lg text-[#2c2416]">
                  {FULONG_GUIDE.walking.title}
                </h3>
                <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-[#5c4f42]">
                  {FULONG_GUIDE.walking.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-2 text-xs text-[#9a9086]">{FULONG_GUIDE.walking.note}</p>
              </div>
            </div>
          </section>

          {/* 目錄 */}
          <nav
            id="toc"
            className="scroll-mt-24 rounded-2xl border border-[#e8e0d4] bg-white p-5"
            aria-label="攻略目錄"
          >
            <p className="text-xs font-semibold tracking-wide text-[#8B7355]">本頁目錄</p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {FULONG_GUIDE_PAGE.toc.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#3F3A36] hover:bg-[#F8F5F1]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B7355]/15 text-[11px] font-bold text-[#8B7355]">
                      {i + 1}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <SkyArtGuidePanel />

          <GuideBookingCta
            variant="soft"
            title="先看好行程，再決定住幾晚"
            subtitle="一間屋出站 30 秒，寄行李再出門；玩到想慢就直接訂房 overnight。"
          />

          {/* ── 行程（置頂） ── */}
          <section id="plans" className="scroll-mt-24">
            <p className="text-xs tracking-[3px] text-[#8B7355]">ITINERARY</p>
            <h2 className="mt-1 font-playfair text-2xl font-light sm:text-3xl">
              {FULONG_HUB_PRINCIPLE.title}
            </h2>
            <p className="mt-2 text-sm text-[#6B665F]">{FULONG_HUB_PRINCIPLE.base}</p>
            <ul className="mt-4 space-y-2 rounded-2xl border border-[#e8e0d4] bg-white p-5 text-sm text-[#5c4f42]">
              {FULONG_HUB_PRINCIPLE.rules.map((rule) => (
                <li key={rule} className="flex gap-2">
                  <span className="shrink-0 text-[#8B7355]" aria-hidden>
                    ●
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>

            {/* 1 日遊 */}
            <div className="mt-12">
              <p className="text-[10px] tracking-[0.28em] text-[#8B7355]">DAY TRIPS</p>
              <h3 className="mt-1 font-playfair text-xl text-[#2c2416] sm:text-2xl">
                1 日遊
                <span className="text-[#8B7355]">（當日來回 · 不含住宿）</span>
              </h3>
              <p className="mt-2 text-sm text-[#6B665F]">
                皆從一間屋旁出發、當日結束回家。無自備車方案排在最前，只需火車＋步行或租腳踏車／電輔車。
              </p>
              <div
                className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-[#8B7355]"
                aria-hidden
              >
                <span className="inline-flex items-center gap-1 rounded-full border border-[#e8d5a8] bg-white/80 px-2 py-0.5">
                  ☀️ 出發
                </span>
                <span className="text-[#d4c4a8]">→</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#e8e0d4] bg-white/80 px-2 py-0.5">
                  行程
                </span>
                <span className="text-[#d4c4a8]">→</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#c4785a]/40 bg-[#c4785a]/15 px-2 py-0.5 text-[#8B5a3c]">
                  🚂 回家
                </span>
              </div>
              <p
                id="day1"
                className="mt-5 scroll-mt-24 text-xs font-semibold tracking-wide text-[#2f6b7a]"
              >
                🚴 只租腳踏車＆電輔車（或步行）
              </p>
              <div className="mt-3 space-y-5">
                {DAY_TRIPS_BY_VEHICLE.noVehicle.map((plan) => (
                  <DayTripDetailCard key={plan.id} plan={plan} />
                ))}
              </div>
              <p
                id="day1-car"
                className="mt-8 scroll-mt-24 text-xs font-semibold tracking-wide text-[#8B5a3c]"
              >
                🛵 需自備機車／汽車
              </p>
              <div className="mt-3 space-y-5">
                {DAY_TRIPS_BY_VEHICLE.withVehicle.map((plan) => (
                  <DayTripDetailCard key={plan.id} plan={plan} />
                ))}
              </div>
              <p className="mt-4 text-center text-sm">
                <Link
                  href="/fulong/day-trip"
                  className="font-medium text-[#8B7355] underline-offset-2 hover:underline"
                >
                  📖 福隆一日遊完整路線 →
                </Link>
              </p>
            </div>

            <GuideBookingCta variant="inline" className="my-8" />

            {/* 多日行程 */}
            <div className="mt-12">
              <p className="text-[10px] tracking-[0.28em] text-[#8B7355]">MULTI-DAY STAYS</p>
              <h3 className="mt-1 font-playfair text-xl text-[#2c2416] sm:text-2xl">
                多日行程
                <span className="text-[#8B7355]">（中間夜宿一間屋 · 最後回家）</span>
              </h3>
              <p className="mt-2 text-sm text-[#6B665F]">
                每晚 overnight 固定一間屋，不換宿。無自備車的 2 天 1 夜、3 天 2 夜排在最前。
              </p>
              <div
                className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-[#8B7355]"
                aria-hidden
              >
                <span className="inline-flex items-center gap-1 rounded-full border border-[#e8d5a8] bg-white/80 px-2 py-0.5">
                  ☀️ 入住
                </span>
                <span className="text-[#d4c4a8]">→</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#1a1a2e]/30 bg-[#1a1a2e] px-2 py-0.5 text-white/90">
                  🌙 夜宿一間屋
                </span>
                <span className="text-[#d4c4a8]">→</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#c4785a]/40 bg-[#c4785a]/15 px-2 py-0.5 text-[#8B5a3c]">
                  🚂 回家
                </span>
              </div>
              <p className="mt-5 text-xs font-semibold tracking-wide text-[#2f6b7a]">
                🚴 2 天 1 夜／3 天 2 夜 · 只租腳踏車＆電輔車
              </p>
              <div className="mt-3 space-y-6">
                {STAYS_BY_VEHICLE.noVehicle.map((it) => (
                  <MultiDayDetailCard key={it.id} itinerary={it} />
                ))}
              </div>
              <p
                id="stays-car"
                className="mt-8 scroll-mt-24 text-xs font-semibold tracking-wide text-[#8B5a3c]"
              >
                🛵 需自備機車／汽車／跨區
              </p>
              <div id="2d1n-car" className="mt-3 scroll-mt-24 space-y-6">
                {STAYS_BY_VEHICLE.withVehicle
                  .filter((it) => it.id.startsWith('2d1n'))
                  .map((it) => (
                    <MultiDayDetailCard key={it.id} itinerary={it} />
                  ))}
              </div>
              <div id="3d2n-car" className="mt-6 scroll-mt-24 space-y-6">
                {STAYS_BY_VEHICLE.withVehicle
                  .filter((it) => it.id.startsWith('3d2n'))
                  .map((it) => (
                    <MultiDayDetailCard key={it.id} itinerary={it} />
                  ))}
              </div>
            </div>

            {/* 各族群 */}
            <h3
              id="personas"
              className="mt-12 scroll-mt-24 font-playfair text-xl text-[#2c2416] sm:text-2xl"
            >
              各族群行程（獨旅・情侶・家庭・環島・單車客）
            </h3>
            <p className="mt-2 text-sm text-[#6B665F]">
              無論哪種族群，出發與 overnight 都以一間屋為中心展開。
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-1">
              {FULONG_PERSONA_ITINERARIES.map((p) => (
                <article
                  key={p.id}
                  id={p.id}
                  className="scroll-mt-24 rounded-2xl border border-[#e8e0d4] bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xl" aria-hidden>
                      {p.emoji}
                    </span>
                    <h4 className="font-playfair text-xl text-[#2c2416]">{p.persona}</h4>
                    <span className="rounded-full bg-[#8B7355]/12 px-2.5 py-0.5 text-[11px] text-[#8B7355]">
                      {p.stay}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#5c4f42]">{p.summary}</p>
                  <p className="mt-1 text-xs text-[#9a9086]">交通建議：{p.transport}</p>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-[#5c4f42]">
                    {p.plan.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                  <p className="mt-3 text-xs leading-relaxed text-[#8B7355]">
                    為什麼住一間屋：{p.whyHub}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* ── 景點介紹（行程下方） ── */}
          <section id="spots" className="scroll-mt-24 space-y-16">
            <div>
              <p className="text-xs tracking-[3px] text-[#8B7355]">SPOTS</p>
              <h2 className="mt-1 font-playfair text-2xl font-light sm:text-3xl">
                景點介紹
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B665F]">
                行程看完後，再依主題深入各景點：距離、交通與玩法細節都在這裡。
              </p>
            </div>

            <CategoryBlock
              id="water"
              category="water"
              spots={sortSpotsByDistance(FULONG_WATER_SPOTS)}
            />
            <CategoryBlock
              id="snorkel"
              category="snorkel"
              spots={sortSpotsByDistance(FULONG_SNORKEL_SPOTS)}
            />
            <CategoryBlock
              id="bike"
              category="bike"
              spots={sortSpotsByDistance(FULONG_BIKE_SPOTS)}
            />
            <CategoryBlock
              id="hike"
              category="hike"
              spots={sortSpotsByDistance(FULONG_HIKE_SPOTS)}
            />

            <div className="scroll-mt-24">
              <h2 className="font-playfair text-2xl font-light sm:text-3xl">燈塔・補給</h2>
              <p className="mt-2 text-sm text-[#6B665F]">
                短程好拍、行程中場休息。（距一間屋由近到遠）
              </p>
              <div className="mt-6 grid gap-6">
                {sortSpotsByDistance(FULONG_EXTRA_SPOTS).map((spot) => (
                  <SpotCard key={spot.id} spot={spot} />
                ))}
              </div>
            </div>
          </section>

          {/* 實用提醒 */}
          <section id="tips" className="scroll-mt-24">
            <h2 className="font-playfair text-2xl font-light sm:text-3xl">實用提醒</h2>
            <ul className="mt-4 space-y-2 rounded-2xl border border-[#e8e0d4] bg-white p-5 text-sm text-[#5c4f42]">
              {FULONG_PRACTICAL_TIPS.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="text-[#8B7355]" aria-hidden>
                    ✓
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          <GuideBookingCta
            variant="banner"
            title="玩完山海，走回車站旁的家"
            subtitle="福隆火車站出站 30 秒・一間屋・駅前宿。行李寄放、單車停放，讓行程更從容。"
          />

          <nav className="rounded-2xl border border-[#EDE8E0] bg-white p-6" aria-label="相關頁面">
            <p className="text-sm font-medium text-[#8B7355]">延伸閱讀</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {FULONG_ARTICLE_SERIES.map((a) => (
                <li key={a.slug}>
                  <Link href={a.path} className="text-[#3F3A36] underline-offset-2 hover:underline">
                    {a.emoji} {a.shortTitle}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rooms/double" className="text-[#3F3A36] underline-offset-2 hover:underline">
                  和鳴雙人房
                </Link>
              </li>
              <li>
                <Link href="/rooms/family" className="text-[#3F3A36] underline-offset-2 hover:underline">
                  家庭房
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#3F3A36] underline-offset-2 hover:underline">
                  常見問題
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[#3F3A36] underline-offset-2 hover:underline">
                  訂房
                </Link>
              </li>
              <li>
                <Link href="/" className="text-[#3F3A36] underline-offset-2 hover:underline">
                  首頁
                </Link>
              </li>
            </ul>
          </nav>
        </article>

        {/* 長頁快速回目錄 */}
        <a
          href="#toc"
          className="fulong-toc-fab"
          aria-label="回到本頁目錄"
        >
          <span className="fulong-toc-fab__icon" aria-hidden>
            ↑
          </span>
          <span className="fulong-toc-fab__label">目錄</span>
        </a>
      </main>
    </>
  );
}
