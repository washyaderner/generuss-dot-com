import { createClient } from 'contentful'

// Initialize Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
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
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
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
}

// Fetch a single blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })

  if (!response.items.length) {
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
} 