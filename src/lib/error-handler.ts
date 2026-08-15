/**
 * Global error handler for API requests and React Query errors
 */

import { logger } from "./logger";
import { toast } from "@/hooks/use-toast";

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  status?: number;
}

/**
 * Get user-friendly error message from API error
 */
function getErrorMessage(error: unknown): string {
  // Handle API error response
  if (error && typeof error === "object" && "message" in error) {
    const apiError = error as ApiErrorResponse;
    
    // Check for validation errors
    if (apiError.errors) {
      const firstError = Object.values(apiError.errors)[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
    }
    
    // Check for error message
    if (apiError.message) {
      return apiError.message;
    }
    
    // Check for error field
    if (apiError.error) {
      return apiError.error;
    }
  }
  
  // Handle Error instance
  if (error instanceof Error) {
    return error.message;
  }
  
  // Handle HTTP status codes
  if (error && typeof error === "object" && "status" in error) {
    const statusError = error as { status: number; message?: string };
    switch (statusError.status) {
      case 400:
        return "درخواست نامعتبر است";
      case 401:
        return "لطفاً ابتدا وارد حساب کاربری خود شوید";
      case 403:
        return "شما دسترسی لازم را ندارید";
      case 404:
        return "موردی یافت نشد";
      case 422:
        return "اطلاعات ارسالی نامعتبر است";
      case 429:
        return "تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید";
      case 500:
        return "خطای سرور. لطفاً بعداً تلاش کنید";
      case 503:
        return "سرویس در دسترس نیست. لطفاً بعداً تلاش کنید";
      default:
        return statusError.message || "خطایی رخ داده است";
    }
  }
  
  // Default message
  return "خطایی رخ داده است. لطفاً دوباره تلاش کنید";
}

/**
 * Handle API errors globally
 */
export function handleApiError(error: unknown, context?: string) {
  const errorMessage = getErrorMessage(error);
  const contextMessage = context ? `${context}: ${errorMessage}` : errorMessage;
  
  // Log error
  logger.error(contextMessage, {
    error,
    context,
    timestamp: new Date().toISOString(),
  });
  
  // Show toast notification
  toast({
    variant: "destructive",
    title: "خطا",
    description: errorMessage,
    duration: 5000,
  });
  
  return errorMessage;
}

/**
 * Handle React Query errors globally
 */
export function handleQueryError(error: unknown, query?: { queryKey?: unknown }) {
  const queryKey = query?.queryKey 
    ? JSON.stringify(query.queryKey)
    : "unknown";
  
  return handleApiError(error, `Query Error [${queryKey}]`);
}

