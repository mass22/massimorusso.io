<script setup lang="ts">
import { useRoute, useSeoMeta } from 'nuxt/app'
import { computed } from 'vue'
import { useLocalizedDoc } from '../composables/useLocalizedDoc'
// Récupère le contenu localisé de la page home
const { doc, pending } = useLocalizedDoc('/home')

// Debug activable via ?debug=1
const route = useRoute()
const showDebug = computed(() => Boolean(route.query.debug))
const childrenTags = computed(() => {
  const tuples = (doc.value as any)?.body?.value || []
  return Array.isArray(tuples) ? tuples.map((n: any) => Array.isArray(n) ? n[0] : (n?.tag || n?.type)) : []
})
const stringify = (v: unknown) => {
  try { return JSON.stringify(v, null, 2) } catch { return String(v) }
}
// Wrappers pour content renderer (évite erreurs de typage quand null)
const docForRender = computed<any>(() => (doc.value as any) || {})

// Séparation des blocs au niveau racine (minimark)
const mdTuples = computed<any[]>(() => {
  const v = (doc.value as any)?.body?.value
  return Array.isArray(v) ? v : []
})
const getTag = (t: any) => (Array.isArray(t) ? String(t[0]).toLowerCase() : '')
const heroTuple = computed<any[] | null>(() => mdTuples.value.find(t => getTag(t) === 'hero') || null)
const heroProps = computed<Record<string, any>>(() => (heroTuple.value?.[1] as any) || {})
const featureTuple = computed<any[] | null>(() => mdTuples.value.find(t => getTag(t) === 'feature-list') || null)
const features = computed<Array<{ title: string; description?: string }>>(() => {
  const d = (doc.value as any) || {}
  const metaFeatures = d?.meta?.features as Array<{ title: string; description?: string }>
  const rootFeatures = d?.features as Array<{ title: string; description?: string }>
  return metaFeatures || rootFeatures || []
})
const restTuples = computed<any[]>(() => mdTuples.value.filter(t => {
  const tag = getTag(t)
  return tag !== 'hero' && tag !== 'feature-list'
}))
const restDoc = computed<any>(() => {
  const value = doc.value as any
  if (!value) return null
  return { ...value, body: { ...(value.body || {}), value: restTuples.value } }
})

// Données Hero: priorité au frontmatter meta.hero puis au tuple <Hero>
const heroData = computed<{ title: string; subtitle?: string; image?: string } | null>(() => {
  const d = (doc.value as any) || {}
  const metaHero = d?.meta?.hero
  const rootHero = d?.hero
  if (metaHero && metaHero.title) return metaHero as any
  if (rootHero && rootHero.title) return rootHero as any
  if (heroTuple.value) {
    return {
      title: heroProps.value.title,
      subtitle: heroProps.value.subtitle,
      image: heroProps.value.image
    }
  }
  return null
})

// SEO réactif basé sur le frontmatter
useSeoMeta({
  title: () => doc.value?.title as string | undefined,
  description: () => doc.value?.description as string | undefined,
  ogTitle: () => doc.value?.title as string | undefined,
  ogDescription: () => doc.value?.description as string | undefined,
  ogType: 'website'
})
</script>

<template>
  <main class="container mx-auto px-4 py-10">
    <!-- État de chargement -->
    <div v-if="pending">
      <USkeleton class="h-64 w-full mb-10 rounded-2xl" />
      <div class="grid md:grid-cols-3 gap-6">
        <USkeleton v-for="i in 3" :key="i" class="h-28 rounded-2xl" />
      </div>
    </div>

    <!-- Debug panel (indépendant du rendu principal) -->
    <div v-if="showDebug" class="mb-6 space-y-2">
      <UAlert color="info" variant="soft" title="Debug Home">
        <template #description>
          <div class="space-y-1 text-xs">
            <div>pending: {{ pending }}</div>
            <div>title: {{ doc?.title }}</div>
            <div>_path: {{ (doc as any)?._path }}</div>
            <div>_locale: {{ (doc as any)?._locale }}</div>
            <div>tuples length: {{ (doc as any)?.body?.value?.length || 0 }}</div>
            <div>children tags: {{ childrenTags }}</div>
          </div>
        </template>
      </UAlert>
      <details>
        <summary class="cursor-pointer text-xs">doc JSON</summary>
        <pre class="text-xs overflow-auto max-h-64">{{ stringify(doc || {}) }}</pre>
      </details>

      <div class="mt-4">
        <p class="text-xs font-semibold">Debug render (full doc):</p>
        <ContentRenderer :value="docForRender" />
      </div>

      <details>
        <summary class="cursor-pointer text-xs">heroData / features</summary>
        <pre class="text-xs overflow-auto max-h-64">{{ stringify({ heroData, features, featuresLen: features.length }) }}</pre>
      </details>

    </div>

    <!-- Erreur fonctionnelle: contenu introuvable -->
    <UAlert
      v-if="!doc"
      color="error"
      variant="soft"
      title="Contenu introuvable"
      description="Le contenu de la page d’accueil est manquant."
    />

    <!-- Contenu, placé explicitement dans le layout -->
    <template v-if="doc">
      <!-- 1) HERO (si présent au niveau racine) -->
      <Hero
        v-if="heroData"
        :title="heroData.title"
        :subtitle="heroData.subtitle"
        :image="heroData.image"
        class="mb-10"
      />

      <!-- 2) FEATURE LIST (frontmatter prioritaire, sinon bloc MDC) -->
      <FeatureList v-if="features.length" :items="features" class="mb-10" />

      <!-- 3) RESTE DU CONTENU -->
      <ContentRenderer :value="(restDoc as any) || docForRender" />
    </template>
  </main>
</template>

<style scoped>
/* Optionnel : styles locaux de la home */
</style>