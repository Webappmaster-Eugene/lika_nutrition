'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
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
  const ref = useRef<HTMLElement>(null)
  const [fallbackVisible, setFallbackVisible] = useState(false)

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

  // Fallback: если IntersectionObserver не поддерживается или whileInView не сработал за 2 секунды
  useEffect(() => {
    const timer = setTimeout(() => {
      setFallbackVisible(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={`${className} w-full max-w-full overflow-x-hidden`}
      style={fallbackVisible ? { opacity: 1, transform: 'none' } : undefined}
    >
      {children}
    </motion.section>
  )
}
