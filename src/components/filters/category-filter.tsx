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
      isMobile ? "flex flex-wrap gap-2" : "flex items-center gap-2 flex-wrap",
      className
    )}>
      <button
        type="button"
        onClick={() => onCategoryChange("all")}
        className={cn(
          "rounded-full transition-colors",
          isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
          selectedCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-metal hover:text-primary hover:shadow-metal"
        )}
      >
        {allLabel}
      </button>
      {categories.map((category) => (
        <button
          type="button"
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "rounded-full transition-colors",
            isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
            selectedCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-metal hover:text-primary hover:shadow-metal"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

