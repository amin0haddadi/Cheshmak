import { api, type ApiRequestOptions } from '../client';
import type { CreateOrderRequest, CreateOrderResponse } from './types';

/**
 * Place order from authenticated user cart
 * Endpoint: POST /api/orders
 * Body: { address_id }
 */
export async function createOrder(
  payload: CreateOrderRequest,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken' | 'skipGuestToken'>,
): Promise<CreateOrderResponse> {
  return api.post<CreateOrderResponse>(
    '/orders',
    { address_id: payload.address_id },
    options,
  );
}
