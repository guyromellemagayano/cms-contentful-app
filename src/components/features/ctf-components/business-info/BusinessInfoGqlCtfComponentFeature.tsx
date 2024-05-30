"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { Container } from "@mui/material";
import Head from "next/head";

import { EntryNotFoundErrorFeature } from "@/components/features/errors/entry-not-found";
import { useContentfulContext } from "@/hooks/contentful";
import type { WithAny } from "@/types/common";

import { useCtfBusinessInfoQuery } from "./__generated/business-info-ctf-component-feature.generated";
import BusinessInfoCtfComponentFeature from "./BusinessInfoCtfComponentFeature";

export type BusinessInfoGqlCtfComponentFeatureProps = WithAny & {
  preview?: boolean;
  id: string;
};

/**
 * Renders the business info `graphql` `contentful` feature component.
 * @param {BusinessInfoGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const BusinessInfoGqlCtfComponentFeature = (
  props: BusinessInfoGqlCtfComponentFeatureProps
) => {
  const { id, preview, ...rest } = props;

  const { locale } = useContentfulContext();
  const { data, isLoading } = useCtfBusinessInfoQuery({
    locale,
    id,
    preview,
  });
  const topicBusinessInfo = useContentfulLiveUpdates(
    data?.topicBusinessInfo && Object.keys(data?.topicBusinessInfo)?.length > 0
      ? data.topicBusinessInfo
      : null
  );

  if (!data || isLoading) {
    return null;
  }

  if (!topicBusinessInfo) {
    return (
      <Container {...rest}>
        <EntryNotFoundErrorFeature />
      </Container>
    );
  }

  return (
    <>
      {topicBusinessInfo?.featuredImage?.url &&
        topicBusinessInfo?.featuredImage?.url?.length > 0 && (
          <Head>
            <meta
              key="og:image"
              property="og:image"
              content={`${topicBusinessInfo.featuredImage.url}?w=1200&h=630&f=faces&fit=fill`}
            />
          </Head>
        )}

      <BusinessInfoCtfComponentFeature {...topicBusinessInfo} {...rest} />
    </>
  );
};

BusinessInfoGqlCtfComponentFeature.displayName =
  "BusinessInfoGqlCtfComponentFeature";

export default BusinessInfoGqlCtfComponentFeature;
