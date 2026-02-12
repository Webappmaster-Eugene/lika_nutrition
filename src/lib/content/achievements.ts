export interface AchievementTemplateCard {
  id: string
  icon: 'certificate' | 'case' | 'result'
  title: string
  period: string
  summary: string
  bullets: readonly string[]
}

export const achievementsContent: {
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly cards: readonly AchievementTemplateCard[]
  readonly note: string
} = {
  title: 'Достижения и результаты',
  subtitle: 'Шаблонный блок',
  description:
    'Используйте этот блок как шаблон: замените примеры ниже на реальные кейсы, сертификаты и измеримые результаты.',
  cards: [
    {
      id: 'education-template',
      icon: 'certificate',
      title: 'Профессиональная квалификация',
      period: 'Пример: 2025',
      summary: 'Добавьте ключевое обучение, диплом или сертификацию.',
      bullets: [
        'Название программы или института',
        'Формат обучения (очно/онлайн)',
        'Как это усиливает работу с клиентами',
      ],
    },
    {
      id: 'case-template',
      icon: 'case',
      title: 'Кейс клиента',
      period: 'Пример: 8 недель работы',
      summary: 'Опишите исходный запрос, этапы работы и динамику по неделям.',
      bullets: [
        'Запрос клиента в 1-2 предложениях',
        'Что было внедрено (питание, режим, поддержка)',
        'Промежуточные точки контроля',
      ],
    },
    {
      id: 'result-template',
      icon: 'result',
      title: 'Измеримый результат',
      period: 'Пример: до/после',
      summary: 'Укажите конкретные метрики, которые клиент видит в жизни и анализах.',
      bullets: [
        'Показатель 1: было -> стало',
        'Показатель 2: было -> стало',
        'Короткий отзыв в 1 фразе',
      ],
    },
  ],
  note:
    'Примечание: блок содержит шаблонные формулировки. Замените их перед публикацией на проверенные факты и реальные цифры.',
}
