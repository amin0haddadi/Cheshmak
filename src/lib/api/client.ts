/**
 * Base API client for making HTTP requests
 * API base URL is configured via NEXT_PUBLIC_API_URL environment variable
 */

import { logger } from "@/lib/logger";
import { getServerToken } from "./get-token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://beauty-center.mrhn.ir/api";

/**
 * Get auth token
 * For server-side: uses NextAuth session
 * For client-side: token should be passed via options
 */
async function getAuthToken(options?: { token?: string }): Promise<string | null> {
  // If token is explicitly provided, use it
  if (options?.token) {
    return options.token;
  }
  
  // Server-side: get from NextAuth session
  if (typeof window === "undefined") {
    return await getServerToken();
  }
  
  // Client-side: return null (token should be passed via options)
  return null;
}

export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit & { token?: string }
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token if available
  const token = await getAuthToken({ token: options?.token });
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
    ...options,
  };
  
  // Remove token from options to avoid passing it in fetch
  delete (config as any).token;

  try {
    logger.debug(`API Request: ${options?.method || "GET"} ${endpoint}`);
    
    const response = await fetch(url, config);

    if (!response.ok) {
      // Try to parse error response
      let errorData: ApiErrorResponse = {};
      try {
        errorData = await response.json();
      } catch {
        // If JSON parsing fails, use default message
      }

      const error: ApiError = {
        message: errorData.message || errorData.error || `HTTP error! status: ${response.status}`,
        status: response.status,
        data: errorData,
      };
      
      logger.error(`API Error: ${endpoint}`, {
        status: response.status,
        error: errorData,
      });
      
      throw error;
    }

    const data = await response.json();
    logger.debug(`API Success: ${endpoint}`);
    return data as T;
  } catch (error) {
    // Re-throw ApiError as-is
    if (error && typeof error === "object" && "status" in error) {
      throw error;
    }
    
    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      logger.error(`Network Error: ${endpoint}`, error);
      const networkError: ApiError = {
        message: "اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید",
        status: 0,
      };
      throw networkError;
    }
    
    // Handle other errors
    logger.error(`API Request Failed: ${endpoint}`, error);
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "خطای نامشخص در ارتباط با سرور",
      status: 0,
    };
    throw apiError;
  }
}

// Helper methods for different HTTP verbs
export const api = {
  get: <T>(endpoint: string, options?: RequestInit & { token?: string }) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),
  
  post: <T>(endpoint: string, data?: unknown, options?: RequestInit & { token?: string }) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    }),
  
  put: <T>(endpoint: string, data?: unknown, options?: RequestInit & { token?: string }) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit & { token?: string }) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};

