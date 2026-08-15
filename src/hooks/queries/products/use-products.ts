import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";
import type { GetProductsParams } from "@/lib/api/products/types";
import { productKeys } from "./query-keys";

/**
 * Hook to fetch all products with optional filters and pagination
 * Uses React Query for caching and state management
 */
export function useProducts(params?: GetProductsParams) {
  // Serialize params to ensure query key changes when params change
  const serializedParams = params
    ? Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null && value !== "")
        .sort(([a], [b]) => a.localeCompare(b))
        .reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = value as string | number;
          }
          return acc;
        }, {} as Record<string, string | number>)
    : undefined;

  return useQuery({
    queryKey: [...productKeys.lists(), serializedParams],
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - products don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    refetchOnMount: false, // Use cached data if available
    placeholderData: (previousData) => previousData, // Show previous data while loading new page
  });
}

