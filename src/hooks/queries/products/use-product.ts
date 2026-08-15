import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api/products";
import { productKeys } from "./query-keys";

/**
 * Hook to fetch a single product by ID
 * Uses React Query for caching and state management
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id, // Only run query if id is provided
  });
}

