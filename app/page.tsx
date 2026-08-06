import Image from 'next/image';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import GoogleReviews from '@/components/GoogleReviews';
import OwltingBookingSection from '@/components/OwltingBookingSection';
import HeroBackground from '@/components/HeroBackground';
import SiteNav from '@/components/SiteNav';
import RoomImageCarousel from '@/components/RoomImageCarousel';
import SceneryGallery from '@/components/SceneryGallery';
import HomeFooter from '@/components/home/HomeFooter';
import MobileFloatingCtas from '@/components/home/MobileFloatingCtas';
import RenovationSection from '@/components/home/RenovationSection';
import WebDevTeaser from '@/components/home/WebDevTeaser';
import {
  AboutAmenityStrip,
  OutdoorRouteGrid,
  PackagePriceCard,
  RoomPriceDisplay,
  RoomTags,
} from '@/components/home/HomeUi';
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
} from '@/lib/business';
import { getImageAlt } from '@/lib/imageAlt';
import { HOME_H1_TEXT } from '@/lib/seo';
import {
  FULONG_SECTION,
  OUTDOOR_FRIENDLY,
  DOUBLE_ROOM_IMAGES,
  FAMILY_ROOM_IMAGES,
  PACKAGE_IMAGES,
  ROOM_VIDEOS,
  SCENERY_IMAGES,
} from '@/lib/media';

/** Server Component 首頁：互動區塊各自為 client，減少整頁 client bundle */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <SiteNav />

      {/* Hero */}
      <section className="relative h-[100dvh] overflow-hidden">
        <HeroBackground />

        <div
          className="relative z-10 flex h-full flex-col"
          style={{ paddingTop: 'var(--site-nav-offset, 7.25rem)' }}
        >
          <div className="hero-logo-safe-zone flex-1 min-h-[28vh] sm:min-h-[32vh] md:min-h-[38vh]" aria-hidden />

          <div className="hero-content">
            <h1 className="sr-only">{HOME_H1_TEXT}</h1>

            <div className="hero-subtitle-card">
              <p className="hero-subtitle-line hero-subtitle-line--primary">福隆民宿・新北海邊住宿</p>
              <p className="hero-subtitle-line hero-subtitle-line--secondary">福隆車站出站 30 秒</p>
            </div>

            <div className="hero-cta-group">
              <a
                href="#booking"
                className="hero-cta-btn bg-[#F5E8C7] text-[#3F3A36] shadow hover:bg-white"
              >
                {BOOKING_CTA.jump}
              </a>
              <a
                href="#rooms"
                className="hero-cta-btn border border-[#F5E8C7]/65 text-[#F5E8C7] hover:bg-[#F5E8C7] hover:text-[#3F3A36]"
              >
                查看房間
              </a>
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn bg-[#00C300] text-white hover:bg-[#00A000]"
              >
                LINE 門禁密碼
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 hidden -translate-x-1/2 text-[9px] tracking-[2.5px] text-[#F5E8C7]/35 sm:block">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* 關於我們 */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-10 md:py-12 scroll-mt-28 md:scroll-mt-20 text-center">
        <div className="text-[#8B7355] text-xs tracking-[4px] mb-1.5">A QUIET RETREAT BY THE STATION</div>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-3 font-playfair">
          在福隆車站旁，
          <br />
          有一間溫柔的福隆背包客棧。
        </h2>
        <p className="max-w-xl mx-auto text-sm text-[#6B665F] leading-relaxed mb-3">
          坐落新北貢寮，福隆車站步行 30 秒即達。一間屋・駅前宿是 2026 年 5 月全新裝潢的福隆青年旅館與日式民宿，溫潤和風空間，專注寧靜與細節，也是前往草嶺古道與舊草嶺隧道的便利住宿據點。
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#8B7355]">
          <div>福隆車站步行 30 秒</div>
          <div>2026年5月全新裝潢</div>
          <div>LINE 接收入住門禁密碼</div>
          <div>單車族友善 · 舊草嶺隧道環狀線</div>
        </div>
        <AboutAmenityStrip />
      </section>

      {/* 房間 */}
      <section id="rooms" className="py-20 scroll-mt-28 md:scroll-mt-20 bg-[#F8F5F1] border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">ROOMS</div>
            <h2 className="text-5xl font-light tracking-tight font-playfair">{ROOMS_SECTION.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <RoomImageCarousel
                images={DOUBLE_ROOM_IMAGES}
                label={ROOM_VIDEOS.double.label}
                priority
              />
              <div className="p-5 md:p-8">
                <div className="mb-4 space-y-2">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight">
                    {ROOMS_SECTION.double.title}
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
                    className="px-6 py-2.5 bg-[#3F3A36] text-white rounded-full hover:bg-[#2C2926] transition-colors text-xs font-medium"
                  >
                    {BOOKING_CTA.jump}
                  </a>
                  <a
                    href="/rooms/double"
                    className="text-xs text-[#8B7355] hover:text-[#3F3A36] hover:underline"
                  >
                    雙人房詳情 →
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
                      {ROOMS_SECTION.family.title}
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
                    className="px-6 py-2.5 bg-[#3F3A36] text-white rounded-full hover:bg-[#2C2926] transition-colors text-xs font-medium"
                  >
                    {BOOKING_CTA.jump}
                  </a>
                  <a
                    href="/rooms/family"
                    className="text-xs text-[#8B7355] hover:text-[#3F3A36] hover:underline"
                  >
                    家庭房詳情 →
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
                label="包棟實景：大門・外觀 × 房間"
              />
            </div>
            <p className="mb-6 text-xs text-[#8B7355]">
              左右滑動查看：民宿大門／外觀、和鳴雙人房、和風家庭房
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
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#3F3A36] text-white rounded-full text-sm font-medium hover:bg-[#2C2926] transition-all"
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
                LINE {BUSINESS_LINE.id}（門禁密碼）
              </a>
            </div>
          </div>
        </div>
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

      {/* 福隆風景 */}
      <section id="fulong" className="bg-white py-20 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">FULONG SCENERY</div>
            <h2 className="text-5xl font-light tracking-tight font-playfair">福隆，走出家門就是風景</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-[#6B665F] leading-relaxed">
              {FULONG_SECTION.intro}
            </p>
            <a
              href="/fulong"
              className="mt-3 inline-block text-xs text-[#8B7355] hover:text-[#3F3A36] hover:underline"
            >
              福隆怎麼玩完整攻略 →
            </a>
          </div>
          <SceneryGallery items={SCENERY_IMAGES} />

          <div className="mt-12 bg-[#F8F5F1] p-6 md:p-8 rounded-3xl space-y-8">
            <div className="text-center md:text-left">
              <div className="text-[#8B7355] text-xs tracking-[3px] mb-1">{OUTDOOR_FRIENDLY.eyebrow}</div>
              <h3 className="text-xl md:text-2xl font-light tracking-tight mb-2">{OUTDOOR_FRIENDLY.title}</h3>
              <p className="text-sm text-[#6B665F] leading-relaxed">{OUTDOOR_FRIENDLY.intro}</p>
            </div>

            <OutdoorRouteGrid
              title={OUTDOOR_FRIENDLY.cycling.title}
              intro={OUTDOOR_FRIENDLY.cycling.intro}
              routes={OUTDOOR_FRIENDLY.cycling.routes}
            />

            <div className="border-t border-[#E8DFD2] pt-8">
              <OutdoorRouteGrid
                title={OUTDOOR_FRIENDLY.hiking.title}
                intro={OUTDOOR_FRIENDLY.hiking.intro}
                routes={OUTDOOR_FRIENDLY.hiking.routes}
              />
            </div>
          </div>
        </div>
      </section>

      <RenovationSection />

      {/* 位置 */}
      <section id="location" className="bg-white py-16 scroll-mt-28 md:scroll-mt-20 border-t border-[#EDE8E0]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[#8B7355] text-xs tracking-[4px] mb-3">LOCATION</div>
          <h2 className="text-4xl font-light tracking-tight mb-3">福隆車站前 30 秒・新北貢寮住宿</h2>
          <p className="mx-auto mb-8 max-w-lg text-sm text-[#6B665F] leading-relaxed">
            出站即達，走路比等紅綠燈還快。跟著下方指引，輕鬆找到一間屋· 駅前宿。
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
                <p>
                  <span className="font-medium text-[#3F3A36]">步行指引</span>
                  <br />
                  出福隆車站大廳，馬上右轉直走，
                  <span className="text-[#8B7355] font-medium">30 秒內</span>
                  就會看到 <span className="text-[#3F3A36] font-medium">一間屋· 駅前宿</span> 招牌，即抵達。
                </p>
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

          <div className="mx-auto mb-8 max-w-2xl">
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

          <div className="bg-[#F8F5F1] p-8 rounded-3xl text-left max-w-md mx-auto">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>福隆海水浴場</span>{' '}
                <span className="text-[#8B7355]">步行 8 分鐘 · 海邊玩水</span>
              </li>
              <li className="flex justify-between">
                <span>舊草嶺隧道</span>{' '}
                <span className="text-[#8B7355]">單車約 15 分鐘 · 環狀線經典</span>
              </li>
              <li className="flex justify-between">
                <span>舊草嶺隧道環狀線</span>{' '}
                <span className="text-[#8B7355]">沿海騎行 · 藍天碧海</span>
              </li>
              <li className="flex justify-between">
                <span>貢寮老街</span> <span className="text-[#8B7355]">車程 10 分鐘</span>
              </li>
              <li className="flex justify-between">
                <span>九份老街</span> <span className="text-[#8B7355]">車程 35 分鐘</span>
              </li>
              <li className="flex justify-between">
                <span>登山步道</span> <span className="text-[#8B7355]">附近輕鬆爬山路線</span>
              </li>
              <li className="flex justify-between">
                <span>單車道</span> <span className="text-[#8B7355]">東北角海岸自行車道起點</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#3F3A36] text-white rounded-full text-sm font-medium hover:bg-[#2C2926] transition-all"
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
