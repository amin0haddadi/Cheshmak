import type { Metadata } from 'next';
import { Suspense } from 'react';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import { PageHeader } from '@/components/ui/page-header';
import { PaymentResultContent } from '@/features/payment/components/payment-result-content';
import { Loading } from '@/components/ui/loading';

export const metadata: Metadata = generatePageMetadata({
  title: 'پرداخت ناموفق',
  description: 'نتیجه پرداخت ناموفق سفارش در فروشگاه چشمک.',
  url: '/payment/failed',
});

export default function PaymentFailedPage() {
  return (
    <>
      <PageHeader
        title="پرداخت ناموفق"
        breadcrumbs={[
          { label: 'خانه', href: '/' },
          { label: 'پرداخت ناموفق' },
        ]}
      />
      <Suspense fallback={<Loading message="در حال بارگذاری..." withContainer />}>
        <PaymentResultContent variant="failed" />
      </Suspense>
    </>
  );
}
