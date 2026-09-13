import { api, type ApiRequestOptions } from '../client';
import type { ApiCartResponse } from './types';

export async function increaseCartItem(
  cartItemId: number,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<ApiCartResponse | unknown> {
  return api.post(`/cart/items/${cartItemId}/increase`, undefined, options);
}
