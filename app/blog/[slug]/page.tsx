import { notFound } from "next/navigation"
import { getPostBySlug } from "@/app/lib/contentful"
import BlogPost from "@/app/components/blog/BlogPost"

export const revalidate = 3600 // Revalidate every hour

interface BlogPostPageProps {
  params: {
    slug: string
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

