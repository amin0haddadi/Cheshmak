import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { updateAddress } from '@/lib/api/addresses';
import type { UpdateAddressRequest } from '@/lib/api/addresses';
import { addressKeys } from '@/hooks/queries/addresses/query-keys';
import { useToast } from '@/hooks/use-toast';

export function useUpdateAddress() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateAddressRequest;
    }) => updateAddress(id, payload, session?.accessToken),
    onSuccess: (address) => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: addressKeys.detail(address.id),
      });
      toast({
        title: 'آدرس به‌روز شد',
        description: 'تغییرات آدرس ذخیره شد.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا',
        description:
          error?.data?.message ||
          error?.message ||
          'خطا در به‌روزرسانی آدرس',
        variant: 'destructive',
      });
    },
  });
}
