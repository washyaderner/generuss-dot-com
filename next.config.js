/**
 * @type {import('next').NextConfig}
 * 
 * IMPORTANT: This configuration file is critical for the application.
 * Changes to this file can affect build processes, deployment, and functionality.
 * 
 * ⚠️ DEVELOPMENT ENVIRONMENT NOTE:
 * If you experience issues with the dev server constantly restarting due to
 * detected changes in this file, create a .env.local file with:
 * NEXT_SKIP_WATCHING_CONFIG=true
 * 
 * MERGE CONFLICTS: This file has previously caused merge conflicts between branches.
 * Always check with the team before modifying shared configuration sections.
 */

const nextConfig = {
  /**
   * React Strict Mode
   * Enables React's strict mode for development, which:
   * - Highlights potential issues in an application
   * - Identifies unsafe lifecycles, legacy API usage, and other features
   * - Helps prepare for future React features
   * 
   * Setting: true (recommended for development)
   */
  reactStrictMode: true,
  
  /**
   * Images Configuration
   * Controls how Next.js handles and optimizes images.
   * 
   * ⚠️ CAUTION: The image configuration has caused merge conflicts.
   * When adding new patterns, always:
   * 1. Check if the pattern already exists
   * 2. Add comments explaining what each domain is used for
   * 3. Make sure to merge with the latest changes from dev branch
   * 
   * Current remote patterns:
   * - img.youtube.com: For YouTube thumbnail images
   * - i.ytimg.com: For YouTube video thumbnails and previews
   * - images.ctfassets.net: For Contentful CMS images
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * Headers Configuration
   * Defines custom HTTP headers for routes.
   * 
   * ⚠️ IMPORTANT: Content Security Policy (CSP) settings below include:
   * - connect-src includes OpenAI API domain for chat functionality
   * - All other directives maintain strict security policies
   * - Cache-Control headers set for static assets including images
   */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.live https://vercel.live https://*.vercel.app https://*.googleapis.com https://cal.com https://*.cal.com https://app.cal.com;
              script-src-elem 'self' 'unsafe-inline' https://*.vercel.live https://vercel.live https://*.vercel.app https://*.googleapis.com https://cal.com https://*.cal.com https://app.cal.com;
              connect-src 'self' https://api.openai.com http://localhost:* https://localhost:* https://cdn.contentful.com https://*.vercel.live https://vercel.live https://*.vercel.app https://*.ingest.sentry.io https://cal.com https://*.cal.com https://app.cal.com;
              style-src 'self' 'unsafe-inline' https://cal.com https://*.cal.com https://app.cal.com;
              img-src 'self' blob: data: https://images.ctfassets.net https://img.youtube.com https://i.ytimg.com https://cal.com https://*.cal.com https://app.cal.com;
              font-src 'self' https://fonts.gstatic.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              frame-src 'self' https://cal.com https://*.cal.com https://app.cal.com;
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
          }
        ]
      },
      {
        source: '/images/:path*.JPG',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, must-revalidate'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig
