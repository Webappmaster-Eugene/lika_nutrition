import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { META_DESCRIPTION_SHORT } from '@/lib/constants/seo'
import { getStructuredDataGraph } from '@/lib/utils/seo'

const inter = Inter({ subsets: ['cyrillic', 'latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://likanutrition.ru'),
  title: {
    default: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
    template: '%s | Нутрициолог Лика'
  },
  description: META_DESCRIPTION_SHORT,
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
    url: 'https://likanutrition.ru',
    siteName: 'Нутрициолог Лика',
    title: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
    description: META_DESCRIPTION_SHORT,
    images: [
      {
        url: '/images/about/nutritionist.jpg',
        width: 1200,
        height: 630,
        alt: 'Превентивный нутрициолог Лика - Восстановление энергии и ЖКТ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
    description: META_DESCRIPTION_SHORT,
    images: ['/images/about/nutritionist.jpg'],
  },
  alternates: {
    canonical: 'https://likanutrition.ru',
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
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && { yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }),
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
  const structuredDataGraph = getStructuredDataGraph()

  return (
    <html lang="ru">
      <head>
        {/* Preconnect для внешних ресурсов */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch для улучшения производительности */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Структурированные данные (единый @graph по рекомендации Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataGraph) }}
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
