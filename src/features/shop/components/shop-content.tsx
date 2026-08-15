"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/features/products/components/product-grid";
import { Pagination } from "@/components/ui/pagination";
import { Loading } from "@/components/ui/loading";
import { ErrorMessage } from "@/components/ui/error-message";
import { ProductFiltersBar, type SortOption } from "@/components/filters";
import { useProducts } from "@/hooks/queries/products";
import { useCategories } from "@/hooks/queries/categories";

interface ShopContentProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function ShopContent({ searchParams }: ShopContentProps) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();
  
  // Map API sort param to UI sort option
  // API uses: name, base_price, created_at, price (with '-' prefix for descending)
  const getSortFromApiParam = (apiSort?: string): SortOption => {
    switch (apiSort) {
      case "price":
        return "price-low";
      case "-price":
        return "price-high";
      case "name":
      case "-name":
        return "name";
      case "created_at":
      case "-created_at":
      default:
        return "newest";
    }
  };

  // Read initial values from URL params
  const pageFromUrl = searchParams.page 
    ? parseInt(Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page, 10)
    : 1;
  // Support both old format (category) and new format (filter[category.slug])
  const categoryFromUrl = searchParams["filter[category.slug]"]
    ? (Array.isArray(searchParams["filter[category.slug]"]) 
        ? searchParams["filter[category.slug]"][0] 
        : searchParams["filter[category.slug]"])
    : searchParams.category
    ? (Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category)
    : "all";
  const sortParamFromUrl = searchParams.sort 
    ? (Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort)
    : undefined;
  const sortFromUrl = getSortFromApiParam(sortParamFromUrl);

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);
  const [sortBy, setSortBy] = useState<SortOption>(sortFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // Map sort option to API sort parameter
  // API uses: name, base_price, created_at, price (with '-' prefix for descending)
  const getSortParam = (sort: SortOption): string | undefined => {
    switch (sort) {
      case "price-low":
        return "price"; // ASC by default (min variant price)
      case "price-high":
        return "-price"; // DESC (max variant price)
      case "name":
        return "name"; // ASC by default
      default:
        return "-created_at"; // newest - sort by created_at DESC
    }
  };

  // Sync state with URL params when they change
  useEffect(() => {
    const page = pageFromUrl;
    const category = categoryFromUrl;
    const sort = sortFromUrl;
    
    if (page !== currentPage) setCurrentPage(page);
    if (category !== selectedCategory) setSelectedCategory(category);
    if (sort !== sortBy) setSortBy(sort);
  }, [pageFromUrl, categoryFromUrl, sortFromUrl]);

  // Update URL when params change
  const updateUrl = (updates: { page?: number; category?: string; sort?: string }) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    
    if (updates.page !== undefined) {
      if (updates.page === 1) {
        params.delete("page");
      } else {
        params.set("page", updates.page.toString());
      }
    }
    
    if (updates.category !== undefined) {
      // Remove old format if exists
      params.delete("category");
      if (updates.category === "all") {
        params.delete("filter[category.slug]");
      } else {
        params.set("filter[category.slug]", updates.category);
      }
    }
    
    if (updates.sort !== undefined) {
      if (!updates.sort) {
        params.delete("sort");
      } else {
        params.set("sort", updates.sort);
      }
    }
    
    router.push(`/shop?${params.toString()}`);
  };

  // Reset page when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateUrl({ category, page: 1 });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    const sortParam = getSortParam(sort);
    updateUrl({ sort: sortParam, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl({ page });
  };

  // Build API params - memoized to ensure stable reference
  // API uses filter[category.slug] for category filtering
  const apiParams = useMemo(
    () => ({
      page: currentPage,
      per_page: 15,
      ...(selectedCategory !== "all" && { "filter[category.slug]": selectedCategory }),
      ...(getSortParam(sortBy) && { sort: getSortParam(sortBy) }),
      include: "category,variants", // Include relations for better data
    }),
    [currentPage, selectedCategory, sortBy]
  );

  // Fetch products using React Query with filters
  const { data: productsData, isLoading, error } = useProducts(apiParams);
  
  // Fetch categories for filter - MUST be called before any early returns
  const { data: categoriesData } = useCategories();

  const products = productsData?.products || [];
  const pagination = productsData?.pagination;
  
  // Transform categories to match CategoryFilter format
  const filterCategories = categoriesData
    ? categoriesData.map((cat) => ({
        id: cat.categoryId,
        name: cat.name,
      }))
    : [];

  // Loading state
  if (isLoading) {
    return (
      <Loading
        message="در حال بارگذاری محصولات..."
        withContainer
      />
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message="خطا در بارگذاری محصولات. لطفاً دوباره تلاش کنید."
        onRetry={() => window.location.reload()}
        withContainer
      />
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-custom">
        {/* Filters Bar */}
        <ProductFiltersBar
          categories={filterCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          totalCount={pagination?.total || products.length}
        />

        {/* Products Grid */}
        <ProductGrid products={products} />

        {/* Pagination */}
        {pagination && (
          <Pagination
            currentPage={pagination.current_page}
            lastPage={pagination.last_page}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        )}
      </div>
    </div>
  );
}

