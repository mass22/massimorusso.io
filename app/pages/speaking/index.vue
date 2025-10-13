<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedRoute } from '../../composables/useLocalizedRoute'
import { useSpeaking } from '../../composables/useSpeaking'

const { items, pending } = useSpeaking()
const { locale, t } = useI18n()

// Catégories (types) comme le blog
const allKey = computed(() => t('blog.all'))
const categories = computed(() => {
  const set = new Set<string>()
  for (const it of items.value) if (it?.type) set.add(it.type)
  const list = Array.from(set).sort((a, b) => a.localeCompare(b))
  return [allKey.value, ...list]
})

const selectedType = ref(allKey.value)
watch(locale, () => { selectedType.value = allKey.value })

const filtered = computed(() => {
  const all = items.value ?? []
  if (selectedType.value === allKey.value) return all
  return all.filter(i => i.type === selectedType.value)
})

const { getLocalizedUrl } = useLocalizedRoute()
</script>

<template>
  <main class="container mx-auto px-4 py-10">
    <div class="py-2">
      <h1 class="text-2xl font-bold mb-4">Speaking</h1>
      <div class="flex flex-wrap gap-2 mb-6">
        <UButton
          v-for="cat in categories"
          :key="cat"
          :color="selectedType === cat ? 'primary' : 'neutral'"
          :variant="selectedType === cat ? 'solid' : 'outline'"
          @click="selectedType = cat"
        >
          {{ cat }}
        </UButton>
      </div>
    </div>

    <div v-if="pending">
      <USkeleton class="h-20 w-full mb-4" v-for="i in 3" :key="i" />
    </div>

    <div v-else class="grid md:grid-cols-2 gap-6">
      <UCard v-for="it in filtered" :key="it.id">
        <template #header>
          <NuxtLink :to="getLocalizedUrl((it._path || it.path || `/speaking/${it.slug || ''}`) as string)" class="text-lg font-semibold hover:underline">{{ it.title }}</NuxtLink>
          <div class="text-xs text-gray-500">{{ it.type }} • {{ it.date }}</div>
        </template>
        <p class="text-gray-700">{{ it.description }}</p>
        <template #footer>
          <div class="flex items-center justify-between gap-2">
            <UBadge v-for="tag in it.tags || []" :key="tag" color="neutral" variant="soft">{{ tag }}</UBadge>
            <UButton :to="getLocalizedUrl((it._path || it.path || `/speaking/${it.slug || ''}`) as string)" variant="soft" color="primary" icon="i-heroicons-arrow-right">Voir</UButton>
          </div>
        </template>
      </UCard>
    </div>
  </main>
  </template>

<style scoped>
</style>

