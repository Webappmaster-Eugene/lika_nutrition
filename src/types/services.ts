export interface Service {
  id: number
  title: string
  description: string
  targetAudience: string
  highlight: string
  price: string
  features?: string[]
  image?: string
  slug?: string
}
