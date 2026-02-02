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
    } catch (error) {
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
      
      <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl border-2 border-beige-200 hover:border-beige-300 transition-colors">
        <input
          type="checkbox"
          id="privacy"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          required
          className="w-5 h-5 xs:w-6 xs:h-6 text-beige-600 border-2 border-beige-300 rounded-md focus:ring-2 focus:ring-beige-500 focus:ring-offset-2 mt-0.5 flex-shrink-0 cursor-pointer transition-all"
        />
        <label htmlFor="privacy" className="text-sm xs:text-base text-beige-700 leading-relaxed cursor-pointer flex-1">
          Я согласен с{' '}
          <a href="/privacy" className="text-beige-600 hover:text-beige-700 underline font-medium">
            политикой конфиденциальности
          </a>
        </label>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm xs:text-base font-semibold text-green-800 mb-1">
                Спасибо! Ваше сообщение отправлено.
              </p>
              <p className="text-sm text-green-700">
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
                Пожалуйста, попробуйте еще раз или свяжитесь со мной напрямую через Telegram.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          disabled={isSubmitting || !privacyAccepted}
          className="w-full py-4 xs:py-5 text-base xs:text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-beige-600 to-beige-700 hover:from-beige-700 hover:to-beige-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
