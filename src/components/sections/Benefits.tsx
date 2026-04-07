'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { BotanicalDecoration } from '@/components/ui/BotanicalDecoration'
import { benefits } from '@/lib/content/benefits'
import { staggerContainer, staggerItem, hoverLift } from '@/lib/animations'
import { Battery, Flame, Scale, Shield, Cookie, Brain, type LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Battery,
  Flame,
  Scale,
  Shield,
  Cookie,
  Brain,
}

export default function Benefits() {
  return (
    <AnimatedSection
      id="benefits"
      className="py-12 xs:py-16 sm:py-20 md:py-24 bg-beige-50 relative overflow-hidden"
    >
      {/* Botanical background decorations */}
      <BotanicalDecoration
        variant="eucalyptus"
        position="absolute top-20 -right-10"
        size="w-48 h-48"
        opacity="opacity-[0.04]"
      />
      <BotanicalDecoration
        variant="fern"
        position="absolute bottom-10 -left-8"
        size="w-40 h-40"
        opacity="opacity-[0.03]"
      />
      <BotanicalDecoration
        variant="leaf"
        position="absolute top-1/2 right-1/4"
        size="w-24 h-24"
        opacity="opacity-[0.03]"
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Если вы устали от противоречивых советов, Вы по адресу"
            subtitle="Я не предлагаю ещё больше правил. Я помогаю понять себя и своё тело, чтобы жить легко и стабильно. Ниже представлены запросы, с которыми вы можете ко мне обратиться."
          />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon]
              return (
                <motion.div
                  key={index}
                  className="gradient-top-border bg-white/70 backdrop-blur-sm p-5 xs:p-6 rounded-2xl shadow-md border border-sage-200/50 hover:shadow-lg hover:border-sage-300/70 transition-all duration-300"
                  variants={staggerItem}
                  whileHover={hoverLift}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex items-center justify-center mb-4">
                    {IconComponent && <IconComponent className="w-7 h-7 text-sage-600" />}
                  </div>
                  <h3 className="font-serif text-base xs:text-lg font-semibold text-sage-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm xs:text-base text-sage-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
