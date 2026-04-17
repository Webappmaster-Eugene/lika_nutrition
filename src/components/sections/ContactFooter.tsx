'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { BotanicalDecoration } from '@/components/ui/BotanicalDecoration'
import { socialLinks } from '@/lib/constants/social'
import { Phone, Mail, Send, ArrowUp } from 'lucide-react'

const footerLinks = [
  { href: '#about', label: 'Обо мне' },
  { href: '#services', label: 'Услуги' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'FAQ' },
  { href: '/about', label: 'Подробнее обо мне', isPage: true },
  { href: '/services', label: 'Все услуги', isPage: true },
  { href: '/blog', label: 'Блог', isPage: true },
]

export default function ContactFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-br from-beige-50 via-white to-sage-50 relative overflow-hidden">
        {/* Botanical decoration */}
        <BotanicalDecoration
          variant="fern"
          position="absolute top-20 -right-10"
          size="w-48 h-48"
          opacity="opacity-[0.04]"
        />
        <BotanicalDecoration
          variant="branch"
          position="absolute bottom-10 -left-8"
          size="w-36 h-36"
          opacity="opacity-[0.03]"
        />

        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 items-center">
              {/* Левая колонка — Glass форма */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sage-200/30 shadow-lg p-5 xs:p-6 sm:p-8">
                  <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold text-sage-900 mb-3">
                    Запишитесь на бесплатную консультацию
                  </h2>
                  <p className="text-sm xs:text-base text-sage-600 mb-6 leading-relaxed">
                    Я подберу для вас оптимальную программу, исходя из ваших потребностей и индивидуальных особенностей
                  </p>
                  <ConsultationForm />
                </div>
              </motion.div>

              {/* Правая колонка — Фото с декоративной рамкой */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute -inset-3 border-2 border-accent-300/40 rounded-3xl" />
                <div className="absolute -inset-1 border border-sage-300/30 rounded-2xl" />
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/photos/photo-3.jpg"
                    alt="Лика Надточеева — нутрициолог"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-900 text-beige-50 py-10 xs:py-12 sm:py-14 md:py-16 overflow-x-hidden relative" role="contentinfo">
        {/* Animated shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-1 footer-shimmer-line" />

        <div className="container mx-auto">
          {/* Логотип по центру */}
          <motion.div
            className="flex justify-center mb-8 xs:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SmoothScrollLink href="#hero" className="block">
              <Image
                src="/images/logo.png"
                alt="Лика Надточеева - нутрициолог"
                width={647}
                height={391}
                className="h-32 xs:h-40 sm:h-48 w-auto"
              />
            </SmoothScrollLink>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 mb-8 xs:mb-10 sm:mb-12 max-w-2xl mx-auto">
            {/* Навигация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-white font-serif">Навигация</h4>
              <ul className="space-y-2 xs:space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    {'isPage' in link && link.isPage ? (
                      <Link
                        href={link.href}
                        className="text-sm xs:text-base text-beige-300 hover:text-accent-300 transition-colors block py-1 min-h-touch flex items-center"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <SmoothScrollLink
                        href={link.href}
                        className="text-sm xs:text-base text-beige-300 hover:text-accent-300 transition-colors block py-1 min-h-touch flex items-center"
                      >
                        {link.label}
                      </SmoothScrollLink>
                    )}
                  </li>
                ))}
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm xs:text-base text-beige-300 hover:text-accent-300 transition-colors block py-1 min-h-touch flex items-center"
                  >
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offer"
                    className="text-sm xs:text-base text-beige-300 hover:text-accent-300 transition-colors block py-1 min-h-touch flex items-center"
                  >
                    Публичная оферта
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Контакты */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-white font-serif">Контакты</h4>
              <ul className="space-y-3 text-sm xs:text-base text-beige-300">
                <li>
                  <a
                    href={`tel:${socialLinks.phone.replace(/\s|-/g, '')}`}
                    className="flex items-center gap-3 hover:text-accent-300 transition-colors py-1 min-h-touch"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    {socialLinks.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center gap-3 hover:text-accent-300 transition-colors py-1 min-h-touch break-all"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    {socialLinks.email}
                  </a>
                </li>
                <li>
                  <a
                    href={socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-accent-300 transition-colors py-1 min-h-touch"
                  >
                    <Send className="w-5 h-5 flex-shrink-0" />
                    Telegram
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Копирайт */}
          <motion.div
            className="pt-6 xs:pt-8 border-t border-sage-800 text-center text-beige-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs xs:text-sm">&copy; {new Date().getFullYear()} Нутрициолог Лика Надточеева. Все права защищены.</p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-sage-700/90 hover:bg-sage-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 backdrop-blur-sm transition-colors min-h-touch min-w-touch"
            aria-label="Прокрутить наверх"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
