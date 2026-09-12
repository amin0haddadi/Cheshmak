import type { CartItem } from "@/types";
import type { ApiCartItem, ApiCartResponse } from "./types";
import { transformApiProduct } from "../products/transformers";

/**
 * Transform API cart item to frontend CartItem type
 */
export function transformApiCartItem(apiCartItem: ApiCartItem): CartItem {
  if (!apiCartItem.product) {
    throw new Error("Product data is missing in cart item");
  }

  const product = transformApiProduct(apiCartItem.product);

  return {
    ...product,
    quantity: apiCartItem.quantity,
  };
}

/**
 * Transform API cart response to frontend cart items
 * API shape: { data: { id, items: [...], subtotal, total, ... } }
 */
export function transformApiCartResponse(
  apiCartResponse: ApiCartResponse
): CartItem[] {
  const items = apiCartResponse?.data?.items;

  if (!Array.isArray(items)) {
    return [];
  }

  return items.map(transformApiCartItem);
}
