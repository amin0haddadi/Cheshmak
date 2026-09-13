import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { removeCartItem, getCartRequestAuth } from '@/lib/api/cart';
import { cartKeys } from '@/hooks/queries/cart/query-keys';
import { useToast } from '@/hooks/use-toast';
import {
  patchCartItemInCache,
  restoreCartSnapshots,
} from './optimistic';

export function useRemoveCartItem() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (cartItemId: number) =>
      removeCartItem(cartItemId, getCartRequestAuth(session?.accessToken)),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.lists() });
      const snapshots = patchCartItemInCache(
        queryClient,
        cartItemId,
        () => null,
      );
      return { snapshots };
    },
    onSuccess: () => {
      toast({
        title: 'حذف شد',
        description: 'محصول از سبد خرید حذف شد',
      });
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
          'خطا در حذف محصول از سبد',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
    },
  });
}
