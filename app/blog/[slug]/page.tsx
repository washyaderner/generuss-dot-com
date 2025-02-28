import { notFound } from "next/navigation"
import { getPostBySlug } from "@/app/lib/contentful"
import BlogPost from "@/app/components/blog/BlogPost"
import { Metadata } from 'next'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

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
      <div className="min-h-screen bg-black pt-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="container mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <article 
            itemScope 
            itemType="https://schema.org/BlogPosting"
            className="bg-gray-900/30 rounded-lg backdrop-blur-sm shadow-xl border border-gray-800/50 overflow-hidden"
          >
            <BlogPost post={post} />
          </article>
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

