'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { achievementsContent } from '@/lib/content/achievements'
import { Award, FileText, TrendingUp } from 'lucide-react'

const iconMap = {
  certificate: Award,
  case: FileText,
  result: TrendingUp,
} as const

export default function Achievements() {
  return (
    <AnimatedSection
      id="achievements"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-beige-50 w-full max-w-full overflow-x-hidden"
    >
      <div className="container mx-auto w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8 xs:mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs xs:text-sm font-semibold tracking-widest text-beige-600 uppercase">
              {achievementsContent.subtitle}
            </p>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mt-3 mb-3 xs:mb-4">
              {achievementsContent.title}
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-700 max-w-4xl mx-auto">
              {achievementsContent.description}
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {achievementsContent.cards.map((card, index) => {
              const Icon = iconMap[card.icon]

              return (
                <motion.div
                  key={card.id}
                  className="bg-white rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <div className="p-5 xs:p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 xs:gap-4">
                        <div className="bg-beige-100 rounded-2xl p-3 xs:p-4 border border-beige-200">
                          <Icon className="w-6 h-6 xs:w-7 xs:h-7 text-beige-700" />
                        </div>
                        <div>
                          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-800">
                            {card.title}
                          </h3>
                          <p className="text-xs xs:text-sm text-beige-600 mt-1">{card.period}</p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-beige-100 text-beige-700 border border-beige-200">
                        Шаблон
                      </span>
                    </div>

                    <p className="text-sm xs:text-base text-beige-700 mt-4 leading-relaxed">
                      {card.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm xs:text-base text-beige-700">
                          <span className="mt-2 w-2 h-2 rounded-full bg-beige-500 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="mt-8 xs:mt-10 sm:mt-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-beige-200 rounded-2xl xs:rounded-3xl p-5 xs:p-6 sm:p-8 text-center">
              <p className="text-sm xs:text-base text-beige-700">{achievementsContent.note}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
