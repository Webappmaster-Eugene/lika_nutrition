'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BotanicalDecoration } from '@/components/ui/BotanicalDecoration'
import { testimonials } from '@/lib/content/testimonials'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import StructuredData from '@/components/seo/StructuredData'
import { getAggregateRatingStructuredData } from '@/lib/utils/seo'

const AUTOPLAY_INTERVAL = 5000
const SWIPE_THRESHOLD = 50

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, goNext])

  // Swipe handler
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        goNext()
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        goPrev()
      }
    },
    [goNext, goPrev],
  )

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
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-sage-50/50 overflow-x-hidden relative"
      >
        {/* Botanical decorations */}
        <BotanicalDecoration
          variant="eucalyptus"
          position="absolute top-10 right-10"
          size="w-32 h-32"
          opacity="opacity-[0.04]"
        />
        <BotanicalDecoration
          variant="leaf"
          position="absolute bottom-10 left-10"
          size="w-28 h-28"
          opacity="opacity-[0.03]"
        />

        <div className="container mx-auto overflow-x-hidden relative z-10">
          <div className="max-w-4xl mx-auto w-full">
            <SectionHeading
              title="Отзывы"
              subtitle="Реальные истории и результаты моих клиентов"
            />

            {/* Карусель */}
            {testimonials.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              >
                {/* Навигация */}
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={goPrev}
                    className="flex-shrink-0 w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors min-h-touch min-w-touch border border-sage-200"
                    aria-label="Предыдущий отзыв"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-6 h-6 text-sage-600" />
                  </motion.button>

                  {/* Слайд с двойной рамкой */}
                  <div className="relative flex-1 min-w-0 max-w-lg mx-auto">
                    <div className="absolute -inset-3 border border-sage-200/20 rounded-[1.75rem]" />
                    <div className="absolute -inset-1.5 border-2 border-accent-300/30 rounded-3xl" />
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
                          className="absolute inset-0 cursor-grab active:cursor-grabbing"
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.2}
                          onDragEnd={handleDragEnd}
                        >
                          <Image
                            src={testimonials[currentIndex].screenshot}
                            alt="Отзыв клиента о консультации нутрициолога Лики Надточеевой"
                            fill
                            className="object-cover pointer-events-none"
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <motion.button
                    onClick={goNext}
                    className="flex-shrink-0 w-12 h-12 bg-sage-100 hover:bg-sage-200 rounded-full flex items-center justify-center transition-colors min-h-touch min-w-touch border border-sage-200"
                    aria-label="Следующий отзыв"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-6 h-6 text-sage-600" />
                  </motion.button>
                </div>

                {/* Индикатор с pulse на активной точке */}
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
                          ? 'bg-accent-400 w-6 animate-pulse-ring'
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
