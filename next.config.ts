import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  // basePath: "/reign-game-firebase-studio",
  // assetPrefix: "/reign-game-firebase-studio/",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
