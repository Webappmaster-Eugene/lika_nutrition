'use client'

interface BotanicalDecorationProps {
  variant?: 'leaf' | 'branch' | 'eucalyptus' | 'fern'
  position?: string
  size?: string
  opacity?: string
  className?: string
}

const variants = {
  leaf: (
    <>
      <path d="M100 20 Q110 60 140 80 Q110 85 100 120 Q90 85 60 80 Q90 60 100 20Z" fill="currentColor" />
      <path d="M100 120 Q100 160 100 180" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  branch: (
    <>
      <path d="M60 100 Q80 60 120 50 Q110 80 130 110 Q100 100 80 120 Q70 110 60 100Z" fill="currentColor" />
      <path d="M90 95 Q90 130 85 160" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  eucalyptus: (
    <>
      <ellipse cx="75" cy="60" rx="20" ry="28" transform="rotate(-30 75 60)" fill="currentColor" />
      <ellipse cx="125" cy="80" rx="20" ry="28" transform="rotate(20 125 80)" fill="currentColor" />
      <ellipse cx="80" cy="120" rx="18" ry="25" transform="rotate(-20 80 120)" fill="currentColor" />
      <path d="M100 30 Q100 100 95 180" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
  fern: (
    <>
      <path d="M100 20 Q115 40 130 50 Q110 50 100 60 Q90 50 70 50 Q85 40 100 20Z" fill="currentColor" />
      <path d="M100 50 Q120 65 140 70 Q115 72 100 85 Q85 72 60 70 Q80 65 100 50Z" fill="currentColor" />
      <path d="M100 80 Q125 95 145 100 Q120 100 100 115 Q80 100 55 100 Q75 95 100 80Z" fill="currentColor" />
      <path d="M100 20 Q100 100 100 180" stroke="currentColor" strokeWidth="2" fill="none" />
    </>
  ),
}

export function BotanicalDecoration({
  variant = 'leaf',
  position = 'absolute top-0 right-0',
  size = 'w-32 h-32',
  opacity = 'opacity-[0.05]',
  className = '',
}: BotanicalDecorationProps) {
  return (
    <svg
      className={`${position} ${size} ${opacity} text-sage-600 pointer-events-none ${className}`}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variants[variant]}
    </svg>
  )
}
