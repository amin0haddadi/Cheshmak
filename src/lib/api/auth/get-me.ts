import { api } from "../client";
import type { MeResponse } from "./types";

/**
 * Get current authenticated user
 * Endpoint: GET /api/me
 * Requires: Bearer token in Authorization header
 * @param token - Optional auth token. If not provided, will be retrieved from session (server-side)
 */
export async function getMe(token?: string): Promise<MeResponse> {
  return api.get<MeResponse>("/me", { token });
}

