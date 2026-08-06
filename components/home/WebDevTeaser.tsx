import { BUSINESS_LINE } from '@/lib/business';
import { WEB_DEV_FEATURES } from '@/lib/media';

/**
 * 建站資訊「中間版」：
 * - 保留標題、重點能力卡、簡短工程說明
 * - CTA 僅 LINE 次要樣式，不與訂房主按鈕搶視覺
 */
export default function WebDevTeaser() {
  // 中間版只展示 4 個最能說明價值的重點（完整 6 項仍留在 lib/media）
  const highlights = WEB_DEV_FEATURES.filter((item) =>
    ['非套版網站', '純代碼開發', '高度客製', '上線部署'].includes(item.title),
  );

  return (
    <section className="border-t border-[#EDE8E0] bg-white py-12 md:py-14">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-7">
          <p className="text-[10px] tracking-[0.22em] text-[#8B7355] mb-2">WEB DEVELOPMENT</p>
          <h2 className="text-xl md:text-2xl font-light tracking-tight font-playfair text-[#3F3A36] mb-2">
            本站由老闆親自架設 · 純代碼，非套版
          </h2>
          <p className="text-sm text-[#6B665F] leading-relaxed max-w-2xl mx-auto">
            這個官網不是 Wix / WordPress 模板，而是依一間屋實際需求以程式碼客製。
            若您是福隆、東北角周邊民宿業者，或有官網、訂房頁需求，歡迎洽詢建站服務。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#E8DFD2] bg-[#F8F5F1]/80 px-4 py-3.5 text-left"
            >
              <div className="text-sm font-medium text-[#3F3A36] mb-1">{item.title}</div>
              <div className="text-xs text-[#6B665F] leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#EDE8E0] bg-[#F8F5F1] px-4 py-3.5 mb-6 text-left">
          <p className="text-[10px] tracking-[0.18em] text-[#8B7355] mb-1.5">ENGINEERING</p>
          <p className="text-xs text-[#6B665F] leading-relaxed">
            同等級官網需具備 React / Next.js、響應式互動、訂房與 SEO 串接，以及網域與雲端部署能力——
            非拖曳式建站工具能直接複製的成品。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={BUSINESS_LINE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#00C300] text-[#00A300] text-sm font-medium hover:bg-[#00C300] hover:text-white transition-all"
          >
            LINE 建站諮詢（請註明建站）
          </a>
          <p className="text-[11px] text-[#8B7355]">
            此為建站服務入口，訂房請使用上方「訂房」區塊
          </p>
        </div>
      </div>
    </section>
  );
}
