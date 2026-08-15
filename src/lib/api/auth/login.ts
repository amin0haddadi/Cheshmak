import { api } from "../client";
import type { LoginRequest, LoginResponse } from "./types";

/**
 * Login user
 * Endpoint: POST /api/login
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  return api.post<LoginResponse>("/login", credentials);
}

