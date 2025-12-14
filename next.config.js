/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'news.losnachoschipies.fr',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/news',
        destination: 'https://news.losnachoschipies.fr/api/news',
      },
      {
        source: '/api/news/:id',
        destination: 'https://news.losnachoschipies.fr/api/news/:id',
      },
    ]
  },
}

module.exports = nextConfig
