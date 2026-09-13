import { api, type ApiRequestOptions } from '../client';

export interface AddCartItemRequest {
  variant_id: number;
  quantity: number;
}

/**
 * Add item to cart
 * Endpoint: POST /api/cart/items
 */
export async function addCartItem(
  item: AddCartItemRequest,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<unknown> {
  return api.post('/cart/items', item, options);
}
