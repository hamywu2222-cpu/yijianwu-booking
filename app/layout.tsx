import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "一間屋 · 駅前宿 | 福隆日式民宿",
  description:
    "福隆車站旁 30 秒即抵！一間屋·駅前宿提供日式雅房與家庭房，2026年全新裝潢，環境乾淨舒適。適合單車族、家庭或情侶入住，歡迎線上預訂。",
  keywords: ["福隆民宿", "福隆車站民宿", "貢寮民宿", "福隆住宿", "日式民宿", "福隆海邊民宿", "一間屋"],
  authors: [{ name: "一間屋 · 駅前宿" }],
  openGraph: {
    title: "一間屋 · 駅前宿 | 福隆日式民宿",
    description:
      "福隆車站旁 30 秒即抵！一間屋·駅前宿提供日式雅房與家庭房，2026年全新裝潢，環境乾淨舒適。適合單車族、家庭或情侶入住，歡迎線上預訂。",
    images: [{ url: "/images/hero.jpg" }],
  },
  verification: {
    google: 'IRMtM18ZuIvRPD1up4V9a6S_bbyeaZAvd46S1I8VtHQ',
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
