import type { Category, Product } from "@/types";
import type { ApiCategory } from "./types";
import { transformApiProduct } from "../products/transformers";

/**
 * Transform API category to frontend Category type
 */
export function transformApiCategory(apiCategory: ApiCategory): Category {
  return {
    categoryId: apiCategory.slug, // Use slug as categoryId for URL routing
    name: apiCategory.name,
    image: apiCategory.image || "", // Use category image if available, fallback to empty
    description: apiCategory.description || undefined,
    productsCount: apiCategory.products_count,
  };
}

/**
 * Transform API category with products to frontend types
 * Sets category name on each product
 */
export function transformApiCategoryWithProducts(
  apiCategory: ApiCategory
): Category & { products: Product[] } {
  const category = transformApiCategory(apiCategory);
  const products = apiCategory.products
    ? apiCategory.products.map((apiProduct) => {
        const product = transformApiProduct(apiProduct);
        // Set category name from the parent category
        product.category = apiCategory.name;
        return product;
      })
    : [];

  return {
    ...category,
    products,
  };
}

