"use client";

import { ComponentResolverShared } from "@/components/shared/component-resolver";
import { PageContainerTemplate } from "@/components/templates/page-container";
import { LayoutContext, layoutContextValues } from "@/contexts/layout";
import type { WithAny } from "@/types/common";

import type { CtfPageFieldsFragment } from "./__generated/page-ctf-component-feature.generated";

export type PageCtfComponentFeatureProps = WithAny & CtfPageFieldsFragment;

/**
 * Renders the page `contentful` feature component.
 * @param {PageCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const PageCtfComponentFeature = (props: PageCtfComponentFeatureProps) => {
  const { topSectionCollection, pageContent, extraSectionCollection, ...rest } =
    props;

  const topSection =
    topSectionCollection?.items?.filter((it) => !!it) || undefined;
  const content = pageContent;
  const extraSection =
    extraSectionCollection?.items?.filter((it) => !!it) || undefined;

  const layoutConfig = {
    ...layoutContextValues,
    containerWidth: 1262,
  };

  return (
    <PageContainerTemplate {...rest}>
      {topSection?.map((entry) => (
        <LayoutContext.Provider value={layoutConfig} key={entry!.sys.id}>
          <ComponentResolverShared componentProps={entry!} />
        </LayoutContext.Provider>
      ))}

      {content && Object.keys(content)?.length > 0 && (
        <LayoutContext.Provider
          value={layoutContextValues}
          key={content.sys?.id}
        >
          <ComponentResolverShared componentProps={content} />
        </LayoutContext.Provider>
      )}

      {extraSection?.map((entry) => (
        <LayoutContext.Provider value={layoutConfig} key={entry!.sys.id}>
          <ComponentResolverShared componentProps={entry!} />
        </LayoutContext.Provider>
      ))}
    </PageContainerTemplate>
  );
};

PageCtfComponentFeature.displayName = "PageCtfComponentFeature";

export default PageCtfComponentFeature;
