import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone builds for Docker optimization
  output: 'standalone',
  
  // Remove assetPrefix to fix image loading issues
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
