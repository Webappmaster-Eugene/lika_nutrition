'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import FormField from './FormField'
import { submitConsultationForm } from '@/lib/utils/formSubmission'

export default function ConsultationForm() {
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
      await submitConsultationForm(formData)
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
    <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
      <FormField
        label="Ваше имя"
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
      <FormField
        label="Ваш e-mail"
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl border-2 border-beige-300 hover:border-sage-400 transition-colors">
        <input
          type="checkbox"
          id="consultation-privacy"
          checked={privacyAccepted}
          onChange={(e) => setPrivacyAccepted(e.target.checked)}
          required
          className="w-5 h-5 xs:w-6 xs:h-6 border-2 border-beige-400 rounded-md focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 mt-0.5 flex-shrink-0 cursor-pointer transition-all accent-accent-500"
        />
        <label htmlFor="consultation-privacy" className="text-sm xs:text-base text-sage-800 leading-relaxed cursor-pointer flex-1">
          Отправляя свои персональные данные, Вы соглашаетесь с{' '}
          <a href="/privacy" className="text-accent-500 hover:text-accent-600 underline font-medium">
            Положением о персональных данных
          </a>
        </label>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {submitStatus === 'success' && (
          <div className="p-3 xs:p-4 bg-sage-100 text-sage-900 rounded-lg text-sm xs:text-base">
            Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-3 xs:p-4 bg-red-100 text-red-700 rounded-lg text-sm xs:text-base">
            Произошла ошибка. Пожалуйста, попробуйте ещё раз или свяжитесь со мной напрямую.
          </div>
        )}
      </div>
      <Button type="submit" variant="cta" disabled={isSubmitting || !privacyAccepted} className="w-full">
        {isSubmitting ? 'Отправка...' : 'ЗАПИСАТЬСЯ'}
      </Button>
    </form>
  )
}
