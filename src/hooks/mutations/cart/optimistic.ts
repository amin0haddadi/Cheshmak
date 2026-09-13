import type { QueryClient, QueryKey } from '@tanstack/react-query';
import type { CartItem } from '@/types';
import { cartKeys } from '@/hooks/queries/cart/query-keys';

type CartSnapshots = [QueryKey, CartItem[] | undefined][];

/**
 * Patch one cart line in cache; other lines keep the same object references
 * so memoized row components can skip re-render.
 */
export function patchCartItemInCache(
  queryClient: QueryClient,
  cartItemId: number,
  updater: (item: CartItem) => CartItem | null,
): CartSnapshots {
  const snapshots = queryClient.getQueriesData<CartItem[]>({
    queryKey: cartKeys.lists(),
  });

  queryClient.setQueriesData<CartItem[]>(
    { queryKey: cartKeys.lists() },
    (old) => {
      if (!old) return old;

      let changed = false;
      const next: CartItem[] = [];

      for (const item of old) {
        if (item.cartItemId !== cartItemId) {
          next.push(item);
          continue;
        }

        const updated = updater(item);
        changed = true;
        if (updated) next.push(updated);
      }

      return changed ? next : old;
    },
  );

  return snapshots;
}

export function restoreCartSnapshots(
  queryClient: QueryClient,
  snapshots: CartSnapshots,
) {
  for (const [key, data] of snapshots) {
    queryClient.setQueryData(key, data);
  }
}
