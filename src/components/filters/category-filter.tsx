"use client";

import { cn } from "@/lib/utils";

export interface Category {
  id: string;
  name: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  allLabel?: string;
  className?: string;
  variant?: "desktop" | "mobile";
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  allLabel = "همه",
  className,
  variant = "desktop",
}: CategoryFilterProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={cn(
      isMobile ? "flex flex-wrap gap-2" : "flex items-center gap-2",
      className
    )}>
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "px-4 py-2 text-sm rounded-full transition-colors",
          selectedCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-muted/80"
        )}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "px-4 py-2 text-sm rounded-full transition-colors",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

