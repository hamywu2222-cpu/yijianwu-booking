'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
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

            {/* 右側：手機優先電話；桌機 LINE（寬螢幕可並顯電話）。攻略在極窄螢幕隱藏以免擠掉電話 */}
            <div className="site-nav-actions-slot">
              <FulongGuideCta
                variant="nav"
                className="site-nav-guide-cta shrink-0 max-[380px]:hidden"
                label="福隆旅遊攻略"
                href="#fulong-play"
                ariaLabel="捲動至福隆旅遊攻略精華"
              />
              <a
                href="#booking"
                className="primary-booking-btn primary-booking-btn--compact inline-flex shrink-0 items-center justify-center rounded-full tracking-wide whitespace-nowrap"
              >
                <span className="md:hidden">{BOOKING_CTA.jumpShort}</span>
                <span className="hidden md:inline">{BOOKING_CTA.jump}</span>
              </a>
              {/* 手機固定列：顯示電話 0912-362-533（取代長 LINE 文案，一鍵撥號） */}
              <a
                href={BUSINESS_PHONE.mobileHref}
                className="site-nav-phone-cta inline-flex md:hidden shrink-0 items-center rounded-full border border-[#D1C9BE] bg-white px-2 py-1.5 text-[10px] min-[360px]:px-2.5 min-[360px]:text-[11px] font-semibold text-[#3F3A36] shadow-sm tabular-nums tracking-tight active:scale-[0.98] transition-transform"
                aria-label={`撥打電話 ${BUSINESS_PHONE.mobile}`}
              >
                <span aria-hidden className="mr-0.5">
                  📞
                </span>
                {BUSINESS_PHONE.mobile}
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
    </header>
  );
}