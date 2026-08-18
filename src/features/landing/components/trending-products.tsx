"use client";

import Link from "next/link";
import { useProducts } from "@/hooks/queries/products";
import { ProductCard } from "@/features/products/components/product-card";
import { Loading } from "@/components/ui/loading";

export function TrendingProducts() {
  // Fetch first 4 products (can be sorted by popularity if API supports it)
  const { data: productsData, isLoading } = useProducts({
    per_page: 4,
    page: 1,
  });

  const products = productsData?.products || [];

  if (isLoading) {
    return (
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container-custom">
          <Loading message="در حال بارگذاری..." />
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 bg-muted/30 py-16 lg:py-24">
      <div className="container-custom">
        {/* Section Title */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 inline-block font-display text-lg text-primary">
              این فصل
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">پرفروش‌ترین‌ها</h2>
          </div>
          <Link
            href="/shop"
            className="font-medium text-primary transition-colors hover:underline"
          >
            مشاهده همه محصولات ←
          </Link>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            محصولی یافت نشد.
          </p>
        )}
      </div>
    </section>
  );
}

