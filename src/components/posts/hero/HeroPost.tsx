import Link from "next/link";

import { Avatar } from "@/components/avatar";
import { DateComponent } from "@/components/date";
import { CoverImage } from "@/components/images/cover";
import type {
  AuthorData,
  CoverImageData,
  PictureAuthorData,
} from "@/components/layouts/more-stories";

export type HeroPostProps<
  CID extends CoverImageData,
  AD extends AuthorData<PictureAuthorData>
> = {
  title: string;
  coverImage: CID;
  date: string;
  excerpt: string;
  author: AD;
  slug: string;
};

/**
 * Renders a hero post component.
 * @template CID - The type of cover image data.
 * @template AD - The type of author data.
 * @param {HeroPostProps<CID, AD>} props - The properties to render the post with.
 * @returns The rendered post component.
 */
const HeroPost = <
  CID extends CoverImageData,
  AD extends AuthorData<PictureAuthorData>
>(
  props: HeroPostProps<CID, AD>
) => {
  const { title, coverImage, date, excerpt, author, slug } = props;

  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link
              href={slug && slug?.length > 0 ? `/posts/${slug}` : `#`}
              className="hover:underline"
              title={title}
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>

          {author &&
            (author?.name?.length > 0 ||
              Object.keys(author?.picture)?.length > 0) && (
              <Avatar name={author.name} picture={author.picture} />
            )}
        </div>
      </div>
    </section>
  );
};

HeroPost.displayName = "HeroPost";

export default HeroPost;
