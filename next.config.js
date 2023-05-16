// const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
