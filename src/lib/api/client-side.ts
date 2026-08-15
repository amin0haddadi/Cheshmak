"use client";

import { useSession } from "next-auth/react";
import { apiClient } from "./client";

/**
 * Client-side API helper that automatically includes auth token from NextAuth session
 */
export function useApiClient() {
  const { data: session } = useSession();
  
  return {
    get: <T>(endpoint: string, options?: RequestInit) =>
      apiClient<T>(endpoint, { ...options, method: "GET", token: session?.accessToken }),
    
    post: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
      apiClient<T>(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
        token: session?.accessToken,
      }),
    
    put: <T>(endpoint: string, data?: unknown, options?: RequestInit) =>
      apiClient<T>(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
        token: session?.accessToken,
      }),
    
    delete: <T>(endpoint: string, options?: RequestInit) =>
      apiClient<T>(endpoint, { ...options, method: "DELETE", token: session?.accessToken }),
  };
}

