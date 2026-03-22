'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const diplomas = [
  { src: '/images/diplomas/diploma-1.jpg', alt: 'Диплом нутрициолога 1' },
  { src: '/images/diplomas/diploma-2.jpg', alt: 'Диплом нутрициолога 2' },
  { src: '/images/diplomas/diploma-3.jpg', alt: 'Диплом нутрициолога 3' },
  { src: '/images/diplomas/diploma-4.jpg', alt: 'Диплом нутрициолога 4' },
]

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
}

interface DiplomaGalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DiplomaGalleryModal({ isOpen, onClose }: DiplomaGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % diplomas.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + diplomas.length) % diplomas.length)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose, goNext, goPrev])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 xs:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors shadow-lg min-h-touch min-w-touch flex items-center justify-center"
            aria-label="Закрыть"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors shadow-lg min-h-touch min-w-touch flex items-center justify-center"
            aria-label="Предыдущий диплом"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors shadow-lg min-h-touch min-w-touch flex items-center justify-center"
            aria-label="Следующий диплом"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={diplomas[currentIndex].src}
                  alt={diplomas[currentIndex].alt}
                  fill
                  className="object-contain bg-white"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {diplomas.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent-400 w-6'
                    : 'bg-white/40 hover:bg-white/60 w-2'
                }`}
                aria-label={`Диплом ${index + 1}`}
              />
            ))}
          </div>

          <p className="text-center text-sm text-white/60 mt-2">
            {currentIndex + 1} из {diplomas.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
