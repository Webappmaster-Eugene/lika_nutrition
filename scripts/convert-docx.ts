import * as mammoth from 'mammoth'
import * as fs from 'fs'
import * as path from 'path'

async function convertDocx() {
  const docxPath = path.join(process.cwd(), 'info', 'Финальный_текст_сайта_нутрициолога_под_публикацию.docx')
  const outputDir = path.join(process.cwd(), 'src', 'lib', 'content')

  try {
    // Читаем .docx файл
    const result = await mammoth.extractRawText({ path: docxPath })
    const text = result.value

    // Создаем директорию для контента, если её нет
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Сохраняем извлеченный текст
    const textPath = path.join(outputDir, 'extracted-content.txt')
    fs.writeFileSync(textPath, text, 'utf-8')

    console.log('✅ Контент успешно извлечен из .docx файла')
    console.log(`📄 Сохранен в: ${textPath}`)
    console.log('\n📝 Следующие шаги:')
    console.log('1. Откройте extracted-content.txt')
    console.log('2. Структурируйте контент вручную')
    console.log('3. Обновите файлы services.ts, about.ts и создайте Markdown статьи для блога')

    // Также сохраняем HTML версию для лучшего форматирования
    const htmlResult = await mammoth.convertToHtml({ path: docxPath })
    const htmlPath = path.join(outputDir, 'extracted-content.html')
    fs.writeFileSync(htmlPath, htmlResult.value, 'utf-8')
    console.log(`📄 HTML версия сохранена в: ${htmlPath}`)

  } catch (error) {
    console.error('❌ Ошибка при конвертации .docx файла:', error)
    process.exit(1)
  }
}

convertDocx()
