"use client";

import { useState } from "react";

import { Box } from "@mui/material";
import Image, { ImageProps } from "next/image";

import type { WithAny } from "@/types/common";

export type ImageCtfComponentFeatureProps = WithAny &
  ImageProps & {
    description?: string | null;
    showDescription?: boolean;
  };

/**
 * Renders an image `contentful` feature component.
 * @param {ImageCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered `contentful` feature component.
 */
const ImageCtfComponentFeature = (props: ImageCtfComponentFeatureProps) => {
  const {
    src,
    description,
    showDescription = true,
    alt = "",
    width,
    height,
    ...rest
  } = props;

  const [loaded, setLoaded] = useState(false);

  if (!src) return null;

  const blurUrl = new URL(String(src));
  blurUrl.searchParams.set("w", "100");

  return (
    <Box
      component="figure"
      margin="0"
      fontSize={0}
      style={{
        transition: "300ms ease-out",
        transitionProperty: "opacity",
        opacity: loaded ? 1 : 0,
      }}
      {...rest}
    >
      <Image
        {...rest}
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurUrl.toString()}
        onLoad={() => {
          setLoaded(true);
        }}
      />

      {showDescription && description && description?.length > 0 && (
        <figcaption>{description}</figcaption>
      )}
    </Box>
  );
};

ImageCtfComponentFeature.displayName = "ImageCtfComponentFeature";

export default ImageCtfComponentFeature;
