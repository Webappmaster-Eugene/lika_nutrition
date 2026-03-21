'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const processImages = [
  { src: '/images/process/process-1.jpg', alt: 'Процесс работы 1' },
  { src: '/images/process/process-2.jpg', alt: 'Процесс работы 2' },
  { src: '/images/process/process-3.jpg', alt: 'Процесс работы 3' },
  { src: '/images/process/process-4.jpg', alt: 'Процесс работы 4' },
  { src: '/images/process/process-5.jpg', alt: 'Процесс работы 5' },
  { src: '/images/process/process-6.jpg', alt: 'Процесс работы 6' },
  { src: '/images/process/process-7.jpg', alt: 'Процесс работы 7' },
  { src: '/images/process/process-8.jpg', alt: 'Процесс работы 8' },
]

interface ProcessGalleryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProcessGalleryModal({ isOpen, onClose }: ProcessGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

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
  }, [isOpen, currentIndex, onClose])

  const goNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % processImages.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + processImages.length) % processImages.length)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 xs:p-4"
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
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white transition-colors"
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={processImages[currentIndex].src}
                  alt={processImages[currentIndex].alt}
                  fill
                  className="object-contain bg-white"
                  sizes="90vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 text-center text-white">
            <p className="text-sm text-white/60">
              {currentIndex + 1} из {processImages.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
