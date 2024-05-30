"use client";

import { ImageProps } from "next/image";

import { ImageCtfComponentFeature } from "@/components/features/ctf-components/image";
import { VideoCtfComponentFeature } from "@/components/features/ctf-components/video";
import { useLayoutContext } from "@/hooks/layout";
import type { WithAny, WithClassName } from "@/types/common";

import { AssetFieldsFragment } from "./__generated/asset-ctf-component-feature.generated";

export type AssetCtfComponentFeatureProps = WithAny &
  WithClassName &
  AssetFieldsFragment &
  Pick<ImageProps, "layout" | "objectFit" | "objectPosition"> & {
    showDescription?: boolean;
    onClick?: () => any;
  };

/**
 * Renders the asset `contentful` feature component.
 * @param {AssetCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const AssetCtfComponentFeature = (props: AssetCtfComponentFeatureProps) => {
  const { contentType, url, showDescription, title, width, height, ...rest } =
    props;

  const layout = useLayoutContext();

  if (!contentType || !url) {
    return null;
  }

  if (contentType?.length > 0 && contentType?.startsWith("image")) {
    return (
      <ImageCtfComponentFeature
        height={height || undefined}
        width={width || undefined}
        alt={title || ""}
        src={url || ""}
        showDescription={
          ["quote", "product-table", "info-block", "duplex"].includes(
            layout.parent
          )
            ? false
            : showDescription
        }
        {...rest}
      />
    );
  }

  if (contentType?.length > 0 && contentType?.startsWith("video")) {
    return <VideoCtfComponentFeature {...props} />;
  }

  return null;
};

AssetCtfComponentFeature.displayName = "AssetCtfComponentFeature";

export default AssetCtfComponentFeature;
