'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import StructuredData from '@/components/seo/StructuredData'
import { ServicesTableModal } from '@/components/ui/ServicesTableModal'
import { services } from '@/lib/content/services'
import { getServiceStructuredDataExtended } from '@/lib/utils/seo'
import SmoothScrollLink from '@/components/ui/SmoothScrollLink'
import { Table } from 'lucide-react'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'

// ID рекомендованного тарифа (средний)
const RECOMMENDED_ID = 3

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
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              title="Услуги"
              subtitle="Я предлагаю широкий выбор форматов работы и помогу подобрать тот, который наилучшим образом соответствует вашим целям и особенностям"
            />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service) => {
                const isRecommended = service.id === RECOMMENDED_ID
                return (
                  <motion.div
                    key={service.id}
                    className={`relative bg-white rounded-2xl shadow-md flex flex-col transition-all duration-300 ${
                      isRecommended
                        ? 'border-2 border-accent-400 shadow-lg mt-5 overflow-visible z-10'
                        : 'border border-beige-200 hover:shadow-lg overflow-hidden'
                    }`}
                    variants={staggerItem}
                    whileHover={hoverLift}
                  >
                    {/* "Популярный" бейдж */}
                    {isRecommended && (
                      <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <span className="bg-accent-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                          Популярный выбор
                        </span>
                      </div>
                    )}

                    {/* Top border accent */}
                    <div className="h-1 bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 rounded-t-2xl" />

                    {/* Content */}
                    <div className="p-4 xs:p-5 flex-1 flex flex-col">
                      <h3 className="text-base xs:text-lg font-bold text-sage-900 mb-1 font-serif">
                        {service.title}
                      </h3>
                      <p className="text-2xl xs:text-3xl font-bold text-accent-500 font-serif mb-3">
                        {service.price}
                      </p>

                      <div className="space-y-3 mb-5 flex-1">
                        <div>
                          <p className="text-xs font-bold text-accent-500 uppercase tracking-wider mb-1">Для кого:</p>
                          <p className="text-sm text-sage-700 leading-relaxed">
                            {service.targetAudience}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-accent-500 uppercase tracking-wider mb-1">Фишка:</p>
                          <p className="text-sm text-sage-700 leading-relaxed">
                            {service.highlight}
                          </p>
                        </div>
                      </div>

                      <SmoothScrollLink
                        href="#contact"
                        className={`block text-center px-4 py-3 rounded-xl font-medium transition-all duration-300 min-h-touch text-sm xs:text-base ${
                          isRecommended
                            ? 'bg-accent-400 text-white hover:bg-accent-500 shadow-md hover:shadow-lg'
                            : 'border-2 border-sage-400 text-sage-700 hover:bg-sage-50 hover:border-sage-500'
                        }`}
                      >
                        Записаться
                      </SmoothScrollLink>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Кнопка таблицы */}
            <motion.div
              className="text-center mt-8 xs:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                onClick={() => setIsTableOpen(true)}
                className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Table className="w-5 h-5" />
                <span>Ознакомиться с полным<br />пакетом услуг</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      <ServicesTableModal isOpen={isTableOpen} onClose={() => setIsTableOpen(false)} />
    </>
  )
}
