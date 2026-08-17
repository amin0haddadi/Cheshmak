import type { Product } from "@/types";
import type { ApiProduct, ApiProductVariant } from "./types";

function getProductVariant(
  apiProduct: ApiProduct
): ApiProductVariant | null {
  return (
    apiProduct.variant ??
    apiProduct.cheapestVariant ??
    apiProduct.variants?.[0] ??
    null
  );
}

/**
 * Transform API product to frontend Product type
 */
export function transformApiProduct(apiProduct: ApiProduct): Product {
  const variant = getProductVariant(apiProduct);
  const photos = apiProduct.photos ?? [];
  const defaultPhoto = photos.find((p) => p.is_default) || photos[0];
  const imageGallery = photos.map((p) => p.url);
  const description = apiProduct.description ?? undefined;

  const hasDiscount =
    variant?.discount_price != null &&
    parseFloat(variant.discount_price) < parseFloat(variant.price);

  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    price: (variant?.final_price ?? variant?.price ?? 0).toString(),
    oldPrice: hasDiscount ? variant?.price : undefined,
    image: defaultPhoto?.url || "",
    imageGallery: imageGallery.length > 0 ? imageGallery : undefined,
    category: apiProduct.category?.name ?? "",
    categorySlug: apiProduct.category?.slug,
    isSale: Boolean(hasDiscount),
    isNew: false,
    isStocked: (variant?.stock ?? 0) > 0,
    stock: variant?.stock ?? 0,
    productNumber: variant?.sku,
    variantId: variant?.id,
    description,
    content: description,
  };
}
