import Image from 'next/image';
import type { FulongSpot } from '@/lib/fulongGuide';
import { getImageAlt } from '@/lib/imageAlt';

export default function SpotCard({
  spot,
  priority = false,
}: {
  spot: FulongSpot;
  priority?: boolean;
}) {
  return (
    <article
      id={spot.id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#e8e0d4] bg-white shadow-sm"
    >
      {spot.image ? (
        <div className="relative aspect-[16/10] w-full bg-[#f0ebe3]">
          <Image
            key={spot.image}
            src={spot.image}
            alt={getImageAlt(spot.image) || spot.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 720px"
            priority={priority}
          />
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#8B7355]/12 px-2.5 py-0.5 text-[11px] font-medium text-[#8B7355]">
            {spot.distance}
          </span>
          <span className="text-[11px] text-[#9a9086]">{spot.travel}</span>
        </div>
        <h3 className="mt-2 font-playfair text-xl font-light text-[#2c2416] sm:text-2xl">
          {spot.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#8B7355]">{spot.tagline}</p>

        <div className="mt-3 rounded-xl border border-[#e8e0d4] bg-[#F8F5F1] px-3 py-3">
          <p className="text-[11px] font-semibold tracking-wide text-[#8B7355]">
            一間屋出發（單程估算）
            {spot.fromBase.km ? (
              <span className="ml-1 font-normal text-[#9a9086]">· {spot.fromBase.km}</span>
            ) : null}
          </p>
          <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-3">
            <li className="flex items-start gap-2 rounded-lg bg-white px-2.5 py-2 text-xs text-[#3F3A36]">
              <span aria-hidden>🚴</span>
              <span>
                <span className="font-semibold">腳踏車</span>
                <span className="mt-0.5 block text-[#6B665F]">{spot.fromBase.bike}</span>
              </span>
            </li>
            <li className="flex items-start gap-2 rounded-lg bg-white px-2.5 py-2 text-xs text-[#3F3A36]">
              <span aria-hidden>🛵</span>
              <span>
                <span className="font-semibold">自備機車</span>
                <span className="mt-0.5 block text-[#6B665F]">{spot.fromBase.scooter}</span>
              </span>
            </li>
            <li className="flex items-start gap-2 rounded-lg bg-white px-2.5 py-2 text-xs text-[#3F3A36]">
              <span aria-hidden>🚗</span>
              <span>
                <span className="font-semibold">開車</span>
                <span className="mt-0.5 block text-[#6B665F]">{spot.fromBase.car}</span>
              </span>
            </li>
          </ul>
          {spot.fromBase.walk ? (
            <p className="mt-1.5 text-[11px] text-[#9a9086]">🚶 步行：{spot.fromBase.walk}</p>
          ) : null}
          {spot.fromBase.note ? (
            <p className="mt-1 text-[11px] leading-snug text-[#8B7355]">{spot.fromBase.note}</p>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#5c4f42] sm:text-[0.95rem]">{spot.body}</p>

        <div className="mt-4">
          <p className="text-xs font-semibold tracking-wide text-[#8B7355]">推薦活動</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {spot.activities.map((a) => (
              <li
                key={a}
                className="rounded-full border border-[#e8e0d4] bg-[#F8F5F1] px-2.5 py-1 text-xs text-[#3F3A36]"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 rounded-xl bg-[#F8F5F1] px-3 py-2.5">
          <p className="text-xs font-semibold text-[#8B7355]">小提醒</p>
          <ul className="mt-1 space-y-1 text-xs leading-relaxed text-[#6B665F]">
            {spot.tips.map((t) => (
              <li key={t} className="flex gap-1.5">
                <span className="text-[#8B7355]" aria-hidden>
                  ·
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          {spot.bookingUrl ? (
            <a
              href={spot.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm font-medium text-[#8B7355] underline-offset-2 hover:underline"
            >
              {spot.bookingLabel ?? '官網預約 →'}
            </a>
          ) : null}
          {spot.mapsUrl ? (
            <a
              href={spot.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm font-medium text-[#8B7355] underline-offset-2 hover:underline"
            >
              Google 地圖 →
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
