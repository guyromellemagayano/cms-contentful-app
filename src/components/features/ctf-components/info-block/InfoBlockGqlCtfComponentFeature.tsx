import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { WithAny } from "@/types/common";

import { useCtfInfoBlockQuery } from "./__generated/info-block-ctf-component-feature.generated";
import InfoBlockCtfComponentFeature from "./InfoBlockCtfComponentFeature";

export type InfoBlockGqlCtfComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview: boolean;
  previousComponent: string | null;
};

/**
 * Renders an info block `graphql` `contentful` feature component.
 * @param {InfoBlockGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const InfoBlockGqlCtfComponentFeature = (
  props: InfoBlockGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, previousComponent, ...rest } = props;

  const { isLoading, data } = useCtfInfoBlockQuery({
    id,
    locale,
    preview,
  });
  const componentInfoBlock = useContentfulLiveUpdates(
    data?.componentInfoBlock &&
      Object.keys(data?.componentInfoBlock)?.length > 0
      ? data.componentInfoBlock
      : null
  );

  if (isLoading || !componentInfoBlock) {
    return null;
  }

  return (
    <InfoBlockCtfComponentFeature
      previousComponent={previousComponent}
      {...componentInfoBlock}
      {...rest}
    />
  );
};

InfoBlockGqlCtfComponentFeature.displayName = "InfoBlockGqlCtfComponentFeature";

export default InfoBlockGqlCtfComponentFeature;
