'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getImageAlt } from '@/lib/imageAlt';

/** 翻新歷程相簿（after 以外部大門／外觀置前） */
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
    '/images/exterior-facade.jpg',
    '/images/package/package-1.jpg',
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

/** 畫面上短標（勿用長 SEO alt，會擋住照片） */
const SHORT_CAPTION: Record<string, string> = {
  '/images/photo_2026-04-25_01-38-33.jpg': '舊客房',
  '/images/photo_2026-04-25_01-38-38.jpg': '舊走道',
  '/images/photo_2026-04-26_16-17-21.jpg': '施工前',
  '/images/photo_2026-05-01_23-59-02.jpg': '拆除中',
  '/images/photo_2026-05-01_23-59-09.jpg': '施工現場',
  '/images/exterior-facade.jpg': '民宿外觀',
  '/images/package/package-1.jpg': '大門入口',
  '/images/double_room.jpg': '和鳴雙人雅房',
  '/images/photo_2026-06-18_02-06-05.jpg': '家庭雅房',
  '/images/facilities.jpg': '交誼／寄物',
  '/images/hallway.jpg': '走廊',
  '/images/hallway2.jpg': '通道',
  '/images/hallway3.jpg': '門牌細節',
  '/images/bathroom.jpg': '衛浴',
  '/images/double_room2.jpg': '雙人雅房',
  '/images/exterior3.jpg': '房門口',
  '/images/exterior4.jpg': '客房一角',
};

const TABS = [
  { key: 'before' as const, label: '翻新前', date: '2026.04' },
  { key: 'during' as const, label: '施工中', date: '2026.05' },
  { key: 'after' as const, label: '翻新後', date: '2026.06 初' },
];

function shortCaption(src: string): string {
  return SHORT_CAPTION[src] ?? '實景';
}

export default function RenovationSection() {
  const [renovationTab, setRenovationTab] = useState<'before' | 'during' | 'after'>('after');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const allImages = RENOVATION_IMAGES[renovationTab];
  const visibleImages = expanded ? allImages : allImages.slice(0, 4);

  return (
    <>
      <section id="renovation" className="bg-white py-16 border-t border-[#EDE8E0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#8B7355]/10 text-[#8B7355] text-xs tracking-[3px] rounded-full mb-3">
              <span>2026.04 → 06 初</span>
              <span className="text-[10px] bg-[#8B7355] text-white px-2 py-0.5 rounded">
                FULL RENOVATION
              </span>
            </div>
            <h3 className="text-5xl font-light tracking-tight mb-3">1樓翻新歷程</h3>
            <p className="text-[#6B665F] max-w-sm mx-auto text-sm">
              2026年6月初裝潢完成，從老舊到溫潤日式。
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-center gap-2 mb-6">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setRenovationTab(tab.key);
                    setExpanded(false);
                  }}
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

            <div className="text-center mb-6 min-h-[2.5rem]">
              {renovationTab === 'before' && (
                <p className="text-sm text-[#6B665F]">翻新前空間</p>
              )}
              {renovationTab === 'during' && (
                <p className="text-sm text-[#6B665F]">施工進行中</p>
              )}
              {renovationTab === 'after' && (
                <p className="text-sm text-[#6B665F]">完工後：外觀大門、客房與公共空間</p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {visibleImages.map((src) => (
                <button
                  key={src}
                  type="button"
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#EDE8E0] cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B7355]"
                  onClick={() => setModalImage(src)}
                >
                  <Image
                    src={src}
                    alt={getImageAlt(src)}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-all duration-500 group-hover:scale-[1.05]"
                  />
                  {/* 僅底部窄條，避免長文蓋住照片 */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent pt-10 pb-2 px-2.5">
                    <div className="flex items-end justify-between gap-1">
                      <span
                        className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded tracking-wider text-white ${
                          renovationTab === 'before'
                            ? 'bg-[#C4A77D]/95'
                            : renovationTab === 'during'
                              ? 'bg-[#8B7355]/95'
                              : 'bg-[#3F3A36]/90'
                        }`}
                      >
                        {renovationTab === 'before'
                          ? 'BEFORE'
                          : renovationTab === 'during'
                            ? 'DURING'
                            : 'AFTER'}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium text-white drop-shadow-sm truncate max-w-[70%] text-right">
                        {shortCaption(src)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {allImages.length > 4 && !expanded ? (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="inline-flex rounded-full border border-[#D1C9BE] bg-white px-4 py-2 text-xs font-medium text-[#3F3A36] hover:border-[#8B7355]"
                >
                  顯示其餘 {allImages.length - 4} 張
                </button>
              </div>
            ) : null}
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
            <p className="mt-2 text-center text-sm text-white/85">{shortCaption(modalImage)}</p>
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
