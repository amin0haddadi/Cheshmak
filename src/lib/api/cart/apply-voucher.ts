import { api, type ApiRequestOptions } from '../client';
import type { ApiCartResponse } from './types';

export interface ApplyVoucherRequest {
  code: string;
}

export async function applyCartVoucher(
  payload: ApplyVoucherRequest,
  options?: Pick<ApiRequestOptions, 'token' | 'guestToken'>,
): Promise<ApiCartResponse | unknown> {
  return api.post('/cart/voucher/apply', payload, options);
}
