/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enhanced image optimization
  images: { 
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 3600, // 1 hour cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
    dangerouslyAllowSVG: true,
  },
  // Enhanced experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot', 'class-variance-authority', 'clsx'],
  },
  // Enhanced compression
  compress: true,
  // Enhanced SWC minification
  swcMinify: true,
  // Output optimization
  output: 'standalone',
  // Performance optimizations
  poweredByHeader: false,
  // Performance headers
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800',
          },
        ],
      },
      {
        source: '/game/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://scratch.mit.edu https://turbowarp.org https://*.scratch.mit.edu https://html5.gamedistribution.com https://*.gamedistribution.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://scratch.mit.edu https://turbowarp.org https://html5.gamedistribution.com;",
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://scratch.mit.edu https://turbowarp.org https://*.scratch.mit.edu https://html5.gamedistribution.com https://*.gamedistribution.com https://www.googletagmanager.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://scratch.mit.edu https://html5.gamedistribution.com;",
          },
        ],
      },
    ];
  },
  // Optimized bundling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Optimize chunk splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    };
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/take-care-of-shadow-milk.embed',
        destination: '/game/take-care-of-shadow-milk/index.html',
      },
      {
        source: '/pou-online.embed',
        destination: '/game/pou-online/index.html',
      },
      {
        source: '/my-dogy-virtual-pet.embed',
        destination: '/game/my-dogy-virtual-pet/index.html',
      },
      {
        source: '/pet-salon.embed',
        destination: '/game/pet-salon/index.html',
      },
      {
        source: '/pet-salon-2.embed',
        destination: '/game/pet-salon-2/index.html',
      },
      {
        source: '/my-pet-care-salon.embed',
        destination: '/game/my-pet-care-salon/index.html',
      },
    ]
  }
};

module.exports = nextConfig;


