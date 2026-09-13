import { api } from '../client';
import type { ApiAddress, ApiAddressesResponse } from './types';

/**
 * Get current user's addresses
 * Endpoint: GET /api/addresses
 */
export async function getAddresses(token?: string): Promise<ApiAddress[]> {
  const response = await api.get<ApiAddressesResponse | ApiAddress[]>(
    '/addresses',
    { token },
  );

  if (Array.isArray(response)) {
    return response;
  }

  return Array.isArray(response?.data) ? response.data : [];
}
