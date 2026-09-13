import { api } from '../client';
import type { ApiAddress, ApiAddressResponse } from './types';

/**
 * Get address by ID
 * Endpoint: GET /api/addresses/{id}
 */
export async function getAddressById(
  id: number,
  token?: string,
): Promise<ApiAddress> {
  const response = await api.get<ApiAddressResponse | ApiAddress>(
    `/addresses/${id}`,
    { token },
  );

  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as ApiAddress;
}
