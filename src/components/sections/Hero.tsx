'use client'

import { motion } from 'framer-motion'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-50 via-beige-100 to-beige-200 overflow-hidden pt-16 xs:pt-20"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="hidden sm:block absolute top-20 right-20 w-48 sm:w-72 h-48 sm:h-72 bg-beige-300/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="hidden sm:block absolute bottom-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-accent-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-3 xs:px-4 w-full max-w-full overflow-x-hidden py-12 xs:py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 items-center max-w-7xl mx-auto w-full">
          {/* Левая часть - Текст */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="sr-only">Превентивный нутрициолог Лика - Восстановление энергии, нормализация ЖКТ, здоровый вес без диет</h1>
            <motion.div
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-beige-800 mb-4 xs:mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              role="heading"
              aria-level={1}
            >
              СНАЧАЛА РЕСУРС —{' '}
              <span className="text-beige-600">ПОТОМ КРАСИВОЕ ТЕЛО</span>
            </motion.div>

            <motion.p
              className="text-base xs:text-lg sm:text-xl md:text-2xl text-beige-700 mb-4 xs:mb-6 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              Превентивный нутрициолог.
            </motion.p>

            <motion.p
              className="text-sm xs:text-base sm:text-lg text-beige-600 mb-4 xs:mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            >
              Помогаю женщинам восстановить энергию, наладить ЖКТ и прийти к здоровому весу без диет, подсчёта калорий и крайностей.
            </motion.p>

            <motion.p
              className="text-sm xs:text-base text-beige-600 mb-4 xs:mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              Сегодня вокруг здоровья слишком много шума. Каждый день — новые советы, схемы, протоколы и «обязательные» добавки.
            </motion.p>

            <motion.p
              className="text-sm xs:text-base text-beige-600 mb-6 xs:mb-8 sm:mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
            >
              Я помогаю разобраться в этом потоке информации, понять, что действительно важно именно вашему организму, и выстроить понятную систему — без стресса и фанатизма. Без горы БАДов. Без жёстких ограничений. Без «магических» решений. Только логика, диагностика и индивидуальный подход, который можно встроить в реальную жизнь.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              <a
                href="https://t.me/likanadtocheeva"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-beige-600 text-white rounded-full font-semibold hover:bg-beige-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
              >
                Хочу разобраться и начать спокойно
                <ArrowDown className="w-4 h-4 xs:w-5 xs:h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Правая часть - Форма */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-sm p-4 xs:p-6 sm:p-8 md:p-10 rounded-2xl xs:rounded-3xl shadow-2xl border border-beige-200"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 xs:mb-6 text-center text-beige-800"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
              >
                Запишитесь на консультацию
              </motion.h2>
              <ConsultationForm />
            </motion.div>
          </motion.div>
        </div>

        {/* Стрелка вниз */}
        <motion.div
          className="absolute bottom-6 xs:bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SmoothScrollLink href="#about" className="text-beige-600 hover:text-beige-700 min-h-touch min-w-touch flex items-center justify-center">
            <ArrowDown className="w-6 h-6 xs:w-8 xs:h-8" />
          </SmoothScrollLink>
        </motion.div>
      </div>
    </section>
  )
}
