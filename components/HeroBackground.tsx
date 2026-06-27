'use client';

import Image from 'next/image';
import { getImageAlt } from '@/lib/imageAlt';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/hero.jpg"
        alt={getImageAlt('/images/hero.jpg')}
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover object-[center_36%] sm:object-[center_40%] md:object-[center_48%] md:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 via-[38%] to-black/70 md:from-black/20 md:via-black/15 md:via-[42%] md:to-black/58" />
    </div>
  );
}