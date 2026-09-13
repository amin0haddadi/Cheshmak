import { api } from '../client';
import type { ApiOrder, ApiOrdersListResponse } from './types';

/**
 * Get current user's orders (paginated)
 * Endpoint: GET /api/orders
 */
export async function getOrders(
  params?: { page?: number; per_page?: number },
  token?: string,
): Promise<ApiOrdersListResponse> {
  const search = new URLSearchParams();
  if (params?.page) search.set('page', String(params.page));
  if (params?.per_page) search.set('per_page', String(params.per_page));
  const query = search.toString();

  const response = await api.get<ApiOrdersListResponse | ApiOrder[]>(
    `/orders${query ? `?${query}` : ''}`,
    { token },
  );

  if (Array.isArray(response)) {
    return { data: response };
  }

  return {
    data: Array.isArray(response?.data) ? response.data : [],
    meta: response?.meta,
    links: response?.links,
  };
}
