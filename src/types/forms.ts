export interface ContactFormData {
  name: string
  phone: string
  email: string
  message?: string
}

export interface ConsultationFormData extends ContactFormData {
  service?: string
}
