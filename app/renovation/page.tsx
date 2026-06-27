import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { RENOVATION_PAGE } from '@/lib/seoPages';
import { getBreadcrumbJsonLd } from '@/lib/structuredData';

const RENOVATION_IMAGES = [
  '/images/photo_2026-04-25_01-38-33.jpg',
  '/images/photo_2026-05-01_23-59-02.jpg',
  '/images/double_room.jpg',
] as const;

export const metadata = buildPageMetadata({
  title: '2026全新裝潢｜福隆車站民宿一間屋翻新紀錄',
  description:
    '福隆民宿一間屋·駅前宿 2026年1樓全面翻新紀錄。和鳴雙人房、家庭房日式空間升級，福隆車站出站30秒合法住宿。',
  path: '/renovation',
  keywords: [...FULONG_SEO_KEYWORDS.tier1, '福隆民宿 全新裝潢', '2026裝潢'],
});

export default function RenovationPage() {
  return (
    <>
      <PageJsonLd
        data={getBreadcrumbJsonLd([
          { name: '首頁', path: '/' },
          { name: '2026 全新裝潢', path: '/renovation' },
        ])}
      />
      <SeoSubPage
        eyebrow="2026 翻新"
        title="2026 全新裝潢紀錄"
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
              '2026 年 5 月完工後，和鳴雙人房、家庭房與公共空間全面升級，保留日式溫潤風格，讓福隆出站30秒民宿的住宿體驗更舒適。',
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
    </>
  );
}