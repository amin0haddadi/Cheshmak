import { api } from "../client";
import type { RegisterRequest, RegisterResponse } from "./types";

/**
 * Register new user
 * Endpoint: POST /api/register
 */
export async function register(credentials: RegisterRequest): Promise<RegisterResponse> {
  return api.post<RegisterResponse>("/register", credentials);
}

