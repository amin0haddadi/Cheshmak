import { api } from '../client';
import type { PayOrderResponse } from './types';

/**
 * Start or retry payment for a pending order
 * Endpoint: POST /api/orders/{order}/pay
 */
export async function payOrder(
  orderId: number,
  token?: string,
): Promise<PayOrderResponse> {
  return api.post<PayOrderResponse>(`/orders/${orderId}/pay`, undefined, {
    token,
  });
}
