/**
 * @type {import('next').NextConfig}
 * 
 * IMPORTANT: This configuration file is critical for the application.
 * Changes to this file can affect build processes, deployment, and functionality.
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
   * ⚠️ CAUTION: The 'domains' array has caused merge conflicts.
   * When adding new domains, always:
   * 1. Check if the domain already exists in the array
   * 2. Add comments explaining what each domain is used for
   * 3. Make sure to merge with the latest changes from dev branch
   * 
   * Current domains:
   * - img.youtube.com: For YouTube thumbnail images
   * - i.ytimg.com: For YouTube video thumbnails and previews
   * - images.ctfassets.net: For Contentful CMS images
   */
  images: {
    domains: [
      'img.youtube.com',     // YouTube thumbnail images
      'i.ytimg.com',         // YouTube video thumbnails and previews
      'images.ctfassets.net' // Contentful CMS images
    ],
  },

  /**
   * Headers Configuration
   * Defines custom HTTP headers for routes.
   * 
   * ⚠️ IMPORTANT: Content Security Policy (CSP) settings below allow 'unsafe-eval'
   * for the n8n chat widget to function properly. This directive is necessary because
   * the n8n chat widget uses 'eval' internally.
   * 
   * The CSP is carefully scoped to balance security and functionality:
   * - script-src includes 'unsafe-eval' to allow the chat widget to function
   * - connect-src includes n8n domains to allow API communication
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
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://chat-widget.n8n.io https://cdn.jsdelivr.net https://unpkg.com;
              connect-src 'self' https://*.n8n.cloud https://chat-widget.n8n.io;
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
