import type { CartItem } from '@/types';
import type { ApiCartItem, ApiCartResponse } from './types';
import { transformApiProduct } from '../products/transformers';

/**
 * Transform API cart item to frontend CartItem type
 */
export function transformApiCartItem(apiCartItem: ApiCartItem): CartItem {
  if (!apiCartItem.product) {
    throw new Error('Product data is missing in cart item');
  }

  // Cart lines often include variant separately from product
  const productWithVariant = {
    ...apiCartItem.product,
    variant: apiCartItem.variant ?? apiCartItem.product.variant,
  };

  const product = transformApiProduct(productWithVariant);
  const linePrice =
    apiCartItem.price != null ? String(apiCartItem.price) : product.price;

  return {
    ...product,
    price: linePrice,
    cartItemId: apiCartItem.id,
    quantity: apiCartItem.quantity,
    variantId: apiCartItem.variant?.id ?? product.variantId,
  };
}

/**
 * Transform API cart response to frontend cart items
 * API shape: { data: { id, items: [...], subtotal, total, ... } }
 */
export function transformApiCartResponse(
  apiCartResponse: ApiCartResponse,
): CartItem[] {
  const items = apiCartResponse?.data?.items;

  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item?.product)
    .map(transformApiCartItem);
}
