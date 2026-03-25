'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import SocialLinks from '@/components/ui/SocialLinks'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '#about', label: 'Обо мне' },
  { href: '#services', label: 'Услуги' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="container mx-auto py-3 xs:py-4">
        <div className="flex items-center justify-between">
          <SmoothScrollLink
            href="#hero"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.jpg"
              alt="Лика Надточеева - нутрициолог"
              width={120}
              height={120}
              className="rounded-full w-20 h-20 sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
              priority
            />
          </SmoothScrollLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <SmoothScrollLink
                key={item.href}
                href={item.href}
                className="text-sage-800 hover:text-accent-500 font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-400 group-hover:w-full transition-all duration-300" />
              </SmoothScrollLink>
            ))}
            <SocialLinks />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 xs:p-2.5 min-h-touch min-w-touch text-sage-800 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
          >
            {isMobileMenuOpen ? <X size={20} className="xs:w-6 xs:h-6" /> : <Menu size={20} className="xs:w-6 xs:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-3 xs:mt-4 pb-3 xs:pb-4 border-t border-beige-300 pt-3 xs:pt-4"
            >
              <nav className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <SmoothScrollLink
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sage-800 hover:text-accent-500 font-medium block py-2.5 xs:py-3 min-h-touch text-sm xs:text-base transition-colors"
                    >
                      {item.label}
                    </SmoothScrollLink>
                  </motion.div>
                ))}
                <div className="mt-2">
                  <SocialLinks />
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
