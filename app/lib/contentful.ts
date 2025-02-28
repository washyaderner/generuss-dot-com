import { createClient } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Helper function for environment-based logging
const log = {
  debug: (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contentful]', ...args)
    }
  },
  error: (...args: any[]) => {
    console.error('[Contentful]', ...args)
  }
}

// Our frontend type for blog posts
export interface BlogPost {
  title: string
  slug: string
  summary: string
  headerImage?: {
    url: string
    description: string
  }
  content: string
  contentRichText?: RichTextDocument
  sys: {
    createdAt: string
    updatedAt: string
  }
}

// Define the content type ID
const BLOG_POST_CONTENT_TYPE = 'blogPost'

/**
 * Safely transforms a Contentful entry to our frontend BlogPost type,
 * with proper type checking and fallbacks
 */
function transformEntryToBlogPost(entry: any): BlogPost {
  const { fields = {}, sys = {} } = entry || {}
  
  // Enhanced image extraction with additional logging
  let headerImage = undefined;
  
  try {
    if (fields.headerImage && fields.headerImage.fields) {
      const fileUrl = fields.headerImage.fields.file?.url || '';
      // Ensure URL has https: prefix
      const url = fileUrl.startsWith('//') 
        ? `https:${fileUrl}` 
        : fileUrl.startsWith('/') 
          ? `https:${fileUrl}` 
          : fileUrl;
      
      headerImage = {
        url: url,
        description: fields.headerImage.fields.description || '',
      }
      
      log.debug('Extracted header image:', headerImage);
    }
  } catch (error) {
    log.error('Error extracting header image:', error);
  }
  
  // Enhance content processing
  let content = fields.content || '';
  
  // Ensure image URLs have https: prefix - only if content is a string
  if (typeof content === 'string' && content.includes('<img')) {
    content = content.replace(/src="\/\//g, 'src="https://');
    content = content.replace(/src="\//g, 'src="https:/');
  }
  
  // Extract Rich Text content if available
  const contentRichText = fields.contentRichText || null;
  
  // Enhanced logging for debugging
  if (contentRichText) {
    log.debug('Found Rich Text content');
    // Log basic structure
    if (typeof contentRichText === 'object') {
      log.debug('Rich Text structure:', {
        type: typeof contentRichText,
        isNull: contentRichText === null,
        hasNodeType: contentRichText && 'nodeType' in contentRichText,
        nodeType: contentRichText && contentRichText.nodeType,
        hasContent: contentRichText && 'content' in contentRichText,
        contentIsArray: contentRichText && 'content' in contentRichText && Array.isArray(contentRichText.content)
      });
    } else {
      log.debug('Rich Text is not an object:', typeof contentRichText);
    }
  } else if (content) {
    log.debug('Found Markdown content');
  } else {
    log.debug('No content found');
  }
  
  return {
    title: fields.title || '',
    slug: fields.slug || '',
    summary: fields.summary || '',
    headerImage,
    content,
    contentRichText,
    sys: {
      createdAt: sys.createdAt || '',
      updatedAt: sys.updatedAt || '',
    },
  }
}

/**
 * Fetches all blog posts from Contentful
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    log.debug('Fetching all posts')
    
    const entries = await client.getEntries({
      content_type: BLOG_POST_CONTENT_TYPE,
      order: ['-sys.createdAt'],
      include: 2,
    })

    log.debug('Fetched posts:', {
      total: entries.total,
      limit: entries.limit,
      skip: entries.skip,
    })

    return entries.items.map(transformEntryToBlogPost)
  } catch (error: any) {
    log.error('Failed to fetch posts:', {
      message: error.message,
      details: error.details,
      status: error.status
    })
    return []
  }
}

/**
 * Fetches a single blog post by its slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    log.debug('Fetching post:', slug)
    
    const entries = await client.getEntries({
      content_type: BLOG_POST_CONTENT_TYPE,
      'fields.slug': slug,
      limit: 1,
      include: 2, // Include linked assets (e.g., images)
    })

    if (!entries.items.length) {
      log.debug('No post found with slug:', slug)
      return null
    }

    const post = transformEntryToBlogPost(entries.items[0])
    log.debug('Found post:', { 
      title: post.title, 
      hasHeaderImage: !!post.headerImage,
      contentLength: post.content.length
    })
    
    return post
  } catch (error: any) {
    log.error('Failed to fetch post:', {
      slug,
      message: error.message,
      details: error.details,
      status: error.status
    })
    return null
  }
} 