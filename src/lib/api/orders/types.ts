/**
 * API types for orders & payment initiation
 */

export interface ApiOrderItem {
  id?: number;
  product_id?: number;
  variant_id?: number;
  quantity: number;
  price?: string | number;
  product?: {
    id: number;
    name: string;
  };
}

export interface ApiOrder {
  id: number;
  status: string;
  payment_status?: string | null;
  total?: string | number | null;
  subtotal?: string | number | null;
  items_count?: number;
  items?: ApiOrderItem[];
  created_at?: string;
  updated_at?: string;
  reference_id?: string | null;
}

export interface ApiOrdersListResponse {
  data: ApiOrder[];
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
  links?: unknown;
}

export interface CreateOrderRequest {
  address_id: number;
}

export interface PaymentGatewayPayload {
  id?: number;
  status?: string;
  transaction_id?: string;
  action?: string;
  method?: string;
  inputs?: unknown[];
  redirect_url?: string;
  payment_url?: string;
  url?: string;
}

export interface PaymentInitPayload {
  order?: ApiOrder;
  payment?: PaymentGatewayPayload;
  redirect_url?: string;
  payment_url?: string;
  url?: string;
  message?: string;
}

export type CreateOrderResponse = PaymentInitPayload & {
  data?: PaymentInitPayload & ApiOrder;
};

export type PayOrderResponse = PaymentInitPayload & {
  data?: ApiOrder & PaymentInitPayload;
};
