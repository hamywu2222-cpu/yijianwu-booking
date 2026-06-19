import Link from 'next/link';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#3F3A36]">
      <nav className="border-b border-[#EDE8E0] bg-[#F8F5F1]/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm text-[#8B7355] hover:text-[#3F3A36] transition-colors">
            ← 返回首頁
          </Link>
          <div className="text-sm font-light tracking-[3px]">一間屋</div>
          <a
            href="https://line.me/ti/p/@811mszbh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-4 py-2 bg-[#00C300] text-white rounded-full hover:bg-[#00A000] transition-all font-medium"
          >
            LINE 訂房
          </a>
        </div>
      </nav>

      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-10">
            <div className="text-[#8B7355] text-xs tracking-[4px] mb-2">BOOKING</div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
              訂房請加入 LINE 官方（必須）
            </h1>
            <p className="text-[#6B665F] font-medium">
              必須加入 LINE 官方 <span className="text-[#00C300]">@811mszbh</span> 才能完成訂房（未加入無法確認）
            </p>
            <p className="text-xs text-[#8B7355] mt-1">填寫後請回傳後 4 碼到 LINE @811mszbh 確認訂單</p>
          </header>

          <BookingForm />

          <footer className="mt-8 text-center text-sm text-[#6B665F]">
            包房專線：
            <a href="tel:0912362533" className="font-medium text-[#3F3A36] hover:underline">
              0912-362-533
            </a>
            <br />
            <span className="font-medium text-[#3F3A36]">回傳後 4 碼到 LINE @811mszbh 確認訂單</span>
          </footer>
        </div>
      </main>
    </div>
  );
}