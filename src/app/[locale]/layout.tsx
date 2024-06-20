import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Red_Hat_Display } from "next/font/google";

import { LayoutTemplate } from "@/components/templates/layout";
import { locales } from "@/configs/next-intl";
import type { WithChildren } from "@/types/common";
import { ParamsData } from "@/types/page";

// import { SettingsFeature } from "@/components/features/settings";
import Providers from "./providers";

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/**
 * Generates static parameters for each locale.
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 * @returns An array of objects containing the locale.
 */
export const generateStaticParams = (): { locale: string }[] =>
  locales.map((locale) => ({ locale }));

export type RootLayoutProps<PD extends ParamsData> = WithChildren & {
  params: PD;
};

export const generateMetadata = async ({
  params: { locale },
}: {
  params: Pick<ParamsData, "locale">;
}): Promise<Metadata> => {
  const localeCheck = locale && locale?.length > 0 ? locale : "en-US";
  const t = await getTranslations({
    locale: localeCheck,
    namespace: "RootLayout",
  });

  return {
    title: t("title"),
  };
};

/**
 * Render the root layout for the application.
 * @param children - The children to render in the layout.
 * @returns The rendered RootLayout component.
 */
const RootLayout = async <PD extends ParamsData>({
  children,
  params: { locale },
}: RootLayoutProps<PD>) => {
  const localeCheck = locale && locale?.length > 0 ? locale : "en-US";

  unstable_setRequestLocale(localeCheck);

  const messages = await getMessages();

  return (
    <html lang={locale} className={redHat.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#000" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers locale={locale}>
            <LayoutTemplate>
              {children}
              {/* <SettingsFeature /> */}
            </LayoutTemplate>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
