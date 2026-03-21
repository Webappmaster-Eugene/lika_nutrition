'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ConsultationForm from '@/components/forms/ConsultationForm'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { socialLinks } from '@/lib/constants/social'
import { Phone, Mail, Send } from 'lucide-react'

const footerLinks = [
  { href: '#about', label: 'Обо мне' },
  { href: '#services', label: 'Услуги' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'FAQ' },
]

export default function ContactFooter() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto w-full max-w-full">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 items-center">
              {/* Левая колонка — Форма */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-sage-900 mb-3">
                  Запишитесь на бесплатную консультацию
                </h2>
                <p className="text-sm xs:text-base text-sage-700 mb-6 leading-relaxed">
                  Я подберу для вас оптимальную программу, исходя из ваших потребностей и индивидуальных особенностей
                </p>
                <ConsultationForm />
              </motion.div>

              {/* Правая колонка — Фото */}
              <motion.div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Image
                  src="/images/photos/photo-3.jpg"
                  alt="Лика Надточеева — нутрициолог"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-900 text-beige-50 py-10 xs:py-12 sm:py-14 md:py-16 w-full max-w-full overflow-x-hidden" role="contentinfo">
        <div className="container mx-auto w-full max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-10 sm:gap-12 mb-8 xs:mb-10 sm:mb-12">
            {/* Логотип */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SmoothScrollLink href="#hero" className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/logo.jpg"
                  alt="Лика Надточеева"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl font-bold text-white">Лика Надточеева</span>
              </SmoothScrollLink>
              <p className="text-sm text-beige-200 leading-relaxed">
                Помогу выстроить доверительные отношения между телом и пищей
              </p>
            </motion.div>

            {/* Навигация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-white">Навигация</h4>
              <ul className="space-y-2 xs:space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <SmoothScrollLink
                      href={link.href}
                      className="text-sm xs:text-base text-beige-200 hover:text-white transition-colors block py-1 min-h-touch flex items-center"
                    >
                      {link.label}
                    </SmoothScrollLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Контакты */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4 text-white">Контакты</h4>
              <ul className="space-y-3 text-sm xs:text-base text-beige-200">
                <li>
                  <a
                    href={`tel:${socialLinks.phone.replace(/\s|-/g, '')}`}
                    className="flex items-center gap-3 hover:text-white transition-colors py-1 min-h-touch"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    {socialLinks.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${socialLinks.email}`}
                    className="flex items-center gap-3 hover:text-white transition-colors py-1 min-h-touch break-all"
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
                    className="flex items-center gap-3 hover:text-white transition-colors py-1 min-h-touch"
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
            className="pt-6 xs:pt-8 border-t border-sage-800 text-center text-beige-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs xs:text-sm">&copy; {new Date().getFullYear()} Нутрициолог Лика Надточеева. Все права защищены.</p>
          </motion.div>
        </div>
      </footer>
    </>
  )
}
