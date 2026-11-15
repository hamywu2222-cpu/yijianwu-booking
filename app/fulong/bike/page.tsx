import { redirect } from 'next/navigation';

/** 舊草嶺單車與 20–24 公里環狀線是同一圈，圖文以親自走的版本為準。 */
export default function FulongBikePage() {
  redirect('/fulong/loop-ride');
}
