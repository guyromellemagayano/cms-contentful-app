import { draftMode } from "next/headers";
import Link from "next/link";

import { Avatar } from "@/components/avatar";
import { DateComponent } from "@/components/date";
import { CoverImage } from "@/components/images/cover";
import { MoreStoriesLayout } from "@/components/layouts/more-stories";
import { Markdown } from "@/components/markdown";
import { getAllPosts, getPostAndMorePosts } from "@/lib/api";
import { ParamsData } from "@/types/page";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export type PostPageProps<P extends ParamsData> = {
  params: P;
};

/**
 * Renders a page for a specific blog post.
 * @template P - The type of the params data.
 * @param params - The params data for the post.
 * @returns The JSX element representing the post page.
 */
const PostPage = async <P extends ParamsData>({
  params: { slug },
}: PostPageProps<P>): Promise<JSX.Element> => {
  const slugCheck = slug && slug?.length > 0 ? slug : "en";

  // Function to check if draft mode is enabled
  const { isEnabled } = draftMode();

  // Fetch the post and related posts
  const { post, morePosts } = await getPostAndMorePosts(slugCheck, isEnabled);

  // Render the post page
  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={post.title} url={post.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            <DateComponent dateString={post.date} />
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={post.content} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      <MoreStoriesLayout morePosts={morePosts} />
    </div>
  );
};

PostPage.displayName = "PostPage";

export default PostPage;
