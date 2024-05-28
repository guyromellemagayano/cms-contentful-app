"use client";

import { useState } from "react";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useRouter } from "next/navigation";

import { WithChildren } from "@/types/common";

export type ReactQueryProviderProps = WithChildren;

/**
 * `ReactQueryProvider` component provides a context for managing queries and caching data using React Query library.
 * @param children - The child components.
 * @returns The rendered `ReactQueryProvider` component.
 */
const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const router = useRouter();
  const queryConfig = {
    queryCache: new QueryCache({
      onError: () => {
        router.push("/404");
      },
    }),

    defaultOptions: {
      queries: {
        retry: false,
        refetchOnMount: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
      },
    },
  };
  const [queryClient] = useState(() => new QueryClient(queryConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactQueryProvider.displayName = "ReactQueryProvider";

export default ReactQueryProvider;
