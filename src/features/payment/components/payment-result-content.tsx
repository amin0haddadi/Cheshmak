'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentResultContentProps {
  variant: 'success' | 'failed';
}

export function PaymentResultContent({ variant }: PaymentResultContentProps) {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('order_id');
  const referenceId = searchParams.get('reference_id');
  const paymentId = searchParams.get('payment_id');
  const message = searchParams.get('message');

  const isSuccess = variant === 'success';

  return (
    <div className="py-16 lg:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-lg rounded-xl border bg-card p-8 text-center">
          <div className="mb-6 flex justify-center">
            {isSuccess ? (
              <CheckCircle2 className="size-16 text-green-500" />
            ) : (
              <XCircle className="size-16 text-destructive" />
            )}
          </div>

          <h1 className="mb-3 text-2xl font-bold">
            {isSuccess ? 'پرداخت موفق' : 'پرداخت ناموفق'}
          </h1>

          <p className="mb-6 text-muted-foreground">
            {message
              ? decodeURIComponent(message.replace(/\+/g, ' '))
              : isSuccess
                ? 'پرداخت شما با موفقیت تأیید شد.'
                : 'پرداخت انجام نشد. می‌توانید از لیست سفارش‌ها دوباره تلاش کنید.'}
          </p>

          <div className="mb-8 space-y-2 rounded-lg bg-muted/40 p-4 text-sm">
            {orderId && (
              <p>
                <span className="text-muted-foreground">شماره سفارش: </span>
                <span className="font-medium">{orderId}</span>
              </p>
            )}
            {referenceId && (
              <p>
                <span className="text-muted-foreground">کد پیگیری: </span>
                <span className="font-medium">{referenceId}</span>
              </p>
            )}
            {paymentId && (
              <p>
                <span className="text-muted-foreground">شناسه پرداخت: </span>
                <span className="font-medium">{paymentId}</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {isSuccess ? (
              <>
                <Button asChild>
                  <Link href="/profile/orders">مشاهده سفارش‌ها</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/shop">ادامه خرید</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild>
                  <Link href="/profile/orders">تلاش مجدد از سفارش‌ها</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/cart">بازگشت به سبد</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
