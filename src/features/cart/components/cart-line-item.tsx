'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  useIncreaseCartItem,
  useDecreaseCartItem,
  useRemoveCartItem,
} from '@/hooks/mutations/cart';
import type { CartItem } from '@/types';

type CartLineItemProps = {
  item: CartItem;
};

function CartLineItemComponent({ item }: CartLineItemProps) {
  const { mutate: increaseItem, isPending: increasing } = useIncreaseCartItem();
  const { mutate: decreaseItem, isPending: decreasing } = useDecreaseCartItem();
  const { mutate: removeItem, isPending: removing } = useRemoveCartItem();

  const mutating = increasing || decreasing || removing;
  const maxQuantity = Math.max(0, item.stock ?? 0);
  const atMax = item.quantity >= maxQuantity;

  const handleIncrease = () => {
    if (!item.cartItemId || atMax) return;
    increaseItem(item.cartItemId);
  };

  const handleDecrease = () => {
    if (!item.cartItemId) return;
    if (item.quantity <= 1) {
      removeItem(item.cartItemId);
      return;
    }
    decreaseItem(item.cartItemId);
  };

  const handleRemove = () => {
    if (!item.cartItemId) return;
    removeItem(item.cartItemId);
  };

  return (
    <div className="flex gap-4 rounded-xl border bg-card p-4">
      <Link
        href={`/product/${item.id}`}
        className="relative size-24 flex-shrink-0 overflow-hidden rounded-lg"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-4">
          <div>
            <Link
              href={`/product/${item.id}`}
              className="line-clamp-1 font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            disabled={mutating}
            onClick={handleRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded-lg border">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              disabled={mutating}
              onClick={handleDecrease}
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              disabled={mutating || atMax}
              onClick={handleIncrease}
            >
              <Plus className="size-3" />
            </Button>
          </div>

          <span className="font-semibold">
            {formatPrice(parseFloat(item.price) * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

function areEqual(prev: CartLineItemProps, next: CartLineItemProps) {
  const a = prev.item;
  const b = next.item;
  return (
    a === b ||
    (a.cartItemId === b.cartItemId &&
      a.quantity === b.quantity &&
      a.price === b.price &&
      a.stock === b.stock &&
      a.name === b.name &&
      a.image === b.image &&
      a.category === b.category)
  );
}

export const CartLineItem = memo(CartLineItemComponent, areEqual);
