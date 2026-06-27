'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import BrandTagline from '@/components/BrandTagline';
import CabinIcon from '@/components/CabinIcon';
import NavBrandMark from '@/components/NavBrandMark';
import { BOOKING_CTA, BUSINESS_LINE, BUSINESS_PHONE } from '@/lib/business';

const SCROLL_FADE_DISTANCE = 64;

const NAV_LINKS = [
  { href: '#about', label: '簡介' },
  { href: '#rooms', label: '房間' },
  { href: '#booking', label: '訂房' },
  { href: '#location', label: '位置' },
] as const;

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
      <div className="site-nav-shell bg-[#F8F5F1]/95 backdrop-blur-md border-b border-[#EDE8E0]">
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

            <nav className="site-nav-links-slot hidden md:flex" aria-label="主要導覽">
              {NAV_LINKS.map(({ href, label }) => (
                <a key={href} href={href} className="nav-link hover:text-[#8B7355] transition-colors">
                  {label}
                </a>
              ))}
            </nav>

            <div className="site-nav-actions-slot">
              <a
                href="#booking"
                className="primary-booking-btn primary-booking-btn--compact md:hidden inline-flex items-center justify-center rounded-full px-3 py-2 text-[11px] tracking-wide whitespace-nowrap"
              >
                {BOOKING_CTA.jumpShort}
              </a>
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center rounded-full border border-[#00C300] px-3 py-2 text-xs font-medium text-[#00A300] shadow-sm active:scale-[0.98] transition-transform"
              >
                LINE
              </a>
              <a
                href={BUSINESS_PHONE.mobileHref}
                className="md:hidden inline-flex items-center gap-1 rounded-full border border-[#D1C9BE] bg-white px-2.5 py-2 text-xs font-medium text-[#3F3A36] shadow-sm active:scale-[0.98] transition-transform"
                aria-label={`撥打電話 ${BUSINESS_PHONE.mobile}`}
              >
                <span aria-hidden>📞</span>
              </a>
              <a
                href={BUSINESS_PHONE.mobileHref}
                className="hidden md:block text-sm text-[#8B7355] hover:text-[#3F3A36] transition-colors tracking-wider whitespace-nowrap"
              >
                📞 {BUSINESS_PHONE.mobile}
              </a>
              <a
                href="#booking"
                className="primary-booking-btn primary-booking-btn--compact hidden md:inline-flex items-center rounded-full px-5 py-2 text-xs tracking-wider whitespace-nowrap"
              >
                {BOOKING_CTA.jump}
              </a>
              <a
                href={BUSINESS_LINE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 border border-[#00C300] text-[#00A300] text-xs px-5 py-2 rounded-full hover:bg-[#00C300] hover:text-white transition-all tracking-wider font-medium whitespace-nowrap"
              >
                LINE 門禁密碼
              </a>
            </div>
          </div>

          <nav className="site-nav-mobile-links md:hidden" aria-label="主要導覽">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="nav-link shrink-0 hover:text-[#8B7355] transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}