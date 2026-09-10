import { BrandTaglineStar } from '@/components/BrandTagline';

export default function NavBrandMark() {
  return (
    <div className="site-nav-brand-meteors">
      <div className="site-nav-brand text-[13px] sm:text-base md:text-lg xl:text-xl font-light tracking-[0.5px] sm:tracking-[1.5px] md:tracking-[2px] whitespace-nowrap">
        <BrandTaglineStar className="site-nav-brand-star site-nav-brand-star--twinkle site-nav-brand-star--twinkle-c" />
        <span>一間屋</span>
        <BrandTaglineStar className="site-nav-brand-star site-nav-brand-star--twinkle site-nav-brand-star--twinkle-b" />
        <span>駅前宿</span>
        <BrandTaglineStar className="site-nav-brand-star site-nav-brand-star--twinkle site-nav-brand-star--twinkle-a" />
      </div>
    </div>
  );
}