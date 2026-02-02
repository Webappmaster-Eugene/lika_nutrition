'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import FormField from './FormField'
import { submitContactForm } from '@/lib/utils/formSubmission'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await submitContactForm(formData)
      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4">
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
      <div className="text-xs xs:text-sm text-beige-600">
        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" required className="w-4 h-4 xs:w-5 xs:h-5 text-beige-600 border-beige-300 rounded focus:ring-beige-500 mt-0.5 flex-shrink-0 min-h-touch min-w-touch" />
          <span className="leading-relaxed">Я согласен с политикой конфиденциальности</span>
        </label>
      </div>
      {submitStatus === 'success' && (
        <div className="p-3 xs:p-4 bg-green-100 text-green-700 rounded-lg text-sm xs:text-base">
          Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-3 xs:p-4 bg-red-100 text-red-700 rounded-lg text-sm xs:text-base">
          Произошла ошибка. Пожалуйста, попробуйте еще раз или свяжитесь со мной напрямую через Telegram.
        </div>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
      </Button>
    </form>
  )
}
