'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ProcessGalleryModal } from '@/components/ui/ProcessGalleryModal'
import { User, FlaskConical, HeartHandshake, Eye } from 'lucide-react'

const pillars = [
  {
    icon: User,
    title: 'Индивидуальный подход',
    description: 'Каждый человек уникален, и я разрабатываю персонализированные решения, которые подходят именно вам.',
  },
  {
    icon: FlaskConical,
    title: 'Проверенные решения',
    description: 'Я использую только научно обоснованные методы и подходы, которые зарекомендовали себя на практике.',
  },
  {
    icon: HeartHandshake,
    title: 'Гармония тела и разума',
    description: 'Я нутрициолог с коучинговым подходом. Поэтому работаю не только с анализами и симптомами, а смотрю намного глубже: Ваши привычки, образ жизни, мышление и уровень стресса.',
  },
]

export default function ThreePillars() {
  const [isProcessOpen, setIsProcessOpen] = useState(false)

  return (
    <>
      <AnimatedSection
        id="three-pillars"
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-sage-50 relative overflow-hidden"
      >
        {/* Декоративный фон с листочками */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 100 Q120 60 160 80 Q130 110 100 100Z" fill="#4A6741" />
            <path d="M300 50 Q320 10 360 30 Q330 60 300 50Z" fill="#4A6741" />
            <path d="M600 120 Q620 80 660 100 Q630 130 600 120Z" fill="#4A6741" />
            <path d="M150 400 Q170 360 210 380 Q180 410 150 400Z" fill="#4A6741" />
            <path d="M500 450 Q520 410 560 430 Q530 460 500 450Z" fill="#4A6741" />
            <path d="M700 350 Q720 310 760 330 Q730 360 700 350Z" fill="#4A6741" />
            <path d="M50 250 Q70 210 110 230 Q80 260 50 250Z" fill="#4A6741" />
            <path d="M400 300 Q420 260 460 280 Q430 310 400 300Z" fill="#4A6741" />
            <path d="M250 500 Q270 460 310 480 Q280 510 250 500Z" fill="#4A6741" />
            <path d="M650 500 Q670 460 710 480 Q680 510 650 500Z" fill="#4A6741" />
          </svg>
        </div>

        <div className="container mx-auto w-full max-w-full relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8 xs:mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-sage-900 mb-3 xs:mb-4">
                Моя работа строится на трёх китах
              </h2>
              <div className="w-24 h-1 bg-sage-600 mx-auto rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 mb-8 xs:mb-12">
              {pillars.map((pillar, index) => {
                const IconComponent = pillar.icon
                return (
                  <motion.div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-6 xs:p-8 rounded-2xl shadow-md border border-sage-200 text-center hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <IconComponent className="w-8 h-8 text-sage-700" />
                    </div>
                    <h3 className="text-lg xs:text-xl font-bold text-sage-900 mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setIsProcessOpen(true)}
                className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-sage-700 text-white rounded-full font-semibold hover:bg-sage-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
              >
                <Eye className="w-5 h-5" />
                Подсмотреть процесс работы
              </button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <ProcessGalleryModal isOpen={isProcessOpen} onClose={() => setIsProcessOpen(false)} />
    </>
  )
}
