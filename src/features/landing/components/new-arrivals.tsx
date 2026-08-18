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
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 inline-block font-display text-lg text-primary">
              تازه رسیده
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">جدیدترین محصولات</h2>
          </div>
          <Link
            href="/shop?sort=-created_at"
            className="font-medium text-primary transition-colors hover:underline"
          >
            مشاهده همه جدیدها ←
          </Link>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

