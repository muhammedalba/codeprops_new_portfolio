import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Static export only - no SSR, ISR, or server features
  output: 'export',
  // 
  compiler: {
    // Disable legacy JS transforms if targeting modern browsers
    styledComponents: true,
  },
  // swcMinify is true by default in Next.js 13+
  
  // OPTIMIZATION: Ensure only used components/icons are bundled
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-dropdown-menu',
      'clsx',
      'tailwind-merge'
    ],
  },
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
          // Separate our custom animations (JS only)
          animations: {
            test: /[\\/]components[\\/]animations[\\/].*\.(js|jsx|ts|tsx)$/,
            name: 'animations',
            chunks: 'all',
            priority: 25,
          },
          // Separate lucide-react icons
          lucideReact: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'lucide-icons',
            chunks: 'all',
            priority: 20,
          },
          // Separate radix-ui components
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            chunks: 'all',
            priority: 15,
          },
          // Separate React core (High priority, JS only)
          reactCore: {
            test: /[\\/]node_modules[\\/](react|react-dom|next|scheduler)[\\/].*\.(js|jsx|ts|tsx)$/,
            name: 'react-core',
            chunks: 'all',
            priority: 12,
          },
          // Vendor chunk for remaining node_modules (JS only)
          vendor: {
            test: /[\\/]node_modules[\\/].*\.(js|jsx|ts|tsx)$/,
            name: 'vendor',
            chunks: 'all',
            priority: 10,
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
