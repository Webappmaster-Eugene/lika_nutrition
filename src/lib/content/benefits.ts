export interface Benefit {
  icon: string
  title: string
  description: string
}

export const benefits: Benefit[] = [
  {
    icon: 'Battery',
    title: 'Хроническая усталость, нехватка энергии',
    description: 'Просыпаетесь уже уставшей, а к вечеру сил не остаётся ни на что.',
  },
  {
    icon: 'Flame',
    title: 'Изжога, вздутие, тяжесть после еды',
    description: 'Дискомфорт после еды стал нормой, и вы уже привыкли.',
  },
  {
    icon: 'Scale',
    title: 'Вес, который не уходит',
    description: 'Вы пробовали диеты, но вес стоит или возвращается.',
  },
  {
    icon: 'Droplets',
    title: 'Низкий ферритин, анемия, дефициты',
    description: 'Анализы показывают дефициты, но вы не знаете, что с этим делать.',
  },
  {
    icon: 'Cookie',
    title: 'Тяга к сладкому, срывы',
    description: 'Не можете отказаться от сладкого, а потом вините себя.',
  },
  {
    icon: 'Brain',
    title: 'Тревога вокруг еды',
    description: 'Не знаете, что можно есть, а что нельзя. Еда вызывает стресс.',
  },
]
