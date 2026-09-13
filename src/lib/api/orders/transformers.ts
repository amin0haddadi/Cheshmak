import type {
  ApiOrder,
  CreateOrderResponse,
  PayOrderResponse,
} from './types';

/**
 * Extract gateway redirect URL from place-order / pay responses.
 */
export function extractPaymentRedirectUrl(
  response: CreateOrderResponse | PayOrderResponse | null | undefined,
): string | null {
  if (!response || typeof response !== 'object') {
    return null;
  }

  const payment = response.payment;
  const nestedPayment = response.data?.payment;

  const candidates = [
    // Actual pay API shape: { payment: { redirect_url, action } }
    payment?.redirect_url,
    payment?.action,
    payment?.payment_url,
    payment?.url,
    nestedPayment?.redirect_url,
    nestedPayment?.action,
    nestedPayment?.payment_url,
    nestedPayment?.url,
    response.redirect_url,
    response.payment_url,
    response.url,
    response.data?.redirect_url,
    response.data?.payment_url,
    response.data?.url,
  ];

  for (const value of candidates) {
    if (typeof value === 'string' && value.trim()) {
      return resolvePaymentUrl(value.trim());
    }
  }

  return null;
}

/**
 * Extract created order id from POST /orders response.
 */
export function extractOrderId(
  response: CreateOrderResponse | null | undefined,
): number | null {
  if (!response || typeof response !== 'object') {
    return null;
  }

  const candidates: Array<number | string | null | undefined> = [
    response.order?.id,
    response.data?.order?.id,
    (response.data as ApiOrder | undefined)?.id,
    (response as { id?: number | string }).id,
  ];

  for (const value of candidates) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (
      typeof value === 'string' &&
      value.trim() &&
      !Number.isNaN(Number(value))
    ) {
      return Number(value);
    }
  }

  return null;
}

function resolvePaymentUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '';
  if (url.startsWith('/')) {
    try {
      const origin = apiBase ? new URL(apiBase).origin : '';
      if (url.startsWith('/api/')) {
        return `${origin}${url}`;
      }
      if (apiBase.endsWith('/api')) {
        return `${apiBase}${url}`;
      }
      return `${apiBase}${url}`;
    } catch {
      return url;
    }
  }

  return `${apiBase}/${url}`;
}
