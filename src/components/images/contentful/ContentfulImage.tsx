"use client";

import type { WithAny } from "@/types/common";
import Image from "next/image";

export type ContentfulImageProps = WithAny & {
  src: string;
  width?: number;
  quality?: number;
  alt?: string;
};

/**
 * Generates the URL of a Contentful image with the specified width and quality.
 * @param {ContentfulImageProps} props - The properties to generate the URL with.
 * @returns The URL of the Contentful image with the specified width and quality.
 */
export const contentfulLoader = ({
  src,
  width,
  quality,
}: ContentfulImageProps): string => `${src}?w=${width}&q=${quality || 75}`;

/**
 * Renders a Contentful image component.
 * @param {ContentfulImageProps} props - The properties to render the component with.
 * @returns The rendered image component.
 */
const ContentfulImage = (props: ContentfulImageProps) => {
  const { alt = "", ...rest } = props;

  return <Image alt={alt} loader={contentfulLoader} {...rest} />;
};

ContentfulImage.displayName = "ContentfulImage";

export default ContentfulImage;
