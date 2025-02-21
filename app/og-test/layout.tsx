import { Metadata } from 'next'

const SITE_URL = 'https://generuss.com'

export const metadata: Metadata = {
  title: 'OpenGraph Test | Generuss',
  description: 'Test page for OpenGraph image and metadata',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Generuss Blog',
    description: 'Insights, tips, and strategies to elevate your sales and business processes',
    type: 'website',
    url: '/og-test',
    siteName: 'Generuss',
    locale: 'en_US',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Generuss Blog',
        type: 'image/jpeg',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generuss Blog',
    description: 'Insights, tips, and strategies to elevate your sales and business processes',
    site: '@generuss',
    creator: '@generuss',
    images: ['/images/blog-og.jpg'],
  }
}

export default function OGTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 