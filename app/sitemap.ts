import type { MetadataRoute } from "next"
import { getAllPosts } from "@/app/lib/contentful"

export const revalidate = 3600

const BASE = "https://generuss.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: post.sys?.updatedAt ? new Date(post.sys.updatedAt) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ]
}
