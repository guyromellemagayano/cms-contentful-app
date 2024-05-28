"use client";

import { createContext } from "react";

import { useSearchParams } from "next/navigation";

import { CONTENTFUL_CONFIG } from "@/configs/contentful";
import { WithChildren } from "@/types/common";

export type ContentfulContextValueProps = {
  locale: string;
  spaceIds: {
    main: string;
  };
  previewActive: boolean;
};

export const contentfulContextValues = {
  locale: "en",
  spaceIds: {
    main: CONTENTFUL_CONFIG.contentful.space_id,
  },
  previewActive: false,
} as ContentfulContextValueProps;

export const ContentfulContext = createContext<ContentfulContextValueProps>(
  contentfulContextValues
);

export type ContentfulContentProviderProps = WithChildren;

/**
 * Provides the Contentful content to the application.
 * @param children - The child components to be wrapped by the ContentfulContentProvider.
 * @returns The rendered `ContentfulContentProvider` component.
 */
const ContentfulContentProvider = ({
  children,
}: ContentfulContentProviderProps) => {
  const searchParams = useSearchParams(),
    previewActive = !!searchParams.get("preview");

  return (
    <ContentfulContext.Provider
      value={{
        locale: "en",
        spaceIds: contentfulContextValues.spaceIds,
        previewActive,
      }}
    >
      {children}
    </ContentfulContext.Provider>
  );
};

ContentfulContentProvider.displayName = "ContentfulContentProvider";

export default ContentfulContentProvider;
