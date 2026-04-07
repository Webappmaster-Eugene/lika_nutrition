'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { processSteps } from '@/lib/content/process'

export default function Process() {
  return (
    <AnimatedSection
      id="process"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-sage-900 mb-8 xs:mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Как проходит работа со мной
          </motion.h2>

          {/* Мобильный layout — вертикальный timeline */}
          <div className="md:hidden space-y-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 bg-accent-400 rounded-full flex items-center justify-center shadow-md text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-0.5 h-4 bg-sage-200/50" />
                      <div className="w-3 h-3 bg-accent-400 rotate-45 rounded-sm" />
                      <div className="w-0.5 h-4 bg-sage-200/50" />
                    </div>
                  )}
                </div>
                <div className="pt-1 flex-1 min-w-0">
                  <div className="bg-sage-50/50 rounded-xl p-4 border border-sage-200/30">
                    <h3 className="text-base xs:text-lg font-semibold text-sage-900 mb-1">
                      <span className="inline-block border-2 border-accent-400 rounded-full px-4 py-1">
                        {step.title}
                      </span>
                    </h3>
                    <p className="text-sm xs:text-base text-sage-600 leading-relaxed whitespace-pre-line">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop layout — zigzag */}
          <div className="hidden md:block">
            {processSteps.map((step, index) => {
              const isRight = index % 2 === 0
              return (
                <Fragment key={index}>
                  <div className="grid grid-cols-[1fr_60px_1fr] items-start">
                    {/* Левая ячейка */}
                    <div className={isRight ? '' : 'flex justify-end'}>
                      {!isRight && (
                        <motion.div
                          className="bg-sage-50/50 rounded-xl p-5 border border-sage-200/30 max-w-md"
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <h3 className="text-lg font-semibold text-sage-900 mb-2">
                            <span className="inline-block border-2 border-accent-400 rounded-full px-5 py-1">
                              {step.title}
                            </span>
                          </h3>
                          <p className="text-base text-sage-600 leading-relaxed whitespace-pre-line">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Центральная колонка — номер */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-10 h-10 bg-accent-400 rounded-full flex items-center justify-center shadow-md text-white font-bold text-sm z-10"
                        whileInView={{ scale: [0.8, 1.1, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    {/* Правая ячейка */}
                    <div className={!isRight ? '' : ''}>
                      {isRight && (
                        <motion.div
                          className="bg-sage-50/50 rounded-xl p-5 border border-sage-200/30 max-w-md"
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          <h3 className="text-lg font-semibold text-sage-900 mb-2">
                            <span className="inline-block border-2 border-accent-400 rounded-full px-5 py-1">
                              {step.title}
                            </span>
                          </h3>
                          <p className="text-base text-sage-600 leading-relaxed whitespace-pre-line">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Diamond коннектор между шагами */}
                  {index < processSteps.length - 1 && (
                    <div className="grid grid-cols-[1fr_60px_1fr]">
                      <div />
                      <div className="flex flex-col items-center py-2">
                        <div className="w-0.5 h-4 bg-sage-200/50" />
                        <div className="w-4 h-4 bg-accent-400 rotate-45 rounded-sm shadow-sm" />
                        <div className="w-0.5 h-4 bg-sage-200/50" />
                      </div>
                      <div />
                    </div>
                  )}
                </Fragment>
              )
            })}
          </div>

          {/* CTA кнопка */}
          <motion.div
            className="mt-8 xs:mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <SmoothScrollLink
                href="#contact"
                className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
              >
                Хочу на консультацию
              </SmoothScrollLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
