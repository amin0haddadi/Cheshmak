import type { Product } from "@/types";
import { api } from "../client";
import type { ApiProductsResponse, GetProductsParams } from "./types";
import { transformApiProduct } from "./transformers";

/**
 * Get all products with optional filters and pagination
 */
export async function getProducts(
  params?: GetProductsParams
): Promise<{ products: Product[]; pagination: ApiProductsResponse["meta"] }> {
  // Build query string from params
  // API uses filter[...] format for filters
  const queryParams = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });
  }

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";

  // Errors are handled globally in QueryProvider and API client
  const response = await api.get<ApiProductsResponse>(endpoint);

  // Transform API products to frontend Product type
  const products = response.data.map(transformApiProduct);

  return {
    products,
    pagination: response.meta,
  };
}

