/**
 * API Response Types for Categories
 */

import type { ApiProduct } from "../products/types";

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  parent_id: number | null;
  products_count?: number;
  products?: ApiProduct[]; // Only present when fetching categories with products
}

export interface ApiCategoriesResponse {
  data: ApiCategory[];
}

