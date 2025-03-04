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
    <div className="w-full max-w-4xl mx-auto">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative group overflow-hidden rounded-xl bg-black/30 border border-white/10 transition-all duration-300 hover:border-white/20">
        {/* Gradient hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col">
          {/* Image section - taller now */}
          {post.headerImage && (
            <div className="relative h-96 overflow-hidden">
              <Image
                src={post.headerImage.url}
                alt={post.headerImage.description || post.title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
              
              {/* Overlay title on image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-teal-500/30 text-teal-300 text-xs rounded-full backdrop-blur-sm">Latest Post</span>
                  <time dateTime={post.sys.createdAt} className="text-gray-200 text-sm backdrop-blur-sm bg-black/20 px-2 py-1 rounded">{formattedDate}</time>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors drop-shadow-lg">
                  {post.title}
                </h2>
              </div>
            </div>
          )}
          
          {/* Content section */}
          <div className="p-8 relative z-10 flex flex-col">
            <p className="text-gray-300 mb-8 text-lg">
              {post.summary}
            </p>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="self-end inline-flex items-center px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 rounded-lg transition-all"
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