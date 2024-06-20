"use client";

import Error from "next/error";

/**
 * Render the default Next.js 404 page when a route
 * is requested that doesn't match the middleware and
 * therefore doesn't have a locale associated with it.
 * @returns The rendered `NotFound` component.
 */
const NotFound = () => {
  return (
    <html lang="en-US">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
};

NotFound.displayName = "NotFound";

export default NotFound;
