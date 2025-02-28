import { notFound } from "next/navigation"
import { getPostBySlug } from "@/app/lib/contentful"
import BlogPost from "@/app/components/blog/BlogPost"
import { Metadata } from 'next'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { CursorGradient } from "@/components/cursor-gradient"
import { NavLink } from "@/components/nav-link"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export const revalidate = 3600 // Revalidate every hour

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    
    if (!post) {
      return {
        title: 'Post Not Found | Generuss Blog',
        description: 'The requested blog post could not be found.',
        robots: 'noindex'
      }
    }

    return {
      title: `${post.title} | Generuss Blog`,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        type: 'article',
        publishedTime: post.sys.createdAt,
        modifiedTime: post.sys.updatedAt,
        images: post.headerImage ? [
          {
            url: post.headerImage.url,
            alt: post.headerImage.description,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: post.headerImage ? [post.headerImage.url] : [],
      }
    }
  } catch (error) {
    return {
      title: 'Error | Generuss Blog',
      description: 'An error occurred while loading the blog post.',
      robots: 'noindex'
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    const navigationLinks = [
      { href: "/solutions", label: "Solutions" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ]

    // Structured data for Google
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.summary,
      image: post.headerImage?.url,
      datePublished: post.sys.createdAt,
      dateModified: post.sys.updatedAt,
      author: {
        '@type': 'Organization',
        name: 'Generuss',
        url: 'https://generuss.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Generuss',
        url: 'https://generuss.com'
      }
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

          {/* Navigation */}
          <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/10 backdrop-blur-md supports-[backdrop-filter]:bg-black/5">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
              <div className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent flex items-center"
                  aria-label="Return to homepage"
                >
                  Home
                </Link>
                <div className="hidden md:flex space-x-6">
                  <NavLink href="/solutions">
                    Solutions
                  </NavLink>
                  <NavLink href="/portfolio">
                    Portfolio
                  </NavLink>
                  <NavLink href="/blog">
                    Blog
                  </NavLink>
                  <NavLink href="/about">
                    About
                  </NavLink>
                  <NavLink href="/contact">
                    Contact
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  href="#"
                  className="group relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-out hover:text-white hidden md:flex"
                  aria-label="Request a demo"
                >
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/20 to-violet-600/20 opacity-50 group-hover:opacity-100 blur-sm transition-opacity" aria-hidden="true" />
                  <span className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-r from-teal-500/40 to-violet-600/40 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  <span className="relative text-white">Get a Demo</span>
                </Link>
                <div className="md:hidden">
                  <MobileNav links={navigationLinks} />
                </div>
              </div>
            </nav>
          </header>

          <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8 pt-32">
            <article 
              itemScope 
              itemType="https://schema.org/BlogPosting"
              className="bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-xl border border-gray-800/50 overflow-hidden"
            >
              <BlogPost post={post} />
            </article>
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
            Unable to load blog post. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}

