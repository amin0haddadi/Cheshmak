import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { updateCartItem, getCartRequestAuth } from '@/lib/api/cart';
import { cartKeys } from '@/hooks/queries/cart/query-keys';
import { useToast } from '@/hooks/use-toast';

export function useUpdateCartItem() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      cartItemId,
      quantity,
    }: {
      cartItemId: number;
      quantity: number;
    }) =>
      updateCartItem(
        cartItemId,
        quantity,
        getCartRequestAuth(session?.accessToken),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا',
        description:
          error?.data?.message ||
          error?.message ||
          'خطا در به‌روزرسانی تعداد محصول',
        variant: 'destructive',
      });
    },
  });
}
