'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { DiplomaGalleryModal } from '@/components/ui/DiplomaGalleryModal'
import { GraduationCap } from 'lucide-react'

export default function About() {
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false)

  return (
    <AnimatedSection
      id="about"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 xs:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-3 xs:mb-4">
              Будем знакомы!
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-accent-400" />
              <div className="w-2 h-2 rounded-full bg-accent-400" />
              <div className="w-12 h-px bg-accent-400" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 items-center">
            {/* Фото с декоративной рамкой */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -inset-3 border-2 border-sage-300/40 rounded-3xl" />
              <div className="absolute -inset-1 border border-accent-300/30 rounded-2xl" />
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/photos/photo-2.jpg"
                  alt="Лика Надточеева — нутрициолог"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Текст */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 xs:space-y-5"
            >
              <p className="text-base xs:text-lg text-sage-800 leading-relaxed">
                Меня зовут <strong className="text-sage-900">Лика Надточеева</strong>! Я дипломированный превентивный нутрициолог с коучинговым подходом.
              </p>
              <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
                Мой путь начался с личных проблем со здоровьем. Годами я жила с усталостью, дерматитом, нестабильным весом. Я думала, что это норма — просто нужно больше стараться. Но оказалось, что дело не в силе воли, а в работе организма.
              </p>
              <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
                Когда я начала разбираться в нутрициологии, я обнаружила у себя железодефицитную анемию с ферритином 7 и хеликобактер. Без диет и фанатизма подняла ферритин до 60 и впервые за долгое время почувствовала, что тело — на моей стороне.
              </p>
              <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
                Благодаря 2 годам опыта в психодиагностике я понимаю, что знание само по себе не меняет поведение. Настоящие сложности лежат глубже — в привычках, стрессе, откатах. Поэтому в моём подходе объединены: нутрициология, психология и коучинг.
              </p>
              <p className="text-sm xs:text-base text-sage-700 leading-relaxed font-medium">
                Сегодня я помогаю женщинам вернуть ресурс, энергию и ощущение опоры в теле — без давления и борьбы с собой.
              </p>
              <div className="pt-2 border-l-4 border-accent-400 pl-4">
                <p className="text-sage-600 italic text-sm xs:text-base font-serif">
                  &laquo;Потому что здоровье — это не про контроль, а про поддержку и понимание.&raquo;
                </p>
              </div>
              <button
                onClick={() => setIsDiplomaOpen(true)}
                className="flex items-center gap-3 mt-4 px-5 py-3 bg-beige-50 rounded-xl hover:bg-beige-100 transition-colors text-left min-h-touch border border-beige-300"
              >
                <GraduationCap className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-sage-800">Моё образование</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <DiplomaGalleryModal isOpen={isDiplomaOpen} onClose={() => setIsDiplomaOpen(false)} />
    </AnimatedSection>
  )
}
