export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (userId?: string) => [...orderKeys.lists(), userId] as const,
};
