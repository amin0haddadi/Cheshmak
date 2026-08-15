"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/queries/products";
import { ProductCard } from "@/features/products/components/product-card";
import { Loading } from "@/components/ui/loading";

export function NewArrivals() {
  // Fetch newest products sorted by created_at
  const { data: productsData, isLoading } = useProducts({
    sort: "-created_at", // Sort by newest first
    per_page: 4,
  });

  const products = productsData?.products || [];

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <Loading message="در حال بارگذاری..." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container-custom">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-primary font-display text-lg mb-2">
              تازه رسیده
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">جدیدترین محصولات</h2>
          </div>
          <Link
            href="/shop?sort=-created_at"
            className="text-primary font-medium hover:underline"
          >
            مشاهده همه جدیدها ←
          </Link>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            محصول جدیدی یافت نشد.
          </p>
        )}
      </div>
    </section>
  );
}

