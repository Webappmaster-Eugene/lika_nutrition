import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://likanutrition.ru'
  const lastModified = new Date()

  // Одностраничник: одна запись без фрагментов (поисковики не индексируют #section)
  return [
    {
      url: baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl.replace(/\/$/, '')}/privacy/`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}
