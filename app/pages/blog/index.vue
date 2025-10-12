<template>
  <div>
    <UContainer>
      <div class="py-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {{ $t('blog.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('blog.description') }}
        </p>

        <!-- Filtres -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              @click="selectedCategory = category"
            >
              {{ category }}
            </UButton>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
          {{ $t('blog.latest') }}
        </h2>

        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <template v-for="post in filteredPosts" :key="post?.slug ?? post?.id">
            <BlogCard :post="post" />
          </template>
        </div>

        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p class="text-gray-500 dark:text-gray-400">{{ $t('blog.no_posts') }}</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

definePageMeta({ layout: 'default' })
// Clé dépendante de la langue pour éviter le cache croisé
const current = computed(() => locale.value.split('-')[0])
const { data: posts } = await useAsyncData(
  () => `blog-posts-${current.value}`,
  async () => {
    // Récupérer tous les articles
    const allPosts = await queryCollection('blog')
      .order('date', 'DESC')
      .all()

    // Filtrer par locale côté JavaScript (pas SQL)
    return allPosts.filter(post => {
      const id = post.id || ''
      const stem = post.stem || ''
      const isFrench = id.includes('.fr.md') || stem.includes('.fr')
      const isEnglish = id.includes('.en.md') || stem.includes('.en')

      return (current.value === 'fr' && isFrench) ||
             (current.value === 'en' && isEnglish)
    })
  },
  { default: () => [] }
)

// Catégories
const categories = computed(() => {
  const set = new Set<string>()
  for (const p of posts.value) if (p?.category?.name) set.add(p.category.name)
  return [t('blog.all'), ...Array.from(set).sort((a,b) => a.localeCompare(b))]
})

const selectedCategory = ref(t('blog.all'))
watch(locale, () => { selectedCategory.value = t('blog.all') })

const filteredPosts = computed(() => {
  const all = posts.value ?? []
  const allKey = t('blog.all')
  if (selectedCategory.value === allKey) return all
  return all.filter(p => p.category?.name === selectedCategory.value)
})

useHead({
  title: t('blog.title'),
  meta: [{ name: 'description', content: t('blog.description') }]
})
</script>