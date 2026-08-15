import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth-store";
import type { LoginRequest } from "@/lib/api/auth/types";
import { useToast } from "@/hooks/use-toast";

export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: (response) => {
      const { user, token } = response.data;
      
      // Store auth data
      setAuth(
        {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        },
        token
      );

      // Show success message
      toast({
        title: "ورود موفق",
        description: `خوش آمدید ${user.name}`,
      });

      // Redirect to home or previous page
      router.push("/");
      router.refresh();
    },
    onError: (error: any) => {
      // Error handling is done globally in query-provider
      // But we can add specific error messages here if needed
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "خطا در ورود. لطفاً اطلاعات خود را بررسی کنید.";
      
      toast({
        title: "خطا در ورود",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
}

