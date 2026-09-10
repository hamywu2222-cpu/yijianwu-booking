import Image from 'next/image';
import { SKYART } from '@/lib/skyartGuide';

/** 如何抵達區：山上純素用餐備註 */
export default function NearbyDiningNote() {
  return (
    <aside className="mx-auto mt-8 max-w-lg overflow-hidden rounded-3xl border border-[#EDE8E0] bg-[#F8F5F1] text-left shadow-sm">
      <div className="grid sm:grid-cols-[minmax(0,11rem)_1fr] items-stretch">
        <figure className="relative min-h-[10rem] sm:min-h-full">
          <Image
            src="/images/skyart/hero.jpg"
            alt="星空×藝素村海廢藝術牆"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 176px"
          />
        </figure>
        <div className="p-5 sm:p-6">
          <p className="text-[10px] tracking-[0.28em] text-[#8B7355]">{SKYART.eyebrow}</p>
          <h3 className="mt-1 font-playfair text-xl font-light text-[#3F3A36]">{SKYART.question}</h3>
          <p className="mt-1 text-sm font-medium text-[#8B7355]">{SKYART.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#6B665F]">{SKYART.lead}</p>
          <p className="mt-2 text-xs text-[#8B7355]">{SKYART.hint} · 詳細行程請看藝素村官網</p>
          <a
            href={SKYART.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full border border-[#D1C9BE] bg-white px-4 py-2 text-xs font-medium text-[#3F3A36] hover:border-[#8B7355]"
          >
            看看藝素村 →
          </a>
        </div>
      </div>
    </aside>
  );
}
