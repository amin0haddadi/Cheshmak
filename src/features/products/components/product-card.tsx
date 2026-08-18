"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types";

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
    <div className={cn("group glass-card-panel flex flex-col", className)}>
      {/* Image */}
      <div className="relative z-[1] aspect-[3/4] overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isSale && <Badge variant="sale">Sale</Badge>}
          {product.isNew && <Badge variant="new">New</Badge>}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-md"
            onClick={handleToggleWishlist}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isWishlisted && "fill-red-500 text-red-500"
              )}
            />
          </Button>
          <Link href={`/product/${product.id}`}>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-md"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full shadow-lg" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4 mr-2 ml-2" />
            افزودن به سبد
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="relative z-[1] space-y-1 sm:space-y-2 px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
        <p className="text-[10px] sm:text-xs text-primary/70 uppercase tracking-wider">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm sm:text-base font-medium text-primary hover:text-primary/80 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <span className="text-sm sm:text-base font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
