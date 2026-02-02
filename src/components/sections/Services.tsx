'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StructuredData from '@/components/seo/StructuredData'
import { services } from '@/lib/content/services'
import { getServiceStructuredDataExtended } from '@/lib/utils/seo'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { CheckCircle, Sparkles } from 'lucide-react'

export default function Services() {
  return (
    <>
      {services.map((service) => (
        <StructuredData
          key={`service-${service.id}`}
          data={getServiceStructuredDataExtended(
            service.title,
            service.description,
            service.price !== 'БЕСПЛАТНО' && service.price !== 'По запросу' ? service.price : undefined
          )}
        />
      ))}
    <AnimatedSection
      id="services"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-br from-beige-50 to-beige-100"
    >
      <div className="container mx-auto px-3 xs:px-4 w-full max-w-full overflow-x-hidden">
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
              Услуги
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
              Я подберу для вас оптимальную программу исходя из ваших потребностей и индивидуальных особенностей
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Карточки услуг */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-3xl shadow-xl border border-beige-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Заголовок карточки */}
                <div className="bg-gradient-to-br from-beige-500 to-beige-600 p-8 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Sparkles className="w-8 h-8" />
                    {service.price === 'БЕСПЛАТНО' && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        БЕСПЛАТНО
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold mb-2">
                    {service.title}
                  </h3>
                  {service.price !== 'БЕСПЛАТНО' && (
                    <p className="text-beige-100 text-lg">
                      {service.price}
                    </p>
                  )}
                </div>

                {/* Контент карточки */}
                <div className="p-4 xs:p-6 sm:p-8 flex-grow flex flex-col">
                  <p className="text-beige-700 text-sm xs:text-base sm:text-lg mb-4 xs:mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-4 xs:mb-6 flex-grow">
                    <h4 className="text-base xs:text-lg font-semibold text-beige-800 mb-3 xs:mb-4">
                      Что входит:
                    </h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-beige-500 flex-shrink-0 mt-0.5" />
                          <span className="text-beige-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <SmoothScrollLink
                    href="#contact"
                    className="block w-full text-center px-4 xs:px-6 py-3 xs:py-4 bg-beige-600 text-white rounded-xl font-semibold hover:bg-beige-700 transition-colors mt-auto min-h-touch text-sm xs:text-base"
                  >
                    Записаться
                  </SmoothScrollLink>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Дополнительная информация */}
          <motion.div
            className="mt-16 bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-beige-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-beige-800 mb-3 xs:mb-4 text-center">
              Не знаете, какая услуга вам подходит?
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-beige-700 text-center max-w-3xl mx-auto leading-relaxed">
              Начните с бесплатной первоначальной консультации. Я помогу определить ваши цели 
              и подобрать оптимальный вариант работы.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
    </>
  )
}
