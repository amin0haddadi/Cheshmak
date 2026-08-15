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
          <div className="text-center max-w-md mx-auto">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-4">لیست علاقه‌مندی شما خالی است</h2>
            <p className="text-muted-foreground mb-8">
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
        <div className="flex items-center justify-between mb-8">
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

