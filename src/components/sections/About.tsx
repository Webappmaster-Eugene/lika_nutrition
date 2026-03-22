'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BotanicalDecoration } from '@/components/ui/BotanicalDecoration'
import { DiplomaGalleryModal } from '@/components/ui/DiplomaGalleryModal'
import { GraduationCap, Heart, Microscope, Brain, Sparkles } from 'lucide-react'

const timelineItems = [
  {
    icon: Heart,
    text: 'Меня зовут <strong>Лика Надточеева</strong>! Я дипломированный превентивный нутрициолог с коучинговым подходом.',
    isIntro: true,
  },
  {
    icon: Microscope,
    text: 'Мой путь начался с личных проблем со здоровьем. Годами я жила с усталостью, дерматитом, нестабильным весом. Я думала, что это норма — просто нужно больше стараться. Но оказалось, что дело не в силе воли, а в работе организма.',
  },
  {
    icon: Brain,
    text: 'Когда я начала разбираться в нутрициологии, я обнаружила у себя железодефицитную анемию с ферритином 7 и хеликобактер. Без диет и фанатизма подняла ферритин до 60 и впервые за долгое время почувствовала, что тело — на моей стороне.',
  },
  {
    icon: Sparkles,
    text: 'Благодаря 2 годам опыта в психодиагностике я понимаю, что знание само по себе не меняет поведение. Настоящие сложности лежат глубже — в привычках, стрессе, откатах. Поэтому в моём подходе объединены: нутрициология, психология и коучинг.',
  },
]

export default function About() {
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false)

  return (
    <AnimatedSection
      id="about"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-sage-50/30"
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Будем знакомы!" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xs:gap-10 lg:gap-14 items-center">
            {/* Фото с декоративной рамкой и botanical accent */}
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
              {/* Botanical accent на рамке фото */}
              <BotanicalDecoration
                variant="branch"
                position="absolute -bottom-4 -right-4"
                size="w-20 h-20"
                opacity="opacity-[0.12]"
              />
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-0"
            >
              {/* Timeline items */}
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-sage-200 via-sage-300 to-sage-200 hidden xs:block" />

                {timelineItems.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={index}
                      className="flex gap-4 mb-4 last:mb-0"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 relative z-10 hidden xs:flex">
                        <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center ring-4 ring-white">
                          <IconComponent className="w-5 h-5 text-sage-600" />
                        </div>
                      </div>
                      <div className="pt-1">
                        <p
                          className={`${item.isIntro ? 'text-base xs:text-lg text-sage-800' : 'text-sm xs:text-base text-sage-700'} leading-relaxed`}
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Итоговый текст */}
              <motion.p
                className="text-sm xs:text-base text-sage-700 leading-relaxed font-medium mt-4 xs:ml-14"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                Сегодня я помогаю женщинам вернуть ресурс, энергию и ощущение опоры в теле — без давления и борьбы с собой.
              </motion.p>

              {/* Цитата с декоративной кавычкой */}
              <motion.div
                className="pt-4 relative xs:ml-14"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <span className="absolute -top-2 -left-2 text-6xl text-sage-200 font-serif leading-none select-none hidden xs:block">&laquo;</span>
                <div className="border-l-4 border-accent-400 pl-4">
                  <p className="text-sage-600 italic text-sm xs:text-base font-serif">
                    Потому что здоровье — это не про контроль, а про поддержку и понимание.
                  </p>
                </div>
              </motion.div>

              {/* Диплом кнопка с shimmer */}
              <motion.button
                onClick={() => setIsDiplomaOpen(true)}
                className="flex items-center gap-3 mt-5 px-5 py-3 bg-beige-50 rounded-xl hover:bg-beige-100 transition-colors text-left min-h-touch border border-beige-300 shimmer-hover xs:ml-14"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                <GraduationCap className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-sage-800">Моё образование</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <DiplomaGalleryModal isOpen={isDiplomaOpen} onClose={() => setIsDiplomaOpen(false)} />
    </AnimatedSection>
  )
}
