'use client'

import Image from 'next/image'
import Markdown from 'markdown-to-jsx'
import { BlogPost as BlogPostType } from '@/app/lib/contentful'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
        <div className="text-gray-400 mb-6">
          {new Date(post.sys.createdAt).toLocaleDateString()}
        </div>
        {post.headerImage && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={`https:${post.headerImage.url}`}
              alt={post.headerImage.description}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>
      <div className="prose prose-invert prose-lg max-w-none">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  )
} 