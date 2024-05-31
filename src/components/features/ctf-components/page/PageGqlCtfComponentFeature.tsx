"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import Head from "next/head";

import { PageErrorFeature } from "@/components/features/errors/page-error";
import { CONTENTFUL_CONFIG } from "@/configs/contentful";
import { useContentfulContext } from "@/hooks/contentful";
import { tryGet } from "@/libs/utils";
import type { WithAny } from "@/types/common";

import PageCtfComponentFeature from "./PageCtfComponentFeature";
import { useCtfPageQuery } from "./__generated/page-ctf-component-feature.generated";

export type PageGqlCtfComponentFeatureProps = WithAny & {
  topic?: string;
  slug: string;
};

/**
 * Renders the page `graphql` `contentful` feature component.
 * @param {PageGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `graphql` `contentful` feature component.
 */
const PageGqlCtfComponentFeature = (props: PageGqlCtfComponentFeatureProps) => {
  const { slug: slugFromProps, ...rest } = props;

  const slug = !slugFromProps || slugFromProps === "/" ? "home" : slugFromProps;

  const { previewActive, locale } = useContentfulContext();
  const { isLoading, data } = useCtfPageQuery({
    slug,
    locale,
    preview: previewActive,
  });
  const page = useContentfulLiveUpdates(
    data?.pageCollection?.items && data?.pageCollection?.items?.length > 0
      ? tryGet(() => data?.pageCollection!.items[0])
      : null
  );

  if (isLoading) return <></>;

  if (!page) {
    const error = {
      code: 404,
      message:
        "We were not able to locate the content you were looking for, please check the url for possible typos",
    };

    return <PageErrorFeature error={error} />;
  }

  const { seo } = page || {},
    metaTags = {
      title: seo?.title ?? page?.pageName,
      description: seo?.description,
      image: seo?.image,
      no_index: seo?.noIndex,
      no_follow: seo?.noFollow,
    },
    robots = [
      metaTags.no_index === true ? "noindex" : undefined,
      metaTags.no_follow === true ? "nofollow" : undefined,
    ].filter((x): x is string => x !== undefined);

  return (
    <>
      <Head>
        {metaTags.title && metaTags.title?.length > 0 && (
          <>
            <title key="title">{metaTags.title}</title>
            <meta key="og:title" property="og:title" content={metaTags.title} />
          </>
        )}

        {metaTags.description && metaTags.description?.length > 0 && (
          <>
            <meta
              key="description"
              name="description"
              content={metaTags.description}
            />
            <meta
              key="og:description"
              property="og:description"
              content={metaTags.description}
            />
          </>
        )}

        {robots && robots?.length > 0 && (
          <meta key="robots" name="robots" content={robots.join(", ")} />
        )}

        {metaTags.image && Object.keys(metaTags.image)?.length > 0 && (
          <meta
            key="og:image"
            property="og:image"
            content={`${metaTags.image.url}?w=1200&h=630&f=faces&fit=fill`}
          />
        )}

        {page?.slug && page?.slug?.length > 0 && (
          <meta
            key="og:url"
            property="og:url"
            content={`${CONTENTFUL_CONFIG.meta.url}/${
              page.slug === "home" ? "" : `/${page.slug}`
            }`}
          />
        )}

        <meta key="og:locale" property="og:locale" content={locale} />
      </Head>

      <PageCtfComponentFeature {...page} {...rest} />
    </>
  );
};

PageGqlCtfComponentFeature.displayName = "PageGqlCtfComponentFeature";

export default PageGqlCtfComponentFeature;
