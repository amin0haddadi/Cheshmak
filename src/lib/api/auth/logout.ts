import { api } from "../client";

/**
 * Logout user
 * Endpoint: POST /api/logout
 * Note: For client-side usage, use useApiClient() hook instead
 * This function is for server-side usage where token is retrieved from session
 */
export async function logout(): Promise<void> {
  await api.post("/logout", {});
}

