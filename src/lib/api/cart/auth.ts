import type { ApiRequestOptions } from '@/lib/api/client';
import { getOrCreateGuestToken } from '@/lib/guest-token';

/**
 * Cart uses X-Guest-Token only.
 * POST /cart/items with Bearer alone returns 500 on the API; keep the guest
 * cookie after login so the same cart continues to work.
 */
export function getCartRequestAuth(
  _accessToken?: string | null,
): Pick<ApiRequestOptions, 'guestToken'> {
  const guestToken = getOrCreateGuestToken();
  return guestToken ? { guestToken } : {};
}
