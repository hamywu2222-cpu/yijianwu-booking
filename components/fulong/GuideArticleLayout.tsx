import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import GuideBookingCta from '@/components/fulong/GuideBookingCta';
import { BOOKING_CTA } from '@/lib/business';
import {
  FULONG_ARTICLE_SERIES,
  type FulongArticleSlug,
} from '@/lib/fulongArticles';

export default function GuideArticleLayout({
  slug,
  children,
}: {
  slug: FulongArticleSlug;
  children: ReactNode;
}) {
  const article = FULONG_ARTICLE_SERIES.find((a) => a.slug === slug)!;
  const others = FULONG_ARTICLE_SERIES.filter((a) => a.slug !== slug);

  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <header className="border-b border-[#EDE8E0] bg-[#F8F5F1]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <Link href="/fulong" className="shrink-0 text-sm font-medium text-[#8B7355] hover:text-[#3F3A36]">
            ← 福隆旅遊攻略
          </Link>
          <Link
            href="/booking"
            className="primary-booking-btn inline-flex rounded-full px-4 py-2.5 text-sm font-semibold"
          >
            {BOOKING_CTA.jumpShort}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#EDE8E0]">
        <div className="absolute inset-0">
          <Image
            src={article.heroImage}
            alt={article.shortTitle}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c2416ee] via-[#2c241688] to-[#2c241644]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-xs font-medium tracking-[3px] text-[#e8d5b5]">
            FULONG GUIDE · 一間屋出發
          </p>
          <p className="mt-2 text-sm text-[#e8d5b5]/90">
            <span aria-hidden>{article.emoji}</span> {article.shortTitle}
          </p>
          <h1 className="mt-2 font-playfair text-3xl font-light leading-tight text-white sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            {article.lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/booking"
              className="primary-booking-btn inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              {BOOKING_CTA.jump}
            </Link>
            <Link
              href="/fulong"
              className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-2.5 text-xs text-white backdrop-blur-sm hover:bg-white/20 sm:text-sm"
            >
              完整攻略總覽
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-12">
        {/* 系列導覽 */}
        <nav
          className="rounded-2xl border border-[#EDE8E0] bg-white p-4 sm:p-5"
          aria-label="相關攻略"
        >
          <p className="text-xs font-semibold tracking-wide text-[#8B7355]">相關攻略</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            <li>
              <Link
                href="/fulong"
                className="inline-flex rounded-full border border-[#EDE8E0] bg-[#F8F5F1] px-3 py-1.5 text-xs text-[#3F3A36] hover:border-[#8B7355]"
              >
                📑 完整總覽
              </Link>
            </li>
            {others.map((a) => (
              <li key={a.slug}>
                <Link
                  href={a.path}
                  className="inline-flex rounded-full border border-[#EDE8E0] bg-white px-3 py-1.5 text-xs text-[#3F3A36] hover:border-[#8B7355]"
                >
                  {a.emoji} {a.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {children}

        <GuideBookingCta
          variant="banner"
          title="玩完這條路線，走回車站旁的家"
          subtitle="一間屋・駅前宿｜出站 30 秒｜行李寄放｜單車友善｜官網保證最優惠"
        />

        <nav className="rounded-2xl border border-[#EDE8E0] bg-white p-6" aria-label="延伸閱讀">
          <p className="text-sm font-medium text-[#8B7355]">延伸閱讀</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <Link href="/fulong" className="underline-offset-2 hover:underline">
                福隆旅遊攻略總覽
              </Link>
            </li>
            {others.map((a) => (
              <li key={a.slug}>
                <Link href={a.path} className="underline-offset-2 hover:underline">
                  {a.shortTitle}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/booking" className="underline-offset-2 hover:underline">
                線上訂房
              </Link>
            </li>
            <li>
              <Link href="/rooms/package" className="underline-offset-2 hover:underline">
                包棟方案
              </Link>
            </li>
          </ul>
        </nav>
      </article>

      {/* 手機固定訂房條 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EDE8E0] bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <Link
          href="/booking"
          className="primary-booking-btn flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold"
        >
          {BOOKING_CTA.jump}
        </Link>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </main>
  );
}
