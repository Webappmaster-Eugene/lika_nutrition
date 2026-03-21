import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'px-5 xs:px-6 py-3 min-h-touch rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm xs:text-base'

  const variantClasses = {
    primary: 'bg-sage-700 text-white hover:bg-sage-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-sage-500 text-white hover:bg-sage-600',
    outline: 'border-2 border-sage-700 text-sage-700 hover:bg-sage-50',
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
