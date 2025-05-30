import { CursorGradient } from "@/components/cursor-gradient"
import { getAllPosts } from "@/app/lib/contentful"
import BlogList from "@/app/components/blog/BlogList"
import { Metadata } from 'next'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { BlogNavigation } from "@/components/BlogNavigation"
import React from 'react';
import Link from 'next/link';
import { NavLink } from '@/components/nav-link';
import { MobileNav } from '@/components/mobile-nav';

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

// Navigation links
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" }
];

function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorGradient />
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
        <div className="container max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavLink href="/">
              <span>Home</span>
            </NavLink>
            <nav className="hidden md:flex space-x-6">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <MobileNav links={navigationLinks} />
        </div>
      </header>

      {/* Main content */}
      {children}
    </>
  );
}

export default async function Blog() {
  // Check if Contentful is configured
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  
  if (!spaceId || !accessToken) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed inset-0 bg-gradient-to-t from-[#0A0A1E] via-black to-black z-0" />
        <CursorGradient />
        <BlogLayout>
          <div className="relative z-20">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-32">
              <section className="pb-16 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-teal-400">
                  Blog
                </h1>
                <div className="max-w-2xl mx-auto">
                  <Alert className="bg-yellow-500/10 border-yellow-500/50 text-white">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-gray-200">
                      <strong>Blog Coming Soon!</strong><br />
                      The blog feature is currently being set up. Check back later for insights, tips, and strategies to elevate your sales and business processes.
                    </AlertDescription>
                  </Alert>
                </div>
              </section>
            </div>
          </div>
        </BlogLayout>
      </div>
    )
  }
  
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
        <div className="fixed inset-0 bg-gradient-to-t from-[#0A0A1E] via-black to-black z-0" />
        <CursorGradient />

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-black/80 pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-32">
            {/* Simplified Navigation */}
            <BlogNavigation />

            {/* Hero Section */}
            <section className="pb-16" aria-labelledby="blog-heading">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" aria-hidden="true" />
                  <h1 
                    id="blog-heading"
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-teal-400"
                  >
                    Blog
                  </h1>
                </div>
                <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg">
                  Insights, tips, and strategies to elevate your sales and business processes
                </p>
              </div>
            </section>

            {/* Blog Posts */}
            <section className="py-12" aria-label="Blog posts">
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
            </section>
            
            {/* Bottom Navigation */}
            <div className="mt-12 mb-24">
              <BlogNavigation />
            </div>
          </div>
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

