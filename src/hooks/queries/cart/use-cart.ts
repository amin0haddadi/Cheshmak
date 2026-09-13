import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
  getCart,
  getCartRequestAuth,
  transformApiCartResponse,
} from '@/lib/api/cart';
import { getOrCreateGuestToken } from '@/lib/guest-token';
import { cartKeys } from './query-keys';
import type { CartItem } from '@/types';

/**
 * Fetch cart for guests and logged-in users.
 * Cart identity stays on the guest cookie (X-Guest-Token) even after login,
 * because Bearer-only cart mutations currently 500 on the API.
 */
export function useCart() {
  const { data: session, status } = useSession();

  const guestToken =
    typeof window !== 'undefined' ? getOrCreateGuestToken() : null;

  // Prefer guest scope so login does not switch to an empty user-cart cache key
  const scope = guestToken ?? session?.user?.id ?? 'guest';

  return useQuery<CartItem[]>({
    queryKey: cartKeys.list(scope),
    queryFn: async () => {
      const auth = getCartRequestAuth(session?.accessToken);
      const response = await getCart(auth);
      return transformApiCartResponse(response);
    },
    enabled: status !== 'loading',
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
