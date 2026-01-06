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
};

export default nextConfig;
