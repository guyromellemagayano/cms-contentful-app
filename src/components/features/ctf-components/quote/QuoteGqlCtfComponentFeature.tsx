"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { WithAny } from "@/types/common";

import { useCtfQuoteQuery } from "./__generated/quote-ctf-component-feature.generated";
import QuoteCtfComponentFeature from "./QuoteCtfComponentFeature";

export type QuoteGqlCtfComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview: boolean;
};

/**
 * Renders the quote `graphql` `contentful` feature component.
 * @param { QuoteGqlCtfComponentFeatureProps } props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const QuoteGqlCtfComponentFeature = (
  props: QuoteGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props;

  const { isLoading, data } = useCtfQuoteQuery({
    id,
    locale,
    preview,
  });
  const componentQuote = useContentfulLiveUpdates(
    data?.componentQuote && Object.keys(data?.componentQuote)?.length > 0
      ? data.componentQuote
      : null
  );

  if (isLoading || !componentQuote) {
    return null;
  }

  return <QuoteCtfComponentFeature {...componentQuote} />;
};

QuoteGqlCtfComponentFeature.displayName = "QuoteGqlCtfComponentFeature";

export default QuoteGqlCtfComponentFeature;
