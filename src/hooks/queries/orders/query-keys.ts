export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (userId?: string, accessToken?: string) =>
    [...orderKeys.lists(), userId, accessToken] as const,
};
