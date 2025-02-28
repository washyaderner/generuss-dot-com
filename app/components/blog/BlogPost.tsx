'use client'

import React, { useEffect } from 'react'
import type { BlogPost as BlogPostType } from '@/app/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS, Document } from '@contentful/rich-text-types'
import ReactMarkdown from 'react-markdown'

// Helper function to check if an object is a valid Rich Text document
function isValidRichTextDocument(obj: any): obj is Document {
  return (
    obj && 
    typeof obj === 'object' && 
    obj.nodeType === 'document' && 
    Array.isArray(obj.content)
  );
}

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
    // Debug the content structure
    console.log('Content type:', typeof post.contentRichText);
    console.log('Content structure:', post.contentRichText ? 
      JSON.stringify({
        hasNodeType: post.contentRichText && 'nodeType' in post.contentRichText,
        nodeType: post.contentRichText && 'nodeType' in post.contentRichText ? post.contentRichText.nodeType : null,
        hasContent: post.contentRichText && 'content' in post.contentRichText,
        isValidDocument: isValidRichTextDocument(post.contentRichText)
      }) : 'null'
    );
    
    // Check if we have Rich Text content and it's a valid document
    if (post.contentRichText && isValidRichTextDocument(post.contentRichText)) {
      console.log('Rendering Rich Text content');
      
      // Define rendering options for Rich Text
      const options = {
        renderMark: {
          [MARKS.BOLD]: (text: React.ReactNode) => <strong className="text-teal-400">{text}</strong>,
          [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
          [MARKS.CODE]: (text: React.ReactNode) => <code className="px-1 py-0.5 rounded bg-gray-800 text-gray-200 font-mono text-sm">{text}</code>,
        },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => <p className="mb-4 leading-relaxed text-gray-200 text-justify w-full">{children}</p>,
          [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => <h1 className="mb-4 text-3xl font-bold text-teal-400 w-full">{children}</h1>,
          [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => <h2 className="mb-3 text-2xl font-bold text-teal-400 w-full">{children}</h2>,
          [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => <h3 className="mb-3 text-xl font-bold text-teal-400 w-full">{children}</h3>,
          [BLOCKS.HEADING_4]: (node: any, children: React.ReactNode) => <h4 className="mb-2 text-lg font-bold text-teal-400 w-full">{children}</h4>,
          [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-200 w-full">{children}</ul>,
          [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-200 w-full">{children}</ol>,
          [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => <li>{children}</li>,
          [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => <blockquote className="pl-4 italic border-l-4 border-teal-500 text-gray-300 my-4 w-full">{children}</blockquote>,
          [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
            const { data } = node
            return (
              <a href={data.uri} className="text-teal-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          },
          [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
            const { data } = node
            const { target } = data
            if (target.fields.file && target.fields.file.url) {
              return (
                <div className="my-6 w-full">
                  <Image
                    src={`https:${target.fields.file.url}`}
                    alt={target.fields.description || 'Blog image'}
                    width={800}
                    height={400}
                    className="rounded-lg mx-auto"
                  />
                  {target.fields.description && (
                    <p className="text-sm text-center mt-2 text-gray-400">{target.fields.description}</p>
                  )}
                </div>
              )
            }
            return null
          },
        },
      };
      
      try {
        // Return the rendered Rich Text content wrapped in a fragment
        return (
          <div className="w-full">
            {documentToReactComponents(post.contentRichText, options)}
          </div>
        );
      } catch (error) {
        console.error('Error rendering Rich Text:', error);
        // Fall back to Markdown if Rich Text rendering fails
        if (post.content) {
          console.log('Falling back to Markdown content');
          return (
            <div className="prose prose-lg prose-invert w-full !max-w-full prose-p:text-gray-200 prose-p:leading-relaxed prose-p:text-justify prose-headings:text-teal-400 prose-strong:text-teal-400 prose-em:text-gray-300 prose-code:bg-gray-900 prose-code:text-gray-200 prose-blockquote:border-teal-500 prose-blockquote:text-gray-300 prose-a:text-teal-400 prose-li:text-gray-200 prose-li:leading-relaxed prose-pre:bg-gray-900 prose-pre:rounded-lg">
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
            </div>
          );
        }
        return <p className="text-red-500">Error rendering content</p>;
      }
    } else if (post.content) {
      // If no Rich Text or it's invalid, use ReactMarkdown for Markdown content
      console.log('Using Markdown content');
      return (
        <div className="prose prose-lg prose-invert w-full !max-w-full prose-p:text-gray-200 prose-p:leading-relaxed prose-p:text-justify prose-headings:text-teal-400 prose-strong:text-teal-400 prose-em:text-gray-300 prose-code:bg-gray-900 prose-code:text-gray-200 prose-blockquote:border-teal-500 prose-blockquote:text-gray-300 prose-a:text-teal-400 prose-li:text-gray-200 prose-li:leading-relaxed prose-pre:bg-gray-900 prose-pre:rounded-lg">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
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