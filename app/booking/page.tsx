import Link from 'next/link';
import FulongGuideCta from '@/components/FulongGuideCta';
import OwltingBookingSection from '@/components/OwltingBookingSection';
import { BOOKING_CTA } from '@/lib/business';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <nav className="border-b border-[#EDE8E0] bg-[#F8F5F1]/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/" className="shrink-0 text-sm text-[#8B7355] hover:text-[#3F3A36] transition-colors">
            ← 返回首頁
          </Link>
          <div className="hidden sm:block text-sm font-light tracking-[3px]">一間屋</div>
          <div className="flex items-center gap-2">
            <FulongGuideCta
              variant="nav"
              className="site-nav-guide-cta shrink-0"
              label="福隆旅遊攻略"
              href="/fulong"
              ariaLabel="查看福隆旅遊攻略"
            />
            <a
              href="#booking-form"
              className="primary-booking-btn primary-booking-btn--compact md:hidden text-xs px-3.5 py-2 rounded-full font-medium"
            >
              {BOOKING_CTA.jump}
            </a>
            <Link
              href="/"
              className="hidden sm:inline-flex text-xs px-4 py-2 border border-[#3F3A36] text-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-all font-medium"
            >
              回首頁
            </Link>
          </div>
        </div>
      </nav>

      <main className="py-5 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-5 md:mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-1.5 md:mb-2">BOOKING</div>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-1.5 md:mb-2">{BOOKING_CTA.sectionTitle}</h1>
            <p className="text-sm md:text-base text-[#6B665F] font-medium">{BOOKING_CTA.sectionSubtitle}</p>
          </header>

          <div id="booking-form">
            {/* 次要入口；主訂房欄在首頁 /#booking */}
            <OwltingBookingSection source="booking_page" />
          </div>
        </div>
      </main>
    </div>
  );
}