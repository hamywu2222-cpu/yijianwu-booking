import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { FULONG_GUIDE } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getFulongGuideStructuredData } from '@/lib/structuredData';

export const metadata = buildPageMetadata({
  title: '福隆怎麼玩｜海水浴場・舊草嶺隧道・車站步行30秒民宿',
  description:
    '福隆民宿攻略：從福隆車站步行30秒到一間屋·駅前宿。福隆海水浴場、舊草嶺隧道環狀線、單車與登山路線，福隆住宿必看景點整理。',
  path: '/fulong',
  keywords: [
    ...FULONG_SEO_KEYWORDS.tier1,
    '福隆海水浴場',
    '舊草嶺隧道',
    '福隆怎麼玩',
  ],
});

export default function FulongPage() {
  const { walking, outdoor, attractions } = FULONG_GUIDE;

  return (
    <>
      <PageJsonLd
        data={[
          getFulongGuideStructuredData(),
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '福隆怎麼玩', path: '/fulong' },
          ]),
        ]}
      />
      <SeoSubPage
        eyebrow="福隆攻略"
        title="福隆怎麼玩"
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
    </>
  );
}