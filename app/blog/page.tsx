import Link from "next/link"
import { CursorGradient } from "@/components/cursor-gradient"
import { GrassIcon } from "@/components/grass-icon"
import { getAllPosts } from "@/app/lib/contentful"
import BlogList from "@/app/components/blog/BlogList"
import { Metadata } from 'next'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

// Generate metadata for the blog list page
export const metadata: Metadata = {
  title: 'Blog | Generuss',
  description: 'Insights, tips, and strategies to elevate your sales and business processes. Stay updated with the latest trends and best practices.',
  openGraph: {
    title: 'Generuss Blog',
    description: 'Insights, tips, and strategies to elevate your sales and business processes',
    type: 'website',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Generuss Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generuss Blog',
    description: 'Insights, tips, and strategies to elevate your sales and business processes',
    images: ['/images/blog-og.jpg'],
  }
}

export default async function Blog() {
  try {
    const posts = await getAllPosts()

    // Structured data for blog listing
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Generuss Blog',
      description: 'Insights, tips, and strategies to elevate your sales and business processes',
      publisher: {
        '@type': 'Organization',
        name: 'Generuss',
        url: 'https://generuss.com'
      },
      blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        datePublished: post.sys.createdAt,
        dateModified: post.sys.updatedAt,
        url: `https://generuss.com/blog/${post.slug}`
      }))
    }

    return (
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-black to-[#0A0A1E] z-0" />
        <CursorGradient />

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {/* Navigation */}
          <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent flex items-center"
                  aria-label="Return to homepage"
                >
                  <GrassIcon className="w-6 h-6 mr-2" aria-hidden="true" />
                  Home
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link href="/solutions" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Solutions
                  </Link>
                  <Link href="/portfolio" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Portfolio
                  </Link>
                  <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors" aria-current="page">
                    Blog
                  </Link>
                  <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
              <Link
                href="#"
                className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white"
                aria-label="Request a demo"
              >
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" aria-hidden="true" />
                <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                <span className="relative text-white">Get a Demo</span>
              </Link>
            </nav>
          </header>

          {/* Hero Section */}
          <section className="pt-32 pb-16 px-4" aria-labelledby="blog-heading">
            <div className="container mx-auto text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" aria-hidden="true" />
                <h1 
                  id="blog-heading"
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent animate-gradient"
                >
                  Our Blog
                </h1>
              </div>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                Insights, tips, and strategies to elevate your sales and business processes
              </p>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="py-24 px-4" aria-label="Blog posts">
            <div className="container mx-auto">
              {posts.length > 0 ? (
                <BlogList posts={posts} />
              ) : (
                <Alert variant="destructive" className="bg-black/50 border-red-500/50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No blog posts found. Please check back later.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </section>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-lg w-full bg-black/50 border-red-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Unable to load blog posts. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}

