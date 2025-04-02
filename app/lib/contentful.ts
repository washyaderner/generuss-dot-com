import { createClient } from 'contentful'

// Initialize Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN || '',
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
  
  // Safe extraction with fallbacks
  const headerImage = fields.headerImage && fields.headerImage.fields
    ? {
        url: `https:${fields.headerImage.fields.file?.url || ''}`,
        description: fields.headerImage.fields.description || '',
      }
    : undefined
  
  return {
    title: fields.title || '',
    slug: fields.slug || '',
    summary: fields.summary || '',
    headerImage,
    content: fields.content || '',
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
    })

    if (!entries.items.length) {
      log.debug('No post found with slug:', slug)
      return null
    }

    return transformEntryToBlogPost(entries.items[0])
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