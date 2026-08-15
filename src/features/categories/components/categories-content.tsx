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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.categoryId}
              href={`/shop?filter[category.slug]=${category.categoryId}`}
              className="group relative bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
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
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <div className="text-4xl text-primary/30">📦</div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Category Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    {category.productsCount || 0} محصول
                  </span>
                  <ArrowLeft className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

