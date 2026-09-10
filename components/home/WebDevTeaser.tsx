import { BUSINESS_LINE } from '@/lib/business';
import { WEB_DEV_CONTACT, WEB_DEV_FEATURES } from '@/lib/media';

/**
 * 建站資訊「中間版」：
 * - 保留標題、重點能力卡、簡短工程說明
 * - CTA：LINE + 電話建站諮詢，不與訂房主按鈕搶視覺
 */
export default function WebDevTeaser() {
  // 固定 6 項，2×3 對齊
  const highlightOrder = [
    '非套版網站',
    '純代碼開發',
    '網頁載入極速體驗',
    '高度客製',
    '響應式排版',
    '上線部署',
  ] as const;
  const highlights = highlightOrder
    .map((title) => WEB_DEV_FEATURES.find((item) => item.title === title))
    .filter((item): item is (typeof WEB_DEV_FEATURES)[number] => Boolean(item));

  return (
    <section
      id="web-dev"
      className="scroll-mt-28 md:scroll-mt-24 border-t border-[#EDE8E0] bg-white py-12 md:py-14"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-7">
          <p className="text-[10px] tracking-[0.22em] text-[#8B7355] mb-2">WEB DEVELOPMENT</p>
          <h2 className="text-xl md:text-2xl font-light tracking-tight font-playfair text-[#3F3A36] mb-2">
            本站由老闆親自架設 · 純代碼，非套版
          </h2>
          <p className="text-sm text-[#6B665F] leading-relaxed max-w-2xl mx-auto">
            喜歡這個網站嗎？這個官網不是 Wix / WordPress 模板，而是依一間屋實際需求以程式碼客製。
            有需求的老闆（福隆、東北角周邊民宿業者，或需要官網／訂房頁）歡迎聯繫我諮詢建站事宜。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 auto-rows-fr">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-2xl border border-[#E8DFD2] bg-[#F8F5F1]/80 px-4 py-3.5 text-left"
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

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={BUSINESS_LINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#00C300] text-[#00A300] text-sm font-medium hover:bg-[#00C300] hover:text-white transition-all"
            >
              LINE 建站諮詢 @811mszbh（請註明建站）
            </a>
            <a
              href={WEB_DEV_CONTACT.phoneHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#D1C9BE] bg-white text-sm font-medium text-[#3F3A36] tabular-nums hover:border-[#8B7355] hover:text-[#8B7355] transition-all"
              aria-label={WEB_DEV_CONTACT.phoneLabel}
            >
              📞 {WEB_DEV_CONTACT.phoneLabel}
            </a>
          </div>
          <p className="text-[11px] text-[#8B7355] text-center">
            此為建站服務入口，訂房請使用上方「訂房」區塊
          </p>
        </div>
      </div>
    </section>
  );
}
