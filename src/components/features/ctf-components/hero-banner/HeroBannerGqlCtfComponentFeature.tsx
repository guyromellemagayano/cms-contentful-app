"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { WithAny } from "@/types/common";

import { useCtfHeroBannerQuery } from "./__generated/hero-banner-ctf-component-feature.generated";
import HeroBannerCtfComponentFeature from "./HeroBannerCtfComponentFeature";

export type HeroBannerGqlCtfComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview: boolean;
};

/**
 * Renders the hero banner `graphql` `contentful` feature component.
 * @param {HeroBannerGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const HeroBannerGqlCtfComponentFeature = (
  props: HeroBannerGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, ...rest } = props;

  const { data, isLoading } = useCtfHeroBannerQuery({
    id,
    locale,
    preview,
  });
  const componentHeroBanner = useContentfulLiveUpdates(
    data?.componentHeroBanner &&
      Object.keys(data?.componentHeroBanner)?.length > 0
      ? data.componentHeroBanner
      : null
  );

  if (!componentHeroBanner || isLoading) return null;

  return <HeroBannerCtfComponentFeature {...componentHeroBanner} {...rest} />;
};

HeroBannerGqlCtfComponentFeature.displayName =
  "HeroBannerGqlCtfComponentFeature";

export default HeroBannerGqlCtfComponentFeature;
