'use client'

import { BlogPost } from '@/app/lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group relative bg-black/20 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          {/* Hover Effect Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-violet-600/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="p-6 relative z-10">
            {post.headerImage && (
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.headerImage.url}
                  alt={post.headerImage.description || post.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-teal-400 transition-colors">
              {post.title}
            </h2>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {post.summary}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {new Date(post.sys.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="text-teal-500 group-hover:text-teal-400 transition-colors">
                Read more →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 