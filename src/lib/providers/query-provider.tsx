"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { handleQueryError } from "@/lib/error-handler";

let ReactQueryDevtools: any = null;
if (process.env.NODE_ENV === "development") {
  try {
    ReactQueryDevtools = require("@tanstack/react-query-devtools").ReactQueryDevtools;
  } catch {
    // Devtools not installed, that's okay
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
            gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer (formerly cacheTime)
            refetchOnWindowFocus: false,
            refetchOnMount: false, // Don't refetch if data is still fresh
            refetchOnReconnect: false,
            retry: 1,
            retryDelay: 1000,
          },
        },
      })
  );

  // Set up global error handlers using cache subscriptions (React Query v5)
  useEffect(() => {
    const handledErrors = new WeakSet();

    // Subscribe to query cache updates - check for errors in updated queries
    const unsubscribeQueries = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === "updated") {
        const query = event.query;
        // Only handle error if query is in error state and hasn't been handled yet
        if (
          query.state.status === "error" &&
          query.state.error &&
          !handledErrors.has(query.state.error)
        ) {
          handledErrors.add(query.state.error);
          handleQueryError(query.state.error, query);
        }
      }
    });

    // Subscribe to mutation cache updates - check for errors in updated mutations
    const unsubscribeMutations = queryClient.getMutationCache().subscribe((event) => {
      if (event?.type === "updated") {
        const mutation = event.mutation;
        // Only handle error if mutation is in error state and hasn't been handled yet
        if (
          mutation.state.status === "error" &&
          mutation.state.error &&
          !handledErrors.has(mutation.state.error)
        ) {
          handledErrors.add(mutation.state.error);
          handleQueryError(mutation.state.error);
        }
      }
    });

    return () => {
      unsubscribeQueries();
      unsubscribeMutations();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {ReactQueryDevtools && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

