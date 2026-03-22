'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { processSteps } from '@/lib/content/process'
import { Diamond } from 'lucide-react'

const diamondColors = [
  'bg-sage-600',
  'bg-sage-500',
  'bg-accent-400',
  'bg-sage-500',
  'bg-sage-600',
  'bg-accent-400',
]

export default function Process() {
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
              <div className="bg-beige-50 p-5 xs:p-6 sm:p-8 rounded-2xl border border-beige-300 sticky top-24">
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

              <div className="space-y-6 relative">
                {/* Вертикальная линия */}
                <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-sage-300 via-accent-300 to-sage-300 hidden sm:block" />

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
                      <div className={`w-10 h-10 ${diamondColors[index % diamondColors.length]} rounded-lg rotate-45 flex items-center justify-center shadow-md`}>
                        <Diamond className="w-4 h-4 text-white -rotate-45" />
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="inline-block text-xs font-bold text-white bg-sage-600 uppercase tracking-wider mb-2 px-3 py-1 rounded-full">
                        Этап {step.stage}
                      </div>
                      <h3 className="text-base xs:text-lg font-semibold text-sage-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm xs:text-base text-sage-600 leading-relaxed">
                        {step.description}
                      </p>
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
                <SmoothScrollLink
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
                >
                  Записаться на консультацию
                </SmoothScrollLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
