// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blog = defineCollection({
  type: 'page',
  source: 'blog/**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.union([z.string(), z.date()]),
    slug: z.string().optional(),
    category: z.object({ name: z.string(), color: z.string().optional() }).optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    draft: z.boolean().optional()
  })
})

const pages = defineCollection({
  type: 'page',
  // tout le reste du dossier content
  source: '**/*.{md,mdc}'
})

export default defineContentConfig({
  // 👉 ceci demande au moteur d’indexer la locale (via suffixes .fr.md/.en.md)
  i18n: { locales: ['fr', 'en'], defaultLocale: 'fr' },
  collections: { blog, pages }
})