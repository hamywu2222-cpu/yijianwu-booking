import FulongGuideCta from '@/components/FulongGuideCta';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { buildPageMetadata } from '@/lib/seoMetadata';
import { FULONG_SEO_KEYWORDS } from '@/lib/seo';
import { SITE_FAQ } from '@/lib/seoPages';
import { getBreadcrumbJsonLd, getFaqStructuredData } from '@/lib/structuredData';

export const metadata = buildPageMetadata({
  title: '常見問題｜福隆車站民宿・沒開車怎麼住・LINE自助入住',
  description:
    '福隆車站民宿 FAQ：出站步行30秒、沒開車怎麼住、空房查詢、包棟規則、LINE @811mszbh 自助入住、行李寄放與福隆旅遊攻略。',
  path: '/faq',
  keywords: [
    ...FULONG_SEO_KEYWORDS.tier1,
    '福隆民宿 FAQ',
    'LINE自助入住',
    '福隆旅遊攻略',
    '福隆攻略',
    '福隆怎麼玩',
  ],
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
              {'link' in item && item.link ? (
                <div className="mt-4">
                  <FulongGuideCta
                    variant="default"
                    label={item.link.label.replace(/\s*→\s*$/, '')}
                  />
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </SeoSubPage>
    </>
  );
}