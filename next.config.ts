/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Turbopack (Next.js 16+ default)
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // Keep your existing webpack config for production/non-turbo builds
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
