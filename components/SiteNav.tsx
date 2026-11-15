'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BrandTagline from '@/components/BrandTagline';
import CabinIcon from '@/components/CabinIcon';
import FulongGuideCta from '@/components/FulongGuideCta';
import NavBrandMark from '@/components/NavBrandMark';
import { BOOKING_CTA, BUSINESS_LINE, BUSINESS_PHONE } from '@/lib/business';

const SCROLL_FADE_DISTANCE = 64;

const NAV_LINKS = [
  { href: '#rooms', label: '房間' },
  { href: '#booking', label: '訂房' },
  { href: '#reviews', label: '留言板' },
  { href: '#location', label: '如何抵達' },
] as const;

/** 建站諮詢（民宿業者洽詢，非訂房） */
const WEB_DEV_NAV = {
  href: '#web-dev',
  label: '建站諮詢',
  title: '喜歡這個網站嗎？有需求的老闆可以聯繫我諮詢建站事宜',
} as const;

export default function SiteNav() {
  const headerRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const tagline = taglineRef.current;
    if (!header || !tagline) return;

    let frame = 0;
    let taglineHeight = 0;

    const shell = header.querySelector<HTMLElement>('.site-nav-shell');

    const measureTagline = () => {
      const panel = tagline.querySelector<HTMLElement>('.site-nav-tagline-panel');
      taglineHeight = panel?.scrollHeight ?? tagline.scrollHeight;
      header.style.setProperty('--tagline-height', `${taglineHeight}px`);
      const shellHeight = shell?.offsetHeight ?? 0;
      document.documentElement.style.setProperty('--site-nav-offset', `${shellHeight}px`);
    };

    measureTagline();

    const resizeObserver = new ResizeObserver(measureTagline);
    resizeObserver.observe(tagline);

    const update = () => {
      frame = 0;
      const progress = Math.max(0, Math.min(1, 1 - window.scrollY / SCROLL_FADE_DISTANCE));
      header.style.setProperty('--tagline-progress', String(progress));
      document.documentElement.style.setProperty(
        '--site-nav-tagline-offset',
        `${taglineHeight * progress}px`,
      );
      tagline.setAttribute('aria-hidden', progress < 0.05 ? 'true' : 'false');

      const hero = document.getElementById('hero');
      const heroSpan = hero?.offsetHeight ?? window.innerHeight;
      const fadeStart = heroSpan * 0.08;
      const guideFade =
        window.scrollY <= fadeStart
          ? 1
          : window.scrollY >= heroSpan
            ? 0
            : 1 - (window.scrollY - fadeStart) / (heroSpan - fadeStart);
      header.style.setProperty('--guide-stack-opacity', guideFade.toFixed(3));
      header
        .querySelector('.site-nav-guide-stack')
        ?.setAttribute('data-hidden', guideFade <= 0.02 ? 'true' : 'false');
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureTagline);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureTagline);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--site-nav-tagline-offset');
      document.documentElement.style.removeProperty('--site-nav-offset');
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-nav fixed top-0 left-0 right-0 z-50"
      style={{ '--tagline-progress': 1, '--tagline-height': '0px' } as CSSProperties}
    >
      <div className="site-nav-shell border-b border-[#EDE8E0] bg-[#F8F5F1] md:bg-[#F8F5F1]/95 md:backdrop-blur-md">
        <div ref={taglineRef} className="site-nav-tagline">
          <div className="site-nav-tagline-panel">
            <BrandTagline />
          </div>
        </div>

        <div className="site-nav-inner">
          <div className="site-nav-main">
            <div className="site-nav-brand-slot">
              <CabinIcon variant="nav" />
              <NavBrandMark />
            </div>

            {/* 桌機中欄：主錨點 + 建站諮詢 */}
            <nav className="site-nav-links-slot hidden md:flex" aria-label="主要導覽">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href} className="nav-link hover:text-[#8B7355] transition-colors">
                  {label}
                </a>
              ))}
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link shrink-0 rounded-full border border-[#D1C9BE] bg-white px-2.5 py-1 text-[11px] font-medium text-[#6B665F] transition-colors hover:border-[#00C300] hover:text-[#00A300] sm:text-xs"
              >
                {BUSINESS_LINE.inquireLabelShort}
              </a>
              <span className="site-nav-links-divider text-[#E0D6C8]" aria-hidden>
                |
              </span>
              <a
                href={WEB_DEV_NAV.href}
                title={WEB_DEV_NAV.title}
                className="nav-link shrink-0 rounded-full border border-[#D1C9BE]/80 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-[#8B7355] transition-colors hover:border-[#8B7355] hover:text-[#3F3A36] sm:text-xs"
              >
                {WEB_DEV_NAV.label}
              </a>
            </nav>

            {/* 右側：手機只留訂房與電話。圖文攻略不進這列，避免搶金色訂房 */}
            <div className="site-nav-actions-slot">
              <FulongGuideCta
                variant="nav"
                mark
                className="site-nav-guide-cta shrink-0"
                label="舊草嶺環狀圖文攻略"
                href="/fulong/loop-ride"
                ariaLabel="前往舊草嶺環狀圖文攻略"
              />
              <a
                href="#booking"
                className="primary-booking-btn primary-booking-btn--compact inline-flex shrink-0 items-center justify-center rounded-full tracking-wide whitespace-nowrap"
              >
                <span className="md:hidden">{BOOKING_CTA.jumpShort}</span>
                <span className="hidden md:inline">{BOOKING_CTA.jump}</span>
              </a>
              {/* 手機固定列：顯示電話號碼，一鍵撥號 */}
              <a
                href={BUSINESS_PHONE.mobileHref}
                className="site-nav-phone-cta inline-flex md:hidden shrink-0 items-center justify-center rounded-full border border-[#D1C9BE] bg-white font-semibold text-[#3F3A36] shadow-sm active:scale-[0.98] transition-transform"
                aria-label={`撥打電話 ${BUSINESS_PHONE.mobile}`}
              >
                <span className="site-nav-phone-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="13" height="13">
                    <path
                      fill="currentColor"
                      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.4 0 .7-.3 1L6.6 10.8z"
                    />
                  </svg>
                </span>
                <span className="tabular-nums">{BUSINESS_PHONE.mobile}</span>
              </a>
              {/* 桌機：訂房前 LINE 詢問，不強調門禁 */}
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex shrink-0 items-center rounded-full border border-[#D1C9BE] px-3 py-2 text-xs font-medium text-[#6B665F] shadow-sm transition-transform active:scale-[0.98] md:hover:border-[#00C300] md:hover:text-[#00A300]"
              >
                <span className="whitespace-nowrap">{BUSINESS_LINE.inquireLabelShort}</span>
              </a>
              {/* 寬螢幕：電話一併顯示 */}
              <a
                href={BUSINESS_PHONE.mobileHref}
                className="hidden xl:inline-flex shrink-0 items-center text-sm text-[#8B7355] hover:text-[#3F3A36] transition-colors tracking-wider whitespace-nowrap tabular-nums"
                aria-label={`撥打電話 ${BUSINESS_PHONE.mobile}`}
              >
                📞 {BUSINESS_PHONE.mobile}
              </a>
            </div>
          </div>

          <nav className="site-nav-mobile-links md:hidden" aria-label="頁內導覽">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link shrink-0 hover:text-[#8B7355] transition-colors">
                {label}
              </a>
            ))}
            <a
              href={BUSINESS_LINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link shrink-0 rounded-full border border-[#D1C9BE] bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#6B665F]"
            >
              {BUSINESS_LINE.inquireLabelShort}
            </a>
            <span className="site-nav-links-divider text-[#E0D6C8]" aria-hidden>
              |
            </span>
            <a
              href={WEB_DEV_NAV.href}
              title={WEB_DEV_NAV.title}
              className="nav-link shrink-0 rounded-full border border-[#D1C9BE] bg-white/80 px-2.5 py-0.5 text-[11px] font-medium text-[#8B7355]"
            >
              {WEB_DEV_NAV.label}
            </a>
          </nav>
        </div>
      </div>

      <div className="site-nav-guide-stack">
        <Link href="/fulong/loop-ride" className="site-nav-guide-strip">
          <span className="site-nav-guide-strip__photo">
            <Image
              src="/images/loop-ride/entrance.jpg"
              alt=""
              fill
              sizes="56px"
              className="object-cover object-center"
            />
          </span>
          <span className="site-nav-guide-strip__copy">
            <span className="site-nav-guide-strip__title">舊草嶺環狀圖文攻略</span>
            <span className="site-nav-guide-strip__sub">環狀線 20–24 公里・全年可走</span>
          </span>
          <span className="site-nav-guide-strip__go">
            看照片
            <span aria-hidden>→</span>
          </span>
        </Link>
        <Link
          href="/fulong/miscanthus"
          className="site-nav-guide-strip"
          aria-label="前往草嶺登山芒花季開跑，11月14日至12月13日週末"
        >
          <span className="site-nav-guide-strip__photo">
            <Image
              src="/images/caoling-2026/saddle.jpg"
              alt=""
              fill
              sizes="56px"
              className="object-cover object-center"
            />
          </span>
          <span className="site-nav-guide-strip__copy">
            <span className="site-nav-guide-strip__title">草嶺登山芒花季開跑</span>
            <span className="site-nav-guide-strip__sub">11/14–12/13・只有週末</span>
          </span>
          <span className="site-nav-guide-strip__go">
            看攻略
            <span aria-hidden>→</span>
          </span>
        </Link>
      </div>
    </header>
  );
}