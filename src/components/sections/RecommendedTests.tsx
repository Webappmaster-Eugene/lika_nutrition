'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { aboutContent } from '@/lib/content/about'
import { FileText, Download } from 'lucide-react'

export default function RecommendedTests() {
  const handleDownload = () => {
    // Создаем текстовый файл со списком анализов
    const content = aboutContent.recommendedTests.tests
      .map((test) => {
        if (typeof test === 'string') {
          return `• ${test}`
        } else {
          return `\n${test.category}\n${test.items.map((item) => `  • ${item}`).join('\n')}`
        }
      })
      .join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'список-анализов.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatedSection
      id="recommended-tests"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-gradient-to-br from-beige-50 to-beige-100"
    >
      <div className="container mx-auto px-3 xs:px-4 w-full max-w-full overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          {/* Заголовок */}
          <motion.div
            className="text-center mb-8 xs:mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-beige-800 mb-3 xs:mb-4">
              {aboutContent.recommendedTests.title}
            </h2>
            <p className="text-base xs:text-lg sm:text-xl text-beige-600 max-w-3xl mx-auto">
              {aboutContent.recommendedTests.description}
            </p>
            <div className="w-24 h-1 bg-beige-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Список анализов */}
          <motion.div
            className="bg-white rounded-2xl xs:rounded-3xl shadow-xl border border-beige-200 p-4 xs:p-6 sm:p-8 md:p-12 mb-6 xs:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ol className="space-y-4 xs:space-y-5 sm:space-y-6">
              {aboutContent.recommendedTests.tests.map((test, index) => {
                if (typeof test === 'string') {
                  return (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 xs:gap-4 text-sm xs:text-base sm:text-lg text-beige-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <span className="flex-shrink-0 w-7 h-7 xs:w-8 xs:h-8 bg-beige-100 rounded-full flex items-center justify-center text-beige-600 font-semibold mt-0.5 text-xs xs:text-sm">
                        {index + 1}
                      </span>
                      <span className="flex-1 pt-0.5 xs:pt-1">{test}</span>
                    </motion.li>
                  )
                } else {
                  return (
                    <motion.li
                      key={index}
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-beige-100 rounded-full flex items-center justify-center text-beige-600 font-semibold mt-0.5">
                          {index + 1}
                        </span>
                        <h3 className="text-base xs:text-lg font-semibold text-beige-800 pt-0.5 xs:pt-1">
                          {test.category}
                        </h3>
                      </div>
                      <ul className="ml-10 xs:ml-12 space-y-1.5 xs:space-y-2">
                        {test.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-2 xs:gap-3 text-sm xs:text-base text-beige-600"
                          >
                            <span className="text-beige-400 mt-1.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.li>
                  )
                }
              })}
            </ol>
          </motion.div>

          {/* Кнопка скачивания */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 xs:gap-3 px-6 xs:px-8 py-3 xs:py-4 bg-beige-600 text-white rounded-full font-semibold hover:bg-beige-700 transition-colors shadow-lg hover:shadow-xl min-h-touch text-sm xs:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 xs:w-5 xs:h-5" />
              <span className="hidden xs:inline">Скачать список анализов</span>
              <span className="xs:hidden">Скачать</span>
            </motion.button>
          </motion.div>

          {/* Дополнительная информация */}
          <motion.div
            className="mt-8 xs:mt-10 sm:mt-12 bg-white/80 backdrop-blur-sm p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl shadow-lg border border-beige-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          >
            <div className="flex items-start gap-3 xs:gap-4">
              <FileText className="w-6 h-6 xs:w-8 xs:h-8 text-beige-600 flex-shrink-0 mt-0.5 xs:mt-1" />
              <div>
                <h3 className="text-lg xs:text-xl font-bold text-beige-800 mb-1.5 xs:mb-2">
                  Важная информация
                </h3>
                <p className="text-sm xs:text-base text-beige-700 leading-relaxed">
                  Этот список анализов поможет мне составить полную картину вашего здоровья и 
                  выявить возможные дефициты или нарушения. Если у вас уже есть результаты анализов, 
                  принесите их на консультацию. Если анализов нет, я помогу определить приоритетные 
                  исследования для вашего случая.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
