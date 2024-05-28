import { Pathnames } from "next-intl/navigation";

import { COIN_COLORFUL_SITE_URL } from "./env";

export const port = 3000;
export const host =
  process.env.NODE_ENV === "production"
    ? `https://${COIN_COLORFUL_SITE_URL}`
    : `http://localhost:${port}`;
export const defaultLocale = "en" as const;
export const locales = ["en"] as const;
export const localePrefix = undefined;

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
  },
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;
