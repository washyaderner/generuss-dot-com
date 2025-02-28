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
}

module.exports = nextConfig
