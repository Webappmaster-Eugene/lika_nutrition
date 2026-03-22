'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { testimonials } from '@/lib/content/testimonials'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import StructuredData from '@/components/seo/StructuredData'
import { getAggregateRatingStructuredData } from '@/lib/utils/seo'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const aggregateRating = getAggregateRatingStructuredData(5, testimonials.length)

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <>
      <StructuredData data={aggregateRating} />
      <AnimatedSection
        id="testimonials"
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white overflow-x-hidden"
      >
        <div className="container mx-auto overflow-x-hidden">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              className="text-center mb-8 xs:mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-3 xs:mb-4">
                Отзывы
              </h2>
              <p className="text-base xs:text-lg text-sage-600 max-w-3xl mx-auto">
                Реальные истории и результаты моих клиентов
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-12 h-px bg-accent-400" />
                <div className="w-2 h-2 rounded-full bg-accent-400" />
                <div className="w-12 h-px bg-accent-400" />
              </div>
            </motion.div>

            {/* Карусель */}
            {testimonials.length > 0 && (
              <div className="relative">
                {/* Навигация */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={goPrev}
                    className="flex-shrink-0 w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors min-h-touch min-w-touch border border-sage-200"
                    aria-label="Предыдущий отзыв"
                  >
                    <ChevronLeft className="w-6 h-6 text-sage-600" />
                  </button>

                  {/* Слайд с декоративной рамкой */}
                  <div className="relative flex-1 min-w-0 max-w-lg mx-auto">
                    <div className="absolute -inset-2 border-2 border-accent-300/30 rounded-3xl" />
                    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                      <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={currentIndex}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={testimonials[currentIndex].screenshot}
                            alt={`Отзыв клиента о консультации нутрициолога Лики Надточеевой`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <button
                    onClick={goNext}
                    className="flex-shrink-0 w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors min-h-touch min-w-touch border border-sage-200"
                    aria-label="Следующий отзыв"
                  >
                    <ChevronRight className="w-6 h-6 text-sage-600" />
                  </button>
                </div>

                {/* Индикатор */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1)
                        setCurrentIndex(index)
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-accent-400 w-6'
                          : 'bg-sage-300 hover:bg-sage-400 w-2.5'
                      }`}
                      aria-label={`Отзыв ${index + 1}`}
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-sage-500 mt-4">
                  Фрагменты отзывов. Личность клиентов не раскрывается.
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
