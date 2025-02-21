'use client'

import type { BlogPost as BlogPostType } from '@/app/lib/contentful'
import Image from 'next/image'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const formattedDate = new Date(post.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 
          itemProp="headline"
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent"
        >
          {post.title}
        </h1>
        
        <div className="flex items-center text-gray-400 mb-6">
          <time 
            dateTime={post.sys.createdAt}
            itemProp="datePublished"
            className="text-sm"
          >
            {formattedDate}
          </time>
          {post.sys.updatedAt !== post.sys.createdAt && (
            <time 
              dateTime={post.sys.updatedAt}
              itemProp="dateModified"
              className="text-sm ml-4"
            >
              (Updated: {new Date(post.sys.updatedAt).toLocaleDateString()})
            </time>
          )}
        </div>

        {post.headerImage && (
          <figure className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src={post.headerImage.url}
              alt={post.headerImage.description || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
              itemProp="image"
            />
          </figure>
        )}

        <p 
          className="text-xl text-gray-300 mb-8"
          itemProp="description"
        >
          {post.summary}
        </p>
      </header>

      <div 
        className="prose prose-invert prose-lg max-w-none"
        itemProp="articleBody"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-12 pt-8 border-t border-white/10">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Share this article:
            <div className="flex space-x-4 mt-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://generuss.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://generuss.com/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </article>
  )
} 