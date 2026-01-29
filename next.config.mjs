import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Static export only - no SSR, ISR, or server features
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for better static hosting compatibility
  trailingSlash: true,
  
  // Strict mode for better development experience
  reactStrictMode: true,
  
  // Note: Security headers should be configured at hosting level for static exports
  // (e.g., in _headers file for Netlify, vercel.json for Vercel, etc.)
  
  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint during builds
  eslint: {
    ignoreDuringBuilds: false,
  },
  // CRITICAL: Allow local development origins
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://172.20.10.5:3000'
  ],
  
  // Webpack optimization for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Separate framer-motion (heavy animation library)
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Separate our custom animations
          animations: {
            test: /[\\/]components[\\/]animations[\\/]/,
            name: 'animations',
            priority: 25,
            reuseExistingChunk: true,
          },
          // Separate lucide-react icons
          lucideReact: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide-icons',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Separate radix-ui components
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            priority: 15,
            reuseExistingChunk: true,
          },
          // Separate forms and validation (zod, react-hook-form)
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|zod|@hookform)[\\/]/,
            name: 'forms-bundle',
            priority: 14,
            reuseExistingChunk: true,
          },
          // Separate React core (always needed together)
          reactCore: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'react-core',
            priority: 12,
            reuseExistingChunk: true,
          },
          // Vendor chunk for remaining node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
