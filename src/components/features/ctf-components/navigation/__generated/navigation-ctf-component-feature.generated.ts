import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import type { PageLinkFieldsFragment } from "@/components/features/page-link";
import { PageLinkFieldsFragmentDoc } from "@/components/features/page-link";
import * as Types from "@/libs/__generated/graphql.types";
import { ctfFetcher } from "@/libs/contentful";
import type { MenuGroupFieldsFragment } from "@/libs/shared-fragments/__generated/ctf-menuGroup.generated";
import { MenuGroupFieldsFragmentDoc } from "@/libs/shared-fragments/__generated/ctf-menuGroup.generated";

export type NavigationFieldsFragment = {
  __typename?: "NavigationMenuCollection";
  items: Array<{
    __typename?: "NavigationMenu";
    menuItemsCollection?: {
      __typename?: "NavigationMenuMenuItemsCollection";
      items: Array<{
        __typename: "MenuGroup";
        groupName?: string | null;
        sys: { __typename?: "Sys"; id: string };
        link?: ({ __typename?: "Page" } & PageLinkFieldsFragment) | null;
        children?:
          | ({
              __typename?: "MenuGroupFeaturedPagesCollection";
            } & MenuGroupFieldsFragment)
          | null;
      } | null>;
    } | null;
  } | null>;
};

export type CtfNavigationQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Scalars["String"]["input"]>;
  preview?: Types.InputMaybe<Types.Scalars["Boolean"]["input"]>;
}>;

export type CtfNavigationQuery = {
  __typename?: "Query";
  navigationMenuCollection?:
    | ({ __typename?: "NavigationMenuCollection" } & NavigationFieldsFragment)
    | null;
};

export const NavigationFieldsFragmentDoc = `
  fragment NavigationFields on NavigationMenuCollection {
    items {
      menuItemsCollection {
        items {
          __typename
          sys {
            id
          }
          groupName
          link: groupLink {
            ...PageLinkFields
          }
          children: featuredPagesCollection {
            ...MenuGroupFields
          }
        }
      }
    }
  }
`;

export const CtfNavigationDocument = `
  query CtfNavigation($locale: String, $preview: Boolean) {
    navigationMenuCollection(locale: $locale, preview: $preview, limit: 1) {
      ...NavigationFields
    }
  }
  ${NavigationFieldsFragmentDoc}
  ${PageLinkFieldsFragmentDoc}
  ${MenuGroupFieldsFragmentDoc}
`;

export const useCtfNavigationQuery = <
  TData = CtfNavigationQuery,
  TError = unknown
>(
  variables?: CtfNavigationQueryVariables,
  options?: UseQueryOptions<CtfNavigationQuery, TError, TData>
) =>
  useQuery<CtfNavigationQuery, TError, TData>({
    queryKey: !variables ? ["CtfNavigation"] : ["CtfNavigation", variables],
    queryFn: ctfFetcher<CtfNavigationQuery, CtfNavigationQueryVariables>(
      CtfNavigationDocument,
      variables
    ),
    ...options,
  });

useCtfNavigationQuery.getKey = (variables?: CtfNavigationQueryVariables) =>
  !variables ? ["CtfNavigation"] : ["CtfNavigation", variables];
useCtfNavigationQuery.fetcher = (
  variables?: CtfNavigationQueryVariables,
  options?: RequestInit["headers"]
) =>
  ctfFetcher<CtfNavigationQuery, CtfNavigationQueryVariables>(
    CtfNavigationDocument,
    variables,
    options
  );
