'use client'

import { BlogPost } from '@/app/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link 
          key={post.slug} 
          href={`/blog/${post.slug}`}
          className="group hover:no-underline"
        >
          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 ease-in-out group-hover:transform group-hover:scale-105">
            {post.headerImage && (
              <div className="relative w-full h-48">
                <Image
                  src={post.headerImage.url}
                  alt={post.headerImage.description || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary">
                {post.title}
              </h2>
              {post.summary && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.summary}
                </p>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
} 