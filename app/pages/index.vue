<template>
  <div>
    <UContainer>
      <div class="text-center py-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {{ $t('welcome') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('description') }}
        </p>

        <div class="flex justify-center space-x-4">
          <UButton
            to="/blog"
            color="primary"
            size="lg"
          >
            {{ $t('blog.latest') }}
          </UButton>
          <UButton
            to="/about"
            color="gray"
            variant="outline"
            size="lg"
          >
            {{ $t('about.title') }}
          </UButton>
        </div>
      </div>
    </UContainer>

    <!-- Section blog récent -->
    <UContainer v-if="posts && posts.length > 0" class="py-12">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        {{ $t('blog.latest') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard
          v-for="post in posts.slice(0, 3)"
          :key="post._path"
          :post="post"
        />
      </div>

      <div class="text-center mt-8">
        <UButton
          to="/blog"
          color="primary"
          variant="outline"
        >
          {{ $t('blog.view_all') }}
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
// Récupérer les articles de blog
const { data: posts } = await useAsyncData('posts', () => {
  return queryContent('blog')
    .sort({ date: -1 })
    .limit(3)
    .find()
}, {
  default: () => []
})

// Meta tags
useHead({
  title: 'Accueil',
  meta: [
    { name: 'description', content: 'Bienvenue sur mon site de développement web' }
  ]
})
</script>
