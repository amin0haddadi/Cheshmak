import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories";
import { categoryKeys } from "./query-keys";

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

