'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Minus } from 'lucide-react'
import { serviceTableColumns, serviceTableRows } from '@/lib/content/servicesTable'

interface ServicesTableModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ServicesTableModal({ isOpen, onClose }: ServicesTableModalProps) {
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
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 xs:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto relative border border-beige-200"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 xs:p-6 border-b border-beige-200">
            <h2 className="text-xl xs:text-2xl font-bold text-sage-900 font-serif">
              Таблица форматов работы
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sage-50 rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <X size={24} className="text-sage-600" />
            </button>
          </div>

          {/* Table */}
          <div className="p-4 xs:p-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="text-left p-3 bg-gradient-to-br from-sage-700 to-sage-600 text-white font-semibold rounded-tl-lg sticky left-0 z-10 min-w-[180px]">
                    Что Вы получаете?
                  </th>
                  {serviceTableColumns.map((col, index) => (
                    <th
                      key={col.key}
                      className={`p-3 bg-gradient-to-br from-sage-700 to-sage-600 text-white font-semibold text-center min-w-[120px] ${
                        index === serviceTableColumns.length - 1 ? 'rounded-tr-lg' : ''
                      }`}
                    >
                      <div className="text-xs leading-tight">{col.label}</div>
                      <div className="text-accent-300 text-xs mt-1 font-bold">{col.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serviceTableRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${rowIndex % 2 === 0 ? 'bg-beige-50' : 'bg-white'} hover:bg-sage-50/50 transition-colors`}
                  >
                    <td className={`p-3 font-medium text-sage-900 sticky left-0 z-10 ${
                      rowIndex % 2 === 0 ? 'bg-beige-50' : 'bg-white'
                    }`}>
                      {row.feature}
                    </td>
                    {serviceTableColumns.map((col) => {
                      const value = row[col.key as keyof typeof row]
                      return (
                        <td key={col.key} className="p-3 text-center">
                          {value ? (
                            <Check className="w-5 h-5 text-accent-500 mx-auto" />
                          ) : (
                            <Minus className="w-5 h-5 text-beige-400 mx-auto" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
