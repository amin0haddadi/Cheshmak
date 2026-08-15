import { useQuery } from "@tanstack/react-query";
import { getCategoriesWithProducts } from "@/lib/api/categories";
import { categoryKeys } from "./query-keys";

export function useCategoriesWithProducts() {
  return useQuery({
    queryKey: categoryKeys.withProducts(),
    queryFn: getCategoriesWithProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes - products may change more frequently
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

