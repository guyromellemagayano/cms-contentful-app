import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import type { PageLinkFieldsFragment } from "@/components/features/page-link";
import { PageLinkFieldsFragmentDoc } from "@/components/features/page-link";
import * as Types from "@/libs/__generated/graphql.types";
import { ctfFetcher } from "@/libs/contentful";

export type RichTextHyperlinkFieldsFragment = {
  __typename?: "Query";
  page?: ({ __typename?: "Page" } & PageLinkFieldsFragment) | null;
};

export type CtfRichTextHyperlinkQueryVariables = Types.Exact<{
  id: Types.Scalars["String"]["input"];
  locale?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  preview?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
}>;

export type CtfRichTextHyperlinkQuery = {
  __typename?: "Query";
} & RichTextHyperlinkFieldsFragment;

export const RichTextHyperlinkFieldsFragmentDoc = `
  fragment RichTextHyperlinkFields on Query {
    page(id: $id, preview: $preview, locale: $locale) {
      ...PageLinkFields
    }
  }
`;

export const CtfRichTextHyperlinkDocument = `
  query CtfRichTextHyperlink($id: String!, $locale: String, $preview: Boolean) {
    ...RichTextHyperlinkFields
  }
  ${RichTextHyperlinkFieldsFragmentDoc}
  ${PageLinkFieldsFragmentDoc}
`;

export const useCtfRichTextHyperlinkQuery = <
  TData = CtfRichTextHyperlinkQuery,
  TError = unknown
>(
  variables: CtfRichTextHyperlinkQueryVariables,
  options?: UseQueryOptions<CtfRichTextHyperlinkQuery, TError, TData>
) => {
  return useQuery<CtfRichTextHyperlinkQuery, TError, TData>({
    queryKey: ["CtfRichTextHyperlink", variables],
    queryFn: ctfFetcher<
      CtfRichTextHyperlinkQuery,
      CtfRichTextHyperlinkQueryVariables
    >(CtfRichTextHyperlinkDocument, variables),
    ...options,
  });
};

useCtfRichTextHyperlinkQuery.getKey = (
  variables: CtfRichTextHyperlinkQueryVariables
) => ["CtfRichTextHyperlink", variables];
useCtfRichTextHyperlinkQuery.fetcher = (
  variables: CtfRichTextHyperlinkQueryVariables,
  options?: RequestInit["headers"]
) =>
  ctfFetcher<CtfRichTextHyperlinkQuery, CtfRichTextHyperlinkQueryVariables>(
    CtfRichTextHyperlinkDocument,
    variables,
    options
  );
