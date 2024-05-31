"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { Container } from "@mui/material";
import Head from "next/head";

import { EntryNotFoundErrorFeature } from "@/components/features/errors/entry-not-found";
import type { WithAny } from "@/types/common";

import { useCtfProductQuery } from "./__generated/product-ctf-component-feature.generated";
import ProductCtfComponentFeature from "./ProductCtfComponentFeature";

export type ProductGqlCtfComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview?: boolean;
};

/**
 * Renders the product `graphql` `contentful` feature component.
 * @param {ProductGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const ProductGqlCtfComponentFeature = (
  props: ProductGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, ...rest } = props;

  const { isLoading, data } = useCtfProductQuery({
    id,
    locale,
    preview,
  });
  const topicProduct = useContentfulLiveUpdates(
    data?.topicProduct && Object.keys(data?.topicProduct)?.length > 0
      ? data.topicProduct
      : null
  );

  if (!data || isLoading) {
    return null;
  }

  if (!topicProduct) {
    return (
      <Container>
        <EntryNotFoundErrorFeature />
      </Container>
    );
  }

  return (
    <>
      {topicProduct?.featuredImage?.url &&
        topicProduct?.featuredImage?.url?.length > 0 && (
          <Head>
            <meta
              key="og:image"
              property="og:image"
              content={`${topicProduct.featuredImage.url}?w=1200&h=630&f=faces&fit=fill`}
            />
          </Head>
        )}

      <ProductCtfComponentFeature {...topicProduct} {...rest} />
    </>
  );
};

ProductGqlCtfComponentFeature.displayName = "ProductGqlCtfComponentFeature";

export default ProductGqlCtfComponentFeature;
