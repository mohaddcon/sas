import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
 outputFileTracingRoot :'absolute ',
eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  images: {
    unoptimized:true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
