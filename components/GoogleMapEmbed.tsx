import { BUSINESS_ADDRESS, BUSINESS_NAME, BUSINESS_URLS } from '@/lib/business';

export default function GoogleMapEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#EDE8E0] bg-[#F8F5F1] shadow-sm">
      <iframe
        title={`${BUSINESS_NAME} Google 地圖`}
        src={BUSINESS_URLS.googleMapsEmbed}
        className="h-[280px] w-full border-0 sm:h-[320px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="flex flex-col gap-2 border-t border-[#EDE8E0] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-left text-xs text-[#6B665F]">{BUSINESS_ADDRESS.full}</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={BUSINESS_URLS.googleMapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#3F3A36] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#2C2926]"
          >
            Google 導航
          </a>
          <a
            href={BUSINESS_URLS.googleMapsPlace}
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