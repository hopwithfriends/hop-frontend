/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['imgur.com', 'i.imgur.com']
  }
};

export default nextConfig;
