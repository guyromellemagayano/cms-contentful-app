import createMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "./configs/next-intl";

export default createMiddleware({
  defaultLocale,
  locales,
});

export const config = {
  matcher: ["/", "/(en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
