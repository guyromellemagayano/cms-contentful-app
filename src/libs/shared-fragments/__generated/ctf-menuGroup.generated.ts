import { PageLinkFieldsFragment } from "@/components/features/page-link";
import * as Types from "@/libs/__generated/graphql.types";

export type MenuGroupFieldsFragment = {
  __typename?: "MenuGroupFeaturedPagesCollection";
  items: Array<({ __typename?: "Page" } & PageLinkFieldsFragment) | null>;
};

export const MenuGroupFieldsFragmentDoc = `
  fragment MenuGroupFields on MenuGroupFeaturedPagesCollection {
    items {
      ...PageLinkFields
    }
  }
`;
