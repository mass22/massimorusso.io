<template>
  <UCard
    :to="getPostPath(post)"
    class="cursor-pointer hover:shadow-lg transition-shadow duration-200"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold hover:text-primary transition-colors">
          {{ post.title }}
        </h3>
        <UBadge :color="post.category?.color || 'primary'">
          {{ post.category?.name }}
        </UBadge>
      </div>
    </template>

    <p class="text-gray-600 mb-4">{{ post.description }}</p>

    <template #footer>
      <div class="flex items-center justify-between">
        <time class="text-sm text-gray-500">
          {{ formatDate(post.date) }}
        </time>
        <UButton
          :to="getPostPath(post)"
          color="primary"
          variant="ghost"
          size="sm"
          @click.stop
        >
          {{ $t('blog.read_more') }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup>
const { locale } = useI18n()

defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  // Utiliser un formatage cohérent entre serveur et client
  const dateObj = new Date(date)
  const day = dateObj.getDate().toString().padStart(2, '0')
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  return `${day}/${month}/${year}`
}

const { getLocalizedUrl } = useLocalizedRoute()

const getPostPath = (post) => {
  // Utiliser le slug des métadonnées si disponible, sinon extraire du stem
  let slug = post.slug || ''

  if (!slug) {
    // Fallback : extraire le slug du stem (ex: "blog/premier-article.fr" -> "premier-article")
    const stem = post.stem || ''
    slug = stem
    if (slug.includes('/')) {
      // Si le stem contient des slashes, prendre la dernière partie
      slug = slug.split('/').pop() || ''
    }
    // Supprimer l'extension de langue (.fr ou .en)
    slug = slug.replace(/\.(fr|en)$/, '')
  }

  // Utiliser le composable pour générer l'URL localisée
  return getLocalizedUrl(`/blog/${slug}`)
}
</script>
