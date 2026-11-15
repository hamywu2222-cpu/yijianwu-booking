import Image from 'next/image';
import Link from 'next/link';

/** 福隆攻略「本季可參加」：只露日期，詳情在 /fulong/miscanthus。 */
export default function HomeSeasonCards() {
  return (
    <section id="season-now" className="scroll-mt-24" aria-labelledby="season-now-heading">
      <p className="text-xs tracking-[3px] text-[#8B7355]">THIS SEASON</p>
      <h2 id="season-now-heading" className="mt-1 font-playfair text-2xl font-light sm:text-3xl">
        本季可參加
      </h2>
      <Link
        href="/fulong/miscanthus"
        className="group relative mt-6 block overflow-hidden rounded-[1.35rem] shadow-[0_16px_36px_rgba(44,36,22,0.16)] ring-1 ring-[#e8d5a8]/80"
      >
        <span className="relative block h-64 w-full sm:h-80">
          <Image
            src="/images/caoling-2026/saddle.jpg"
            alt="草嶺古道埡口的芒花"
            fill
            className="object-cover object-[center_42%] transition duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 720px"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#1a2418]/85 via-[#1a2418]/25 to-[#1a2418]/10" />
          <span className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
            <span className="text-xs font-semibold tracking-[0.28em] text-[#f3e6c0]">草嶺古道芒花季</span>
            <span className="mt-2 font-playfair text-4xl font-light leading-none text-white sm:text-6xl">
              11.14 – 12.13
            </span>
            <span className="mt-3 text-sm text-white/90 sm:text-base">每週六、週日</span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#f0d078]">
              看詳情
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </span>
        </span>
      </Link>
    </section>
  );
}
