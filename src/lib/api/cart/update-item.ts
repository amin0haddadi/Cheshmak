import { api, type ApiRequestOptions } from '../client';
import type { ApiCartResponse } from './types';

export async function updateCartItem(
  cartItemId: number,
  quantity: number,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<ApiCartResponse | unknown> {
  return api.put(`/cart/items/${cartItemId}`, { quantity }, options);
}
