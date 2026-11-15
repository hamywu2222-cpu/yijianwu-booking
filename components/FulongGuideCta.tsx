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
   * 首頁固定列指向親自拍的舊草嶺圖文 `/fulong/loop-ride`。
   */
  href?: string;
  /** 無障礙標籤 */
  ariaLabel?: string;
  /** 首頁固定列：小圖框標記，取代地圖 emoji */
  mark?: boolean;
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
  mark = false,
}: FulongGuideCtaProps) {
  const isHash = href.startsWith('#');
  const icon = !mark && (showIcon ?? variant !== 'nav');
  const resolvedAria =
    ariaLabel ?? (isHash ? '捲動至福隆旅遊攻略精華' : '查看福隆旅遊攻略');

  return (
    <Link
      href={href}
      className={`fulong-guide-btn ${SIZE[variant]} ${className}`.trim()}
      aria-label={resolvedAria}
    >
      {mark ? (
        <span className="fulong-guide-btn__mark" aria-hidden>
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none">
            <rect x="1.35" y="2.35" width="13.3" height="11.3" rx="1.7" stroke="currentColor" strokeWidth="1.15" />
            <path d="M1.7 10.35 5.05 7.35l2.25 1.9 2.35-2.45 4.6 4.05" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            <circle cx="11.15" cy="5.45" r="0.95" fill="currentColor" />
          </svg>
        </span>
      ) : null}
      {icon ? (
        <span className="fulong-guide-btn__icon" aria-hidden>
          🗺️
        </span>
      ) : null}
      <span>{label}</span>
    </Link>
  );
}
