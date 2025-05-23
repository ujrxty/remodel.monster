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
    formats: ['image/webp', 'image/avif'],
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
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
  webpack(config, { isServer, dev }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    
    // Bundle optimizations for production
    if (!dev && !isServer) {
      // Remove unused polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
      
      // Optimize chunks
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    
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