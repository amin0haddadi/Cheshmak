"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryFilter, type Category } from "./category-filter";
import { SortFilter, type SortOption } from "./sort-filter";

export interface ProductFiltersBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount?: number;
  countLabel?: string;
  className?: string;
}

export function ProductFiltersBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalCount,
  countLabel = "محصول",
  className,
}: ProductFiltersBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Filters Bar */}
      <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b mb-8 ${className || ""}`}>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 ml-2" />
            فیلترها
          </Button>

          {/* Category Filter - Desktop */}
          <div className="hidden md:block">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              variant="desktop"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {totalCount !== undefined && (
            <span className="text-sm text-muted-foreground">
              {totalCount} {countLabel}
            </span>
          )}
          <SortFilter value={sortBy} onValueChange={onSortChange} />
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="md:hidden pb-6 mb-6 border-b">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            variant="mobile"
          />
        </div>
      )}
    </>
  );
}

