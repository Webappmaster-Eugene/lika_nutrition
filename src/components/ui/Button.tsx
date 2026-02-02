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
    primary: 'bg-beige-600 text-white hover:bg-beige-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-beige-400 text-white hover:bg-beige-500',
    outline: 'border-2 border-beige-600 text-beige-600 hover:bg-beige-50',
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
