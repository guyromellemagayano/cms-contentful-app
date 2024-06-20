import { Pathnames } from "next-intl/routing";

import { COIN_COLORFUL_SITE_URL } from "./env";

export const port = 3000;
export const host =
  process.env.NODE_ENV === "production"
    ? `https://${COIN_COLORFUL_SITE_URL}`
    : `http://localhost:${port}`;
export const defaultLocale = "en-US";
export const locales = ["en-US", "de-DE"];

export const pathnames = {
  "/": "/",
  "/pathnames": {
    "en-US": "/pathnames",
    "de-DE": "/pfadnamen",
  },
} satisfies Pathnames<typeof locales>;

export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
