import Link from "next/link";

import { cn } from "@/helpers/styles";
import ContentfulImage from "@/lib/contentful-image";

import { CoverImageProps } from "./types";

/**
 * Renders a cover image component.
 *
 * @param title - The title of the image.
 * @param [url="#"] - The URL of the image.
 * @param slug - The slug of the image.
 *
 * @returns The rendered cover image component.
 */
export const CoverImage = ({
  title,
  url = "#",
  slug,
}: CoverImageProps): JSX.Element => {
  const image = (
    <ContentfulImage
      alt={title?.length > 0 ? `Cover Image for ${title}` : `Cover Image`}
      priority
      width={2000}
      height={1000}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug && slug?.length > 0 ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

CoverImage.displayName = "CoverImage";
