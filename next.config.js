/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'homeimprovement.online',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  env: {
    CONFIG_ID: '002',
    CONFIG_NAME: 'home improvement online',
    API_ENDPOINT: 'https://leads-inst523-client.phonexa.com/fullpost/',
  },
  
  // Allow development origins - includes server IP for remote viewing
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '0.0.0.0', 
    '45.32.217.51',
    'homeimprovement.online'
  ],
  
  // Necessary for framer-motion with newer Next.js
  transpilePackages: ['framer-motion'],
  
  // Configure webpack
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
  
  // Configure Turbopack
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname)
    }
  }
};

module.exports = nextConfig;