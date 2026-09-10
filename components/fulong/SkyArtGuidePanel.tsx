import Image from 'next/image';
import { SKYART, SKYART_BOOKING, SKYART_EXPERIENCES } from '@/lib/skyartGuide';

/** 攻略頁：藝素村須事先預約，獨立成一段，不混進隨興景點 */
export default function SkyArtGuidePanel() {
  return (
    <section id="skyart" className="scroll-mt-24">
      <p className="text-xs tracking-[3px] text-[#8B7355]">BOOK AHEAD</p>
      <h2 className="mt-1 font-playfair text-2xl font-light sm:text-3xl">
        星空×藝素村 · 須事先預約
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#6B665F]">
        純素用餐、園區手作、浪濤海玻璃、抹茶秘境都要先約，不能當天現場碰運氣。住一間屋最方便：行李放下，海玻璃在車站旁集合，抹茶從福隆火車站出發。
      </p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-[#6b5438]">
        {SKYART.detailNote}
      </p>

      <div className="mt-4 rounded-2xl border border-[#e8d5a8] bg-[#fff9ef] px-4 py-3 text-sm text-[#6b5438]">
        <p className="font-medium">預約提醒</p>
        <p className="mt-1 text-xs leading-relaxed sm:text-sm">{SKYART.closed}</p>
        <p className="mt-1 text-xs leading-relaxed sm:text-sm">{SKYART_BOOKING.experiences.note}</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {SKYART_EXPERIENCES.map((item, index) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_4px_18px_rgba(60,50,40,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#c4a574] hover:shadow-[0_10px_32px_rgba(60,50,40,0.1)]"
          >
            <div className="relative aspect-[16/10] bg-[#f0ebe3]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 360px"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#6b5438] shadow-sm">
                須預約
              </span>
              <span
                className="pointer-events-none absolute -right-1 -bottom-3 font-playfair text-6xl font-light leading-none text-white/25 select-none"
                aria-hidden
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="relative flex flex-1 flex-col p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f5f0e4] to-[#a89070]/25 text-xl ring-1 ring-[#d4c4a8]/70"
                  aria-hidden
                >
                  {item.emoji}
                </span>
                <div className="min-w-0 pt-0.5">
                  <span className="inline-flex rounded-full border border-[#c4a574]/40 bg-[#8B7355]/12 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#5c4a38]">
                    {item.hint}
                  </span>
                  <h3 className="mt-1 font-playfair text-lg font-light tracking-tight text-[#2c2416] sm:text-xl">
                    {item.name}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#5c4f42] sm:text-sm">{item.blurb}</p>
              <p className="mt-2 text-[11px] text-[#9a9086]">
                {item.where} · {item.time}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-[#f0ebe3] pt-3 text-[11px] font-medium text-[#6b5438]">
                <span className="tracking-wide">詳細行程請看藝素村官網</span>
                <span
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current/20 bg-white/80 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={SKYART_BOOKING.experiences.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-[#3F3A36] px-4 py-2 text-xs font-medium text-white"
        >
          {SKYART_BOOKING.experiences.label}
        </a>
        <a
          href={SKYART_BOOKING.dining.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full border border-[#D1C9BE] bg-white px-4 py-2 text-xs font-medium text-[#3F3A36]"
        >
          {SKYART_BOOKING.dining.label}
        </a>
      </div>
    </section>
  );
}
