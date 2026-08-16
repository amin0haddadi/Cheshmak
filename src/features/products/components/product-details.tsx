"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useProducts } from "@/hooks/queries/products";
import { ProductCard } from "@/features/products/components/product-card";
import type { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  // Fetch related products from the same category
  const { data: relatedProductsData } = useProducts({
    "filter[category.slug]": product.category,
    per_page: 5, // Get 5 to filter out current product
  });

  const isWishlisted = isInWishlist(product.id);
  const images = product.imageGallery || [product.image];
  const relatedProducts = relatedProductsData?.products
    ? relatedProductsData.products
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
  };

  const averageRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
        product.reviews.length
      : 0;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "خانه", href: "/" },
          { label: "فروشگاه", href: "/shop" },
          { label: product.name },
        ]}
      />
      <div className="py-8 lg:py-12">
        <div className="container-custom">
        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={() =>
                      setSelectedImage(
                        selectedImage === 0
                          ? images.length - 1
                          : selectedImage - 1
                      )
                    }
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                    onClick={() =>
                      setSelectedImage(
                        selectedImage === images.length - 1
                          ? 0
                          : selectedImage + 1
                      )
                    }
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors",
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isSale && <Badge variant="sale">حراج</Badge>}
              {product.isNew && <Badge variant="new">جدید</Badge>}
            </div>

            {/* Title & Rating */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              {averageRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-4 w-4",
                          star <= averageRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews?.length} نظر)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.content}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="font-medium mb-3">رنگ</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor === color
                          ? "border-primary scale-110"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-stretch gap-2">
              <div className="flex items-center border rounded-lg shrink-0 h-11">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-10 shrink-0"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 sm:w-12 text-center font-medium tabular-nums">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-11 w-10 shrink-0"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                className="flex-1 h-11 min-w-0 px-3 text-sm sm:px-8 sm:text-base"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                افزودن به سبد
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 shrink-0"
                onClick={() => toggleItem(product)}
                aria-label="افزودن به علاقه‌مندی‌ها"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isWishlisted && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">شناسه:</span>{" "}
                {product.productNumber}
              </p>
              <p>
                <span className="text-muted-foreground">دسته‌بندی:</span>{" "}
                <Link
                  href={`/shop?category=${product.category}`}
                  className="hover:text-primary"
                >
                  {product.category}
                </Link>
              </p>
              <p>
                <span className="text-muted-foreground">موجودی:</span>{" "}
                {product.isStocked ? (
                  <span className="text-green-600">موجود</span>
                ) : (
                  <span className="text-red-600">ناموجود</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" dir="rtl" className="mb-16">
          <div className="flex w-full justify-start">
            <TabsList>
              <TabsTrigger value="description">توضیحات</TabsTrigger>
              <TabsTrigger value="reviews">
                نظرات ({product.reviews?.length || 0})
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="description" className="mt-6 text-start">
            <p className="text-muted-foreground max-w-3xl">
              {product.description || product.content}
            </p>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6 text-start">
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6 max-w-3xl">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={review.author.image}
                          alt={review.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.author.name}</h4>
                          <span className="text-sm text-muted-foreground">
                            {review.reviewDate}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-4 w-4",
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">هنوز نظری ثبت نشده است.</p>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">محصولات مرتبط</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

