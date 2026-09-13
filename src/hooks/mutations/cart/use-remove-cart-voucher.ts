import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { removeCartVoucher, getCartRequestAuth } from '@/lib/api/cart';
import { cartKeys } from '@/hooks/queries/cart/query-keys';
import { useToast } from '@/hooks/use-toast';

export function useRemoveCartVoucher() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () =>
      removeCartVoucher(getCartRequestAuth(session?.accessToken)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
      toast({
        title: 'حذف شد',
        description: 'کد تخفیف از سبد حذف شد',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا',
        description:
          error?.data?.message ||
          error?.message ||
          'خطا در حذف کد تخفیف',
        variant: 'destructive',
      });
    },
  });
}
