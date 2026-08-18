/**
 * Query keys for cart-related queries
 */

export const cartKeys = {
  all: ["cart"] as const,
  lists: () => [...cartKeys.all, "list"] as const,
};
