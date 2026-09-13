export const addressKeys = {
  all: ['addresses'] as const,
  lists: () => [...addressKeys.all, 'list'] as const,
  list: (userId?: string, accessToken?: string) =>
    [...addressKeys.lists(), userId, accessToken] as const,
  details: () => [...addressKeys.all, 'detail'] as const,
  detail: (id: number, accessToken?: string) =>
    [...addressKeys.details(), id, accessToken] as const,
};
