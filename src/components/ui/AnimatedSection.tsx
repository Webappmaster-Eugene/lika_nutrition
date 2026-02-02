'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function AnimatedSection({
  children,
  className = '',
  id,
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const directionMap = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  const initial = {
    opacity: 0,
    ...directionMap[direction],
  }

  return (
    <motion.section
      id={id}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
      // Fallback: если анимация не сработала, показываем контент через 1 секунду
      animate={{ opacity: 1, x: 0, y: 0 }}
      style={{ opacity: 1 }}
    >
      {children}
    </motion.section>
  )
}
