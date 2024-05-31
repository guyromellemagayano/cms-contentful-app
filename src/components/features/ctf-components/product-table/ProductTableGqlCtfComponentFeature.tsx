import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { Container } from "@mui/material";

import { EntryNotFoundErrorFeature } from "@/components/features/errors/entry-not-found";
import type { WithAny } from "@/types/common";

import ProductTableCtfComponentFeature from "./ProductTableCtfComponentFeature";
import { useCtfProductTableQuery } from "./__generated/product-table-ctf-component-feature.generated";

export type ProductTableGqlCtfComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview?: boolean;
};

/**
 * Renders the product table `graphql` `contentful` feature component.
 * @param {ProductTableGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const ProductTableGqlCtfComponentFeature = (
  props: ProductTableGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, ...rest } = props;

  const { isLoading, data } = useCtfProductTableQuery({
    id,
    locale,
    preview,
  });
  const componentProductTable = useContentfulLiveUpdates(
    data?.componentProductTable &&
      Object.keys(data?.componentProductTable)?.length > 0
      ? data.componentProductTable
      : null
  );

  if (isLoading || !componentProductTable) {
    return null;
  }

  if (!componentProductTable) {
    return (
      <Container>
        <EntryNotFoundErrorFeature />
      </Container>
    );
  }

  return (
    <ProductTableCtfComponentFeature {...componentProductTable} {...rest} />
  );
};

ProductTableGqlCtfComponentFeature.displayName =
  "ProductTableGqlCtfComponentFeature";

export default ProductTableGqlCtfComponentFeature;
