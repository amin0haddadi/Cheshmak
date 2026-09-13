import { api } from '../client';
import type {
  ApiAddress,
  ApiAddressResponse,
  UpdateAddressRequest,
} from './types';

/**
 * Update address
 * Endpoint: PUT /api/addresses/{id}
 */
export async function updateAddress(
  id: number,
  payload: UpdateAddressRequest,
  token?: string,
): Promise<ApiAddress> {
  const response = await api.put<ApiAddressResponse | ApiAddress>(
    `/addresses/${id}`,
    payload,
    { token },
  );

  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as ApiAddress;
}
