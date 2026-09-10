import Link from 'next/link';

const HUB_LINKS = [
  { href: '/booking', label: '福隆車站民宿訂房' },
  { href: '/fulong', label: '福隆旅遊攻略' },
  { href: '/fulong/day-trip', label: '福隆一日遊' },
  { href: '/faq', label: '沒開車怎麼住' },
] as const;

const FAQ_TEASER = [
  {
    q: '福隆車站附近哪間民宿最近？沒開車方便嗎？',
    a: '出站大廳右轉直走約 30 秒即達。持雙北月票可直達福隆站，適合台北、新北出發。',
    href: '/faq',
  },
  {
    q: '福隆有什麼好玩？住這裡方便嗎？',
    a: '海水浴場步行約 8–12 分，舊草嶺單車在車站旁租車。完整行程見旅遊攻略。',
    href: '/fulong',
  },
  {
    q: '如何確認當天有空房？',
    a: '請到官網訂房頁選日期。頁上可選房型即有空；看不到可選房型表示已滿。',
    href: '/booking',
  },
] as const;

/** 首頁給搜尋引擎與旅客的內頁入口（車站民宿、攻略、FAQ） */
export default function HomeSeoHub() {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-10 md:pb-12" aria-label="福隆車站民宿延伸資訊">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {HUB_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-[#EDE8E0] bg-white px-3.5 py-1.5 text-xs text-[#6B665F] hover:border-[#8B7355] hover:text-[#3F3A36]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-[#EDE8E0] bg-white px-5 py-6 md:px-8 md:py-7">
        <p className="text-center text-[10px] tracking-[0.28em] text-[#8B7355] mb-2">FAQ</p>
        <h2 className="text-center font-playfair text-2xl font-light text-[#3F3A36] mb-5">
          福隆車站民宿常見問題
        </h2>
        <dl className="space-y-4">
          {FAQ_TEASER.map((item) => (
            <div key={item.q} className="border-t border-[#F0EBE3] pt-4 first:border-t-0 first:pt-0">
              <dt className="text-sm font-medium text-[#3F3A36]">{item.q}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#6B665F]">
                {item.a}{' '}
                <Link href={item.href} className="text-[#8B7355] hover:underline">
                  了解更多 →
                </Link>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-center">
          <Link href="/faq" className="text-xs font-medium text-[#8B7355] hover:underline">
            看全部常見問題 →
          </Link>
        </p>
      </div>
    </section>
  );
}
