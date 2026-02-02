'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { aboutContent } from '@/lib/content/about'
import {
  Apple,
  Heart,
  Shield,
  Activity,
  Brain,
} from 'lucide-react'

const points = [
  {
    icon: Apple,
    title: 'Пищевые вещества',
    description: 'Изучение состава продуктов питания, их питательной ценности и влияния на организм',
  },
  {
    icon: Heart,
    title: 'Влияние на организм',
    description: 'Понимание того, как еда воздействует на организм в целом и на отдельные органы',
  },
  {
    icon: Shield,
    title: 'Оздоровление',
    description: 'Использование питания как инструмента для восстановления и поддержания здоровья',
  },
  {
    icon: Activity,
    title: 'Усвоение пищи',
    description: 'Изучение процессов усвоения еды организмом и факторов, влияющих на этот процесс',
  },
  {
    icon: Brain,
    title: 'Профилактика',
    description: 'Предотвращение заболеваний через правильное и сбалансированное питание',
  },
]

export default function WhatIsNutriciology() {
  return (
    <AnimatedSection
      id="nutriciology"
      className="py-24 bg-gradient-to-br from-beige-50 to-beige-100"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-beige-800 mb-4">
              Что такое нутрициология
            </h2>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full" />
          </motion.div>

          {/* Основное описание */}
          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-beige-700 leading-relaxed text-center">
              Нутрициология — это наука о питании, где предметом изучения выступает еда и её влияние 
              на организм человека в целом и на отдельные его органы.
            </p>
            <p className="text-lg text-beige-600 leading-relaxed text-center mt-6">
              Нутрициология изучает состав продуктов питания, процессы взаимодействия продуктов питания, 
              способ употребления пищи, её вид. Большой упор делается на входящие в состав пищи вещества 
              и то, какое действие оказывают эти вещества на организм человека.
            </p>
          </motion.div>

          {/* Карточки с направлениями */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {points.map((point, index) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.title}
                  className="bg-white p-8 rounded-3xl shadow-lg border border-beige-200 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="bg-beige-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-beige-600" />
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-800 mb-2 xs:mb-3">
                    {point.title}
                  </h3>
                  <p className="text-beige-600 leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Дополнительная информация с изображением */}
          <motion.div
            className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="relative w-full h-48 xs:h-56 sm:h-64 lg:h-80 rounded-2xl xs:rounded-3xl overflow-hidden shadow-xl bg-beige-50">
              <Image
                src="/images/services/nutrition.svg"
                alt="Здоровое питание и правильный рацион от нутрициолога - основа здоровья и долголетия"
                fill
                className="object-cover"
                sizes="(max-width: 320px) 100vw, (max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200">
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-beige-800 mb-3 xs:mb-4 sm:mb-6">
                Почему это важно?
              </h3>
              <p className="text-sm xs:text-base sm:text-lg text-beige-700 leading-relaxed">
                Современная нутрициология объединяет знания из различных областей науки, чтобы помочь 
                каждому человеку найти свой индивидуальный путь к здоровью через правильное питание. 
                Это не просто диета, а целостный подход к пониманию того, как пища влияет на наше 
                самочувствие, энергию и долголетие.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
