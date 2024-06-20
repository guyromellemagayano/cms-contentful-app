"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import { useContentfulContext } from "@/hooks/contentful";
import type { WithAny } from "@/types/common";

import FooterCtfComponentFeature from "./FooterCtfComponentFeature";
import { useCtfFooterQuery } from "./__generated/footer-ctf-component-feature.generated";

export type FooterGqlCtfComponentFeatureProps = WithAny;

/**
 * Renders the footer `graphql` `contentful` feature component.
 * @param {FooterGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component
 */
const FooterGqlCtfComponentFeature = (
  props: FooterGqlCtfComponentFeatureProps
) => {
  const { locale, previewActive } = useContentfulContext();
  const { data, isLoading } = useCtfFooterQuery({
    locale,
    preview: previewActive,
  });
  const footerMenuCollection = useContentfulLiveUpdates(
    data?.footerMenuCollection &&
      Object.keys(data?.footerMenuCollection)?.length > 0
      ? data.footerMenuCollection
      : null
  );

  if (!footerMenuCollection || isLoading) return null;

  return <FooterCtfComponentFeature {...footerMenuCollection} {...props} />;
};

FooterGqlCtfComponentFeature.displayName = "FooterGqlCtfComponentFeature";

export default FooterGqlCtfComponentFeature;
