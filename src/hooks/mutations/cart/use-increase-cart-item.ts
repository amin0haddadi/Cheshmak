import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { increaseCartItem, getCartRequestAuth } from '@/lib/api/cart';
import { cartKeys } from '@/hooks/queries/cart/query-keys';
import { useToast } from '@/hooks/use-toast';
import {
  patchCartItemInCache,
  restoreCartSnapshots,
} from './optimistic';

export function useIncreaseCartItem() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (cartItemId: number) =>
      increaseCartItem(cartItemId, getCartRequestAuth(session?.accessToken)),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.lists() });
      const snapshots = patchCartItemInCache(queryClient, cartItemId, (item) => {
        const maxQuantity = Math.max(0, item.stock ?? 0);
        if (item.quantity >= maxQuantity) return item;
        return { ...item, quantity: item.quantity + 1 };
      });
      return { snapshots };
    },
    onError: (error: any, _id, context) => {
      if (context?.snapshots) {
        restoreCartSnapshots(queryClient, context.snapshots);
      }
      toast({
        title: 'خطا',
        description:
          error?.data?.message ||
          error?.message ||
          'خطا در افزایش تعداد محصول',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
    },
  });
}
