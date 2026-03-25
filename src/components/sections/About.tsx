'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BotanicalDecoration } from '@/components/ui/BotanicalDecoration'
import { DiplomaGalleryModal } from '@/components/ui/DiplomaGalleryModal'
import { GraduationCap } from 'lucide-react'

export default function About() {
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false)

  return (
    <AnimatedSection
      id="about"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-sage-50/30"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="Будем знакомы!" />

          {/* Фото по центру с декоративной рамкой */}
          <motion.div
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            <BotanicalDecoration
              variant="branch"
              position="absolute -bottom-4 -right-4"
              size="w-20 h-20"
              opacity="opacity-[0.12]"
            />
          </motion.div>

          {/* Текст под фото */}
          <motion.div
            className="text-center mt-8 xs:mt-10 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-base xs:text-lg text-sage-800 leading-relaxed">
              Меня зовут <strong>Лика Надточеева</strong>! Я дипломированный нутрициолог,
              health-couch и специалист по образу жизни.
            </p>
            <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
              Сегодня вокруг здоровья слишком много шума. Каждый день — новые
              советы, схемы, протоколы и «обязательные добавки».
            </p>
            <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
              Я помогу Вам разобраться в этом потоке информации и понять, что
              действительно важно именно Вашему организму. Без стресса и фанатизма.
              Без горы БАДов. Без жёстких ограничений. Только логика, диагностика
              и индивидуальный подход.
            </p>
            <p className="text-sm xs:text-base text-sage-700 leading-relaxed">
              Ведь я сама когда-то прошла путь от новичка до профессионала. И
              точно знаю, какие рекомендации можно внедрить в повседневную жизнь,
              а какие так и остаются лишь теорией, не приводящей к действию.
            </p>
          </motion.div>

          {/* Кнопка "Моё образование" — стиль CTA */}
          <motion.div
            className="text-center mt-6 xs:mt-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setIsDiplomaOpen(true)}
              className="inline-flex items-center gap-2 px-6 xs:px-8 py-3 xs:py-4 bg-accent-400 text-white rounded-full font-semibold hover:bg-accent-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base min-h-touch"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <GraduationCap className="w-5 h-5" />
              Моё образование
            </motion.button>
          </motion.div>
        </div>
      </div>

      <DiplomaGalleryModal isOpen={isDiplomaOpen} onClose={() => setIsDiplomaOpen(false)} />
    </AnimatedSection>
  )
}
