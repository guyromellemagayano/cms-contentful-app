import { MetadataRoute } from "next";

import { defaultLocale, host, locales, pathnames } from "@/configs/next-intl";
import { getPathname } from "@/navigation";

/**
 * Generates a sitemap for the application.
 * @returns An array of objects representing the sitemap.
 */
const sitemap = (): MetadataRoute.Sitemap => {
  const keys = Object.keys(pathnames) as Array<keyof typeof pathnames>;

  const getUrl = (
    key: keyof typeof pathnames,
    locale: (typeof locales)[number]
  ) => {
    const pathname = getPathname({ locale, href: key });

    return `${host}/${locale}${pathname === "/" ? "" : pathname}`;
  };

  return keys.map((key) => ({
    url: getUrl(key, defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(key, locale)])
      ),
    },
  }));
};

export default sitemap;
