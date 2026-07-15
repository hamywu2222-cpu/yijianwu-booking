import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";

export const metadata: Metadata = {
  title: "前往訂房",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GoOwlnestLayout({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
