'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { benefits } from '@/lib/content/benefits'
import { Battery, Flame, Scale, Droplets, Cookie, Brain, type LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Battery,
  Flame,
  Scale,
  Droplets,
  Cookie,
  Brain,
}

export default function Benefits() {
  return (
    <AnimatedSection
      id="benefits"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-beige-50"
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 xs:mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-sage-900 mb-3 xs:mb-4 leading-tight">
              Если Вы устали от противоречивых советов — Вы по адресу
            </h2>
            <p className="text-base xs:text-lg text-sage-600 max-w-3xl mx-auto">
              Я не предлагаю ещё больше правил. Я помогаю понять себя и своё тело — и выстроить систему, которая работает именно для вас.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-px bg-accent-400" />
              <div className="w-2 h-2 rounded-full bg-accent-400" />
              <div className="w-12 h-px bg-accent-400" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon]
              return (
                <motion.div
                  key={index}
                  className="bg-white p-5 xs:p-6 rounded-2xl shadow-md border border-beige-200 hover:shadow-lg hover:border-sage-300 transition-all duration-300 border-t-4 border-t-sage-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center mb-4 ring-4 ring-sage-50">
                    {IconComponent && <IconComponent className="w-7 h-7 text-sage-600" />}
                  </div>
                  <h3 className="text-base xs:text-lg font-semibold text-sage-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm xs:text-base text-sage-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
