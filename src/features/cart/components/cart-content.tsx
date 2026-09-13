'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/queries/cart';
import {
  useRemoveCartItem,
  useApplyCartVoucher,
  useRemoveCartVoucher,
} from '@/hooks/mutations/cart';
import { Loading } from '@/components/ui/loading';
import { ErrorMessage } from '@/components/ui/error-message';
import { CartLineItem } from './cart-line-item';

export function CartContent() {
  const { status } = useSession();
  const { data: items = [], isLoading, error, refetch } = useCart();

  const { mutate: removeApiItem, isPending: removing } = useRemoveCartItem();
  const { mutate: applyVoucher, isPending: applyingVoucher } =
    useApplyCartVoucher();
  const { mutate: removeVoucher, isPending: removingVoucher } =
    useRemoveCartVoucher();

  const [voucherCode, setVoucherCode] = useState('');
  const [clearing, setClearing] = useState(false);
  const isAuthenticated = status === 'authenticated';

  if (status === 'loading' || isLoading) {
    return <Loading message="در حال بارگذاری سبد خرید..." withContainer />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="خطا در بارگذاری سبد خرید. لطفاً دوباره تلاش کنید."
        onRetry={() => refetch()}
        withContainer
      />
    );
  }

  const subtotal = items.reduce((total, item) => {
    const price = parseFloat(item.price);
    return total + price * item.quantity;
  }, 0);
  const shipping = subtotal >= 1_000_000 ? 0 : 0;
  const total = subtotal + shipping;

  const handleClear = async () => {
    const ids = items
      .map((item) => item.cartItemId)
      .filter((id): id is number => typeof id === 'number');
    setClearing(true);
    try {
      for (const id of ids) {
        await new Promise<void>((resolve, reject) => {
          removeApiItem(id, {
            onSuccess: () => resolve(),
            onError: (err) => reject(err),
          });
        });
      }
    } finally {
      setClearing(false);
    }
  };

  const handleApplyVoucher = () => {
    const code = voucherCode.trim();
    if (!code) return;
    applyVoucher(code, {
      onSuccess: () => setVoucherCode(''),
    });
  };

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-12 text-muted-foreground" />
            </div>
            <h2 className="mb-4 text-2xl font-bold">سبد خرید شما خالی است</h2>
            <p className="mb-8 text-muted-foreground">
              به نظر می‌رسد هنوز چیزی به سبد خرید خود اضافه نکرده‌اید.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">شروع خرید</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <CartLineItem
                key={item.cartItemId ?? item.id}
                item={item}
              />
            ))}

            <Button
              variant="outline"
              className="text-muted-foreground"
              disabled={clearing || removing}
              onClick={handleClear}
            >
              پاک کردن سبد
            </Button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="mb-6 text-xl font-semibold">خلاصه سفارش</h2>

              <div className="mb-6 space-y-2">
                <label className="block text-sm font-medium">کد تخفیف</label>
                <div className="flex gap-2">
                  <Input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="مثلاً CHESHMAK2026"
                    disabled={applyingVoucher}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={applyingVoucher || !voucherCode.trim()}
                    onClick={handleApplyVoucher}
                  >
                    اعمال
                  </Button>
                </div>
                <button
                  type="button"
                  className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                  disabled={removingVoucher}
                  onClick={() => removeVoucher()}
                >
                  حذف کد تخفیف
                </button>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">جمع جزء</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ارسال</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">رایگان</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  ارسال رایگان برای سفارش‌های بالای ۱ میلیون تومان
                </p>
                <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                  <span>جمع کل</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link
                  href={
                    isAuthenticated
                      ? '/checkout'
                      : '/login?callbackUrl=/checkout'
                  }
                >
                  {isAuthenticated
                    ? 'ادامه به تسویه حساب'
                    : 'ورود و ادامه خرید'}
                </Link>
              </Button>

              {!isAuthenticated && (
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  برای پرداخت باید وارد حساب کاربری شوید. سبد شما حفظ می‌شود.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
