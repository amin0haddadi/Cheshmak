import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Get auth token from NextAuth session (server-side)
 */
export async function getServerToken(): Promise<string | null> {
  try {
    const session = await getServerSession(authOptions);
    return session?.accessToken || null;
  } catch {
    return null;
  }
}

/**
 * Get auth token (client-side)
 * This function should be called from client components
 */
export function getClientToken(): string | null {
  if (typeof window === "undefined") return null;
  
  // Try to get from NextAuth session via a fetch call
  // This is a workaround since we can't directly access session in client-side API calls
  // The token will be passed via headers in server-side API routes
  return null;
}

