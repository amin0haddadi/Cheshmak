import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getAddresses } from '@/lib/api/addresses';
import { addressKeys } from './query-keys';

export function useAddresses() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: addressKeys.list(session?.user?.id),
    queryFn: () => getAddresses(session?.accessToken),
    enabled: status === 'authenticated' && !!session?.accessToken,
    staleTime: 60 * 1000,
  });
}
