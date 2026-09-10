'use client';

import { useState } from 'react';
import { BUSINESS_ADDRESS, BUSINESS_NAME, BUSINESS_URLS } from '@/lib/business';

export default function GoogleMapEmbed() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#EDE8E0] bg-[#F8F5F1] shadow-sm">
      {showMap ? (
        <iframe
          title={`${BUSINESS_NAME} Google 地圖`}
          src={BUSINESS_URLS.googleMapsEmbed}
          className="h-[280px] w-full border-0 sm:h-[320px]"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowMap(true)}
          className="flex h-[280px] w-full flex-col items-center justify-center gap-2 bg-[#E8DFD2] px-4 text-center sm:h-[320px]"
          aria-label="點擊載入 Google 地圖"
        >
          <span className="text-3xl" aria-hidden>
            📍
          </span>
          <span className="text-sm font-medium text-[#3F3A36]">點一下載入地圖</span>
          <span className="max-w-xs text-xs leading-relaxed text-[#6B665F]">
            先不載入 Google 地圖，手機比較快。需要導航再點。
          </span>
        </button>
      )}
      <div className="flex flex-col gap-2 border-t border-[#EDE8E0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={BUSINESS_URLS.googleMapsPlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-left text-xs text-[#6B665F] hover:text-[#3F3A36] hover:underline"
        >
          {BUSINESS_ADDRESS.full}
        </a>
        <div className="flex flex-wrap gap-2">
          <a
            href={BUSINESS_URLS.googleMapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#3F3A36] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#2C2926]"
          >
            Google 商家導航
          </a>
          <a
            href={BUSINESS_URLS.googleMapsBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#3F3A36] px-4 py-2 text-xs font-medium text-[#3F3A36] transition-colors hover:bg-[#3F3A36] hover:text-white"
          >
            Google 地圖查看
          </a>
        </div>
      </div>
    </div>
  );
}
