// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove this line: output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig