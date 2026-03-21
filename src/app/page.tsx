import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Benefits from '@/components/sections/Benefits'
import ThreePillars from '@/components/sections/ThreePillars'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import ContactFooter from '@/components/sections/ContactFooter'
import StructuredData from '@/components/seo/StructuredData'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { getBreadcrumbListStructuredData } from '@/lib/utils/seo'
import type { Metadata } from 'next'
import { META_DESCRIPTION_SHORT } from '@/lib/constants/seo'

export const metadata: Metadata = {
  title: 'Превентивный нутрициолог Лика Надточеева | Восстановление энергии и ЖКТ',
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
  alternates: {
    canonical: 'https://likanutrition.ru',
  },
}

export default function HomePage() {
  const breadcrumbItems = [
    { name: 'Главная', url: 'https://likanutrition.ru' },
  ]

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Hero />
      <About />
      <Benefits />
      <ThreePillars />
      <Process />
      <Services />
      <Testimonials />
      <FAQ />
      <ContactFooter />
    </>
  )
}
