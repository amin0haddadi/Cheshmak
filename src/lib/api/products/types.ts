/**
 * API Response Types - matches the actual API structure
 */

export interface ApiProductPhoto {
  id: number;
  url: string;
  is_default: boolean;
}

export interface ApiProductVariant {
  id: number;
  sku: string;
  price: string;
  discount_price: string | null;
  final_price: number;
  stock: number;
  weight: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  photos: ApiProductPhoto[];
  variant: ApiProductVariant;
  created_at: string;
  updated_at: string;
}

export interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ApiProductsResponse {
  data: ApiProduct[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

/**
 * Query parameters for products endpoint
 * Matches the actual API structure with filter[...] prefix
 */
export interface GetProductsParams {
  page?: number;
  per_page?: number;
  "filter[name]"?: string;
  "filter[category_id]"?: number;
  "filter[category.slug]"?: string;
  "filter[min_price]"?: number;
  "filter[max_price]"?: number;
  sort?: string; // name, base_price, created_at, price (use '-' prefix for descending)
  include?: string; // category, brand, variants, attributes, cheapestVariant, mostExpensiveVariant, fixedAttributeOptions
}
