import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
