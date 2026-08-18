"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/queries/categories";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error-message";
import { ArrowLeft } from "lucide-react";

export function CategoriesContent() {
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return <Loading message="در حال بارگذاری دسته‌بندی‌ها..." withContainer />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="خطا در بارگذاری دسته‌بندی‌ها. لطفاً دوباره تلاش کنید."
        onRetry={() => window.location.reload()}
        withContainer
      />
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-custom">
          <p className="text-center text-muted-foreground">
            دسته‌بندی‌ای یافت نشد.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.categoryId}
              href={`/shop?filter[category.slug]=${category.categoryId}`}
              className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <div className="text-4xl text-primary/30">📦</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              {/* Category Info */}
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    {category.productsCount || 0} محصول
                  </span>
                  <ArrowLeft className="size-4 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

