import { siteConfig } from '@/lib/constants/seo'

export interface StructuredDataOrganization {
  '@context': string
  '@type': string
  name: string
  url: string
  description: string
  sameAs?: string[]
}

export interface StructuredDataService {
  '@context': string
  '@type': string
  serviceType: string
  provider: {
    '@type': string
    name: string
  }
  areaServed: {
    '@type': string
    name: string
  }
  description: string
}

export interface StructuredDataArticle {
  '@context': string
  '@type': string
  headline: string
  description: string
  image?: string
  datePublished: string
  dateModified: string
  author: {
    '@type': string
    name: string
  }
  publisher: {
    '@type': string
    name: string
  }
}

export interface StructuredDataPerson {
  '@context': string
  '@type': string
  name: string
  jobTitle: string
  description: string
  email?: string
  telephone?: string
  image?: string
  url?: string
  sameAs?: string[]
}

export interface StructuredDataLocalBusiness {
  '@context': string
  '@type': string
  name: string
  description: string
  url: string
  telephone?: string
  email?: string
  address?: {
    '@type': string
    addressCountry: string
    addressLocality: string
  }
  openingHours?: string
  priceRange?: string
  areaServed?: {
    '@type': string
    name: string
  }
  sameAs?: string[]
}

export interface StructuredDataFAQPage {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export interface StructuredDataReview {
  '@context': string
  '@type': string
  itemReviewed: {
    '@type': string
    name: string
  }
  reviewRating: {
    '@type': string
    ratingValue: number
    bestRating: number
  }
  author: {
    '@type': string
    name: string
  }
  reviewBody?: string
  datePublished?: string
}

export interface StructuredDataAggregateRating {
  '@context': string
  '@type': string
  itemReviewed: {
    '@type': string
    name: string
  }
  ratingValue: number
  reviewCount: number
  bestRating: number
  worstRating: number
}

export interface StructuredDataBreadcrumbList {
  '@context': string
  '@type': string
  itemListElement: Array<{
    '@type': string
    position: number
    name: string
    item?: string
  }>
}

export interface StructuredDataWebSite {
  '@context': string
  '@type': string
  name: string
  url: string
  description: string
  potentialAction?: {
    '@type': string
    target: {
      '@type': string
      urlTemplate: string
    }
    'query-input': string
  }
}

export function getOrganizationStructuredData(): StructuredDataOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.social.telegram, siteConfig.social.whatsapp].filter(Boolean),
  }
}

export function getServiceStructuredData(serviceName: string, description: string): StructuredDataService {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    areaServed: {
      '@type': 'Country',
      name: 'RU',
    },
    description,
  }
}

export function getArticleStructuredData(
  title: string,
  description: string,
  datePublished: string,
  image?: string
): StructuredDataArticle {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? `${siteConfig.url}${image}` : undefined,
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

export function getPersonStructuredData(): StructuredDataPerson {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.person.name,
    jobTitle: siteConfig.person.jobTitle,
    description: siteConfig.person.description,
    email: siteConfig.person.email,
    telephone: siteConfig.person.telephone,
    image: siteConfig.person.image,
    url: siteConfig.url,
    sameAs: [
      siteConfig.social.telegram,
      siteConfig.social.whatsapp,
    ].filter(Boolean),
  }
}

export function getLocalBusinessStructuredData(): StructuredDataLocalBusiness {
  return {
    '@context': 'https://schema.org',
    '@type': siteConfig.business.type,
    name: siteConfig.business.name,
    description: siteConfig.business.description,
    url: siteConfig.url,
    telephone: siteConfig.person.telephone,
    email: siteConfig.person.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: siteConfig.business.address.addressCountry,
      addressLocality: siteConfig.business.address.addressLocality,
    },
    openingHours: siteConfig.business.openingHours,
    priceRange: siteConfig.business.priceRange,
    areaServed: {
      '@type': 'Country',
      name: siteConfig.business.areaServed,
    },
    sameAs: [
      siteConfig.social.telegram,
      siteConfig.social.whatsapp,
    ].filter(Boolean),
  }
}

export function getFAQPageStructuredData(
  faqItems: Array<{ question: string; answer: string }>
): StructuredDataFAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function getServiceStructuredDataExtended(
  serviceName: string,
  description: string,
  price?: string
): StructuredDataService & { offers?: { '@type': string; price: string } } {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'Person',
      name: siteConfig.person.name,
    },
    areaServed: {
      '@type': 'Country',
      name: siteConfig.business.areaServed,
    },
    description,
    ...(price && { offers: { '@type': 'Offer', price } }),
  }
}

export function getReviewStructuredData(
  authorName: string,
  rating: number,
  reviewBody?: string,
  datePublished?: string
): StructuredDataReview {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: siteConfig.business.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      name: authorName,
    },
    ...(reviewBody && { reviewBody }),
    ...(datePublished && { datePublished }),
  }
}

export function getAggregateRatingStructuredData(
  ratingValue: number,
  reviewCount: number
): StructuredDataAggregateRating {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@type': 'Service',
      name: siteConfig.business.name,
    },
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  }
}

/** Базовый URL с завершающим слэшем (для совместимости с trailingSlash) */
function getBaseUrlWithSlash(): string {
  const url = siteConfig.url
  return url.endsWith('/') ? url : `${url}/`
}

export function getBreadcrumbListStructuredData(
  items: Array<{ name: string; url?: string }>
): StructuredDataBreadcrumbList {
  const baseUrl = getBaseUrlWithSlash()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      let itemUrl: string | undefined
      if (item.url) {
        itemUrl = item.url.startsWith('http')
          ? (item.url.endsWith('/') ? item.url : `${item.url.replace(/\/$/, '')}/`)
          : baseUrl + (item.url.startsWith('/') ? item.url.slice(1) : item.url)
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(itemUrl && { item: itemUrl }),
      }
    }),
  }
}

export function getWebSiteStructuredData(): StructuredDataWebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Единый JSON-LD граф для layout (рекомендация Google для нескольких схем на странице) */
export function getStructuredDataGraph(): {
  '@context': string
  '@graph': Array<
    | StructuredDataOrganization
    | StructuredDataPerson
    | StructuredDataLocalBusiness
    | StructuredDataWebSite
  >
} {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      getOrganizationStructuredData(),
      getPersonStructuredData(),
      getLocalBusinessStructuredData(),
      getWebSiteStructuredData(),
    ],
  }
}
