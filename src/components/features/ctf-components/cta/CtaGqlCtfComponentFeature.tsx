import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { WithAny } from "@/types/common";

import { useCtfCtaQuery } from "./__generated/cta-ctf-component-feature.generated";
import CtaCtfComponentFeature from "./CtaCtfComponentFeature";

export type CtaGqlCtlComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview: boolean;
};

/**
 * Renders the CTA `graphql` `contentful` feature component.
 * @param {CtaGqlCtlComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const CtaGqlCtfComponentFeature = (props: CtaGqlCtlComponentFeatureProps) => {
  const { id, locale, preview, ...rest } = props;

  const { data, isLoading } = useCtfCtaQuery({
    id,
    locale,
    preview,
  });
  const componentCta = useContentfulLiveUpdates(
    data?.componentCta && Object.keys(data?.componentCta)?.length > 0
      ? data.componentCta
      : null
  );

  if (isLoading || !componentCta) {
    return null;
  }

  return <CtaCtfComponentFeature {...componentCta} {...rest} />;
};

CtaGqlCtfComponentFeature.displayName = "CtaGqlCtfComponentFeature";

export default CtaGqlCtfComponentFeature;
