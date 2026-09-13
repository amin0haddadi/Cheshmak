import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { cartKeys } from '@/hooks/queries/cart/query-keys';
import { orderKeys } from '@/hooks/queries/orders/query-keys';
import { useToast } from '@/hooks/use-toast';
import {
  createOrder,
  extractOrderId,
  extractPaymentRedirectUrl,
  payOrder,
} from '@/lib/api/orders';
import type { CreateOrderRequest } from '@/lib/api/orders';

export function useCreateOrder() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: CreateOrderRequest) => {
      const token = session?.accessToken;

      const orderResponse = await createOrder(
        { address_id: payload.address_id },
        { token, skipGuestToken: true },
      );
      const orderId = extractOrderId(orderResponse);

      if (!orderId) {
        throw {
          message: 'سفارش ثبت شد ولی شناسه سفارش دریافت نشد.',
          status: 0,
          data: orderResponse,
        };
      }

      const payResponse = await payOrder(orderId, token);
      return { orderId, orderResponse, payResponse };
    },
    onSuccess: ({ payResponse }) => {
      queryClient.invalidateQueries({ queryKey: cartKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });

      const redirectUrl = extractPaymentRedirectUrl(payResponse);
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      toast({
        title: 'سفارش ثبت شد',
        description:
          'آدرس درگاه پرداخت دریافت نشد. از لیست سفارش‌ها می‌توانید دوباره پرداخت کنید.',
        variant: 'destructive',
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        'خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.';

      toast({
        title: 'خطا در ثبت سفارش',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
}
