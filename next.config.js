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
  },

  /**
   * Headers Configuration
   * Defines custom HTTP headers for routes.
   * 
   * ⚠️ IMPORTANT: Content Security Policy (CSP) settings below include:
   * - connect-src includes OpenAI API domain for chat functionality
   * - All other directives maintain strict security policies
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
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel.live https://*.vercel.app https://*.googleapis.com;
              connect-src 'self' https://api.openai.com http://localhost:* https://localhost:* https://cdn.contentful.com https://*.vercel.live https://*.vercel.app;
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data: https://images.ctfassets.net https://img.youtube.com https://i.ytimg.com;
              font-src 'self';
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig
