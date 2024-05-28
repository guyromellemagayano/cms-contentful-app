import { COIN_COLORFUL_CMS_NAME, COIN_COLORFUL_CMS_URL } from "@/configs/env";

/**
 * Renders the intro layout component.
 * @returns The rendered intro layout component.
 */
const IntroLayout = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={COIN_COLORFUL_CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {COIN_COLORFUL_CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
};

IntroLayout.displayName = "IntroLayout";

export default IntroLayout;
