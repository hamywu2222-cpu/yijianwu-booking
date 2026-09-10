import Link from 'next/link';

type FulongGuideCtaProps = {
  /** nav：固定列次要小鈕｜default：一般｜lg：內容區（仍小於訂房主 CTA） */
  variant?: 'nav' | 'default' | 'lg';
  className?: string;
  /** 自訂文案（預設「福隆旅遊攻略」） */
  label?: string;
  /** 是否顯示地圖 emoji（nav 預設關閉，避免搶視覺） */
  showIcon?: boolean;
  /**
   * 連結目標。預設 `/fulong` 完整攻略。
   * 首頁固定列可用 `#fulong-play` 捲動到攻略精華。
   */
  href?: string;
  /** 無障礙標籤 */
  ariaLabel?: string;
};

const SIZE: Record<NonNullable<FulongGuideCtaProps['variant']>, string> = {
  /* 固定列尺寸由 globals.css .site-nav-guide-cta 控制 */
  nav: 'fulong-guide-btn--nav',
  default: 'text-xs px-3.5 py-1.5',
  lg: 'text-xs sm:text-sm px-4 py-2',
};

/**
 * 全站「福隆旅遊攻略」次要 CTA — 海色實底＋白字有反差，尺寸／光暈仍次於金色訂房。
 */
export default function FulongGuideCta({
  variant = 'default',
  className = '',
  label = '福隆旅遊攻略',
  showIcon,
  href = '/fulong',
  ariaLabel,
}: FulongGuideCtaProps) {
  const isHash = href.startsWith('#');
  const icon = showIcon ?? variant !== 'nav';
  const resolvedAria =
    ariaLabel ?? (isHash ? '捲動至福隆旅遊攻略精華' : '查看福隆旅遊攻略');

  return (
    <Link
      href={href}
      className={`fulong-guide-btn ${SIZE[variant]} ${className}`.trim()}
      aria-label={resolvedAria}
    >
      {icon ? (
        <span className="fulong-guide-btn__icon" aria-hidden>
          🗺️
        </span>
      ) : null}
      <span>{label}</span>
    </Link>
  );
}
