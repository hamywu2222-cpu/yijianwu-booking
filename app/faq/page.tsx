import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { SITE_FAQ } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getFaqStructuredData } from '@/lib/structuredData';

export const metadata = buildPageMetadata({
  title: '常見問題｜福隆民宿訂房・LINE自助入住・包棟規則',
  description:
    '福隆民宿一間屋·駅前宿 FAQ：空房查詢、包棟規則、加人計費、入住退房、LINE自助入住門禁密碼、行李寄放、福隆車站步行30秒路線。',
  path: '/faq',
  keywords: [...FULONG_SEO_KEYWORDS.tier1, '福隆民宿 FAQ', 'LINE自助入住'],
});

export default function FaqPage() {
  return (
    <>
      <PageJsonLd
        data={[
          getFaqStructuredData(),
          getBreadcrumbJsonLd([
            { name: '首頁', path: '/' },
            { name: '常見問題', path: '/faq' },
          ]),
        ]}
      />
      <SeoSubPage
        eyebrow="FAQ"
        title="福隆民宿常見問題"
        description="關於福隆住宿訂房、房型、包棟、LINE自助入住與交通的常見疑問。"
        sections={[]}
      >
        <div className="mt-10 space-y-8">
          {SITE_FAQ.map((item) => (
            <section key={item.question} className="border-b border-[#EDE8E0] pb-8 last:border-0">
              <h2 className="font-serif text-lg font-semibold text-[#3F3A36] sm:text-xl">
                {item.question}
              </h2>
              <p className="mt-3 leading-relaxed text-[#6B665F]">{item.answer}</p>
            </section>
          ))}
        </div>
      </SeoSubPage>
    </>
  );
}