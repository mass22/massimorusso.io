<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">{{ post.title }}</h3>
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
          :to="post._path"
          color="primary"
          variant="ghost"
          size="sm"
        >
          {{ $t('blog.read_more') }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>
