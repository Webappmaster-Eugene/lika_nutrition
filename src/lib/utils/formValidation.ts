export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Российский формат телефона: +7 (XXX) XXX-XX-XX или 8XXXXXXXXXX
  const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/
  const cleaned = phone.replace(/\s|-|\(|\)/g, '')
  return cleaned.length >= 10 && cleaned.length <= 12
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100
}

export function validateMessage(message: string, required: boolean = false): boolean {
  if (!required && !message.trim()) return true
  return message.trim().length >= 10 && message.trim().length <= 2000
}

export interface ValidationErrors {
  name?: string
  phone?: string
  email?: string
  message?: string
}

export function validateForm(data: {
  name: string
  phone: string
  email: string
  message?: string
}): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {}

  if (!validateName(data.name)) {
    errors.name = 'Имя должно содержать от 2 до 100 символов'
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Введите корректный номер телефона'
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Введите корректный email'
  }

  if (data.message && !validateMessage(data.message)) {
    errors.message = 'Сообщение должно содержать от 10 до 2000 символов'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
