import Image from 'next/image';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { getImageAlt } from '@/lib/imageAlt';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { ROOM_PAGES } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getRoomStructuredData } from '@/lib/structuredData';

const page = ROOM_PAGES.double;

export const metadata = buildPageMetadata({
  title: '和鳴雙人房｜福隆民宿近車站・出站30秒・平日$1,500',
  description:
    '福隆車站民宿和鳴雙人房，出站步行30秒。原木和式雅房共4間，平日$1,500、假日$1,600。2026全新裝潢，官網訂房享最大優惠。',
  path: page.path,
  keywords: [...FULONG_SEO_KEYWORDS.tier1, '福隆雙人房', '和鳴雙人房'],
  ogImage: page.image,
  ogImageAlt: getImageAlt(page.image),
});

export default function DoubleRoomPage() {
  const { room } = page;

  return (
    <>
      <PageJsonLd
        data={[
          getRoomStructuredData('double'),
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '和鳴雙人房', path: page.path },
          ]),
        ]}
      />
      <SeoSubPage
        eyebrow="房型介紹"
        title="和鳴雙人房"
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
              '情侶、好友、獨旅或搭火車抵達福隆的旅人。福隆民宿近車站，出站30秒即可入住，隔天可步行至海水浴場或騎舊草嶺隧道。',
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