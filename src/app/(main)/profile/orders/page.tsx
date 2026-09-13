import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import { PageHeader } from '@/components/ui/page-header';
import { OrdersContent } from '@/features/profile/components/orders-content';

export const metadata: Metadata = generatePageMetadata({
  title: 'سفارش‌ها',
  description: 'مشاهده و پرداخت مجدد سفارش‌های فروشگاه چشمک.',
  url: '/profile/orders',
  keywords: ['سفارش', 'پرداخت', 'پروفایل'],
});

export default function ProfileOrdersPage() {
  return (
    <>
      <PageHeader
        title="سفارش‌ها"
        breadcrumbs={[
          { label: 'خانه', href: '/' },
          { label: 'حساب کاربری', href: '/profile' },
          { label: 'سفارش‌ها' },
        ]}
      />
      <OrdersContent />
    </>
  );
}
