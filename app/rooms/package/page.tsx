import RoomImageCarousel from '@/components/RoomImageCarousel';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { HolidayPriceNotice } from '@/components/home/HomeUi';
import { PackagePeopleNotice } from '@/components/PackagePeopleNotice';
import { PACKAGE_IMAGES } from '@/lib/media';
import { getImageAlt } from '@/lib/imageAlt';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.package;

export const metadata = buildPageMetadata({
  title: '福隆包棟民宿｜全館5間包房・平日$8,800・近車站',
  description:
    '福隆包棟民宿一間屋·駅前宿：4間和鳴雙人雅房+1間家庭雅房，全館衛浴共三間可使用（全套衛浴）。14人內平日$8,800、假日$9,200；超過14人每人+$600，最多18人，須先詢問。福隆車站出站30秒。',
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
            bullets: [
              ...section.highlights,
              section.amenitiesNote,
            ],
          },
          {
            heading: '價格與人數',
            content: <PackagePeopleNotice className="mt-4" />,
            bullets: [section.bikeNote],
          },
          {
            heading: '適合誰訂',
            paragraphs: [
              '家庭聚會、同學會、單車隊、公司員旅。福隆包棟民宿出站30秒即可集合，騎車玩水後直接回館休息。',
            ],
          },
        ]}
      >
        <HolidayPriceNotice className="mt-6 sm:mt-8 rounded-2xl border border-[#E8DFD2] bg-white px-3 py-2.5 sm:px-4 sm:py-3" />
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#e8e0d4] bg-white">
          <RoomImageCarousel
            images={PACKAGE_IMAGES}
            label="包棟實景：主視覺・雙人雅房・家庭雅房・公共空間"
            priority
          />
        </div>
        <p className="mt-3 text-center text-xs text-[#8B7355] leading-relaxed">
          左右滑動：主視覺 → 雙人雅房 4 張 → 家庭雅房 → 走廊 → 公共空間 → 衛浴
        </p>
      </SeoSubPage>
    </>
  );
}
