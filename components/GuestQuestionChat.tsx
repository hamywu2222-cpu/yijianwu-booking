'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS_LINE } from '@/lib/business';
import {
  findGuestQuestion,
  GUEST_QUESTIONS,
  GUEST_TOPICS,
  guestQuestionsByTopic,
} from '@/lib/guestQuestions';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const PINNED = GUEST_QUESTIONS.filter((item) => item.pinned);

function QaCat() {
  return (
    <svg
      viewBox="0 0 72 78"
      className="h-16 w-[4.5rem]"
      style={{
        filter:
          'drop-shadow(0 0 0.6px rgba(74,55,40,0.95)) drop-shadow(0 0 3px rgba(255,248,240,0.92)) drop-shadow(0 3px 5px rgba(40,28,16,0.2))',
      }}
      aria-hidden
    >
      <defs>
        <linearGradient id="qa-cat-fur" x1="28" y1="12" x2="48" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF9F3" />
          <stop offset="0.55" stopColor="#F4E4D0" />
          <stop offset="1" stopColor="#E4CDB4" />
        </linearGradient>
        <linearGradient id="qa-cat-shade" x1="36" y1="46" x2="36" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E7D3BC" stopOpacity="0" />
          <stop offset="1" stopColor="#C9AA8C" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M50 52c8 1 16-4 16-12 0-4-2-6-4-5-3 2-6 8-12 10" fill="url(#qa-cat-fur)" />
      <ellipse cx="36" cy="58" rx="18" ry="13" fill="url(#qa-cat-fur)" />
      <ellipse cx="36" cy="61" rx="12" ry="8" fill="url(#qa-cat-shade)" />
      <ellipse cx="24" cy="69" rx="6" ry="3.2" fill="#F6E6D4" />
      <ellipse cx="46" cy="69" rx="6" ry="3.2" fill="#F6E6D4" />
      <path d="M20 30 15 12l14 12Z" fill="url(#qa-cat-fur)" />
      <path d="M52 30 57 12 43 24Z" fill="url(#qa-cat-fur)" />
      <circle cx="36" cy="34" r="16" fill="url(#qa-cat-fur)" />
      <ellipse cx="36" cy="27" rx="8" ry="4" fill="#fff" opacity="0.45" />
      <path d="M22 26 18.2 16l8 7Z" fill="#E7A99C" />
      <path d="M50 26 53.8 16l-8 7Z" fill="#E7A99C" />
      <ellipse cx="29" cy="34" rx="1.7" ry="2.2" fill="#3F3A36" />
      <ellipse cx="43" cy="34" rx="1.7" ry="2.2" fill="#3F3A36" />
      <circle cx="29.6" cy="33.2" r="0.55" fill="#fff" />
      <circle cx="43.6" cy="33.2" r="0.55" fill="#fff" />
      <path d="M36 37.2 34.4 39.2h3.2Z" fill="#C98474" />
      <path d="M32.2 40.4q3.8 2.8 7.6 0" fill="none" stroke="#A86B5C" strokeWidth="1.15" strokeLinecap="round" />
      <ellipse cx="24.5" cy="38" rx="2.2" ry="1.2" fill="#E7A99C" opacity="0.8" />
      <ellipse cx="47.5" cy="38" rx="2.2" ry="1.2" fill="#E7A99C" opacity="0.8" />
      <path d="M22 35H15.5M22.3 37.3h-5.2M50 35h6.5M49.7 37.3H55" stroke="#8B7355" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function GuestQuestionChat() {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [panelMax, setPanelMax] = useState(420);
  const [anchorTop, setAnchorTop] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const place = () => {
      const nav = document.querySelector<HTMLElement>('.site-nav');
      const stack = document.querySelector<HTMLElement>('.site-nav-guide-stack');
      const navBottom = nav ? Math.round(nav.getBoundingClientRect().bottom) : 12;
      let top = navBottom + 10;
      if (
        stack &&
        getComputedStyle(stack).display !== 'none' &&
        stack.getAttribute('data-hidden') !== 'true'
      ) {
        const stackBottom = Math.round(stack.getBoundingClientRect().bottom);
        if (stackBottom > navBottom) top = stackBottom + 8;
      }
      setAnchorTop(top);
      const buttonBottom = top + (buttonRef.current?.offsetHeight ?? 52);
      let reserve = 16;
      document.querySelectorAll<HTMLElement>('.fixed.bottom-0, a.booking-sticky-bar').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height < 8) return;
        if (rect.top < window.innerHeight && rect.bottom > window.innerHeight - 6) {
          reserve = Math.max(reserve, window.innerHeight - rect.top + 12);
        }
      });
      setPanelMax(Math.max(180, window.innerHeight - buttonBottom - 8 - reserve));
    };

    place();
    const resizeObserver = new ResizeObserver(place);
    const nav = document.querySelector('.site-nav');
    if (nav) resizeObserver.observe(nav);
    if (buttonRef.current) resizeObserver.observe(buttonRef.current);
    const mutationObserver = new MutationObserver(place);
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, { passive: true });
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place);
    };
  }, []);

  const listRef = useRef<HTMLDivElement>(null);
  const currentQuestion = messages.find((item) => item.role === 'user')?.content ?? '';
  const currentAnswer = messages.find((item) => item.role === 'assistant')?.content ?? '';

  function showPair(question: string, answer: string) {
    setMessages([
      { role: 'user', content: question },
      { role: 'assistant', content: answer },
    ]);
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: 0 });
    });
  }

  function askKnown(question: string) {
    const known = findGuestQuestion(question);
    if (!known) return;
    showPair(known.question, known.answer);
  }

  return (
    <div
      className="pointer-events-none fixed left-[max(0.7rem,env(safe-area-inset-left))] z-40 flex w-[min(22.5rem,calc(100vw-1.4rem))] flex-col items-start top-[calc(var(--site-nav-offset,7.25rem)+8.1rem)] md:top-[calc(var(--site-nav-offset,7.25rem)+0.65rem)]"
      style={anchorTop == null ? undefined : { top: anchorTop }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="pointer-events-auto flex flex-col items-center border-0 bg-transparent p-0"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="QA須知"
      >
        <QaCat />
        <span className="text-[12px] font-semibold leading-none tracking-[0.14em] text-[#3F3A36] [text-shadow:0_0_3px_#fff,0_0_6px_rgba(255,248,240,0.95),0_1px_2px_rgba(0,0,0,0.28)]">
          QA須知
        </span>
      </button>

      {open ? (
        <section
          className="pointer-events-auto mt-2 flex w-full flex-col overflow-hidden rounded-3xl border border-[#E4D9CC] bg-[#FFFCF8] shadow-[0_16px_40px_rgba(63,42,20,0.18)]"
          style={{ maxHeight: panelMax }}
          aria-label="訂房問答"
        >
          <header className="flex items-start justify-between gap-3 border-b border-[#EDE8E0] px-4 py-3">
            <div>
              <p className="text-[10px] tracking-[0.22em] text-[#8B7355]">訂房問答</p>
              <h2 className="text-base font-medium text-[#3F3A36]">依官網資料回答</h2>
              <p className="mt-0.5 text-[11px] leading-snug text-[#8B7355]">
                不查空房、不提供入住密碼。密碼請走 LINE {BUSINESS_LINE.id}
              </p>
            </div>
            <button
              type="button"
              className="rounded-full px-2 py-1 text-sm text-[#8B7355]"
              onClick={() => setOpen(false)}
              aria-label="關閉問答"
            >
              關閉
            </button>
          </header>

          {currentQuestion ? (
            <div className="shrink-0 border-b border-[#EDE8E0] px-4 py-3">
              <p className="text-[13px] font-semibold leading-snug text-[#3F3A36]">{currentQuestion}</p>
              <p className="mt-1.5 max-h-36 overflow-y-auto whitespace-pre-wrap text-[13px] leading-relaxed text-[#3F3A36]">
                {currentAnswer}
              </p>
            </div>
          ) : null}

          <div
            ref={listRef}
            className="space-y-3 overflow-y-auto overscroll-contain px-4 py-3"
            style={{ maxHeight: Math.max(120, panelMax - (currentQuestion ? 200 : 120)) }}
          >
            <div className="flex flex-wrap gap-1.5">
              {PINNED.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`rounded-full border px-2.5 py-1 text-left text-[11px] leading-snug ${
                    currentQuestion === item.question
                      ? 'border-[#8B7355] bg-[#8B7355] text-white'
                      : 'border-[#E4D9CC] bg-white text-[#3F3A36]'
                  }`}
                  onClick={() => askKnown(item.question)}
                >
                  {item.question}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="text-[11px] text-[#8B7355] underline-offset-2 hover:underline"
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll ? '收起全部常見問題' : '看全部常見問題，含官網還沒寫的'}
            </button>

            {showAll
              ? GUEST_TOPICS.map((topic) => (
                  <div key={topic}>
                    <p className="mb-1 text-[10px] tracking-[0.16em] text-[#8B7355]">{topic}</p>
                    <div className="flex flex-col gap-1">
                      {guestQuestionsByTopic(topic).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`rounded-xl px-2.5 py-1.5 text-left text-[12px] ${
                            currentQuestion === item.question
                              ? 'bg-[#8B7355] text-white'
                              : 'bg-[#F8F5F1] text-[#3F3A36]'
                          }`}
                          onClick={() => askKnown(item.question)}
                        >
                          {item.question}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              : null}

          </div>
        </section>
      ) : null}
    </div>
  );
}
