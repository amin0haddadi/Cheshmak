export const cartKeys = {
  all: ['cart'] as const,
  lists: () => [...cartKeys.all, 'list'] as const,
  list: (scope?: string | null, accessToken?: string | null) =>
    [...cartKeys.lists(), scope ?? 'guest', accessToken ?? null] as const,
};
