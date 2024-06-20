"use client";

import ContentfulContentProvider from "@/contexts/contentful";
import LivePreviewProvider from "@/contexts/live-preview";
import MuiProvider from "@/contexts/mui";
import ReactQueryProvider from "@/contexts/react-query";
import type { ParamsData } from "@/types/page";

export type ProvidersProps = ParamsData;

/**
 * Renders the Providers component.
 * @param {ProvidersProps} props - The component props.
 * @returns The rendered Providers component.
 */
const Providers = ({ locale, children }: ProvidersProps) => {
  return (
    <ContentfulContentProvider locale={locale}>
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
