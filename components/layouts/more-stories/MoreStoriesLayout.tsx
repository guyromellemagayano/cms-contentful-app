import Link from "next/link";

import { Avatar } from "@/components/avatar";
import { DateComponent } from "@/components/date";
import { CoverImage } from "@/components/image/cover";

import {
  type AuthorData,
  type CoverImageData,
  type MorePostsData,
  type MoreStoriesLayoutProps,
  type PictureAuthorData,
  type PostPreviewProps,
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
export const PostPreview = <
  CID extends CoverImageData,
  AD extends AuthorData<PictureAuthorData>
>({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: PostPreviewProps<CID, AD>): JSX.Element => {
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

PostPreview.displayName = "PostPreview";

/**
 * Renders a layout for displaying more stories.
 *
 * @template MPD - The type of data for more posts.
 *
 * @param morePosts - The data for more posts.
 *
 * @returns The rendered MoreStoriesLayout component.
 */
const MoreStoriesLayout = <MPD extends MorePostsData>({
  morePosts,
}: MoreStoriesLayoutProps<MPD>): JSX.Element => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {morePosts?.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

MoreStoriesLayout.displayName = "MoreStoriesLayout";

export default MoreStoriesLayout;
