import type { Metadata } from 'next';
import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.family;

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

export default function FamilyRoomPage() {
  const { room } = page;

  return (
    <>
      <PageJsonLd data={getRoomStructuredData('family')} />
      <SeoSubPage
        eyebrow="房型介紹"
        title={page.title}
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
              '親子家庭、三代同堂小旅行，或 3–5 位好友想共用寬敞和風空間的團體。全館僅此一間家庭房，建議提早於官網訂房。',
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