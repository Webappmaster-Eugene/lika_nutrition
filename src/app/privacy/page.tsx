import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Положение о персональных данных',
  description: 'Положение об обработке и защите персональных данных на сайте нутрициолога Лики Надточеевой',
  alternates: {
    canonical: 'https://likanutrition.ru/privacy/',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-sage-50">
      <div className="container mx-auto py-12 xs:py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Кнопка назад */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors mb-8 text-sm xs:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>

          {/* Заголовок */}
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl font-bold text-sage-900 mb-4">
            Положение о персональных данных
          </h1>
          <p className="text-sage-500 mb-10 text-sm xs:text-base">
            Последнее обновление: 08 апреля 2026 г.
          </p>

          {/* Содержание */}
          <div className="space-y-8 text-sage-800 leading-relaxed text-sm xs:text-base">
            {/* 1. Общие положения */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                1. Общие положения
              </h2>
              <p>
                Настоящее Положение об обработке персональных данных (далее — Положение) действует
                в отношении всей информации, которую сайт{' '}
                <span className="font-medium">likanutrition.ru</span> (далее — Сайт), принадлежащий
                индивидуальному предпринимателю Надточеевой Лике (далее — Оператор), может получить
                от Пользователя во время использования Сайта.
              </p>
              <p className="mt-3">
                Использование Сайта означает безоговорочное согласие Пользователя с настоящим
                Положением и указанными в нём условиями обработки его персональных данных. В случае
                несогласия с этими условиями Пользователь должен воздержаться от использования Сайта.
              </p>
            </section>

            {/* 2. Персональные данные */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                2. Персональные данные, подлежащие обработке
              </h2>
              <p className="mb-3">
                В рамках настоящего Положения под персональными данными понимается информация,
                которую Пользователь предоставляет о себе самостоятельно при заполнении форм
                обратной связи на Сайте:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Имя</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты (email)</li>
                <li>Текст сообщения или вопроса</li>
              </ul>
            </section>

            {/* 3. Цели обработки */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                3. Цели обработки персональных данных
              </h2>
              <p className="mb-3">Оператор обрабатывает персональные данные Пользователя в следующих целях:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Обработка входящих запросов и обращений для оказания консультационных услуг</li>
                <li>Связь с Пользователем для записи на консультацию</li>
                <li>Направление ответов на вопросы Пользователя</li>
                <li>Улучшение качества обслуживания</li>
              </ul>
            </section>

            {/* 4. Правовое основание */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                4. Правовое основание обработки
              </h2>
              <p>
                Обработка персональных данных осуществляется на основании согласия Пользователя,
                выраженного путём проставления отметки в соответствующем поле формы обратной связи
                на Сайте, в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О
                персональных данных».
              </p>
            </section>

            {/* 5. Порядок обработки */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                5. Порядок обработки персональных данных
              </h2>
              <p>
                Оператор обеспечивает сохранность персональных данных и принимает все возможные меры,
                исключающие доступ к персональным данным неуполномоченных лиц.
              </p>
              <p className="mt-3">
                Персональные данные Пользователя никогда, ни при каких условиях не будут переданы
                третьим лицам, за исключением случаев, связанных с исполнением действующего
                законодательства Российской Федерации.
              </p>
              <p className="mt-3">
                Персональные данные обрабатываются до момента отзыва согласия Пользователем.
                Пользователь может в любой момент отозвать своё согласие на обработку персональных
                данных, направив Оператору уведомление посредством электронной почты на адрес{' '}
                <a
                  href="mailto:lika_k96@mail.ru"
                  className="text-sage-700 hover:text-sage-800 underline font-medium"
                >
                  lika_k96@mail.ru
                </a>
                .
              </p>
            </section>

            {/* 6. Права пользователя */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                6. Права субъекта персональных данных
              </h2>
              <p className="mb-3">Пользователь имеет право:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Получать информацию, касающуюся обработки его персональных данных</li>
                <li>Требовать уточнения, блокирования или уничтожения своих персональных данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
                <li>
                  Обжаловать действия или бездействие Оператора в уполномоченный орган по защите
                  прав субъектов персональных данных или в судебном порядке
                </li>
              </ul>
            </section>

            {/* 7. Контактная информация */}
            <section>
              <h2 className="font-serif text-xl xs:text-2xl font-semibold text-sage-900 mb-3">
                7. Контактная информация
              </h2>
              <p>
                По всем вопросам, связанным с обработкой персональных данных, Пользователь может
                обращаться по адресу электронной почты:{' '}
                <a
                  href="mailto:lika_k96@mail.ru"
                  className="text-sage-700 hover:text-sage-800 underline font-medium"
                >
                  lika_k96@mail.ru
                </a>
              </p>
            </section>
          </div>

          {/* Кнопка назад */}
          <div className="mt-12 pt-8 border-t border-sage-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 hover:bg-sage-600 text-white rounded-xl transition-colors text-sm xs:text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
