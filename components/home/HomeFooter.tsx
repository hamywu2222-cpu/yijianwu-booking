import BrandTagline from '@/components/BrandTagline';
import {
  BUSINESS_ADDRESS,
  BUSINESS_LINE,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_REGISTRATION,
  BUSINESS_URLS,
} from '@/lib/business';

const SEO_LINKS = [
  { href: '/fulong', label: '福隆怎麼玩' },
  { href: '/faq', label: '常見問題' },
  { href: '/renovation', label: '2026 裝潢' },
  { href: '/rooms/double', label: '和鳴雙人房' },
  { href: '/rooms/family', label: '家庭房' },
  { href: '/rooms/package', label: '包棟方案' },
  { href: '/booking', label: '線上訂房' },
] as const;

export default function HomeFooter() {
  return (
    <footer className="border-t border-[#EDE8E0] py-4 text-sm text-[#8B7355] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center mb-3">
          <BrandTagline variant="footer" />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-y-4 text-center md:text-left">
          <div>
            <div className="font-medium text-[#3F3A36]">{BUSINESS_NAME}</div>
            <a
              href={BUSINESS_URLS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block hover:underline hover:text-[#3F3A36] transition-colors"
            >
              {BUSINESS_ADDRESS.full}
            </a>
            <div className="text-xs">出站右轉直走 30 秒即達 · {BUSINESS_REGISTRATION}</div>
          </div>
          <div className="space-y-1">
            <a
              href={BUSINESS_LINE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-[#00C300] hover:underline"
            >
              LINE 官方 {BUSINESS_LINE.id}（入住門禁密碼）
            </a>
            <a href={BUSINESS_PHONE.mobileHref} className="block font-medium hover:text-[#3F3A36]">
              急事專線 {BUSINESS_PHONE.mobile}
            </a>
            <a
              href={BUSINESS_URLS.googleMapsPlace}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#3F3A36]"
            >
              Google 地圖查看
            </a>
            <nav
              className="flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1 pt-2 text-xs"
              aria-label="延伸閱讀"
            >
              {SEO_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#3F3A36] hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="text-xs text-[#8B7355]/70 md:text-right">
            © {new Date().getFullYear()} {BUSINESS_NAME}
          </div>
        </div>
      </div>
    </footer>
  );
}
