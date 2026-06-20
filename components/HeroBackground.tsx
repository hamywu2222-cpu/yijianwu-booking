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
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/55" />
    </div>
  );
}