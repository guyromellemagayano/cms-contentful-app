"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import { useCtfTextBlockQuery } from "./__generated/text-block-ctf-component-feature.generated";
import TextBlockCtfComponentFeature from "./TextBlockCtfComponentFeature";

export type TextBlockGqlCtfComponentFeatureProps = {
  id: string;
  locale: string;
  preview: boolean;
};

/**
 * Renders the text block `graphql` `contentful` feature component.
 * @param {TextBlockGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const TextBlockGqlCtfComponentFeature = (
  props: TextBlockGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, ...rest } = props;

  const { isLoading, data } = useCtfTextBlockQuery({
    id,
    locale,
    preview,
  });
  const componentTextBlock = useContentfulLiveUpdates(
    data?.componentTextBlock &&
      Object.keys(data?.componentTextBlock)?.length > 0
      ? data.componentTextBlock
      : null
  );

  if (isLoading || !componentTextBlock) {
    return null;
  }

  return <TextBlockCtfComponentFeature {...componentTextBlock} {...rest} />;
};

TextBlockGqlCtfComponentFeature.displayName = "TextBlockGqlCtfComponentFeature";

export default TextBlockGqlCtfComponentFeature;
