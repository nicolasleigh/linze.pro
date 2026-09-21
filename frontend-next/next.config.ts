import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.linze.pro',
        pathname: '/images/petify/**',
      },
      {
        protocol: 'https',
        hostname: 'file.linze.pro',
        pathname: '/images/cabinfy/**',
      },
    ],
  },
  async rewrites() {
    const apiBaseUrl = (
      process.env.BLOG_API_URL ?? (process.env.NODE_ENV === 'development' ? 'http://localhost:8085/api/v1' : '')
    ).replace(/\/$/, '');
    if (!apiBaseUrl) return [];

    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
