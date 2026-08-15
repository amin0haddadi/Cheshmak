import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/lib/api/client-side";
import { useToast } from "@/hooks/use-toast";

/**
 * Logout hook that:
 * 1. Calls the API logout endpoint to invalidate token on server
 * 2. Signs out from NextAuth to clear session
 * 3. Redirects to home page
 */
export function useLogout() {
  const router = useRouter();
  const { toast } = useToast();
  const api = useApiClient();

  const handleLogout = async () => {
    try {
      // Call API logout endpoint to invalidate token on server
      // The API client will automatically include the token from the session
      await api.post("/logout", {});

      // Sign out from NextAuth (clears JWT session)
      await signOut({ redirect: false });

      // Show success message
      toast({
        title: "خروج موفق",
        description: "با موفقیت خارج شدید",
      });

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (error: any) {
      // Even if API call fails, still sign out from NextAuth
      await signOut({ redirect: false });

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "خطا در خروج. لطفاً دوباره تلاش کنید.";

      toast({
        title: "خطا در خروج",
        description: errorMessage,
        variant: "destructive",
      });

      // Still redirect even if there was an error
      router.push("/");
      router.refresh();
    }
  };

  return { logout: handleLogout };
}

