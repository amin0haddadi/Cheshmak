import { api } from '../client';
import type {
  ApiAddress,
  CreateAddressRequest,
  CreateAddressResponse,
} from './types';

/**
 * Create a new address
 * Endpoint: POST /api/addresses
 */
export async function createAddress(
  payload: CreateAddressRequest,
  token?: string,
): Promise<ApiAddress> {
  const response = await api.post<CreateAddressResponse | ApiAddress>(
    '/addresses',
    payload,
    { token },
  );

  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as ApiAddress;
}
