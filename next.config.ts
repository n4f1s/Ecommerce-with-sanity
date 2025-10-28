import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable standalone output for self-hosting and PM2 deploys
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
