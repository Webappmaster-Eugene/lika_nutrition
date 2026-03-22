'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      className={`text-center mb-8 xs:mb-12 sm:mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-sage-900 mb-3 xs:mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base xs:text-lg text-sage-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <motion.div
        className="flex items-center justify-center gap-3 mt-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="w-12 h-px bg-accent-400" />
        <div className="w-2 h-2 rounded-full bg-accent-400" />
        <div className="w-12 h-px bg-accent-400" />
      </motion.div>
    </motion.div>
  )
}
