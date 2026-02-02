'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { testimonials } from '@/lib/content/testimonials'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import StructuredData from '@/components/seo/StructuredData'
import { getAggregateRatingStructuredData } from '@/lib/utils/seo'

export default function Testimonials() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % testimonials.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + testimonials.length) % testimonials.length)
    }
  }

  // Структурированные данные для отзывов
  const aggregateRating = getAggregateRatingStructuredData(5, testimonials.length)

  return (
    <>
      <StructuredData data={aggregateRating} />
      <AnimatedSection
        id="testimonials"
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white w-full max-w-full overflow-x-hidden"
      >
        <div className="container mx-auto px-3 xs:px-4 w-full max-w-full overflow-x-hidden w-full max-w-full">
          <div className="max-w-7xl mx-auto w-full">
            {/* Заголовок */}
            <motion.div
              className="text-center mb-8 xs:mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mb-3 xs:mb-4">
                Отзывы клиентов
              </h2>
              <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
                Реальные истории и результаты наших клиентов
              </p>
              <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
            </motion.div>

            {/* Галерея */}
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="relative aspect-[3/4] rounded-2xl xs:rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={() => openLightbox(index)}
                  >
                    <Image
                      src={testimonial.screenshot}
                      alt={`Отзыв клиента ${testimonial.name} о консультации нутрициолога Лики и результатах программы питания`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <p className="font-semibold">{testimonial.name}</p>
                        {testimonial.date && (
                          <p className="text-sm text-white/80">
                            {new Date(testimonial.date).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-beige-600">
                  Отзывы скоро появятся здесь
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 xs:p-4 w-full max-w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative max-w-4xl w-full max-w-[95vw] max-h-[90vh] mx-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Кнопки навигации */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Изображение */}
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src={testimonials[selectedImage].screenshot}
                  alt={`Отзыв клиента ${testimonials[selectedImage].name} о работе нутрициолога Лики - результаты программы питания и восстановления здоровья`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {/* Информация */}
              <div className="mt-4 text-center text-white">
                <p className="font-semibold text-lg">{testimonials[selectedImage].name}</p>
                {testimonials[selectedImage].date && (
                  <p className="text-sm text-white/80">
                    {new Date(testimonials[selectedImage].date).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
                {testimonials.length > 1 && (
                  <p className="text-sm text-white/60 mt-2">
                    {selectedImage + 1} из {testimonials.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
