import type { Metadata } from 'next';
import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.double;

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

export default function DoubleRoomPage() {
  const { room } = page;

  return (
    <>
      <PageJsonLd data={getRoomStructuredData('double')} />
      <SeoSubPage
        eyebrow="房型介紹"
        title={page.title}
        description={page.description}
        sections={[
          {
            heading: room.title,
            paragraphs: [room.note],
            bullets: [
              ...room.tags,
              `價格：${room.pricing.weekday.label} ${room.pricing.weekday.sale} / ${room.pricing.holiday.label} ${room.pricing.holiday.sale}`,
              `床型：${page.bed}，舒適建議 ${page.maxOccupancy} 人內`,
            ],
          },
          {
            heading: '適合誰住',
            paragraphs: [
              '情侶約會、好友出遊、獨旅背包客，或搭火車抵達福隆、想住車站旁安靜日式客房的旅人。福隆出站 30 秒即可入住，隔天可步行至海水浴場或騎舊草嶺隧道。',
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