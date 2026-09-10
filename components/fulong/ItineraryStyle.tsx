import Link from 'next/link';
import type { DayTripPlan, MultiDayItinerary } from '@/lib/fulongGuide';

/** 日昇膠囊：暖金太陽 */
export function SunBadge({
  label = '出發 · 一間屋',
  sub = '福隆站出站 30 秒',
}: {
  label?: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#e8d5a8]/80 bg-gradient-to-r from-[#fff6e4] via-[#f5e8c7] to-[#f0e0b8] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f0d078] to-[#c4a05c] text-base shadow-sm"
        aria-hidden
      >
        ☀️
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-wide text-[#8B7355]">{label}</p>
        <p className="text-[11px] leading-tight text-[#6b5438]/90">{sub}</p>
      </div>
    </div>
  );
}

/**
 * 節奏膠囊
 * - stay：深色星空 · 回一間屋（過夜）
 * - home：暖暮回程色 · 回家
 */
export function MoonBadge({
  variant = 'stay',
  title,
  subtitle,
}: {
  variant?: 'stay' | 'home';
  title?: string;
  subtitle?: string;
}) {
  if (variant === 'home') {
    return (
      <div className="relative flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#c4785a] via-[#b86b4a] to-[#8B7355] px-3 py-2.5 text-white shadow-md">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 90% 50%, #ffe0b0 0%, transparent 55%)',
          }}
          aria-hidden
        />
        <span
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-base ring-1 ring-white/25"
          aria-hidden
        >
          🚂
        </span>
        <div className="relative min-w-0">
          <p className="text-[11px] font-medium leading-snug tracking-wide sm:text-xs">
            {title ?? '行程結束 · 回家'}
          </p>
          <p className="text-[10px] leading-tight text-white/75">
            {subtitle ?? '帶著山海記憶踏上歸途'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] px-3 py-2.5 text-white shadow-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 28%, rgba(255,255,255,0.9), transparent), radial-gradient(1px 1px at 28% 72%, rgba(255,255,255,0.55), transparent), radial-gradient(1.2px 1.2px at 48% 18%, rgba(255,255,255,0.85), transparent), radial-gradient(1px 1px at 62% 58%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 78% 32%, rgba(255,255,255,0.75), transparent), radial-gradient(1.5px 1.5px at 88% 78%, rgba(255,240,200,0.7), transparent), radial-gradient(1px 1px at 40% 45%, rgba(255,255,255,0.4), transparent)',
        }}
        aria-hidden
      />
      <span
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-base ring-1 ring-white/20"
        aria-hidden
      >
        🌙
      </span>
      <div className="relative min-w-0">
        <p className="text-[11px] font-medium leading-snug tracking-wide sm:text-xs">
          {title ?? '回一間屋 · 睡個好覺'}
        </p>
        <p className="text-[10px] leading-tight text-white/60">
          {subtitle ?? '沖澡 · 放空 · 好好眠'}
        </p>
      </div>
    </div>
  );
}

/** 攻略頁：1 日遊完整卡片（當日來回 · 不含住宿） */
export function DayTripDetailCard({ plan }: { plan: DayTripPlan }) {
  return (
    <article
      id={plan.id}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_4px_20px_rgba(60,50,40,0.06)]"
    >
      <div className="relative overflow-hidden px-5 py-5 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 10% 0%, #fff4d8 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 100% 20%, #e8f0ee 0%, transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#3d8799]/12 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#2f6b7a]">
              {plan.badge}
            </span>
            <span className="rounded-full border border-[#e8e0d4] bg-white/80 px-2 py-0.5 text-[10px] text-[#9a9086]">
              當日來回 · 不含住宿
            </span>
            {plan.noVehicle ? (
              <span className="rounded-full border border-[#7eb8a8]/50 bg-[#e8f4f0] px-2 py-0.5 text-[10px] font-medium text-[#2f6b7a]">
                只租腳踏車＆電輔車
              </span>
            ) : (
              <span className="rounded-full border border-[#c4785a]/30 bg-[#c4785a]/10 px-2 py-0.5 text-[10px] font-medium text-[#8B5a3c]">
                需自備機車／汽車
              </span>
            )}
          </div>
          <h4 className="font-playfair text-xl font-light tracking-tight text-[#2c2416] sm:text-2xl">
            {plan.title}
          </h4>
          <p className="mt-1.5 text-xs text-[#6B665F]">
            適合：{plan.bestFor} ｜ {plan.totalSpan}
          </p>
          <p className="mt-1 text-xs text-[#9a9086]">
            交通：{plan.transport}
          </p>
          <div className="mt-4">
            <SunBadge label="出發 · 一間屋旁" sub={plan.hub} />
          </div>
          {plan.booking ? (
            <a
              href={plan.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2 rounded-2xl border border-[#e8d5a8] bg-[#fff9ef] px-3 py-2.5 transition hover:border-[#c4a574]"
            >
              <span className="mt-0.5 text-sm" aria-hidden>
                🌿
              </span>
              <span>
                <span className="block text-[11px] font-semibold text-[#6b5438]">{plan.booking.label}</span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-[#8B7355]">
                  {plan.booking.note}
                </span>
              </span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="border-t border-[#f0ebe3] px-5 py-5 sm:px-6">
        <p className="mb-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#c4a574]">
          時間行程
        </p>
        <ol className="relative space-y-0">
          {plan.slots.map((slot, i) => {
            const isLast = i === plan.slots.length - 1;
            return (
              <li key={`${plan.id}-${slot.time}-${slot.place}`} className="relative flex gap-3 pb-4 last:pb-0">
                {!isLast ? (
                  <span
                    className="absolute left-[0.7rem] top-7 bottom-0 w-px bg-gradient-to-b from-[#d4c4a8] to-[#e8e0d4]"
                    aria-hidden
                  />
                ) : null}
                <span
                  className="relative z-[1] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#e8e0d4] bg-[#F8F5F1] text-[10px] font-bold text-[#8B7355] shadow-sm"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-[11px] font-semibold text-[#8B7355]">{slot.time}</span>
                    <span className="text-sm font-medium text-[#2c2416]">{slot.place}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#6B665F] sm:text-sm">
                    {slot.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-2.5 border-t border-[#f0ebe3] bg-gradient-to-b from-white to-[#faf7f2] px-5 py-4 sm:px-6">
        <MoonBadge
          variant="home"
          title="當日結束 · 回家"
          subtitle="搭火車離開福隆，輕鬆踏上歸途"
        />
        <Link
          href="/booking"
          className="block rounded-2xl border border-[#e8d5a8]/90 bg-gradient-to-r from-[#fff9ef] via-[#f8f1e4] to-[#f5e8c7]/80 px-3 py-2.5 transition-all hover:border-[#c4a574] hover:shadow-sm"
        >
          <p className="text-[11px] font-semibold leading-snug text-[#6b5438]">
            玩不夠？今晚就住一間屋 ✨
          </p>
          <p className="mt-0.5 text-[10px] leading-snug text-[#8B7355]">
            改成 2 天 1 夜更從容 · 點我查空房
          </p>
        </Link>
        {plan.tip ? (
          <p className="text-[11px] leading-relaxed text-[#9a9086]">💡 {plan.tip}</p>
        ) : null}
      </div>
    </article>
  );
}

/** 攻略頁：2 天 1 夜／3 天 2 夜完整卡片 */
export function MultiDayDetailCard({ itinerary }: { itinerary: MultiDayItinerary }) {
  return (
    <article
      id={itinerary.id}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white shadow-[0_4px_20px_rgba(60,50,40,0.06)]"
    >
      <div className="relative overflow-hidden px-5 py-5 sm:px-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 90% 0%, #f5e8c7 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 0% 100%, #e8f0ee 0%, transparent 45%)',
          }}
          aria-hidden
        />
        <div className="relative">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#c4a574]/25 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[#6b5438]">
              {itinerary.badge}
            </span>
            {itinerary.noVehicle ? (
              <span className="rounded-full border border-[#7eb8a8]/50 bg-[#e8f4f0] px-2 py-0.5 text-[10px] font-medium text-[#2f6b7a]">
                只租腳踏車＆電輔車
              </span>
            ) : (
              <span className="rounded-full border border-[#c4785a]/30 bg-[#c4785a]/10 px-2 py-0.5 text-[10px] font-medium text-[#8B5a3c]">
                需自備機車／汽車
              </span>
            )}
            <span className="text-[11px] text-[#9a9086]">{itinerary.nights}</span>
          </div>
          <h4 className="font-playfair text-xl font-light tracking-tight text-[#2c2416] sm:text-2xl">
            {itinerary.title}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#5c4f42]">{itinerary.summary}</p>
          <p className="mt-1 text-xs text-[#9a9086]">適合：{itinerary.bestFor}</p>
          <div className="mt-4">
            <SunBadge label="入住 · 一間屋" sub={itinerary.hubRule} />
          </div>
          {itinerary.booking ? (
            <a
              href={itinerary.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2 rounded-2xl border border-[#e8d5a8] bg-[#fff9ef] px-3 py-2.5 transition hover:border-[#c4a574]"
            >
              <span className="mt-0.5 text-sm" aria-hidden>
                🌿
              </span>
              <span>
                <span className="block text-[11px] font-semibold text-[#6b5438]">
                  {itinerary.booking.label}
                </span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-[#8B7355]">
                  {itinerary.booking.note}
                </span>
              </span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="space-y-5 border-t border-[#f0ebe3] px-5 py-5 sm:px-6">
        {itinerary.days.map((d, dayIndex) => (
          <div key={d.day}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#f0d078]/40 to-[#c4a05c]/30 text-sm"
                aria-hidden
              >
                {dayIndex === 0 ? '☀️' : dayIndex === itinerary.days.length - 1 ? '🌤️' : '🌿'}
              </span>
              <span className="rounded-full bg-[#8B7355]/15 px-2.5 py-0.5 text-xs font-bold text-[#8B7355]">
                {d.day}
              </span>
              <h5 className="font-playfair text-lg text-[#2c2416]">{d.title}</h5>
            </div>
            {d.highlight ? (
              <p className="mb-2 ml-9 text-xs leading-relaxed text-[#5c4f42]">
                亮點：{d.highlight}
              </p>
            ) : null}
            <p className="mb-3 ml-9 text-[11px] text-[#9a9086]">交通：{d.transport}</p>
            <ol className="ml-2 space-y-3 border-l border-[#e8e0d4] pl-4">
              {d.slots.map((slot) => (
                <li key={`${d.day}-${slot.time}-${slot.place}`} className="text-sm">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[11px] font-semibold text-[#8B7355]">{slot.time}</span>
                    <span className="font-medium text-[#2c2416]">{slot.place}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#6B665F] sm:text-sm">
                    {slot.detail}
                  </p>
                </li>
              ))}
            </ol>
            {dayIndex < itinerary.days.length - 1 ? (
              <div className="mt-4">
                <MoonBadge
                  variant="stay"
                  title="夜宿一間屋 · 睡個好覺"
                  subtitle="沖澡 · 放空 · 好好眠"
                />
              </div>
            ) : null}
          </div>
        ))}
        <p className="rounded-xl bg-[#F8F5F1] px-3 py-2.5 text-xs leading-relaxed text-[#6B665F]">
          {itinerary.note}
        </p>
      </div>

      <div className="space-y-2.5 border-t border-[#f0ebe3] bg-gradient-to-b from-white to-[#faf7f2] px-5 py-4 sm:px-6">
        <MoonBadge variant="home" />
        <Link
          href="/booking"
          className="block rounded-2xl border border-[#e8d5a8]/90 bg-gradient-to-r from-[#fff9ef] via-[#f8f1e4] to-[#f5e8c7]/80 px-3 py-2.5 text-center transition-all hover:border-[#c4a574] hover:shadow-sm"
        >
          <p className="text-[11px] font-semibold text-[#6b5438]">想照這行程走？立即查空房</p>
        </Link>
      </div>
    </article>
  );
}

/** 四大方向區塊標題（與首頁圖卡同系） */
export function CategorySectionHeader({
  emoji,
  title,
  intro,
  tone = 'sand',
}: {
  emoji: string;
  title: string;
  intro: string;
  tone?: 'sand' | 'bike' | 'reef' | 'trail';
}) {
  const glow: Record<string, string> = {
    sand: 'radial-gradient(ellipse 80% 70% at 0% 0%, #fff4d8 0%, transparent 55%)',
    bike: 'radial-gradient(ellipse 80% 70% at 100% 0%, #d8eee8 0%, transparent 55%)',
    reef: 'radial-gradient(ellipse 80% 70% at 0% 100%, #d0eaf4 0%, transparent 55%)',
    trail: 'radial-gradient(ellipse 80% 70% at 100% 100%, #ebe4d4 0%, transparent 55%)',
  };
  const orb: Record<string, string> = {
    sand: 'from-[#fff6e4] to-[#f0d078]/50 ring-[#e8d5a8]/60',
    bike: 'from-[#e8f4f0] to-[#7eb8a8]/35 ring-[#b8d8d0]/70',
    reef: 'from-[#e4f2f8] to-[#5aa8b8]/30 ring-[#a8d0e0]/70',
    trail: 'from-[#f5f0e4] to-[#a89070]/30 ring-[#d4c4a8]/70',
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl border border-[#e8e0d4] bg-white p-5 shadow-sm sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-95"
        style={{ background: glow[tone] }}
        aria-hidden
      />
      <div className="relative flex items-start gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl shadow-sm ring-1 ${orb[tone]}`}
          aria-hidden
        >
          {emoji}
        </span>
        <div className="min-w-0">
          <h2 className="font-playfair text-2xl font-light tracking-tight text-[#2c2416] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6B665F] sm:text-base">
            {intro}
          </p>
        </div>
      </div>
    </div>
  );
}
