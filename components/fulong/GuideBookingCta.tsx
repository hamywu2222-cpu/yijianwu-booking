import Link from 'next/link';
import { BOOKING_CTA } from '@/lib/business';

type Variant = 'inline' | 'banner' | 'soft';

/**
 * 攻略頁轉換 CTA — 讀完行程 → 訂房
 */
export default function GuideBookingCta({
  variant = 'banner',
  title,
  subtitle,
  className = '',
}: {
  variant?: Variant;
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const t = title ?? '行程看完了？今晚就住車站旁';
  const s =
    subtitle ??
    '福隆火車站出站 30 秒・一間屋・駅前宿。行李寄放、單車好停，官網訂房保證最優惠。';

  if (variant === 'inline') {
    return (
      <aside
        className={`rounded-2xl border border-[#8B7355]/25 bg-[#F8F5F1] px-4 py-4 sm:px-5 sm:py-5 ${className}`}
      >
        <p className="text-sm font-medium text-[#3F3A36] sm:text-base">{t}</p>
        <p className="mt-1 text-xs leading-relaxed text-[#6B665F] sm:text-sm">{s}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/booking"
            className="primary-booking-btn inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            {BOOKING_CTA.jump}
          </Link>
          <Link
            href="/fulong"
            className="inline-flex rounded-full border border-[#D1C9BE] bg-white px-4 py-2.5 text-xs font-medium text-[#8B7355] hover:border-[#8B7355]"
          >
            完整攻略總覽
          </Link>
        </div>
      </aside>
    );
  }

  if (variant === 'soft') {
    return (
      <aside
        className={`flex flex-col gap-3 rounded-2xl border border-dashed border-[#8B7355]/35 bg-white/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between ${className}`}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#3F3A36]">{t}</p>
          <p className="mt-0.5 text-xs text-[#6B665F]">{s}</p>
        </div>
        <Link
          href="/booking"
          className="primary-booking-btn shrink-0 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          {BOOKING_CTA.jumpShort}
        </Link>
      </aside>
    );
  }

  return (
    <aside
      className={`rounded-2xl border border-[#e8e0d4] bg-gradient-to-br from-[#2c2416] to-[#4a3f32] p-6 text-center text-white sm:p-8 ${className}`}
    >
      <p className="text-xs tracking-[3px] text-[#e8d5b5]">STAY WITH US</p>
      <h2 className="mt-2 font-playfair text-2xl font-light sm:text-3xl">{t}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-white/80">{s}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/booking"
          className="primary-booking-btn inline-flex rounded-full px-7 py-3 text-sm font-semibold"
        >
          {BOOKING_CTA.jump}
        </Link>
        <Link
          href="/rooms/double"
          className="inline-flex rounded-full border border-white/40 px-5 py-2.5 text-xs text-white hover:bg-white/10 sm:text-sm"
        >
          看房型
        </Link>
      </div>
    </aside>
  );
}
