'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ContactForm from '@/components/forms/ContactForm'
import { socialLinks } from '@/lib/constants/social'
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  return (
    <AnimatedSection
      id="contact"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-br from-beige-50 to-beige-100"
    >
      <div className="container mx-auto px-3 xs:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <motion.div
            className="text-center mb-8 xs:mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mb-3 xs:mb-4">
              Контакты
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
              Свяжитесь со мной любым удобным способом
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Левая часть - Контактная информация */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <address className="not-italic">
                <h3 className="text-3xl font-bold text-beige-800 mb-8">
                  Способы связи
                </h3>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-3 xs:gap-4 p-4 xs:p-6 bg-white rounded-2xl shadow-lg border border-beige-200 hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="bg-beige-100 p-3 xs:p-4 rounded-xl flex-shrink-0">
                      <Phone className="text-beige-600 w-5 h-5 xs:w-6 xs:h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base xs:text-lg mb-1 text-beige-800">
                        Телефон
                      </h4>
                      <a
                        href={`tel:${socialLinks.phone}`}
                        className="text-beige-600 hover:text-beige-700 font-medium"
                      >
                        {socialLinks.phone}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-beige-200 hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="bg-beige-100 p-3 xs:p-4 rounded-xl flex-shrink-0">
                      <Mail className="text-beige-600 w-5 h-5 xs:w-6 xs:h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base xs:text-lg mb-1 text-beige-800">
                        Email
                      </h4>
                      <a
                        href={`mailto:${socialLinks.email}`}
                        className="text-beige-600 hover:text-beige-700 font-medium"
                      >
                        {socialLinks.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-beige-200 hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="bg-beige-100 p-3 xs:p-4 rounded-xl flex-shrink-0">
                      <MessageCircle className="text-beige-600 w-5 h-5 xs:w-6 xs:h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base xs:text-lg mb-1 text-beige-800">
                        Telegram
                      </h4>
                      <Link
                        href={socialLinks.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-beige-600 hover:text-beige-700 font-medium"
                      >
                        Написать в Telegram
                      </Link>
                      <p className="text-sm text-beige-600 mt-2">
                        Консультация <time dateTime="PT20M">20 мин</time> для определения вашей цели обращения и возможных вариантов решения
                      </p>
                    </div>
                  </motion.div>
                </div>
              </address>

              {/* Рабочее время */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 border border-beige-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-beige-100 p-4 rounded-xl">
                    <Clock className="text-beige-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-beige-800">
                      Рабочее время
                    </h3>
                    <p className="text-beige-700 leading-relaxed">
                      Отвечаю на сообщения в течение рабочего дня. 
                      Для срочных вопросов лучше связаться через Telegram.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Правая часть - Форма */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="bg-white rounded-2xl xs:rounded-3xl shadow-2xl p-4 xs:p-6 sm:p-8 md:p-10 border border-beige-200">
                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 xs:mb-4 text-beige-800">
                  Напишите мне
                </h3>
                <p className="text-sm xs:text-base text-beige-600 mb-6 xs:mb-8 leading-relaxed">
                  Заполните форму ниже, и я свяжусь с вами в ближайшее время
                </p>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
