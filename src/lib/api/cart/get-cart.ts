import { api } from "../client";
import type { ApiCartResponse } from "./types";

/**
 * Get current user's cart
 * Endpoint: GET /api/cart
 * Requires: Bearer token in Authorization header
 * @param token - Optional auth token. If not provided, will be retrieved from session (server-side)
 */
export async function getCart(token?: string): Promise<ApiCartResponse> {
  return api.get<ApiCartResponse>("/cart", { token });
}

