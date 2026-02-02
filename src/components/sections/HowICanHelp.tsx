'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import {
  Scale,
  Heart,
  Smile,
  Brain,
  Shield,
  Zap,
  Wind,
} from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Хроническая усталость, нехватка энергии',
    description: 'Восстановление ресурса и энергии через правильное питание и работу с дефицитами',
  },
  {
    icon: Heart,
    title: 'Изжога, вздутие, тяжесть после еды',
    description: 'Работа с ЖКТ, выявление первопричин и восстановление пищеварения',
  },
  {
    icon: Scale,
    title: 'Вес, который не уходит',
    description: 'Подход без диет и жёстких ограничений, с пониманием процессов',
  },
  {
    icon: Shield,
    title: 'Низкий ферритин, анемия, дефициты',
    description: 'Выявление и восполнение дефицитов витаминов и минералов',
  },
  {
    icon: Brain,
    title: 'Тяга к сладкому, срывы',
    description: 'Понимание причин и работа с пищевым поведением',
  },
  {
    icon: Smile,
    title: 'Тревога вокруг еды',
    description: 'Выстраивание здоровых отношений с едой без стресса и фанатизма',
  },
  {
    icon: Wind,
    title: 'Ощущение, что вы живёте «на износе»',
    description: 'Восстановление ресурса и устойчивости организма',
  },
]

export default function HowICanHelp() {
  return (
    <AnimatedSection
      id="how-help"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
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
              Если вы устали от противоречивых советов — вы по адресу
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
              Ко мне приходят женщины, которые уже много всего пробовали, читали, смотрели, слушали — и в итоге запутались ещё больше
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Карточки преимуществ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  className="bg-gradient-to-br from-beige-50 to-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200 hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="bg-beige-100 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl xs:rounded-2xl flex items-center justify-center mb-4 xs:mb-5 sm:mb-6 group-hover:bg-beige-200 transition-colors">
                    <Icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-beige-600" />
                  </div>
                  <h3 className="text-base xs:text-lg sm:text-xl font-bold text-beige-800 mb-2 xs:mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm xs:text-base text-beige-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Дополнительный блок */}
          <motion.div
            className="mt-12 xs:mt-14 sm:mt-16 bg-gradient-to-r from-beige-100 to-beige-50 p-4 xs:p-6 sm:p-8 md:p-10 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-beige-800 mb-3 xs:mb-4 text-center">
              Я не предлагаю ещё больше правил
            </h3>
            <p className="text-sm xs:text-base sm:text-lg text-beige-700 text-center max-w-3xl mx-auto leading-relaxed">
              Я помогаю понять себя и своё тело, чтобы жить легче и стабильно.
            </p>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
