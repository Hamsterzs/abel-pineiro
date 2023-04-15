const { withSuperjson } = require("next-superjson");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
  experimental: { appDir: true, serverComponentsExternalPackages: ["mysql2"] },
};

module.exports = nextConfig;
