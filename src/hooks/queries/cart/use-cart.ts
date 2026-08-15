import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getCart } from "@/lib/api/cart";
import { transformApiCartResponse } from "@/lib/api/cart/transformers";
import { cartKeys } from "./query-keys";
import type { CartItem } from "@/types";

/**
 * Hook to fetch current user's cart
 * Only fetches if user is authenticated (has session)
 */
export function useCart() {
  const { data: session, status } = useSession();

  return useQuery<CartItem[]>({
    queryKey: cartKeys.list(),
    queryFn: async () => {
      const response = await getCart(session?.accessToken);
      return transformApiCartResponse(response);
    },
    enabled: status === "authenticated" && !!session?.accessToken,
    staleTime: 30 * 1000, // 30 seconds - cart changes frequently
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

