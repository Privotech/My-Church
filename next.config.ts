import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '42mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about%20us.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/our%20team.html',
        destination: '/team',
        permanent: true,
      },
      {
        source: '/Our%20Program.html',
        destination: '/programs',
        permanent: true,
      },
      {
        source: '/sermons.html',
        destination: '/sermons',
        permanent: true,
      },
      {
        source: '/give.html',
        destination: '/give',
        permanent: true,
      },
      {
        source: '/visit.html',
        destination: '/visit',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
