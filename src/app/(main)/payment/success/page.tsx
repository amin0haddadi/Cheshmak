import type { Metadata } from 'next';
import { Suspense } from 'react';
import { generatePageMetadata } from '@/lib/metadata-helpers';
import { PageHeader } from '@/components/ui/page-header';
import { PaymentResultContent } from '@/features/payment/components/payment-result-content';
import { Loading } from '@/components/ui/loading';

export const metadata: Metadata = generatePageMetadata({
  title: 'پرداخت موفق',
  description: 'نتیجه پرداخت موفق سفارش در فروشگاه چشمک.',
  url: '/payment/success',
});

export default function PaymentSuccessPage() {
  return (
    <>
      <PageHeader
        title="پرداخت موفق"
        breadcrumbs={[
          { label: 'خانه', href: '/' },
          { label: 'پرداخت موفق' },
        ]}
      />
      <Suspense fallback={<Loading message="در حال بارگذاری..." withContainer />}>
        <PaymentResultContent variant="success" />
      </Suspense>
    </>
  );
}
