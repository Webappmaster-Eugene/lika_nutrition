'use client'

import { motion } from 'framer-motion'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import SocialLinks from '@/components/ui/SocialLinks'
import { socialLinks } from '@/lib/constants/social'

const footerLinks = [
  { href: '#about', label: 'О специалисте' },
  { href: '#achievements', label: 'Достижения' },
  { href: '#nutriciology', label: 'О нутрициологии' },
  { href: '#services', label: 'Услуги' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
]

export default function Footer() {
  return (
    <footer
      className="bg-beige-800 text-beige-50 py-10 xs:py-12 sm:py-14 md:py-16 w-full max-w-full overflow-x-hidden"
      role="contentinfo"
    >
      <div className="container mx-auto w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-10 sm:gap-12 mb-8 xs:mb-10 sm:mb-12">
          {/* О нас */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl xs:text-2xl font-bold mb-3 xs:mb-4 text-white">Нутрициолог Лика</h3>
            <p className="text-sm xs:text-base text-beige-200 leading-relaxed">
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
            <ul className="space-y-2 xs:space-y-3 text-sm xs:text-base text-beige-200">
              <li>
                <a
                  href={`tel:${socialLinks.phone}`}
                  className="hover:text-white transition-colors block py-1 min-h-touch flex items-center"
                >
                  {socialLinks.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="hover:text-white transition-colors block py-1 min-h-touch flex items-center break-all"
                >
                  {socialLinks.email}
                </a>
              </li>
              <li className="pt-2">
                <SocialLinks />
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Копирайт */}
        <motion.div
          className="pt-6 xs:pt-8 border-t border-beige-700 text-center text-beige-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs xs:text-sm">&copy; {new Date().getFullYear()} Нутрициолог Лика. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  )
}
