import { Box, Container } from "@mui/material";

import { GraphqlErrorShared } from "@/components/shared/graphql-error";
import { PageContainerTemplate } from "@/components/templates/page-container";
import type { WithAny } from "@/types/common";

export type PageGraphqlErrorFeatureProps = WithAny & {
  error: any;
};

/**
 * Renders the page graphql error component feature.
 * @param {PageGraphqlErrorFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageGraphqlErrorFeature = (props: PageGraphqlErrorFeatureProps) => {
  const { error, ...rest } = props;

  return (
    <PageContainerTemplate {...rest}>
      <Container>
        <Box my={12}>
          <GraphqlErrorShared error={error} />
        </Box>
      </Container>
    </PageContainerTemplate>
  );
};

PageGraphqlErrorFeature.displayName = "PageGraphqlErrorFeature";

export default PageGraphqlErrorFeature;
