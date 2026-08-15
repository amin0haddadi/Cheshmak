/**
 * API Response Types for Cart
 */

import type { ApiProduct } from "../products/types";

export interface ApiCartItem {
  id: number;
  product_id: number;
  quantity: number;
  product?: ApiProduct;
  variant_id?: number;
  price?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiCartResponse {
  data: ApiCartItem[];
  total?: number;
  subtotal?: number;
  shipping?: number;
}

