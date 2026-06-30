'use client';

import { useEffect, useRef, useState } from 'react';
import type { GoogleReviewsPayload } from '@/lib/googleReviews';

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const starClass = size === 'sm' ? 'text-sm' : 'text-lg';
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const roundUp = rating - fullStars >= 0.75;

  return (
    <span className={`inline-flex items-center gap-0.5 text-[#C4A77D] ${starClass}`} aria-hidden>
      {Array.from({ length: fullStars + (roundUp ? 1 : 0) }).map((_, index) => (
        <span key={`full-${index}`}>★</span>
      ))}
      {hasHalf && <span className="opacity-70">★</span>}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={`empty-${index}`} className="opacity-30">
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReviewsPayload['reviews'][number] }) {
  const initial = review.authorName.trim().charAt(0) || 'G';

  return (
    <article className="google-review-card shrink-0 snap-start">
      <div className="flex h-full flex-col rounded-3xl border border-[#EDE8E0] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          {review.profilePhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.profilePhotoUrl}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F5F1] text-sm font-medium text-[#8B7355]">
              {initial}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#3F3A36]">{review.authorName}</p>
            {review.relativeTime ? (
              <p className="text-xs text-[#8B7355]">{review.relativeTime}</p>
            ) : null}
          </div>
        </div>

        <div className="mb-3">
          <StarRating rating={review.rating} size="sm" />
        </div>

        <p className="flex-1 text-sm leading-relaxed text-[#6B665F] line-clamp-6">{review.text}</p>
      </div>
    </article>
  );
}

export default function GoogleReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GoogleReviewsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to load reviews');
        const payload = (await response.json()) as GoogleReviewsPayload;
        if (!cancelled) {
          setData(payload);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollByCards = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('.google-review-card');
    const gap = 16;
    const distance = (card?.offsetWidth ?? 300) + gap;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-48 animate-pulse rounded-3xl bg-[#EDE8E0]/70" aria-hidden />
        <p className="sr-only">載入 Google 評價中</p>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const ratingLabel = data.rating > 0 ? data.rating.toFixed(1) : '—';
  const countLabel =
    data.userRatingCount > 0 ? `${data.userRatingCount} 則 Google 評價` : 'Google 評價';

  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="mb-8 text-center">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-3">
          <StarRating rating={data.rating || 5} />
          <span className="text-2xl font-light text-[#3F3A36]">{ratingLabel}</span>
          <span className="text-sm text-[#8B7355]">{countLabel}</span>
        </div>
        <p className="mx-auto max-w-lg text-sm text-[#6B665F]">
          真實旅客在 Google 留下的評價，更多評價請點下方按鈕查看。
        </p>
        {data.source === 'demo' ? (
          <p className="mt-2 text-xs text-[#8B7355]">
            預覽模式：請在 `.env.local` 設定 `GOOGLE_PLACES_API_KEY` 後即可顯示真實評價。
          </p>
        ) : null}
      </div>

      {data.reviews.length > 0 ? (
        <div className="relative">
          <div
            ref={trackRef}
            className="google-reviews-track flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
            aria-label="Google 旅客評價"
          >
            {data.reviews.map((review, index) => (
              <ReviewCard key={`${review.authorName}-${index}`} review={review} />
            ))}
          </div>

          {data.reviews.length > 1 ? (
            <div className="mt-4 hidden justify-end gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE8E0] bg-white text-[#3F3A36] transition-colors hover:border-[#8B7355] hover:text-[#8B7355]"
                aria-label="上一則評價"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE8E0] bg-white text-[#3F3A36] transition-colors hover:border-[#8B7355] hover:text-[#8B7355]"
                aria-label="下一則評價"
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={data.reviewsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[#3F3A36] px-6 py-2.5 text-sm font-medium text-[#3F3A36] transition-colors hover:bg-[#3F3A36] hover:text-white"
        >
          查看全部 Google 評價
        </a>
        <a
          href={data.writeReviewUri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3F3A36] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2C2926]"
        >
          <span aria-hidden>✍️</span>
          到 Google 寫評論
        </a>
      </div>
    </div>
  );
}