'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { socialLinks } from '@/lib/constants/social'

export default function SocialLinks() {
  return (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href={socialLinks.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-beige-600 text-white rounded-full hover:bg-beige-700 transition-colors shadow-lg hover:shadow-xl"
        aria-label="Telegram"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline font-medium">Telegram</span>
      </Link>
    </motion.div>
  )
}
