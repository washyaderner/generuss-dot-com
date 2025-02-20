import { createClient } from 'contentful'

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

// Debug client configuration
console.log('Debug - Contentful Config:', {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  hasAccessToken: !!process.env.CONTENTFUL_ACCESS_TOKEN,
  tokenPrefix: process.env.CONTENTFUL_ACCESS_TOKEN?.substring(0, 5)
})

// Type for blog post from Contentful
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

// Fetch all blog posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    console.log('Debug - Fetching all posts')
    const response = await client.getEntries({
      content_type: 'blogPost',
      order: '-sys.createdAt',
    })
    console.log('Debug - Response:', {
      total: response.total,
      limit: response.limit,
      skip: response.skip,
      items: response.items?.length
    })
    return response.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      summary: item.fields.summary,
      headerImage: item.fields.headerImage?.fields
        ? {
            url: item.fields.headerImage.fields.file.url,
            description: item.fields.headerImage.fields.description,
          }
        : undefined,
      content: item.fields.content,
      sys: {
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
      },
    }))
  } catch (error) {
    console.error('Debug - Error fetching posts:', error)
    throw error
  }
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    console.log('Debug - Fetching post with slug:', slug)
    const response = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })
    console.log('Debug - Response for slug:', {
      total: response.total,
      limit: response.limit,
      skip: response.skip,
      items: response.items?.length
    })

    if (!response.items.length) {
      console.log('Debug - No post found with slug:', slug)
      return null
    }

    const item = response.items[0]
    return {
      title: item.fields.title,
      slug: item.fields.slug,
      summary: item.fields.summary,
      headerImage: item.fields.headerImage?.fields
        ? {
            url: item.fields.headerImage.fields.file.url,
            description: item.fields.headerImage.fields.description,
          }
        : undefined,
      content: item.fields.content,
      sys: {
        createdAt: item.sys.createdAt,
        updatedAt: item.sys.updatedAt,
      },
    }
  } catch (error) {
    console.error('Debug - Error fetching post by slug:', error)
    throw error
  }
} 