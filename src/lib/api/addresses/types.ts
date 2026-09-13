/**
 * API types for addresses
 */

export interface ApiAddress {
  id: number;
  title?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  address_line_1: string;
  address_line_2?: string | null;
  city_id: number;
  city?: {
    id: number;
    name: string;
  } | null;
  postal_code: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApiAddressesResponse {
  data: ApiAddress[];
}

export interface CreateAddressRequest {
  title?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address_line_1: string;
  address_line_2?: string;
  city_id: number;
  postal_code: string;
  is_default?: boolean;
}

export type UpdateAddressRequest = Partial<CreateAddressRequest>;

export interface CreateAddressResponse {
  data: ApiAddress;
  message?: string;
}

export interface ApiAddressResponse {
  data: ApiAddress;
  message?: string;
}
