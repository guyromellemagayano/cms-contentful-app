import { ReactNode } from "react";

import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Inter } from "next/font/google";

import { FooterLayout } from "@/components/layouts/footer";
import { locales } from "@/configs/next-intl";

import Providers from "./providers";

/**
 * Generates static parameters for each locale.
 * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
 * @returns An array of objects containing the locale.
 */
export const generateStaticParams = (): { locale: string }[] =>
  locales.map((locale) => ({ locale }));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export type LocaleLayoutProps<PD extends ParamsData> = {
  children: ReactNode;
  params: PD;
};

export type ParamsData = {
  locale: string;
  [key: string]: any;
};

export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
  };
};

/**
 * Render the root layout for the application.
 * @param children - The children to render in the layout.
 * @returns The rendered LocaleLayout component.
 */
const LocaleLayout = async <PD extends ParamsData>({
  children,
  params: { locale },
}: LocaleLayoutProps<PD>) => {
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="theme-color" content="#000" />

        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
          <Providers>
            <section className="min-h-screen">
              <main>{children}</main>
              <FooterLayout />
            </section>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

LocaleLayout.displayName = "LocaleLayout";

export default LocaleLayout;