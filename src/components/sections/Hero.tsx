'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { DiplomaGalleryModal } from '@/components/ui/DiplomaGalleryModal'
import { socialLinks } from '@/lib/constants/social'
import { ArrowDown, Send, MessageCircle, GraduationCap } from 'lucide-react'

export default function Hero() {
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false)

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-beige-50 via-beige-100 to-sage-100 overflow-hidden pt-16 xs:pt-20"
    >
      {/* Декоративные ботанические элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-10 right-10 w-64 h-64 opacity-[0.06] text-sage-600" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 20 Q110 60 140 80 Q110 85 100 120 Q90 85 60 80 Q90 60 100 20Z" />
          <path d="M100 120 Q100 160 100 180" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <svg className="absolute bottom-20 left-10 w-48 h-48 opacity-[0.05] text-sage-600" viewBox="0 0 200 200" fill="currentColor">
          <path d="M60 100 Q80 60 120 50 Q110 80 130 110 Q100 100 80 120 Q70 110 60 100Z" />
        </svg>
        <svg className="absolute top-1/3 left-1/4 w-32 h-32 opacity-[0.04] text-sage-500" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 30 Q120 70 150 90 Q120 95 100 130 Q80 95 50 90 Q80 70 100 30Z" />
        </svg>
      </div>

      <div className="container mx-auto w-full max-w-full overflow-x-hidden py-8 xs:py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xs:gap-8 lg:gap-6 items-start max-w-7xl mx-auto w-full">

          {/* Левая колонка — Форма (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="bg-white/90 backdrop-blur-sm p-5 xl:p-6 rounded-2xl shadow-xl border border-beige-300 sticky top-24">
              <h2 className="text-lg xl:text-xl font-serif font-bold text-sage-900 mb-2">
                Запишитесь на бесплатную консультацию
              </h2>
              <p className="text-sm text-sage-600 mb-4">
                Я подберу для вас оптимальную программу, исходя из ваших потребностей
              </p>
              <ConsultationForm />
            </div>
          </motion.div>

          {/* Центральная колонка — Контент + Фото */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            {/* Навигация мини */}
            <div className="hidden md:flex items-center justify-center gap-4 mb-6 flex-wrap">
              {[
                { href: '#about', label: 'Обо мне' },
                { href: '#three-pillars', label: 'Ресурс' },
                { href: '#services', label: 'Услуги' },
                { href: '#faq', label: 'FAQ' },
                { href: '#contact', label: 'Контакты' },
              ].map((item) => (
                <SmoothScrollLink
                  key={item.href}
                  href={item.href}
                  className="text-sm text-sage-600 hover:text-accent-500 transition-colors font-medium"
                >
                  {item.label}
                </SmoothScrollLink>
              ))}
            </div>

            <h1 className="sr-only">Превентивный нутрициолог Лика Надточеева - Восстановление энергии, нормализация ЖКТ, здоровый вес без диет</h1>

            <motion.div
              className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 mb-4 xs:mb-6 leading-tight text-center tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              role="heading"
              aria-level={1}
            >
              СНАЧАЛА РЕСУРС —{' '}
              <span className="text-sage-600">ПОТОМ КРАСИВОЕ ТЕЛО</span>
            </motion.div>

            <motion.p
              className="text-base xs:text-lg sm:text-xl text-sage-700 mb-2 font-medium text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Превентивный нутрициолог — <span className="font-serif italic">Лика Надточеева</span>
            </motion.p>

            <motion.p
              className="text-sm xs:text-base text-sage-600 mb-6 leading-relaxed text-center max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Помогаю женщинам восстановить энергию, наладить ЖКТ и прийти к здоровому весу без диет, подсчёта калорий и крайностей. Только логика, диагностика и индивидуальный подход.
            </motion.p>

            {/* Фото с декоративной рамкой */}
            <motion.div
              className="relative w-full max-w-md mx-auto mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -inset-3 border-2 border-accent-300/40 rounded-3xl" />
              <div className="absolute -inset-1.5 border border-sage-300/30 rounded-2xl" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/photos/photo-1.jpg"
                  alt="Лика Надточеева — превентивный нутрициолог"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SmoothScrollLink
                href="#contact"
                className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
              >
                Хочу разобраться и начать спокойно есть
                <ArrowDown className="w-4 h-4 xs:w-5 xs:h-5" />
              </SmoothScrollLink>
            </motion.div>
          </motion.div>

          {/* Правая колонка — Соцсети + Дипломы (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block lg:col-span-3"
          >
            <div className="bg-white/90 backdrop-blur-sm p-5 xl:p-6 rounded-2xl shadow-xl border border-beige-300 sticky top-24">
              <p className="text-sm font-semibold text-sage-900 mb-3">
                Вы также можете связаться со мной:
              </p>
              <div className="space-y-3">
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors min-h-touch border border-sage-200"
                >
                  <Send className="w-5 h-5 text-sage-600" />
                  <span className="text-sm font-medium text-sage-800">Telegram</span>
                </a>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors min-h-touch border border-sage-200"
                >
                  <MessageCircle className="w-5 h-5 text-sage-600" />
                  <span className="text-sm font-medium text-sage-800">WhatsApp</span>
                </a>
              </div>
              <hr className="my-4 border-beige-300" />
              <button
                onClick={() => setIsDiplomaOpen(true)}
                className="flex items-center gap-3 w-full px-4 py-3 bg-beige-50 rounded-xl hover:bg-beige-100 transition-colors text-left min-h-touch border border-beige-300"
              >
                <GraduationCap className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-sage-800">Моё образование</span>
              </button>
            </div>
          </motion.div>

          {/* Мобильная форма */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:hidden col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm p-5 xs:p-6 rounded-2xl shadow-xl border border-beige-300">
              <h2 className="text-lg xs:text-xl font-serif font-bold text-sage-900 mb-2">
                Запишитесь на бесплатную консультацию
              </h2>
              <p className="text-sm text-sage-600 mb-4">
                Я подберу для вас оптимальную программу
              </p>
              <ConsultationForm />
            </div>
          </motion.div>
        </div>

        {/* Стрелка вниз */}
        <motion.div
          className="hidden sm:flex absolute bottom-6 xs:bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <SmoothScrollLink href="#about" className="text-sage-500 hover:text-sage-600 min-h-touch min-w-touch flex items-center justify-center">
            <ArrowDown className="w-6 h-6 xs:w-8 xs:h-8" />
          </SmoothScrollLink>
        </motion.div>
      </div>

      <DiplomaGalleryModal isOpen={isDiplomaOpen} onClose={() => setIsDiplomaOpen(false)} />
    </section>
  )
}
