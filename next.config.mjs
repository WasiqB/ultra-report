import pkg from './package.json' assert { type: 'json' };

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: './',
  images: {
    unoptimized: true,
  },
  publicRuntimeConfig: {
    version: pkg.version,
  },
};

export default nextConfig;
