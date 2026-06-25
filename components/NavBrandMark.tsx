import { BrandTaglineStar } from '@/components/BrandTagline';

export default function NavBrandMark() {
  return (
    <div className="site-nav-brand-meteors">
      <div className="site-nav-brand text-sm sm:text-lg md:text-xl font-light tracking-[1px] sm:tracking-[2px] md:tracking-[3px] shrink-0 whitespace-nowrap">
        <BrandTaglineStar className="site-nav-brand-star site-nav-brand-star--twinkle site-nav-brand-star--twinkle-c" />
        <span>一間屋</span>
        <BrandTaglineStar className="site-nav-brand-star site-nav-brand-star--twinkle site-nav-brand-star--twinkle-b" />
        <span>駅前宿</span>
        <BrandTaglineStar className="site-nav-brand-star site-nav-brand-star--twinkle site-nav-brand-star--twinkle-a" />
      </div>
    </div>
  );
}