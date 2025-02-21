import { notFound } from "next/navigation"
import { getPostBySlug } from "@/app/lib/contentful"
import BlogPost from "@/app/components/blog/BlogPost"
import { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for each blog post
export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.sys.createdAt,
      modifiedTime: post.sys.updatedAt,
      images: post.headerImage 
        ? [post.headerImage.url, ...previousImages]
        : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.headerImage ? [post.headerImage.url] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <div className="container mx-auto">
        <BlogPost post={post} />
      </div>
    </div>
  )
}

