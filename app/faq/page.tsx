import type { Metadata } from 'next';
import { PageJsonLd } from '@/components/PageJsonLd';
import { SeoSubPage } from '@/components/SeoSubPage';
import { SITE_FAQ } from '@/lib/seoPages';
import { getFaqStructuredData } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: '常見問題 FAQ｜福隆一間屋・駅前宿訂房與入住',
  description:
    '一間屋・駅前宿訂房 FAQ：空房查詢、包棟規則、加人計費、入住退房時間、LINE 門禁密碼、行李寄放與從福隆車站步行 30 秒路線。',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: '常見問題 FAQ｜福隆一間屋・駅前宿',
    description: '訂房、包棟、加人計費、入住資訊與福隆車站步行路線，一頁看懂。',
    url: '/faq',
  },
};

export default function FaqPage() {
  return (
    <>
      <PageJsonLd data={getFaqStructuredData()} />
      <SeoSubPage
        eyebrow="FAQ"
        title="常見問題"
        description="關於訂房、房型、包棟、入住與福隆交通的常見疑問，整理如下供您參考。"
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