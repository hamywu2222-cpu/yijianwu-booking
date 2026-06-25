type CabinIconProps = {
  variant?: 'nav' | 'default';
  className?: string;
};

/** 一間屋品牌圖示：🌙 emoji 彎月 */
export default function CabinIcon({ variant = 'default', className }: CabinIconProps) {
  const sizeClass =
    variant === 'nav'
      ? 'text-[1.4rem] sm:text-[1.55rem] md:text-[1.7rem]'
      : className ?? 'text-base';

  return (
    <span
      className={`brand-moon-emoji inline-flex shrink-0 items-center justify-center leading-none select-none ${sizeClass}`}
      aria-hidden
    >
      🌙
    </span>
  );
}