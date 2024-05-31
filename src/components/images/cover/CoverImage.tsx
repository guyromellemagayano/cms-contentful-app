import Link from "next/link";

import { ContentfulImage } from "@/components/images/contentful";
import { cn } from "@/libs/utils";

export type CoverImageProps = {
  title: string;
  url: string;
  slug?: string;
};

/**
 * Renders a cover image component.
 * @param {CoverImageProps} props - The properties to render the component with.
 * @returns The rendered image component.
 */
const CoverImage = (props: CoverImageProps) => {
  const { title, url = "#", slug } = props;

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

export default CoverImage;
