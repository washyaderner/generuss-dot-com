'use client'

import React from 'react'
import { BlogPost } from '@/app/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface FeaturedBlogPostProps {
  post: BlogPost
}

export default function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  const formattedDate = new Date(post.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Create structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.headerImage?.url,
    datePublished: post.sys.createdAt,
    dateModified: post.sys.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Russell Gardner'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Generuss',
      logo: {
        '@type': 'ImageObject',
        url: 'https://generuss.com/logo.png' // Update with actual logo URL
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://generuss.com/blog/${post.slug}`
    }
  }

  return (
    <div className="w-full">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative group overflow-hidden rounded-xl bg-black/30 border border-white/10 transition-all duration-300 hover:border-white/20">
        {/* Gradient hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          {post.headerImage && (
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <Image
                src={post.headerImage.url}
                alt={post.headerImage.description || post.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-0 md:opacity-50" />
            </div>
          )}
          
          {/* Content section */}
          <div className="p-6 md:w-1/2 relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full">Latest Post</span>
                <time dateTime={post.sys.createdAt} className="text-gray-400 text-sm">{formattedDate}</time>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-gray-300 mb-6 line-clamp-3">
                {post.summary}
              </p>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors"
              aria-label={`Read full article: ${post.title}`}
            >
              <span>Read full article</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 