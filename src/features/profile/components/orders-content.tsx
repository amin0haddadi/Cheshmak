'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-message';
import { useOrders } from '@/hooks/queries/orders';
import { usePayOrder } from '@/hooks/mutations/orders';
import type { ApiOrder } from '@/lib/api/orders';

const statusLabels: Record<string, string> = {
  pending: 'در انتظار پرداخت',
  unpaid: 'پرداخت‌نشده',
  paid: 'پرداخت‌شده',
  processing: 'در حال پردازش',
  shipped: 'ارسال‌شده',
  delivered: 'تحویل‌شده',
  cancelled: 'لغو‌شده',
  failed: 'ناموفق',
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  unpaid: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  failed: 'bg-red-100 text-red-800',
};

function canRetryPayment(order: ApiOrder): boolean {
  const status = (order.payment_status || order.status || '').toLowerCase();
  return (
    status.includes('pending') ||
    status.includes('unpaid') ||
    status.includes('failed') ||
    status === 'awaiting_payment'
  );
}

function formatOrderDate(value?: string) {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function OrdersContent() {
  const { data: session, status } = useSession();
  const { data, isLoading, error, refetch } = useOrders();
  const { mutate: payOrder, isPending, variables } = usePayOrder();

  if (status === 'loading' || isLoading) {
    return <Loading message="در حال بارگذاری سفارش‌ها..." withContainer />;
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-custom">
          <p className="text-center text-muted-foreground">
            لطفاً ابتدا{' '}
            <Link
              href="/login"
              className="text-primary transition-colors hover:underline"
            >
              وارد حساب کاربری خود
            </Link>{' '}
            شوید.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="خطا در بارگذاری سفارش‌ها. لطفاً دوباره تلاش کنید."
        onRetry={() => refetch()}
        withContainer
      />
    );
  }

  const orders = data?.data ?? [];

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">سفارش‌های من</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              اگر پرداخت کامل نشده، از اینجا دوباره به درگاه بروید.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="mb-4 text-muted-foreground">هنوز سفارشی ندارید.</p>
              <Button asChild>
                <Link href="/shop">شروع خرید</Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {orders.map((order) => {
                const statusKey = (
                  order.payment_status ||
                  order.status ||
                  ''
                ).toLowerCase();
                const label =
                  statusLabels[statusKey] ||
                  order.payment_status ||
                  order.status ||
                  'نامشخص';
                const color =
                  statusColors[statusKey] || 'bg-muted text-muted-foreground';
                const total = Number(order.total ?? 0);
                const itemsCount =
                  order.items_count ?? order.items?.length ?? 0;
                const paying =
                  isPending && variables === order.id;

                return (
                  <div
                    key={order.id}
                    className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-medium">سفارش #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatOrderDate(order.created_at)}
                        {itemsCount ? ` • ${itemsCount} مورد` : ''}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-medium',
                          color,
                        )}
                      >
                        {label}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(Number.isFinite(total) ? total : 0)}
                      </span>
                      {canRetryPayment(order) && (
                        <Button
                          size="sm"
                          disabled={paying}
                          onClick={() => payOrder(order.id)}
                        >
                          {paying ? 'در حال انتقال...' : 'پرداخت'}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
