import { defineCollection, defineContentConfig, z } from '@nuxt/content'

/**
 * Content v3 требует объявить коллекции явно — в v2 файлы подхватывались сами.
 *
 * Держим одну коллекцию на весь контент: локали живут папками (`content/ru/…`,
 * `content/es/…`), поэтому путь документа уже совпадает с маршрутом страницы,
 * и запрос по пути работает одинаково для всех языков.
 */
export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        // Поле называется description, а не meta: `meta` в Content v3 занято
        // служебным объектом, и значение из frontmatter туда не попадает.
        description: z.string().optional(),
        date: z.string().optional(),
        img: z.string().optional(),
        tags: z.array(z.string()).optional(),
        author: z.string().optional(),
        authorAvatar: z.string().optional(),
      }),
    }),
  },
})
