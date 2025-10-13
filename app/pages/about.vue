<script setup lang="ts">
import { useRoute, useSeoMeta } from 'nuxt/app'
import { computed } from 'vue'
import { useLocalizedDoc } from '../composables/useLocalizedDoc'
import { useMdcBlocks } from '../composables/useMdcBlocks'

const { doc, pending } = useLocalizedDoc('/about')

const docForBlocks = computed(() => doc.value as any)
const { heroData, stats, team, restDoc } = useMdcBlocks(docForBlocks)

useSeoMeta({
  title: () => doc.value?.title as string | undefined,
  description: () => doc.value?.description as string | undefined,
})

const route = useRoute()
const showDebug = computed(() => Boolean(route.query.debug))
const docForRender = computed<any>(() => (doc.value as any) || {})
</script>

<template>
  <main class="container mx-auto px-4 py-10">
    <div v-if="pending">
      <USkeleton class="h-64 w-full mb-10 rounded-2xl" />
    </div>

    <ContentDebug v-if="showDebug" title="Debug About" :doc="docForRender" :extra="{ statsLen: stats.length, teamLen: team.length }" />

    <UAlert v-if="!doc" color="error" variant="soft" title="Contenu introuvable" />

    <template v-if="doc">
      <Hero v-if="heroData" :title="heroData.title" :subtitle="heroData.subtitle" :image="heroData.image" class="mb-10" />

      <StatsGrid v-if="stats.length" :stats="stats" class="mb-10" />
      <TeamList v-if="team.length" :members="team" class="mb-10" />

      <ContentRenderer :value="(restDoc as any) || docForRender" />
    </template>
  </main>
</template>

<style scoped>
</style>
