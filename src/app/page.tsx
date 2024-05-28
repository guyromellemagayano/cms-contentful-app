import { redirect } from "next/navigation";

/**
 * This page only renders when the app is built statically (output: 'export')
 * @returns The rendered `RootPage` component.
 */
const RootPage = () => redirect("/en");

RootPage.displayName = "RootPage";

export default RootPage;
