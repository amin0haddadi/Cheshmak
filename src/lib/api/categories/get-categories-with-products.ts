import type { Category, Product } from "@/types";
import { api } from "../client";
import type { ApiCategoriesResponse } from "./types";
import { transformApiCategoryWithProducts } from "./transformers";

/**
 * Get categories with top products
 * Endpoint: GET /api/categories
 */
export async function getCategoriesWithProducts(): Promise<
  Array<Category & { products: Product[]; productsCount: number }>
> {
  const response = await api.get<ApiCategoriesResponse>("/categories");
  return response.data.map((apiCategory) => {
    const transformed = transformApiCategoryWithProducts(apiCategory);
    return {
      ...transformed,
      productsCount: apiCategory.products_count || transformed.products.length,
    };
  });
}

