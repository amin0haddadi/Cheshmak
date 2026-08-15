/**
 * Query keys for cart-related queries
 */

export const cartKeys = {
  all: ["cart"] as const,
  list: () => [...cartKeys.all, "list"] as const,
};

