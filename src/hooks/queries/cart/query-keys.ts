export const cartKeys = {
  all: ['cart'] as const,
  lists: () => [...cartKeys.all, 'list'] as const,
  list: (scope?: string | null) => [...cartKeys.lists(), scope ?? 'guest'] as const,
};
