/**
 * Base API client for making HTTP requests
 * API base URL is configured via NEXT_PUBLIC_API_URL environment variable
 */
import { logger } from '@/lib/logger';
import { getGuestToken } from '@/lib/guest-token';

import { getServerToken } from './get-token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiRequestOptions = RequestInit & {
  token?: string;
  /** Explicit guest token; otherwise cookie is used automatically (even with Bearer) */
  guestToken?: string | null;
  /** Skip attaching X-Guest-Token even if cookie exists */
  skipGuestToken?: boolean;
};

async function getAuthToken(options?: {
  token?: string;
}): Promise<string | null> {
  if (options?.token) {
    return options.token;
  }

  if (typeof window === 'undefined') {
    return await getServerToken();
  }

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
  options?: ApiRequestOptions,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const token = await getAuthToken({ token: options?.token });

  const {
    token: _token,
    guestToken: explicitGuestToken,
    skipGuestToken,
    ...fetchOptions
  } = options || {};

  // Always send guest cookie when present (with or without Bearer).
  // Cart APIs need X-Guest-Token for continuity; Bearer-only add returns 500.
  const guestToken = !skipGuestToken
    ? (explicitGuestToken ?? getGuestToken())
    : null;

  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(guestToken && { 'X-Guest-Token': guestToken }),
      ...fetchOptions.headers,
    },
  };

  try {
    logger.debug(`API Request: ${options?.method || 'GET'} ${endpoint}`);

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: ApiErrorResponse = {};
      try {
        errorData = await response.json();
      } catch {
        // ignore
      }

      const error: ApiError = {
        message:
          errorData.message ||
          errorData.error ||
          `HTTP error! status: ${response.status}`,
        status: response.status,
        data: errorData,
      };

      logger.error(`API Error: ${endpoint}`, {
        status: response.status,
        error: errorData,
      });

      throw error;
    }

    const text = await response.text();
    if (!text) {
      return undefined as T;
    }

    const data = JSON.parse(text);
    logger.debug(`API Success: ${endpoint}`);
    return data as T;
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) {
      throw error;
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      logger.error(`Network Error: ${endpoint}`, error);
      const networkError: ApiError = {
        message:
          'اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید',
        status: 0,
      };
      throw networkError;
    }

    logger.error(`API Request Failed: ${endpoint}`, error);
    const apiError: ApiError = {
      message:
        error instanceof Error
          ? error.message
          : 'خطای نامشخص در ارتباط با سرور',
      status: 0,
    };
    throw apiError;
  }
}

export const api = {
  get: <T>(endpoint: string, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'POST',
      ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
    }),

  put: <T>(endpoint: string, data?: unknown, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PUT',
      ...(data !== undefined ? { body: JSON.stringify(data) } : {}),
    }),

  delete: <T>(endpoint: string, options?: ApiRequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
