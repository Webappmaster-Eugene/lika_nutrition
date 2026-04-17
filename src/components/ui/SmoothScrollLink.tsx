'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SmoothScrollLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function SmoothScrollLink({
  href,
  children,
  className = '',
  onClick,
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Закрываем мобильное меню сразу (если передан onClick)
    if (onClick) {
      onClick()
    }

    if (href.startsWith('#')) {
      const scrollToTarget = () => {
        const targetId = href.substring(1)
        const element = document.getElementById(targetId)

        if (element) {
          const headerOffset = 110
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }

      if (onClick) {
        // Ждём завершения exit-анимации AnimatePresence (300ms + буфер),
        // чтобы framer-motion не сбросил scrollTo(0,0) во время анимации
        setTimeout(scrollToTarget, 350)
      } else {
        scrollToTarget()
      }
    } else {
      window.location.href = href
    }
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.a>
  )
}
