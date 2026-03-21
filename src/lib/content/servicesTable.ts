export interface ServiceTableRow {
  feature: string
  tochkaStarta: boolean
  glubokiyStart: boolean
  startSPodderzhkoy: boolean
  perezagruzka: boolean
  gkt: boolean
  integratsiya: boolean
}

export const serviceTableColumns = [
  { key: 'tochkaStarta', label: 'Консультация «Точка старта»', price: '3 500 ₽' },
  { key: 'glubokiyStart', label: 'Консультация «Глубокий старт»', price: '5 000 ₽' },
  { key: 'startSPodderzhkoy', label: '«Старт с поддержкой»', price: '10 000 ₽' },
  { key: 'perezagruzka', label: 'Сопровождение 1 мес. «Перезагрузка»', price: '20 000 ₽' },
  { key: 'gkt', label: 'Сопровождение 2 мес. «Глубокая работа с ЖКТ»', price: '30 000 ₽' },
  { key: 'integratsiya', label: 'Сопровождение 3 мес. «Интеграция»', price: '50 000 ₽' },
] as const

export const serviceTableRows: ServiceTableRow[] = [
  {
    feature: '4-П-диагностика',
    tochkaStarta: true,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Диаграмма здоровья + стратегия работы',
    tochkaStarta: true,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Индивидуальное меню',
    tochkaStarta: true,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Книга рецептов',
    tochkaStarta: true,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Рекомендации + гайд по образу жизни',
    tochkaStarta: true,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Интерпретация анализов',
    tochkaStarta: false,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Рекомендации по нутрицевтикам',
    tochkaStarta: false,
    glubokiyStart: true,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Обратная связь',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: true,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Антистресс-протокол',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: false,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Готовые продуктовые корзины',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: false,
    perezagruzka: true,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Гайд «Аптечка семьи»',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: false,
    perezagruzka: false,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: 'Протокол восстановления ЖКТ',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: false,
    perezagruzka: false,
    gkt: true,
    integratsiya: true,
  },
  {
    feature: '4 коучинговых созвона',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: false,
    perezagruzka: false,
    gkt: false,
    integratsiya: true,
  },
  {
    feature: 'Финальный план «Жизнь после сопровождения»',
    tochkaStarta: false,
    glubokiyStart: false,
    startSPodderzhkoy: false,
    perezagruzka: false,
    gkt: false,
    integratsiya: true,
  },
]
