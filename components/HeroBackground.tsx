'use client';

import Image from 'next/image';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/hero.jpg"
        alt="一間屋・駅前宿｜福隆背包客棧與青年旅館 Logo 背景"
        fill
        priority
        sizes="100vw"
        quality={80}
        className="object-cover object-[center_62%] md:object-[center_58%] scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 via-40% to-black/65 md:from-black/20 md:via-black/25 md:to-black/55" />
    </div>
  );
}