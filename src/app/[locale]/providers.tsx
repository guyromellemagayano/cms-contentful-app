"use client";

import ContentfulContentProvider from "@/contexts/contentful";
import LivePreviewProvider from "@/contexts/live-preview";
import MuiProvider from "@/contexts/mui";
import ReactQuery from "@/contexts/react-query";
// import { useContentfulContext } from "@/hooks/contentful";
import type { ParamsData } from "@/types/page";

export type ProvidersProps = Pick<ParamsData, "children">;

const Providers = ({ children }: ProvidersProps) => {
  // const { previewActive } = useContentfulContext();

  return (
    <ContentfulContentProvider>
      <LivePreviewProvider>
        <ReactQuery>
          <MuiProvider>{children}</MuiProvider>
        </ReactQuery>
      </LivePreviewProvider>
    </ContentfulContentProvider>
  );
};

Providers.displayName = "Providers";

export default Providers;
