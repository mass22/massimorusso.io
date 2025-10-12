<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()
const current = computed(() => locale.value.split('-')[0]) // fr | en

const { homeUrl, blogUrl } = useLocalizedRoute()

// slug localisé depuis l'URL
const parts = Array.isArray(route.params.slug) ? route.params.slug as string[] : [String(route.params.slug || '')]
const slug = parts.join('/') // ex: "premier-article" ou "first-article"

const { data: doc } = await useAsyncData(
  () => `post-${slug}-${current.value}`,
  async () => {
    // Récupérer tous les articles et filtrer par slug ET langue
    const allArticles = await queryCollection('blog').all()

    // Chercher l'article par slug ET langue
    const article = allArticles.find(post => {
      const postSlug = post.slug || ''
      const id = post.id || ''
      const stem = post.stem || ''

      // Vérifier que le slug correspond
      const slugMatches = postSlug === slug

      // Vérifier que la langue correspond
      const isFrench = id.includes('.fr.md') || stem.includes('.fr')
      const isEnglish = id.includes('.en.md') || stem.includes('.en')
      const languageMatches = (current.value === 'fr' && isFrench) || (current.value === 'en' && isEnglish)

      return slugMatches && languageMatches
    })

    return article
  }
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

// Fonction de formatage de date
const formatDate = (date: string | Date) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  return `${day}/${month}/${year}`
}

// Meta pour le layout
definePageMeta({ layout: 'blog' })

// Head pour le SEO
useHead({
  title: doc.value?.title,
  meta: [
    { name: 'description', content: doc.value?.description },
    { property: 'og:title', content: doc.value?.title },
    { property: 'og:description', content: doc.value?.description },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: doc.value?.date }
  ]
})
</script>

<template>
  <UContainer v-if="doc">
    <div class="py-8">
      <!-- En-tête de l'article -->
      <div class="mb-8">
        <UBreadcrumb
          :items="[
            { label: $t('nav.home'), to: homeUrl },
            { label: $t('blog.title'), to: blogUrl },
            { label: doc.title }
          ]"
          class="mb-4"
        />

        <div class="mb-4">
          <UBadge
            v-if="doc.category"
            :color="(doc.category.color as any) || 'primary'"
            variant="soft"
            class="mb-2"
          >
            {{ doc.category.name }}
          </UBadge>
        </div>

        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {{ doc.title }}
        </h1>

        <p v-if="doc.description" class="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {{ doc.description }}
        </p>

        <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            <time>{{ formatDate(doc.date) }}</time>
          </div>

          <div v-if="doc.tags && doc.tags.length" class="flex items-center gap-2">
            <UIcon name="i-heroicons-tag" class="w-4 h-4" />
            <div class="flex gap-1">
              <UBadge
                v-for="tag in doc.tags"
                :key="tag"
                variant="outline"
                size="xs"
              >
                {{ tag }}
              </UBadge>
            </div>
          </div>
        </div>

        <NuxtImg
          v-if="doc.image"
          :src="doc.image"
          :alt="doc.title"
          class="w-full h-64 object-cover rounded-lg mb-8"
        />
      </div>

      <!-- Contenu de l'article -->
      <div class="max-w-4xl mx-auto">
        <ContentRenderer
          :value="doc"
          :prose="false"
          tag="article"
          class="article-content"
        />
      </div>

      <!-- Navigation vers les autres articles -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <UButton
            :to="blogUrl"
            variant="outline"
            icon="i-heroicons-arrow-left"
          >
            {{ $t('blog.back_to_list') }}
          </UButton>

          <UButton
            v-if="doc.tags && doc.tags.length"
            :to="`${blogUrl}?tag=${doc.tags[0]}`"
            variant="outline"
            icon="i-heroicons-tag"
            trailing
          >
            {{ $t('blog.related_posts') }}
          </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>