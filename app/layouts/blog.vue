<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UHeader>
      <template #left>
        <UButton
          :to="blogUrl"
          color="gray"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          :label="$t('blog.back_to_list')"
        />
      </template>

      <template #right>
        <ThemeToggle />
      </template>
    </UHeader>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { blogUrl } = useLocalizedRoute()
</script>
