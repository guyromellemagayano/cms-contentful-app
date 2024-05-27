import { ReactNode } from "react";

import { Inter } from "next/font/google";

import { FooterLayout } from "@/components/layouts/footer";
import { CMS_NAME } from "@/lib/constants";

import "./globals.css";

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export type RootLayoutProps = {
  children: ReactNode;
};

/**
 * Render the root layout for the application.
 *
 * @param children - The children to render in the layout.
 *
 * @returns The rendered RootLayout component.
 */
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <FooterLayout />
        </section>
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
