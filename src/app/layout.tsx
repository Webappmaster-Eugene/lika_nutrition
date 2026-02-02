import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  getOrganizationStructuredData,
  getPersonStructuredData,
  getLocalBusinessStructuredData,
  getWebSiteStructuredData,
} from '@/lib/utils/seo'

const inter = Inter({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lika-nutrition.ru'),
  title: {
    default: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
    template: '%s | Нутрициолог Лика'
  },
  description: 'Превентивный нутрициолог Лика. Восстановление энергии, нормализация ЖКТ, здоровый вес без диет. Индивидуальные программы питания, консультации онлайн. Работа с дефицитами витаминов, анемией, хронической усталостью.',
  keywords: [
    'превентивный нутрициолог',
    'нутрициолог онлайн',
    'консультация нутрициолога',
    'восстановление энергии',
    'нормализация ЖКТ',
    'здоровый вес без диет',
    'индивидуальная программа питания',
    'персональное питание',
    'хроническая усталость',
    'низкий ферритин',
    'железодефицитная анемия',
    'дефициты витаминов',
    'изжога вздутие',
    'проблемы с пищеварением',
    'нутрициолог для женщин',
    'здоровое питание',
    'правильное питание',
    'нутрициология',
    'консультация диетолога онлайн',
    'программа питания',
    'восстановление здоровья',
    'повышение энергии',
    'нормализация веса',
  ],
  authors: [{ name: 'Нутрициолог Лика' }],
  creator: 'Нутрициолог Лика',
  publisher: 'Нутрициолог Лика',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://lika-nutrition.ru',
    siteName: 'Нутрициолог Лика',
    title: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
    description: 'Превентивный нутрициолог Лика. Восстановление энергии, нормализация ЖКТ, здоровый вес без диет. Индивидуальные программы питания, консультации онлайн. Работа с дефицитами витаминов, анемией, хронической усталостью.',
    images: [
      {
        url: 'https://lika-nutrition.ru/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Превентивный нутрициолог Лика - Восстановление энергии и ЖКТ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
    description: 'Превентивный нутрициолог Лика. Восстановление энергии, нормализация ЖКТ, здоровый вес без диет. Индивидуальные программы питания, консультации онлайн. Работа с дефицитами витаминов, анемией, хронической усталостью.',
    images: ['https://lika-nutrition.ru/images/twitter-card.jpg'],
  },
  alternates: {
    canonical: 'https://lika-nutrition.ru',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'your-google-verification-code',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  category: 'Health & Wellness',
  classification: 'Nutritionist Services',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationData = getOrganizationStructuredData()
  const personData = getPersonStructuredData()
  const localBusinessData = getLocalBusinessStructuredData()
  const webSiteData = getWebSiteStructuredData()

  return (
    <html lang="ru">
      <head>
        {/* Preconnect для внешних ресурсов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch для улучшения производительности */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteData) }}
        />
        
        {/* Referrer Policy - единственный security meta-тег, который работает в HTML */}
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body className={`${inter.className} w-full max-w-full overflow-x-hidden`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-beige-600 focus:text-white">
          Перейти к основному содержимому
        </a>
        <Header />
        <main id="main-content" className="min-h-screen w-full max-w-full overflow-x-hidden" role="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
