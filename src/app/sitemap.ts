import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/utils/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://likanutrition.ru').replace(/\/$/, '')
  const lastModified = new Date()

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    ...blogPosts,
    {
      url: `${baseUrl}/privacy/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/offer/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
