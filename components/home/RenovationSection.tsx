'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getImageAlt } from '@/lib/imageAlt';

const RENOVATION_IMAGES = {
  before: [
    '/images/photo_2026-04-25_01-38-33.jpg',
    '/images/photo_2026-04-25_01-38-38.jpg',
    '/images/photo_2026-04-26_16-17-21.jpg',
  ],
  during: [
    '/images/photo_2026-05-01_23-59-02.jpg',
    '/images/photo_2026-05-01_23-59-09.jpg',
  ],
  after: [
    '/images/double_room.jpg',
    '/images/photo_2026-06-18_02-06-05.jpg',
    '/images/facilities.jpg',
    '/images/hallway.jpg',
    '/images/hallway2.jpg',
    '/images/hallway3.jpg',
    '/images/bathroom.jpg',
    '/images/double_room2.jpg',
    '/images/exterior3.jpg',
    '/images/exterior4.jpg',
  ],
} as const;

const TABS = [
  { key: 'before' as const, label: '翻新前', date: '2026.04' },
  { key: 'during' as const, label: '施工中', date: '2026.05.01' },
  { key: 'after' as const, label: '翻新後', date: '2026.05+' },
];

export default function RenovationSection() {
  const [renovationTab, setRenovationTab] = useState<'before' | 'during' | 'after'>('after');
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <>
      <section id="renovation" className="bg-white py-16 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#8B7355]/10 text-[#8B7355] text-xs tracking-[3px] rounded-full mb-3">
              <span>2026.04 → 05</span>
              <span className="text-[10px] bg-[#8B7355] text-white px-2 py-0.5 rounded">FULL RENOVATION</span>
            </div>
            <h3 className="text-5xl font-light tracking-tight mb-3">1樓翻新歷程</h3>
            <p className="text-[#6B665F] max-w-sm mx-auto text-sm">
              2026年5月全新翻新，從老舊到溫潤日式。
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setRenovationTab(tab.key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    renovationTab === tab.key
                      ? 'bg-[#3F3A36] text-white shadow'
                      : 'bg-[#F8F5F1] text-[#6B665F] hover:bg-[#EDE8E0]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] opacity-70">{tab.date}</span>
                </button>
              ))}
            </div>

            <div className="text-center mb-6 min-h-[60px]">
              {renovationTab === 'before' && (
                <p className="text-[#6B665F] italic">這是翻新前的模樣，空間需要一次徹底的改變。</p>
              )}
              {renovationTab === 'during' && (
                <p className="text-[#6B665F] italic">施工進行中，我們一步步拆除舊的，打造新的。</p>
              )}
              {renovationTab === 'after' && (
                <p className="text-[#6B665F] italic">完成後的驚喜：溫暖、光線、細節，全部到位。</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {RENOVATION_IMAGES[renovationTab].map((src) => (
                <button
                  key={src}
                  type="button"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#EDE8E0] cursor-pointer text-left"
                  onClick={() => setModalImage(src)}
                >
                  <Image
                    src={src}
                    alt={getImageAlt(src)}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-[1.08] group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div
                      className={`inline-block text-[10px] px-2 py-0.5 rounded mb-1.5 tracking-wider ${
                        renovationTab === 'before'
                          ? 'bg-[#C4A77D]'
                          : renovationTab === 'during'
                            ? 'bg-[#8B7355]'
                            : 'bg-[#3F3A36]'
                      }`}
                    >
                      {renovationTab === 'before'
                        ? 'BEFORE'
                        : renovationTab === 'during'
                          ? 'DURING'
                          : 'AFTER'}
                    </div>
                    <div className="text-base font-light tracking-tight leading-tight">
                      {getImageAlt(src)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[#6B665F] max-w-md mx-auto">親手打造的溫暖空間。</p>
            <div className="mt-4">
              <a
                href="#booking"
                className="inline-block px-6 py-2 text-sm border border-[#3F3A36] rounded-full hover:bg-[#3F3A36] hover:text-white transition-colors"
              >
                體驗全新1樓
              </a>
            </div>
          </div>
        </div>
      </section>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="圖片預覽"
        >
          <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={modalImage}
              alt={getImageAlt(modalImage)}
              width={1920}
              height={1280}
              className="max-h-[90vh] max-w-full h-auto w-auto object-contain rounded-lg shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setModalImage(null)}
              aria-label="關閉圖片預覽"
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
