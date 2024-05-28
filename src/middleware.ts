import createMiddleware from "next-intl/middleware";

import {
  defaultLocale,
  localePrefix,
  locales,
  pathnames,
} from "@/configs/next-intl";

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export const config = {
  matcher: ["/", "/(de|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
