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
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white w-full max-w-full overflow-x-hidden"
      >
        <div className="container mx-auto w-full max-w-full overflow-x-hidden">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              className="text-center mb-8 xs:mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-3 xs:mb-4">
                Отзывы
              </h2>
              <p className="text-base xs:text-lg text-sage-700 max-w-3xl mx-auto">
                Реальные истории и результаты моих клиентов
              </p>
              <div className="w-24 h-1 bg-sage-600 mx-auto rounded-full mt-6" />
            </motion.div>

            {/* Карусель */}
            {testimonials.length > 0 && (
              <div className="relative">
                {/* Навигация */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={goPrev}
                    className="flex-shrink-0 w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors min-h-touch min-w-touch"
                    aria-label="Предыдущий отзыв"
                  >
                    <ChevronLeft className="w-6 h-6 text-sage-700" />
                  </button>

                  {/* Слайд */}
                  <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
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

                  <button
                    onClick={goNext}
                    className="flex-shrink-0 w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors min-h-touch min-w-touch"
                    aria-label="Следующий отзыв"
                  >
                    <ChevronRight className="w-6 h-6 text-sage-700" />
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
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-sage-700 w-6'
                          : 'bg-sage-300 hover:bg-sage-400'
                      }`}
                      aria-label={`Отзыв ${index + 1}`}
                    />
                  ))}
                </div>

                <p className="text-center text-sm text-sage-600 mt-4">
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
