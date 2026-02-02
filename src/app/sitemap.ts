import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const lastModified = new Date()

  // Основные секции сайта с приоритетами
  const sections = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '#about', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '#nutriciology', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '#services', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '#testimonials', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '#faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '#contact', priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  return sections.map((section) => ({
    url: `${baseUrl}${section.path}`,
    lastModified,
    changeFrequency: section.changeFrequency,
    priority: section.priority,
  }))
}
