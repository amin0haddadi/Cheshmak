import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { payOrder, extractPaymentRedirectUrl } from '@/lib/api/orders';
import { orderKeys } from '@/hooks/queries/orders/query-keys';
import { useToast } from '@/hooks/use-toast';

export function usePayOrder() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (orderId: number) => payOrder(orderId, session?.accessToken),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      const redirectUrl = extractPaymentRedirectUrl(response);
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      toast({
        title: 'پرداخت',
        description: 'آدرس درگاه پرداخت دریافت نشد. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        'خطا در شروع پرداخت. لطفاً دوباره تلاش کنید.';

      toast({
        title: 'خطا در پرداخت',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
}
