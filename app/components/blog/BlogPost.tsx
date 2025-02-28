'use client'

import React, { useEffect } from 'react'
import type { BlogPost as BlogPostType } from '@/app/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import MarkdownToJSX from 'markdown-to-jsx'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  const formattedDate = new Date(post.sys.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Function to render content based on available format
  const renderContent = () => {
    // Use Markdown content if available
    if (post.content) {
      console.log('Using Markdown content');
      return (
        <div className="prose prose-lg prose-invert w-full !max-w-full prose-p:text-gray-200 prose-p:leading-relaxed prose-p:text-justify prose-headings:text-teal-400 prose-strong:text-teal-400 prose-em:text-gray-300 prose-code:bg-gray-900 prose-code:text-gray-200 prose-blockquote:border-teal-500 prose-blockquote:text-gray-300 prose-a:text-teal-400 prose-li:text-gray-200 prose-li:leading-relaxed prose-pre:bg-gray-900 prose-pre:rounded-lg">
          <MarkdownToJSX>
            {post.content}
          </MarkdownToJSX>
        </div>
      );
    }
    
    // If no content is available
    return <p>No content available for this post.</p>;
  }

  // Process images and links after rendering
  useEffect(() => {
    // Find all images and make them responsive
    const images = document.querySelectorAll('#blog-content img')
    images.forEach((img) => {
      img.classList.add('max-w-full', 'h-auto', 'rounded-lg', 'mx-auto')
      // Add margin to the image using setAttribute instead of style.margin
      img.setAttribute('style', 'margin: 2rem auto;')
    })

    // Make external links open in new tab
    const links = document.querySelectorAll('#blog-content a')
    links.forEach((link) => {
      if (link.getAttribute('href')?.startsWith('http')) {
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      }
    })
  }, [post])

  return (
    <div className="container mx-auto pb-12">
      <div className="px-4 md:px-6 lg:px-8">
        <Link href="/blog" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200 inline-block mb-8">
          ← Back to all articles
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-teal-400">
          {post.title}
        </h1>
        
        <div className="text-gray-600 dark:text-gray-300 mb-8">
          {formattedDate}
          {post.sys.updatedAt !== post.sys.createdAt && (
            <span className="text-sm ml-2">
              (Updated: {new Date(post.sys.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              })})
            </span>
          )}
        </div>
      </div>
      
      {post.headerImage && (
        <div className="mb-8 px-4 md:px-6 lg:px-8">
          <Image
            src={post.headerImage.url}
            alt={post.headerImage.description || post.title}
            width={1200}
            height={630}
            className="rounded-lg w-full h-auto object-cover"
            priority
          />
        </div>
      )}
      
      <div 
        id="blog-content" 
        className="prose prose-lg dark:prose-invert w-full !max-w-none px-4 md:px-6 lg:px-8 py-4 md:py-6"
      >
        {renderContent()}
      </div>
    </div>
  )
} 