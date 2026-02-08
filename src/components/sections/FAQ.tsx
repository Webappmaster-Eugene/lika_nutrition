'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StructuredData from '@/components/seo/StructuredData'
import { getFAQPageStructuredData } from '@/lib/utils/seo'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'Как проходит работа?',
    answer: 'Вы описываете запрос → я проверяю отсутствие красных флагов → отправляю опросник → формирую картину здоровья → проводим консультацию → при сопровождении я остаюсь с вами в процессе.',
  },
  {
    question: 'Работаешь ли ты онлайн?',
    answer: 'Да, я работаю онлайн по всей России.',
  },
  {
    question: 'Есть ли состояния, с которыми ты не работаешь?',
    answer: 'Да. Я не работаю при: онкологических заболеваниях, тяжёлых психиатрических диагнозах, острых состояниях, требующих немедленного врачебного вмешательства. Если есть сомнения — лучше написать и уточнить.',
  },
  {
    question: 'Нужно ли сразу сдавать анализы?',
    answer: 'Нет. Я рекомендую анализы только по показаниям, когда понимаю, что они действительно нужны.',
  },
  {
    question: 'Ты назначаешь лекарства?',
    answer: 'Нет. Я работаю в рамках нутрициологии и образа жизни и при необходимости рекомендую обратиться к врачу.',
  },
  {
    question: 'Подойдёт ли мне твой формат?',
    answer: 'Если вы хотите: без диет, без давления, с пониманием процессов и с поддержкой — скорее всего, да. Если сомневаетесь, мы обсудим это перед началом работы.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqStructuredData = getFAQPageStructuredData(faqItems)

  return (
    <>
      <StructuredData data={faqStructuredData} />
      <AnimatedSection
        id="faq"
        className="py-12 xs:py-16 sm:py-20 md:py-24 bg-white"
      >
        <div className="container mx-auto w-full max-w-full overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8 xs:mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mb-3 xs:mb-4">
                Часто задаваемые вопросы
              </h2>
              <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
              Ответы на самые популярные вопросы
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="space-y-3 xs:space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-beige-50 rounded-xl xs:rounded-2xl overflow-hidden border border-beige-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-4 xs:px-6 py-4 xs:py-5 flex items-center justify-between text-left hover:bg-beige-100 transition-colors min-h-touch"
                >
                  <span className="text-sm xs:text-base sm:text-lg font-semibold text-beige-800 pr-3 xs:pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 xs:w-6 xs:h-6 text-beige-600" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 xs:px-6 pb-4 xs:pb-5 text-sm xs:text-base text-beige-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
    </>
  )
}
