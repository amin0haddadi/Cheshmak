"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlist-store";
import { ProductGrid } from "@/features/products/components/product-grid";

export function WishlistContent() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-muted">
              <Heart className="size-12 text-muted-foreground" />
            </div>
            <h2 className="mb-4 text-2xl font-bold">لیست علاقه‌مندی شما خالی است</h2>
            <p className="mb-8 text-muted-foreground">
              با کلیک روی آیکون قلب در هر محصول، آن را ذخیره کنید.
            </p>
            <Button asChild size="lg">
              <Link href="/shop">مشاهده محصولات</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              {items.length} محصول ذخیره شده
            </p>
          </div>
          <Button variant="outline" onClick={clearWishlist}>
            پاک کردن همه
          </Button>
        </div>

        <ProductGrid products={items} />
      </div>
    </div>
  );
}

