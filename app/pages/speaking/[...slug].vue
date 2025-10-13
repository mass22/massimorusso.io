<script setup lang="ts">
import { useRoute, useSeoMeta } from 'nuxt/app';
import { computed } from 'vue';

// Meta pour le layout
definePageMeta({ layout: 'blog' })

declare const queryCollection: <T = unknown>(...args: unknown[]) => {
  path: (p: string) => { where?: (q: Record<string, unknown>) => unknown; first: () => Promise<T | null> }
}

const route = useRoute()
const slugPath = computed(() => `/speaking/${(route.params.slug as string[]).join('/')}`)

const { data: item } = await useAsyncData('speaking-item', () => queryCollection<any>('speaking').path(slugPath.value).first())

useSeoMeta({
  title: () => item.value?.title as string | undefined,
  description: () => item.value?.description as string | undefined,
})
</script>

<template>
  <main class="container mx-auto px-4 py-10">
    <UAlert v-if="!item" color="error" variant="soft" title="Item introuvable" />
    <template v-else>
      <h1 class="text-3xl font-bold mb-2">{{ item.title }}</h1>
      <div class="text-sm text-gray-500 mb-6">{{ item.type }} • {{ item.date }}</div>
      <p class="mb-6">{{ item.description }}</p>
      <div>
        <ContentRenderer :value="item" />
      </div>
      <div v-if="item.link">
        <UButton :to="item.link" target="_blank" icon="i-heroicons-arrow-top-right-on-square">Voir</UButton>
      </div>
    </template>
  </main>
</template>

<style scoped>
</style>

