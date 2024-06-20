import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

import { defaultLocale } from "@/configs/next-intl";

let staticLocale = "en-US";

/**
 * Retrieves the manifest data for the application.
 * @returns A promise that resolves to the manifest data.
 */
const manifest = async (): Promise<MetadataRoute.Manifest> => {
  const localeCheck =
    defaultLocale && defaultLocale?.length > 0 ? defaultLocale : staticLocale;

  const t = await getTranslations({
    locale: localeCheck,
    namespace: "Manifest",
  });

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#101E33",
  };
};

export default manifest;
