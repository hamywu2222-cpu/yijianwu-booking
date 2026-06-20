import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { getLodgingBusinessJsonLd, SITE_DESCRIPTION, SITE_NAME } from "@/lib/structuredData";
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

const PAGE_TITLE = "一間屋 · 駅前宿 | 福隆日式民宿";
const OG_IMAGE = "/images/scenery/fulong-station.jpg";
const OG_IMAGE_ALT = "福隆車站前一間屋・駅前宿日式民宿";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: PAGE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ["福隆民宿", "福隆車站民宿", "貢寮民宿", "福隆住宿", "日式民宿", "福隆海邊民宿", "一間屋"],
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
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
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
            __html: JSON.stringify(getLodgingBusinessJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
