import { api } from "../client";
import type { ApiCartItem } from "./types";

export interface AddCartItemRequest {
  variant_id: number;
  quantity: number;
}

/**
 * Add item to cart
 * Endpoint: POST /api/cart/items
 * Requires: Bearer token in Authorization header
 * @param item - Cart item to add (variant_id and quantity)
 * @param token - Optional auth token. If not provided, will be retrieved from session (server-side)
 */
export async function addCartItem(
  item: AddCartItemRequest,
  token?: string
): Promise<ApiCartItem> {
  return api.post<ApiCartItem>("/cart/items", item, { token });
}

