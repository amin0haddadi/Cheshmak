"use client";

import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/hooks/queries/categories";

export function TopCategoriesContent() {
  const { data: categories, isLoading } = useCategories();

  // Show loading state with skeleton or return early
  if (isLoading || !categories) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-xl bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
      {categories.map((category) => (
        <Link
          key={category.categoryId}
          href={`/shop?filter[category.slug]=${category.categoryId}`}
          className="group relative aspect-[3/4] rounded-xl overflow-hidden"
        >
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-end justify-center pb-6">
            <h3 className="text-white text-lg font-semibold group-hover:text-primary transition-colors">
              {category.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

