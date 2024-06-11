/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
