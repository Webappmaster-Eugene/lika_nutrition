'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
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

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-beige-200"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-beige-200">
            <h2 className="text-2xl font-bold font-serif text-sage-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sage-50 rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} className="text-sage-600" />
            </button>
          </div>
        )}
        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-sage-50 rounded-full transition-colors z-10"
            aria-label="Закрыть"
          >
            <X size={24} className="text-sage-600" />
          </button>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
