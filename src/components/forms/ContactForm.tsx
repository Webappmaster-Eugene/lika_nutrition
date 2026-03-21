'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import FormField from './FormField'
import { submitContactForm } from '@/lib/utils/formSubmission'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!privacyAccepted) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await submitContactForm(formData)
      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '' })
      setPrivacyAccepted(false)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 xs:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 xs:gap-6">
        <FormField
          label="Как вас зовут?"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <FormField
          label="Ваш телефон"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <FormField
        label="Ваш вопрос или сообщение"
        name="message"
        type="textarea"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />

      <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl border-2 border-beige-200 hover:border-sage-300 transition-colors">
        <input
          type="checkbox"
          id="privacy"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          required
          className="w-5 h-5 xs:w-6 xs:h-6 text-sage-700 border-2 border-beige-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 mt-0.5 flex-shrink-0 cursor-pointer transition-all accent-sage-700"
        />
        <label htmlFor="privacy" className="text-sm xs:text-base text-sage-800 leading-relaxed cursor-pointer flex-1">
          Отправляя свои персональные данные, Вы соглашаетесь с{' '}
          <a href="/privacy" className="text-sage-700 hover:text-sage-800 underline font-medium">
            Положением о персональных данных
          </a>
        </label>
      </div>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-sage-50 border-2 border-sage-200 rounded-xl flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-sage-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm xs:text-base font-semibold text-sage-900 mb-1">
                  Спасибо! Ваше сообщение отправлено.
                </p>
                <p className="text-sm text-sage-800">
                  Я свяжусь с вами в ближайшее время.
                </p>
              </div>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3"
            >
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm xs:text-base font-semibold text-red-800 mb-1">
                  Произошла ошибка
                </p>
                <p className="text-sm text-red-700">
                  Пожалуйста, попробуйте ещё раз или свяжитесь со мной напрямую через Telegram.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting || !privacyAccepted}
          className="w-full py-4 xs:py-5 text-base xs:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Отправка...
            </span>
          ) : (
            'Отправить сообщение'
          )}
        </Button>
      </motion.div>
    </form>
  )
}
