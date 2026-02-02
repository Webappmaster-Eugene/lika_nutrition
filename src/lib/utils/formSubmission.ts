import { ContactFormData, ConsultationFormData } from '@/types/forms'
import { validateForm } from './formValidation'

async function sendToTelegram(message: string): Promise<void> {
  // В клиентском коде используем NEXT_PUBLIC_ префикс
  const botToken = typeof window !== 'undefined' 
    ? (window as any).__TELEGRAM_BOT_TOKEN__ || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    : process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
  const chatId = typeof window !== 'undefined'
    ? (window as any).__TELEGRAM_CHAT_ID__ || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID
    : process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    // Если нет токена, используем mailto как fallback
    throw new Error('Telegram bot не настроен. Пожалуйста, свяжитесь напрямую через Telegram.')
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.description || 'Ошибка при отправке сообщения')
  }
}

function formatConsultationMessage(data: ConsultationFormData): string {
  return `
🎯 <b>Новая заявка на консультацию</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Телефон:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}
${data.message ? `💬 <b>Сообщение:</b>\n${data.message}` : ''}
${data.service ? `📋 <b>Услуга:</b> ${data.service}` : ''}
  `.trim()
}

function formatContactMessage(data: ContactFormData): string {
  return `
📨 <b>Новое сообщение с сайта</b>

👤 <b>Имя:</b> ${data.name}
📞 <b>Телефон:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}
💬 <b>Сообщение:</b>
${data.message}
  `.trim()
}

export async function submitConsultationForm(data: ConsultationFormData): Promise<void> {
  // Валидация
  const validation = validateForm(data)
  if (!validation.isValid) {
    throw new Error(Object.values(validation.errors).join(', '))
  }

  try {
    const message = formatConsultationMessage(data)
    await sendToTelegram(message)
  } catch (error) {
    // Если Telegram не настроен, можно использовать альтернативный метод
    console.error('Telegram error:', error)
    throw error
  }
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  // Валидация
  const validation = validateForm({ ...data, message: data.message || '' })
  if (!validation.isValid) {
    throw new Error(Object.values(validation.errors).join(', '))
  }

  try {
    const message = formatContactMessage(data)
    await sendToTelegram(message)
  } catch (error) {
    console.error('Telegram error:', error)
    throw error
  }
}
