'use client'

import { usePathname } from 'next/navigation'
import StructuredData from './StructuredData'
import { getBreadcrumbListStructuredData } from '@/lib/utils/seo'
import { siteConfig } from '@/lib/constants/seo'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  showVisual?: boolean
}

export default function Breadcrumbs({ items, showVisual = false }: BreadcrumbsProps) {
  const pathname = usePathname()
  
  // Для одностраничного сайта создаем виртуальные breadcrumbs
  const defaultItems: BreadcrumbItem[] = [
    { name: 'Главная', url: siteConfig.url },
  ]

  // Если передан hash из URL, добавляем секцию
  if (typeof window !== 'undefined') {
    const hash = window.location.hash
    if (hash) {
      const sectionNames: Record<string, string> = {
        '#about': 'О специалисте',
        '#nutriciology': 'О нутрициологии',
        '#services': 'Услуги',
        '#testimonials': 'Отзывы',
        '#faq': 'FAQ',
        '#contact': 'Контакты',
      }
      const sectionName = sectionNames[hash]
      if (sectionName) {
        defaultItems.push({
          name: sectionName,
          url: `${siteConfig.url}${hash}`,
        })
      }
    }
  }

  const breadcrumbItems = items || defaultItems
  const structuredData = getBreadcrumbListStructuredData(breadcrumbItems)

  return (
    <>
      <StructuredData data={structuredData} />
      {showVisual && (
        <nav aria-label="Хлебные крошки" className="container mx-auto py-4">
          <ol className="flex items-center gap-2 text-sm text-beige-600">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                {item.url ? (
                  <Link
                    href={item.url}
                    className="hover:text-beige-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-beige-800 font-medium">{item.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  )
}
