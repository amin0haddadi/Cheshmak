import { api, type ApiRequestOptions } from '../client';
import type { ApiCartResponse } from './types';

export async function removeCartItem(
  cartItemId: number,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<ApiCartResponse | unknown> {
  return api.delete(`/cart/items/${cartItemId}`, options);
}
