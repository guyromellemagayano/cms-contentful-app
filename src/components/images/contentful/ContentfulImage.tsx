"use client";

import Image from "next/image";

export type ContentfulImageProps = {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any;
};

export const contentfulLoader = ({
  src,
  width,
  quality,
}: ContentfulImageProps) => `${src}?w=${width}&q=${quality || 75}`;

/**
 * Renders a Contentful image component.
 * @param {ContentfulImageProps} props - The props for the Contentful image component.
 * @returns The rendered Contentful image component.
 */
const ContentfulImage = (props: ContentfulImageProps) => {
  return <Image alt={props.alt} loader={contentfulLoader} {...props} />;
};

ContentfulImage.displayName = "ContentfulImage";

export default ContentfulImage;
