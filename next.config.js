/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Prevents loading issues with external images
  },
}

module.exports = nextConfig
