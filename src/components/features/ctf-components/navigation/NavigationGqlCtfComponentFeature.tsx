import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import { useContentfulContext } from "@/hooks/contentful";
import type { WithAny } from "@/types/common";

import { useCtfNavigationQuery } from "./__generated/navigation-ctf-component-feature.generated";
import NavigationCtfComponentFeature from "./NavigationCtfComponentFeature";

export type NavigationGqlCtfComponentFeatureProps = WithAny;

/**
 * Renders the navigation `graphql` `contentful` feature component.
 * @param {NavigationGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const NavigationGqlCtfComponentFeature = (
  props: NavigationGqlCtfComponentFeatureProps
) => {
  const { ...rest } = props;

  const { locale, previewActive } = useContentfulContext();
  const { data, isLoading } = useCtfNavigationQuery({
    locale,
    preview: previewActive,
  });
  const navigationMenuCollection = useContentfulLiveUpdates(
    data?.navigationMenuCollection &&
      Object.keys(data?.navigationMenuCollection)?.length > 0
      ? data.navigationMenuCollection
      : null
  );

  if (!navigationMenuCollection || isLoading) return null;

  return (
    <NavigationCtfComponentFeature {...navigationMenuCollection} {...rest} />
  );
};

NavigationGqlCtfComponentFeature.displayName =
  "NavigationGqlCtfComponentFeature";

export default NavigationGqlCtfComponentFeature;
