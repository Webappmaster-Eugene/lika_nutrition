import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'cta'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'px-5 xs:px-6 py-3 min-h-touch rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base'

  const variantClasses = {
    primary: 'bg-sage-600 text-white hover:bg-sage-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-sage-400 text-white hover:bg-sage-500',
    outline: 'border-2 border-sage-600 text-sage-700 hover:bg-sage-50',
    cta: 'bg-accent-400 text-white hover:bg-accent-500 shadow-lg hover:shadow-xl font-semibold',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
