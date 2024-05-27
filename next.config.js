// @ts-check
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./i18n.ts");
const withPWA = require("@ducanh2912/next-pwa").default({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  publicExcludes: ["!favicon/**/*"],
});

/**
 * Adds a polyfill entry to the webpack configuration.
 * @param config - The webpack configuration object.
 * @returns void
 */
const polyfills = (/** @type {{ entry: () => Promise<any>; }} */ config) => {
  const originalEntry = config.entry;

  config.entry = async () => {
    const entries = await originalEntry();

    if (
      entries["main.js"] &&
      !entries["main.js"].includes("./configs/polyfills.ts")
    ) {
      entries["main.js"].unshift("./configs/polyfills.ts");
    }

    return entries;
  };
};

/** @type {import('next').NextConfig} */
const config = {
  env: {
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN:
      process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Content-Security-Policy",
          value: `frame-ancestors 'self' https://app.contentful.com https://app.eu.contentful.com`,
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "no-referrer",
        },
      ],
    },
  ],
  images: {
    loader: "custom",
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    domains: ["images.ctfassets.net", "images.eu.ctfassets.net"],
    formats: ["image/avif", "image/webp"],
    path: "/_next/image",
  },
  webpack(config, options) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    if (!options.isServer || process.env.circularDependencies) {
      import("circular-dependency-plugin").then(
        ({ default: CircularDependencyPlugin }) => {
          config.plugins.push(
            new CircularDependencyPlugin({
              exclude: /a\.js|node_modules/,
              failOnError: false,
              allowAsyncCycles: true,
              cwd: process.cwd(),
            })
          );
        }
      );
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    polyfills(config);

    return config;
  },
};

module.exports = withPWA(withNextIntl(config));
