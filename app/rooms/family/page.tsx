import { PageJsonLd } from '@/components/PageJsonLd';
import RoomImageCarousel from '@/components/RoomImageCarousel';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { FAMILY_ROOM_IMAGES, ROOM_VIDEOS } from '@/lib/media';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.family;

export const metadata = buildPageMetadata({
  title: '和風家庭房｜福隆民宿4-6人・近車站・僅此1間',
  description:
    '福隆住宿和風4-6人家庭房，兩張雙人床寬敞日式空間。平日$3,000起、假日$3,200起。福隆車站出站30秒，適合親子與小團體。',
  path: page.path,
  keywords: [...FULONG_SEO_KEYWORDS.tier1, '福隆親子民宿', '福隆家庭房'],
  ogImage: page.image,
  ogImageAlt: getImageAlt(page.image),
});

export default function FamilyRoomPage() {
  const { room } = page;

  return (
    <>
      <PageJsonLd
        data={[
          getRoomStructuredData('family'),
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '和風家庭房', path: page.path },
          ]),
        ]}
      />
      <SeoSubPage
        eyebrow="房型介紹"
        title="和風4-6人家庭房"
        description={page.description}
        sections={[
          {
            heading: `${room.title}（${room.badge}）`,
            paragraphs: [room.note, room.extraNote],
            bullets: [
              ...room.tags,
              `價格：${room.pricing.weekday.label} ${room.pricing.weekday.sale} 起 / ${room.pricing.holiday.label} ${room.pricing.holiday.sale} 起`,
              `床型：${page.bed}，舒適建議 4–6 人`,
            ],
          },
          {
            heading: '適合誰住',
            paragraphs: [
              '親子家庭、好友小團體。全館僅此一間家庭房，建議提早於官網訂房。',
            ],
          },
        ]}
      >
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#e8e0d4]">
          <RoomImageCarousel
            images={FAMILY_ROOM_IMAGES}
            label={ROOM_VIDEOS.family.label}
            priority
          />
        </div>
      </SeoSubPage>
    </>
  );
}