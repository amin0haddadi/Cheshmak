import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api/auth";
import type { RegisterRequest, RegisterResponse } from "@/lib/api/auth/types";

/**
 * Register mutation hook
 * Response structure: { user: {...}, token: "..." }
 * No data wrapper - access user and token directly
 */
export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (credentials: RegisterRequest) => register(credentials),
    // Don't let global error handler process this - we handle errors in the component
    throwOnError: false,
  });
}

