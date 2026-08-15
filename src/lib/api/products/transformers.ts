import type { Product } from "@/types";
import type { ApiProduct } from "./types";

/**
 * Transform API product to frontend Product type
 */
export function transformApiProduct(apiProduct: ApiProduct): Product {
  // Get the default photo or first photo
  const defaultPhoto = apiProduct.photos.find((p) => p.is_default) || apiProduct.photos[0];
  const imageGallery = apiProduct.photos.map((p) => p.url);

  // Calculate if product is on sale
  const isSale = apiProduct.variant.discount_price !== null && 
                  parseFloat(apiProduct.variant.discount_price) < parseFloat(apiProduct.variant.price);

  // Format prices
  const price = apiProduct.variant.final_price.toString();
  const oldPrice = apiProduct.variant.discount_price 
    ? apiProduct.variant.price 
    : undefined;

  return {
    id: apiProduct.id.toString(),
    name: apiProduct.name,
    price: price,
    oldPrice: oldPrice,
    image: defaultPhoto?.url || "",
    imageGallery: imageGallery.length > 0 ? imageGallery : undefined,
    category: "", // Will be set if API provides category
    isSale: isSale,
    isNew: false, // Can be calculated based on created_at if needed
    isStocked: apiProduct.variant.stock > 0,
    productNumber: apiProduct.variant.sku,
    variantId: apiProduct.variant.id, // Store variant ID for cart operations
    description: apiProduct.description,
    // Additional fields from variant can be stored if needed
  };
}

