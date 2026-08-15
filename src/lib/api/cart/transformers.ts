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
    // You can add selectedColor or other variant info here if needed
    // selectedColor: apiCartItem.variant?.color,
  };
}

/**
 * Transform API cart response to frontend cart items
 */
export function transformApiCartResponse(
  apiCartResponse: ApiCartResponse
): CartItem[] {
  return apiCartResponse.data.map(transformApiCartItem);
}

