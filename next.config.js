/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Для полного SSG
  images: {
    unoptimized: true, // Для статического экспорта
  },
  trailingSlash: true, // Для лучшего SEO
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
