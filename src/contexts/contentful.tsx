"use client";

import { createContext } from "react";

import { useSearchParams } from "next/navigation";

import { CONTENTFUL_CONFIG } from "@/configs/contentful";
import { defaultLocale } from "@/configs/next-intl";
import type { ParamsData } from "@/types/page";

export type ContentfulContextValueProps = {
  locale: string;
  spaceIds: {
    main: string;
  };
  previewActive: boolean;
};

export const contentfulContextValues = {
  locale: defaultLocale,
  spaceIds: {
    main: CONTENTFUL_CONFIG.contentful.space_id,
  },
  previewActive: false,
} as ContentfulContextValueProps;

export const ContentfulContext = createContext<ContentfulContextValueProps>(
  contentfulContextValues
);

export type ContentfulContentProviderProps = ParamsData;

/**
 * Provides the Contentful content to the application.
 * @param children - The child components to be wrapped by the ContentfulContentProvider.
 * @returns The rendered `ContentfulContentProvider` component.
 */
const ContentfulContentProvider = ({
  locale,
  children,
}: ContentfulContentProviderProps) => {
  const localeCheck = locale && locale?.length > 0 ? locale : defaultLocale;
  const searchParams = useSearchParams();
  const previewActive = !!searchParams.get("preview");

  return (
    <ContentfulContext.Provider
      value={{
        locale: localeCheck,
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
