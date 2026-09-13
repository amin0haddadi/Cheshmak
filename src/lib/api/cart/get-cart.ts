import { api, type ApiRequestOptions } from '../client';
import type { ApiCartResponse } from './types';

/**
 * Get current cart (auth Bearer or X-Guest-Token)
 * Endpoint: GET /api/cart
 */
export async function getCart(
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<ApiCartResponse> {
  return api.get<ApiCartResponse>('/cart', options);
}
