'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { BotanicalDecoration } from '@/components/ui/BotanicalDecoration'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { processSteps } from '@/lib/content/process'

export default function Process() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <AnimatedSection
      id="process"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-14">
            {/* Левая колонка — Форма */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-beige-50 p-5 xs:p-6 sm:p-8 rounded-2xl border border-beige-300 sticky top-24 shadow-lg">
                {/* Botanical accent */}
                <BotanicalDecoration
                  variant="leaf"
                  position="absolute -top-4 -right-4"
                  size="w-16 h-16"
                  opacity="opacity-[0.08]"
                />
                <h3 className="text-xl xs:text-2xl font-serif font-bold text-sage-900 mb-2">
                  Запишитесь на бесплатную консультацию
                </h3>
                <p className="text-sm text-sage-600 mb-5">
                  Я подберу для вас оптимальную программу, исходя из ваших потребностей и индивидуальных особенностей
                </p>
                <ConsultationForm />
              </div>
            </motion.div>

            {/* Правая колонка — Pipeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-sage-900 mb-2">
                Как проходит работа со мной
              </h2>
              <p className="text-base xs:text-lg text-sage-600 mb-8">
                и что Вы получаете на выходе?
              </p>

              <div className="space-y-6 relative" ref={timelineRef}>
                {/* Background vertical line */}
                <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-sage-200/50 hidden sm:block" />
                {/* Scroll-linked fill line */}
                <motion.div
                  className="absolute left-5 top-8 w-0.5 bg-gradient-to-b from-accent-400 to-sage-400 hidden sm:block origin-top"
                  style={{ height: lineHeight }}
                />

                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-4 sm:gap-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 relative z-10">
                      <motion.div
                        className="w-10 h-10 bg-accent-400 rounded-full flex items-center justify-center shadow-md text-white font-bold text-sm"
                        whileInView={{ scale: [0.8, 1.1, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>
                    <div className="pt-1">
                      <div className="inline-block text-xs font-bold text-white bg-sage-600 uppercase tracking-wider mb-2 px-3 py-1 rounded-full">
                        Этап {step.stage}
                      </div>
                      <div className="bg-sage-50/50 rounded-xl p-4 border border-sage-200/30">
                        <h3 className="text-base xs:text-lg font-semibold text-sage-900 mb-1">
                          {step.title}
                        </h3>
                        <p className="text-sm xs:text-base text-sage-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <SmoothScrollLink
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
                  >
                    Записаться на консультацию
                  </SmoothScrollLink>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
