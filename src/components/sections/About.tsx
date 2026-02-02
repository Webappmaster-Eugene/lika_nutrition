'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { aboutContent } from '@/lib/content/about'
import { Award, Users, BookOpen, AlertCircle, Lightbulb, Sparkles, FileSearch, TrendingUp, Heart } from 'lucide-react'
import Image from 'next/image'

// Маппинг иконок
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertCircle,
  Lightbulb,
  Sparkles,
  FileSearch,
  TrendingUp,
  Heart,
  Award,
}

export default function About() {
  return (
    <AnimatedSection
      id="about"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto px-3 xs:px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <motion.div
            className="text-center mb-8 xs:mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mb-3 xs:mb-4">
              {aboutContent.story ? aboutContent.subtitle : 'О специалисте'}
            </h2>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full" />
          </motion.div>

          {/* Вводный текст */}
          <motion.div
            className="max-w-3xl mx-auto mb-10 xs:mb-12 sm:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base xs:text-lg sm:text-xl text-beige-700 leading-relaxed">
              {aboutContent.description}
            </p>
          </motion.div>

          {/* Timeline */}
          {aboutContent.story?.timeline && aboutContent.story.timeline.length > 0 ? (
            <div className="relative max-w-5xl mx-auto" style={{ opacity: 1 }}>
              {/* Вертикальная линия для десктопа */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-beige-200 transform -translate-x-1/2" />

              {/* Этапы timeline */}
              <div className="space-y-8 xs:space-y-10 sm:space-y-12">
                {aboutContent.story.timeline.map((step, index) => {
                  const IconComponent = iconMap[step.icon] || AlertCircle
                  const isEven = index % 2 === 0
                  const isLast = index === aboutContent.story.timeline.length - 1

                  return (
                    <motion.div
                      key={step.id}
                      className={`relative flex flex-col lg:flex-row items-center gap-6 xs:gap-8 ${
                        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1, margin: '0px' }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      // Fallback для видимости
                      animate={{ opacity: 1, y: 0 }}
                      style={{ opacity: 1 }}
                    >
                      {/* Иконка и круг */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-14 h-14 xs:w-18 xs:h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-beige-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                          <IconComponent className="w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-beige-600" />
                        </div>
                        {!isLast && (
                          <div className="hidden lg:block absolute top-20 sm:top-24 left-1/2 w-1 h-12 xs:h-16 bg-beige-200 transform -translate-x-1/2" />
                        )}
                      </div>

                      {/* Карточка с контентом */}
                      <div
                        className={`flex-1 w-full lg:w-5/12 ${
                          isEven ? 'lg:text-right' : 'lg:text-left'
                        }`}
                      >
                        <motion.div
                          className={`bg-gradient-to-br from-beige-50 to-white p-5 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200 hover:shadow-xl transition-all duration-300 ${
                            isEven ? 'lg:mr-4' : 'lg:ml-4'
                          }`}
                          whileHover={{ scale: 1.02, y: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className={`flex flex-col text-left ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
                            <div className={`flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4 ${
                              isEven ? 'lg:flex-row-reverse' : ''
                            }`}>
                              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-500 flex-shrink-0">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-beige-800">
                                {step.title}
                              </h3>
                            </div>
                            
                            {step.highlight && (
                              <div className={`mb-3 xs:mb-4 inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-beige-100 rounded-full ${
                                isEven ? 'lg:ml-auto' : ''
                              }`}>
                                <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-beige-600 flex-shrink-0" />
                                <span className="text-xs xs:text-sm font-semibold text-beige-700">
                                  {step.highlight}
                                </span>
                              </div>
                            )}
                            
                            <p className="text-sm xs:text-base sm:text-lg text-beige-700 leading-relaxed whitespace-pre-line">
                              {step.text}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Философия в конце */}
              {aboutContent.story.philosophy && (
                <motion.div
                  className="mt-12 xs:mt-16 sm:mt-20 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="max-w-3xl mx-auto bg-gradient-to-r from-beige-100 to-beige-50 p-6 xs:p-8 sm:p-10 rounded-2xl xs:rounded-3xl shadow-lg border-l-4 border-beige-500">
                    <Heart className="w-10 h-10 xs:w-12 xs:h-12 text-beige-600 mx-auto mb-4 xs:mb-6" />
                    <p className="text-lg xs:text-xl sm:text-2xl font-semibold text-beige-800 italic leading-relaxed">
                      {aboutContent.story.philosophy.text}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          ) : null}

          {/* Достижения внизу */}
          <motion.div
            className="mt-12 xs:mt-16 sm:mt-20 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-3 gap-4 xs:gap-6">
              <motion.div
                className="bg-beige-50 p-4 xs:p-6 rounded-xl xs:rounded-2xl text-center border border-beige-200"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Award className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-beige-600 mx-auto mb-2 xs:mb-3" />
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-700">Дипломированный</div>
                <div className="text-xs xs:text-sm text-beige-600">Специалист</div>
              </motion.div>
              <motion.div
                className="bg-beige-50 p-4 xs:p-6 rounded-xl xs:rounded-2xl text-center border border-beige-200"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Users className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-beige-600 mx-auto mb-2 xs:mb-3" />
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-700">Член</div>
                <div className="text-xs xs:text-sm text-beige-600">Союза</div>
              </motion.div>
              <motion.div
                className="bg-beige-50 p-4 xs:p-6 rounded-xl xs:rounded-2xl text-center border border-beige-200"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <BookOpen className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-beige-600 mx-auto mb-2 xs:mb-3" />
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-700">Опыт</div>
                <div className="text-xs xs:text-sm text-beige-600">Работы</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
