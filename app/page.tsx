'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import OwltingBookingSection from '@/components/OwltingBookingSection';
import HeroBackground from '@/components/HeroBackground';
import BrandTagline from '@/components/BrandTagline';
import SiteNav from '@/components/SiteNav';
import RoomVideoPlayer from '@/components/RoomVideoPlayer';
import SceneryGallery from '@/components/SceneryGallery';
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
import {
  ABOUT_AMENITIES,
  FULONG_SECTION,
  OUTDOOR_FRIENDLY,
  ROOM_VIDEOS,
  SCENERY_IMAGES,
  WEB_DEV_FEATURES,
  WEB_DEV_REQUIREMENTS,
} from '@/lib/media';

const RENOVATION_IMAGES = {
  before: [
    '/images/photo_2026-04-25_01-38-33.jpg',
    '/images/photo_2026-04-25_01-38-38.jpg',
    '/images/photo_2026-04-26_16-17-21.jpg',
  ],
  during: [
    '/images/photo_2026-05-01_23-59-02.jpg',
    '/images/photo_2026-05-01_23-59-09.jpg',
  ],
  after: [
    '/images/double_room.jpg',
    '/images/photo_2026-06-18_02-06-05.jpg',
    '/images/facilities.jpg',
    '/images/hallway.jpg',
    '/images/hallway2.jpg',
    '/images/hallway3.jpg',
    '/images/bathroom.jpg',
    '/images/double_room2.jpg',
    '/images/exterior3.jpg',
    '/images/exterior4.jpg',
  ],
} as const;

function AboutAmenityStrip() {
  return (
    <div className="mt-7 max-w-2xl mx-auto rounded-2xl border border-[#EDE8E0]/90 bg-white/50 px-3 py-3 md:px-4 md:py-3.5">
      <p className="text-[10px] tracking-[3px] text-[#8B7355] mb-2.5">入住配套</p>
      <ul className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {ABOUT_AMENITIES.map(({ icon, label }) => (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DFD2] bg-[#FFFCF8] px-2.5 py-1 text-[11px] md:text-xs text-[#6B665F] leading-snug"
          >
            <span aria-hidden className="text-[12px] leading-none shrink-0">
              {icon}
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[10px] md:text-xs text-[#8B7355] leading-relaxed">
        行李寄放：入住前後如需暫放，歡迎事先透過 LINE 或電話洽詢。
      </p>
    </div>
  );
}

function PriceOfferBadge() {
  return (
    <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-white/70 border border-[#D9CFC0]/60 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7355] animate-pulse" />
      <span className="text-[10px] tracking-[0.2em] text-[#8B7355] font-medium">官網直訂優惠</span>
    </div>
  );
}

function PriceStrikeThrough({
  originalPrice,
  salePrice,
  saleSuffix = '',
  size = 'md',
  align = 'start',
}: {
  originalPrice: string;
  salePrice: string;
  saleSuffix?: string;
  size?: 'md' | 'lg';
  align?: 'start' | 'center';
}) {
  const saleClass =
    size === 'lg'
      ? 'text-4xl sm:text-5xl font-light text-[#3F3A36] tracking-tight font-playfair leading-none'
      : 'text-3xl sm:text-[2.125rem] font-light text-[#3F3A36] tracking-tight font-playfair leading-none';
  const originalClass =
    size === 'lg' ? 'text-lg sm:text-xl text-[#B0A69A] font-light' : 'text-base sm:text-lg text-[#B0A69A] font-light';

  return (
    <div
      className={`flex items-end gap-2 sm:gap-3 flex-wrap ${align === 'center' ? 'justify-center' : ''}`}
    >
      <span
        className={`relative ${originalClass} line-through decoration-[#C4B8A8] decoration-2 underline-offset-4`}
      >
        {originalPrice}
      </span>
      <span
        className="flex items-center justify-center w-7 h-7 rounded-full bg-white/80 border border-[#E5DDD2] text-[#8B7355] text-sm pb-px shadow-sm"
        aria-hidden
      >
        →
      </span>
      <div className="flex items-baseline">
        <span className={saleClass}>{salePrice}</span>
        {saleSuffix && <span className="text-sm text-[#8B7355] ml-1.5">{saleSuffix}</span>}
      </div>
    </div>
  );
}

type OutdoorRouteItem = {
  image: string;
  name: string;
  badge: string;
  meta: string;
  desc: string;
};

function OutdoorRouteGrid({
  title,
  intro,
  routes,
}: {
  title: string;
  intro: string;
  routes: readonly OutdoorRouteItem[];
}) {
  return (
    <div>
      <div className="mb-5 text-center md:text-left">
        <p className="text-base font-light text-[#3F3A36] mb-1">{title}</p>
        <p className="text-sm text-[#6B665F] leading-relaxed">{intro}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map((route) => (
          <div key={route.name} className="overflow-hidden rounded-2xl bg-white border border-[#E8DFD2]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EDE8E0]">
              <Image
                src={route.image}
                alt={getImageAlt(route.image)}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-medium text-[#3F3A36]">{route.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B7355]/10 text-[#8B7355]">
                  {route.badge}
                </span>
              </div>
              <p className="text-xs text-[#8B7355] mb-1.5">{route.meta}</p>
              <p className="text-xs text-[#6B665F] leading-relaxed">{route.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoomTags({ tags }: { tags: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-[#8B7355]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-[#E8DFD2] bg-[#FFFCF8] px-2.5 py-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function RoomPriceDisplay({
  originalPrice,
  salePrice,
  saleSuffix = '/晚',
  rightContent,
  footer,
}: {
  originalPrice: string;
  salePrice: string;
  saleSuffix?: string;
  rightContent?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="room-price-card mt-4 p-4 sm:p-5 rounded-2xl border border-[#E8DFD2] bg-gradient-to-br from-[#FFFCF8] via-[#F8F5F1] to-[#F0E8DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <PriceOfferBadge />

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <PriceStrikeThrough originalPrice={originalPrice} salePrice={salePrice} saleSuffix={saleSuffix} />
        {rightContent}
      </div>

      {footer}
    </div>
  );
}

function PackagePriceCard({
  label,
  originalPrice,
  salePrice,
  period,
  featured = false,
  saleSuffix = '/晚',
}: {
  label: string;
  originalPrice: string;
  salePrice: string;
  period: string;
  featured?: boolean;
  saleSuffix?: string;
}) {
  return (
    <div
      className={`room-price-card p-8 rounded-3xl flex-1 max-w-sm mx-auto text-center border bg-gradient-to-br from-[#FFFCF8] via-[#F8F5F1] to-[#F0E8DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] ${
        featured ? 'border-2 border-[#8B7355]/50' : 'border-[#E8DFD2]'
      }`}
    >
      <PriceOfferBadge />
      <div className="text-2xl font-light text-[#3F3A36] mb-4">{label}</div>
      <PriceStrikeThrough
        originalPrice={originalPrice}
        salePrice={salePrice}
        saleSuffix={saleSuffix}
        size="lg"
        align="center"
      />
      <div className="text-sm text-[#8B7355] mt-4">{period}</div>
    </div>
  );
}

export default function YijianwuWebsite() {
  const [renovationTab, setRenovationTab] = useState<'before' | 'during' | 'after'>('after');
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <SiteNav />

      {/* Hero 區塊 - 已更換為 LOGO 背景，字體已搭配星空暖調風格 */}
      <section className="relative h-[100dvh] flex items-end justify-center pt-[calc(5.75rem+var(--site-nav-tagline-offset))] md:items-center md:pt-[calc(4rem+var(--site-nav-tagline-offset))] overflow-hidden">
        <HeroBackground />

        {/* 手機：內容下移至背景內建標題下方；桌面：維持置底排版 */}
        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center md:justify-end md:h-full pb-[max(4.5rem,env(safe-area-inset-bottom))] md:pb-28 pt-[30vh] md:pt-0 text-center">
          <h1 className="sr-only">
            一間屋・駅前宿｜福隆車站出站30秒・福隆背包客棧・新北貢寮住宿
          </h1>

          <div className="mb-4 md:mb-5 w-full max-w-md px-4 py-2.5 md:px-6 md:py-3 rounded-2xl bg-black/35 md:bg-black/20 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            <p className="hero-subtitle text-base md:text-xl font-light tracking-[0.8px] md:tracking-[1.2px] text-[#F5E8C7] leading-snug md:leading-tight">
              福隆車站步行 30 秒　・　日式溫潤的慢時光
            </p>
          </div>

          {/* CTA 按鈕 - 更簡潔有力，顏色與 LOGO 暖調呼應 */}
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <a
              href="#booking"
              className="px-7 py-3 bg-[#F5E8C7] text-[#3F3A36] rounded-full font-medium tracking-[0.5px] text-xs md:text-sm hover:bg-white transition-all active:scale-[0.985] shadow"
            >
              {BOOKING_CTA.jump}
            </a>
            <a href="#rooms" className="px-7 py-3 border border-[#F5E8C7]/60 text-[#F5E8C7] rounded-full font-medium tracking-[0.5px] text-xs md:text-sm hover:bg-[#F5E8C7] hover:text-[#3F3A36] transition-all active:scale-[0.985]">
              查看房間
            </a>
            <a
              href={BUSINESS_LINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-[#00C300] hover:bg-[#00A000] text-white rounded-full font-medium tracking-[0.5px] text-xs md:text-sm transition-all active:scale-[0.985]"
            >
              LINE 門禁密碼
            </a>
          </div>
        </div>

        {/* 捲動提示 */}
        <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 text-[#F5E8C7]/40 text-[9px] tracking-[2.5px] pointer-events-none">
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* 關於我們 + 位置 */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20 scroll-mt-28 md:scroll-mt-20 text-center">
        <div className="text-[#8B7355] text-xs tracking-[4px] mb-3">A QUIET RETREAT BY THE STATION</div>
        <h2 className="text-5xl font-light tracking-tight mb-6 font-playfair">
          在福隆車站旁，<br />有一間溫柔的福隆背包客棧。
        </h2>
        <p className="max-w-xl mx-auto text-base text-[#6B665F] leading-relaxed mb-4">
          坐落新北貢寮，福隆車站步行 30 秒即達。一間屋・駅前宿是 2026 年 5 月全新裝潢的福隆青年旅館與日式民宿，溫潤和風空間，專注寧靜與細節，也是前往草嶺古道與舊草嶺隧道的便利住宿據點。
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-[#8B7355]">
          <div>福隆車站步行 30 秒</div>
          <div>2026年5月全新裝潢</div>
          <div>LINE 接收入住門禁密碼</div>
          <div>單車族友善 · 舊草嶺隧道環狀線</div>
        </div>
        <AboutAmenityStrip />
      </section>

      {/* 房間介紹 - 更精緻的卡片 */}
      <section id="rooms" className="py-20 scroll-mt-28 md:scroll-mt-20 bg-[#F8F5F1] border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">ROOMS</div>
            <h2 className="text-5xl font-light tracking-tight font-playfair">{ROOMS_SECTION.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 和鳴雙人房 */}
            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <RoomVideoPlayer
                poster={ROOM_VIDEOS.double.poster}
                posterAlt={getImageAlt(ROOM_VIDEOS.double.poster)}
                label={ROOM_VIDEOS.double.label}
                sources={ROOM_VIDEOS.double.sources}
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
                  originalPrice="NT$2,000"
                  salePrice="NT$1,600"
                  rightContent={
                    <div className="text-right text-sm text-[#8B7355]">{ROOMS_SECTION.double.priceNote}</div>
                  }
                />

                <p className="mt-4 text-[10px] text-[#8B7355] leading-relaxed border-t border-[#EDE8E0] pt-3">
                  {ROOMS_SECTION.sharedNote}
                </p>
                <div className="flex items-center justify-between text-sm mt-3">
                  <a
                    href="#booking"
                    className="px-6 py-2.5 bg-[#3F3A36] text-white rounded-full hover:bg-[#2C2926] transition-colors text-xs font-medium"
                  >
                    {BOOKING_CTA.jump}
                  </a>
                </div>
              </div>
            </div>

            {/* 和風4-6人家庭房（僅此1間，兩張雙人床） - 已更新新照片 */}
            <div className="card group border border-[#EDE8E0] rounded-3xl overflow-hidden bg-white">
              <RoomVideoPlayer
                poster={ROOM_VIDEOS.family.poster}
                posterAlt={getImageAlt(ROOM_VIDEOS.family.poster)}
                label={ROOM_VIDEOS.family.label}
                sources={ROOM_VIDEOS.family.sources}
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
                  originalPrice="NT$4,000"
                  salePrice="NT$3,200"
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
                <div className="flex items-center justify-between text-sm mt-3">
                  <a
                    href="#booking"
                    className="px-6 py-2.5 bg-[#3F3A36] text-white rounded-full hover:bg-[#2C2926] transition-colors text-xs font-medium"
                  >
                    {BOOKING_CTA.jump}
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
            <p className="text-[#6B665F] mb-6 text-sm max-w-2xl mx-auto leading-relaxed">
              {PACKAGE_SECTION.intro}
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
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00C300] text-white rounded-full text-sm font-medium hover:bg-[#00A000] transition-all"
              >
                LINE {BUSINESS_LINE.id}（門禁密碼）
              </a>
              <a
                href={BUSINESS_PHONE.mobileHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#3F3A36] text-[#3F3A36] rounded-full text-sm font-medium hover:bg-[#3F3A36] hover:text-white transition-all"
              >
                📞 急事專線 {BUSINESS_PHONE.mobile}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="max-w-4xl mx-auto px-6 py-12 md:py-20 scroll-mt-28 md:scroll-mt-20 border-t border-[#EDE8E0] bg-[#F8F5F1]">
        <div className="text-center mb-6 md:mb-10">
          <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">BOOKING</div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-2">{BOOKING_CTA.sectionTitle}</h2>
          <p className="text-sm md:text-base text-[#6B665F] font-medium">{BOOKING_CTA.sectionSubtitle}</p>
        </div>

        <OwltingBookingSection />
      </section>

      {/* 福隆風景 — 住這裡，風景就在門外 */}
      <section id="fulong" className="bg-white py-20 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">FULONG SCENERY</div>
            <h2 className="text-5xl font-light tracking-tight font-playfair">福隆，走出家門就是風景</h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-[#6B665F] leading-relaxed">
              {FULONG_SECTION.intro}
            </p>
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

      {/* 1樓翻新歷程 - 讓客人體驗轉變的驚喜 */}
      <section id="renovation" className="bg-white py-16 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#8B7355]/10 text-[#8B7355] text-xs tracking-[3px] rounded-full mb-3">
              <span>2026.04 → 05</span>
              <span className="text-[10px] bg-[#8B7355] text-white px-2 py-0.5 rounded">FULL RENOVATION</span>
            </div>
            <h3 className="text-5xl font-light tracking-tight mb-3">1樓翻新歷程</h3>
            <p className="text-[#6B665F] max-w-sm mx-auto text-sm">
              2026年5月全新翻新，從老舊到溫潤日式。
            </p>
          </div>

          {/* 互動式時間軸 - 讓客人體驗「前中後」的驚喜轉變 */}
          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-6">
              {[
                { key: 'before' as const, label: '翻新前', date: '2026.04' },
                { key: 'during' as const, label: '施工中', date: '2026.05.01' },
                { key: 'after' as const, label: '翻新後', date: '2026.05+' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setRenovationTab(tab.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    renovationTab === tab.key 
                      ? 'bg-[#3F3A36] text-white shadow' 
                      : 'bg-[#F8F5F1] text-[#6B665F] hover:bg-[#EDE8E0]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] opacity-70">{tab.date}</span>
                </button>
              ))}
            </div>

            {/* 動態故事文字 - 讓體驗更有溫度 */}
            <div className="text-center mb-6 min-h-[60px]">
              {renovationTab === 'before' && (
                <p className="text-[#6B665F] italic">這是翻新前的模樣，空間需要一次徹底的改變。</p>
              )}
              {renovationTab === 'during' && (
                <p className="text-[#6B665F] italic">施工進行中，我們一步步拆除舊的，打造新的。</p>
              )}
              {renovationTab === 'after' && (
                <p className="text-[#6B665F] italic">完成後的驚喜：溫暖、光線、細節，全部到位。</p>
              )}
            </div>

            {/* 動態圖片展示區 - 根據階段切換，讓體驗更有故事感 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {RENOVATION_IMAGES[renovationTab].map((src) => (
                <div 
                  key={src} 
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#EDE8E0] cursor-pointer"
                  onClick={() => setModalImage(src)}
                >
                  <Image
                    src={src}
                    alt={getImageAlt(src)}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className={`inline-block text-[10px] px-2 py-0.5 rounded mb-1.5 tracking-wider ${
                      renovationTab === 'before' ? 'bg-[#C4A77D]' : 
                      renovationTab === 'during' ? 'bg-[#8B7355]' : 'bg-[#3F3A36]'
                    }`}>
                      {renovationTab === 'before' ? 'BEFORE' : renovationTab === 'during' ? 'DURING' : 'AFTER'}
                    </div>
                    <div className="text-base font-light tracking-tight leading-tight">{getImageAlt(src)}</div>
                  </div>
                  <div className="absolute top-3 right-3 text-white/70 group-hover:text-white text-xs tracking-widest flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    點擊放大 <span>↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#6B665F] max-w-md mx-auto">
              親手打造的溫暖空間。
            </p>
            <div className="mt-4">
              <a href="#booking" className="inline-block px-6 py-2 text-sm border border-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-colors">
                體驗全新1樓
              </a>
            </div>
          </div>
        </div>
      </section>

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
                  出福隆車站大廳，馬上右轉直走，<span className="text-[#8B7355] font-medium">30 秒內</span>
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
                  自駕旅客建議將愛車停放在 <span className="text-[#8B7355] font-medium">濱海公路 7-11 旁停車場</span>{' '}
                  🅿️，較為安全便利，再步行回民宿即可。
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
              <li className="flex justify-between"><span>福隆海水浴場</span> <span className="text-[#8B7355]">步行 8 分鐘 · 海邊玩水</span></li>
              <li className="flex justify-between"><span>舊草嶺隧道</span> <span className="text-[#8B7355]">單車約 15 分鐘 · 環狀線經典</span></li>
              <li className="flex justify-between"><span>舊草嶺隧道環狀線</span> <span className="text-[#8B7355]">沿海騎行 · 藍天碧海</span></li>
              <li className="flex justify-between"><span>貢寮老街</span> <span className="text-[#8B7355]">車程 10 分鐘</span></li>
              <li className="flex justify-between"><span>九份老街</span> <span className="text-[#8B7355]">車程 35 分鐘</span></li>
              <li className="flex justify-between"><span>登山步道</span> <span className="text-[#8B7355]">附近輕鬆爬山路線</span></li>
              <li className="flex justify-between"><span>單車道</span> <span className="text-[#8B7355]">東北角海岸自行車道起點</span></li>
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

      {/* 建站諮詢 — 低調展示，不影響訂房主線 */}
      <section className="border-t border-[#EDE8E0] bg-white py-14 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">WEB DEVELOPMENT</div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight font-playfair text-[#3F3A36] mb-3">
              本站由老闆親自架設 · 純代碼，非套版
            </h2>
            <p className="text-sm text-[#6B665F] leading-relaxed max-w-2xl mx-auto">
              這個官網不是套用 Wix 或 WordPress 模板，而是從零以程式碼撰寫完成。
              版面、風景相簿、房間實景影片、訂房流程與手機排版，皆依一間屋實際需求客製開發。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {WEB_DEV_FEATURES.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E8DFD2] bg-gradient-to-br from-[#FFFCF8] to-[#F8F5F1] p-5 text-left"
              >
                <div className="text-sm font-medium text-[#3F3A36] mb-1.5">{item.title}</div>
                <div className="text-xs text-[#6B665F] leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-[#F8F5F1] border border-[#EDE8E0] p-6 md:p-8 mb-8 text-left">
            <div className="text-xs tracking-[3px] text-[#8B7355] mb-3">ENGINEERING LEVEL</div>
            <p className="text-sm text-[#3F3A36] font-medium mb-3">
              要完成同等級官網，工程師需具備以下能力：
            </p>
            <ul className="space-y-2 text-sm text-[#6B665F]">
              {WEB_DEV_REQUIREMENTS.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#8B7355] shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#8B7355] leading-relaxed">
              簡言之：這不是拖曳式建站工具能複製的成品，而是需要中高階全端工程實力才能獨立完成的客製化網站。
            </p>
          </div>

          <p className="text-sm text-[#6B665F] leading-relaxed text-center mb-6">
            若您是福隆、東北角周邊民宿業者，或有官網、訂房頁面、形象網站需求，歡迎聯絡老闆諮詢建站服務。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={BUSINESS_PHONE.mobileHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#3F3A36] text-white rounded-full text-sm font-medium hover:bg-[#2C2926] transition-all"
            >
              📞 電話諮詢 {BUSINESS_PHONE.mobile}
            </a>
            <a
              href="https://line.me/ti/p/@811mszbh"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-[#3F3A36] text-[#3F3A36] rounded-full text-sm font-medium hover:bg-[#3F3A36] hover:text-white transition-all"
            >
              LINE 私訊（請註明建站諮詢）
            </a>
          </div>
        </div>
      </section>

      {/* 手機版固定訂房捷徑 */}
      <a
        href="#booking"
        className="primary-booking-btn primary-booking-btn--compact md:hidden fixed bottom-6 left-4 z-50 inline-flex items-center justify-center rounded-full px-3.5 py-2.5 text-[11px] tracking-wide whitespace-nowrap"
      >
        {BOOKING_CTA.jumpShort}
      </a>

      {/* 浮動 LINE 按鈕 */}
      <a
        href={BUSINESS_LINE.url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 bg-[#00C300] text-white px-4 md:px-5 py-3 rounded-full shadow-lg hover:bg-[#00A000] transition-all font-medium text-xs md:text-sm"
      >
        <span className="md:hidden">📱 LINE</span>
        <span className="hidden md:inline">📱 LINE 門禁密碼 {BUSINESS_LINE.id}</span>
      </a>

      {/* Footer */}
      <footer className="border-t border-[#EDE8E0] py-4 text-sm text-[#8B7355] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center mb-3">
            <BrandTagline variant="footer" />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-y-4 text-center md:text-left">
          <div>
            <div className="font-medium text-[#3F3A36]">{BUSINESS_NAME}</div>
            <a
              href={BUSINESS_URLS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block hover:underline hover:text-[#3F3A36] transition-colors"
            >
              {BUSINESS_ADDRESS.full}
            </a>
            <div className="text-xs">出站右轉直走 30 秒即達 · {BUSINESS_REGISTRATION}</div>
          </div>
          <div className="space-y-1">
            <a
              href={BUSINESS_LINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#00C300] hover:underline"
            >
              LINE 官方 {BUSINESS_LINE.id}（入住門禁密碼）
            </a>
            <a href={BUSINESS_PHONE.mobileHref} className="block font-medium hover:text-[#3F3A36]">
              急事專線 {BUSINESS_PHONE.mobile}
            </a>
            <a
              href={BUSINESS_URLS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#3F3A36]"
            >
              Google 地圖查看
            </a>
          </div>
          <div className="text-xs text-[#8B7355]/70 md:text-right">© {new Date().getFullYear()} {BUSINESS_NAME}</div>
          </div>
        </div>
      </footer>

      {/* 圖片燈箱 - 點擊翻新照片時彈出大圖，增強體驗感 */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <Image
              src={modalImage}
              alt={getImageAlt(modalImage)}
              width={1920}
              height={1280}
              className="max-h-[90vh] max-w-full h-auto w-auto object-contain rounded-lg shadow-2xl"
            />
            <button 
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}