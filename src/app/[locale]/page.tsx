import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";

import { IntroLayout } from "@/components/layouts/intro";
import { MoreStoriesLayout } from "@/components/layouts/more-stories";
import { HeroPost } from "@/components/posts/hero";
import { getAllPosts } from "@/libs/api";

/**
 * Renders a page component.
 * @returns A promise that resolves to a JSX element representing the page.
 */
const Page = async (): Promise<JSX.Element> => {
  const { isEnabled } = draftMode(),
    allPosts = await getAllPosts(isEnabled),
    heroPost = allPosts?.[0] || undefined,
    morePosts = allPosts?.slice(1) || undefined;

  const t = await getTranslations("IndexPage");

  return (
    <div className="container mx-auto px-5">
      <p>
        {t.rich("description", {
          code: (chunks) => <code>{chunks}</code>,
        })}
      </p>

      <IntroLayout />

      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}

      <MoreStoriesLayout morePosts={morePosts} />
    </div>
  );
};

Page.displayName = "HomePage";

export default Page;
