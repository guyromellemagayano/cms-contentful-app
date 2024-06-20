import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { locales } from "@/configs/next-intl";

/**
 * Retrieves the request configuration for the specified locale.
 * @param {string} locale - The locale to retrieve the request configuration for.
 * @returns The request configuration for the specified locale.
 */
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (
      await (locale === "en-US"
        ? import("../messages/en-US.json")
        : import(`../messages/${locale}.json`))
    ).default,
  };
});
