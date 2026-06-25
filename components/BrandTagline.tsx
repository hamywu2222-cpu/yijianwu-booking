import type { CSSProperties } from 'react';

export function BrandTaglineStar({
  className = 'site-nav-tagline-star',
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={className} style={style} aria-hidden>
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 0.8L5.9 3.6L8.7 4.5L5.9 5.4L5 8.2L4.1 5.4L1.3 4.5L4.1 3.6L5 0.8Z"
          fill="currentColor"
        />
        <path
          d="M5 3.2V5.8M3.2 4.5H6.8"
          stroke="currentColor"
          strokeWidth="0.45"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </span>
  );
}

type BrandTaglineProps = {
  variant?: 'nav' | 'footer';
};

export default function BrandTagline({ variant = 'nav' }: BrandTaglineProps) {
  return (
    <p className={variant === 'footer' ? 'site-footer-tagline-text' : 'site-nav-tagline-text'}>
      <BrandTaglineStar />
      <span>駅前</span>
      <BrandTaglineStar />
      <span>留宿</span>
      <BrandTaglineStar />
    </p>
  );
}