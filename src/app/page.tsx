import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WhatIsNutriciology from '@/components/sections/WhatIsNutriciology'
import HowICanHelp from '@/components/sections/HowICanHelp'
import Stats from '@/components/sections/Stats'
import Services from '@/components/sections/Services'
import ConsultationProcess from '@/components/sections/ConsultationProcess'
import RecommendedTests from '@/components/sections/RecommendedTests'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'
import StructuredData from '@/components/seo/StructuredData'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { getBreadcrumbListStructuredData } from '@/lib/utils/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Превентивный нутрициолог Лика | Восстановление энергии и ЖКТ',
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
  alternates: {
    canonical: 'https://lika-nutrition.ru',
  },
}

export default function HomePage() {
  const breadcrumbItems = [
    { name: 'Главная', url: 'https://lika-nutrition.ru' },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Hero />
      <About />
      <WhatIsNutriciology />
      <HowICanHelp />
      <Stats />
      <Services />
      <ConsultationProcess />
      <RecommendedTests />
      <Testimonials />
      <FAQ />
      <CTA />
      <Contact />
    </>
  )
}
