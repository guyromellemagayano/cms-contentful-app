import { ReactNode } from "react";

import { LinkShared, LinkSharedProps } from "@/components/shared/link";

import type { PageLinkFieldsFragment } from "./__generated/page-link-feature.generated";

export type PageLinkFeatureProps = LinkSharedProps & {
  page: PageLinkFieldsFragment;
  render?: (pathname?: string) => ReactNode;
};

/**
 * Renders the page link feature component.
 * @param {PageLinkFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageLinkFeature = (props: PageLinkFeatureProps) => {
  const {
    page,
    children,
    render,
    className,
    onClick,
    withoutMaterial,
    underline,
    isButton,
    variant,
    size,
    color,
    endIcon,
    urlParams,
    ...rest
  } = props;

  const pathname = page?.slug && page?.slug?.length > 0 ? `/${page.slug}` : ``;
  const linkProps = {
    href: pathname,
    className,
    onClick,
    withoutMaterial,
    underline,
    isButton: isButton || false,
    variant,
    size,
    color,
    endIcon,
    urlParams,
  };

  return (
    <LinkShared {...linkProps} {...rest}>
      {render && pathname?.length > 0 ? render(pathname) : children}
    </LinkShared>
  );
};

PageLinkFeature.displayName = "PageLinkFeature";

export default PageLinkFeature;
