import type { Metadata } from 'next';
import Image from 'next/image';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { FULONG_GUIDE } from '@/lib/seoPages';

export const metadata: Metadata = {
  title: FULONG_GUIDE.title,
  description: FULONG_GUIDE.description,
  alternates: { canonical: '/fulong' },
  openGraph: {
    title: FULONG_GUIDE.title,
    description: FULONG_GUIDE.description,
    url: '/fulong',
  },
};

export default function FulongPage() {
  const { walking, outdoor, attractions } = FULONG_GUIDE;

  return (
    <SeoSubPage
      eyebrow="福隆攻略"
      title={FULONG_GUIDE.title}
      description={FULONG_GUIDE.description}
      sections={[
        {
          heading: walking.title,
          paragraphs: [walking.note],
          bullets: walking.steps,
        },
        {
          heading: outdoor.title,
          paragraphs: [outdoor.intro],
        },
        {
          heading: '周邊景點',
          bullets: attractions.map((spot) => `${spot.title}：${spot.caption}`),
        },
      ]}
    >
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {attractions.slice(0, 4).map((spot) => (
          <figure key={spot.src} className="overflow-hidden rounded-xl border border-[#e8e0d4] bg-white">
            <Image
              src={spot.src}
              alt={getImageAlt(spot.src)}
              width={640}
              height={420}
              className="h-48 w-full object-cover"
            />
            <figcaption className="px-4 py-3 text-sm text-[#5c4f42]">
              <strong className="text-[#2c2416]">{spot.title}</strong>
              <span className="mt-1 block">{spot.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SeoSubPage>
  );
}