import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getAddressById } from '@/lib/api/addresses';
import { addressKeys } from './query-keys';

export function useAddress(id?: number) {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: addressKeys.detail(id ?? 0),
    queryFn: () => getAddressById(id!, session?.accessToken),
    enabled:
      status === 'authenticated' &&
      !!session?.accessToken &&
      typeof id === 'number' &&
      id > 0,
  });
}
