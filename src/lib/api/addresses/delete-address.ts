import { api } from '../client';

/**
 * Delete address
 * Endpoint: DELETE /api/addresses/{id}
 */
export async function deleteAddress(
  id: number,
  token?: string,
): Promise<void> {
  await api.delete(`/addresses/${id}`, { token });
}
