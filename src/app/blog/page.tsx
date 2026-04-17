import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts } from '@/lib/utils/blog'
import BlogCard from '@/components/blog/BlogCard'
import StructuredData from '@/components/seo/StructuredData'
import { getBreadcrumbListStructuredData } from '@/lib/utils/seo'

export const metadata: Metadata = {
  title: 'Блог о нутрициологии и здоровом питании',
  description:
    'Статьи нутрициолога Лики Надточеевой о здоровом питании, восстановлении энергии, работе ЖКТ, дефицитах витаминов и микроэлементов.',
  keywords: [
    'блог нутрициолога',
    'статьи о питании',
    'здоровое питание',
    'нутрициология',
    'дефициты витаминов',
    'хроническая усталость',
  ],
  alternates: {
    canonical: 'https://likanutrition.ru/blog/',
  },
  openGraph: {
    title: 'Блог нутрициолога Лики Надточеевой',
    description: 'Полезные статьи о нутрициологии, питании и здоровом образе жизни.',
    url: 'https://likanutrition.ru/blog/',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  const breadcrumbData = getBreadcrumbListStructuredData([
    { name: 'Главная', url: '/' },
    { name: 'Блог' },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-sage-50">
      <StructuredData data={breadcrumbData} />

      <div className="container mx-auto py-12 xs:py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Навигация */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-8 text-sm xs:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Заголовок */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-4">
            Блог
          </h1>
          <p className="text-sage-600 mb-10 xs:mb-12 text-sm xs:text-base leading-relaxed max-w-2xl">
            Полезные материалы о нутрициологии, питании и здоровом образе жизни.
            Делюсь знаниями, которые помогают разобраться в себе и своём теле.
          </p>

          {/* Статьи */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 xs:py-20">
              <p className="text-sage-500 text-lg xs:text-xl">
                Скоро здесь появятся статьи о нутрициологии и здоровом питании.
              </p>
            </div>
          )}

          {/* Кнопка назад */}
          <div className="mt-12 pt-8 border-t border-sage-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 hover:bg-sage-600 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
