'use client';

import { useState } from 'react';
import { getImageAlt } from '@/lib/imageAlt';
import type { SceneryItem } from '@/lib/media';

type SceneryGalleryProps = {
  items: SceneryItem[];
};

function spanClass(span?: SceneryItem['span']) {
  switch (span) {
    case 'hero':
      return 'md:col-span-2 md:row-span-2';
    case 'wide':
      return 'md:col-span-2';
    case 'tall':
      return 'md:row-span-2';
    default:
      return '';
  }
}

export default function SceneryGallery({ items }: SceneryGalleryProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setModalImage(item.src)}
            className={`group relative overflow-hidden rounded-2xl bg-[#EDE8E0] text-left ${spanClass(item.span)}`}
          >
            <img
              src={item.src}
              alt={getImageAlt(item.src)}
              loading="lazy"
              decoding="async"
              className="gallery-img h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="text-sm font-light tracking-tight">{item.title}</div>
              <div className="mt-1 text-[11px] text-white/80">{item.caption}</div>
            </div>
            <div className="absolute top-3 right-3 text-[10px] tracking-widest text-white/70 opacity-0 transition group-hover:opacity-100">
              點擊放大
            </div>
          </button>
        ))}
      </div>

      {modalImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={modalImage}
              alt={getImageAlt(modalImage)}
              className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl text-white hover:bg-black/80"
              aria-label="關閉"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}