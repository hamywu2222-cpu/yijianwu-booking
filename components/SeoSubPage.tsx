import Link from 'next/link';
import type { ReactNode } from 'react';

type Section = {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

type SeoSubPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Section[];
  ctaLabel?: string;
  ctaHref?: string;
  children?: ReactNode;
};

export function SeoSubPage({
  eyebrow,
  title,
  description,
  sections,
  ctaLabel = '立即訂房',
  ctaHref = '/booking',
  children,
}: SeoSubPageProps) {
  return (
    <main className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <header className="border-b border-[#EDE8E0] bg-[#F8F5F1]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-sm font-medium text-[#8B7355] hover:text-[#3F3A36]">
            ← 一間屋・駅前宿
          </Link>
          <Link
            href={ctaHref}
            className="primary-booking-btn inline-flex rounded-full px-4 py-2 text-sm font-medium"
          >
            {ctaLabel}
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-medium tracking-[3px] text-[#8B7355]">{eyebrow}</p>
        <h1 className="mt-2 font-playfair text-3xl font-light leading-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#6B665F]">{description}</p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-playfair text-xl font-light text-[#3F3A36] sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-[#6B665F]">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[#6B665F]">
                  {section.bullets.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {children}

        <nav
          className="mt-12 rounded-2xl border border-[#EDE8E0] bg-white p-6"
          aria-label="相關頁面"
        >
          <p className="text-sm font-medium text-[#8B7355]">延伸閱讀</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li>
              <Link href="/fulong" className="text-[#3F3A36] underline-offset-2 hover:underline">
                福隆怎麼玩
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-[#3F3A36] underline-offset-2 hover:underline">
                常見問題
              </Link>
            </li>
            <li>
              <Link href="/renovation" className="text-[#3F3A36] underline-offset-2 hover:underline">
                2026 全新裝潢
              </Link>
            </li>
            <li>
              <Link href="/rooms/double" className="text-[#3F3A36] underline-offset-2 hover:underline">
                和鳴雙人房
              </Link>
            </li>
            <li>
              <Link href="/rooms/family" className="text-[#3F3A36] underline-offset-2 hover:underline">
                和風家庭房
              </Link>
            </li>
            <li>
              <Link href="/rooms/package" className="text-[#3F3A36] underline-offset-2 hover:underline">
                包棟方案
              </Link>
            </li>
          </ul>
        </nav>
      </article>
    </main>
  );
}