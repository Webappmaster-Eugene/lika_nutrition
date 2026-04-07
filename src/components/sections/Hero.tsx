'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { ArrowDown } from 'lucide-react'
import { useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax speeds for botanical SVGs
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80])

  // Blur effect on scroll
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 8])
  const blurFilter = useTransform(blurValue, (v: number) => `blur(${v}px)`)

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-beige-50 via-beige-100 to-sage-100 overflow-hidden pt-28 xs:pt-32 sm:pt-40"
    >
      {/* Декоративные ботанические элементы с parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.svg style={{ y: y1 }} className="absolute top-10 right-10 w-64 h-64 opacity-[0.06] text-sage-600" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 20 Q110 60 140 80 Q110 85 100 120 Q90 85 60 80 Q90 60 100 20Z" />
          <path d="M100 120 Q100 160 100 180" stroke="currentColor" strokeWidth="2" fill="none" />
        </motion.svg>
        <motion.svg style={{ y: y2 }} className="absolute bottom-20 left-10 w-48 h-48 opacity-[0.05] text-sage-600" viewBox="0 0 200 200" fill="currentColor">
          <path d="M60 100 Q80 60 120 50 Q110 80 130 110 Q100 100 80 120 Q70 110 60 100Z" />
        </motion.svg>
        <motion.svg style={{ y: y3 }} className="absolute top-1/3 left-1/4 w-32 h-32 opacity-[0.04] text-sage-500" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 30 Q120 70 150 90 Q120 95 100 130 Q80 95 50 90 Q80 70 100 30Z" />
        </motion.svg>
      </div>

      <motion.div className="container mx-auto overflow-x-hidden py-6 xs:py-10 sm:py-16 relative z-10" style={{ filter: blurFilter }}>
        <div className="max-w-3xl mx-auto w-full">

          <div>
            <h1 className="sr-only">Нутрициолог Лика Надточеева — Восстановление энергии, нормализация ЖКТ, здоровый вес без диет</h1>

            {/* Заголовок */}
            <motion.div
              className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 mb-4 xs:mb-6 leading-tight text-center tracking-wide"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              role="heading"
              aria-level={1}
            >
              СНАЧАЛА РЕСУРС
              <br />
              ПОТОМ КРАСИВОЕ ТЕЛО
            </motion.div>

            {/* Фото с декоративной рамкой и свечением */}
            <motion.div
              className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto mb-4 xs:mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Мягкое свечение за фото */}
              <div className="absolute -inset-8 bg-sage-100/20 rounded-full blur-3xl" />
              <div className="absolute -inset-3 border-2 border-accent-300/40 rounded-3xl" />
              <div className="absolute -inset-1.5 border border-sage-300/30 rounded-2xl" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/photos/photo-1.jpg"
                  alt="Лика Надточеева — превентивный нутрициолог"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Floating leaves around photo */}
              <motion.svg
                className="absolute -top-4 -right-6 w-12 h-12 text-sage-400/30"
                viewBox="0 0 200 200"
                fill="currentColor"
                animate={{ rotate: [0, 5, -5, 0], y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path d="M100 20 Q110 60 140 80 Q110 85 100 120 Q90 85 60 80 Q90 60 100 20Z" />
              </motion.svg>
              <motion.svg
                className="absolute -bottom-3 -left-5 w-10 h-10 text-sage-300/25"
                viewBox="0 0 200 200"
                fill="currentColor"
                animate={{ rotate: [0, -4, 4, 0], y: [0, 3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <path d="M60 100 Q80 60 120 50 Q110 80 130 110 Q100 100 80 120 Q70 110 60 100Z" />
              </motion.svg>
              <motion.svg
                className="absolute top-1/3 -right-8 w-8 h-8 text-accent-300/20"
                viewBox="0 0 200 200"
                fill="currentColor"
                animate={{ rotate: [0, 6, -3, 0], x: [0, 3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              >
                <path d="M100 30 Q120 70 150 90 Q120 95 100 130 Q80 95 50 90 Q80 70 100 30Z" />
              </motion.svg>
            </motion.div>

            {/* Описание */}
            <motion.p
              className="text-sm xs:text-base text-sage-600 mb-5 xs:mb-6 leading-relaxed text-center max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Помогу восстановить энергию, наладить ЖКТ
              и прийти к здоровому весу без диет, подсчета калорий и крайностей.
            </motion.p>

            {/* CTA кнопка */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <SmoothScrollLink
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
                >
                  ЕСТЬ ВОПРОС - НАПИШИ
                </SmoothScrollLink>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Стрелка вниз */}
        <motion.div
          className="hidden sm:flex absolute bottom-6 xs:bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 0.8, duration: 0.5 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 } }}
        >
          <SmoothScrollLink href="#about" className="text-sage-500 hover:text-sage-600 min-h-touch min-w-touch flex items-center justify-center">
            <ArrowDown className="w-6 h-6 xs:w-8 xs:h-8" />
          </SmoothScrollLink>
        </motion.div>
      </motion.div>
    </section>
  )
}
