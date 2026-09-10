import Image from 'next/image';
import type { ReactNode } from 'react';
import { ABOUT_AMENITIES } from '@/lib/media';
import { getImageAlt } from '@/lib/imageAlt';

export function AboutAmenityStrip() {
  return (
    <div className="mt-5 max-w-3xl mx-auto rounded-2xl border border-[#EDE8E0] bg-white/70 px-4 py-4 md:px-5 md:py-5 shadow-sm">
      <p className="text-xs md:text-sm tracking-[3px] text-[#8B7355] mb-2.5 md:mb-3 font-medium">
        入住配套
      </p>
      <ul className="flex flex-wrap justify-center gap-2 md:gap-2.5">
        {ABOUT_AMENITIES.map(({ icon, label }) => (
          <li
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DFD2] bg-[#FFFCF8] px-3 py-1.5 md:px-3.5 md:py-2 text-xs md:text-sm text-[#3F3A36] leading-snug font-medium"
          >
            <span aria-hidden className="text-sm md:text-base leading-none shrink-0">
              {icon}
            </span>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs md:text-sm text-[#8B7355] leading-relaxed">
        行李寄放：入住前後如需暫放，歡迎事先透過 LINE 或電話洽詢。
      </p>
    </div>
  );
}

export function PriceOfferBadge() {
  return (
    <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-white/70 border border-[#D9CFC0]/60 backdrop-blur-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7355] animate-pulse" />
      <span className="text-[10px] tracking-[0.2em] text-[#8B7355] font-medium">官網直訂優惠</span>
    </div>
  );
}

export function PriceStrikeThrough({
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

export function RoomTags({ tags }: { tags: readonly string[] }) {
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

type RoomPriceTier = {
  label: string;
  original: string;
  sale: string;
};

export function RoomPriceDisplay({
  pricing,
  originalPrice,
  salePrice,
  saleSuffix = '/晚',
  rightContent,
  footer,
}: {
  pricing?: { weekday: RoomPriceTier; holiday: RoomPriceTier };
  originalPrice?: string;
  salePrice?: string;
  saleSuffix?: string;
  rightContent?: ReactNode;
  footer?: ReactNode;
}) {
  const tiers = pricing
    ? ([pricing.weekday, pricing.holiday] as const)
    : originalPrice && salePrice
      ? ([{ label: '', original: originalPrice, sale: salePrice }] as const)
      : [];

  return (
    <div className="room-price-card mt-4 p-4 sm:p-5 rounded-2xl border border-[#E8DFD2] bg-gradient-to-br from-[#FFFCF8] via-[#F8F5F1] to-[#F0E8DC] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <PriceOfferBadge />

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-3 min-w-0">
          {tiers.map((tier) => (
            <div key={tier.label || 'single'}>
              {tier.label ? (
                <div className="text-[10px] tracking-[0.18em] text-[#8B7355] mb-1.5">{tier.label}</div>
              ) : null}
              <PriceStrikeThrough
                originalPrice={tier.original}
                salePrice={tier.sale}
                saleSuffix={saleSuffix}
              />
            </div>
          ))}
        </div>
        {rightContent}
      </div>

      {footer}
    </div>
  );
}

export function PackagePriceCard({
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

export type OutdoorRouteItem = {
  image: string;
  name: string;
  badge: string;
  meta: string;
  desc: string;
};

export function OutdoorRouteGrid({
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
