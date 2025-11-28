'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * TanStack Query provider for the application
 * Wraps children with QueryClientProvider for server state management
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Refetch when window regains focus (user returns to tab)
            refetchOnWindowFocus: true,
            // Keep data in cache for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Retry failed requests once
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
