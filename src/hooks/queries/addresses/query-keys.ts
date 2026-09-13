export const addressKeys = {
  all: ['addresses'] as const,
  lists: () => [...addressKeys.all, 'list'] as const,
  list: (userId?: string) => [...addressKeys.lists(), userId] as const,
  details: () => [...addressKeys.all, 'detail'] as const,
  detail: (id: number) => [...addressKeys.details(), id] as const,
};
