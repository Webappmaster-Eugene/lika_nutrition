'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { Users, Award, Heart, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Довольных клиентов',
    description: 'Людей, которые изменили свою жизнь',
  },
  {
    icon: Award,
    value: '10+',
    label: 'Лет опыта',
    description: 'Профессиональной практики',
  },
  {
    icon: Heart,
    value: '98%',
    label: 'Успешных результатов',
    description: 'Достигли своих целей',
  },
  {
    icon: TrendingUp,
    value: '1000+',
    label: 'Консультаций',
    description: 'Проведено за все время',
  },
]

export default function Stats() {
  return (
    <AnimatedSection
      id="stats"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-br from-beige-600 to-beige-700 text-white"
    >
      <div className="container mx-auto px-3 xs:px-4 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8 xs:mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-3 xs:mb-4">
              Результаты работы
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-100 max-w-3xl mx-auto">
              Цифры, которые говорят сами за себя
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl xs:rounded-3xl p-4 xs:p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex justify-center mb-3 xs:mb-4">
                      <div className="bg-white/20 rounded-full p-3 xs:p-4">
                        <Icon className="w-6 h-6 xs:w-8 xs:h-8" />
                      </div>
                    </div>
                    <motion.div
                      className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: 'spring', stiffness: 100 }}
                    >
                      {stat.value}
                    </motion.div>
                    <h3 className="text-base xs:text-lg sm:text-xl font-semibold mb-1 xs:mb-2">{stat.label}</h3>
                    <p className="text-beige-100 text-xs xs:text-sm">{stat.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
