"use client";

import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

import { useContentfulContext } from "@/hooks/contentful";
import { WithChildren } from "@/types/common";

export type LivePreviewProviderProps = WithChildren;

/**
 * Provides live preview functionality for the application.
 * @param children - The child components to render within the live preview provider.
 * @returns The rendered `LivePreviewProvider` component.
 */
const LivePreviewProvider = ({ children }: LivePreviewProviderProps) => {
  const { previewActive, locale } = useContentfulContext();

  return (
    <ContentfulLivePreviewProvider
      locale={locale}
      enableInspectorMode={previewActive}
      enableLiveUpdates={previewActive}
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};

LivePreviewProvider.displayName = "LivePreviewProvider";

export default LivePreviewProvider;
