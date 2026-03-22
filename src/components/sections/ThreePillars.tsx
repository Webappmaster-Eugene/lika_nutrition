'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProcessGalleryModal } from '@/components/ui/ProcessGalleryModal'
import { User, FlaskConical, HeartHandshake, Eye } from 'lucide-react'
import { hoverLift } from '@/lib/animations'

const pillars = [
  {
    icon: User,
    title: 'Индивидуальный подход',
    description: 'Каждый человек уникален, и я разрабатываю персонализированные решения, которые подходят именно вам.',
    number: '01',
  },
  {
    icon: FlaskConical,
    title: 'Проверенные решения',
    description: 'Я использую только научно обоснованные методы и подходы, которые зарекомендовали себя на практике.',
    number: '02',
  },
  {
    icon: HeartHandshake,
    title: 'Гармония тела и разума',
    description: 'Я нутрициолог с коучинговым подходом. Поэтому работаю не только с анализами и симптомами, а смотрю намного глубже: Ваши привычки, образ жизни, мышление и уровень стресса.',
    number: '03',
  },
]

export default function ThreePillars() {
  const [isProcessOpen, setIsProcessOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <>
      <AnimatedSection
        id="three-pillars"
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-sage-50 relative overflow-hidden"
      >
        <div ref={sectionRef}>
          {/* Декоративный фон с ботаническими элементами и parallax */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
            <svg className="w-full h-full opacity-[0.07]" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 100 Q120 50 160 70 Q140 100 120 120 Q100 110 100 100Z" fill="#556645" />
              <path d="M110 100 Q110 130 105 150" stroke="#556645" strokeWidth="1.5" />
              <path d="M300 40 Q320 0 360 20 Q340 50 320 70 Q300 55 300 40Z" fill="#556645" />
              <path d="M310 40 Q310 70 305 90" stroke="#556645" strokeWidth="1.5" />
              <path d="M600 100 Q630 60 670 80 Q650 110 630 130 Q610 115 600 100Z" fill="#556645" />
              <path d="M620 105 Q620 135 615 155" stroke="#556645" strokeWidth="1.5" />
              <path d="M150 380 Q180 340 220 360 Q200 390 180 410 Q160 395 150 380Z" fill="#556645" />
              <path d="M170 385 Q170 415 165 435" stroke="#556645" strokeWidth="1.5" />
              <path d="M500 430 Q530 390 570 410 Q550 440 530 460 Q510 445 500 430Z" fill="#556645" />
              <path d="M520 435 Q520 465 515 485" stroke="#556645" strokeWidth="1.5" />
              <path d="M700 320 Q730 280 770 300 Q750 330 730 350 Q710 335 700 320Z" fill="#556645" />
              <path d="M720 325 Q720 355 715 375" stroke="#556645" strokeWidth="1.5" />
              <path d="M50 230 Q80 190 120 210 Q100 240 80 260 Q60 245 50 230Z" fill="#556645" />
              <path d="M70 235 Q70 265 65 285" stroke="#556645" strokeWidth="1.5" />
              <path d="M400 280 Q430 240 470 260 Q450 290 430 310 Q410 295 400 280Z" fill="#556645" />
              <path d="M420 285 Q420 315 415 335" stroke="#556645" strokeWidth="1.5" />
              <path d="M250 500 Q280 460 320 480 Q300 510 280 530 Q260 515 250 500Z" fill="#556645" />
              <path d="M270 505 Q270 535 265 555" stroke="#556645" strokeWidth="1.5" />
            </svg>
          </motion.div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-6xl mx-auto">
              <SectionHeading title="Моя работа строится на трёх китах" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xs:gap-8 mb-8 xs:mb-12">
                {pillars.map((pillar, index) => {
                  const IconComponent = pillar.icon
                  return (
                    <motion.div
                      key={index}
                      className="relative bg-white/80 backdrop-blur-sm p-6 xs:p-8 rounded-2xl shadow-md border border-sage-200 text-center hover:shadow-xl transition-all duration-300 overflow-hidden"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      whileHover={hoverLift}
                    >
                      {/* Большой полупрозрачный номер */}
                      <span className="absolute top-2 right-4 text-8xl font-serif text-sage-100/30 leading-none select-none pointer-events-none">
                        {pillar.number}
                      </span>

                      <motion.div
                        className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-sage-50 relative z-10"
                        initial={{ rotate: -10, scale: 0.9 }}
                        whileInView={{ rotate: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                      >
                        <IconComponent className="w-8 h-8 text-sage-600" />
                      </motion.div>
                      <h3 className="text-lg xs:text-xl font-bold text-sage-900 mb-3 font-serif relative z-10">
                        {pillar.title}
                      </h3>
                      <p className="text-sm xs:text-base text-sage-600 leading-relaxed relative z-10">
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
                <motion.button
                  onClick={() => setIsProcessOpen(true)}
                  className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Eye className="w-5 h-5" />
                  Подсмотреть процесс работы
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <ProcessGalleryModal isOpen={isProcessOpen} onClose={() => setIsProcessOpen(false)} />
    </>
  )
}
