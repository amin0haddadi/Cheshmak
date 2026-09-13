import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getOrders } from '@/lib/api/orders';
import { orderKeys } from './query-keys';

export function useOrders() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: orderKeys.list(session?.user?.id, session?.accessToken),
    queryFn: () => getOrders({ per_page: 50 }, session?.accessToken),
    enabled: status === 'authenticated' && !!session?.accessToken,
    staleTime: 30 * 1000,
  });
}
