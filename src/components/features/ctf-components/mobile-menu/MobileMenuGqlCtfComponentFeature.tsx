import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import { useCtfNavigationQuery } from "@/components/features/ctf-components/navigation";
import { useContentfulContext } from "@/hooks/contentful";
import type { WithAny } from "@/types/common";

import MobileMenuCtfComponentFeature from "./MobileMenuCtfComponentFeature";

export type MobileMenuGqlCtfComponentFeatureProps = WithAny & {
  isOpen?: boolean;
  onOpenChange: (isOpen: boolean) => any;
};

/**
 * Renders the mobile menu `graphql` `contentful` feature component.
 * @param {MobileMenuGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const MobileMenuGqlCtfComponentFeature = (
  props: MobileMenuGqlCtfComponentFeatureProps
) => {
  const { locale, previewActive } = useContentfulContext();
  const { data, isLoading } = useCtfNavigationQuery({
    locale,
    preview: previewActive,
  });
  const navigationMenuCollection = useContentfulLiveUpdates(
    data?.navigationMenuCollection &&
      Object.keys(data.navigationMenuCollection)?.length > 0
      ? data.navigationMenuCollection
      : null
  );

  if (!navigationMenuCollection || isLoading) return null;

  return (
    <MobileMenuCtfComponentFeature {...navigationMenuCollection} {...props} />
  );
};

MobileMenuGqlCtfComponentFeature.displayName =
  "MobileMenuGqlCtfComponentFeature";

export default MobileMenuGqlCtfComponentFeature;
