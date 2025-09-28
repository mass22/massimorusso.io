<template>
  <div class="min-h-screen bg-gray-50">
    <UHeader>
      <template #left>
        <UButton
          to="/"
          color="gray"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          :label="$t('blog.back_to_home')"
        />
      </template>

      <template #right>
        <LanguageSwitcher />
      </template>
    </UHeader>

    <main class="max-w-4xl mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          {{ $t('blog.title') }}
        </h1>
        <p class="text-lg text-gray-600">
          {{ $t('blog.description') }}
        </p>
      </div>

      <slot />
    </main>
  </div>
</template>

<script setup>
// Layout spécialisé pour le blog
</script>
