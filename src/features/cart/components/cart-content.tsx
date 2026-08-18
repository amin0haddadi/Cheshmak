"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useCart } from "@/hooks/queries/cart";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error-message";

export function CartContent() {
  const { data: session } = useSession();
  const { data: apiCartItems, isLoading, error } = useCart();
  const { items: localItems, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();

  // Use API cart for authenticated users, local store for guests
  const items = session?.user ? (apiCartItems || []) : localItems;

  // Show loading state for authenticated users
  if (session?.user && isLoading) {
    return <Loading message="در حال بارگذاری سبد خرید..." withContainer />;
  }

  // Show error state for authenticated users
  if (session?.user && error) {
    return (
      <ErrorMessage
        message="خطا در بارگذاری سبد خرید. لطفاً دوباره تلاش کنید."
        onRetry={() => window.location.reload()}
        withContainer
      />
    );
  }

  // Calculate totals
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = session?.user ? calculateTotal() : getTotal();
  const shipping = subtotal > 99 ? 0 : 10;
  const total = subtotal + shipping;

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
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="flex gap-4 rounded-xl border bg-card p-4"
              >
                {/* Image */}
                <Link
                  href={`/product/${item.id}`}
                  className="relative size-24 flex-shrink-0 overflow-hidden rounded-lg"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="line-clamp-1 font-medium transition-colors hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                      {item.selectedColor && (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            رنگ:
                          </span>
                          <div
                            className="size-4 rounded-full border"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <span className="font-semibold">
                      {formatPrice(parseFloat(item.price) * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="text-muted-foreground"
              onClick={clearCart}
            >
              پاک کردن سبد
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border bg-card p-6">
              <h2 className="mb-6 text-xl font-semibold">خلاصه سفارش</h2>

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
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    ارسال رایگان برای سفارش‌های بالای ۹۹ دلار
                  </p>
                )}
                <div className="flex justify-between border-t pt-4 text-lg font-semibold">
                  <span>جمع کل</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">ادامه به تسویه حساب</Link>
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                مالیات در تسویه حساب محاسبه می‌شود
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

