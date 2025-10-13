<script setup lang="ts">
import { useRoute, useSeoMeta } from 'nuxt/app'
import { computed } from 'vue'
import { useLocalizedDoc } from '../composables/useLocalizedDoc'
import { useMdcBlocks, type FeatureItem, type HeroData } from '../composables/useMdcBlocks'
// Récupère le contenu localisé de la page home
const { doc, pending } = useLocalizedDoc('/home')

// Debug activable via ?debug=1
const route = useRoute()
const showDebug = computed(() => Boolean(route.query.debug))

// Wrappers pour content renderer (évite erreurs de typage quand null)
const docForRender = computed<any>(() => (doc.value as any) || {})

// Utilise le composable réutilisable pour extraire les blocs (cast pour compatibilité)
const docForBlocks = computed(() => doc.value as unknown as { meta?: { hero?: HeroData; features?: FeatureItem[] }; hero?: HeroData; features?: FeatureItem[]; body?: { value?: unknown[]; type?: string } } | null)
const { heroData, features, restDoc } = useMdcBlocks(docForBlocks)

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
    <!-- <ContentDebug v-if="showDebug" title="Debug Home" :doc="docForRender" :extra="{ pending, heroData, featuresLen: features.length }" /> -->

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