'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Eye, Heart, ShoppingBag } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <div className={cn('group glass-card flex flex-col', className)}>
      {/* Image */}
      <div className='relative z-[1] aspect-[3/4] overflow-hidden'>
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </Link>

        <div className='absolute left-3 top-3 flex flex-col gap-2'>
          {product.isSale && <Badge variant='sale'>Sale</Badge>}
          {product.isNew && <Badge variant='new'>New</Badge>}
        </div>

        <div className='absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100'>
          <Button
            variant='secondary'
            size='icon'
            className='size-7 rounded-full shadow-md text-white'
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                'h-4 w-4',
                isWishlisted && 'fill-red-500 text-red-500',
              )}
            />
          </Button>
          <Link href={`/product/${product.id}`}>
            <Button
              variant='secondary'
              size='icon'
              className='size-9 rounded-full shadow-md text-white'
            >
              <Eye className='size-4' />
            </Button>
          </Link>
        </div>

        <div className='absolute inset-x-3 bottom-3 opacity-0 transition-opacity group-hover:opacity-100'>
          <Button className='w-full shadow-lg' onClick={handleAddToCart}>
            <ShoppingBag className='mx-2 size-4' />
            افزودن به سبد
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className='relative z-[1] space-y-1 px-3 pb-3 pt-2 sm:space-y-2 sm:px-4 sm:pb-4'>
        <p className='text-[10px] uppercase tracking-wider text-primary/70 sm:text-xs'>
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className='line-clamp-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:text-base'>
            {product.name}
          </h3>
        </Link>
        <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
          <span className='text-sm font-semibold text-primary sm:text-base'>
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className='text-xs text-muted-foreground line-through'>
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
