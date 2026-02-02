'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <AnimatedSection
      id="cta"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-br from-beige-600 via-beige-500 to-beige-700 text-white relative overflow-hidden"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-3 xs:px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center justify-center mb-4 xs:mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 xs:mb-6">
              Готовы начать путь к здоровью?
            </h2>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-beige-100 mb-6 xs:mb-8 sm:mb-10 leading-relaxed">
              Запишитесь на бесплатную консультацию и получите персональные рекомендации уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center">
              <SmoothScrollLink
                href="#contact"
                className="inline-flex items-center gap-2 xs:gap-3 px-6 xs:px-8 py-3 xs:py-4 bg-white text-beige-700 rounded-full font-semibold hover:bg-beige-50 transition-all duration-300 shadow-xl hover:shadow-2xl min-h-touch text-sm xs:text-base w-full sm:w-auto justify-center"
              >
                <span className="hidden xs:inline">Записаться на консультацию</span>
                <span className="xs:hidden">Записаться</span>
                <ArrowRight className="w-4 h-4 xs:w-5 xs:h-5" />
              </SmoothScrollLink>
              <SmoothScrollLink
                href="#services"
                className="inline-flex items-center gap-2 xs:gap-3 px-6 xs:px-8 py-3 xs:py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border-2 border-white/30 min-h-touch text-sm xs:text-base w-full sm:w-auto justify-center"
              >
                Узнать об услугах
              </SmoothScrollLink>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
