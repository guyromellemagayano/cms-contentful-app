import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Retrieves the manifest data for the application.
 * @returns A promise that resolves to the manifest data.
 */
const manifest = async (): Promise<MetadataRoute.Manifest> => {
  const locale = "en",
    t = await getTranslations({ locale, namespace: "Manifest" });

  return {
    name: t("name"),
    start_url: "/",
    theme_color: "#101E33",
  };
};

export default manifest;
