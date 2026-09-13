import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { applyCartVoucher, getCartRequestAuth } from '@/lib/api/cart';
import { cartKeys } from '@/hooks/queries/cart/query-keys';
import { useToast } from '@/hooks/use-toast';

export function useApplyCartVoucher() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (code: string) =>
      applyCartVoucher({ code }, getCartRequestAuth(session?.accessToken)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
      toast({
        title: 'موفق',
        description: 'کد تخفیف اعمال شد',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا',
        description:
          error?.data?.message ||
          error?.message ||
          'کد تخفیف معتبر نیست',
        variant: 'destructive',
      });
    },
  });
}
