"use client";

import { useState } from "react";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useContentfulContext } from "@/hooks/contentful";

import type { ParamsData } from "./layout";

export type ProvidersProps = Pick<ParamsData, "children">;

const Providers = ({ children }: ProvidersProps) => {
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

  const [queryClient] = useState(() => new QueryClient(queryConfig)),
    { previewActive } = useContentfulContext(),
    router = useRouter();

  return children;
};

Providers.displayName = "Providers";

export default Providers;
