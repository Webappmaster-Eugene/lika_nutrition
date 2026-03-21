'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StructuredData from '@/components/seo/StructuredData'
import { ServicesTableModal } from '@/components/ui/ServicesTableModal'
import { services } from '@/lib/content/services'
import { getServiceStructuredDataExtended } from '@/lib/utils/seo'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { Check, Table } from 'lucide-react'

export default function Services() {
  const [isTableOpen, setIsTableOpen] = useState(false)

  return (
    <>
      {services.map((service) => (
        <StructuredData
          key={service.id}
          data={getServiceStructuredDataExtended(service.title, service.description, service.price)}
        />
      ))}
      <AnimatedSection
        id="services"
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-beige-50"
      >
        <div className="container mx-auto w-full max-w-full">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8 xs:mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-3 xs:mb-4">
                Услуги
              </h2>
              <p className="text-base xs:text-lg text-sage-700 max-w-3xl mx-auto">
                Я предлагаю широкий выбор форматов работы и помогу подобрать тот, который наилучшим образом соответствует вашим целям и особенностям
              </p>
              <div className="w-24 h-1 bg-sage-600 mx-auto rounded-full mt-6" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-md border border-beige-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Заголовок на зелёном фоне */}
                  <div className="bg-sage-700 p-4 xs:p-5">
                    <h3 className="text-base xs:text-lg font-bold text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xl xs:text-2xl font-bold text-sage-100">
                      {service.price}
                    </p>
                  </div>

                  {/* Контент */}
                  <div className="p-4 xs:p-5 flex-1 flex flex-col">
                    <p className="text-sm text-sage-700 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-5 flex-1">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2 text-sm text-sage-800">
                          <Check className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <SmoothScrollLink
                      href="#contact"
                      className="block text-center px-4 py-3 bg-sage-700 text-white rounded-xl font-medium hover:bg-sage-800 transition-colors min-h-touch text-sm xs:text-base"
                    >
                      Записаться
                    </SmoothScrollLink>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Кнопка таблицы */}
            <motion.div
              className="text-center mt-8 xs:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setIsTableOpen(true)}
                className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 border-2 border-sage-700 text-sage-700 rounded-full font-semibold hover:bg-sage-50 transition-all duration-300 text-sm xs:text-base min-h-touch"
              >
                <Table className="w-5 h-5" />
                Ознакомиться с полным пакетом услуг
              </button>
              <p className="text-sm text-sage-600 mt-3 max-w-lg mx-auto">
                Можно получить расписанный рекомендательный протокол, а также написать мне, чтобы уточнить, какой блок точно подходит вам
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <ServicesTableModal isOpen={isTableOpen} onClose={() => setIsTableOpen(false)} />
    </>
  )
}
