import { PACKAGE_PEOPLE_NOTICE } from '@/lib/business';

/** 全館包房人數與價格提醒。card 給包房區塊，compact 給訂房表單窄欄。 */
export function PackagePeopleNotice({
  variant = 'card',
  className = '',
}: {
  variant?: 'card' | 'compact';
  className?: string;
}) {
  if (variant === 'compact') {
    return (
      <p className={`text-xs leading-relaxed text-[#6B665F] ${className}`} role="note">
        {PACKAGE_PEOPLE_NOTICE.short}
      </p>
    );
  }

  return (
    <div
      role="note"
      className={`mx-auto max-w-xl rounded-2xl border border-[#E4D3B5] bg-[#FBF6EE] px-4 py-3.5 text-left sm:px-5 ${className}`}
    >
      <p className="text-[11px] font-medium tracking-[0.16em] text-[#8B7355]">
        {PACKAGE_PEOPLE_NOTICE.title}
      </p>
      <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-[#3F3A36]">
        {PACKAGE_PEOPLE_NOTICE.lines.map((line, index) => {
          const isAskFirst = index === PACKAGE_PEOPLE_NOTICE.lines.length - 1;
          return (
            <li key={line} className={isAskFirst ? 'font-medium text-[#7A4E24]' : undefined}>
              {line}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
