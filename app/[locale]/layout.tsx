import { FooterLayout } from "@/components/layouts/footer";
import { CMS_NAME } from "@/lib/constants";

import { Inter } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
