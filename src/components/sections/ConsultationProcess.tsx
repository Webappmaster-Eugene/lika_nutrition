'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  FileText,
  Search,
  ShoppingCart,
  ChefHat,
  Heart,
} from 'lucide-react'

const processSteps = [
  {
    icon: FileText,
    title: 'Запрос и знакомство',
    description: 'Вы описываете запрос, я уточняю детали и проверяю отсутствие красных флагов.',
    color: 'beige',
  },
  {
    icon: Search,
    title: 'Глубокая первичная диагностика',
    description: 'Вы заполняете подробный опросник, который охватывает: питание, ЖКТ, сон и стресс, симптомы, анализы (если есть), образ жизни. Уже на этом этапе становится ясно, где первопричина.',
    color: 'beige',
  },
  {
    icon: Heart,
    title: 'Формирование картины здоровья',
    description: 'Я собираю целостную картину, выявляю первопричины, расставляю приоритеты.',
    color: 'beige',
  },
  {
    icon: ShoppingCart,
    title: 'Консультация и стратегия',
    description: 'Мы обсуждаем ситуацию простым языком и формируем персональный план, а не шаблон.',
    color: 'beige',
  },
  {
    icon: ChefHat,
    title: 'Что вы получаете после',
    description: 'Рекомендации, меню и рецепты, план действий, понимание, что и зачем делать дальше. При сопровождении — постоянная поддержка.',
    color: 'beige',
  },
]

export default function ConsultationProcess() {
  return (
    <AnimatedSection
      id="consultation-process"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto w-full max-w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <motion.div
            className="text-center mb-8 xs:mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mb-3 xs:mb-4">
              Как проходит работа и что вы получаете на выходе
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
              Проблема не в том, что нет информации. Проблема в том, что её слишком много — и часто она противоречива. Я не даю универсальных схем и не предлагаю «делать всё сразу». Мой подход — это структура и приоритеты.
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Вертикальная линия для десктопа */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-beige-200 transform -translate-x-1/2" />

            {/* Шаги процесса */}
            <div className="space-y-8 xs:space-y-10 sm:space-y-12">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={step.title}
                    className={`relative flex flex-col lg:flex-row items-center gap-6 xs:gap-8 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    {/* Иконка и круг */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 bg-beige-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <Icon className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 text-beige-600" />
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-20 left-1/2 w-1 h-12 bg-beige-200 transform -translate-x-1/2" />
                      )}
                    </div>

                    {/* Контент */}
                    <div
                      className={`flex-1 bg-gradient-to-br from-beige-50 to-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200 ${
                        isEven ? 'lg:text-right' : 'lg:text-left'
                      }`}
                    >
                      <div className={`flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'}`}>
                        <div className="flex items-center gap-2 xs:gap-3 mb-3 xs:mb-4">
                          <span className="text-xl xs:text-2xl font-bold text-beige-600">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-800">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm xs:text-base text-beige-700 leading-relaxed max-w-2xl">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Дополнительная информация */}
          <motion.div
            className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="bg-gradient-to-r from-beige-100 to-beige-50 p-4 xs:p-6 sm:p-8 md:p-10 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200">
              <div className="flex items-start gap-3 xs:gap-4 sm:gap-6">
                <Heart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-beige-600 flex-shrink-0" />
                <div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-beige-800 mb-2 xs:mb-3">
                Индивидуальный подход
              </h3>
              <p className="text-sm xs:text-base sm:text-lg text-beige-700 leading-relaxed">
                    Каждая консультация адаптируется под ваши уникальные потребности, цели и образ жизни. 
                    Я учитываю результаты ваших анализов, пищевые предпочтения, аллергии и непереносимости, 
                    чтобы создать программу, которая будет работать именно для вас.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative w-full h-48 xs:h-56 sm:h-64 lg:h-80 rounded-2xl xs:rounded-3xl overflow-hidden shadow-xl bg-beige-50">
              <Image
                src="/images/services/consultation.svg"
                alt="Индивидуальный подход нутрициолога к составлению персональной программы питания и восстановлению здоровья"
                fill
                className="object-cover"
                sizes="(max-width: 320px) 100vw, (max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
