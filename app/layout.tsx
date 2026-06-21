import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SITE_OG_IMAGE, SITE_OG_IMAGE_ALT } from "@/lib/business";
import { getStructuredDataJsonLd, SITE_DESCRIPTION, SITE_NAME } from "@/lib/structuredData";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const PAGE_TITLE = "福隆車站步行30秒 | 一間屋 · 駅前宿・日式民宿";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: PAGE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "福隆民宿",
    "福隆車站民宿",
    "福隆青年旅館",
    "福隆背包客棧",
    "新北貢寮住宿",
    "草嶺古道住宿",
    "福隆包棟民宿",
    "貢寮民宿",
    "福隆住宿",
    "日式民宿",
    "一間屋",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/",
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getStructuredDataJsonLd()),
          }}
        />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
