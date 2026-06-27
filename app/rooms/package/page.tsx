import type { Metadata } from 'next';
import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { PACKAGE_BOOKING } from '@/lib/business';
import { getImageAlt } from '@/lib/imageAlt';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.package;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: {
    title: page.title,
    description: page.description,
    url: page.path,
    images: [{ url: page.image, alt: getImageAlt(page.image) }],
  },
};

export default function PackageRoomPage() {
  const { section } = page;

  return (
    <>
      <PageJsonLd data={getRoomStructuredData('package')} />
      <SeoSubPage
        eyebrow="包棟方案"
        title={page.title}
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
              '家庭聚會、同學會、單車隊、公司員旅或想一次包下福隆車站旁整棟民宿的團體。出站 30 秒即可集合，騎車、玩水後直接回館休息。',
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