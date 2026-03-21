'use client'

import { useState } from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
  className?: string
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  const baseClasses = `w-full px-4 xs:px-5 py-3.5 xs:py-4 min-h-touch border-2 rounded-2xl bg-white text-sage-900 placeholder-beige-400 transition-all duration-300 text-sm xs:text-base ${
    isFocused
      ? 'border-sage-500 ring-4 ring-sage-100 shadow-lg'
      : 'border-beige-200 hover:border-beige-300'
  } ${hasValue && !isFocused ? 'border-beige-300 bg-beige-50/30' : ''}`

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={name}
        className={`block text-sm xs:text-base font-semibold mb-2.5 xs:mb-3 transition-all duration-300 ${
          isFocused || hasValue ? 'text-sage-800' : 'text-sage-700'
        }`}
      >
        {label}
        {required && <span className="text-sage-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          rows={5}
          className={`${baseClasses} resize-y min-h-[120px] focus:outline-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`${baseClasses} focus:outline-none`}
        />
      )}
      {isFocused && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sage-400 via-sage-600 to-sage-400 rounded-full animate-pulse" />
      )}
    </div>
  )
}
