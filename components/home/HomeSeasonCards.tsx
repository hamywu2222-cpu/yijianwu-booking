import { BOOKING_CTA } from '@/lib/business';

/**
 * 福隆攻略「本季可參加」三張卡（9–11 月）。
 * 若不要：刪除此檔，並拿掉 app/fulong/page.tsx 的 import 與 <HomeSeasonCards />。
 */
const CARDS = [
  {
    month: '9月',
    title: '沙雕看到底＋粉色單車',
    when: '即日起～9/30',
    fromStay: '海水浴場步行約 8–12 分；單車站前可租',
    rain: '小雨可走沙雕園區、舊草嶺隧道',
    note: '沙雕展至 10/26。9 月另有「極點慢旅」騎乘，完成紀錄可至福隆遊客中心抽扭蛋。',
  },
  {
    month: '10月',
    title: '沙雕最終場＋連假短住',
    when: '至 10/26 閉展',
    fromStay: '出站 30 秒放下行李再去看展',
    rain: '小雨仍可看沙雕；隧道全年可騎',
    note: '國慶 10/9–11、光復節連假 10/24–26 卡在閉展前後，適合火車來住一晚。',
  },
  {
    month: '11月',
    title: '草嶺古道芒花季',
    when: '11/1–11/30',
    fromStay: '福隆站是標準起點，接駁多從遊客中心走',
    rain: '健行請備雨具；建議前一晚入住、清晨出發',
    note: '秋天主打。住車站旁，隔天走古道、晚上回房，比當日趕末班車輕鬆。',
  },
] as const;

export default function HomeSeasonCards() {
  return (
    <section id="season-now" className="scroll-mt-24" aria-labelledby="season-now-heading">
      <p className="text-xs tracking-[3px] text-[#8B7355]">THIS SEASON</p>
      <h2 id="season-now-heading" className="mt-1 font-playfair text-2xl font-light sm:text-3xl">
        本季可參加
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-[#6B665F]">
        行程若已大致排好，這三檔是 9–11 月從福隆車站出發最順的活動。住一間屋：出站 30 秒放下行李再出門，小雨也能看沙雕、騎隧道。
      </p>
      <div className="mt-6 grid gap-4">
          {CARDS.map((card) => (
            <article
              key={card.month}
              className="flex h-full flex-col rounded-3xl border border-[#EDE8E0] bg-[#F8F5F1] p-5 md:p-6"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[#8B7355]">{card.month}</p>
              <h3 className="mt-2 text-xl font-medium leading-snug text-[#3F3A36]">{card.title}</h3>
              <p className="mt-1 text-sm text-[#8B7355]">{card.when}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-[#6B665F]">
                <li>{card.fromStay}</li>
                <li>{card.rain}</li>
                <li>{card.note}</li>
              </ul>
              <a
                href="/booking"
                className="primary-booking-btn mt-5 inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-5 text-sm font-semibold"
              >
                {BOOKING_CTA.jump}
              </a>
            </article>
          ))}
      </div>
    </section>
  );
}
