"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackOpenOwlnest, waitForGtag } from "@/lib/analytics";
import { buildOwlNestBookingUrl, isValidOwlNestDate } from "@/lib/owlnest";

/**
 * 中轉頁：到達此頁 = 記 1 次 open_owlnest，再導向奧丁丁訂房頁。
 * 對方網域 (booking-owlnest.com) 無法代裝追蹤碼，故以本頁代表「進入訂房引擎」。
 */
export default function GoOwlnestPage() {
  const searchParams = useSearchParams();
  const sentRef = useRef(false);

  const destination = useMemo(() => {
    const start = searchParams.get("start") ?? undefined;
    const end = searchParams.get("end") ?? undefined;
    const adultRaw = searchParams.get("adult");
    const childRaw = searchParams.get("child");
    const infantRaw = searchParams.get("infant");

    const adults = adultRaw != null && adultRaw !== "" ? Number(adultRaw) : undefined;
    const children = childRaw != null && childRaw !== "" ? Number(childRaw) : undefined;
    const infants = infantRaw != null && infantRaw !== "" ? Number(infantRaw) : undefined;

    return buildOwlNestBookingUrl({
      checkIn: start && isValidOwlNestDate(start) ? start : undefined,
      checkOut: end && isValidOwlNestDate(end) ? end : undefined,
      adults: Number.isFinite(adults) ? adults : undefined,
      children: Number.isFinite(children) ? children : undefined,
      infants: Number.isFinite(infants) ? infants : undefined,
    });
  }, [searchParams]);

  const location = searchParams.get("from") || "go_owlnest";
  const checkIn = searchParams.get("start") || undefined;
  const checkOut = searchParams.get("end") || undefined;
  const adultsParam = searchParams.get("adult");
  const adults =
    adultsParam != null && adultsParam !== "" && Number.isFinite(Number(adultsParam))
      ? Number(adultsParam)
      : undefined;

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;

    const go = () => {
      window.location.replace(destination);
    };

    let cancelled = false;

    void (async () => {
      await waitForGtag(3000);
      if (cancelled) return;

      trackOpenOwlnest({
        location,
        destination,
        checkIn: checkIn && isValidOwlNestDate(checkIn) ? checkIn : undefined,
        checkOut: checkOut && isValidOwlNestDate(checkOut) ? checkOut : undefined,
        adults,
        onReady: go,
        timeoutMs: 900,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [adults, checkIn, checkOut, destination, location]);

  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 text-center bg-[#F8F5F1]">
      <p className="text-sm tracking-widest text-[#8B7355] mb-3">一間屋・駅前宿</p>
      <h1 className="text-lg font-medium text-[#3F3A36] mb-2">正在前往訂房頁…</h1>
      <p className="text-sm text-[#6B665F] max-w-sm leading-relaxed">
        若沒有自動跳轉，請點下方連結完成訂房。
      </p>
      <a
        href={destination}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#3F3A36] text-white px-6 py-3 text-sm tracking-wide hover:opacity-90"
      >
        前往奧丁丁訂房 →
      </a>
    </main>
  );
}
