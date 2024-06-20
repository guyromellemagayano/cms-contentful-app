import { Pathnames } from "next-intl/routing";

import { COIN_COLORFUL_SITE_URL } from "./env";

export const port = 3000;
export const host =
  process.env.NODE_ENV === "production"
    ? `https://${COIN_COLORFUL_SITE_URL}`
    : `http://localhost:${port}`;
export const defaultLocale = "en" as const;
export const locales = ["en", "de"] as const;

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    de: "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
