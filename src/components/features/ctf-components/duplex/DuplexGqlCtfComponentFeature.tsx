import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import { useCtfDuplexQuery } from "./__generated/duplex-ctf-component-feature.generated";
import DuplexCtfComponentFeature from "./DuplexCtfComponentFeature";

export type DuplexGqlCtfComponentFeatureProps = {
  id: string;
  locale: string;
  preview: boolean;
};

/**
 * Renders the duplex `graphql` feature component for the `contentful` API to consume
 * @param {DuplexGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const DuplexGqlCtfComponentFeature = (
  props: DuplexGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props;

  const { data, isLoading } = useCtfDuplexQuery({
    id,
    locale,
    preview,
  });
  const componentDuplex = useContentfulLiveUpdates(
    data?.componentDuplex && Object.keys(data?.componentDuplex)?.length > 0
      ? data.componentDuplex
      : null
  );

  if (isLoading || !componentDuplex) {
    return null;
  }

  return <DuplexCtfComponentFeature {...componentDuplex} />;
};

DuplexGqlCtfComponentFeature.displayName = "DuplexGqlCtfComponentFeature";

export default DuplexGqlCtfComponentFeature;
