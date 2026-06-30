'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { getImageAlt } from '@/lib/imageAlt';

type RoomImageCarouselProps = {
  images: readonly string[];
  label: string;
  priority?: boolean;
  className?: string;
};

export default function RoomImageCarousel({
  images,
  label,
  priority = false,
  className = '',
}: RoomImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return;
    const slideWidth = (track.children[0] as HTMLElement).offsetWidth;
    if (!slideWidth) return;
    const index = Math.round(track.scrollLeft / slideWidth);
    setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
  }, [images.length]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActiveIndex(index);
  }, []);

  const scrollBySlide = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = Math.min(Math.max(activeIndex + direction, 0), images.length - 1);
      scrollToIndex(nextIndex);
    },
    [activeIndex, images.length, scrollToIndex],
  );

  if (images.length === 0) return null;

  return (
    <div className={`room-media relative aspect-[3/4] bg-[#EDE8E0] ${className}`}>
      <div
        ref={trackRef}
        onScroll={updateActiveIndex}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${label}照片`}
        aria-roledescription="carousel"
      >
        {images.map((src, index) => (
          <div
            key={src}
            className="relative h-full w-full shrink-0 snap-start snap-always"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${images.length}`}
          >
            <Image
              src={src}
              alt={getImageAlt(src)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority && index === 0}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] tracking-wider text-white backdrop-blur-sm">
        {activeIndex + 1} / {images.length}
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => scrollBySlide(-1)}
            disabled={activeIndex === 0}
            className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/55 disabled:pointer-events-none disabled:opacity-0 md:inline-flex"
            aria-label="上一張照片"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBySlide(1)}
            disabled={activeIndex === images.length - 1}
            className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/55 disabled:pointer-events-none disabled:opacity-0 md:inline-flex"
            aria-label="下一張照片"
          >
            →
          </button>

          <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 px-3">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70'
                }`}
                aria-label={`第 ${index + 1} 張照片`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}