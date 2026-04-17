import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  AlertCircle,
  Lightbulb,
  Sparkles,
  FileSearch,
  TrendingUp,
  Heart,
  Award,
} from 'lucide-react'
import { aboutContent } from '@/lib/content/about'
import StructuredData from '@/components/seo/StructuredData'
import {
  getPersonStructuredData,
  getBreadcrumbListStructuredData,
} from '@/lib/utils/seo'

export const metadata: Metadata = {
  title: 'Обо мне — Нутрициолог Лика Надточеева',
  description:
    'Лика Надточеева — превентивный нутрициолог, health-coach и специалист по образу жизни. Моя история, образование и подход к работе.',
  keywords: [
    'превентивный нутрициолог',
    'нутрициолог онлайн',
    'Лика Надточеева',
    'нутрициолог health coach',
    'нутрициолог консультант',
  ],
  alternates: {
    canonical: 'https://likanutrition.ru/about/',
  },
  openGraph: {
    title: 'Обо мне — Нутрициолог Лика Надточеева',
    description:
      'Мой путь от личных проблем со здоровьем к профессии нутрициолога. История, образование и подход к работе.',
    url: 'https://likanutrition.ru/about/',
    images: [{ url: 'https://likanutrition.ru/images/photos/photo-2.jpg' }],
  },
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertCircle,
  Lightbulb,
  Sparkles,
  FileSearch,
  TrendingUp,
  Heart,
  Award,
}

export default function AboutPage() {
  const breadcrumbData = getBreadcrumbListStructuredData([
    { name: 'Главная', url: '/' },
    { name: 'Обо мне' },
  ])
  const personData = getPersonStructuredData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-sage-50">
      <StructuredData data={breadcrumbData} />
      <StructuredData data={personData} />

      <div className="container mx-auto py-12 xs:py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Навигация */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-8 text-sm xs:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10 mb-12 xs:mb-16 items-center">
            <div>
              <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-4">
                {aboutContent.name}
              </h1>
              <p className="text-accent-500 font-semibold text-lg xs:text-xl mb-4">
                {aboutContent.title}
              </p>
              <p className="text-sage-700 text-sm xs:text-base leading-relaxed whitespace-pre-line">
                {aboutContent.description.trim()}
              </p>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/photos/photo-2.jpg"
                alt="Лика Надточеева — нутрициолог"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Подзаголовок */}
          <h2 className="font-serif text-2xl xs:text-3xl font-bold text-sage-900 mb-8 xs:mb-10">
            {aboutContent.subtitle}
          </h2>

          {/* Timeline */}
          <div className="space-y-8 xs:space-y-10 mb-12 xs:mb-16">
            {aboutContent.story.timeline.map((item) => {
              const Icon = iconMap[item.icon] || AlertCircle
              return (
                <div key={item.id} className="flex gap-4 xs:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-sage-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 xs:w-6 xs:h-6 text-sage-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg xs:text-xl font-semibold text-sage-900 mb-2">
                      {item.title}
                    </h3>
                    {item.highlight && (
                      <div className="inline-block bg-accent-400/10 text-accent-600 text-xs xs:text-sm font-semibold px-3 py-1 rounded-full mb-3">
                        {item.highlight}
                      </div>
                    )}
                    <div className="text-sage-700 text-sm xs:text-base leading-relaxed whitespace-pre-line">
                      {item.text}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Философия */}
          <div className="bg-sage-50 border border-sage-200/50 rounded-2xl p-6 xs:p-8 mb-12 xs:mb-16 text-center">
            <blockquote className="font-serif text-xl xs:text-2xl text-sage-900 italic leading-relaxed">
              &laquo;{aboutContent.story.philosophy.text}&raquo;
            </blockquote>
          </div>

          {/* Рекомендуемые анализы */}
          <section className="mb-12 xs:mb-16">
            <h2 className="font-serif text-2xl xs:text-3xl font-bold text-sage-900 mb-3">
              {aboutContent.recommendedTests.title}
            </h2>
            <p className="text-sage-600 mb-6 text-sm xs:text-base">
              {aboutContent.recommendedTests.description}
            </p>
            <div className="bg-white rounded-2xl border border-sage-200/50 shadow-sm p-5 xs:p-6">
              <ul className="space-y-2 text-sage-800 text-sm xs:text-base">
                {aboutContent.recommendedTests.tests.map((test, i) => {
                  if (typeof test === 'string') {
                    return (
                      <li key={i} className="flex gap-2">
                        <span className="text-sage-400 flex-shrink-0">&bull;</span>
                        <span>{test}</span>
                      </li>
                    )
                  }
                  return (
                    <li key={i}>
                      <p className="font-semibold text-sage-900 mt-3 mb-1">{test.category}</p>
                      <ul className="space-y-1 pl-4">
                        {test.items.map((item, j) => (
                          <li key={j} className="flex gap-2">
                            <span className="text-sage-400 flex-shrink-0">&ndash;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sage-700 hover:bg-sage-600 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
            >
              Мои услуги
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-400 hover:bg-accent-500 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
            >
              Записаться на консультацию
            </Link>
          </div>

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
