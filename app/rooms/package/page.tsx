import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { PACKAGE_BOOKING } from '@/lib/business';
import { getImageAlt } from '@/lib/imageAlt';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.package;

export const metadata = buildPageMetadata({
  title: '福隆包棟民宿｜全館5間包房・平日$8,800・近車站',
  description:
    '福隆包棟民宿一間屋·駅前宿：4間和鳴雙人房+1間家庭房，平日$8,800、假日$9,200。舒適12-14人，福隆車站出站30秒，適合團體與單車隊。',
  path: page.path,
  keywords: [...FULONG_SEO_KEYWORDS.tier2, '福隆包棟', '福隆包棟民宿'],
  ogImage: page.image,
  ogImageAlt: getImageAlt(page.image),
});

export default function PackageRoomPage() {
  const { section } = page;

  return (
    <>
      <PageJsonLd
        data={[
          getRoomStructuredData('package'),
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '包棟方案', path: page.path },
          ]),
        ]}
      />
      <SeoSubPage
        eyebrow="包棟方案"
        title="福隆包棟・全館包房"
        description={page.description}
        sections={[
          {
            heading: section.title,
            paragraphs: [section.intro],
            bullets: [...section.highlights, `（${section.ecoNote}）`],
          },
          {
            heading: '價格與人數',
            bullets: [
              '平日 NT$8,800（週一～週四）',
              '假日 NT$9,200（週五、週六、假日）',
              `舒適建議 ${PACKAGE_BOOKING.comfortMin}–${PACKAGE_BOOKING.comfortMax} 人，最多 ${PACKAGE_BOOKING.maxPeople} 人`,
              section.priceNote,
            ],
          },
          {
            heading: '適合誰訂',
            paragraphs: [
              '家庭聚會、同學會、單車隊、公司員旅。福隆包棟民宿出站30秒即可集合，騎車玩水後直接回館休息。',
            ],
          },
        ]}
      >
        <Image
          src={page.image}
          alt={getImageAlt(page.image)}
          width={960}
          height={640}
          priority
          className="mt-10 w-full rounded-2xl border border-[#e8e0d4] object-cover"
        />
      </SeoSubPage>
    </>
  );
}