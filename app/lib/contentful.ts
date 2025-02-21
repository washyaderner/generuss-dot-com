import { createClient, Entry, EntryCollection } from 'contentful'

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

// Our frontend type that matches what we use in components
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

// Contentful's type structure
interface BlogPostFields {
  title: string
  slug: string
  summary: string
  headerImage?: {
    fields: {
      file: {
        url: string
      }
      description?: string
    }
  }
  content: string
}

// Transform Contentful entry to our frontend type
function transformEntry(entry: Entry<BlogPostFields>): BlogPost {
  const { fields, sys } = entry
  
  return {
    title: fields.title,
    slug: fields.slug,
    summary: fields.summary,
    headerImage: fields.headerImage?.fields
      ? {
          url: `https:${fields.headerImage.fields.file.url}`,
          description: fields.headerImage.fields.description || '',
        }
      : undefined,
    content: fields.content,
    sys: {
      createdAt: sys.createdAt,
      updatedAt: sys.updatedAt,
    },
  }
}

// Fetch all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    log.debug('Fetching all posts')
    const entries = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      order: ['-sys.createdAt'],
      include: 2,
    })

    log.debug('Fetched posts:', {
      total: entries.total,
      limit: entries.limit,
      skip: entries.skip,
    })

    return entries.items.map(transformEntry)
  } catch (error: any) {
    log.error('Failed to fetch posts:', {
      message: error.message,
      details: error.details,
      status: error.status
    })
    return []
  }
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    log.debug('Fetching post:', slug)
    const entries = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })

    if (!entries.items.length) {
      log.debug('No post found with slug:', slug)
      return null
    }

    return transformEntry(entries.items[0])
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