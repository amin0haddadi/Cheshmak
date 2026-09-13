import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { createAddress } from '@/lib/api/addresses';
import type { CreateAddressRequest } from '@/lib/api/addresses';
import { addressKeys } from '@/hooks/queries/addresses/query-keys';
import { useToast } from '@/hooks/use-toast';

export function useCreateAddress() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (payload: CreateAddressRequest) =>
      createAddress(payload, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
      toast({
        title: 'آدرس ذخیره شد',
        description: 'آدرس جدید به حساب شما اضافه شد.',
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        'خطا در ذخیره آدرس. لطفاً دوباره تلاش کنید.';

      toast({
        title: 'خطا در ذخیره آدرس',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
}
