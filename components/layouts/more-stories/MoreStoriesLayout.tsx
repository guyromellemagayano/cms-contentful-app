import Link from "next/link";

import DateComponent from "@/app/[locale]/date";

import { Avatar } from "@/components/avatar";
import { CoverImage } from "@/components/image/cover";

import {
  type AuthorData,
  type CoverImageData,
  type MoreStoriesProps,
  type PictureAuthorData,
} from "./types";

/**
 * Renders the layout for displaying more stories.
 *
 * @template CID - The type of the cover image data.
 * @template AD - The type of the author data.
 *
 * @param title - The title of the story.
 * @param coverImage - The cover image data.
 * @param date - The date of the story.
 * @param excerpt - The excerpt of the story.
 * @param author - The author data.
 * @param slug - The slug of the story.
 *
 * @returns The rendered layout component.
 */
export const MoreStoriesLayout = <
  CID extends CoverImageData,
  AD extends AuthorData<PictureAuthorData>
>({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: MoreStoriesProps<CID, AD>): JSX.Element => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          href={slug && slug?.length > 0 ? `/posts/${slug}` : `#`}
          className="hover:underline"
          title={title}
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>

      {author &&
        (author?.name?.length > 0 ||
          Object.keys(author?.picture)?.length > 0) && (
          <Avatar name={author.name} picture={author.picture} />
        )}
    </div>
  );
};

MoreStoriesLayout.displayName = "MoreStoriesLayout";
