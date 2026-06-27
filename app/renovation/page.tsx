import type { Metadata } from 'next';
import Image from 'next/image';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { RENOVATION_PAGE } from '@/lib/seoPages';

const RENOVATION_IMAGES = [
  '/images/photo_2026-04-25_01-38-33.jpg',
  '/images/photo_2026-05-01_23-59-02.jpg',
  '/images/double_room.jpg',
] as const;

export const metadata: Metadata = {
  title: RENOVATION_PAGE.title,
  description: RENOVATION_PAGE.description,
  alternates: { canonical: '/renovation' },
  openGraph: {
    title: RENOVATION_PAGE.title,
    description: RENOVATION_PAGE.description,
    url: '/renovation',
  },
};

export default function RenovationPage() {
  return (
    <SeoSubPage
      eyebrow="2026 翻新"
      title={RENOVATION_PAGE.title}
      description={RENOVATION_PAGE.description}
      sections={[
        {
          heading: '翻新時間軸',
          bullets: RENOVATION_PAGE.timeline.map(
            (item) => `${item.period} ${item.label}：${item.note}`,
          ),
        },
        {
          heading: '為什麼值得再訪',
          paragraphs: [
            '2026 年 5 月完工後，和鳴雙人房、家庭房與公共空間全面升級，保留日式溫潤風格，同時強化隔音、收納與動線，讓福隆出站 30 秒民宿的住宿體驗更舒適。',
          ],
        },
      ]}
    >
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {RENOVATION_IMAGES.map((src) => (
          <Image
            key={src}
            src={src}
            alt={getImageAlt(src)}
            width={400}
            height={300}
            className="h-52 w-full rounded-xl border border-[#e8e0d4] object-cover"
          />
        ))}
      </div>
    </SeoSubPage>
  );
}