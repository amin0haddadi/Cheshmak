import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { deleteAddress } from '@/lib/api/addresses';
import { addressKeys } from '@/hooks/queries/addresses/query-keys';
import { useToast } from '@/hooks/use-toast';

export function useDeleteAddress() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteAddress(id, session?.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: addressKeys.lists() });
      toast({
        title: 'حذف شد',
        description: 'آدرس از حساب شما حذف شد.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا',
        description:
          error?.data?.message ||
          error?.message ||
          'خطا در حذف آدرس',
        variant: 'destructive',
      });
    },
  });
}
