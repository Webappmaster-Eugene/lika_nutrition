import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug, getPostContentHtml } from '@/lib/utils/blog'
import StructuredData from '@/components/seo/StructuredData'
import {
  getArticleStructuredData,
  getBreadcrumbListStructuredData,
} from '@/lib/utils/seo'

interface BlogPostPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) {
    return { title: 'Статья не найдена' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://likanutrition.ru/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://likanutrition.ru/blog/${post.slug}/`,
      type: 'article',
      publishedTime: post.date,
      ...(post.image && { images: [{ url: `https://likanutrition.ru${post.image}` }] }),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const contentHtml = await getPostContentHtml(post.content)

  const breadcrumbData = getBreadcrumbListStructuredData([
    { name: 'Главная', url: '/' },
    { name: 'Блог', url: '/blog/' },
    { name: post.title },
  ])

  const articleData = getArticleStructuredData(
    post.title,
    post.excerpt,
    post.date,
    post.image
  )

  const formattedDate = new Date(post.date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-sage-50">
      <StructuredData data={breadcrumbData} />
      <StructuredData data={articleData} />

      <div className="container mx-auto py-12 xs:py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Навигация */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-8 text-sm xs:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>

          {/* Заголовок */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Мета */}
          <div className="flex flex-wrap items-center gap-4 text-sage-500 text-sm xs:text-base mb-8">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                <span>{post.tags.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Изображение */}
          {post.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Контент */}
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Автор */}
          <div className="mt-12 p-5 xs:p-6 bg-white rounded-2xl border border-sage-200/50 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="relative w-14 h-14 xs:w-16 xs:h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/images/photos/photo-2.jpg"
                  alt="Лика Надточеева"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-serif font-semibold text-sage-900 text-base xs:text-lg">
                  Лика Надточеева
                </p>
                <p className="text-sage-500 text-sm xs:text-base">
                  Превентивный нутрициолог, health-coach
                </p>
                <Link
                  href="/about"
                  className="text-accent-500 hover:text-accent-600 text-sm font-medium"
                >
                  Подробнее обо мне &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Навигация */}
          <div className="mt-12 pt-8 border-t border-sage-200 flex flex-col sm:flex-row gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 hover:bg-sage-600 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Все статьи
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-400 hover:bg-accent-500 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
            >
              Записаться на консультацию
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
