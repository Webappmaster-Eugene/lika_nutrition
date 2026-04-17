import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Check, X } from 'lucide-react'
import { services } from '@/lib/content/services'
import { serviceTableColumns, serviceTableRows } from '@/lib/content/servicesTable'
import { processSteps } from '@/lib/content/process'
import StructuredData from '@/components/seo/StructuredData'
import {
  getServiceStructuredDataExtended,
  getBreadcrumbListStructuredData,
} from '@/lib/utils/seo'

export const metadata: Metadata = {
  title: 'Услуги нутрициолога — Консультации и программы питания',
  description:
    'Услуги превентивного нутрициолога Лики Надточеевой: индивидуальные консультации, программы питания, сопровождение. Цены от 3 500 ₽. Онлайн по всей России.',
  keywords: [
    'консультация нутрициолога',
    'программа питания',
    'нутрициолог цены',
    'индивидуальная программа питания',
    'сопровождение нутрициолога',
    'нутрициолог онлайн',
  ],
  alternates: {
    canonical: 'https://likanutrition.ru/services/',
  },
  openGraph: {
    title: 'Услуги нутрициолога Лики Надточеевой',
    description:
      'Индивидуальные консультации, программы питания и сопровождение. Онлайн по всей России.',
    url: 'https://likanutrition.ru/services/',
  },
}

export default function ServicesPage() {
  const breadcrumbData = getBreadcrumbListStructuredData([
    { name: 'Главная', url: '/' },
    { name: 'Услуги' },
  ])

  const servicesData = services.map((s) =>
    getServiceStructuredDataExtended(s.title, s.description, s.price.replace(/\s/g, '').replace('₽', ''))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-sage-50">
      <StructuredData data={breadcrumbData} />
      {servicesData.map((sd, i) => (
        <StructuredData key={i} data={sd} />
      ))}

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
            Услуги
          </h1>
          <p className="text-sage-600 mb-10 xs:mb-12 text-sm xs:text-base leading-relaxed max-w-2xl">
            Я предлагаю разные форматы работы — от разовой консультации до глубокого сопровождения.
            Каждый пакет подобран так, чтобы вы получили именно тот уровень поддержки, который
            нужен на вашем этапе. Все услуги оказываются онлайн, доступны из любой точки России.
          </p>

          {/* Карточки услуг */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mb-16 xs:mb-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-shadow p-5 xs:p-6 flex flex-col ${
                  index === 2
                    ? 'border-accent-400 ring-1 ring-accent-200'
                    : 'border-sage-200/50'
                }`}
              >
                {index === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-400 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    Популярный выбор
                  </div>
                )}
                <h2 className="font-serif text-lg xs:text-xl font-bold text-sage-900 mb-2">
                  {service.title}
                </h2>
                <p className="text-accent-500 font-bold text-xl xs:text-2xl mb-4">
                  {service.price}
                </p>
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-sage-500 text-xs font-semibold uppercase tracking-wider mb-1">
                      Для кого:
                    </p>
                    <p className="text-sage-700 text-sm xs:text-base leading-relaxed">
                      {service.targetAudience}
                    </p>
                  </div>
                  <div>
                    <p className="text-sage-500 text-xs font-semibold uppercase tracking-wider mb-1">
                      Фишка:
                    </p>
                    <p className="text-sage-700 text-sm xs:text-base leading-relaxed">
                      {service.highlight}
                    </p>
                  </div>
                </div>
                <Link
                  href="/#contact"
                  className="mt-5 block text-center px-5 py-3 bg-sage-700 hover:bg-sage-600 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
                >
                  Записаться
                </Link>
              </div>
            ))}
          </div>

          {/* Таблица сравнения */}
          <section className="mb-16 xs:mb-20">
            <h2 className="font-serif text-2xl xs:text-3xl font-bold text-sage-900 mb-6 xs:mb-8">
              Сравнение пакетов
            </h2>
            <div className="overflow-x-auto -mx-4 px-4">
              <table className="w-full min-w-[800px] text-sm">
                <thead>
                  <tr className="border-b-2 border-sage-200">
                    <th className="text-left py-3 px-3 text-sage-900 font-semibold w-[200px]">
                      Что входит
                    </th>
                    {serviceTableColumns.map((col) => (
                      <th
                        key={col.key}
                        className="py-3 px-2 text-center text-sage-800 font-medium text-xs leading-tight"
                      >
                        <div>{col.label}</div>
                        <div className="text-accent-500 font-bold mt-1">{col.price}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {serviceTableRows.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-sage-100 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-sage-50/30'
                      }`}
                    >
                      <td className="py-3 px-3 text-sage-800 font-medium">{row.feature}</td>
                      {serviceTableColumns.map((col) => (
                        <td key={col.key} className="py-3 px-2 text-center">
                          {row[col.key as keyof typeof row] ? (
                            <Check className="w-5 h-5 text-sage-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-beige-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Как проходит работа */}
          <section className="mb-16 xs:mb-20">
            <h2 className="font-serif text-2xl xs:text-3xl font-bold text-sage-900 mb-6 xs:mb-8">
              Как проходит работа
            </h2>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-4 xs:gap-5">
                  <div className="flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-sage-100 text-sage-700 font-bold flex items-center justify-center text-sm xs:text-base">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-serif text-lg xs:text-xl font-semibold text-sage-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sage-700 text-sm xs:text-base leading-relaxed whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-sage-200/30 shadow-lg p-6 xs:p-8 text-center">
            <h2 className="font-serif text-2xl xs:text-3xl font-bold text-sage-900 mb-3">
              Готовы начать?
            </h2>
            <p className="text-sage-600 mb-6 text-sm xs:text-base max-w-lg mx-auto">
              Запишитесь на бесплатную консультацию, и я помогу подобрать оптимальный
              формат работы под ваш запрос.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-400 hover:bg-accent-500 text-white rounded-xl transition-colors text-sm xs:text-base font-semibold shadow-md"
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
