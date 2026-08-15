import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { addCartItem, type AddCartItemRequest } from "@/lib/api/cart";
import { cartKeys } from "@/hooks/queries/cart/query-keys";
import { useToast } from "@/hooks/use-toast";

/**
 * Hook to add item to cart
 * Automatically invalidates cart query after successful addition
 */
export function useAddCartItem() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (item: AddCartItemRequest) =>
      addCartItem(item, session?.accessToken),
    onSuccess: () => {
      // Invalidate cart query to refetch updated cart
      queryClient.invalidateQueries({ queryKey: cartKeys.list() });
      
      toast({
        title: "موفق",
        description: "محصول به سبد خرید اضافه شد",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "خطا در افزودن محصول به سبد خرید. لطفاً دوباره تلاش کنید.";

      toast({
        title: "خطا",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
}

