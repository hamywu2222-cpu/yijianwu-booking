import Link from 'next/link';
import { MoonBadge, SunBadge } from '@/components/fulong/ItineraryStyle';
import { FULONG_HOME_PREVIEW } from '@/lib/fulongGuide';

/** 詳細時間線（時間 · 站點 · 說明） */
function TimelineSteps({
  steps,
}: {
  steps: readonly { time: string; emoji?: string; label: string; detail?: string }[];
}) {
  return (
    <ol className="relative ml-0.5 space-y-0 py-0.5">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={`${step.time}-${step.label}-${i}`} className="relative flex gap-2.5 pb-3.5 last:pb-0">
            {!isLast ? (
              <span
                className="absolute left-[0.7rem] top-7 bottom-0 w-px bg-gradient-to-b from-[#d4c4a8] to-[#e8e0d4]"
                aria-hidden
              />
            ) : null}
            <span
              className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#e8e0d4] bg-[#F8F5F1] text-[11px] shadow-sm"
              aria-hidden
            >
              {step.emoji ?? '·'}
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-[10px] font-bold tabular-nums tracking-wide text-[#8B7355]">
                  {step.time}
                </span>
                <span className="text-xs sm:text-[13px] font-medium leading-snug text-[#2c2416]">
                  {step.label}
                </span>
              </div>
              {step.detail ? (
                <p className="mt-0.5 text-[11px] leading-relaxed text-[#6B665F]">{step.detail}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** 引導至完整攻略 */
function MoreOnGuideLink({ href, label = '看完整時間線與細節' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-[#c4a574]/70 bg-[#fffbf3] px-3 py-2 text-[11px] font-medium text-[#6b5438] transition-colors hover:border-[#8B7355] hover:bg-[#f5e8c7]/50"
    >
      <span>{label}</span>
      <span className="shrink-0 text-[#8B7355]" aria-hidden>
        →
      </span>
    </Link>
  );
}

/** 1 日遊精美卡片（含時間線；當日來回、不含住宿） */
function DayTripCard({
  trip,
}: {
  trip: (typeof FULONG_HOME_PREVIEW.dayTrips)[number];
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_4px_20px_rgba(60,50,40,0.06)] transition-shadow hover:shadow-[0_8px_28px_rgba(60,50,40,0.1)]">
      <div className="relative overflow-hidden px-4 pt-4 pb-3">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 10% 0%, #fff4d8 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 20%, #e8f0ee 0%, transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex rounded-full bg-[#3d8799]/12 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#2f6b7a]">
              {trip.badge}
            </span>
            <span className="text-[10px] text-[#9a9086]">{trip.vibe}</span>
          </div>
          <h4 className="mb-1 font-playfair text-lg font-light tracking-tight text-[#2c2416]">
            {trip.title}
          </h4>
          <p className="mb-3 text-[10px] text-[#8B7355]">{trip.span}</p>
          <SunBadge label="出發 · 一間屋旁" />
          <p className="mt-1.5 text-[10px] leading-snug text-[#9a9086]">當日來回 · 不含住宿</p>
        </div>
      </div>

      <div className="flex-1 border-t border-[#f0ebe3] px-4 py-3">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#c4a574]">
          時間線
        </p>
        <TimelineSteps steps={trip.steps} />
      </div>

      <div className="mt-auto space-y-2 border-t border-[#f0ebe3] bg-gradient-to-b from-white to-[#faf7f2] px-4 py-3">
        <MoonBadge
          variant="home"
          title="當日結束 · 回家"
          subtitle="搭火車離開福隆，輕鬆踏上歸途"
        />
        <MoreOnGuideLink href={trip.href} label="想看更多時段細節 → 完整攻略" />
        <a
          href="#booking"
          className="block rounded-2xl border border-[#e8d5a8]/90 bg-gradient-to-r from-[#fff9ef] via-[#f8f1e4] to-[#f5e8c7]/80 px-3 py-2.5 transition-all hover:border-[#c4a574] hover:shadow-sm"
        >
          <p className="text-[11px] font-semibold leading-snug text-[#6b5438]">
            玩不夠？今晚就住一間屋 ✨
          </p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#8B7355]">
            改成 2 天 1 夜更從容 · 點我查空房
          </p>
        </a>
      </div>
    </article>
  );
}

/** 2 天 1 夜／3 天 2 夜精美卡片（含每日時間線） */
function StayCard({
  stay,
}: {
  stay: (typeof FULONG_HOME_PREVIEW.stays)[number];
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_4px_20px_rgba(60,50,40,0.06)] transition-all hover:shadow-[0_8px_28px_rgba(60,50,40,0.1)] hover:border-[#d4c4a8]">
      <div className="relative overflow-hidden px-4 pt-4 pb-3">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 90% 0%, #f5e8c7 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 0% 100%, #e8f0ee 0%, transparent 45%)',
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex rounded-full bg-[#c4a574]/25 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#6b5438]">
              {stay.badge}
            </span>
            <span className="text-[10px] text-[#9a9086]">{stay.vibe}</span>
          </div>
          <h4 className="mb-3 font-playfair text-lg font-light tracking-tight text-[#2c2416]">
            {stay.title}
          </h4>
          <SunBadge label="入住 · 一間屋" />
        </div>
      </div>

      <div className="flex-1 space-y-4 border-t border-[#f0ebe3] px-4 py-3">
        {stay.days.map((day, dayIndex) => (
          <div key={day.label}>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#f0d078]/40 to-[#c4a05c]/30 text-[11px]"
                aria-hidden
              >
                {dayIndex === 0 ? '☀️' : dayIndex === stay.days.length - 1 ? '🌤️' : '🌿'}
              </span>
              <div>
                <span className="text-[10px] font-bold tracking-wide text-[#8B7355]">
                  {day.label}
                </span>
                <span className="mx-1.5 text-[#e0d6c8]">·</span>
                <span className="text-xs font-medium text-[#2c2416]">{day.title}</span>
              </div>
            </div>
            <div className="ml-1">
              <TimelineSteps
                steps={day.steps.map((s) => ({
                  time: s.time,
                  label: s.label,
                  emoji: '📍',
                }))}
              />
            </div>
            {dayIndex < stay.days.length - 1 ? (
              <div className="mt-1">
                <MoonBadge
                  variant="stay"
                  title="夜宿一間屋 · 睡個好覺"
                  subtitle="沖澡 · 放空 · 好好眠"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-auto space-y-2 border-t border-[#f0ebe3] bg-gradient-to-b from-white to-[#faf7f2] px-4 py-3">
        <MoonBadge variant="home" />
        <MoreOnGuideLink href={stay.href} label="想看完整多日時間表 → 完整攻略" />
      </div>
    </article>
  );
}

const THEME_TONE: Record<
  (typeof FULONG_HOME_PREVIEW.themes)[number]['tone'],
  {
    card: string;
    orb: string;
    chip: string;
    glow: string;
    accent: string;
  }
> = {
  sand: {
    card: 'border-[#e8dcc8] hover:border-[#d4c4a8]',
    orb: 'from-[#fff6e4] to-[#f0d078]/50 ring-[#e8d5a8]/60',
    chip: 'bg-[#c4a574]/18 text-[#6b5438] border-[#e8d5a8]/50',
    glow: 'radial-gradient(ellipse 90% 80% at 0% 0%, #fff4d8 0%, transparent 55%)',
    accent: 'text-[#8B7355]',
  },
  bike: {
    card: 'border-[#d4e4e0] hover:border-[#a8c8c0]',
    orb: 'from-[#e8f4f0] to-[#7eb8a8]/35 ring-[#b8d8d0]/70',
    chip: 'bg-[#3d8799]/12 text-[#2f6b7a] border-[#3d8799]/25',
    glow: 'radial-gradient(ellipse 90% 80% at 100% 0%, #d8eee8 0%, transparent 55%)',
    accent: 'text-[#2f6b7a]',
  },
  reef: {
    card: 'border-[#c8dde8] hover:border-[#9ec0d4]',
    orb: 'from-[#e4f2f8] to-[#5aa8b8]/30 ring-[#a8d0e0]/70',
    chip: 'bg-[#3d8799]/14 text-[#255660] border-[#3d8799]/28',
    glow: 'radial-gradient(ellipse 90% 80% at 0% 100%, #d0eaf4 0%, transparent 55%)',
    accent: 'text-[#2f6b7a]',
  },
  trail: {
    card: 'border-[#ddd4c4] hover:border-[#c4b49a]',
    orb: 'from-[#f5f0e4] to-[#a89070]/30 ring-[#d4c4a8]/70',
    chip: 'bg-[#8B7355]/12 text-[#5c4a38] border-[#c4a574]/40',
    glow: 'radial-gradient(ellipse 90% 80% at 100% 100%, #ebe4d4 0%, transparent 55%)',
    accent: 'text-[#6b5438]',
  },
};

/** 四大方向精美圖卡 */
function ThemeCard({
  theme,
  index,
}: {
  theme: (typeof FULONG_HOME_PREVIEW.themes)[number];
  index: number;
}) {
  const tone = THEME_TONE[theme.tone];
  const num = String(index + 1).padStart(2, '0');

  return (
    <Link
      href={theme.href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-0 shadow-[0_4px_18px_rgba(60,50,40,0.05)] transition-all hover:shadow-[0_10px_32px_rgba(60,50,40,0.1)] hover:-translate-y-0.5 ${tone.card}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-95"
        style={{ background: tone.glow }}
        aria-hidden
      />
      {/* 角落裝飾數字 */}
      <span
        className="pointer-events-none absolute -right-1 -top-2 font-playfair text-6xl font-light leading-none text-[#2c2416]/[0.04] select-none"
        aria-hidden
      >
        {num}
      </span>

      <div className="relative flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-sm ring-1 ${tone.orb}`}
            aria-hidden
          >
            {theme.emoji}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wide ${tone.chip}`}
              >
                {theme.hint}
              </span>
            </div>
            <h4 className="font-playfair text-lg sm:text-xl font-light tracking-tight text-[#2c2416]">
              {theme.title}
            </h4>
          </div>
        </div>

        <p className="relative mt-3 text-xs sm:text-sm leading-relaxed text-[#5c4f42]">
          {theme.blurb}
        </p>

        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e8e0d4]/90 bg-white/70 px-2 py-0.5 text-[10px] text-[#6B665F]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className={`relative mt-4 flex items-center justify-between border-t border-[#f0ebe3] pt-3 text-[11px] font-medium ${tone.accent}`}
        >
          <span className="tracking-wide">探索此方向</span>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-current/20 bg-white/80 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

/** 首頁福隆區塊：攻略精華摘要；完整攻略僅由底部按鈕進 /fulong */
export default function HomeFulongGuideTeaser() {
  const p = FULONG_HOME_PREVIEW;

  return (
    <div className="mt-12 space-y-8">
      {/* 基地一句話 */}
      <div className="rounded-2xl border border-[#e8e0d4] bg-[#F8F5F1] px-5 py-4 text-center sm:text-left">
        <p className="text-xs font-semibold tracking-wide text-[#8B7355]">
          以一間屋為中心
        </p>
        <p className="mt-1 text-sm leading-relaxed text-[#5c4f42]">{p.hubNote}</p>
      </div>

      {/* 四大主題 — 固定列「福隆旅遊攻略」錨點 #fulong-play */}
      <div id="fulong-play" className="scroll-mt-28 md:scroll-mt-24">
        <div className="mb-4 text-center sm:text-left">
          <p className="text-[10px] tracking-[0.28em] text-[#8B7355] mb-1">PATHS FROM THE STATION</p>
          <h3 className="font-playfair text-xl font-light text-[#2c2416] sm:text-2xl">
            福隆旅遊攻略・從車站出發
          </h3>
          <p className="mt-1.5 text-xs text-[#9a9086] max-w-lg">
            玩水、單車、潮間帶、健行，以及山上整日／半日行程、純素餐廳與手作體驗。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {p.themes.map((t, i) => (
            <ThemeCard key={t.title} theme={t} index={i} />
          ))}
        </div>
      </div>

      {/* 行程精華（在熱門景點上方） */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-[#e8e0d4] bg-gradient-to-b from-[#F8F5F1] via-[#faf8f4] to-[#f3efe8] p-5 sm:p-7">
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#f0d078]/15 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-[#3d8799]/10 blur-2xl"
          aria-hidden
        />

        <div className="relative text-center sm:text-left mb-5">
          <p className="text-[10px] tracking-[0.28em] text-[#8B7355] mb-1">ITINERARY · ONE HOUSE</p>
          <h3 className="font-playfair text-xl sm:text-2xl font-light text-[#2c2416]">
            行程精華
            <span className="text-[#8B7355]">（一間屋起迄）</span>
          </h3>
          <p className="mt-1.5 text-xs text-[#9a9086] max-w-lg">
            1 日遊當日來回；過夜方案每晚回一間屋。下方為時間線精華，
            <a href="#fulong-guide-full" className="font-medium text-[#8B7355] underline-offset-2 hover:underline">
              想看更多請點完整攻略
            </a>
            。
          </p>
          <div
            className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] text-[#8B7355]"
            aria-hidden
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e8d5a8] bg-white/80 px-2 py-0.5">
              ☀️ 出發
            </span>
            <span className="text-[#d4c4a8]">→</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#e8e0d4] bg-white/80 px-2 py-0.5">
              行程
            </span>
            <span className="text-[#d4c4a8]">→</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#c4785a]/40 bg-[#c4785a]/15 px-2 py-0.5 text-[#8B5a3c]">
              🚂 1 日回家
            </span>
            <span className="text-[#d4c4a8]">／</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#1a1a2e]/30 bg-[#1a1a2e] px-2 py-0.5 text-white/90">
              🌙 過夜住一間屋
            </span>
          </div>
        </div>

        <p className="relative mb-3 text-[11px] font-semibold tracking-wide text-[#2f6b7a]">
          1 日遊（只租腳踏車＆電輔車 · 當日來回）
        </p>
        <div className="relative grid gap-4 sm:grid-cols-3">
          {p.dayTrips.map((d) => (
            <DayTripCard key={d.badge} trip={d} />
          ))}
        </div>

        <p className="relative mt-7 mb-3 text-[11px] font-semibold tracking-wide text-[#6b5438]">
          過夜方案（每晚回一間屋）
        </p>
        <div className="relative grid gap-4 sm:grid-cols-2">
          {p.stays.map((s) => (
            <StayCard key={s.badge} stay={s} />
          ))}
        </div>

        <p className="relative mt-5 text-center text-xs text-[#6B665F] sm:text-left">
          適合族群：{p.personas.join(' · ')}
        </p>

        {/* 完整攻略 CTA — 整合在行程精華區塊底部（設計不變） */}
        <div
          id="fulong-guide-full"
          className="relative mt-6 overflow-hidden rounded-3xl border border-[#e8e0d4] bg-gradient-to-br from-[#2c2416] via-[#3a3228] to-[#1e454f] px-5 py-8 text-center text-white sm:px-10 scroll-mt-28 md:scroll-mt-24"
        >
          <div
            className="pointer-events-none absolute -right-6 top-0 h-28 w-28 rounded-full bg-[#f0d078]/15 blur-2xl"
            aria-hidden
          />
          <p className="relative text-[10px] tracking-[0.3em] text-[#e8d5b5]">FULONG FULL GUIDE</p>
          <p className="relative mt-2 font-playfair text-xl font-light sm:text-2xl">
            福隆旅遊完整攻略
          </p>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-white/75">
            {p.ctaHint}
            <br />
            含完整時間表、交通（步行／單車／機車／開車）、1 日遊與多日 overnight、各族群建議。
          </p>
          <div className="relative mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/fulong"
              className="inline-flex items-center justify-center rounded-full bg-[#f0d078] px-6 py-2.5 text-sm font-semibold text-[#2c2416] shadow-[0_4px_16px_rgba(240,208,120,0.35)] transition hover:brightness-105"
            >
              開啟福隆旅遊完整攻略 →
            </Link>
            <a
              href="#booking"
              className="primary-booking-btn inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold"
            >
              立即訂房
            </a>
          </div>
          <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/fulong/day-trip"
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white/90 hover:bg-white/15"
            >
              ☀️ 一日遊
            </Link>
            <Link
              href="/fulong/bike"
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white/90 hover:bg-white/15"
            >
              🚴 舊草嶺單車
            </Link>
            <Link
              href="/fulong/water"
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] text-white/90 hover:bg-white/15"
            >
              🤿 玩水浮潛
            </Link>
          </div>
          <p className="relative mt-3 text-[11px] text-white/50">
            也可從各行程卡「想看更多時段細節」跳到總覽章節
          </p>
        </div>
      </div>

      {/* 近距景點（在行程精華＋完整攻略入口下方） */}
      <div>
        <h3 className="text-center font-playfair text-xl font-light text-[#2c2416] sm:text-left sm:text-2xl">
          從一間屋出發・熱門景點
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {p.nearSpots.map((s) => (
            <li
              key={s.name}
              className="flex h-full flex-col rounded-xl border border-[#e8e0d4] bg-white px-3.5 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="font-medium text-[#2c2416]">{s.name}</span>
                <span className="rounded-full bg-[#3d8799]/12 px-2 py-0.5 text-[10px] font-semibold text-[#2f6b7a]">
                  {s.mode}
                </span>
              </div>
              <span className="mt-1 text-[11px] font-semibold text-[#3d8799]">
                抵達約 {s.from}
              </span>
              <span className="mt-0.5 text-xs text-[#6B665F]">{s.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
