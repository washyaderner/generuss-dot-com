import { Metadata } from "next"

// This sets revalidation time to 1 hour
export const revalidate = 3600

// Generate metadata for SEO for the homepage
export function generateHomeMetadata(): Metadata {
  return {
    title: 'Generuss - AI & Automation Solutions for Sales Growth',
    description: 'Expert solutions in sales strategy, AI automation, and business process optimization. Build better systems, save time, and grow revenue.',
    openGraph: {
      title: 'Generuss - AI & Automation Solutions for Sales Growth',
      description: 'Expert solutions in sales strategy, AI automation, and business process optimization. Build better systems, save time, and grow revenue.',
      url: 'https://generuss.com',
      siteName: 'Generuss',
      images: [
        {
          url: 'https://generuss.com/og-image.jpg', // Update with actual OG image
          width: 1200,
          height: 630,
          alt: 'Generuss - AI & Automation Solutions'
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Generuss - AI & Automation Solutions for Sales Growth',
      description: 'Expert solutions in sales strategy, AI automation, and business process optimization.',
      images: ['https://generuss.com/twitter-image.jpg'], // Update with actual Twitter image
    }
  }
} 