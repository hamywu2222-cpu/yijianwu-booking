import Link from 'next/link';
import OwltingBookingSection from '@/components/OwltingBookingSection';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <nav className="border-b border-[#EDE8E0] bg-[#F8F5F1]/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#8B7355] hover:text-[#3F3A36] transition-colors">
            ← 返回首頁
          </Link>
          <div className="text-sm font-light tracking-[3px]">一間屋</div>
          <Link
            href="/"
            className="text-xs px-4 py-2 border border-[#3F3A36] text-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-all font-medium"
          >
            回首頁
          </Link>
        </div>
      </nav>

      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">BOOKING</div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">線上即時訂房</h1>
            <p className="text-[#6B665F] font-medium">選好條件後前往奧丁丁官方訂房頁，即時查空房、包棟與付款</p>
          </header>

          <OwltingBookingSection />
        </div>
      </main>
    </div>
  );
}