import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * Since we have a `not-found.tsx` page on the root, a layout file
 * is required, even if it's just passing children through.
 * @param children - The children to render in the layout.
 * @returns The rendered `RootLayout` component.
 */
const RootLayout = ({ children }: RootLayoutProps) => children;

RootLayout.displayName = "RootLayout";

export default RootLayout;
