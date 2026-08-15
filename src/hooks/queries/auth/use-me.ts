import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/auth";
import { authKeys } from "./query-keys";
import { useSession } from "next-auth/react";

/**
 * Hook to fetch current authenticated user
 * Only fetches if user is authenticated (has session)
 */
export function useMe() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => getMe(session?.accessToken),
    enabled: status === "authenticated" && !!session?.accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes - user data doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

