import dynamic from 'next/dynamic';
import Image from 'next/image';
import HeroBackground from '@/components/HeroBackground';
import SiteNav from '@/components/SiteNav';
import HomeFooter from '@/components/home/HomeFooter';
import HomeSeoHub from '@/components/home/HomeSeoHub';
import { PageJsonLd } from '@/components/PageJsonLd';
import { getFaqStructuredData, getStationWalkHowToJsonLd } from '@/lib/structuredData';
import FulongWeatherChip from '@/components/home/FulongWeatherChip';
import {
  AboutAmenityStrip,
  PackagePriceCard,
  RoomPriceDisplay,
  RoomTags,
} from '@/components/home/HomeUi';
import MobileFloatingCtas from '@/components/home/MobileFloatingCtas';
import {
  BOOKING_CTA,
  BUSINESS_ADDRESS,
  BUSINESS_LINE,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGISTRATION,
  BUSINESS_URLS,
  PACKAGE_SECTION,
  ROOMS_SECTION,
  STATION_FIND,
} from '@/lib/business';
import { fetchFulongWeather } from '@/lib/fulongWeather';
import { getImageAlt } from '@/lib/imageAlt';
import {
  DOUBLE_ROOM_IMAGES,
  FAMILY_ROOM_IMAGES,
  PACKAGE_IMAGES,
  ROOM_VIDEOS,
} from '@/lib/media';
import { HOME_H1_TEXT } from '@/lib/seo';

const RoomImageCarousel = dynamic(() => import('@/components/RoomImageCarousel'));
const RenovationSection = dynamic(() => import('@/components/home/RenovationSection'));
const OwltingBookingSection = dynamic(() => import('@/components/OwltingBookingSection'));
const GoogleReviews = dynamic(() => import('@/components/GoogleReviews'));
const GoogleMapEmbed = dynamic(() => import('@/components/GoogleMapEmbed'));
const HomeFulongGuideTeaser = dynamic(() => import('@/components/home/HomeFulongGuideTeaser'));
const NearbyDiningNote = dynamic(() => import('@/components/home/NearbyDiningNote'));
const WebDevTeaser = dynamic(() => import('@/components/home/WebDevTeaser'));

/** Server Component 首頁：互動區塊各自為 client，減少整頁 client bundle */
export default async function HomePage() {
  const weather = await fetchFulongWeather();

  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <PageJsonLd data={[getFaqStructuredData(), getStationWalkHowToJsonLd()]} />
      <SiteNav />

      {/* Hero */}
      <section id="hero" className="relative h-[100dvh] overflow-hidden">
        <HeroBackground />

        <div className="hero-overlay relative z-10">
          <div className="hero-weather-slot">
            <FulongWeatherChip weather={weather} compact />
          </div>

          <div className="hero-logo-safe-zone" aria-hidden />

          <div className="hero-content">
            <h1 className="sr-only">{HOME_H1_TEXT}</h1>

            <div className="hero-subtitle-card">
              <p className="hero-find-badge">{STATION_FIND.badge}</p>
              <p className="hero-subtitle-line hero-subtitle-line--primary">{STATION_FIND.headline}</p>
              <p className="hero-subtitle-line hero-subtitle-line--secondary">{STATION_FIND.sub}</p>
              <ol className="hero-find-steps">
                {STATION_FIND.steps.map((step) => (
                  <li key={step.n} className="hero-find-step">
                    <span className="hero-find-step-n" aria-hidden>
                      {step.n}
                    </span>
                    <span className="hero-find-step-text">
                      <strong>{step.title}</strong>
                      <span>{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <a
              href={BUSINESS_URLS.googleMapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-map-card"
              aria-label={`${STATION_FIND.mapsLabel}：${BUSINESS_ADDRESS.full}`}
            >
              <span className="hero-map-pin" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9.6" r="2.2" fill="currentColor" />
                </svg>
              </span>
              <span className="hero-map-copy">
                <strong>{STATION_FIND.mapsLabel}</strong>
                <span>{BUSINESS_ADDRESS.full}</span>
              </span>
              <span className="hero-map-go" aria-hidden>
                導航
              </span>
            </a>

            <p className="hero-price-line">{BOOKING_CTA.heroPrice}</p>
            <div className="hero-cta-group">
              <a
                href="#booking"
                className="hero-cta-btn primary-booking-btn text-white shadow-lg min-h-[3rem] px-7 text-sm font-semibold sm:text-base"
              >
                {BOOKING_CTA.jumpShort}
              </a>
              <a
                href="#rooms"
                className="hero-cta-secondary hero-cta-btn border border-[#F5E8C7]/65 text-[#F5E8C7] hover:bg-[#F5E8C7]/15 hover:text-white"
              >
                房間介紹
              </a>
            </div>
            <p className="mt-3 hidden text-[11px] leading-relaxed text-[#F5E8C7]/75 sm:block sm:text-xs">
              官網訂房保證最優惠。包房或有疑問再
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 underline decoration-[#00C300]/70 underline-offset-2 hover:text-white"
              >
                {BUSINESS_LINE.inquireLabel}
              </a>
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 hidden -translate-x-1/2 text-[9px] tracking-[2.5px] text-[#F5E8C7]/35 sm:block">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* 房間 */}
      <section id="rooms" className="py-12 scroll-mt-28 md:py-20 md:scroll-mt-20 bg-[#F8F5F1] border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">ROOMS</div>
            <h2 className="text-3xl font-light tracking-tight font-playfair sm:text-5xl">{ROOMS_SECTION.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <RoomImageCarousel
                images={DOUBLE_ROOM_IMAGES}
                label={ROOM_VIDEOS.double.label}
              />
              <div className="p-5 md:p-8">
                <div className="mb-4 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight">
                    <a href="/rooms/double" className="hover:text-[#8B7355] transition-colors">
                      {ROOMS_SECTION.double.title}
                    </a>
                  </h3>
                  <p className="text-[#8B7355] text-sm leading-relaxed">{ROOMS_SECTION.double.subtitle}</p>
                  <RoomTags tags={ROOMS_SECTION.double.tags} />
                  <p className="text-sm text-[#6B665F] leading-relaxed">{ROOMS_SECTION.double.note}</p>
                </div>
                <RoomPriceDisplay
                  pricing={ROOMS_SECTION.double.pricing}
                  rightContent={
                    <div className="text-right text-sm text-[#8B7355]">{ROOMS_SECTION.double.priceNote}</div>
                  }
                />
                <p className="mt-4 text-[10px] text-[#8B7355] leading-relaxed border-t border-[#EDE8E0] pt-3">
                  {ROOMS_SECTION.sharedNote}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm mt-3">
                  <a
                    href="#booking"
                    className="primary-booking-btn px-6 py-2.5 rounded-full text-xs font-semibold"
                  >
                    {BOOKING_CTA.jump}
                  </a>
                  <a
                    href="/rooms/double"
                    className="text-xs text-[#8B7355] hover:text-[#3F3A36] hover:underline"
                  >
                    雙人雅房詳情 →
                  </a>
                </div>
              </div>
            </div>

            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <RoomImageCarousel
                images={FAMILY_ROOM_IMAGES}
                label={ROOM_VIDEOS.family.label}
              />
              <div className="p-5 md:p-8">
                <div className="mb-4 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight">
                      <a href="/rooms/family" className="hover:text-[#8B7355] transition-colors">
                        {ROOMS_SECTION.family.title}
                      </a>
                    </h3>
                    <span className="shrink-0 text-[10px] px-2 py-0.5 bg-[#8B7355] text-white rounded-full">
                      {ROOMS_SECTION.family.badge}
                    </span>
                  </div>
                  <RoomTags tags={ROOMS_SECTION.family.tags} />
                  <p className="text-sm text-[#6B665F] leading-relaxed">{ROOMS_SECTION.family.note}</p>
                </div>
                <RoomPriceDisplay
                  pricing={ROOMS_SECTION.family.pricing}
                  saleSuffix="起 /晚"
                  rightContent={
                    <div className="text-right text-sm text-[#8B7355]">{ROOMS_SECTION.family.priceNote}</div>
                  }
                  footer={
                    <div className="mt-3 pt-3 border-t border-[#E8DFD2]/80 text-sm text-[#6B665F]">
                      {ROOMS_SECTION.family.extraNote}
                    </div>
                  }
                />
                <p className="mt-4 text-[10px] text-[#8B7355] leading-relaxed border-t border-[#EDE8E0] pt-3">
                  {ROOMS_SECTION.sharedNote}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm mt-3">
                  <a
                    href="#booking"
                    className="primary-booking-btn px-6 py-2.5 rounded-full text-xs font-semibold"
                  >
                    {BOOKING_CTA.jump}
                  </a>
                  <a
                    href="/rooms/family"
                    className="text-xs text-[#8B7355] hover:text-[#3F3A36] hover:underline"
                  >
                    家庭雅房詳情 →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            id="package"
            className="mt-16 md:mt-20 scroll-mt-28 md:scroll-mt-24 p-8 md:p-10 rounded-3xl border border-[#EDE8E0] bg-white text-center"
          >
            <div className="text-[#8B7355] text-xs tracking-[3px] mb-2">{PACKAGE_SECTION.eyebrow}</div>
            <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-4 font-playfair leading-snug">
              {PACKAGE_SECTION.title}
            </h3>
            <p className="text-[#6B665F] mb-5 text-sm max-w-2xl mx-auto leading-relaxed">
              {PACKAGE_SECTION.intro}
            </p>

            {/* 包棟照片：民宿大門／外觀 + 房間照整合輪播 */}
            <div className="mb-8 overflow-hidden rounded-2xl border border-[#E8DFD2] text-left">
              <RoomImageCarousel
                images={PACKAGE_IMAGES}
                label="包棟實景：主視覺・房間・公共空間"
              />
            </div>
            <p className="mb-6 text-xs text-[#8B7355]">
              左右滑動：主視覺 → 雙人雅房 4 張 → 家庭雅房 → 走廊 → 公共空間 → 衛浴
            </p>
            <ul className="text-left text-sm text-[#6B665F] max-w-xl mx-auto space-y-2.5 mb-4 leading-relaxed">
              {PACKAGE_SECTION.highlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-[#8B7355] shrink-0">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#8B7355] max-w-xl mx-auto mb-8 leading-relaxed">
              （{PACKAGE_SECTION.ecoNote}）
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
              <PackagePriceCard
                label="平日"
                originalPrice="NT$10,800"
                salePrice="NT$8,800"
                period="週一～週四"
              />
              <PackagePriceCard
                label="假日"
                originalPrice="NT$11,500"
                salePrice="NT$9,200"
                period="週五、週六、假日"
                featured
              />
            </div>

            <div className="text-sm text-[#6B665F] mb-6">{PACKAGE_SECTION.priceNote}</div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#booking"
                className="primary-booking-btn inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold"
              >
                {BOOKING_CTA.package}
              </a>
              <a
                href="/rooms/package"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#3F3A36] text-[#3F3A36] rounded-full text-sm font-medium hover:bg-[#3F3A36] hover:text-white transition-all"
              >
                包棟詳情
              </a>
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00C300] text-white rounded-full text-sm font-medium hover:bg-[#00A000] transition-all"
              >
                LINE詢問包房
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 訂房 */}
      <section
        id="booking"
        className="max-w-4xl mx-auto px-6 py-8 md:py-10 scroll-mt-28 md:scroll-mt-20 border-t border-[#EDE8E0] bg-[#F8F5F1]"
      >
        <div className="text-center mb-4 md:mb-5">
          <div className="text-[#8B7355] text-xs tracking-[4px] mb-1.5">BOOKING</div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-2">{BOOKING_CTA.sectionTitle}</h2>
          <p className="text-sm md:text-base text-[#6B665F] font-medium">{BOOKING_CTA.sectionSubtitle}</p>
        </div>

        <OwltingBookingSection source="home" />
      </section>

      {/* Google 評價 */}
      <section id="reviews" className="bg-[#F8F5F1] py-8 md:py-10 scroll-mt-28 md:scroll-mt-20 border-t border-[#EDE8E0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center px-6 mb-4">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-1.5">留言板</div>
            <h2 className="text-3xl font-light tracking-tight mb-1.5">旅客怎麼說</h2>
            <p className="mx-auto max-w-lg text-xs md:text-sm text-[#6B665F] leading-relaxed">
              左右滑動瀏覽 Google 評價
            </p>
          </div>
          <GoogleReviews />
        </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-10 md:py-12 scroll-mt-28 md:scroll-mt-20 text-center">
        <div className="text-[#8B7355] text-xs tracking-[4px] mb-1.5">A QUIET RETREAT BY THE STATION</div>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3 font-playfair">
          福隆車站旁最近的民宿，
          <br />
          沒開車也能輕鬆入住。
        </h2>
        <p className="max-w-xl mx-auto text-sm text-[#6B665F] leading-relaxed mb-3">
          坐落新北貢寮，福隆車站出站右轉步行約 30 秒即達。一間屋・駅前宿是 2026 年 6 月初全新裝潢的福隆車站民宿與日式背包客棧，溫潤和風空間，專注寧靜與細節，也是前往
          <a href="/fulong" className="text-[#8B7355] hover:underline">
            草嶺古道
          </a>
          與
          <a href="/fulong/bike" className="text-[#8B7355] hover:underline">
            舊草嶺隧道
          </a>
          的便利住宿據點。沒開車、拖行李也很適合，
          <a href="/faq" className="text-[#8B7355] hover:underline">
            交通與入住問題
          </a>
          可先看說明。
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#8B7355]">
          <div>福隆車站民宿・步行 30 秒</div>
          <div>2026年6月初全新裝潢</div>
          <div>{BUSINESS_LINE.ctaLabelShort}</div>
          <div>單車族友善 · 舊草嶺隧道環狀線</div>
        </div>
        <AboutAmenityStrip />
      </section>

      <HomeSeoHub />

      {/* 福隆旅遊攻略精華（完整見 /fulong） */}
      <section id="fulong" className="bg-white py-20 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">FULONG GUIDE</div>
            <h2 className="text-4xl font-light tracking-tight font-playfair sm:text-5xl">
              福隆旅遊攻略
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-[#6B665F] leading-relaxed">
              住一間屋，走出家門就是山海。玩水、單車、潮間帶與健行，皆以車站旁為基地。
            </p>
          </div>
          <HomeFulongGuideTeaser />
        </div>
      </section>

      <RenovationSection />

      {/* 位置 */}
      <section id="location" className="bg-white py-16 scroll-mt-28 md:scroll-mt-20 border-t border-[#EDE8E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#8B7355] text-xs tracking-[4px] mb-3">LOCATION</div>
          <h2 className="text-4xl font-light tracking-tight mb-3">福隆車站民宿｜出站步行 30 秒</h2>
          <p className="mx-auto mb-8 max-w-lg text-sm text-[#6B665F] leading-relaxed">
            沒開車也能輕鬆住：搭火車到福隆站再步行約 30 秒即達。持雙北月票可直達福隆（宜蘭線・新北最後一站），出站右轉就到一間屋· 駅前宿。
          </p>
          <div className="mx-auto mb-8 max-w-md rounded-3xl border border-[#EDE8E0] bg-[#F8F5F1] p-6 text-left text-sm text-[#6B665F]">
            <div className="mb-3 text-base font-medium text-[#3F3A36]">{BUSINESS_NAME}</div>
            <address className="not-italic leading-relaxed">
              <a
                href={BUSINESS_URLS.googleMapsPlace}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3F3A36] hover:underline"
              >
                {BUSINESS_ADDRESS.full}
              </a>
              <div className="mt-2">
                電話：
                <a href={BUSINESS_PHONE.mobileHref} className="hover:text-[#3F3A36] hover:underline">
                  {BUSINESS_PHONE.mobile}
                </a>
              </div>
              <div className="mt-1 text-xs text-[#8B7355]">
                合法民宿登記 {BUSINESS_REGISTRATION}
              </div>
            </address>
          </div>

          <div className="mx-auto mb-8 max-w-lg rounded-3xl border border-[#EDE8E0] bg-white p-6 md:p-7 text-left shadow-sm">
            <p className="text-xs tracking-[0.2em] text-[#8B7355] mb-4 text-center">如何抵達</p>
            <ul className="space-y-4 text-sm text-[#6B665F] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-xl shrink-0" aria-hidden>
                  🚉
                </span>
                <div>
                  <p className="font-medium text-[#3F3A36]">火車＋步行</p>
                  <p className="mt-1">
                    搭台鐵宜蘭線至
                    <span className="text-[#8B7355] font-medium">福隆車站</span>
                    ，出站大廳後馬上右轉直走，
                    <span className="text-[#8B7355] font-medium">約 30 秒</span>
                    即見 <span className="text-[#3F3A36] font-medium">一間屋· 駅前宿</span> 招牌。
                  </p>
                  <p className="mt-2 rounded-xl border border-[#EDE8E0] bg-[#F8F5F1] px-3 py-2 text-xs leading-relaxed text-[#5c4f42]">
                    <span className="font-medium text-[#3F3A36]">雙北月票提醒：</span>
                    持雙北月票可直接搭火車抵達福隆。福隆站位於宜蘭線，是
                    <span className="font-medium text-[#8B7355]">新北市範圍內的最後一站</span>
                    ，從台北、新北出發免再轉其他票證，出站步行即可入住。
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-xl shrink-0" aria-hidden>
                  🛵
                </span>
                <p>
                  <span className="font-medium text-[#3F3A36]">機車・腳踏車</span>
                  <br />
                  門口可停放機車與腳踏車 🚲，單車旅人與機車族都很方便。
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-xl shrink-0" aria-hidden>
                  🚗
                </span>
                <p>
                  <span className="font-medium text-[#3F3A36]">汽車停車建議</span>
                  <br />
                  自駕旅客建議將愛車停放在{' '}
                  <span className="text-[#8B7355] font-medium">濱海公路 7-11 旁停車場</span> 🅿️，較為安全便利，再步行回民宿即可。
                </p>
              </li>
            </ul>
          </div>

          <NearbyDiningNote />

          <div className="mx-auto mb-8 mt-8 max-w-2xl">
            <GoogleMapEmbed />
          </div>

          <div className="relative mx-auto mb-8 max-w-2xl overflow-hidden rounded-3xl aspect-[16/10] bg-[#EDE8E0]">
            <Image
              src="/images/scenery/fulong-station.jpg"
              alt={getImageAlt('/images/scenery/fulong-station.jpg')}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>

          <div className="mt-8 text-center">
            <a
              href="#booking"
              className="primary-booking-btn inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold"
            >
              {BOOKING_CTA.jump}
            </a>
          </div>
        </div>
      </section>

      <WebDevTeaser />
      <MobileFloatingCtas />
      <HomeFooter />
    </main>
  );
}
