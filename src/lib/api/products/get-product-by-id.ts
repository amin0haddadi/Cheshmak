import type { Product } from "@/types";
import { api } from "../client";
import type { ApiProduct } from "./types";
import { transformApiProduct } from "./transformers";

/**
 * Get a single product by ID
 * Note: API might return the product directly or wrapped in { data: ... }
 */
export async function getProductById(id: string): Promise<Product | null> {
  // Try to get product - API might return ApiProduct directly or wrapped
  // Errors are handled globally in QueryProvider and API client
  try {
    const response = await api.get<ApiProduct | { data: ApiProduct }>(`/products/${id}`);
    
    // Handle both response formats
    const apiProduct: ApiProduct = "data" in response ? response.data : response;
    
    return transformApiProduct(apiProduct);
  } catch (error) {
    // Return null for 404 errors, let other errors be handled globally
    if (error && typeof error === "object" && "status" in error) {
      const apiError = error as { status: number };
      if (apiError.status === 404) {
        return null;
      }
    }
    // Re-throw other errors to be handled globally
    throw error;
  }
}

