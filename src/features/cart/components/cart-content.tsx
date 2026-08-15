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
          <div className="text-center max-w-md mx-auto">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h2>
            <p className="text-muted-foreground mb-8">
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="flex gap-4 p-4 bg-card rounded-xl border"
              >
                {/* Image */}
                <Link
                  href={`/product/${item.id}`}
                  className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="font-medium hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.category}
                      </p>
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            رنگ:
                          </span>
                          <div
                            className="w-4 h-4 rounded-full border"
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
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
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
            <div className="bg-card rounded-xl border p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">خلاصه سفارش</h2>

              <div className="space-y-4 mb-6">
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
                <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                  <span>جمع کل</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">ادامه به تسویه حساب</Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                مالیات در تسویه حساب محاسبه می‌شود
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

