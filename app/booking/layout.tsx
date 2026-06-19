import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '訂房詢問 | 一間屋 · 駅前宿',
  description:
    '填寫訂房詢問表單，加入 LINE 官方 @811mszbh 並回傳訂單後 4 碼即可完成確認。福隆車站步行 30 秒。',
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}