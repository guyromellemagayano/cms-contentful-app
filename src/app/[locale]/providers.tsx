"use client";

import ContentfulContentProvider from "@/contexts/contentful";
import LivePreviewProvider from "@/contexts/live-preview";
import MuiProvider from "@/contexts/mui";
import ReactQueryProvider from "@/contexts/react-query";
// import { useContentfulContext } from "@/hooks/contentful";
import type { ParamsData } from "@/types/page";

export type ProvidersProps = Pick<ParamsData, "children">;

const Providers = ({ children }: ProvidersProps) => {
  // const { previewActive } = useContentfulContext();

  return (
    <ContentfulContentProvider>
      <LivePreviewProvider>
        <ReactQueryProvider>
          <MuiProvider>{children}</MuiProvider>
        </ReactQueryProvider>
      </LivePreviewProvider>
    </ContentfulContentProvider>
  );
};

Providers.displayName = "Providers";

export default Providers;
