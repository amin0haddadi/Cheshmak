/**
 * API Response Types for Cart
 */

import type { ApiProduct, ApiProductVariant } from '../products/types';

export interface ApiCartItem {
  id: number;
  product_id?: number;
  quantity: number;
  product?: ApiProduct;
  variant?: ApiProductVariant;
  variant_id?: number;
  price?: string | number;
  subtotal?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ApiCartData {
  id: number | null;
  items: ApiCartItem[];
  subtotal: number;
  discount: number | string | null;
  total: number;
  items_count: number;
}

export interface ApiCartResponse {
  data: ApiCartData;
}
