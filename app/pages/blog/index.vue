<template>
  <div>
    <UContainer>
      <div class="py-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">
          {{ $t('blog.title') }}
        </h1>
        <p class="text-lg text-gray-600 mb-8">
          {{ $t('blog.description') }}
        </p>

        <!-- Filtres -->
        <div class="mb-8">
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :color="selectedCategory === category ? 'primary' : 'gray'"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              @click="selectedCategory = category"
            >
              {{ category }}
            </UButton>
          </div>
        </div>

        <!-- Liste des articles -->
        <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard
            v-for="post in filteredPosts"
            :key="post._path"
            :post="post"
          />
        </div>

        <div v-else class="text-center py-12">
          <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500">{{ $t('blog.no_posts') }}</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'blog'
})

// Récupérer tous les articles
const { data: posts } = await queryContent('blog')
  .sort({ date: -1 })
  .find()

// Extraire les catégories uniques
const categories = computed(() => {
  const cats = new Set()
  posts.value.forEach(post => {
    if (post.category) {
      cats.add(post.category.name)
    }
  })
  return Array.from(cats)
})

// Filtre par catégorie
const selectedCategory = ref('Tous')

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return posts.value
  }
  return posts.value.filter(post =>
    post.category?.name === selectedCategory.value
  )
})

// Meta tags
useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: 'Découvrez mes articles sur le développement web' }
  ]
})
</script>