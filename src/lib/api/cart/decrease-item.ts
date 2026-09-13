import { api, type ApiRequestOptions } from '../client';
import type { ApiCartResponse } from './types';

export async function decreaseCartItem(
  cartItemId: number,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<ApiCartResponse | unknown> {
  return api.post(`/cart/items/${cartItemId}/decrease`, undefined, options);
}
