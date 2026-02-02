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
  const baseClasses = 'w-full px-3 xs:px-4 py-3 min-h-touch border border-beige-300 rounded-xl focus:ring-2 focus:ring-beige-500 focus:border-beige-500 bg-white text-beige-800 placeholder-beige-400 transition-all text-sm xs:text-base'

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-xs xs:text-sm font-medium text-beige-700 mb-1.5 xs:mb-2">
        {label}
        {required && <span className="text-beige-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className={`${baseClasses} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  )
}
