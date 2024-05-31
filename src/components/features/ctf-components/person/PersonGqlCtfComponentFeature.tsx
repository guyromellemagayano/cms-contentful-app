import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import type { WithAny } from "@/types/common";

import { useCtfPersonQuery } from "./__generated/person-ctf-component-feature.generated";
import PersonCtfComponentFeature from "./PersonCtfComponentFeature";

export type PersonGqlCtfComponentFeatureProps = WithAny & {
  id: string;
  locale: string;
  preview: boolean;
  previousComponent: string | null;
};

/**
 * Renders the person `graphql` `contentful` feature component.
 * @param {PersonGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const PersonGqlCtfComponentFeature = (
  props: PersonGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, previousComponent, ...rest } = props;

  const { isLoading, data } = useCtfPersonQuery({
    id,
    locale,
    preview,
  });
  const topicPerson = useContentfulLiveUpdates(
    data?.topicPerson && Object.keys(data?.topicPerson)?.length > 0
      ? data.topicPerson
      : null
  );

  if (isLoading || !topicPerson) {
    return null;
  }

  return (
    <PersonCtfComponentFeature
      previousComponent={previousComponent}
      {...topicPerson}
      {...rest}
    />
  );
};

PersonGqlCtfComponentFeature.displayName = "PersonGqlCtfComponentFeature";

export default PersonGqlCtfComponentFeature;
